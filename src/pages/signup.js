import React from 'react';
import { TextField, Button, Paper} from '@material-ui/core';
import { getStockInfo } from '../axios/stockCalls.js';


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameError: '',
            username: '',
            usernameSubmitable: false,
            usernameTimeout: null,
            password: '',
            passwordError:'',
            secondPassword:'',
            secondPasswordError:'',
            secondPasswordSubmittable: false,
            secondPasswordTimeout : null
        }
    }

    handleUsernameChange = (event) => {
        var username = event.target.value;
        username = username.toLowerCase();
        this.setState({ username: username });//probably add checks to make it only alpha numeric
        clearTimeout(this.state.usernameTimeout);
        if(username){
            getStockInfo(username).then((response) => { // using this api temporarily
                if (response.data.symbol == undefined){
                    this.setState({ usernameError: '' });
                    this.setState({usernameSubmitable: true});
                }else{
                    this.setState({usernameSubmitable : false})
                    this.state.usernameTimeout = setTimeout(() => {
                        if(username == this.state.username){
                            this.setState({ usernameError: username + ' is taken by another user.' });
                        }
                    }, 750);
                }
            }).catch((error) => {
                this.setState({ usernameError: 'Server issue, sorry for the inconvience.' })
            });
        }else{
            console.log('test');
            this.setState({ usernameError: '' });
        }
    }
    handlePasswordChange = (event) => {
        this.setState ({passwordError : ''})
        var password = event.target.value;
        this.setState({ password: password }, () => {
            this.handleSecondPasswordChange (this.state.secondPassword);
        });//call back because aysnch 
    }
    
    handleSecondPasswordChange = (password) => {
        this.setState({ secondPassword: password });
        clearTimeout(this.state.secondPasswordTimeout);
        if (this.state.password && password){
            if (password == this.state.password){
                this.setState ({secondPasswordSubmittable: true});
                this.setState ({secondPasswordError : ''});
            }else{
                this.setState ({secondPasswordSubmittable: false});
                this.state.secondPasswordTimeout = setTimeout(() => {
                    this.setState ({secondPasswordError : 'Passwords must match.'});
                }, 750);
            }
        }else{
            this.setState ({secondPasswordSubmittable: true});
            this.setState ({secondPasswordError : ''});
        }
    }
    handleSubmit = () =>{
        if (this.state.password != 'bad'){
            console.log ('username : ', this.state.username, ' password : ', this.state.password);
        }else{
            this.setState({passwordError: 'Invalid Password'});
        }
    }
    isSubmitable = () => {
        let state = this.state;
        return (state.username
             && state.usernameError === ''
             && state.usernameSubmitable
             && state.password 
             && state.secondPassword 
             && state.secondPasswordError ===''
             && state.secondPasswordSubmittable
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