import { BellOff } from "lucide-react";

export function NoNotifications() {
    return (
        <div className='flex flex-col items-center justify-center py-12 px-6 text-center'>
            <BellOff className='w-12 h-12 text-gray-400 mb-4' />

            <h3 className='text-lg font-medium text-gray-900 mb-2'>
                Nenhuma notificação
            </h3>

            <p className='text-sm text-gray-500 max-w-sm leading-relaxed'>
                Quando você tiver notificações, elas aparecerão aqui.
            </p>

            <div className='mt-6'>
                <div className='inline-flex items-center px-4 py-2 bg-gray-50 rounded-lg'>
                    <div className='w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse'></div>
                    <span className='text-xs text-gray-600 font-medium'>
                        Monitorando notificações
                    </span>
                </div>
            </div>
        </div>
    );
}
