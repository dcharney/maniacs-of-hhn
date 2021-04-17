import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Fan from './pages/FanContent';
import Attraction from './pages/Attraction';
import ChatRoom from './pages/Chat';
import Rumors from './pages/Rumors';
import MyContent from './pages/MyContent';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



const client = new ApolloClient({
    request: operation => {
        const token = localStorage.getItem('id_token');

        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
    },
    uri: '/graphql'
});

function App() {

    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    <Header />
                    <div id='content'>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/explore" component={Explore} />
                            <Route exact path="/attraction/:attractionId" component={Attraction} />
                            <Route exact path="/fan" component={Fan} />
                            <Route exact path="/chat" component={ChatRoom} />
                            <Route exact path="/rumors" component={Rumors}/>
                            <Route exact path="/content" component={MyContent}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/signup" component={Signup}/>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
