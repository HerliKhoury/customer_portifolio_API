import { Repository } from "typeorm";
import { MyDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { TUserReq, TUserRes } from "../../interfaces/users.interface";
import { userSchemaRes } from "../../schemas/users.schemas";


export const createUserService = async(userData: TUserReq): Promise<TUserRes> => {
    const userRepo: Repository<User> = MyDataSource.getRepository(User);
    
    const newUser = userRepo.create(userData);

    const userEntity = await userRepo.save(newUser);

    const validUser: TUserRes = userSchemaRes.parse(userEntity);

    return validUser;
};