"use client";
import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";

export function FilterContainer() {
    const [periodFilter, setPeriodFilter] = useQueryState("period", {
        defaultValue: "all",
        shallow: true,
    });
    const [statusFilter, setStatusFilter] = useQueryState("status", {
        defaultValue: "all",
        shallow: true,
    });

    const [searchFilter, setSearchFilter] = useQueryState("search", {
        defaultValue: "",
        shallow: true,
    });

    return (
        <div className='flex flex-col md:flex-row justify-between mb-6 gap-4'>
            <div className='flex items-center bg-gray-100 rounded-md px-3 py-2 w-full md:w-80'>
                <SearchIcon />
                <input
                    type='text'
                    placeholder='Buscar pagamentos...'
                    className='ml-2 bg-transparent outline-none w-full'
                    onChange={(e) => setSearchFilter(e.target.value)}
                    defaultValue={searchFilter}
                />
            </div>
            <div>
                <div className='flex gap-4'>
                    <select
                        className='bg-white border border-gray-300 rounded-md px-3 py-2 outline-none'
                        value={periodFilter}
                        onChange={(e) => setPeriodFilter(e.target.value)}
                    >
                        <option value='all'>Todos os períodos</option>
                        <option value='thisMonth'>Este mês</option>
                        <option value='lastMonth'>Mês passado</option>
                        <option value='lastTreeMonths'>Últimos 3 meses</option>
                    </select>

                    <select
                        className='bg-white border border-gray-300 rounded-md px-3 py-2 outline-none'
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value='all'>Todos os status</option>
                        <option value='paid'>Completo</option>
                        <option value='pending'>Pendente</option>
                        <option value='failed'>Falhou</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
