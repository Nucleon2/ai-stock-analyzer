import express from "express"
import dotenv from "dotenv"

const app = express()

const port = 5000

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})