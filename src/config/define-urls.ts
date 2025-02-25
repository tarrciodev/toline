export const BASE_URL =
    (process.env.NEXT_PUBLIC_BASE_URL as string) || "http://localhost:3333";

export const WEBSOCKET_URL =
    (process.env.NEXT_PUBLIC_WEBSOCKET_URL as string) || "ws://localhost:3333";
