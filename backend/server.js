const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs').promises;
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3322;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function run(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    await fs.writeFile('output.txt', response.text(), 'utf8'); 
    return response.text();
}

function generatePrompt(queryText, extractedData) {
    return `${queryText} : ${extractedData}`;
}

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = path.join(__dirname, req.file.path);
        const fileType = req.file.mimetype;
        const queryText = req.body.queryText;

        console.log(`Received file of type: ${fileType}`);

        let extractedData;

        // Extract text based on file type
        if (fileType.startsWith('image/')) {
            // Process image with Tesseract
            const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
            extractedData = text;
        } else if (fileType === 'application/pdf') {
            // Process PDF with pdf-parse
            const dataBuffer = await fs.readFile(filePath);
            const data = await pdfParse(dataBuffer);
            extractedData = data.text;
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                   fileType === 'application/msword' || 
                   fileType === 'application/octet-stream') {
            // Process Word document with mammoth
            const dataBuffer = await fs.readFile(filePath);
            const { value: text } = await mammoth.extractRawText({ buffer: dataBuffer });
            extractedData = text;
        } else if (fileType === 'text/plain') {
            // Process text file with fs
            extractedData = await fs.readFile(filePath, 'utf8');
        } else {
            return res.status(400).json({ message: 'Unsupported file type.' });
        }

        // Clean up uploaded file
        await fs.unlink(filePath);

        // Generate questions using Gemini AI
        const prompt = generatePrompt(queryText, extractedData);
        const questions = await run(prompt);

        res.json({ extractedData, questions });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ message: 'Error processing file.', error: error.message });
    }
});

// Endpoint to handle raw text queries
app.post('/query', async (req, res) => {
    try {
        const { rawText, queryText } = req.body;
        const prompt = generatePrompt(queryText, rawText);
        const queryResult = await run(prompt);
        res.json({ queryResult });
    } catch (error) {
        console.error('Error processing query:', error);
        res.status(500).json({ message: 'Error processing query.', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});