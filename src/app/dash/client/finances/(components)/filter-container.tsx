"use client";
import { useState } from "react";

export function FilterContainer() {
    const [periodFilter, setPeriodFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    return (
        <div>
            <div className='flex gap-4'>
                <select
                    className='bg-white border border-gray-300 rounded-md px-3 py-2 outline-none'
                    value={periodFilter}
                    onChange={(e) => setPeriodFilter(e.target.value)}
                >
                    <option value='all'>Todos os períodos</option>
                    <option value='this-month'>Este mês</option>
                    <option value='last-month'>Mês passado</option>
                    <option value='last-3-months'>Últimos 3 meses</option>
                </select>

                <select
                    className='bg-white border border-gray-300 rounded-md px-3 py-2 outline-none'
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value='all'>Todos os status</option>
                    <option value='completed'>Completo</option>
                    <option value='pending'>Pendente</option>
                    <option value='failed'>Falhou</option>
                </select>
            </div>
        </div>
    );
}
