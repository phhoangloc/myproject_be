import { Repository } from "./Repository";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class PicRepository extends Repository {
    constructor() {
        super(prisma.pic)
    }
}