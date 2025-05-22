"use client";
import { Loader } from "../loader";
import { Button } from "../ui/button";

import { useCreateProjectService } from "@/services/projects/create-project-service";
import { CustomEditorField } from "../custom-editor-field";
import { CustomFormField } from "../custom-form-field";
import { CustomMultSelectorField } from "../custom-mult-selector-field";
import { CustomSelectField } from "../custom-select-field";
import { Form } from "../ui/form";
import { Input } from "../ui/input";

export function CreateProjectForm() {
    const {
        form,
        handleSubmit,
        isSubmitting,
        categories,
        subcategories,
        filteredSkills,
        isSubmitSuccessful,
    } = useCreateProjectService();

    return (
        <Form {...form}>
            <form
                className='w-full sm:w-[30vw]'
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <h1 className='text-center text-xl sm:text-4xl font-semibold mb-4'>
                    Crie um novo projeto
                </h1>

                <CustomFormField
                    control={form.control}
                    name='name'
                    label='Nome do Projecto'
                >
                    <Input placeholder='Enter project name' />
                </CustomFormField>

                <CustomEditorField
                    control={form.control}
                    name='description'
                    clear={isSubmitSuccessful}
                    label='Descreva o Seu Projeto'
                />

                <CustomFormField
                    control={form.control}
                    name='quotation'
                    label='Orçamento Inicial'
                >
                    <Input type='number' />
                </CustomFormField>

                <div className='flex gap-2 py-4 justify-between w-full'>
                    <CustomSelectField
                        control={form.control}
                        name='categoryId'
                        placeholder='Select category'
                        label='Categoria'
                        data={categories}
                    />

                    <CustomSelectField
                        control={form.control}
                        name='subcategoryId'
                        placeholder='Select subcategory'
                        label='Subcategoria'
                        data={subcategories}
                    />
                </div>

                {filteredSkills && filteredSkills.length > 0 && (
                    <CustomMultSelectorField
                        control={form.control}
                        name='skills'
                        placeholder='Select skills'
                        label='Skills'
                        data={filteredSkills}
                    />
                )}
                <div>
                    <Button
                        type='submit'
                        className='w-full flex gap-2'
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader />} Criar Projeto
                    </Button>
                </div>
            </form>
        </Form>
    );
}
