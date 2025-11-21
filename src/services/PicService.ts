import { IncomingForm } from "formidable";
import { IPicRepository } from "../repository/IRepository";
import { Service } from "./Service";

const iPicRepository = new IPicRepository()
export class PicService extends Service {
    constructor() {
        super(iPicRepository)
    }
    async uploadPic<T>({ body, file }: { body: Partial<T>, file: File }) {
        const result = await this.repository.create(body)
        return result
    }
}