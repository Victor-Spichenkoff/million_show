import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {FieldValues, Path, UseFormReturn} from "react-hook-form"

interface IFormInput<TSchema extends FieldValues> {
    form: UseFormReturn<TSchema>
    // form: UseFormReturn<TSchema, any, undefined>
    name: Path<TSchema>
    placeholder?: string
    label?: string
    desc?: string
}

export const FormInput =
    <TSchema extends FieldValues>({form, name, placeholder, label, desc}: IFormInput<TSchema>) => {
        return (
            <div className="w-fit max-w-[400px]">
                <FormField
                    control={form.control}
                    name={name}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{label}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={placeholder}
                                    {...field}
                                    className={"bg-highlight border-0"}
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
