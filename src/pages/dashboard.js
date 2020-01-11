import React from 'react';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { TextField, Button, Paper} from '@material-ui/core';
import aws_exports from '../aws-exports';
import {withAuthenticator} from  'aws-amplify-react';
import { Redirect } from 'react-router-dom';
Amplify.configure(aws_exports);


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {  
    }

    render() { 
        if(this.props.user == null){
            return (<Redirect to='/login' />)
        }else{
            return(
                <div>
                <br></br>
                <div className="col-md-8 offset-md-2 col-10 offset-1">
                    <div className ="text-center"><h1>Dashboard</h1></div>
                    <br></br>

                    <div className = "row row-space">
                        <div className="col-md-5 col-12 ">
                            <div className ="text-center"><h4>Cash: </h4></div>
                        </div>
                        <div className="col-md-5 offset-md-2 col-12 ">
                            <div className ="text-center"><h4>Portfolio Value:</h4></div>
                        </div> 
                        <div className="col-12">
                            <div className ="text-center"><h4>Holdings</h4></div>
                        </div>                                       
                    </div>
                </div>
            </div>
            );
        }
    }
}

export default Dashboard ;