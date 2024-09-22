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

// Function to run the AI model
async function run(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    await fs.writeFile('output.txt', response.text(), 'utf8'); 
    return response.text();
}

// Helper function to generate the AI prompt
function generatePrompt(queryText, extractedData, template, additionalFields) {
    return `${queryText} : Utilize whole data That may be syllabus/Questions if syllabus generate questions on all topics equally and fill in:${extractedData} 
Strictly modify all following details in latex template:
Date: ${additionalFields.date}
Modify it AN/FN : ${additionalFields.anFn}
Course Name: ${additionalFields.courseName}
Course Code: ${additionalFields.courseCode}
Semester: ${additionalFields.semester}
College Name: ${additionalFields.collegeName}

Fill in the questions into the following LaTeX template (For sake of place holders questions are filled to maintain a format so just replace the generated/ given questions with them):
${template}`;
}

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const filePath = path.join(__dirname, req.file.path);
        const fileType = req.file.mimetype;
        const { queryText, examType, date, anFn, courseName, courseCode, semester, collegeName } = req.body;

        console.log(`Received file of type: ${fileType}`);

        let extractedData;

        // Extract text based on file type
        if (fileType.startsWith('image/')) {
            const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
            extractedData = text;
        } else if (fileType === 'application/pdf') {
            const dataBuffer = await fs.readFile(filePath);
            const data = await pdfParse(dataBuffer);
            extractedData = data.text;
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                   fileType === 'application/msword' || 
                   fileType === 'application/octet-stream') {
            const dataBuffer = await fs.readFile(filePath);
            const { value: text } = await mammoth.extractRawText({ buffer: dataBuffer });
            extractedData = text;
        } else if (fileType === 'text/plain') {
            extractedData = await fs.readFile(filePath, 'utf8');
        } else {
            return res.status(400).json({ message: 'Unsupported file type.' });
        }

        // Clean up uploaded file
        await fs.unlink(filePath);

        // Determine LaTeX template path based on examType
        const latexTemplateFileName = examType === 'mid' ? 'midqp.txt' : 'semqp.txt';
        const latexTemplatePath = path.join(__dirname, '../questgen/public/', latexTemplateFileName);
        const latexTemplate = await fs.readFile(latexTemplatePath, 'utf8');

        // console.log("Extracted LaTeX Template Content:\n", latexTemplate);

        // Generate questions using Gemini AI
        const additionalFields = { date, anFn, courseName, courseCode, semester, collegeName };
        const prompt = generatePrompt(queryText, extractedData, latexTemplate, additionalFields);
        const questions = await run(prompt);

        // Write the filled template back to the LaTeX file in the public folder
        await fs.writeFile(latexTemplatePath, questions, 'utf8');

        res.json({ extractedData, questions });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ message: 'Error processing file.', error: error.message });
    }
});

// Endpoint to handle raw text queries
app.post('/query', async (req, res) => {
    try {
        const { rawText, queryText, examType, date, anFn, courseName, courseCode, semester, collegeName } = req.body;

        // Determine LaTeX template path based on examType
        const latexTemplateFileName = examType === 'mid' ? 'midqp.txt' : 'semqp.txt';
        const latexTemplatePath = path.join(__dirname, '../questgen/public/', latexTemplateFileName);
        const latexTemplate = await fs.readFile(latexTemplatePath, 'utf8');

        // Generate questions using Gemini AI
        const additionalFields = { date, anFn, courseName, courseCode, semester, collegeName };
        const prompt = generatePrompt(queryText, rawText, latexTemplate, additionalFields);
        const queryResult = await run(prompt);

        // Write the filled template back to the LaTeX file in the public folder
        await fs.writeFile(latexTemplatePath, queryResult, 'utf8');

        res.json({ queryResult });
    } catch (error) {
        console.error('Error processing query:', error);
        res.status(500).json({ message: 'Error processing query.', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
