import {TextField, Typography } from '@material-ui/core';
import React from 'react';
import { getTicker } from '../axios/stockCalls.js';


class Lookup extends React.Component {
    update = (event) => {
        var ticker = event.target.value;
        getTicker(ticker).then((response) => {
            console.log(response.data.symbol + ': ' + response.data.price);
        }).catch((error) => {
            console.log('Stock error for ',ticker,' ',error.response);
        });
    }
    render() {
        let style = {
            width: '90%',
            marginLeft: '5%',
        }
        return (
            <div style={{width: '100%', padding: '10px'}}>
                <TextField id="standard-basic" label="Ticker Lookup" onChange ={(e) => this.update(e)}/>
                
            </div>
        );
    }
}

export default Lookup
