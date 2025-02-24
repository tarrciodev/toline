import { cn } from "@/lib/utils";
import { formatFileSize } from "@/utils/format-file-size";
import { getTimeOnly } from "@/utils/get-time-only";
import Image from "next/image";
import { IMessage } from "./chat-message-list";
import { DownloadButton } from "./down-load-file";

export function MessageItem({
    message,
    me,
}: {
    message: IMessage;
    me: string;
}) {
    const imTheSender = message.senderId === me;
    const hasFile = message.hasFile;
    const fileInfo = message.fileInfo as {
        name: string;
        size: number;
        type: string;
        extension: string;
    };
    const isImage = fileInfo?.type?.startsWith("image/");

    return (
        <div
            key={message.id}
            className={cn(
                "flex mt-2",
                imTheSender ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "rounded-lg p-3 max-w-xs text-sm shadow-md",
                    imTheSender
                        ? "bg-gray-200 text-gray-800"
                        : "bg-green-500 text-white"
                )}
            >
                {hasFile ? (
                    <>
                        {isImage ? (
                            <div>
                                <Image
                                    src={message?.content}
                                    alt='Ficheiro enviado'
                                    width={100}
                                    height={100}
                                    className='w-full'
                                />
                            </div>
                        ) : (
                            <div>
                                <p
                                    className={cn(
                                        "p-2 rounded",
                                        imTheSender
                                            ? "bg-gray-50"
                                            : "bg-green-700"
                                    )}
                                >
                                    {fileInfo?.name}.{fileInfo?.extension}
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <p>{message.content}</p>
                )}
                <div className='flex justify-between mt-1'>
                    {hasFile && (
                        <div className='flex items-center gap-1'>
                            <span className='text-xs'>
                                {formatFileSize(fileInfo?.size)}
                            </span>
                            <DownloadButton fileUrl={message.content} />
                        </div>
                    )}
                    <span
                        className={cn(
                            "text-xs",
                            imTheSender ? "text-gray-500 " : "text-green-50"
                        )}
                    >
                        {getTimeOnly(message.createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}
