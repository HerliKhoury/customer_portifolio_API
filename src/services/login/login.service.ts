import { Repository } from "typeorm";
import { TLoginRequest, TLoginResponse } from "../../interfaces/login.interface";
import { User } from "../../entities/users.entity";
import { MyDataSource } from "../../data-source";
import { MyError } from "../../errors/myError";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



export const loginService = async (
    loginData: TLoginRequest
): Promise<TLoginResponse> => {
    const userRepo: Repository<User> = MyDataSource.getRepository(User);

    const user: User | null = await userRepo.findOne({
        where: {
            email: loginData.email
        },
    });

    if (!user) {
        throw new MyError("Invalid credentials", 401);
    };

    const passwordMatch = await compare(loginData.password, user.password);

    if (!passwordMatch) {
        throw new MyError("Invalid credentials", 401)
    };
    
    const token: string = jwt.sign(
        {
            userId: user.id,
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: "1d",
            subject: user.id.toString()
        }
    );

    return {token: token, name: user.full_name , phone: user.phone_number};
};