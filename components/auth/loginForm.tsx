import * as z from "zod"
import {Form} from "@/components/ui/form";
import {FormInput} from "@/components/auth/input";
import {LoginSchema} from "@/lib/schema/login";
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod"
import {useState} from "react";
import Link from "next/link";

export const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            userName: "",
            password: ""
        },
    })


    function onSubmit(values: z.infer<typeof LoginSchema>) {
        // ✅ This will be type-safe and validated.
        console.log("Dados:")
        console.log(values)
    }

    return (
        <div className={"flex flex-col items-center justify-center px-3 py-2 rounded-b-xl min-h-[400px]" +
            " px-8 py-8 min-w-[300px]" }>
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

                    <div className="flex justify-center">
                        <Button type="submit" className={"border-2 border-highlight text-white/90 " +
                            "w-full rounded-4xl hover:bg-form-btn hover:border-0 text-xl " +
                            "py-2 mb-8"}>Login</Button>
                    </div>
                </form>
            </Form>
            <p className={"text-sm font-bold"}>
                Don't have an account? <Link href={"/signup"} className={"auth-link"}>Create Here</Link>
            </p>
        </div>
    )
}
