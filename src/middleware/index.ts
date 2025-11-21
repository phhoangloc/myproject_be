import { parse } from "cookie";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IUserService } from "../services/IService";
import { APIResponse } from "../ult/DTO";
const iUserService = new IUserService()
interface CustomRequest extends Request {
    id?: number;
}
export class MiddleWare {

    position;

    constructor(position: string) {
        this.position = position;
        this.checkPosition = this.checkPosition.bind(this);
    }
    async checkPosition(req: CustomRequest, res: Response, next: NextFunction) {
        const cookies = req.headers.cookie;
        const token = cookies ? parse(cookies).token : null;
        try {
            if (!token) {
                throw new Error("you haven't logged in yet")
            }
            if (!process.env.SECRETTOKEN) {
                throw new Error("you haven't logged in yet")
            }
            const result = verify(token, process.env.SECRETTOKEN)
            if (typeof result !== 'object' || !result.id) {
                throw new Error("your token is expired")
            }
            const user = await iUserService.findOne(result.id)
            if (!user) {
                throw new Error("id is not Existed")
            }
            const currentPosition = user.position
            if (currentPosition !== "admin" && currentPosition !== this.position) {
                throw new Error("you don't have permission")
            }
            req.id = result.id
            next()
        } catch (error: any) {
            const apiResponse = new APIResponse(false, error.message, null)
            res.json(apiResponse)
        }
    }
}