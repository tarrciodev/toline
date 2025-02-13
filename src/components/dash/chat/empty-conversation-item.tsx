export default function EmptyConversationItem() {
    return (
        <div className='flex gap-2 items-center w-full'>
            <div className='size-10 rounded-full bg-gray-500' />
            <div className='flex flex-col gap-1 flex-1'>
                <div className='flex justify-between'>
                    <p className='font-semibold text-gray-800'>
                        Inicie uma nova conversa
                    </p>
                    <span className='text-sm text-muted-foreground'>12:00</span>
                </div>
            </div>
        </div>
    );
}
