import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import'./index.css';
import logo from './logo.png';

const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img className="logo" src={logo} alt="logo..." /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-auto">
                        <li className="nav-item">
                            <Link smooth={true} to="home" className="nav-link px-5" href="#">home</Link>
                        </li>
                        <li className="nav-item">
                            <Link smooth={true} to="explore" className="nav-link px-5" href="#">explore</Link>
                        </li>
                        <li className="nav-item">
                            <Link smooth={true} to="fan" className="nav-link px-5" href="#">fan content</Link>
                        </li>
                        <li className="nav-item">
                            <Link smooth={true} to="store" className="nav-link px-5" href="#">store</Link>
                        </li>
                        <li className="nav-item">
                            <Link smooth={true} to="rumors" className="nav-link px-5" href="#">rumors</Link>
                        </li>
                        <li className="nav-item">
                            <Link smooth={true} to="chat" className="nav-link px-5" href="#">chat</Link>
                        </li>
                        <li className="nav-item">
                            <Link smooth={true} to="content" className="nav-link px-5" id="planner" href="#">my content</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Header;