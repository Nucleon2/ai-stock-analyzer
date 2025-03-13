import express from "express"
import stockData from "./src/routes/api.js"
const app = express()

const port = 5000

app.use("/analyseStock", stockData)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})