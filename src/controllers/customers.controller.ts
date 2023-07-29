import { Request, Response } from "express";
import { createCustomer } from "../services/customers/createCustomer.service";
import { TCostumer, TCostumerArr, TCostumerReq } from "../interfaces/customers.interface";
import { catchAllCustomersService } from "../services/customers/catchAllCustomers.service";


export const createCustomerController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const newCustomerData: TCostumerReq = req.body;

    const newCustomer: TCostumer = await createCustomer(newCustomerData);

    return res.status(201).json(newCustomer);
};

export const catchAllCustomersController = async (
    req: Request,
    res: Response
): Promise<Response> => {

    const customersList: TCostumerArr = await catchAllCustomersService();

    return res.status(200).json(customersList);
};
