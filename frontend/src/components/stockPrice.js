import {TextField, Typography } from '@material-ui/core';
import React from 'react';
import { getPrice, getPreviousDay } from '../axios/stockCalls';


class StockPrice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            price: undefined,
            lastClose: undefined,
            percentChange: undefined,
            ticker: undefined
        };
    }
    updateAll(ticker){
        getPreviousDay(ticker).then((response) => {
            if (response.data.historical[0].close != undefined){
                this.setState ({lastClose : response.data.historical[0].close});
            }else{
                this.setState ({lastClose : undefined});
            }
            this.updatePrice(ticker);
        }).catch((error) => {
            console.log('Historical Data error for ',ticker,' ',error.response);
            this.setState ({lastClose : undefined});
        });
    }

    updatePrice (ticker){
        this.state.ticker = ticker;
        let lastClose = this.state.lastClose;
        getPrice(ticker).then((response) => {
            if (response.data.price){
                if(lastClose != undefined){
                    this.setState({percentChange: (100*(response.data.price - lastClose)/lastClose)});
                }
                this.setState ({price : response.data.price});
            }else{
                this.setState ({price : undefined});
            }
        }).catch((error) => {
            console.log('Stock error for ',ticker,' ',error.response);
            this.setState ({price : undefined});
        });
    }

    render() {
        var ticker = this.props.ticker;
        if(this.state.ticker == undefined || (ticker && this.state.ticker && this.state.ticker != this.props.ticker)){
            this.updateAll (ticker);
        }
        // else if (timer is done){
        //     //update again
        // }
        return (
            <div>
                {(this.state.price != undefined && this.state.percentChange != undefined) && 
                    <div>
                        ${this.state.price.toFixed(2)}
                        {this.state.percentChange >= 0 &&
                            <p style = {{color :'green'}}>
                                +{this.state.percentChange.toFixed(2)}%
                            </p>
                        }
                        {this.state.percentChange < 0 &&
                            <p style = {{color :'red'}}>
                                {this.state.percentChange.toFixed(2)}%
                            </p>
                        }
                    </div>
                }
            </div>
        );
    }
}

export default StockPrice

