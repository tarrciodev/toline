"use client";

import { Checkbox as CheckBoxDemo } from "@/components/ui/checkbox";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export function Checkbox({
    label,
    field,
}: {
    label: string;
    field: ControllerRenderProps<FieldValues, "check">;
}) {
    return (
        <div className='flex items-center space-x-2'>
            <CheckBoxDemo
                id='terms'
                checked={field.value}
                onCheckedChange={field.onChange}
            />
            <label
                htmlFor='terms'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
                {label}
            </label>
        </div>
    );
}
