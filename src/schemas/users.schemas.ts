import { z } from "zod";

export const userSchema = z.object({
    id: z.number().int().positive(),
    full_name: z.string().max(100),
    email: z.string().email().max(45),
    password: z.string().max(100).nonempty(),
    phone_number: z.string().max(20).nonempty(),
    created_at: z.string()    
})

export const userSchemaReq = userSchema.omit({id: true, createdAt: true });

export const userSchemaRes = userSchema.omit({password: true});

export const userSchemaArr = z.array(userSchema);

export const userSchemaArrRes = z.array(userSchemaRes);

export const userSchemaReqPatch = userSchemaReq.optional();