import { UserRepository } from "./UserRepository";
import { PicRepository } from "./PicRepository";
import { BlogRepository } from "./BlogRepository";
export class IRepository {
    static getRepository(type: string) {
        switch (type) {
            case "user":
                return new UserRepository();
            case "blog":
                return new BlogRepository();
            case "pic":
                return new PicRepository()
            default:
                return null
        }
    }
}