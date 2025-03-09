import { format } from "date-fns";

export function getCurrentYear() {
    const currentDate = new Date();
    const year = format(currentDate, "yyyy");
    return year;
}
