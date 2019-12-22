import React from 'react';
import Header from './components/header';
import Home from './pages/home';
import Research from './pages/research';
import {Switch, Route} from 'react-router-dom';
function App() {
  return (
    <div>
        {/* Headers */}
        <Header/>

        <Switch>
          <Route path="/research" exact render = {(props) => <Research {...props}/>}/>

          
          {/* Must BE LAST it matches with all routes */}
          <Route path="/" exact render = {(props) => <Home {...props}/>}/>
        </Switch>

      </div>
  );
}

export default App;
