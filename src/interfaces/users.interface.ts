import { z } from "zod"
import { userSchema, userSchemaArr, userSchemaReq, userSchemaRes } from "../schemas/users.schemas"
import { DeepPartial } from "typeorm"


export type TUser = z.infer<typeof userSchema>;
export type TUserReq = z.infer<typeof userSchemaReq>;
export type TUserRes = z.infer<typeof userSchemaRes>;
export type TUserResArr = z.infer<typeof userSchemaArr>;
export type TUserReqUpdate = DeepPartial<TUserReq>;