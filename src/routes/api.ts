import { Request, Response, Router } from "express";
import { UserRouters } from "./user";
import { AdminRouters } from "./admin";
import { IPicController, IUserController, IBlogController } from "../controller/IController";
import { MiddleWare } from "../middleware";
const iUserController = new IUserController()
const iPicController = new IPicController()
const iBlogController = new IBlogController()
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
        path: "/blog",
        action: iBlogController.findAll
    },
    {
        path: "/blog/:slug",
        action: iBlogController.findBySlug
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
uses.map(use => APIRouter.use(use.path, use.middleWare.checkPosition, use.action))
gets.map(get => APIRouter.get(get.path, get.action))
posts.map(post => APIRouter.post(post.path, post.action))