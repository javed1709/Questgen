import React, { useState } from 'react';
import axios from 'axios';
import './upload.css'; // Import the specific CSS file for UploadPage

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [extractedData, setExtractedData] = useState('');
    const [questions, setQuestions] = useState('');
    const [queryText, setQueryText] = useState('');
    const [rawText, setRawText] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('queryText', queryText);

        try {
            const response = await axios.post('http://localhost:3322/upload', formData);
            setExtractedData(response.data.extractedData);
            setQuestions(response.data.questions);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuery = async () => {
        if (!rawText) return;

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3322/query', { rawText, queryText });
            setExtractedData(rawText); // Set rawText as extractedData
            setQuestions(response.data.queryResult); // Set queryResult as questions
        } catch (error) {
            console.error('Error querying text:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleQueryTextChange = (e) => {
        setQueryText(e.target.value);
    };

    const handleRawTextChange = (e) => {
        setRawText(e.target.value);
    };

    return (
        <div className="upload-page-container">
            <div className="upload-form-container">
                <input type="file" onChange={handleFileChange} className="upload-input" />
                <button onClick={handleUpload} className="upload-button" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
                <input
                    type="text"
                    value={queryText}
                    onChange={handleQueryTextChange}
                    placeholder="Enter prompt for Gemini AI"
                    className="upload-query-input"
                />
                <textarea
                    value={rawText}
                    onChange={handleRawTextChange}
                    placeholder="Enter raw text to query"
                    className="upload-raw-text-input"
                />
                <button onClick={handleQuery} className="upload-button" disabled={loading}>
                    {loading ? 'Querying...' : 'Get Query'}
                </button>
            </div>
            <div className="upload-preview-container">
                <div className="upload-generated-results">
                    <h3>Extracted Data:</h3>
                    <pre>{extractedData}</pre>
                    <h3>Generated Questions:</h3>
                    <pre>{questions}</pre>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;