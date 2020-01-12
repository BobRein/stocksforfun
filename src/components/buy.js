import {TextField, Typography, Button } from '@material-ui/core';
import React from 'react';


class TradingDialog extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            shares : 1,
            cash: 0,
            sharesText : 1
        }
        
    }
    componentDidMount () {
        this.updateCash(this.props.username);
    }
    buy(){
        this.updateCash();//might want asynch callback here
        if (this.state.cash >= this.state.shares*this.props.price - 0.01){
            //API buy this.props.ticker, this.props.username, this.state.shares
            console.log('Purchase order:', this.props.ticker, this.props.username, this.state.shares);
        }else{
            console.log ("Too many purchases where made, close trading dialog and try again.");
        }
    }
    updateCash(username){
        //api get cash
        this.setState({cash : 1000});
    }
    handleSharesChange = (event) => {
        var shares = event.target.value;
        this.setState({ sharesText: shares });
        if (/^[1-9][0-9]*$/.test(shares) || shares == '') { 
            this.setState({ shares: shares });
         }else{
            this.setState({ shares: 0 });
         }
    }    
    
    render() {
        let price = this.props.price;
        let cash = this.state.cash;
        let total = price * this.state.shares;
        return (
            <div className = "text-center">
                <br></br>
                <br></br>
                <h6>Cash: $ {cash}</h6>
                <br></br>
                <TextField
                label = "Number of Shares"
                value = {this.state.sharesText}
                spellCheck="false"
                id="standard-basic"
                onChange ={(e) => this.handleSharesChange(e)}
                />
                <br></br><br></br>
                <p>Total: ${total.toFixed(2)}</p>
                <br></br>
                <div className="text-center">
                    <Button 
                        variant="contained"
                        color="primary"
                        disabled={total - 0.01 > cash || total < 0.1}
                        size="medium"
                        onClick={ () => this.buy() }
                    >
                        Buy
                    </Button>
                </div>
            </div>    
        );
    }
}



export default TradingDialog
