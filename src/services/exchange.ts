import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.API_KEY;

async function getQuote(from_symbol: string, to_symbol: string): Promise<any>{
    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
            from_symbol: from_symbol,
            function: 'FX_INTRADAY',
            interval: '5min',
            to_symbol: to_symbol,
            outputsize: 'compact',
            datatype: 'json'
        },
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    try{
        let response = await axios.request(options);
        let QuoteData = await response.data;
        let current_time = (QuoteData["Meta Data"]["4. Last Refreshed"]);
        let quote_data = (QuoteData["Time Series FX (5min)"][current_time]);
        let quote_value: number = parseFloat(quote_data["1. open"]);
        return quote_value
    }catch(err){
        console.log(err);
    }
};

export { getQuote }