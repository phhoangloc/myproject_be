import { Request, Response } from "express"
import { IUserService } from "../services/IService"
import { Controller } from "./Controller"
import { APIResponse } from "../ult/DTO"
import { saveCookie } from "../ult/cookie"
const iUserService = new IUserService()
interface RequestExtends extends Request {
    id?: string
}
export class UserController extends Controller {
    constructor() {
        super(iUserService)
        this.service = iUserService
    }
    findOne = async (req: RequestExtends, res: Response) => {
        const id = req.id
        try {
            if (!id) {
                throw Error("no id")
            }
            const result = await this.service.findOne(id)
            if (!result?.id) {
                throw Error("no data")
            }
            const { password, ...resultWithOutPassword } = result
            const apiResponse = new APIResponse(true, "success", resultWithOutPassword)
            res.json(apiResponse)
        } catch (error: any) {
            const apiResponse = new APIResponse(false, "false", error.message)
            res.json(apiResponse)
        }
    }
    active = async (req: Request, res: Response) => {
        const query = req.query
        try {
            const result = await iUserService.active(query)
            const apiResponse = new APIResponse(true, result, null)
            res.json(apiResponse)
        } catch (error: any) {
            const apiResponse = new APIResponse(false, error.message, null)
            res.json(apiResponse)
        }

    }
    login = async (req: Request, res: Response) => {
        const body = req.body
        try {
            const token = await iUserService.login(body)
            // console.log(token)
            if (token) {
                saveCookie(token, res)
                const apiResponse = new APIResponse(true, "log in success", null)
                res.json(apiResponse)
            }
        } catch (error: any) {
            const apiResponse = new APIResponse(false, error.message, null)
            res.json(apiResponse)
        }
    }
    logout = async (req: Request, res: Response) => {
        res.clearCookie('token', {
            httpOnly: false,
            secure: false, // nếu bạn dùng HTTPS
            sameSite: 'lax' // hoặc 'lax' tùy theo setup
        });

        const apiResponse = new APIResponse(true, "log out success", null)
        res.json(apiResponse)
    }
}