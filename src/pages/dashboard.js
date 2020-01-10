import React from 'react';
import Amplify from 'aws-amplify';
import { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
import {withAuthenticator} from  'aws-amplify-react';
Amplify.configure(aws_exports);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {  
    }

    render() { 
        // (async () => {
            
        
        //     let user = await Auth.currentAuthenticatedUser(); 
        //     console.log(user);
        
        // })();
          
   
        return(
            
            <div>
                 <img src = "https://www.broadcastingcable.com/.image/t_share/MTY1OTg5NzY2ODI1NzgxMTk1/stock-market-getty-images-rf.jpg" width="100%"></img>
            </div>
        );
    }
}

export default withAuthenticator(Dashboard, true) ;