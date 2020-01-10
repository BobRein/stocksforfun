import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Auth } from 'aws-amplify';

 class Header extends React.Component {
    constructor(props) {
        super(props);

    }

    logout  () {
        console.log('logging out');
        Auth.signOut()
            .then(data => {
                console.log(data);
                this.props.resetUser();
            })
            .catch(err => console.log(err));
    }
        
    render() {
        var user = this.props.user;
        const style = theme => ({
            root: {
              "&:hover": {
                color: "white",
                textDecoration: "none"
              }
            }
          });

        return (
            <div>
                <AppBar ref="appbar"  style={{position: 'fixed'}}>
                    <Toolbar>
                        <div style={{width: '100%'}}>
                            <div style={{float: 'left'}}>
                                <Button component={NavLink} to={"/"} >                         
                                    <Typography variant="body1" style={{ float: 'left',color: 'white'}}>
                                        Cool Stocks Game
                                    </Typography>
                                </Button>
                            </div>
                            <div style={{float: 'right'}}>
                                <Button component={NavLink} to={"/research"} title="Research Stocks">                         
                                    <Typography variant="body1" style={{ float: 'right',color: 'white'}}>
                                        Research  <SearchIcon style={{color: 'white'}}/>
                                    </Typography>
                                </Button>
                            </div>
                            {user == null &&
                            <div style={{float: 'right'}}>
                                <Button component={NavLink} to={"/signup"} title="Create Account">                         
                                    <Typography variant="body1" style={{ float: 'right',color: 'white'}}>
                                        Sign Up  
                                    </Typography>
                                </Button>
                            </div>
                            }
                            {user == null &&   
                            <div style={{float: 'right'}}>
                                <Button component={NavLink} to={"/login"} title="Login">                         
                                    <Typography variant="body1" style={{ float: 'right',color: 'white'}}>
                                        Login 
                                    </Typography>
                                </Button>
                            </div>
                            }
                            {user  && 
                            <div style={{float: 'right'}}>
                                <Button component={NavLink} to={"/dashboard"} title="Dashboard">                         
                                    <Typography variant="body1" style={{ float: 'right',color: 'white'}}>
                                        Dashboard 
                                    </Typography>
                                </Button>
                            </div>
                            }
                         
                            {user  && 
                            <div style={{float: 'right'}}>
                                <Button onClick = {() => this.logout()}title="Logout">                         
                                    <Typography variant="body1" style={{ float: 'right',color: 'white'}}>
                                        Logout 
                                    </Typography>
                                </Button>
                            </div>
                            }   
                            {user  &&                     
                                <Typography variant="body1" style={{ color: 'white'}} className='text-center'>
                                    {user.username} 
                                </Typography>
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header