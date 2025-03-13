import 'dotenv/config'
import OpenAI from "openai";
import {getCandles} from "../utils/AlphaApi.js"


export const analyseData = async (req, res) => {
  const ticker = req.params.ticker;
  
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
  
  const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
  });

  // Create a prompt that includes the fetched data.
  const prompt = `You are provided with a JSON file containing 5-minute candlestick stock data, where each entry includes the open, high, low,
   close, and volume values for that period. Analyze the data by examining the price action and volume trends. Look for key patterns such as momentum
    shifts, volume spikes, support and resistance levels, and any significant candlestick patterns that indicate market sentiment changes. Based on your
     analysis, provide a concise text summary highlighting the most critical insights and trends. Keep the response brief, focusing only on essential facts
      and actionable observations.: ${JSON.stringify(await getCandles(ticker), getCircularReplacer())}`;

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
    res.status(401).json(completion.choices[0].message.content)
    
  } catch (error) {
    console.error("Error during analysis:", error);
    throw error;
  }
 
};
