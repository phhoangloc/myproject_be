import { Repository } from "../repository/Repository";
import { ParsedQs } from "qs";

export class Service {
    repository: any

    constructor(repository: any) {
        this.repository = repository
    }

    async findAll(query: ParsedQs) {
        const result = await this.repository.findAll(query)
        return result
    }
    async findOne(id: string) {
        const result = await this.repository.findOne(Number(id))
        return result
    }
    async findBySlug(slug: string) {
        const result = await this.repository.findBySlug(slug)
        return result
    }
    async create<T extends { host: { connect: { id: number } } | undefined, hostId: number | undefined }>(body: Partial<T>) {
        const newBody = { ...body }
        newBody.host = body.hostId ? {
            connect: {
                id: body.hostId
            }
        } : undefined
        newBody.hostId = undefined
        const result = await this.repository.create(body)
        return result
    }
    async update<T>(id: string, body: Partial<T>) {
        const result = await this.repository.update(Number(id), body)
        return result
    }

    async delete(id: string) {
        const result = await this.repository.delete(Number(id))
        return result
    }
}