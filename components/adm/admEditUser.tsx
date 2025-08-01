import {Dispatch, SetStateAction} from "react";
import {AdmModes} from "@/app/(protected)/adm/page";
import {User, UserRoles} from "@/types/user";
import {Controller, FormProvider, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {getAccessToken,} from "@/storage/cookie/auth";
import {EditOrCreateUserSchema, roles} from "@/lib/schema/edit";
import {FormInput} from "@/components/auth/input";
import {clearCacheForPrefix} from "@/util/cache";
import {handleApiCall} from "@/services/handleApiCall";
import {Button} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {FormLabel} from "@/components/ui/form";
import {LoginResponse} from "@/types/responses/auth";


interface IdmViewUser {
    setMode: Dispatch<SetStateAction<AdmModes>>
    setEditionEntity: (n: null | User) => void
    user: User
    setGlobalIsLoading: Dispatch<SetStateAction<boolean>>
    isAdd?: boolean
}

export const AdmEditUser = ({isAdd, setMode, setEditionEntity, user, setGlobalIsLoading}: IdmViewUser) => {
    if (!user)
        return null

    const updateUserAction = async (updateUser: z.infer<typeof EditOrCreateUserSchema>) => {
        const token = await getAccessToken()

        return await handleApiCall({
            endpoint: `/user/${user.id}`,
            method: "patch",
            token: token?.value,
            body: {...updateUser},
        })
    }

    const createUserAction = async (userName: string, password: string, role: UserRoles) => {
        return await handleApiCall<LoginResponse>({
            endpoint: "/auth/signup",
            body: {userName, password, role},
            method: "post"
        })
    }


    const form = useForm<z.infer<typeof EditOrCreateUserSchema>>({
        resolver: zodResolver(EditOrCreateUserSchema),
        defaultValues: {
            userName: user.userName,
            role: user.role,
            currentPassword: "",
            newPassword: "",
            password: "",
            confirmPassword: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof EditOrCreateUserSchema>) => {

        setGlobalIsLoading(true)

        let res
        if (isAdd) {
            if (!values.password || !values.userName)
                return toast.error("Complete all fields!")
            if (values.password != values.confirmPassword)
                return toast.error("Passwords do not match!")

            res = await createUserAction(values.userName, values.password, values.role ?? "normal")
        } else {
            if (!values.currentPassword && values.newPassword)
                return toast.error("Inform your current password!")

            if (values.newPassword && values.currentPassword == values.newPassword)
                return toast.error("Current and new password can't be equal!")

            res = await updateUserAction(values)
        }


        if (res.isError) {
            toast.error(res.errorMessage)
        } else {
            clearCacheForPrefix("user_page_")
            toast.success(isAdd ? `Created user ${(res.response as any)?.id}` : "Updated!")
            setEditionEntity(null)
            setMode("viewUsers")
        }
        setGlobalIsLoading(false)
    }


    const handleCancel = () => {
        setEditionEntity(null)
        setMode("viewUsers")
    }


    return (
        <div className={"mx-auto w-full mt-10 flex flex-col item-center"}>
            {isAdd ? (
                <h2 className={"text-2xl text-center mb-5"}>Creating user</h2>
            ) : (
                <h2 className={"text-2xl text-center mb-5"}>Editing user <span
                    className={"text-gold text-2xl"}>{user.id}</span></h2>
            )}

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7  mx-auto">
                    <FormInput
                        useDarkMode
                        form={form}
                        name={"userName"}
                        label="Username"
                        placeholder="username"
                        onEnter={form.handleSubmit(onSubmit)}
                    />

                    {isAdd ? (
                        <>
                            <FormInput
                                useDarkMode
                                form={form}
                                name={"password"}
                                label="Password"
                                placeholder="****"
                                onEnter={form.handleSubmit(onSubmit)}
                            />
                            <FormInput
                                useDarkMode
                                form={form}
                                name={"confirmPassword"}
                                label="Confirm Password"
                                placeholder="****"
                                onEnter={form.handleSubmit(onSubmit)}
                            />
                        </>
                    ) : (
                        <>
                            <FormInput
                                useDarkMode
                                form={form}
                                name={"currentPassword"}
                                label="Current Password"
                                placeholder="****"
                                onEnter={form.handleSubmit(onSubmit)}
                            />
                            <FormInput
                                useDarkMode
                                form={form}
                                name={"newPassword"}
                                label="New Password"
                                placeholder="****"
                                onEnter={form.handleSubmit(onSubmit)}
                            />
                        </>

                    )}

                    {/* SELECT */}
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor="role">User Type</FormLabel>
                        <Controller
                            control={form.control}
                            name="role"
                            render={({field}) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        className="w-[180px] text-text border-text/20 placeholder:text-text/60">
                                        <SelectValue placeholder="Selecione um tipo"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((r) => (
                                            <SelectItem key={r} value={r}>
                                                {r === "adm" ? "Administrator" : "User"}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {form.formState.errors.role && (
                            <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
                        )}
                    </div>


                    <div className={"flex justify-between"}>

                        <Button onClick={handleCancel} variant={"error"}>Cancel</Button>
                        <Button type={"submit"} variant={"success"}>{ isAdd ? "Create" : "Update"}</Button>
                    </div>

                </form>
            </FormProvider>
        </div>
    )
}
