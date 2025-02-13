export function extractAvatarFromName(name: string) {
    const words = name.split(" ");

    const firstLetterFromFirstWord = words[0]?.[0] || null;
    const lastWord = words[words.length - 1];

    const lastLetterFromLastWord = lastWord?.[0] || null;

    return `${firstLetterFromFirstWord}${lastLetterFromLastWord}`.toUpperCase();
}
