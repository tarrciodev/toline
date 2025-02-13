import arcjet, { validateEmail } from "@arcjet/next";

export const aj = arcjet({
    key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
    rules: [
        validateEmail({
            mode: "LIVE", // Block requests. Use "DRY_RUN" to log only.
            block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"], // Block specific types of emails.
        }),
    ],
});
