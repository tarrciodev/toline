"use client";
import { useAddPortfolioService } from "@/services/freelancers/add-portifolio-service";
import { getPreviewUrl } from "@/utils/get-preview-url";
import Image from "next/image";
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";

export function AddShowCaseForm({ entityId }: { entityId: string }) {
    const {
        form,
        onSubmit,
        isSubmitting,
        cover,
        assets,
        handleCoverChange,
        handleAssetsChange,
        skills,
    } = useAddPortfolioService(entityId);
    return (
        <ScrollArea className='h-[80dvh]'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-2'
                >
                    <div>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título do Projeto</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Digite o título do projeto'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição do Projeto</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Digite a descrição do projeto'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='cover'
                            render={() => (
                                <FormItem>
                                    <FormLabel>Imagem de Capa</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            accept='image/*'
                                            onChange={handleCoverChange}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {cover && (
                            <div>
                                <Image
                                    src={getPreviewUrl(cover)!}
                                    alt={cover.name}
                                    className='w-full h-48 object-cover'
                                    width={100}
                                    height={100}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='assets'
                            render={() => (
                                <FormItem>
                                    <FormLabel>Galeria</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            accept='image/*'
                                            multiple
                                            onChange={handleAssetsChange}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {assets.length > 0 && (
                            <div className='grid grid-cols-3'>
                                {assets.map((asset) => {
                                    const url = getPreviewUrl(asset) as string;
                                    return (
                                        <div key={asset?.name}>
                                            <Image
                                                src={url!}
                                                alt={asset?.name}
                                                className='w-full h-48 object-cover'
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='skills'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Habilidades Usadas</FormLabel>
                                    <MultiSelector
                                        onValuesChange={field.onChange}
                                        values={field.value || []}
                                    >
                                        <MultiSelectorTrigger>
                                            <MultiSelectorInput placeholder='Select skills' />
                                        </MultiSelectorTrigger>
                                        <MultiSelectorContent>
                                            <MultiSelectorList>
                                                {skills?.map((skill) => (
                                                    <MultiSelectorItem
                                                        key={skill.id}
                                                        value={skill.name}
                                                    >
                                                        {skill.name}
                                                    </MultiSelectorItem>
                                                ))}
                                            </MultiSelectorList>
                                        </MultiSelectorContent>
                                    </MultiSelector>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div>
                        <FormField
                            control={form.control}
                            name='completedAt'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data da Conclusão</FormLabel>
                                    <FormControl>
                                        <Input type='date' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting && <Loader />} Salvar
                    </Button>
                </form>
            </Form>
        </ScrollArea>
    );
}
