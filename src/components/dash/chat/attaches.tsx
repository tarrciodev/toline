import { Paperclip } from "lucide-react";

interface ISendAttachement {
    handleSendAttachment: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => Promise<void>;
}
export function Attaches({ handleSendAttachment }: ISendAttachement) {
    return (
        <span className='cursor-pointer relative'>
            <input
                type='file'
                accept='.pdf,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff,.ico'
                className='absolute h-full w-full z-10 opacity-0'
                onChange={handleSendAttachment}
            />
            <Paperclip />
        </span>
    );
}
