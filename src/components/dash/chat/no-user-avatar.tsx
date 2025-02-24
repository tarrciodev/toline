import { extractAvatarFromName } from "@/utils/extract-avatar-from-name";

export function NoUserAvatar({ username }: { username: string }) {
    return (
        <div className='size-10 rounded-full bg-gray-500 flex justify-center items-center bg-linear-to-t from-blue-900 to-red-900 text-white'>
            {extractAvatarFromName(username)}
        </div>
    );
}
