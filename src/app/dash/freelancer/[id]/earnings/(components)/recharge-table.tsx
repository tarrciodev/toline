import { Charge, getCharges } from "@/actions/toliners/get-charges";
import { useEntityStore } from "@/store/entity";
import { useQuery } from "@tanstack/react-query";
import { EmptyRecharges } from "./empty-recharges";
import TrCharge from "./tr-charge";

export function RechargesTable() {
    const { entity } = useEntityStore();
    const tolinerId = entity?.id;

    const { data: charges } = useQuery<Charge[]>({
        queryKey: ["charges", tolinerId],
        queryFn: async () => await getCharges(tolinerId as string),
    });

    return (
        <div className='overflow-x-auto'>
            {(charges ?? []).length === 0 ? (
                <EmptyRecharges />
            ) : (
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Valor
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Data
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {charges?.map((charge) => (
                            <TrCharge key={charge.id} charge={charge} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
