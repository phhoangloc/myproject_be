import { UserRepository } from "./UserRepository";
import { PicRepository } from "./PicRepository";
export class IRepository {
    static getRepository(type: string) {
        switch (type) {
            case "user":
                return new UserRepository();
            case "pic":
                return new PicRepository()
            default:
                return null
        }
    }
}