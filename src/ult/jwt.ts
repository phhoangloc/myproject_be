import { sign } from "jsonwebtoken";

export const generateToken = async (id: number) => {
    const payload = { id };
    if (process.env.SECRETTOKEN) {
        return sign(payload, process.env.SECRETTOKEN, { expiresIn: "24h" })
    } else {
        throw Error("you must provide the secret token")
    }

};
