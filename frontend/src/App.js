import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Tasks from './components/Tasks/index';
import Login from './components/Login/index';
import Logout from './components/Logout';

import Rooms from './components/Rooms/index';
import Contact from './components/Contact';
import Help from './components/Help/index';

import NavBar from './components/NavBar/index';
import PrivateRoute from './services/PrivateRoute';



export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.checkAuthentification=this.checkAuthentification.bind(this);
        // Load JWT token and user info from LocalStorage
        const localInfos = localStorage.getItem('userInfos');
        const jwtToken = localStorage.getItem('token');
        if (localInfos && jwtToken) {
        this.state = { userInfos: JSON.parse(localInfos), isAuthenticated: true };
        } else {
        this.state = {};
        }
    }

    checkAuthentification() {
        const localInfos = localStorage.getItem('userInfos');
        const jwtToken = localStorage.getItem('token');
        if (localInfos && jwtToken) {
            this.setState({ userInfos: JSON.parse(localInfos), isAuthenticated: true });
            }
    }


    render() {
        const { isAuthenticated } = this.state;
    
        return  (<div className="h-100">
                
                <Switch>
                    <Route path="/login" component={(props)=><Login {...props} checkAuthentification={this.checkAuthentification}/>}/>
                    <PrivateRoute isAuthenticated={isAuthenticated} path="/logout/" component={Logout}/>
                    <PrivateRoute isAuthenticated={isAuthenticated} 
                    component={() => (<div>
                                        <NavBar userInfos={this.state.userInfos} />
                                        <section>
                                            <Switch>
                                                <Route path="/tasks" component={Tasks} /> 
                                                <Route path="/contact" component={Contact} /> 
                                                <Route path="/rooms" component={Rooms} />
                                                <Route path="/help" component={Help} />
                                                <Redirect from="/" to="/tasks" />
                                            </Switch>
                                        </section>
                                        </div>
                            )}
                    />


            </Switch>
            </div>)
    }
}

