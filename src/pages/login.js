import React from 'react';
import { TextField, Button, Paper} from '@material-ui/core';
import { getStockInfo } from '../axios/stockCalls.js';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordError: '',
            signedin: false
        }
    }

    handleUsernameChange = (event) => {
        var username = event.target.value;
        username = username.toLowerCase();
        this.setState({ username: username });
    }
    
    handlePasswordChange = (event) => {
        var password = event.target.value;
        this.setState({ password: password });
        this.setState({passwordError: ''});
    }
    signIn() {
        const { username, password } = this.state;  
        Auth.signIn({
            username: username,
            password: password
        })
        .then(() => this.setState({signedin: true}))
        .catch((err) => this.setState({passwordError: 'Invalid Password'}))
    }
  
    // confirmSignIn() {
    //     const { username } = this.state;
    //     Auth.confirmSignIn(username)
    //     .then(() => this.setState({signedIn: true}))
    //     .catch((err) => console.log(`Error confirming sign up - ${ err }`))
    // }
 
    isSubmitable = () => {
        let state = this.state;
        return (state.username && state.password && state.passwordError === '')
    }
    render() { 
      if (this.state.signedin) {
        return (<Redirect to='/dashboard' />)
      } else {
        return(
            <div>
                <br></br>
                <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1">
                    <div className ="text-center"><h1>Login</h1></div>
                    <div className ="text-center text-secondary"><h6>Sign in to your virtual trading account.</h6></div>
                    <br></br>
                    <TextField
                        label = "Username"
                        value = {this.state.username}
                        spellCheck="false"
                        fullWidth = {true}
                        id="standard-basic"
                        onChange ={(e) => this.handleUsernameChange(e)}
                    />
                    <br></br><br></br>
                    <TextField
                        type = "password"
                        label = "Password"
                        value = {this.state.password}
                        spellCheck="false"
                        fullWidth = {true}
                        id="standard-basic"
                        error={this.state.passwordError != ''}
                        helperText ={this.state.passwordError}
                        onChange ={(e) => this.handlePasswordChange(e)}
                    />
                    <br></br><br></br>
                    <div className="text-center">
                        <Button 
                            variant="contained"
                            color="primary"
                            disabled={!(this.isSubmitable())}
                            size="medium"
                            onClick={ () => this.signIn() }
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        );
      }
        
    }
}

export default Login