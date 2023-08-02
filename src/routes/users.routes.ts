import { Router } from "express";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureBodyIsValid } from "../middlewares/ensureBodyIsValid.middleware";
import { userSchemaReq, userSchemaReqPatch } from "../schemas/users.schemas";
import { 
    createUserController, 
    deleteUserController, 
    listAllUsersController, 
    updateUserController 
} from "../controllers/users.controller";
import { ensureEmailDontExist } from "../middlewares/ensureEmailDontExists.middleware";
import { ensureUserExists } from "../middlewares/ensureUserExists.middleware";


export const userRoutes: Router = Router();

userRoutes.post(
    "",
    ensureBodyIsValid(userSchemaReq), 
    ensureEmailDontExist, 
    createUserController
    );
userRoutes.get("", listAllUsersController);
userRoutes.patch(
    "/:id", 
    ensureTokenIsValid, 
    ensureUserExists, 
    ensureEmailDontExist, 
    ensureBodyIsValid(userSchemaReqPatch), 
    updateUserController);
userRoutes.delete("/:id", ensureTokenIsValid, ensureUserExists, deleteUserController);
userRoutes.get("/:id/customers", ensureTokenIsValid, ensureUserExists); 