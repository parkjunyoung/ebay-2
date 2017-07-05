import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import HeaderContainer from '../containers/HeaderContainer';
import NotMatch from './NotMatch';
import Admin from './Admin';
import Join from '../routes/Join';
import LoginContainer from '../containers/LoginContainer';

import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const logger = createLogger(); 

const store = createStore(
    reducers,
    applyMiddleware( ReduxThunk, logger )
);

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <div>
                        <HeaderContainer />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/products" component={Home} />
                            <Route path="/admin" component={Admin}/>
                            <Route path="/join" component={Join}/>
                            <Route path="/login" component={LoginContainer}/>
                            <Route component={NotMatch}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;