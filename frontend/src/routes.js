import React from 'react';
import { Route, Switch } from 'react-router-dom';


import App from './App';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';

import NavBar from './components/NavBar/index';



let userInfos = 
    { firstName: 'John-Evan', lastName: 'Karcenty' };
    console.log(userInfos);

const AppRoutes = () =>
    
    <div className="h-100">
        <div>
        <NavBar userInfos={userInfos}/>
        </div>
        <section>
        <Switch>    
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/" component={App} />
        </Switch>
        </section>
    </div>



export default AppRoutes;
