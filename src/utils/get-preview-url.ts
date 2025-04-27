export function getPreviewUrl(file: File | null | undefined) {
    return file ? URL.createObjectURL(file) : null;
}
