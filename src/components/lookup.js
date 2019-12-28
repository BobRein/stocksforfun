import {TextField, Typography } from '@material-ui/core';
import React from 'react';
import { getStockInfo } from '../axios/stockCalls.js';
import Stock from './stock.js';
import StockSnapshot from './stockSnapshot.js';


class Lookup extends React.Component {
    state = {}
    constructor(props) {
        super(props);
        this.state = {
            stockError: '',
            ticker: '',
            stockInfo: {},
            timeout: null
        }
    }
    handleStockChange = (event) => {
        var ticker = event.target.value;
        ticker = ticker.toUpperCase();
        this.setState({ ticker: ticker });
        clearTimeout(this.state.timeout);
        if(ticker){
            this.state.timeout = setTimeout(() => {
            getStockInfo(ticker).then((response) => {
                if (response.data.symbol == undefined){
                    this.setState({ stockError: ticker.toUpperCase() + ' is not available.' });
                }else{
                    this.setState({ stockError: '' });
                    this.setState({ stockInfo: response.data});
                }
            }).catch((error) => {
                console.log('Stock error for ',ticker,' ',error.response);
                this.setState({ stockError: 'Server issue, sorry for the inconvience.' })
            });
        }, 750);
        }else{
            this.setState({ stockError: '' });
        }
    }
    render() {
        let style = {
            width: '90%',
            marginLeft: '5%',
            paddingTop: '40px',
        }
        return (
            <div style={style} >
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
                <TextField 
                className= "text-center"
                inputProps={{
                    style: {fontSize: 40}
                  }}
                value = {this.state.ticker}
                spellCheck="false"
                fullWidth = {true}
                id="standard-basic"
                error={this.state.stockError != ''}
                placeholder="Search Stocks"
                helperText ={this.state.stockError}
                onChange ={(e) => this.handleStockChange(e)}/>
                </div>
                    <br></br><br></br>
                <div >
                    <StockSnapshot stockInfo = {this.state.stockInfo}></StockSnapshot>
                </div>
            </div>
        );
    }
}

export default Lookup
