import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { Control } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function EditProjectDatePicker({
    control,
}: {
    control: Control<
        {
            dueDate?: Date | null | undefined;
            projectId: string;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any
    >;
}) {
    const [date, setDate] = React.useState<Date>();
    return (
        <FormField
            control={control}
            name='dueDate'
            render={({ field }) => (
                <FormItem className='flex items-center gap-2 bg-gray-200 justify-between rounded pl-4'>
                    <FormLabel className='mt-3'>Prazo de entrega</FormLabel>
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Selecione Uma Data</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className='w-full p-0'
                                align='start'
                            >
                                <Calendar
                                    mode='single'
                                    selected={date}
                                    onSelect={(e) => {
                                        setDate(e);
                                        field.onChange(e);
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
