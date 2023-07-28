import { Request, Response } from "express";
import { TUserReq, TUserReqUpdate, TUserRes, TUserResArr } from "../interfaces/users.interface";
import { createUserService } from "../services/users/createUser.service";
import { catchAllUsersService } from "../services/users/catchAllUsers.service";
import { updateUser } from "../services/users/updateUser.service";


export const createUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const newUserData: TUserReq = req.body;

    const newUser: TUserRes = await createUserService(newUserData);

    return res.status(201).json(newUser);
};

export const listAllUsersController = async(
    req: Request,
    res: Response
): Promise<Response> => {

    const usersList: TUserResArr = await catchAllUsersService();

    return res.status(200).json(usersList);
};

export const updateUserController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId: number = parseInt(req.params.id);
    const userData: TUserReqUpdate = req.body;

    const updatedUser: TUserRes = await updateUser(userId, userData, res);

    return res.status(200).json(updatedUser);
}