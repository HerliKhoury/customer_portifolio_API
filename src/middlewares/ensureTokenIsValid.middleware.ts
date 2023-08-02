import { NextFunction, Request, Response } from "express";
import { MyError } from "../errors/myError";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const ensureTokenIsValid = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    let token = req.headers.authorization;

    if(!token){
        throw new MyError("Missing token", 401);
    }

    token = token.split(" ")[1];

    jwt.verify(
        token,
        process.env.SECRET_KEY!,
        (err: any,  decoded: any) => {
            if(err){
                throw new MyError(err.message, 401)
            } 
            res.locals.userId = decoded.userId;
        }
    );

    return next();
};