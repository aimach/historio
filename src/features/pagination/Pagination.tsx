"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export type PaginationProps = {
  page: number;
  setPage: (page: number) => void;
};

const PaginationComponent = (props: PaginationProps) => {
  const { page, setPage } = props;

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 ? (
          <>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage(page - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        ) : null}
        <PaginationItem>
          <PaginationNext href="#" onClick={() => setPage(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
