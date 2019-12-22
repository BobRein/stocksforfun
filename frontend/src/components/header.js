import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';


 class Header extends React.Component {
    constructor(props) {
        super(props);
 
    }
    
    render() {
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
                                        Stocks For Fun
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
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header