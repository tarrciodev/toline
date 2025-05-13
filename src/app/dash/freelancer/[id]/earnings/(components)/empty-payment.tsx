export function EmptyPayment() {
    return (
        <div className='bg-white rounded-lg p-10 text-center flex flex-col items-center mt-5'>
            <div className='w-36 mb-5 text-gray-300'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-full h-full'
                >
                    <path d='M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z' />
                    <path
                        fillRule='evenodd'
                        d='M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zM12 10.5a.75.75 0 01.75.75v4.94l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72v-4.94a.75.75 0 01.75-.75z'
                        clipRule='evenodd'
                    />
                </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                Nenhum Pagamento Encontrado
            </h3>
            <p className='text-gray-600 max-w-lg mb-6'>
                Quando fazer ou receber pagamentos, você pode ver as informações
                aqui.
            </p>
        </div>
    );
}
