import { Repository } from "./Repository";
import { Prisma } from "../ult/prisma";

export class BlogRepository extends Repository {

    constructor() {
        super(Prisma.getInstance().blog)
    }
} 