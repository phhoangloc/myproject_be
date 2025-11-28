import { Service } from "./Service";
import { decode, encode } from "../ult/bscrypt";
import { sendMailToAcceptRegister } from "../ult/mail";
import { generateToken } from "../ult/jwt";
import { IRepository } from "../repository/IRepository";
import { ValidateUser } from "../ult/validate";
const iUserRepository = IRepository.getRepository("user")
export class UserService extends Service {
    constructor() {
        iUserRepository ? super(iUserRepository) : null
    }
    async findAll(query: { username: string, email: string }) {
        const newQuery = query ? {
            username: query.username ? query.username : undefined,
            email: query.email ? query.email : undefined
        } : {}
        const result = await this.repository.findAll(newQuery)
        return result
    }
    async create(body: any) {
        const userUsername = await iUserRepository?.findAll({ username: body.username })
        if (userUsername[0]?.username === body.username) {
            throw new Error("this username is existed")
        }

        const userEmail = await iUserRepository?.findAll({ email: body.email })
        if (userEmail[0]?.email === body.email) {
            throw new Error("this email is existed")
        }
        const validateUser: { username: string, password: string, email: string } = new ValidateUser()
            .setusername(body.username)
            .setpassword(body.password)
            .setemail(body.email)
            .build()

        const password_encode = encode(body.password)
        const newBody = { ...validateUser }
        newBody.password = password_encode
        console.log(newBody);
        try {
            await this.repository.create(newBody)
            await sendMailToAcceptRegister(newBody.email)
            return "please check email to active account"
        } catch (err) {
            throw err
        }

    }
    async active(query: any) {
        const users = await this.repository.findAll({ email: query.email })
        const id = users[0]?.id
        if (!id) {
            throw Error("this email is not existed")
        }
        try {
            await this.repository.update(id, { active: true })
            return "your account is active"
        } catch (err) {
            throw err
        }

    }
    async login(body: any) {
        const users = await this.repository.findAll({ username: body.username })
        const id = users[0]?.id
        if (!id) {
            throw Error("this username is not existed")
        }
        const active = users[0]?.active
        if (!active) {
            throw Error("this account is not active")
        }
        const password = users[0]?.password
        if (!password) {
            throw Error
        }
        const isPasswordCorrect = decode(body.password, password)
        if (!isPasswordCorrect) {
            throw Error("this password is not correct")
        }
        try {
            const isToken = await generateToken(id)
            const token = isToken ? isToken : ""
            return token
        } catch (error) {
            throw error
        }

    }
}