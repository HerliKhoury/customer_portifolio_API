import { NextFunction, Request, Response } from "express";
import { MyDataSource } from "../data-source";
import { MyError } from "../errors/myError";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";

export const ensureUserExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void>=> {
    const userRepo: Repository<User> = MyDataSource.getRepository(User);

    const userId: number = Number(req.params.id);

    const user: User | null = await userRepo.findOne({
        where: {
            id: userId
        }
    });

    if(!user){
        throw new MyError("User not found!", 409)
    };

    return next();
}