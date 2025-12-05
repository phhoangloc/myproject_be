import { Router, Request, Response, request } from "express";
import { IController } from "../controller/IController";
import { UserController } from "../controller/UserController";
import { PicController } from "../controller/PicController";
const iUserController = IController.getController("user") as UserController
const iPicController = IController.getController("pic") as PicController
export const AdminRouters = Router()

AdminRouters.get("/", iUserController.findOne)
AdminRouters.get("/user", iUserController.findAll)
AdminRouters.get("/user/:id", iUserController.findOne)

AdminRouters.post("/logout", iUserController.logout)

AdminRouters.get("/pic", iPicController.findAll)
AdminRouters.post("/pic", iPicController.create)
AdminRouters.delete("/pic/:id", iPicController.delete)