import {TextField, Typography, Button } from '@material-ui/core';
import React from 'react';
import { getPrice, getPreviousDay } from '../axios/stockCalls';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Buy from "./buy.js"
import Sell from "./sell.js"


class TradingDialog extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentPanel : this.panelType().Buy
        }
        
    }
    handleTabChange = (event, value) => {
        this.setState({currentPanel : value});
    }
    panelType () {
         return {
            Buy : 0,
            Sell : 1,
         }
    }
    
    
    render() {
        return (
            <div >
                {this.props.trading != undefined && 
                    <Dialog open={this.props.trading} onClose= { this.props.handleClose} >
                        <DialogTitle className = "text-center">Stock: {this.props.ticker} </DialogTitle>

                        <DialogContent>
                            <h4 className = "text-center">Price: ${this.props.price}</h4>
                            <br></br>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value = {this.state.currentPanel}
                                    onChange = { this.handleTabChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                >
                                    <Tab label="Buy" />
                                    <Tab label="Sell" />
                                </Tabs>
                            </AppBar>
                            {/* put check for open stock market here */}
                            {this.state.currentPanel == this.panelType().Buy &&
                                <div><Buy 
                                price= {this.props.price} 
                                username = {this.props.user.username} 
                                ticker = {this.props.ticker}
                                ></Buy></div>
                            }
                            {this.state.currentPanel == this.panelType().Sell &&
                                <div><Sell 
                                price= {this.props.price} 
                                username = {this.props.user.username} 
                                ticker = {this.props.ticker}
                                ></Sell></div>
                            }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ this.props.handleClose} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
            </div>
        );
    }
}



export default TradingDialog
