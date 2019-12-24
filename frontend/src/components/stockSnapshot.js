import {TextField, Typography } from '@material-ui/core';
import React from 'react';
import { getPrice } from '../axios/stockCalls';


class StockSnapshot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            price: undefined,
            lastClose: undefined,
            ticker: undefined
        };
    }
    setStockPrice (ticker){
        getPrice(ticker).then((response) => {
            if (response.data.price){
                this.setState ({price : response.data.price});
                this.setState ({ticker : ticker});
            }
            console.log(response.data);
        }).catch((error) => {
            console.log('Stock error for ',ticker,' ',error.response);
        });
    }
    // componentDidMount () {
    //     var profile = {};
    //     var ticker = '';
    //     if (this.props.stockInfo){
    //         profile = this.props.stockInfo.profile;
    //         ticker = this.props.stockInfo.symbol;
    //         getPrice(ticker).then((response) => {
    //             this.setState ({price : response.data.price});
    //             console.log(response.data);
    //         }).catch((error) => {
    //             console.log('Stock error for ',ticker,' ',error.response);
    //         });
    //     }
    //     this.setState ({ticker : ticker});
    //     this.setState ({profile : profile});
    // }
    render() {
        var profile = {};
        var ticker = '';
        var lastClose = undefined;
        if (this.props.stockInfo){
            profile = this.props.stockInfo.profile;
            ticker = this.props.stockInfo.symbol;
            if (this.state.price == undefined || (ticker && this.state.ticker && this.state.ticker != ticker)){
                this.setStockPrice (ticker);
            }
        }
        return (
            <div>
                {profile && 
                    <div>
                        {profile.companyName}
                        {ticker}
                        {this.state.price}
                        <img src = {profile.image}></img>
                        {profile.changesPercentage}

                    </div>
                }
            </div>
        );
    }
}

export default StockSnapshot

