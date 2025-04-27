/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import React from "react";

import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger,
} from "./ui/extension/multi-select";

interface FormProps {
    control: any;
    name: string;
    label: string;
    children?: React.ReactNode;
    data?: any;
    placeholder: string;
}

export function CustomMultSelectorField({
    control,
    name,
    label,
    children,
    data,
    placeholder,
}: FormProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <MultiSelector
                                onValuesChange={field.onChange}
                                values={field.value || []}
                            >
                                <MultiSelectorTrigger>
                                    <MultiSelectorInput
                                        placeholder={placeholder}
                                    />
                                </MultiSelectorTrigger>
                                <MultiSelectorContent>
                                    <MultiSelectorList>
                                        {data ? (
                                            <>
                                                {data?.map(
                                                    (dt: {
                                                        id: string;
                                                        name: string;
                                                    }) => (
                                                        <MultiSelectorItem
                                                            key={dt.id}
                                                            value={dt.name}
                                                        >
                                                            {dt.name}
                                                        </MultiSelectorItem>
                                                    )
                                                )}
                                            </>
                                        ) : (
                                            <>{children}</>
                                        )}
                                    </MultiSelectorList>
                                </MultiSelectorContent>
                            </MultiSelector>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
