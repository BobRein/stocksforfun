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
                    <div className = "container-fluid">
                        <div className = "row row-space">
                            <div className="col-4">
                                <div className = "row row-space">
                                    <div className=" col-md-8 col-12">
                                        <img style= {{ maxWidth: "95%", maxHeight: "50px"}} src = {profile.image} ></img>
                                    </div>                
                                    <div className=" col-md-3 offset-md-1 col-12">
                                        <Typography variant="h5" >{ticker.toUpperCase()}</Typography>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-8 col-md-6 offset-md-2">
                                <StockPrice ticker = {ticker} style = {{float: "right"}}></StockPrice>
                            </div>
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

