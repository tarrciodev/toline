"use client";
import { Banknote, Barcode, CreditCard } from "lucide-react";
import { RefObject } from "react";
import { IbanPaymentForm } from "./iban-payment-form";

export function RechargeCard({
    triggerRef,
}: {
    triggerRef?: RefObject<HTMLDivElement | null>;
}) {
    return (
        <div>
            <div className='mb-6'>
                <p className='text-sm font-medium text-gray-700 mb-2'>
                    Selecione o método de pagamento:
                </p>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='flex flex-col items-center border rounded-md p-3 cursor-pointer'>
                        <div className='text-2xl mb-1'>
                            <Banknote />
                        </div>
                        <p className='text-sm'>IBAN</p>
                    </div>
                    <div className='flex flex-col items-center border rounded-md p-3 cursor-pointer opacity-10'>
                        <div className='text-2xl mb-1'>
                            <Barcode />
                        </div>
                        <p className='text-sm'>Referencia</p>
                    </div>
                    <div className='flex flex-col items-center justify-center border rounded-md p-3  cursor-pointer  opacity-10'>
                        <div className='text-2xl mb-1'>
                            <CreditCard />
                        </div>
                        <p className='text-sm'>VISA</p>
                    </div>
                </div>
            </div>
            <IbanPaymentForm triggerRef={triggerRef} />
        </div>
    );
}
