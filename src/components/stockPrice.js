import {TextField, Typography } from '@material-ui/core';
import React from 'react';
import { getPrice, getPreviousDay } from '../axios/stockCalls';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


class StockPrice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            price: undefined,
            lastClose: undefined,
            percentChange: undefined,
            ticker: undefined,
            interval : null
        };
    }
    componentDidMount (){
        this.updateAll (this.props.ticker);
        if (this.props.interval && this.props.interval > 10){
            this.state.interval = setInterval(() => {
                this.updatePrice (this.props.ticker);
              }, this.props.interval );
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }
    componentDidUpdate (){
        var ticker = this.props.ticker;
        if(this.state.ticker == undefined || (ticker && this.state.ticker && this.state.ticker != ticker)){
            this.updateAll(ticker);
        }
    }
    updateAll(ticker){
        this.setState ({ticker : ticker});
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
        let lastClose = this.state.lastClose;
        getPrice(ticker).then((response) => {
            if (response.data.price){
                if(lastClose != undefined){
                    this.setState({percentChange: (100*(response.data.price - lastClose)/lastClose)});
                }
                this.setState ({price : response.data.price});
                this.props.setPrice((response.data.price).toFixed(2));
            }else{
                this.setState ({price : undefined});
                this.props.setPrice(undefined);
            }
        }).catch((error) => {
            console.log('Stock error for ',ticker,' ',error.response);
            this.setState ({price : undefined});
            this.props.setPrice(undefined);
        });
    }

    render() {
        return (
            <div>
                {(this.state.price != undefined && this.state.percentChange != undefined) && 
                <div className= "container-fluid text-center">
                    <div className="row">
                        <div className=" col-md-4 offset-md-1 col-12 ">
                        <Typography variant="h5" style = {{height :"55px"}}>
                                ${this.state.price.toFixed(2)}
                        </Typography>
                        </div>
                        <div className=" col-md-6 offset-md-1 col-12">
                            {this.state.percentChange >= 0 &&
                                <div>
                                    <Typography variant="h5"  style = {{color :'green'}}>
                                        <ArrowUpwardIcon fontSize = "large" />{(Math.abs(this.state.percentChange)).toFixed(2)}%
                                    </Typography>
                                </div>
                            }
                            {this.state.percentChange < 0 &&
                                <div>
                                    <Typography variant="h5"  style = {{color :'red'}}>
                                        <ArrowDownwardIcon fontSize = "large" />{(Math.abs(this.state.percentChange)).toFixed(2)}%
                                    </Typography>
                                </div>
                            }
                        </div>
                    </div>
                    </div>
                }
            </div>
        );
    }
}

export default StockPrice

