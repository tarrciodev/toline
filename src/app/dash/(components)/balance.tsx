"use client";

import { formatCurrency } from "@/utils/format-currency";
import { RechargeButton } from "../client/finances/(components)/recharge-button";
import { RechargeForm } from "../client/finances/(components)/recharge-form";

export function Balance({ ammount }: { ammount: number }) {
    return (
        <div className='bg-white rounded-lg shadow p-6 mb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
            <div>
                <p className='text-gray-500 text-sm'>Seu saldo atual</p>
                <h2 className='text-3xl font-bold text-gray-900'>
                    AOA {formatCurrency(ammount ?? 0)}
                </h2>
            </div>
            <RechargeButton>
                <RechargeForm />
            </RechargeButton>
        </div>
    );
}
