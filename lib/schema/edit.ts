import * as z from 'zod'

export const EditUserSchema = z.object({
    userName: z.string().min(2, {message: "User must have at least 2 characters"}).max(12, {message: "User can't be longer than 12"}).optional(),
    role: z.enum(["normal", "adm"], { message: "Invalid user role" }).optional(),
    //optional
    currentPassword: z.string().min(4, {message: "Use at least 4 characters"}).max(12, {message: "Password can't be longer than 12"}).optional().or(z.literal('')),
    newPassword: z.string().min(4, {message: "Use at least 4 characters"}).max(12, {message: "Password can't be longer than 12"}).optional().or(z.literal('')),
})
