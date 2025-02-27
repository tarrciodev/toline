"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
    const [selectedValue, setSelectedValue] = useState("client");

    const handleChange = (value: string) => {
        setSelectedValue(value);
    };

    return (
        <main className='flex flex-col px-2'>
            <section className='flex flex-1 justify-center bg-gray-200 h-screen px-2'>
                <Card className='sm:w-[30vw] h-fit px-2'>
                    <CardHeader className='text-center text-2xl sm:text-4xl'>
                        Crie uma conta agora
                    </CardHeader>
                    <CardDescription className='text-center px-4'>
                        Seja bem-vindo ao toline! Nos conte o que você está
                        procurando.
                    </CardDescription>
                    <CardContent className='mt-7'>
                        <RadioGroup
                            defaultValue='comfortable'
                            className='space-y-4'
                            onValueChange={(e) => handleChange(e)}
                        >
                            <div className='flex flex-col  space-x-2'>
                                <div className='flex space-x-2'>
                                    <RadioGroupItem value='client' id='r1' />
                                    <Label
                                        htmlFor='r1'
                                        className='cursor-pointer font-semibold text-gray-600'
                                    >
                                        Eu quero contratar
                                    </Label>
                                </div>
                                <span className='pl-4'>
                                    Publique a sua vaga e encontre freelancers
                                    incríveis
                                </span>
                            </div>
                            <div className='flex flex-col space-x-2'>
                                <div className='flex space-x-2 cursor-pointer'>
                                    <RadioGroupItem
                                        value='freelancer'
                                        id='r2'
                                        onChangeCapture={(e) => console.log(e)}
                                    />
                                    <Label
                                        htmlFor='r2'
                                        className='cursor-pointer font-semibold text-gray-600'
                                    >
                                        Eu quero trabalhar
                                    </Label>
                                </div>
                                <span className='pl-4'>
                                    Encontre projetos, seja contratado e ganhe
                                    dinheiro.
                                </span>
                            </div>
                        </RadioGroup>
                    </CardContent>
                    <CardFooter>
                        <Link
                            href={`/register/${selectedValue}`}
                            className='w-full bg-blue-600 py-4 rounded text-blue-50 font-medium text-center'
                        >
                            Continuar
                        </Link>
                    </CardFooter>
                </Card>
            </section>
        </main>
    );
}
