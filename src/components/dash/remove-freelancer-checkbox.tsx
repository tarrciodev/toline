import { Control } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormControl, FormField, FormItem } from "../ui/form";

export function RemoveFreelancerCheckbox({
    control,
}: {
    control: Control<
        {
            date?: Date | null | undefined;
            ammount?: string | undefined;
            file?: File | null | undefined;
            check?: boolean | undefined;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any
    >;
}) {
    return (
        <FormField
            control={control}
            name='check'
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <div className='flex items-center space-x-2'>
                            <Checkbox
                                id='terms'
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                            <label
                                htmlFor='terms'
                                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                                Remover Freelancer do Projeto
                            </label>
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
