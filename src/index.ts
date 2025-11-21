import express from "express"
import { APIRouter } from "./routes/api";
import bodyParser from 'body-parser';
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000
app.use(bodyParser.json({ limit: '5mb' }));

app.use("/api", APIRouter)
app.listen(PORT, () => {
    console.log("connect success!")
})