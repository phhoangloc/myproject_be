import { UserService } from "./UserService";
import { PicService } from "./PicService";
import { BlogService } from "./BlogServices";
export class IService {
    static getService(type: string): any {
        switch (type) {
            case "user":
                return new UserService();
            case "blog":
                return new BlogService();
            case "pic":
                return new PicService()
            default:
                return new UserService();
        }
    }
}