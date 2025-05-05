"use server";

import { api } from "@/config/api";
import { IbanPaymentProps } from "@/services/finances/use-iban-payment-service";
import { supabaseUpload } from "@/utils/supabase-upload";
import { revalidatePath } from "next/cache";
import { getMe } from "../users/get-me";

export async function ibanPayment(data: IbanPaymentProps) {
    const invoice = await supabaseUpload(data.file);

    if (!invoice) {
        return {
            status: "error",
            message: "Ocorreu um erro ao enviar o arquivo",
        };
    }

    const me = await getMe();

    const response = await api<{ id: true }>(
        `/toliner/${me.tolinerId}/recharge`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ammount: data.ammount, invoice }),
        }
    );

    if (!response.id) {
        return {
            status: "error",
            message: "Ocorreu um erro ao realizar o pagamento",
        };
    }

    revalidatePath("/dash/client/finances");

    return {
        status: "success",
        message: "Pagamento realizado com sucesso",
    };
}
