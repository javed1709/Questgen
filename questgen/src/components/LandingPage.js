import React from 'react';

const LandingPage = () => {
    return (
        <div>
            <section className="hero">
                <h1>Generate Customized Question Papers with AI</h1>
                <p>Effortlessly create and customize question papers tailored to your needs using state-of-the-art AI technology.</p>
                <button>Get Started</button>
            </section>

            <section id="about" className="about">
                <h2>About</h2>
                <p>Learn more about our app and how it can help you generate question papers quickly and easily.</p>
            </section>

            <section id="how-it-works" className="how-it-works">
                <h2>How It Works</h2>
                <p>Our app uses AI to help you generate questions based on your syllabus. Upload your file, and let us do the rest!</p>
            </section>

            {/* <section id="contact" className="contact">
                <h2>Contact Us</h2>
                <p>Have questions? Get in touch with us!</p>
                <p>Email: support@example.com</p>
            </section> */}
        </div>
    );
};

export default LandingPage;
