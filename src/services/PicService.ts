import { IncomingForm } from "formidable";
import { IRepository } from "../repository/IRepository";
import { Service } from "./Service";

const iPicRepository = IRepository.getRepository("pic")
export class PicService extends Service {
    constructor() {
        iPicRepository ? super(iPicRepository) : null
    }
    async uploadPic<T>({ body, file }: { body: Partial<T>, file: File }) {
        const result = await this.repository.create(body)
        return result
    }
}