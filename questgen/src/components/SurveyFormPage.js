import React, { useState } from 'react';

const SurveyFormPage = () => {
    const [latexCode, setLatexCode] = useState('');
    const [pdfUrl, setPdfUrl] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');

    const handleCompile = async () => {
        try {
            const response = await fetch('https://javed8.pythonanywhere.com/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latex: latexCode }),
            });

            if (!response.ok) {
                throw new Error('Failed to compile LaTeX');
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'compiled.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const readFileContent = async (filePath) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error('Failed to read file');
            }
            const text = await response.text();
            setLatexCode(text);
            setPdfUrl(null);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileSelection = (event) => {
        const selectedFile = event.target.value;
        setSelectedFile(selectedFile);
        const filePath = selectedFile === 'midqp' ? '/midqp.txt' : '/semqp.txt';
        readFileContent(filePath);
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Template</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="radio"
                    id="midqp"
                    name="file"
                    value="midqp"
                    checked={selectedFile === 'midqp'}
                    onChange={handleFileSelection}
                />
                <label htmlFor="midqp">Midterm</label>
                <br />
                <input
                    type="radio"
                    id="semqp"
                    name="file"
                    value="semqp"
                    checked={selectedFile === 'semqp'}
                    onChange={handleFileSelection}
                />
                <label htmlFor="semqp">Semester</label>
                <br />
            </div>
            <button onClick={handleCompile} style={{ marginBottom: '20px' }}>Compile LaTeX</button>
            {pdfUrl && (
                <div>
                    <button onClick={handleDownload} style={{ marginBottom: '20px' }}>Download PDF</button>
                    <h2>Preview</h2>
                    <br />
                    <iframe src={pdfUrl} width="80%" height="600px" title="PDF Preview"></iframe>
                </div>
            )}
        </div>
    );
};

export default SurveyFormPage;
