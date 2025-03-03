import express from "express"
import {getData} from "../controllers.js"

const router = express.Router()

router.get("/stockdata", getData)