import { cn } from "@/lib/utils";
import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";

export function NoUserAvatar({
    username,
    variante = "lg",
}: {
    username: string;
    variante?: "lg" | "sm";
}) {
    return (
        <div
            className={cn(
                "size-10 rounded-full bg-gray-500 flex justify-center items-center bg-linear-to-t from-blue-900 to-red-900 text-white",
                variante === "sm" ? "size-6 text-xs" : "size-10"
            )}
        >
            {extractAvatarFromName(username)}
        </div>
    );
}
