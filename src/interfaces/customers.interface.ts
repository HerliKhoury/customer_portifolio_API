import { z } from "zod";
import { customerSchema, customerSchemaArr, customerSchemaReq, customerSchemaReqPatch } from "../schemas/customers.schemas";

export type TCostumer = z.infer<typeof customerSchema>;
export type TCostumerReq = z.infer<typeof customerSchemaReq>;
export type TCostumerCreate = z.infer<typeof customerSchemaReq>;
export type TCostumerArr = z.infer<typeof customerSchemaArr>;
export type TCostumerPatch = z.infer<typeof customerSchemaReqPatch>;