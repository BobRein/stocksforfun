import React from 'react';
import { TextField, Button, Paper, Typography} from '@material-ui/core';
import { getStockInfo } from '../axios/stockCalls.js';
import { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom'



class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            usernameError: '',
            username: '',
            usernameTaken: false,
            usernameTimeout: null,
            password: '',
            passwordError:'',
            secondPassword:'',
            secondPasswordError:'',
            submitted: false,
            code: '',
            codeError: '',
            confirmed: false
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
        this.setState({ username: username });  
        this.setState ({usernameError : ''}); 
        this.checkUsername(username);    
    }
    handleEmailChange = (event) =>{
        var email = event.target.value;
        this.setState({ email: email });
        this.setState ({emailError : ''}); 
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
        let usernameIsInvalid =false;
        let emailIsInvalid = false;
        if (this.state.usernameTaken){
            this.setState({ usernameError: 'Username is taken by another user.' });
        }else if(usernameIsInvalid){
            this.setState({usernameError: 'Only letters and numbers allowed in username.'});
        }else if(emailIsInvalid){
            this.setState({emailError: 'Invalid Email'});
        }else if(this.state.password.length < 6){
            this.setState({passwordError: '6 Character Minimum'});
        }else if (this.state.password != this.state.secondPassword){
            this.setState({secondPasswordError: 'Passwords must match'});
        }else{
            this.signUp();
        }
    }
    signUp() {
        const { username, password, email } = this.state; 
        Auth.signUp({
            username: username,
            password: password,
            attributes: {
                email: email
            }
        })
        .then(() => {
            console.log('Successfully signed up');
            this.setState({submitted: true});
        })
        .catch((err) => console.log(err))
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
    confirmationIsSubmitable = () => {
        return (this.state.code);
    }
    confirmSignUp() {
        const { username, code } = this.state;
        Auth.confirmSignUp(username, code)
        .then(() => {
            console.log('Successfully confirmed signed up');
            this.setState({confirmed: true});
            //this.props.handleSignup(); //maybe do this later
        })
        .catch((err) => {
            console.log('Confirmation code was incorrect.');
            this.setState({codeError: 'Confirmation code is incorrect.'});
        })
    }
    handleCodeChange = (event) => {
        var code = event.target.value;
        this.setState({ code: code }); 
        this.setState({codeError: ''});
    }

    render() { 
        if(this.state.confirmed){
            return (<Redirect to='/login' />)
        }else if (this.state.submitted){
            return(
                <div>
                    <br></br>
                    <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1">
                        <div className ="text-center"><h1>Email Confirmation</h1></div>
                        <div className ="text-center text-secondary"><h6>Copy the code from your email into the field below.</h6></div>
                        <br></br>
                        <div className='text-center'>
                            <Typography variant="h5"  color="primary">
                                Welcome, {this.state.username}
                            </Typography>
                        </div>
                        <br></br>
                        <TextField
                            label = "Confirmation Code"
                            value = {this.state.code}
                            spellCheck="false"
                            fullWidth = {true}
                            id="standard-basic"
                            error={this.state.codeError != ''}
                            helperText ={this.state.codeError}
                            onChange ={(e) => this.handleCodeChange(e)}
                        />
                        <br></br><br></br>
                        <div className="text-center">
                            <Button 
                                variant="contained"
                                color="primary"
                                disabled={!this.confirmationIsSubmitable()}
                                size="medium"
                                onClick={ () => this.confirmSignUp() }
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }else{
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
                            label = "Email"
                            value = {this.state.email}
                            spellCheck="false"
                            fullWidth = {true}
                            id="standard-basic"
                            error={this.state.emailError != ''}
                            helperText ={this.state.emailError}
                            onChange ={(e) => this.handleEmailChange(e)}
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
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Signup