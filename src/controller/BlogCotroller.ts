import { Controller } from "./Controller";
import { IBLogService } from "../services/IService";
const iBlogService = new IBLogService()
export class BlogController extends Controller {
    constructor() {
        super(iBlogService)
    }
}