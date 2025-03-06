import request from 'request';
import 'dotenv/config'


export const getData = async (req, res) => {

  const ticker = req.params.ticker
  console.log(req.params.ticker)
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${process.env.STOCK_API}`;
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