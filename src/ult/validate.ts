import { IUserRepository } from "../repository/IRepository"
import { PrismaClient } from "@prisma/client"

const iUserRepository = new IUserRepository()

const prisma = new PrismaClient()

const validateUsernameExist = async (username: string) => {
    const user = await iUserRepository.findAll({ username: username })
    if (user[0]?.username === username) {
        return "this username is existed"
    }
}
const validateEmailExist = async (email: string) => {
    const user = await iUserRepository.findAll({ email })
    if (user[0]?.email === email) {
        return "this email is existed"
    }
}
const validateUsernameLength = async (username: string) => {
    if (username.length < 6) {
        return "your username must be equal or larger than 6 character"
    }

}
const validatePasswordLength = async (password: string) => {
    if (password.length < 6) {
        return "your password must be equal or larger than 6 character"
    }

}
const validateEmailLength = async (email: string) => {
    if (!/\S+@\S+\.\S+/.test(email) && email.length != 0) {
        return "your email is not valid"
    }

}

export const validate = async (body: any) =>
    await validateUsernameLength(body.username)
    || await validateUsernameExist(body.username)
    || await validatePasswordLength(body.password)
    || await validateEmailLength(body.email)
    || await validateEmailExist(body.email)

