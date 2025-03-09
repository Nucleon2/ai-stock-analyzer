import 'dotenv/config'
import request from 'request';
import OpenAI from "openai";


export const analyseData = async (req, res) => {
  const ticker = req.params.ticker;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${process.env.STOCK_API}`;
  
  function fetchStockData(url) {
    return new Promise((resolve, reject) => {
      request.get({ url, json: true, headers: { 'User-Agent': 'request' } }, (err, response, data) => {
        if (err) return reject(err);
        if (response.statusCode !== 200) return reject(new Error(`Status Code: ${response.statusCode}`));
        resolve(data);
      });
    });
  }

  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return; // skip circular reference
        }
        seen.add(value);
      }
      return value;
    };
  };
  
console.log(await fetchStockData(url))

  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
  });

  // Create a prompt that includes the fetched data.
  const prompt = `Please analyze the following stock data: ${JSON.stringify(await fetchStockData(url), getCircularReplacer())}`;

// passing data to deepseek 
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an experienced financial stock analyst" },
        { role: "user", content: prompt }
      ],
      model: "deepseek-chat"
    });
    console.log(completion.choices[0].message.content)
    
  } catch (error) {
    console.error("Error during analysis:", error);
    throw error;
  }
 
};

// export const getData = async (req, res) => {
//   const ticker = req.params.ticker;
//   const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${process.env.STOCK_API}`;
  
//   try {
//     request.get({ url, json: true, headers: { 'User-Agent': 'request' } }, async (err, response, data) => {
//       if (err) {
//         console.log('Error:', err);
//         return res.status(500).json({ error: err });
//       } else if (response.statusCode !== 200) {
//         console.log('Status:', response.statusCode);
//         return res.status(response.statusCode).json({ error: data });
//       } else {
//         console.log('Fetched data:', data);

//         // Pass the fetched data to the analysis function
//       //   try {
//       //     const analysisResult = await analyseData(data);
//       //     res.status(200).json({ data, analysis: analysisResult });
//       //   } catch (analysisError) {
//       //     res.status(500).json({ error: "Analysis failed", details: analysisError });
//       //   }
//       }
//     }
//   );
//   } catch (error) {
//     console.error("Internal server error", error);
//     res.status(500).json({ error });
//   }
// };
