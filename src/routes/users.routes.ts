import { Router } from "express";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { createUserController } from "../controllers/customers.controller";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { userSchemaReq } from "../schemas/users.schemas";
import { catchAllUsersService } from "../services/users/catchAllUsers.service";


export const userRoutes: Router = Router();

userRoutes.post("",ensureBodyIsValid(userSchemaReq) ,createUserController);
userRoutes.get("", catchAllUsersService);
userRoutes.patch("/:id", ensureTokenIsValid);
userRoutes.delete("/:id", ensureTokenIsValid);
userRoutes.get("/:id/customers", ensureTokenIsValid); 