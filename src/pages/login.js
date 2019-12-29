import React from 'react';
import { TextField, Button, Paper} from '@material-ui/core';
import { getStockInfo } from '../axios/stockCalls.js';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            passwordError: '',
            
        }
    }

    componentDidMount() {  

    }
    handleUsernameChange = (event) => {
        var username = event.target.value;
        username = username.toLowerCase();
        this.setState({ username: username });//probably add checks to make it only alpha numeric
      
    }
    
    handlePasswordChange = (event) => {
        var password = event.target.value;
        this.setState({ password: password });
        this.setState({passwordError: ''});
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
        return (state.username && state.password && state.passwordError === '')
    }
    render() { 
        return(
            <div>
                <br></br>
                <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1">
                    <div className ="text-center"><h2>Login</h2></div>
                    <div className ="text-center text-secondary"><h5>Sign in to your virtual trading account.</h5></div>
                    <br></br>
                    <TextField
                        label = "Username"
                        value = {this.state.username}
                        spellCheck="false"
                        fullWidth = {true}
                        id="standard-basic"
                        onChange ={(e) => this.handleUsernameChange(e)}
                    />
                    <br></br>
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

export default Login