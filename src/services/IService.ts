import { UserService } from "./UserService";
import { PicService } from "./PicService";
export class IService {
    static getService(type: string): any {
        switch (type) {
            case "user":
                return new UserService();
            case "pic":
                return new PicService()
            default:
                return new UserService();
        }
    }
}