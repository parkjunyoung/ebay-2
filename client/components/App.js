import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import Header from './Header';
import NotMatch from './NotMatch';
import Admin from './Admin';
import Join from '../routes/Join';
import Login from '../routes/Login'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/admin" component={Admin}/>
                        <Route path="/join" component={Join}/>
                        <Route path="/login" component={Login}/>
                        <Route component={NotMatch}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;