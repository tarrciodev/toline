"use client";
export function Balance({ ammount }: { ammount: number }) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };
    return (
        <h2 className='text-3xl font-bold text-gray-900'>
            AOA {formatCurrency(ammount ?? 0)}
        </h2>
    );
}
