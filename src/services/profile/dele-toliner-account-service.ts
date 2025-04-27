import { getMe, IMe } from "@/actions/users/get-me";
import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

interface IDeleteTolinerAccountService {
    handleDeleteMyAccount: () => Promise<
        | {
              status: "success" | "error";
              message: string;
          }
        | undefined
    >;
}

export function useDeleteTolinerAccountService(): IDeleteTolinerAccountService {
    const { data: me } = useQuery<IMe>({
        queryKey: ["me"],
        queryFn: async () => {
            const response = await getMe();
            return response;
        },
    });

    async function handleDeleteMyAccount() {
        const response = await api<{
            status: "success" | "error";
            message: string;
        }>(`/toliner/delete-account/${me?.email}`, {
            method: "DELETE",
        });

        return response;
    }

    return {
        handleDeleteMyAccount,
    };
}
