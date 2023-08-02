import { NextFunction, Request, Response } from "express";
import { FindOneOptions, Repository } from "typeorm";
import { Customer } from "../entities/customers.entity";
import { MyError } from "../errors/myError";
import { MyDataSource } from "../data-source";


export const ensureCustomerExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response>=> {
    const customerRepo: Repository<Customer> = MyDataSource.getRepository(Customer);

    const customerEmail: string = req.body.email;
    const loggedUserId: number = Number(res.locals.userId);

    const customer: Customer | null = await customerRepo
        .createQueryBuilder("customer")
        .where("customer.user = :userId", { userId: loggedUserId })
        .andWhere("customer.email = :email", { email: customerEmail })
        .getOne();


    if(!customer){
        return res.status(409).json({message: "Customer not registered"});
    };

    return next();
}