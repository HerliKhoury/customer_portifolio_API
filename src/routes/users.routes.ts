import { Router } from "express";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { createUserController } from "../controllers/customers.controller";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { userSchemaReq } from "../schemas/users.schemas";


export const userRoutes: Router = Router();

userRoutes.post("",ensureBodyIsValid(userSchemaReq) ,createUserController);
userRoutes.get("",);
userRoutes.patch("/:id", ensureTokenIsValid);
userRoutes.delete("/:id", ensureTokenIsValid);
userRoutes.get("/:id/customers", ensureTokenIsValid); 