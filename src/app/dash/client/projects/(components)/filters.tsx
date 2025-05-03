import FilterItem from "./filter-item";

export function ProjectFilters() {
    return (
        <div className='w-72 shadow-md bg-white h-fit py-3 px-4 rounded'>
            <h1>Filtros</h1>
            <div className='flex flex-col gap-2'>
                <FilterItem filter='published' />
                <FilterItem filter='ongoing' />
                <FilterItem filter='completed' />
            </div>
        </div>
    );
}
