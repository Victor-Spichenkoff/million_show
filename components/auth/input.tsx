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
    useDarkMode?: boolean
}

export const FormInput =
    <TSchema extends FieldValues>({useDarkMode, form, name, placeholder, label, desc, type, onEnter}: IFormInput<TSchema>) => {
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
                                    autoComplete={type === "password" ? "password" : undefined}
                                    onKeyDown={handleKeyDown}
                                    type={type}
                                    placeholder={placeholder}
                                    {...field}
                                    className={`
                                        w-full min-w-[300px] px-4 py-5 md:py-3 text-2xl text-white
                                        bg-white/10 backdrop-blur-md rounded-2xl
                                        border border-white/20
                                        placeholder:text-white/60
                                        shadow-lg shadow-black/30
                                        focus:ring-2 focus:ring-highlight outline-none
                                        transition-all
                                        ${useDarkMode && "text-text border-text/20 placeholder:text-text/60"}
                                        `}
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

                                {/*<Input*/}
                                {/*    autoComplete={type=="password" ? "password" :  undefined}*/}
                                {/*    onKeyDown={handleKeyDown}*/}
                                {/*    type={type}*/}
                                {/*    placeholder={placeholder}*/}
                                {/*    {...field}*/}
                                {/*    className={*/}
                                {/*        "bg-highlight border-0 rounded-4xl shadow-black/50 shadow-md " +*/}
                                {/*        " min-w-[300px] w-full text-2xl text-white px-3 py-5 md:py-2 text-2xl md:text-2xl " +*/}
                                {/*        " border-0 bg-transparent border-b-2  border-form-btn focus:border-b-3"}*/}
                                {/*/>*/}
