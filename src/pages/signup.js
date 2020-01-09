import React from 'react';
import { TextField, Button, Paper} from '@material-ui/core';
import { getStockInfo } from '../axios/stockCalls.js';
import { Auth } from 'aws-amplify';


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameError: '',
            username: '',
            usernameTaken: false,
            usernameTimeout: null,
            password: '',
            passwordError:'',
            secondPassword:'',
            secondPasswordError:''
        }
    }
    checkUsername (username) {
        clearTimeout(this.state.usernameTimeout);
        if(username){
            this.state.usernameTimeout = setTimeout(() => {
                getStockInfo(username).then((response) => { // using this api temporarily
                    let exists = (response.data.symbol != undefined);
                    this.setState({ usernameTaken: exists});
                }).catch((error) => {
                    this.setState({ usernameError: 'Server issue, sorry for the inconvience.' });
                });
            }, 500);
        }
    }
    handleUsernameChange = (event) => {
        var username = event.target.value;
        this.setState({ username: username });//probably add checks to make it only alpha numeric   
        this.setState ({usernameError : ''}); 
        this.checkUsername(username);    
    }
    handlePasswordChange = (event) => {
        this.setState ({passwordError : ''})
        var password = event.target.value;
        this.setState({ password: password }, () => {
            this.handleSecondPasswordChange (this.state.secondPassword);
        });//call back because aysnch 
    }
    handleSecondPasswordChange = (password) => {
        this.setState ({secondPasswordError : ''});
        this.setState({ secondPassword: password });
    }
    handleSubmit = () =>{
        if (this.state.usernameTaken){
            this.setState({ usernameError: 'Username is taken by another user.' });
        }else if(this.state.password.length < 6){
            this.setState({passwordError: '6 Character Minimum'});
        }else if (this.state.password != this.state.secondPassword){
            this.setState({secondPasswordError: 'Passwords must match'});
        }else{
            console.log ('Success username : ', this.state.username, ' password : ', this.state.password);
        }
    }
    isSubmitable = () => {
        let state = this.state;
        return (state.username
             && state.usernameError === ''
             && state.password 
             && state.secondPassword 
             && state.secondPasswordError ===''
             && state.password.length == state.secondPassword.length
             )
    }

    render() { 
        return(
            <div>
                <br></br>
                <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1">
                    <div className ="text-center"><h1>Sign Up</h1></div>
                    <div className ="text-center text-secondary"><h6>Create a virtual trading account and begin today.</h6></div>
                    <br></br>
                    <TextField
                        label = "Username"
                        value = {this.state.username}
                        spellCheck="false"
                        fullWidth = {true}
                        id="standard-basic"
                        error={this.state.usernameError != ''}
                        helperText ={this.state.usernameError}
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
                    <TextField
                        type = "password"
                        label = "Confirm Password"
                        value = {this.state.secondPassword}
                        spellCheck="false"
                        fullWidth = {true}
                        id="standard-basic"
                        error={this.state.secondPasswordError != ''}
                        helperText ={this.state.secondPasswordError}
                        onChange ={(e) => this.handleSecondPasswordChange(e.target.value)}
                    />
                    <br></br><br></br>
                    <div className="text-center">
                        <Button 
                            variant="contained"
                            color="primary"
                            disabled={!this.isSubmitable()}
                            size="medium"
                            onClick={ () => this.handleSubmit() }
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup