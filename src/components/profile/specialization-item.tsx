import { removeSpecialization } from "@/actions/users/remove-specialization";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader } from "../loader";
import { Badge } from "../ui/badge";

interface ISpecialization {
    tolinerId: string;
    specialization: {
        id: string;
        name: string;
    };
    displaySelectionBox: boolean;
}
export default function SpecializationItem({
    tolinerId,
    specialization,
    displaySelectionBox,
}: ISpecialization) {
    const [isSubmitting, startTransition] = useTransition();
    function handeRemoveSpecialization(specializationId: string) {
        startTransition(async () => {
            const response = await removeSpecialization({
                tolinerId,
                specializationId,
            });

            if (response.status === "error") {
                toast.error(response.message);
            }
        });
    }
    return (
        <Badge
            className={cn(
                "cursor-pointer",
                displaySelectionBox && "relative px-8"
            )}
        >
            {specialization.name}
            {displaySelectionBox && (
                <button
                    disabled={isSubmitting}
                    onClick={() => handeRemoveSpecialization(specialization.id)}
                    className='absolute right-1 text-red-100'
                >
                    {isSubmitting ? <Loader /> : <X />}
                </button>
            )}
        </Badge>
    );
}
