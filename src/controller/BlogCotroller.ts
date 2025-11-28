import { Controller } from "./Controller";
import { IService } from "../services/IService";
import { Request, Response } from "express";
import { APIResponse } from "../ult/DTO";
interface RequestExtends extends Request {
    id?: string
}
const iBlogService = IService.getService("blog")

export class BlogController extends Controller {
    constructor() {
        super(iBlogService)
    }
}