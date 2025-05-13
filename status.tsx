type Status = "pending" | "onGoing" | "completed";

export function Status({ status }: { status: Status }) {
    const statusLabel = {
        pending: "Pendente",
        onGoing: "Em Progresso",
        completed: "Concluído",
    };
    return <span>{statusLabel[status as keyof typeof statusLabel]}</span>;
}
