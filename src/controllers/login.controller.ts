import { Request, Response } from "express";
import { TLoginRequest, TLoginResponse } from "../interfaces/login.interface";
import { loginService } from "../services/login/login.service";


export const createTokenController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const loginData: TLoginRequest = req.body;

    const Response: TLoginResponse = await loginService(loginData);

    return res.json(Response);
}