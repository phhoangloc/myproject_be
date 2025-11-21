import { Response } from "express"
import { serialize } from "cookie"

export const saveCookie = (token: any, res: Response) => {
    res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: false,
        secure: false,
        maxAge: 60 * 60 * 2,
        path: '/',
        sameSite: 'lax',
    }));
}