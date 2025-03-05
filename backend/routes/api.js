import express from "express"
import {getData} from "../controllers/stockController.js"

const router = express.Router()

router.get("/stockdata", getData)

export default router