import axios from 'axios';

export function getTicker(){
    return axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/payc`)
}