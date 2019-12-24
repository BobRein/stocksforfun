import axios from 'axios';

export function getPrice(ticker){
    return axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/`+ticker);
}
export function getStockInfo(ticker){
    return axios.get(`https://financialmodelingprep.com/api/v3/company/profile/`+ticker);
}

export function getPreviousDay(ticker){
    return axios.get(`https://financialmodelingprep.com/api/v3/historical-price-full/`+ ticker + `?timeseries=1`);
}