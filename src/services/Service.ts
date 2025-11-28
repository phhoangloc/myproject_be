import { ParsedQs } from "qs";
import { IRepository } from "../repository/IRepository";
import { Repository } from "../repository/Repository";
const iUserRepository = IRepository.getRepository("user")
export class Service {
    repository: Repository

    constructor(repository: Repository) {
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
    async update<T>(id: string | undefined, userId: string | undefined, body: Partial<T>) {
        const item = await this.repository.findOne(Number(id))
        const user = await iUserRepository?.findOne(Number(userId))
        if (!item) {
            throw Error("this id is not existed")
        }
        const currentHostId = item.hostId
        const currentPosition = user.position
        if (Number(currentHostId) !== Number(userId) && currentPosition !== "admin") {
            throw Error("you are not the owner")
        }
        const result = await this.repository.update(Number(id), body)
        return result
    }

    async delete(id: string | undefined, userId: string | undefined) {
        const item = await this.repository.findOne(Number(id))
        const user = await iUserRepository?.findOne(Number(userId))
        if (!item) {
            throw Error("this id is not existed")
        }
        const currentHostId = item.hostId
        const currentPosition = user.position
        if (Number(currentHostId) !== Number(userId) && currentPosition !== "admin") {
            throw Error("you are not the owner")
        }
        const result = await this.repository.delete(Number(id))
        return result
    }
}