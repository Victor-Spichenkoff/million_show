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



export const answerIndexArray = ["A", "B", "C", "D"] as const
export const levelArray = ["Easy", "Medium", "Hard"] as const

export const EditOrCreateQuestionSchema = z.object({
    label: z.string().min(4, { message: "Use at least 4 characters" }).max(125, {message: "Can't be longer than 125"}),
    option1: z.string().min(4, { message: "Use at least 4 characters" }).max(125, {message: "Can't can't be longer than 125"}),
    option2: z.string().min(4, { message: "Use at least 4 characters" }).max(125, {message: "Can't can't be longer than 125"}),
    option3: z.string().min(4, { message: "Use at least 4 characters" }).max(125, {message: "Can't can't be longer than 125"}),
    option4: z.string().min(4, { message: "Use at least 4 characters" }).max(125, {message: "Can't can't be longer than 125"}),
    answerIndex: z.enum(answerIndexArray),
    isBr: z.boolean(),
    level: z.enum(levelArray)
})
