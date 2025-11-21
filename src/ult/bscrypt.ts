import { compare, genSaltSync, hashSync } from "bcryptjs";

export const encode = (str: string) => {
    const salt = genSaltSync(10);
    const result = str && hashSync(str, salt);
    return result
}
export const decode = async (password: string, currentPassword: string) => {
    const isValid = await compare(password, currentPassword);
    return isValid
};