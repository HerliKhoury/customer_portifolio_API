import { NextFunction, Request, Response } from "express";
import { MyError } from "./myError";
import { ZodError } from "zod";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _: NextFunction
) => {
    if(err instanceof MyError){
        return res.status(err.statusCode).json({message: err.message});
    }

    if(err instanceof ZodError){
        return res.status(400).json({message: err.flatten().fieldErrors})
    }

    console.log(err);

    return res.status(500).json({message: "Internal server error"});
}