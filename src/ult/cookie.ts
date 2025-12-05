import { Response } from "express"
import { serialize } from "cookie"

export const saveCookie = (token: any, res: Response) => {
    res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
        path: '/',
        sameSite: 'lax',
    }));
}