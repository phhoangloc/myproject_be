import express from "express"
import { APIRouter } from "./routes/api";
import bodyParser from 'body-parser';
import cors from 'cors';
import { callAI, callAIToMakeDescription, callAIToMakeImage, callAIToMakeKeyword } from "./automation/autopost";
import { urlToFile } from "./automation/file";
import moment from "moment";
import { getData } from "./automation/fetch";
import axios from "axios";
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

// Configure CORS to allow localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie']
}));

app.use(bodyParser.json({ limit: '5mb' }));

app.use("/api", APIRouter)
app.listen(PORT, () => {
    console.log("connect success!")
})

const run = async (item: any) => {
    console.log("start")

    const body = {
        title: item?.title || "",
        link: item?.link || "",
        content: item?.content || "",
    }
    if (!body.title || !body.content || !body.link) {
        return
    }
    console.log("post a blog from link ..." + body.link)
    console.log("load image from link ..." + body.link)
    const images = await callAIToMakeImage(body)
    console.log(images)
    console.log(body.link)

    const coverString = images ? images[0] : ""
    if (!coverString) {
        console.log("no coverstring")
        return
    }
    console.log("upload cover ...")
    console.log("link cover : " + coverString)

    console.log("creating file ...")
    const file = await urlToFile(coverString)
    if (!file) {
        console.log("no file")
        return
    }
    console.log("file : ")
    console.log(file)
    const formData = new FormData();
    formData.append("file", file)
    const resultImage = await axios.post(process.env.NODE_APP_URL + "api/user/pic", formData, {
        headers: {
            cookie: `token=${process.env.ADMIN_TOKEN || ""}`
        }
    });
    const cover = resultImage.data.data.name
    console.log("upload cover finish")

    console.log("creating a post ...")
    const keyword = await callAIToMakeKeyword(body)
    const description = await callAIToMakeDescription(body)
    const text = await callAI(body, images)
    const resultBody = {
        name: body.title,
        slug: body.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "").toLowerCase(),
        content: text || "",
        description: description,
        keyword: keyword,
        cover: cover
    }
    try {
        const result = await axios.post(process.env.NODE_APP_URL + "api/user/blog", resultBody, {
            headers: {
                cookie: `token=${process.env.ADMIN_TOKEN || ""}`
            }
        });
        console.log(result.data)
        console.log("create post finish")
    } catch (error: any) {
        console.log(error.message)
    }
    // };

}
const runAutomation = async () => {
    console.log(moment(new Date()).format("YYYY-MM-DD hh:mm:ss"))
    const feed = await getData("https://baomoi.com/kham-pha-viet-nam-top335.epi")
    console.log(feed)
    if (!feed || !feed.items.length) {
        return
    }
    console.log("start creating a post")
    const items = feed.items
    for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const result = await axios.get(process.env.NODE_APP_URL + "api/blog?slug=" + item.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "").toLowerCase());
        console.log(result.data.success)
        if (result.data.success) {
            continue
        }
        await run(item)
        break
    }
}

// runAutomation()

