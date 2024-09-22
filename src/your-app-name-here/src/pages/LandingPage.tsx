import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <>
            <div id="hero">
                <div id="text-box">
                    <p>Selling point of your webapp goes here.</p>
                    <p><Link className="button" id="get-started" to="/sign-up">Get Started</Link></p>
                </div>
                <div id="image-box">
                    <p>Image supporting your selling point goes here.</p>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
