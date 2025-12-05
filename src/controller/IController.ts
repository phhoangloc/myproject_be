import { UserController } from "./UserController";
import { PicController } from "./PicController";

export class IController {
    static getController(type: string) {
        switch (type) {
            case "user":
                return new UserController();
            case "pic":
                return new PicController()
            default:
                return null
        }
    }
}