"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function AccountDetails() {
    const IBAN = "000600003675839530103";
    const TITULAR = "TOOLINE - PRESTAÇÃO DE SERVIÇOS, LDA";

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(IBAN);
            setCopied(true);
        } catch (err) {
            console.error("Erro ao copiar o IBAN:", err);
        }
    };

    return (
        <div className='w-full max-w-md mx-auto p-2 bg-white rounded shadow-md mb-3'>
            <h2 className='text-xl font-semibold text-gray-800 mb-2'>
                Detalhes da Conta
            </h2>

            <div className='mb-2'>
                <p className='text-sm text-gray-500'>Titular</p>
                <p className='text-gray-900 font-medium'>{TITULAR}</p>
            </div>

            <div className='mb-4'>
                <p className='text-sm text-gray-500'>IBAN</p>
                <div className='flex items-center justify-between gap-2 bg-gray-100 px-3 py-2 rounded-md'>
                    <span className='text-gray-800 font-mono text-sm'>
                        {IBAN}
                    </span>
                    <button
                        onClick={handleCopy}
                        className='text-blue-600 hover:text-blue-800 transition'
                        title='Copiar IBAN'
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                </div>
                {copied && (
                    <p className='text-green-600 text-xs mt-1 transition-opacity'>
                        IBAN copiado com sucesso!
                    </p>
                )}
            </div>
        </div>
    );
}
