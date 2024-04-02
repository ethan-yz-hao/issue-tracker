import {z} from "zod";
import {Status} from '@prisma/client'

export const issueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required').max(65535),
    status: z.nativeEnum(Status)
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255).optional(),
    description: z.string().min(1, 'Description is required').max(65535).optional(),
    status: z.nativeEnum(Status).optional(),
    assignedToUserId: z.string().min(1, 'Assignee is required').max(255).optional().nullable(),
});