import fetch from "node-fetch";
import { prompt } from "./promt";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: process.env.PRIVATE_KEY || "" });

export const getData = async (url: string) => {
    const res = await axios.get(url);
    const html = await res.data;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt("archive", { title: "hello", link: "hello", content: "hello" }, html)
    });
    const data = response.text || ""
    const start = data.indexOf("[");
    const end = data.lastIndexOf("]") + 1;

    const jsonString = data.substring(start, end);
    console.log(jsonString)

    const array = jsonString ? JSON.parse(jsonString) : []
    const feed = { items: array }
    return feed

}