import { useQuerySetter } from "@/utils/query-state";

interface IUsePaginationProps {
    goToPreviousPage: () => void;
    goToNextPage: () => void;
    goToFirstPage: () => void;
    goToLastPage: () => void;
}

interface IUsepaginationRequest {
    take: number;
    page: number;
    totalResult: number;
}

export function usePaginationService({
    take,
    page,
    totalResult,
}: IUsepaginationRequest): IUsePaginationProps {
    const { setQueryParams } = useQuerySetter();

    function goToPreviousPage() {
        setQueryParams("page", String(page - 1));
    }

    function goToNextPage() {
        setQueryParams("page", String(page + 1));
    }

    function goToFirstPage() {
        setQueryParams("page", "1");
    }

    function goToLastPage() {
        setQueryParams("page", String(Math.ceil(totalResult / take)));
    }

    return {
        goToPreviousPage,
        goToNextPage,
        goToFirstPage,
        goToLastPage,
    };
}
