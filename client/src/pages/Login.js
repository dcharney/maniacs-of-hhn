import React from 'react';
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
}

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
        </main>
    );
};

export default Login;