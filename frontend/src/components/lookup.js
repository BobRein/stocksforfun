import {TextField, Typography } from '@material-ui/core';
import React from 'react';


class Lookup extends React.Component {
    render() {
        let style = {
            width: '90%',
            marginLeft: '5%',
        }
        return (
            <div style={{width: '100%', padding: '10px'}}>
                <TextField id="standard-basic" label="Ticker Lookup" />
                
            </div>
        );
    }
}

export default Lookup
