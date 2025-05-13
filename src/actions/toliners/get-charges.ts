import { api } from "@/config/api";

export interface Charge {
    id: string;
    ammount: number;
    createdAt: string;
    status: string;
}

export async function getCharges(tolinerId: string): Promise<Charge[]> {
    const response = await api<Charge[]>(`/charges/${tolinerId}`);
    return response ?? [];
}
