import { isBefore } from "date-fns";

export function isAutdated(date: Date) {
    const agora = new Date();
    return isBefore(date, agora);
}
