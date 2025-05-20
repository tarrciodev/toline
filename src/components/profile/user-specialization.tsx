"use client";
import { useAddEspecializationService } from "@/services/profile/add-specialization-service";
import { Pencil } from "lucide-react";
import { Loader } from "../loader";
import { Button } from "../ui/button";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger,
} from "../ui/extension/multi-select";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { SpecializationList } from "./specialization-list";

export function UserSpecializations({
    tolinerId,
    userSpecializations,
    publicProfile,
}: {
    tolinerId: string;
    userSpecializations: Array<{
        id: string;
        name: string;
    }>;
    publicProfile?: boolean;
}) {
    const {
        categories,
        displaySelectionBox,
        toggleDisplaySelectionBox,
        form,
        isSubmitting,
        handleSubmit,
    } = useAddEspecializationService(tolinerId);

    return (
        <div className='bg-white p-4 rounded shadow-xl'>
            <div>
                {!displaySelectionBox && (
                    <div className='flex justify-between'>
                        <span className='font-semibold text-lg'>
                            Minhas Especializações
                        </span>
                        {publicProfile || (
                            <span
                                className='cursor-pointer'
                                onClick={toggleDisplaySelectionBox}
                            >
                                <Pencil className='size-5' />
                            </span>
                        )}
                    </div>
                )}
            </div>
            {userSpecializations?.length > 0 && (
                <SpecializationList
                    specialization={userSpecializations}
                    tolinerId={tolinerId}
                    displaySelectionBox={displaySelectionBox}
                />
            )}
            {displaySelectionBox && (
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className='border border-gray-200 rounded p-4 mt-2'
                        >
                            <FormField
                                control={form.control}
                                name='specializations'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adicionar</FormLabel>
                                        <MultiSelector
                                            onValuesChange={field.onChange}
                                            values={field.value || []}
                                        >
                                            <MultiSelectorTrigger>
                                                <MultiSelectorInput placeholder='Selecione areas de interesse' />
                                            </MultiSelectorTrigger>
                                            <MultiSelectorContent>
                                                <MultiSelectorList>
                                                    {categories?.map(
                                                        (specialization) => (
                                                            <MultiSelectorItem
                                                                key={
                                                                    specialization?.id
                                                                }
                                                                value={
                                                                    specialization?.name
                                                                }
                                                            >
                                                                {
                                                                    specialization?.name
                                                                }
                                                            </MultiSelectorItem>
                                                        )
                                                    )}
                                                </MultiSelectorList>
                                            </MultiSelectorContent>
                                        </MultiSelector>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='w-full flex gap-2 justify-end'>
                                <Button
                                    className='bg-red-700 hover:bg-red-600'
                                    type='button'
                                    size='sm'
                                    onClick={toggleDisplaySelectionBox}
                                >
                                    cancelar
                                </Button>
                                <Button
                                    type='submit'
                                    disabled={isSubmitting}
                                    variant='outline'
                                    size='sm'
                                >
                                    {isSubmitting && <Loader />}salvar
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );
}
