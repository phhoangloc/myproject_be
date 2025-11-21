import { Request, Response } from "express";
import { Service } from "../services/Service";
import { APIResponse } from "../ult/DTO"
export class Controller {
    service: Service

    constructor(service: Service) {
        this.service = service
    }

    findAll = async (req: Request, res: Response) => {
        const query = req.query
        try {
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
    create = async (req: Request, res: Response) => {
        try {
            const body = req.body
            await this.service.create(body)
            const apiResponse = new APIResponse(true, "success", "")
            res.json(apiResponse)
        } catch (error: any) {
            const apiResponse = new APIResponse(false, "false", error.message)
            res.json(apiResponse)
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            const body = req.body
            const id = req.params.id
            if (!id) {
                throw Error("no id")
            }
            await this.service.update(id, body)
            const apiResponse = new APIResponse(true, "success", "")
            res.json(apiResponse)
        } catch (error: any) {
            const apiResponse = new APIResponse(false, "false", error.message)
            res.json(apiResponse)
        }
    }
    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            if (!id) {
                throw Error("no id")
            }
            await this.service.delete(id)
            const apiResponse = new APIResponse(true, "success", "")
            res.json(apiResponse)
        } catch (error: any) {
            const apiResponse = new APIResponse(false, "false", error.message)
            res.json(apiResponse)
        }
    }
}