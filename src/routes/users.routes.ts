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
import { listPropertiesUser } from "../controllers/customers.controller";


export const userRoutes: Router = Router();

userRoutes.post(
    "",
    ensureBodyIsValid(userSchemaReq), 
    ensureEmailDontExist, 
    createUserController
    );


userRoutes.patch(
    "/:id", 
    ensureTokenIsValid, 
    ensureUserExists, 
    ensureEmailDontExist, 
    ensureBodyIsValid(userSchemaReqPatch), 
    updateUserController);

userRoutes.delete("/:id", ensureTokenIsValid, ensureUserExists, deleteUserController);

