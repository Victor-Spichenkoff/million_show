import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {FieldValues, Path, UseFormReturn} from "react-hook-form"
import {HTMLInputTypeAttribute} from "react";

interface IFormInput<TSchema extends FieldValues> {
    form: UseFormReturn<TSchema>
    // form: UseFormReturn<TSchema, any, undefined>
    name: Path<TSchema>
    placeholder?: string
    label?: string
    desc?: string
    type?: HTMLInputTypeAttribute
    onEnter?: () => void
}

export const FormInput =
    <TSchema extends FieldValues>({form, name, placeholder, label, desc, type, onEnter}: IFormInput<TSchema>) => {

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                if (onEnter)
                    onEnter()
            }
        }


        return (
            <div className=" max-w-[400px]">
                <FormField
                    control={form.control}
                    name={name}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete={type=="password" ? "password" :  undefined}
                                    onKeyDown={handleKeyDown}
                                    type={type}
                                    placeholder={placeholder}
                                    {...field}
                                    className={"" +
                                        "bg-highlight border-0 rounded-4xl shadow-black/50 shadow-md" +
                                        "  min-w-[300px] w-full text-2xl text-white px-3 py-5 md:py-2 text-2xl md:text-2xl"}
                                />
                            </FormControl>
                            <FormDescription>
                                {desc}
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
        )
    }
