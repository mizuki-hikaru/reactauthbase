import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = () => {
    return (
        <>
            <header>
                <h1><Link to="/">Your App Name Here</Link></h1>
                <p>Tagline goes here.</p>
            </header>
            <Navigation />
        </>
    );
};

export default Header;
