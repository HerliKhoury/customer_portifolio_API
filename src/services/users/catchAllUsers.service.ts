import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { TUserArr, TUserResArr } from "../../interfaces/users.interface";
import { MyDataSource } from "../../data-source";
import { userSchemaArrRes } from "../../schemas/users.schemas";


export const catchAllUsersService = async (): Promise<TUserResArr> =>{
    const userRepo: Repository<User> = MyDataSource.getRepository(User);

    const users: TUserArr | null = await userRepo.find();
    
    const usersValid: TUserResArr = userSchemaArrRes.parse(users);

    return usersValid;
};