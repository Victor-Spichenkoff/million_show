import {Dispatch, SetStateAction} from "react";
import {AdmModes} from "@/app/(protected)/adm/page";
import {User} from "@/types/user";
import {Controller, FormProvider, useForm} from "react-hook-form";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {getAccessToken,} from "@/storage/cookie/auth";
import {EditUserSchema, roles} from "@/lib/schema/edit";
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
import { Label } from "@/components/ui/label";
import {FormLabel} from "@/components/ui/form";


interface IdmViewUser {
    setMode: Dispatch<SetStateAction<AdmModes>>
    setEditionEntity: (n: null | User) => void
    user: User
    setGlobalIsLoading: Dispatch<SetStateAction<boolean>>
}

export const AdmEditUser = ({setMode, setEditionEntity, user, setGlobalIsLoading}: IdmViewUser) => {
    if (!user)
        return null

    const updateUserAction = async (updateUser: z.infer<typeof EditUserSchema>) => {
        const token = await getAccessToken()

        return await handleApiCall({
            endpoint: `/user/${user.id}`,
            method: "patch",
            token: token?.value,
            body: {...updateUser},
        })
    }


    const form = useForm<z.infer<typeof EditUserSchema>>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            userName: user.userName,
            role: user.role,
            currentPassword: "",
            newPassword: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof EditUserSchema>) => {
        if (!values.currentPassword && values.newPassword)
            return toast.error("Inform your current password!")

        if (values.newPassword && values.currentPassword == values.newPassword)
            return toast.error("Current and new password can't be equal!")

        setGlobalIsLoading(true)

        const res = await updateUserAction(values)

        if (res.isError) {
            toast.error(res.errorMessage)
        } else {
            clearCacheForPrefix("user_page_")
            toast.success("Updated!")
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
            <h2 className={"text-xl text-center mb-5"}>Editing user <span
                className={"text-gold text-2xl"}>{user.id}</span></h2>

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7  mx-auto">
                    <FormInput form={form}
                               name={"userName"}
                               label="Username"
                               placeholder="username"
                               onEnter={form.handleSubmit(onSubmit)}
                    />
                    <FormInput form={form}
                               name={"currentPassword"}
                               label="Current Password"
                               placeholder="****"
                               onEnter={form.handleSubmit(onSubmit)}
                    />
                    <FormInput form={form}
                               name={"newPassword"}
                               label="New Password"
                               placeholder="****"
                               onEnter={form.handleSubmit(onSubmit)}
                    />

                    {/* SELECT */}
                    <div className="flex flex-col gap-2">
                        <FormLabel htmlFor="role">User Type</FormLabel>
                        <Controller
                            control={form.control}
                            name="role"
                            render={({field}) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Selecione um tipo"/>
                                    </SelectTrigger>
                                    <SelectContent >
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
                        <Button type={"submit"} variant={"success"}>Update</Button>
                    </div>

                </form>
            </FormProvider>
        </div>
    )
}
