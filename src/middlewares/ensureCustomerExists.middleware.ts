import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Customer } from "../entities/customers.entity";
import { MyError } from "../errors/myError";
import { MyDataSource } from "../data-source";


export const ensureCustomerExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void>=> {
    const customerRepo: Repository<Customer> = MyDataSource.getRepository(Customer);

    const customerEmail: string = req.body.email;
    const loggedUserId: number = Number(res.locals.userId)

    const customer: Customer | null = await customerRepo.findOne({
        where: {
            user: { id: loggedUserId },
            email: customerEmail,
        }
    });

    if(!customer){
        throw new MyError("Customer not registered", 409)
    };

    return next();
}