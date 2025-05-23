"use client";
import { CustomFormField } from "@/components/custom-form-field";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdteUserCard } from "@/services/profile/update-user-card";
import { useSessionStore } from "@/store/session";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";
import { Camera, Pencil } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function UpdateUserCard() {
    const { form, previewUrl, me, onSubmit, isSubmitting, triggerRef } =
        useUpdteUserCard();
    const { logged_as } = useSessionStore();
    const pathname = usePathname();
    if (pathname.includes("freelancer")) {
        return null;
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span ref={triggerRef}>
                    <Pencil className='size-4 sm:size-5' />
                </span>
            </DialogTrigger>
            <DialogContent className=' w-[90%] ml-1 sm:ml-0 sm:w-[25vw]!'>
                <DialogTitle className='hidden'>
                    Update User Profile Modal
                </DialogTitle>
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
                            <CustomFormField
                                control={form.control}
                                name='username'
                                label='Username'
                            >
                                <Input
                                    placeholder={me?.name}
                                    defaultValue={form.getValues("username")}
                                />
                            </CustomFormField>
                        </div>
                        {logged_as == "freelancer" && (
                            <div className='w-full'>
                                <CustomFormField
                                    control={form.control}
                                    name='jobDescription'
                                    label='Role'
                                >
                                    <Input
                                        placeholder={"ex: Web Developer"}
                                        defaultValue={form.getValues(
                                            "jobDescription"
                                        )}
                                    />
                                </CustomFormField>
                            </div>
                        )}
                        <div className='w-full'>
                            <Button className='w-full' type='submit'>
                                {isSubmitting && <Loader />} salvar
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
