import { Router, Request, Response, request } from "express";
import { IUserController } from "../controller/IController";
const iUserController = new IUserController()
export const AdminRouters = Router()

AdminRouters.get("/", iUserController.findAll)