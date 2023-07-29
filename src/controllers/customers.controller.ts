import { Request, Response } from "express";
import { createCustomer } from "../services/customers/createCustomer.service";
import { TCostumer, TCostumerArr, TCostumerPatch, TCostumerReq } from "../interfaces/customers.interface";
import { catchAllCustomersService } from "../services/customers/catchAllCustomers.service";
import { updateCustomerService } from "../services/customers/updateCustomer.service";


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

export const updateCustomerController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const customerId: number = parseInt(req.params.id);
    const customerData: TCostumerPatch = req.body;

    const updatedCustomer: TCostumer = await updateCustomerService(customerId, customerData);

    return res.status(200).json(updatedCustomer);
}
