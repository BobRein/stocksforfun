import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';

//these cause, error, why were they in the journalism project???? 

// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.put['Content-Type'] = 'application/json';

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


// not sure if I need this 
axios.interceptors.request.use(request => {	
	console.log(request);

	return request;
}, error => Promise.reject(error));

ReactDOM.render(
	<HashRouter>
    	<App />
  	</HashRouter>
	, document.getElementById('root')); 

