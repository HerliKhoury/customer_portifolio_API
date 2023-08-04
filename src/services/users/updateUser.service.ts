import { Response } from "express";
import { MyDataSource } from "../../data-source";
import { MyError } from "../../errors/myError";
import { TUserReqUpdate, TUserRes } from "../../interfaces/users.interface";
import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { userSchemaRes } from "../../schemas/users.schemas";

export const updateUser = async (
    userId: number, 
    userData: TUserReqUpdate, 
): Promise<TUserRes> => {
    const userRepo: Repository<User> = MyDataSource.getRepository(User);
    
    const oldUserData: User | null = await userRepo.findOneBy({
        id: userId
    });

    if(!oldUserData){
        throw new MyError("User not found", 404);
    }

    const newUserData: User = userRepo.create({
        ...oldUserData,
        ...userData
    });

    await userRepo.save(newUserData);

    const returnUser: TUserRes = userSchemaRes.parse(newUserData);

    return returnUser;
}