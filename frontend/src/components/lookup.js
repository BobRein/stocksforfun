import {TextField, Typography } from '@material-ui/core';
import React from 'react';
import { getStockInfo } from '../axios/stockCalls.js';
import Stock from './stock.js';


class Lookup extends React.Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            stockError: '',
            timeout: null
        }
    }
    handleStockChange = (event) => {
        var ticker = event.target.value;
        clearTimeout(this.state.timeout);
        if(ticker){
            this.state.timeout = setTimeout(() => {
            getStockInfo(ticker).then((response) => {
                if (response.data.symbol == undefined){
                    this.setState({ stockError: ticker.toUpperCase() + ' is not available.' });
                    this.setState({ name: '' });
                    this.setState({ price: '' });
                }else{
                    this.setState({ stockError: '' });
                    this.setState({ name: response.data.profile.companyName });
                    this.setState({ price: response.data.profile.price });
                }
            }).catch((error) => {
                console.log('Stock error for ',ticker,' ',error.response);
                this.setState({ stockError: 'Server issue, sorry for the inconvience.' })
            });
        }, 1000);
    }else{
        this.setState({ stockError: '' });
    }
    }
    render() {
        let style = {
            width: '90%',
            marginLeft: '5%',
        }
        return (
            <div style={{width: '100%', padding: '10px'}}>
                <TextField 
                id="standard-basic"
                label="Ticker Lookup"
                error={this.state.stockError != ''}
                helperText ={this.state.stockError}
                onChange ={(e) => this.handleStockChange(e)}/>
           
            <div >
            {this.state.name} $ {this.state.price}
            <Stock ></Stock>
            </div>
        </div>
        );
    }
}

export default Lookup
