import {TextField, Typography, Button } from '@material-ui/core';
import React from 'react';


class Sell extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            shares : 1,
            currentHoldings: 0,
            sharesText : 1
        }
        
    }
    componentDidMount () {
        this.updateCurrentHoldings(this.props.username);
    }
    sell(){
        this.updateCurrentHoldings();//might want asynch callback here
        if (this.state.shares <= this.state.currentHoldings){
            //API Sell this.props.ticker, this.props.username, this.state.shares
            console.log('Sell order:', this.props.ticker, this.props.username, this.state.shares);
        }else{
            console.log ("Too many purchases where made, close trading dialog and try again.");
        }
    }
    updateCurrentHoldings(username){
        //api get current number of shares of this ticker
        this.setState({currentHoldings : 100});
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
        let currentHoldings = this.state.currentHoldings;
        let total = price * this.state.shares;
        return (
            <div className = "text-center">
                <br></br>
                <br></br>
                <h6>Current Holdings: $ {currentHoldings}</h6>
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
                        disabled={this.state.shares > currentHoldings || total < 0.1}
                        size="medium"
                        onClick={ () => this.sell() }
                    >
                        Sell
                    </Button>
                </div>
            </div>    
        );
    }
}



export default Sell
