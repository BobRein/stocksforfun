import React from 'react';
import Header from './components/header';
import Home from './pages/home';
import Research from './pages/research';
import {Switch, Route} from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
function App() {
  return (
    <div>
        {/* Headers */}
        <Header/>
        <div style={{paddingTop: '60px'}}>
          <Switch>
            <Route path="/research" exact render = {(props) => <Research {...props}/>}/>
            <Route path="/login" exact render = {(props) => <Login {...props}/>}/>
            <Route path="/signup" exact render = {(props) => <Signup {...props}/>}/>
            <Route path="/dashboard" exact render = {(props) => <Dashboard {...props}/>}/>

            
            {/* Must BE LAST it matches with all routes */}
            <Route path="/" exact render = {(props) => <Home {...props}/>}/>
          </Switch>
        </div>
      </div>
  );
}

export default App;
