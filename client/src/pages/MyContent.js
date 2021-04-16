import React from 'react';
import Auth from '../utils/auth';
import { Link } from "react-router-dom";


function MyContent() {
    const loggedIn = Auth.loggedIn();
    return(
        <main className="mycontent">
            {loggedIn ? 
                <div>
                    <h1>My Content</h1>
                </div>
            :
                <div>
                    <Link to="/login">Login to view saved content!</Link>
                </div>
            }
        </main>
    );
}

export default MyContent;