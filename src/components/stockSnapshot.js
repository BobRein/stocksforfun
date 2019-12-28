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
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';


class StockSnapshot extends React.Component {
    constructor(props) {
        super(props);
    }
    getMarketCap (mktCap){
        let trillion = 1000000000000;
        let billion = 1000000000;
        let million = 1000000;
        if(mktCap > trillion){
            return (mktCap/trillion).toFixed(2).toString() + " Trillion";
        }
        if(mktCap > billion){
            return (mktCap/billion).toFixed(2).toString() + " Billion";
        }
        return (mktCap/million).toFixed(2).toString() + " Million";
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
                                            <div className="col-md-8 col-12">
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
                        <div className = "container-fluid text-center">
                                <div className = "row row-space">
                                    <div className="col-md-4 col-12">
                                        <div className = "row row-space">
                                            <div className="col-12" style = {{paddingBottom: "20px"}}>
                                                <Link href={profile.website} target="_blank" rel="noopener">
                                                    {profile.companyName}
                                                </Link>
                                            </div>                
                                            <div className="col-6">
                                                <Button variant="contained" color="primary" disabled={true} size="medium">BUY</Button>
                                            </div>
                                            <div className="col-6">
                                                <Button variant="contained" color="primary" disabled={true} size="medium">SELL</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-10 col-md-6 offset-2 text-left">
                                        {profile.mktCap && 
                                            <Typography>
                                                Market Cap: {this.getMarketCap(profile.mktCap)}
                                            </Typography>
                                        }
                                        {profile.ceo &&
                                            <Typography>
                                                CEO: {profile.ceo}
                                            </Typography>
                                        }
                                        {profile.sector && 
                                            <Typography>
                                                Sector: {profile.sector}
                                            </Typography>
                                        }
                                    </div>
                                </div>
                            </div>
                           
                            {/* going to hold off on description for now because of typos */}
                            {/* <Typography>
                                {profile.description}
                            </Typography> */}
                            
                           

                            {/*recomendation */}

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                }
            </div>
        );
    }
}

export default StockSnapshot