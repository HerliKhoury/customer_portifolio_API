import { Router } from "express";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { userSchemaReq, userSchemaReqPatch } from "../schemas/users.schemas";
import { createUserController, deleteUserController, listAllUsersController, updateUserController } from "../controllers/users.controller";


export const userRoutes: Router = Router();

userRoutes.post("",ensureBodyIsValid(userSchemaReq) ,createUserController);
userRoutes.get("", listAllUsersController);
userRoutes.patch("/:id", ensureTokenIsValid, ensureBodyIsValid(userSchemaReqPatch), updateUserController);
userRoutes.delete("/:id", ensureTokenIsValid, deleteUserController);
userRoutes.get("/:id/customers", ensureTokenIsValid, ); 