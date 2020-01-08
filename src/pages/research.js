import React from 'react';
import Lookup from '../components/lookup';
import Amplify from 'aws-amplify';
import aws_exports from '../aws-exports';
import {withAuthenticator} from  'aws-amplify-react';
Amplify.configure(aws_exports);

class Research extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {  
    }

    render() { 
                    // <img src = "https://www.broadcastingcable.com/.image/t_share/MTY1OTg5NzY2ODI1NzgxMTk1/stock-market-getty-images-rf.jpg" width="100%"></img>

        return(
            <div>
               <Lookup></Lookup>
            </div>
        );
    }
}

export default withAuthenticator(Research, true) ;