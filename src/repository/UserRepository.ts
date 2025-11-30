import { Repository } from "./Repository";
import { Prisma } from "../ult/prisma";

export class UserRepository extends Repository {
    constructor() {
        super(Prisma.getInstance().user)
    }
    async findAll<T>(where: Partial<T>) {
        const result = await this.model.findMany({
            where: where,
        })
        return result
    }
}