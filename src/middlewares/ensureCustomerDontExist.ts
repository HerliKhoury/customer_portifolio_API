import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Customer } from "../entities/customers.entity";
import { MyDataSource } from "../data-source";


export const ensureCustomerDontExist = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void | Response>=> {
    const customerRepo: Repository<Customer> = MyDataSource.getRepository(Customer);

    const customerEmail: string = req.body.email;
    const loggedUserId: number = Number(res.locals.userId)


    const customer: Customer | null = await customerRepo
        .createQueryBuilder("customer")
        .where("customer.user = :userId", { userId: loggedUserId })
        .andWhere("customer.email = :email", { email: customerEmail })
        .getOne();
    
    if(customer){
        return res.status(409).json({message: "Customer already registered"});
    };

    return next();
}