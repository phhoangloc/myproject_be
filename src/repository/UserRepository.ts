import { Repository } from "./Repository";
import { Prisma } from "../ult/prisma";

export class UserRepository extends Repository {
    constructor() {
        super(Prisma.getInstance().user)
    }
}