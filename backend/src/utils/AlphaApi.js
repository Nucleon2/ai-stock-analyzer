import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_KEY = process.env.STOCK_API;
const BASE_URL = "https://www.alphavantage.co/query";

export async function getCandles(ticker) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
            function: "TIME_SERIES_INTRADAY",
            symbol: ticker,
            interval: "5min",
            apikey: API_KEY
        }
    })
    return response
    } catch (error) {
        console.log("internal server error", error);
        throw error
        
    }
    
}