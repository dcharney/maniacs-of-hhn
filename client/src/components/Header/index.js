import React from 'react';
<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import'./index.css';
import logo from './logo.png';
=======
import './style.css';
>>>>>>> 76cf2e5c37e08870a5b00b5f093bd27bbd6380a8

const Header = () => {

    return (
<<<<<<< HEAD
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img className="logo" src={logo} alt="logo..." /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link px-5" href="#">home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="explore" className="nav-link px-5" href="#">explore</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="fan" className="nav-link px-5" href="#">fan content</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="store" className="nav-link px-5" href="#">store</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="rumors" className="nav-link px-5" href="#">rumors</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="chat" className="nav-link px-5" href="#">chat</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="content" className="nav-link px-5" id="planner" href="#">my content</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
=======
        <header id="header" className="pin-top">
            <h1 className="title">
                Header
            </h1>
        </header>
    );
};

>>>>>>> 76cf2e5c37e08870a5b00b5f093bd27bbd6380a8
export default Header;