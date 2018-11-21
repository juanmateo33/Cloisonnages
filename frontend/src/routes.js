import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './App';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';

import NavigationBar from './components/NavigationBar';

let links = [
    { label: 'Cloisonnages', link: '/', active: true },
    { label: 'Login', link: 'login' },
    { label: 'About', link: 'about' },
    { label: 'Contact', link: 'contact' },
  ];

const AppRoutes = () =>
    <div>
        <h2>This will be a Navigation Bar</h2>
        <div className="container center">
        <NavigationBar links={links}/>
      </div>
        <Switch>    
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/" component={App} />
        </Switch>
    </div>



export default AppRoutes;
