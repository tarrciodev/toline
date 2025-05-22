"use client";
import { cn } from "@/lib/utils";
import { Banknote, Barcode, CreditCard, X } from "lucide-react";
import { RefObject, useState } from "react";
import IbanPaymentFormProject from "./iban-payment-form-project";
import { TolinePaymentForm } from "./toline-payment-form";

export function PaymentCard({
    triggerRef,
    projectId,
}: {
    triggerRef?: RefObject<HTMLDivElement | null>;
    projectId?: string;
}) {
    const [paymentMethod, setPaymentMethod] = useState<"toline" | "iban">(
        "toline"
    );
    function handleClose() {
        triggerRef?.current?.click();
    }

    return (
        <div>
            <div className='mb-6 relative'>
                <span
                    className='absolute -top-12 -right-2 cursor-pointer'
                    onClick={handleClose}
                >
                    <X />
                </span>
                <p className='text-sm font-medium text-gray-700 mb-2'>
                    Selecione o método de pagamento:
                </p>
                <div className='grid grid-cols-3 gap-4'>
                    <button
                        className={cn(
                            "flex flex-col items-center border rounded-md p-3 cursor-pointer",
                            paymentMethod === "toline" && "border-blue-700"
                        )}
                        onClick={() => setPaymentMethod("toline")}
                    >
                        <div className='text-2xl mb-1'>
                            <Barcode />
                        </div>
                        <p className='text-sm'>Saldo Toline</p>
                    </button>
                    <button
                        className={cn(
                            "flex flex-col items-center border rounded-md p-3 cursor-pointer",
                            paymentMethod === "iban" && "border-blue-700"
                        )}
                        onClick={() => setPaymentMethod("iban")}
                    >
                        <div className='text-2xl mb-1'>
                            <Banknote />
                        </div>
                        <p className='text-sm'>IBAN</p>
                    </button>

                    <div className='flex flex-col items-center justify-center border rounded-md p-3  cursor-pointer  opacity-10'>
                        <div className='text-2xl mb-1'>
                            <CreditCard />
                        </div>
                        <p className='text-sm'>VISA</p>
                    </div>
                </div>
            </div>
            {paymentMethod === "iban" && (
                <IbanPaymentFormProject
                    triggerRef={triggerRef}
                    projectId={projectId as string}
                />
            )}
            {paymentMethod === "toline" && (
                <TolinePaymentForm
                    triggerRef={triggerRef}
                    projectId={projectId}
                />
            )}
        </div>
    );
}
