import { Repository } from "./Repository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export class BlogRepository extends Repository {

    constructor() {
        super(prisma.blog)
    }
} 