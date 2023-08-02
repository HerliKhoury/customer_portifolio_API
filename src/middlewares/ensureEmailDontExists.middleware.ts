import { NextFunction, Request, Response } from "express";
import { MyDataSource } from "../data-source";
import { MyError } from "../errors/myError";
import { Repository } from "typeorm";
import { User } from "../entities/users.entity";

export const ensureEmailDontExist = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void>=> {
    const userRepo: Repository<User> = MyDataSource.getRepository(User);

    const userEmail: string = req.body.email;

    const user: User | null = await userRepo.findOne({
        where: {
            email: userEmail
        }
    });

    if(user){
        throw new MyError("Email already exists", 409)
    };

    return next();
}