import { Controller } from "./Controller";
import { IPicService } from "../services/IService";
import { Request, Response } from "express";
import { IncomingForm } from "formidable";
import { sftpConfig } from "../ult/sftp";
import Client from "ssh2-sftp-client"
import moment from "moment";
import { APIResponse } from "../ult/DTO";
import { IUserRepository } from "../repository/IRepository";
const iUserRepository = new IUserRepository()
const iPicService = new IPicService()
interface CustomRequest extends Request {
    id?: number;
}
export class PicController extends Controller {
    constructor() {
        super(iPicService)
    }

    create = async (req: CustomRequest, res: Response) => {
        const form = new IncomingForm();
        const today = new Date();
        form.parse(req, async (err: Error, fields: any, files: any) => {
            if (err) {
                const apiResponse = new APIResponse(false, err.message, null)
                res.json(apiResponse)

            } else {
                const uploadFile = files && files.file;
                const client = new Client();

                await client.connect(sftpConfig).then(async () => {
                    await client.put(uploadFile[0].filepath, process.env.FTP_PATH + moment(today).format("YYYY.MM.DD_hh-mm-ss") + "_" + uploadFile[0].originalFilename)
                });
                client.end()
                const body = { hostId: Number(req.id), name: moment(today).format("YYYY.MM.DD_hh-mm-ss") + "_" + uploadFile[0].originalFilename }
                const result = await this.service.create(body)

                const apiResponse = new APIResponse(true, "success", result.name)
                res.json(apiResponse)
            }
        })
    }

    delete = async (req: CustomRequest, res: Response) => {
        const userId = req.id
        const picId = req.params.id
        if (!picId) {
            return
        }
        const user = await iUserRepository.findOne(Number(userId))
        const pic = await this.service.findOne(picId || "0")
        if (Number(userId) === Number(pic.hostId) || user?.position === "admin") {
            try {
                const pic = await this.service.delete(picId)
                console.log(pic)
                const client = new Client();
                await client.connect(sftpConfig).then(async () => {
                    await client.delete(process.env.FTP_PATH + pic.name);
                    client.end()
                })
                const apiResponse = new APIResponse(true, "your picture has been deleted", pic.name)
                res.json(apiResponse)
            } catch (error: any) {
                console.log(error)
                const apiResponse = new APIResponse(false, "ERR! something wrong", error.massage)
                res.json(apiResponse)
            }
        } else {
            const apiResponse = new APIResponse(false, "you are not owner 's picture", null)
            res.json(apiResponse)

        }
    }
}