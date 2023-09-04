import { Request, Response } from "express";
import { createCustomer } from "../services/customers/createCustomer.service";
import { TCostumer, TCostumerArr, TCostumerCreate, TCostumerPatch, TCostumerReq } from "../interfaces/customers.interface";
import { catchAllCustomersService } from "../services/customers/catchAllCustomers.service";
import { updateCustomerService } from "../services/customers/updateCustomer.service";
import { deleteCustomerService } from "../services/customers/deleteCustomer.service";
import { listPropertiesService } from "../services/customers/catchUserCustomers.service";


export const createCustomerController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const newCustomerData: TCostumerReq = req.body;
    const loggedUserId: number = Number(res.locals.userId);

    const newCustomer: TCostumer = await createCustomer(newCustomerData, loggedUserId);

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

export const deleteCustomerController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const customerId: number = parseInt(req.params.id);

    await deleteCustomerService(customerId);

    return res.status(204).send();
}

export const listPropertiesUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userId: number = res.locals.userId;
    
    const propertiesList: TCostumer[] | null = await listPropertiesService(userId);

    return res.status(201).json(propertiesList);
};