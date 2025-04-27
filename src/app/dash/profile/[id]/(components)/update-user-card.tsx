"use client";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
    ResponsiveModal,
    ResponsiveModalContent,
    ResponsiveModalTitle,
    ResponsiveModalTrigger,
} from "@/components/ui/extension/responsive-modal";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdteUserCard } from "@/services/profile/update-user-card";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";
import { Camera, Pencil } from "lucide-react";
import Image from "next/image";

export function UpdateUserCard() {
    const { form, previewUrl, me, onSubmit, isSubmitting } = useUpdteUserCard();
    return (
        <ResponsiveModal>
            <ResponsiveModalTrigger asChild>
                <span>
                    <Pencil className='size-5' />
                </span>
            </ResponsiveModalTrigger>
            <ResponsiveModalContent className=' w-[25vw]!'>
                <ResponsiveModalTitle className='hidden'>
                    Update User Profile Modal
                </ResponsiveModalTitle>
                <Form {...form}>
                    <form
                        className='flex flex-col items-center gap-3'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className='size-28 rounded-full bg-blue-800 relative flex items-center justify-center text-xl font-semibold text-blue-50'>
                            {previewUrl ? (
                                <Image
                                    src={previewUrl}
                                    alt='User picture'
                                    width={100}
                                    height={100}
                                    className='rounded-full size-28 object-cover'
                                />
                            ) : (
                                <>
                                    {me?.avatarUrl ? (
                                        <Image
                                            src={me.avatarUrl}
                                            alt='User picture'
                                            width={100}
                                            height={100}
                                            className='rounded-full size-28 object-cover'
                                        />
                                    ) : (
                                        <p>
                                            {extractAvatarFromName(
                                                (me?.name as string) ?? "TS"
                                            )}
                                        </p>
                                    )}
                                </>
                            )}
                            <span className='absolute bottom-0 right-0 size-8 rounded-full flex justify-center items-center bg-gray-50 text-blue-800'>
                                <label htmlFor='input-file'>
                                    <Camera />
                                </label>
                                <FormField
                                    control={form.control}
                                    name='avatar'
                                    render={({ field }) => (
                                        <FormItem className='absoute hidden'>
                                            <FormControl>
                                                <input
                                                    type='file'
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target
                                                                .files?.[0] ||
                                                                undefined
                                                        )
                                                    }
                                                    id='input-file'
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </span>
                        </div>
                        <div className='w-full'>
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={me?.name}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-full'>
                            <Button className='w-full' type='submit'>
                                {isSubmitting && <Loader />} salvar
                            </Button>
                        </div>
                    </form>
                </Form>
            </ResponsiveModalContent>
        </ResponsiveModal>
    );
}
