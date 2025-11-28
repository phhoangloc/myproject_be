import { Router } from "express";
export const UserRouters = Router()
import { IBlogController, IUserController } from "../controller/IController";
import { IPicController } from "../controller/IController";
const iPicController = new IPicController()
const iUserController = new IUserController()
const iBlogController = new IBlogController()
UserRouters.get("/", iUserController.findOne)
// UserRouters.get("/:id", iUserController.findOne)
UserRouters.post("/logout", iUserController.logout)
UserRouters.post("/pic", iPicController.create)
UserRouters.delete("/pic/:id", iPicController.delete)

UserRouters.get("/blog/", iBlogController.findAll)
UserRouters.post("/blog/", iBlogController.create)
UserRouters.put("/blog/:id", iBlogController.update)
UserRouters.delete("/blog/:id", iBlogController.delete)
