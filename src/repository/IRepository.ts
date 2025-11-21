import { UserRepository } from "./UserRepository";
import { PicRepository } from "./PicRepository";
import { BlogRepository } from "./BlogRepository";
export class IUserRepository extends UserRepository { }
export class IPicRepository extends PicRepository { }
export class IBlogRepository extends BlogRepository { }