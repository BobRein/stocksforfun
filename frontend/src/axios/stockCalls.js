import axios from 'axios';

export function getTicker(ticker){
    return axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/`+ticker)
}