import { Repository } from "typeorm";
import { MyDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { TUser, TUserReq } from "../../interfaces/users.interface";
import { userSchema } from "../../schemas/users.schemas";


export const createUserService = async(userData: TUserReq): Promise<TUser> => {
    const userRepo: Repository<User> = MyDataSource.getRepository(User);

    const newUser = userRepo.create(userData);

    const userEntity = await userRepo.save(newUser);

    const validUser: TUser = userSchema.parse(userEntity);

    return validUser;
};