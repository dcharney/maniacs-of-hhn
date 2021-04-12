import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyA83OcPGuRvGctJJyiCfuxlyhii_OULU2Y",
    authDomain: "maniacs-chatroom.firebaseapp.com",
    projectId: "maniacs-chatroom",
    storageBucket: "maniacs-chatroom.appspot.com",
    messagingSenderId: "196282215934",
    appId: "1:196282215934:web:8a3f1b10e1a4521e2124af",
    measurementId: "G-YS6TVWM8T6"
  })
};

const auth = firebase.auth();
const firestore = firebase.firestore();

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  async function promptUserForPassword() {
    const password = await new Promise((resolve) => {
      const message = "User already exists, enter password associated with this email";
      const res = prompt(message);

      resolve(res);
    });

    if(password) {
      return(password);
    }
  }

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // Grab Google Access Token to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
      }).catch((error) => {
        // if user exists with this email already but wasn't linked
        if (error.code === 'auth/account-exists-with-different-credential') {
          // The pending Google credential.
          var pendingCred = error.credential;
          // The provider account's email address.
          var email = error.email;
          // Get sign-in methods for this email.
          auth.fetchSignInMethodsForEmail(email).then(function(methods) {
            // Step 3.
            // If the user has several sign-in methods,
            // the first method in the list will be the "recommended" method to use.
            if (methods[0] === 'password') {
              // Asks the user their password.
              var password = promptUserForPassword(); // implemented promptUserForPassword.
              //use info to sign in
              auth.signInWithEmailAndPassword(email, password).then(function(result) {
                // Step 4a.
                return result.user.linkWithCredential(pendingCred);
              }).then(function() {
                // Google account successfully linked to the existing Firebase user.
                goToApp();
              });
              return;
            }
          });
        };
      });
    }

    return (
        <main className="rumors">
          <Link to="/signup">
            ← Go to Signup
          </Link>

          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex-row space-between my-2">
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="flex-row space-between my-2">
              <label htmlFor="pwd">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleChange}
              />
            </div>
            {
              error ? <div>
                <p className="error-text" >The provided credentials are incorrect</p>
              </div> : null
            }
            <div className="flex-row flex-end">
              <button type="submit">
                Submit
              </button>
            </div>
          </form>
          <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        </main>
    );
}
export default Login;