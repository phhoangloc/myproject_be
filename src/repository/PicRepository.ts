import { Repository } from "./Repository";
import { Prisma } from "../ult/prisma";
export class PicRepository extends Repository {
    constructor() {
        super(Prisma.getInstance().pic)
    }
}