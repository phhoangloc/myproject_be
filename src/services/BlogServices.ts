import { ParsedQs } from "qs";
import { Service } from "./Service";
import { IRepository } from "../repository/IRepository";
const iBlogRepository = IRepository.getRepository("blog")
export class BlogService extends Service {
    constructor() {
        iBlogRepository ? super(iBlogRepository) : null
    }

    async findAll(query: ParsedQs) {
        const newQuery = query ? {
            slug: query.slug ? query.slug : undefined,
            hostId: query.hostId ? query.hostId : undefined
        } : {}
        const result = await this.repository.findAll(newQuery)
        return result
    }

}