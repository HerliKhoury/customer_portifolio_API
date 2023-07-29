import { Router } from "express";
import { createCustomerController } from "../controllers/customers.controller";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { customerSchemaReq, customerSchemaReqPatch } from "../schemas/customers.schemas";

export const customerRoutes: Router = Router();

customerRoutes.get("", );
customerRoutes.post(
    "", 
    ensureTokenIsValid, 
    ensureBodyIsValid(customerSchemaReq), 
    createCustomerController
    );
customerRoutes.patch(
    "/:id", 
    ensureTokenIsValid,  
    ensureBodyIsValid(customerSchemaReqPatch)
    );
customerRoutes.delete("/:id", ensureTokenIsValid);