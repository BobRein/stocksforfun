import React from 'react';
import Header from './components/header';
import Home from './pages/home';
import Research from './pages/research';
import {Switch, Route} from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { Auth } from 'aws-amplify';
class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            user : null
        }
        this.resetUser = this.resetUser.bind(this);
    }
    componentDidMount () {
        this.resetUser();
    }
    resetUser () {
        Auth.currentAuthenticatedUser()
        .then(user => {
            if (user != this.state.user){
                this.setState({ user : user });
            }
        })
        .catch(() => {
            console.log("Not signed in");
            if(this.state.user){
                this.setState({ user : null });
            }
        });
    }
    render (){
        return (
            <div>
                {/* Headers */}
                <Header user = {this.state.user} resetUser = {this.resetUser} />
                <div style={{paddingTop: '60px'}}>
                <Switch>
                    <Route path="/research" exact render = {(props) => <Research {...props}/>}/>
                    <Route path="/login" exact render = {(props) => <Login {...props} resetUser = {this.resetUser}/>}/>
                    <Route path="/signup" exact render = {(props) => <Signup {...props}/>}/>
                    <Route path="/dashboard" exact render = {(props) => <Dashboard {...props}/>}/>

                    
                    {/* Must BE LAST it matches with all routes */}
                    <Route path="/" exact render = {(props) => <Home {...props}/>}/>
                </Switch>
                </div>
            </div>
        );
    }
}

export default Container;