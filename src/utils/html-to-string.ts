export function htmlToString(html: string, maxLength: number) {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Replace <br> and block-level tags with a space to preserve visual breaks
    Array.from(tempDiv.querySelectorAll("br, p, div")).forEach((el) => {
        el.insertAdjacentText("beforebegin", " ");
    });

    // Get text content (removes tags)
    let text = tempDiv.textContent || tempDiv.innerText || "";

    // Replace non-breaking spaces with real spaces
    text = text.replace(/\u00A0/g, " ");

    // Remove newlines but preserve multiple spaces
    text = text.replace(/[\r\n]+/g, " ");

    // Optional: clean up trailing/leading spaces
    text = text.trim();

    // Truncate to maxLength without collapsing internal spacing
    if (text.length > maxLength) {
        text = `${text.slice(0, maxLength).trimEnd()}...`;
    }

    return text;
}
