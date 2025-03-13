import express from "express"
import { analyseData} from "../controllers/stockController.js"

const router = express.Router()

router.get("/:ticker", analyseData)

export default router