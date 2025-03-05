import request from 'request';
import 'dotenv/config'

const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${process.env.STOCK_API}`;

export const getData = async (req, res) => {
    try {
        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
          }, (err, response, data) => {
            if (err) {
              console.log('Error:', err);
            } else if (response.statusCode !== 200) {
              console.log('Status:', response.statusCode);
            } else {
              // data is successfully parsed as a JSON object:
              console.log(data);
              res.status(201).json(data)
            }
        });
    } catch (error) {
        console.log("internal server error", error);
        res.status(500, error)
        
    }
}