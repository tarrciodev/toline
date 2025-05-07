import { FreelancerPayments } from "@/actions/freelancer/get-freelancer-payments";
import { useSessionStore } from "@/store/session";
import { useSearchParams } from "next/navigation";

type PaymentStatus = "pending" | "paid" | "failed" | "all";
type PaymentPeriod = "all" | "currentMonth" | "lastMonth" | "lastThreeMonths";

export function useFilteredPayments({
    payments,
}: {
    payments: FreelancerPayments[];
}): FreelancerPayments[] {
    const { logged_as } = useSessionStore() as {
        logged_as: "client" | "freelancer";
    };

    const searchParams = useSearchParams();

    const period = (searchParams.get("period") as PaymentPeriod) ?? "all";
    const status = (searchParams.get("status") as PaymentStatus) ?? "all";
    const search = searchParams.get("search") as string;
    if (search) {
        return payments.filter(
            (payment) =>
                payment.project.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                payment[logged_as].name
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const normalizeDate = (date: Date | string) =>
        new Date(date instanceof Date ? date : new Date(date));

    const filterByPeriod = (payment: FreelancerPayments): boolean => {
        const paymentDate = normalizeDate(payment.createdAt);
        const paymentMonth = paymentDate.getMonth();
        const paymentYear = paymentDate.getFullYear();

        switch (period) {
            case "currentMonth":
                return (
                    paymentDate.getMonth() === currentMonth &&
                    paymentDate.getFullYear() === currentYear
                );
            case "lastMonth":
                const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                const lastYear =
                    currentMonth === 0 ? currentYear - 1 : currentYear;
                return (
                    paymentDate.getMonth() === lastMonth &&
                    paymentDate.getFullYear() === lastYear
                );
            case "lastThreeMonths":
                const monthDiff =
                    (currentYear - paymentYear) * 12 +
                    (currentMonth - paymentMonth);
                return monthDiff >= 0 && monthDiff < 3;
            case "all":
            default:
                return true;
        }
    };

    const filterByStatus = (payment: FreelancerPayments): boolean => {
        if (status === "all") return true;
        return payment.status === status;
    };

    return payments.filter(
        (payment) => filterByPeriod(payment) && filterByStatus(payment)
    );
}
