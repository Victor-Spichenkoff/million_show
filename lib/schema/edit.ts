import * as z from 'zod'

export const roles = ["normal", "adm"] as const

export const EditOrCreateUserSchema = z.object({
    userName: z.string().min(2, {message: "User must have at least 2 characters"}).max(12, {message: "User can't be longer than 12"}).optional(),
    role: z.enum(roles, { message: "Invalid user role" }).optional(),
    //optional
    currentPassword: z.string().min(4, {message: "Use at least 4 characters"}).max(12, {message: "Password can't be longer than 12"}).optional().or(z.literal('')),
    newPassword: z.string().min(4, {message: "Use at least 4 characters"}).max(12, {message: "Password can't be longer than 12"}).optional().or(z.literal('')),
    password: z.string().min(4, {message: "Use at least 4 characters"}).max(12, {message: "Password can't be longer than 12"}).optional().or(z.literal('')),
    confirmPassword: z.string().min(4, {message: "Use at least 4 characters"}).max(12, {message: "Password can't be longer than 12"}).optional().or(z.literal('')),
})
