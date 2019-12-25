import {TextField,
        Typography,
        ExpansionPanelDetails,
        ExpansionPanelSummary,
        ExpansionPanel,
        Grid
      } from '@material-ui/core';
import React from 'react';
import StockPrice from './stockPrice';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
                    <ExpansionPanel square  >
                    
                      <ExpansionPanelSummary  expandIcon={<ExpandMoreIcon />} >
                      
                        {/* className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1"> */}
                    <div className = "row col-xs-12">
                        <div className="col-xs-6 ">
                            <div>
                                <img src = {profile.image} height = "60px"></img>
                            </div>
                            <div>
                                <Typography variant="h2" >{ticker.toUpperCase()}</Typography>
                            </div>
                        </div>
                        <div className="col-xs-6">
                        <StockPrice ticker = {ticker} style = {{float: "right"}}></StockPrice>
                        </div>
                    </div>
                    
                    
                    
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                        {profile.companyName}
                          
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                }
            </div>
        );
    }
}

export default StockSnapshot

