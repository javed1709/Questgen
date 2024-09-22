import React, { useState } from 'react';
import axios from 'axios';
import './upload.css'; // Import the specific CSS file for UploadPage

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [queryLoading, setQueryLoading] = useState(false);
    const [extractedData, setExtractedData] = useState('');
    const [questions, setQuestions] = useState('');
    const [queryText, setQueryText] = useState('');
    const [rawText, setRawText] = useState('');
    const [examType, setExamType] = useState('sem');

    // New state variables for the additional form fields
    const [date, setDate] = useState('');
    const [anFn, setAnFn] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [semester, setSemester] = useState('');
    const [collegeName, setCollegeName] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploadLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('queryText', queryText);
        formData.append('examType', examType);
        formData.append('date', date);
        formData.append('anFn', anFn);
        formData.append('courseName', courseName);
        formData.append('courseCode', courseCode);
        formData.append('semester', semester);
        formData.append('collegeName', collegeName);

        try {
            const response = await axios.post('http://questgen.up.railway.app/upload', formData);
            setExtractedData(response.data.extractedData);
            setQuestions(response.data.questions);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setUploadLoading(false);
        }
    };

    const handleQuery = async () => {
        if (!rawText) return;

        setQueryLoading(true);

        try {
            const response = await axios.post('http://questgen.up.railway.app/query', {
                rawText,
                queryText,
                examType,
                date,
                anFn,
                courseName,
                courseCode,
                semester,
                collegeName
            });
            setExtractedData(rawText);
            setQuestions(response.data.queryResult);
        } catch (error) {
            console.error('Error querying text:', error);
        } finally {
            setQueryLoading(false);
        }
    };

    const handleQueryTextChange = (e) => {
        setQueryText(e.target.value);
    };

    const handleRawTextChange = (e) => {
        setRawText(e.target.value);
    };

    const handleExamTypeChange = (e) => {
        setExamType(e.target.value);
    };

    // Handlers for new input fields
    const handleDateChange = (e) => setDate(e.target.value);
    const handleAnFnChange = (e) => setAnFn(e.target.value);
    const handleCourseNameChange = (e) => setCourseName(e.target.value);
    const handleCourseCodeChange = (e) => setCourseCode(e.target.value);
    const handleSemesterChange = (e) => setSemester(e.target.value);
    const handleCollegeNameChange = (e) => setCollegeName(e.target.value);

    return (
        <div className="upload-page-container">
                {/* New Input Fields */}
                <h1>Mandatory's</h1>
                <input type="date" value={date} onChange={handleDateChange} placeholder="Date" className="upload-date-input" />
                <input type="text" value={anFn} onChange={handleAnFnChange} placeholder="AN/FN" className="upload-anfn-input" />
                <input type="text" value={courseName} onChange={handleCourseNameChange} placeholder="Course Name" className="upload-course-name-input" />
                <input type="text" value={courseCode} onChange={handleCourseCodeChange} placeholder="Course Code" className="upload-course-code-input" />
                <input type="text" value={semester} onChange={handleSemesterChange} placeholder="Semester" className="upload-semester-input" />
                <input type="text" value={collegeName} onChange={handleCollegeNameChange} placeholder="College Name" className="upload-college-name-input" />
                <div className="exam-type-container">
                    <label>
                        <input
                            type="radio"
                            value="sem"
                            checked={examType === 'sem'}
                            onChange={handleExamTypeChange}
                        />
                        Semester
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="mid"
                            checked={examType === 'mid'}
                            onChange={handleExamTypeChange}
                        />
                        Midterm
                    </label>
                </div>
                <div className="upload-form-container">
                <input type="file" onChange={handleFileChange} className="upload-input" />
                <input
                    type="text"
                    value={queryText}
                    onChange={handleQueryTextChange}
                    placeholder="File Description (Eg:syllabus/questions)"
                    className="upload-query-input"
                />
                <button onClick={handleUpload} className="upload-button" disabled={uploadLoading}>
                    {uploadLoading ? 'Uploading...' : 'Upload'}
                </button>
                <p>or</p>
                <textarea
                    value={rawText}
                    onChange={handleRawTextChange}
                    placeholder="Enter raw text to query"
                    className="upload-raw-text-input"
                />
                 <button onClick={handleQuery} className="upload-button" disabled={queryLoading}>
                    {queryLoading ? 'Querying...' : 'Get Query'}
                </button>
            </div>
        </div>
    );
};

export default UploadPage;
