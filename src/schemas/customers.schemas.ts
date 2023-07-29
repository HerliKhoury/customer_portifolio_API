import { z } from "zod";

export const customerSchema = z.object({
    id: z.number().int().positive(),
    full_name: z.string().max(100),
    email: z.string().email().max(45),
    phone_number: z.string().max(20).nonempty(),
    created_at: z.string()    
})

export const customerSchemaReq = customerSchema.omit({id: true});

export const customerSchemaArr = z.array(customerSchema);

export const customerSchemaReqPatch = customerSchemaReq.optional();