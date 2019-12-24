import {TextField, Typography } from '@material-ui/core';
import React from 'react';
import StockPrice from './stockPrice';


class StockSnapshot extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var profile = undefined;
        var ticker = undefined;
        if (this.props.stockInfo){
            profile = this.props.stockInfo.profile;
            ticker = this.props.stockInfo.symbol;
        }
        return (
            <div>
                {profile && 
                    <div>
                        {profile.companyName}
                        {ticker}
                        <img src = {profile.image}></img>
                        <StockPrice ticker = {ticker}></StockPrice>
                    </div>
                }
            </div>
        );
    }
}

export default StockSnapshot

