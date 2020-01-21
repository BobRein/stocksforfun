import React from 'react';
import { TextField, Button, Paper, Typography} from '@material-ui/core';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {  
    }

    render() { 
        return(
            <div>
            <br></br>
            <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-10 offset-1">
                <div className ="text-center"><h1>Welcome</h1></div>
                
                <br></br>
                <h6>CoolStockGame allows you to practice investing without using real money. Try to grow your portfolio
                     from 1 Million dollars.</h6>
                <br></br>

                <p> My name is Bob Rein and I created this website. I am still working on portions of this website.
                    Research, Sign Up, and Login are all working. 
                    Other portions will be updated soon. For more information about me please see the links below</p>
                <br></br>
                <div className="text-center">
                    <div>
                        <Button variant="contained" color="primary" href="https://www.linkedin.com/in/bob-rein/">LinkedIn</Button>
                    </div>
                    
                    <br></br>

                    <div>
                        <Button variant="contained" color="primary" href="https://github.com/BobRein">GitHub</Button>
                    </div>

                    <br></br>
                    <img width = "60%" src="https://avatars1.githubusercontent.com/u/29153606?s=400&u=5ad0f30b38a479737963e1a3079b59b42fc55dbe&v=4" ></img>
                </div>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
        );
    }
}

export default Home