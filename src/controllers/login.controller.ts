import { Request, Response } from "express";
import { TLoginRequest } from "../interfaces/login.interface";
import { loginService } from "../services/login/login.service";


export const createTokenController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const loginData: TLoginRequest = req.body;

    const token: string = await loginService(loginData);

    return res.json({ token });
}