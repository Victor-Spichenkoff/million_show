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
        <div className="flex flex-col items-center px-3 py-2 rounded-b-xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormInput form={form}
                               name={"userName"}
                               // label="Name"
                               placeholder="username"/>

                    <FormInput form={form}
                               name={"password"}
                               // label="Password"
                               placeholder="****"/>

                    <div className="flex justify-center">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
            <p className={"text-sm"}>
                Don't have an account? <Link href={"/signup"} className={"link"}>Click Here</Link>
            </p>
        </div>
    )
}
