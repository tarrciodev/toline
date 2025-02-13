export function getPreviewUrl(file: File | null) {
    return file ? URL.createObjectURL(file) : null;
}
