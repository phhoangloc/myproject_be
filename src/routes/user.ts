import { Router } from "express";
export const UserRouters = Router()
import { IController } from "../controller/IController";
import { UserController } from "../controller/UserController";
import { PicController } from "../controller/PicController";
const iUserController = IController.getController("user") as UserController
const iPicController = IController.getController("pic") as PicController

UserRouters.get("/", iUserController.findOne)
// UserRouters.get("/:id", iUserController.findOne)
UserRouters.post("/logout", iUserController.logout)

UserRouters.get("/pic", iPicController.findAll)
UserRouters.post("/pic", iPicController.create)
UserRouters.delete("/pic/:id", iPicController.delete)

