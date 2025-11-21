import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { Repository } from "./Repository";

export class UserRepository extends Repository {
    constructor() {
        super(prisma.user)
    }
}