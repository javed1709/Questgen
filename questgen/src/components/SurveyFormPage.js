import React, { useState } from 'react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

const SurveyFormPage = () => {
    const [latexCode, setLatexCode] = useState('');

    const handleInputChange = (event) => {
        setLatexCode(event.target.value);
    };

    return (
        <div>
            <h1>LaTeX Compiler</h1>
            <textarea
                rows="10"
                cols="50"
                value={latexCode}
                onChange={handleInputChange}
                placeholder={`\\documentclass[12pt, a4paper]{article}
\\usepackage{graphicx}
\\usepackage[left=0.8in, right=0.8in, top=0.7in, bottom=0.7in]{geometry}
\\usepackage[normalem]{ulem}
\\renewcommand\\ULthickness{1.0pt}
\\setlength\\ULdepth{1.3ex}
\\usepackage{enumitem}
\\setlist{nosep} % Reduce space in lists
\\pagestyle{empty} % No page numbers
\\usepackage{amsmath}

\\begin{document}

% Header
\\noindent
\\begin{tabular*}{\\textwidth}{@{}l@{\\extracolsep{\\fill}}c@{\\extracolsep{\\fill}}r@{}}
\\textbf{H.T No:} \\uline{\\hspace{1.6in}} & \\textbf{R18} & \\textbf{Course Code: A30536} \\\\
\\end{tabular*}

% Title and Details
\\begin{center}
\\textbf{CMR COLLEGE OF ENGINEERING \\& TECHNOLOGY} \\\\
\\textbf{(UGC AUTONOMOUS)} \\\\
\\textbf{B.Tech VI Semester Regular Examinations May-2023} \\\\
\\textbf{(Honors Programme in CSE)} \\\\
\\textbf{Course Name: RESEARCH METHODOLOGIES} \\\\
\\textbf{Date: 17.05.2023 AN} \\hfill \\textbf{Time: 3 hours} \\hfill \\textbf{Max.Marks:70M} \\\\
\\vspace{-0.3cm}
\\noindent\\rule{\\textwidth}{0.4pt} % Horizontal line
\\end{center}
\\vspace{-0.5cm}
% Note
\\noindent
\\begin{center}
\\textbf{(Note: Assume suitable data if necessary)}
\\end{center} \\\\
\\vspace{-0.4cm}
% PART-A Header
\\begin{center}
\\textbf{PART-A (20M)} \\\\
\\textbf{Answer all TEN questions (Compulsory) \\\\
Each question carries TWO marks.} \\\\
\\end{center}
% PART-A Questions
\\begin{enumerate}
    \\item What is literature review? \\hfill 2 M
    \\item Name the different research approaches. \\hfill 2 M
    \\item What are the steps involved in conducting a literature review? \\hfill 2 M
    \\item What is plagiarism and why is it important to avoid in research? \\hfill 2 M
    \\item How does the choice of sampling method impact the generalizability of research findings?\\hfill 2 M
    \\item How would you classify different types of data? \\hfill 2 M
    \\item What are some features of a good research design? \\hfill 2 M
    \\item How do you test a research hypothesis using Z-Test? \\hfill 2 M
    \\item How do you incorporate references and citations in a report? \\hfill 2 M
    \\item How do you choose the appropriate data visualization technique for a report? \\hfill 2 M
\\end{enumerate}

% PART-B Header
\\begin{center}
\\textbf{PART-B (50M)} \\\\
\\textbf{Answer the following. Each question carries TEN Marks.} \\\\
\\vspace{-0.3cm}
\\noindent\\rule{\\textwidth}{0.4pt} % Horizontal line under PART-B header
\\end{center}

% PART-B Questions
\\begin{enumerate}[label=\\arabic*.]
    \\setcounter{enumi}{10} % Continue numbering from 11
    \\item (A) What are the different research approaches? Discuss each approach in detail, highlighting their advantages and disadvantages. \\hfill 10M \\\\
    \\vspace{-0.7cm}
    \\begin{center}\\textbf{or}\\end{center} \\\\
    \\vspace{-0.2cm}
    (B) Develop a research objective related to a topic of your interest. Explain how you formulated your research objective and why it is important. \\hfill 10M
    \\vspace{0.5cm}
    \\item (A) What are some examples of ethical considerations in research, and why are they important? \\hfill 10M \\\\
   \\vspace{-0.7cm}
    \\begin{center}\\textbf{or}\\end{center} \\\\
    \\vspace{-0.2cm}
    (B) How does problem formulation relate to the research process? Explain the literature review process. \\hfill 10M
    \\vspace{0.5cm}

    \\item (A) You have conducted a survey of 200 people and you want to draw conclusions about the entire population. What sampling method would you use and why? \\hfill 10M \\\\
    \\vspace{-0.7cm}
    \\begin{center}\\textbf{or}\\end{center} \\\\
    \\vspace{-0.2cm}
    (B) Explain the concept of data collection and give some examples of how data can be collected. \\hfill 10M
    \\vspace{0.5cm}
    \\item (A) Describe the key elements of a research design. What makes a design effective? \\hfill 10M \\\\
    \\vspace{-0.7cm}
    \\begin{center}\\textbf{or}\\end{center} \\\\
    \\vspace{-0.2cm}
    (B) Discuss how data analysis is crucial in determining the outcome of research. \\hfill 10M
    \\vspace{0.5cm}
    \\item (A) How can data visualization be used to enhance understanding in research findings? Provide examples. \\hfill 10M \\\\
    \\vspace{-0.7cm}
    \\begin{center}\\textbf{or}\\end{center} \\\\
    \\vspace{-0.2cm}
    (B) Explain the difference between qualitative and quantitative research methods. \\hfill 10M
\\end{enumerate}

\\end{document}
`}
            />
            <div>
                <h2>Preview</h2>
                <Latex>{latexCode}</Latex>
            </div>
        </div>
    );
};

export default SurveyFormPage;