import {z} from "zod";
import {Status} from '@prisma/client'

export const ValidationSchemas = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    status: z.nativeEnum(Status)
});