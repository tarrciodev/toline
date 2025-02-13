import { format } from "date-fns";

export function getTimeOnly(date: string) {
    const timeOnly = format(new Date(date), "hh:mm a");
    return timeOnly;
}
