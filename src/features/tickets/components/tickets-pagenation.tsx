"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { pageParameter } from "@/lib/search-params";
import { useQueryState } from "nuqs";

type Props = {
  metadata: {
    count: number;
    hasNextPage: boolean;
  };
};

function TicketsPagination({ metadata: { count, hasNextPage } }: Props) {
  const [page, setPage] = useQueryState("page", pageParameter);

  return (
    <Pagination className="mt-auto pt-6">
      <PaginationContent className="justify-between w-full">
        <PaginationItem>
          <PaginationPrevious
            disabled={page === 1}
            onClick={() => {
              setPage((page) => {
                if (page === 1) return page;
                return page - 1;
              });
            }}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            disabled={!hasNextPage}
            onClick={() => {
              setPage((page) => {
                if (page === count) return page;
                return page + 1;
              });
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default TicketsPagination;
