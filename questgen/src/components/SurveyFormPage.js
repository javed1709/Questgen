import React, { useState } from 'react';

const SurveyFormPage = () => {
    const [latexCode, setLatexCode] = useState('');
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleInputChange = (event) => {
        setLatexCode(event.target.value);
        setPdfUrl(null);
    };

    const handleCompile = async () => {
        try {
            const response = await fetch('https://shashankbhake.pythonanywhere.com/compile', {
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

    return (
        <div>
            <h1>LaTeX Compiler</h1>
            <textarea
                rows="10"
                cols="50"
                value={latexCode}
                onChange={handleInputChange}
                placeholder="Enter LaTeX code here"
            />
            <br />
            <button onClick={handleCompile}>Compile LaTeX</button>
            {pdfUrl && (
                <div>
                    <h2>Compiled PDF</h2>
                    <button onClick={handleDownload}>Download PDF</button>
                    <br /><br />
                    <iframe src={pdfUrl} width="100%" height="600px" title="PDF Preview"></iframe>
                </div>
            )}
        </div>
    );
};

export default SurveyFormPage;