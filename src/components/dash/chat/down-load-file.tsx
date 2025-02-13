import { Download } from "lucide-react";
import { useState } from "react";

interface DownloadButtonProps {
    fileUrl: string;
    fileName?: string;
}

export function DownloadButton({
    fileUrl,
    fileName = "downloaded-file",
}: DownloadButtonProps) {
    const [progress, setProgress] = useState(0);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        setProgress(0);

        try {
            const response = await fetch(fileUrl);
            const contentLength = response.headers.get("content-length");

            if (!response.body || !contentLength) {
                throw new Error("Falha ao obter o tamanho do arquivo.");
            }

            const totalSize = parseInt(contentLength, 10);
            let loaded = 0;
            const reader = response.body.getReader();
            const chunks: Uint8Array[] = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
                loaded += value.length;
                setProgress(Math.round((loaded / totalSize) * 100));
            }

            const blob = new Blob(chunks);
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Erro ao baixar o arquivo:", error);
        } finally {
            setDownloading(false);
            setProgress(0);
        }
    };

    return (
        <div className='flex flex-col'>
            <button onClick={handleDownload} disabled={downloading}>
                <Download size={18} />
            </button>

            {downloading && (
                <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                        className='bg-blue-600 h-2 rounded-full'
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </div>
    );
}
