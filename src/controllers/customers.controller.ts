import { Request, Response } from "express";
import { TUserReq, TUserRes } from "../interfaces/users.interface";
import { createUserService } from "../services/users/createUser.service";


export const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const newUserData: TUserReq = req.body;

    const newUser: TUserRes = await createUserService(newUserData);

    return res.status(201).json(newUser);
};