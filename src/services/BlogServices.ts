import { Service } from "./Service";
import { IBlogRepository } from "../repository/IRepository";
const iBlogRepository = new IBlogRepository()
export class BlogService extends Service {
    constructor() {
        super(iBlogRepository)
    }
}