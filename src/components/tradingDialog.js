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


class TradingDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.trading != undefined && 
                    <Dialog open={this.props.trading} onClose= { this.props.handleClose} >
                        <DialogTitle >Trading</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                test
                            </DialogContentText>
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
