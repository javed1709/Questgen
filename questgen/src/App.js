import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SurveyFormPage from './components/SurveyFormPage';
import FileUploadPage from './components/UploadPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/survey" element={<SurveyFormPage />} />
                <Route path="/upload" element={<FileUploadPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
