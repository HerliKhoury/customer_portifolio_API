import { Request, Response } from "express";
import { createCustomer } from "../services/customers/createCustomer.service";
import { TCostumer, TCostumerReq } from "../interfaces/customers.interface";


export const createCustomerController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const newCustomerData: TCostumerReq = req.body;

    const newCustomer: TCostumer = await createCustomer(newCustomerData);

    return res.status(201).json(newCustomer);
};
