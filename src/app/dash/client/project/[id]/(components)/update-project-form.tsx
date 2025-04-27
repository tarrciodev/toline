"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";

import { CustomEditorField } from "@/components/custom-editor-field";
import { CustomMultSelectorField } from "@/components/custom-mult-selector-field";
import { CustomSelectField } from "@/components/custom-select-field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateProjectService } from "@/services/projects/update-project-service";
import { ProjectFullProps } from "@/store/entity";
import { CustomFormField } from "../../../../../../components/custom-form-field";
import { GoBack } from "./goback";

export function UpdateProjectForm({
    project,
}: {
    project: ProjectFullProps | undefined;
}) {
    const {
        form,
        isSubmitting,
        categories,
        subcategories,
        filteredSkills,
        handleSubmit,
    } = useUpdateProjectService(project);
    return (
        <Form {...form}>
            <form
                className='w-[40vw] bg-white py-4 px-8'
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <div className='relative mb-5'>
                    <GoBack href={`/dash/client/project/${project?.id}`} />
                    <h1 className='text-center text-xl sm:text-2xl font-semibold'>
                        Atualize o Seu projeto
                    </h1>
                </div>
                <CustomFormField
                    control={form.control}
                    name='name'
                    label='Nome do Projeto'
                >
                    <Input placeholder={project?.name} />
                </CustomFormField>

                <CustomEditorField
                    control={form.control}
                    name='description'
                    label='Descreva o Seu Projeto'
                />

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
                        {isSubmitting && <Loader />} Atualizar
                    </Button>
                </div>
            </form>
        </Form>
    );
}
