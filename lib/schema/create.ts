import * as z from 'zod'

export const CreateSchema = z.object({
    userName: z.string().min(2, {message: "User must have at least 2 characters"}).max(12, {message: "User can't be longer than 12"}),
    password: z.string().min(4, {message: "Use at least 4 characters"}).max(12, {message: "Password can't be longer than 12"}),
    passwordConfirm: z.string().min(4, {message: "Use at least 4 characters"}).max(12, {message: "Password can't be longer than 12"}),
})
