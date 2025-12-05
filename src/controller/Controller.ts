import { Request, Response } from "express";
import { Service } from "../services/Service";
import { APIResponse } from "../ult/DTO"
interface RequestExtends extends Request {
    id?: string
}
export class Controller {
    service: Service

    constructor(service: Service) {
        this.service = service
    }

    findAll = async (req: RequestExtends, res: Response) => {
        const query = req.query
        try {
            // If slug is provided in query, use findBySlug instead
            const newquery = query
            newquery.hostId = req.id ? req.id : undefined
            if (query.slug) {
                const result = await this.service.findBySlug(String(query.slug))
                if (!result?.slug) {
                    throw Error("no data")
                }
                const { password, ...resultWithOutPassword } = result
                const apiResponse = new APIResponse(true, "success", resultWithOutPassword)
                res.json(apiResponse)
                return
            }

            const result = await this.service.findAll(query)
            const resultWithoutPassword = result.map((re: any) => {
                const { password, ...resultWithoutPassword } = re
                return resultWithoutPassword
            })
            const apiResponse = new APIResponse(true, "success", resultWithoutPassword)
            res.json(apiResponse)
        } catch (error: any) {
            const apiResponse = new APIResponse(false, "false", error.message)
            res.json(apiResponse)
        }

    }
    findOne = async (req: Request, res: Response) => {
        try {
            if (!req.params.id) {
                throw Error("no id")
            }
            const result = await this.service.findOne(req.params.id)
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
    findBySlug = async (req: Request, res: Response) => {
        try {
            if (!req.params.slug) {
                throw Error("no slug")
            }
            const result = await this.service.findBySlug(req.params.slug)
            if (!result?.slug) {
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
    create = async (req: RequestExtends, res: Response) => {
        const body = req.body
        body.hostId = req.id
        try {
            await this.service.create(body)
            const apiResponse = new APIResponse(true, "success", "")
            res.json(apiResponse)
        } catch (error: any) {
            const apiResponse = new APIResponse(false, error.message, null)
            res.json(apiResponse)
        }
    }
    update = async (req: RequestExtends, res: Response) => {
        try {
            const body = req.body
            const userId = req.id
            const id = req.params.id
            await this.service.update(id, userId, body)
            const apiResponse = new APIResponse(true, "success", "")
            res.json(apiResponse)
        } catch (error: any) {
            const apiResponse = new APIResponse(false, error.message, null)
            res.json(apiResponse)
        }
    }
    delete = async (req: RequestExtends, res: Response) => {
        try {
            const id = req.params.id
            const userId = req.id
            await this.service.delete(id, userId)
            const apiResponse = new APIResponse(true, "success", "")
            res.json(apiResponse)
        } catch (error: any) {
            const apiResponse = new APIResponse(false, error.message, null)
            res.json(apiResponse)
        }
    }
}