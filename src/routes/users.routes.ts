import { Router } from "express";
import { ensureTokenIsValid } from "../middlewares/ensureTokenIsValid.middleware";


export const userRoutes: Router = Router();

userRoutes.post("",);
userRoutes.get("",);
userRoutes.patch("/:id", ensureTokenIsValid);
userRoutes.delete("/:id", ensureTokenIsValid);
userRoutes.get("/:id/customers", ensureTokenIsValid); 