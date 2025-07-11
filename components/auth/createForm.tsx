import * as z from "zod"
import {Form} from "@/components/ui/form";
import {FormInput} from "@/components/auth/input";
import {LoginSchema} from "@/lib/schema/login";
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod"
import {useEffect, useTransition} from "react";
import Link from "next/link";
import {createService, loginService} from "@/services/auth";
import {useRouter, useSearchParams} from "next/navigation";
import {saveAccessToken, saveExpiresAt} from "@/storage/cookie/auth";
import {toast} from "sonner";
import {Loading} from "@/components/template/loading";
import {CreateSchema} from "@/lib/schema/create";


interface ICreateForm {
    setIsLogin: (s: boolean) => void
}

export const CreateForm = ({setIsLogin}:ICreateForm) => {
    const [isLoading, startTransition] = useTransition()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const isLoginError = searchParams.get('loginError')
        if(isLoginError) {
            toast.error("You need to login to access it!")
        }
    }, [])

    const form = useForm<z.infer<typeof CreateSchema>>({
        resolver: zodResolver(CreateSchema),
        defaultValues: {
            userName: "",
            password: "",
            passwordConfirm: ""
        },
    })


    const onSubmit = async  (values: z.infer<typeof CreateSchema>) => {
        if(values.password !== values.passwordConfirm)
            return toast.error("Password and Confirm not match!")

        startTransition(async ()=> {

        const res = await createService(values.userName, values.password)

            if (res.isError) {
                toast.error(res.errorMessage)
                return
            }

            const now = new Date()
            const expiresAt = new Date(now.getTime() + res.response.expires_in * 1000)

            await saveAccessToken(res.response.access_token, expiresAt)
            await saveExpiresAt(expiresAt)

            const previous = searchParams.get('previous')
            const pathname = previous ?? "/home"

            router.push(pathname)
        })
    }

    return (
        <div className={"flex flex-col items-center justify-center px-3 py-2 rounded-b-xl min-h-[400px]" +
            " px-8 py-8 min-w-[300px]" }>
            { isLoading && <Loading /> }
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-full">
                    <FormInput form={form}
                               name={"userName"}
                               // label="Name"
                               placeholder="username"
                                onEnter={form.handleSubmit(onSubmit)}
                    />

                    <FormInput form={form}
                               type={"password"}
                               name={"password"}
                               // label="Password"
                               placeholder="password"
                               // placeholder="****"
                               onEnter={form.handleSubmit(onSubmit)}
                    />
                    <FormInput form={form}
                               type={"passwordConfirm"}
                               name={"passwordConfirm"}
                               // label="Password"
                               placeholder="confirm password"
                               // placeholder="****"
                               onEnter={form.handleSubmit(onSubmit)}
                    />

                    <div className="flex justify-center">
                        <Button type="submit" className={"border-2 border-form-btn text-white/90 " +
                            "w-full rounded-4xl hover:bg-form-btn hover:border-0 text-xl " +
                            "py-2 mb-8"}>Create</Button>
                    </div>
                </form>
            </Form>
            <p className={"text-gray-200 text-sm font-bold "}>
                Already have an account? <button onClick={()=>setIsLogin(true)} className={" text-gold link"}>Login Here</button>
            </p>
        </div>
    )
}
