import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';

const AppRoutes = () =>
    <Switch>
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
    </Switch>


export default AppRoutes;
