import express from "express"
import {getData, analyseData} from "../controllers/stockController.js"

const router = express.Router()

router.get("/:ticker", getData)
router.post("/analyse", analyseData)

export default router