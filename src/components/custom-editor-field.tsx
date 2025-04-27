/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Editor } from "./editor";

interface FormProps {
    control: any;
    name: string;
    label: string;
}

export function CustomEditorField({ control, name, label }: FormProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Editor
                                model={field.value}
                                onModelChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
