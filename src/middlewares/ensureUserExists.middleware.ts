import { NextFunction, Request, Response } from "express";
import { MyDataSource } from "../data-source";
import { MyError } from "../errors/myError";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";

export const ensureUserExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response>=> {
    const userRepo: Repository<User> = MyDataSource.getRepository(User);

    const userId: number = Number(req.params.id);

    const user: User | null = await userRepo.findOne({
        where: {
            id: userId
        }
    });

    if(!user){
        return res.status(409).json({message: "User not found!"});
    };

    return next();
}