import axios from 'axios';

export function createNewUser(newUsername){
    
    return axios.post('https://7yxt956362.execute-api.us-east-2.amazonaws.com/prod', {
        username: newUsername
      });
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // return axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/`+ticker);
}
