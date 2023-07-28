import { z } from "zod";
import { loginRequestSchema } from "../schemas/login.schemas";


export type TLoginRequest = z.infer<typeof loginRequestSchema>;