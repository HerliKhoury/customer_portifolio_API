import { Router } from "express";
import { catchAllCustomersController, createCustomerController, deleteCustomerController, listPropertiesUser, updateCustomerController } from "../controllers/customers.controller";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { customerSchemaReq, customerSchemaReqPatch } from "../schemas/customers.schemas";
import { ensureCustomerDontExist } from "../middlewares/ensureCustomerDontExist";
import { ensureCustomerExists } from "../middlewares/ensureCustomerExists.middleware";

export const customerRoutes: Router = Router();

customerRoutes.get("", ensureTokenIsValid, listPropertiesUser);

customerRoutes.post(
    "", 
    ensureTokenIsValid, 
    ensureBodyIsValid(customerSchemaReq),
    ensureCustomerDontExist, 
    createCustomerController
    );
customerRoutes.patch(
    "/:id", 
    ensureTokenIsValid,  
    ensureBodyIsValid(customerSchemaReqPatch),
    ensureCustomerDontExist,
    updateCustomerController
    );
customerRoutes.delete(
    "/:id", 
    ensureTokenIsValid,
    deleteCustomerController
    );