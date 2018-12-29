import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Tasks from './components/Tasks';
import Login from './components/Login';
import Logout from './components/Logout';

import Events from './components/Events';
import Contact from './components/Contact';
import Help from './components/Help/index';

import NavBar from './components/NavBar/index';



const localInfos = localStorage.getItem('userInfos');
const userInfos = JSON.parse(localInfos);

const AppRoutes = () =>
    
    <div className="h-100">
        <div>
        <NavBar userInfos={userInfos}/>
        </div>
        <section>
        <Switch>
            <Route path="/tasks" component={Tasks} />   
            <Route path="/events" component={Events} />
            <Route path="/contact" component={Contact} />
            <Route path="/help" component={Help} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />



            <Route path="/login" component={Login} />
            <Redirect from="/" to="/tasks" />
        </Switch>
        </section>
    </div>



export default AppRoutes;