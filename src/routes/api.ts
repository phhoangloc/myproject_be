import { Request, Response, Router } from "express";
import { UserRouters } from "./user";
import { AdminRouters } from "./admin";
import { MiddleWare } from "../middleware";
import { IController } from "../controller/IController";
import { UserController } from "../controller/UserController";
import { PicController } from "../controller/PicController";
const iUserController = IController.getController("user") as UserController
const iPicController = IController.getController("pic") as PicController
// const iBlogController = new IBlogController()
const UserMiddleware = new MiddleWare("user")
const AdminMiddleware = new MiddleWare("admin")
export const APIRouter = Router()

const action = (req: Request, res: Response) => {
    res.json("hello")
}
const uses = [

    {
        path: "/user",
        middleWare: UserMiddleware,
        action: UserRouters
    },
    {
        path: "/admin",
        middleWare: AdminMiddleware,
        action: AdminRouters
    }
]
const gets = [
    {
        path: "/",
        action: action
    },
    {
        path: "/pic",
        action: iPicController.findAll
    },
    {
        path: "/active",
        action: iUserController.active
    },
]
const posts = [
    {
        path: "/login",
        action: iUserController.login
    },
    {
        path: "/signup",
        action: iUserController.create
    }
]
uses.map(user => APIRouter.use(user.path, user.middleWare.checkPosition, user.action))
gets.map(get => APIRouter.get(get.path, get.action))
posts.map(post => APIRouter.post(post.path, post.action))