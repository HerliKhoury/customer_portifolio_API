import { Repository } from "typeorm";
import { User } from "../../entities/users.entity";
import { MyDataSource } from "../../data-source";
import { MyError } from "../../errors/myError";


export const deleteUser = async (userId: number): Promise<void> => {
    const userRepository: Repository<User> = MyDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        id: userId
    });

    if(!user){
        throw new MyError("User not found", 404);
    }else{
        userRepository.remove(user);
    }
}