import React from 'react';
import Auth from '../../utils/auth';
import './style.css';
import { Link } from 'react-router-dom';

const logo = require('./logo.png').default;

const Header = () => {
    const loggedIn = Auth.loggedIn();

    function signOut() {
        Auth.logout();
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img className="logo" src={logo} alt="logo..." /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link px-5" href="#">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/explore" className="nav-link px-5" href="#">EXPLORE</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/fan" className="nav-link px-5" href="#">FAN CONTENT</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/rumors" className="nav-link px-5" href="#">RUMORS</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/chat" className="nav-link px-5" href="#">CHAT</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/content" className="nav-link px-5" id="planner" href="#">MY CONTENT</Link>
                        </li>
                        {loggedIn?
                            <li className="nav-item">
                                <div className="nav-link px-5" onClick={signOut}>SIGN OUT</div>
                            </li>
                            : null
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header;