import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export const getTimeElapsed = (inputDate) => {
    return formatDistanceToNow(inputDate, { locale: ptBR, addSuffix: true });
};
