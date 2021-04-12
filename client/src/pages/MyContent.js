import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from "react-router-dom";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

function MyContent() {

    const [user] = useAuthState(auth);

    return (
        <main className="myContent">
            {user ?
                <div>
                    <h1>My Content</h1>
                </div> 
            :
                <div>
                    <Link to="/Login">Login to access your content!</Link>
                </div>
            }
        </main>
    );
};

export default MyContent;