import { FileX } from "lucide-react";

export function NoPayment() {
    return (
        <tr>
            <td colSpan={5} className=' bg-gray-50 rounded-lg'>
                <div className='flex flex-col items-center justify-center w-full py-16 px-4'>
                    <div className='text-center max-w-md'>
                        <div className='flex justify-center mb-6'>
                            <div className='bg-blue-100 p-4 rounded-full'>
                                <FileX size={48} className='text-blue-600' />
                            </div>
                        </div>

                        <h2 className='text-2xl font-bold text-gray-800 mb-3'>
                            Nenhum pagamento encontrado
                        </h2>

                        <p className='text-gray-600 mb-8'>
                            Não existem pagamentos para exibir neste momento.
                            Sempre que fizer um pagamento em algum projeto as
                            informações serão exibidas aqui.
                        </p>
                    </div>
                </div>
            </td>
        </tr>
    );
}
