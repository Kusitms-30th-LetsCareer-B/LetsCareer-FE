import { useState } from "react";
import useSelfIntroductionPagination from "../../../../shared/hooks/useSelfIntoductionPagination";

type PaginationProps = {
  initialTotalPages: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  initialTotalPages,
}) => {
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const { pages, currentPage, changePage } =
    useSelfIntroductionPagination(totalPages);

  const addPage = () => {
    if (totalPages < 15) {
      setTotalPages((prevTotal) => prevTotal + 1);
    }
  };

  return (
    <div className="inline-flex items-center">
      <button
        className={`mr-[6px] flex h-[28px] w-[28px] flex-col items-center justify-center gap-[10px] rounded-full bg-static-100 px-[10px] py-[4px] ${
          currentPage === 1
            ? "border border-primary text-primary"
            : "border border-neutral-80 text-neutral-45"
        }`}
        onClick={() => changePage(1)}
      >
        1
      </button>

      {pages.map((page, index) => {
        if (page !== 1 && page !== totalPages) {
          if (
            (currentPage === 1 || currentPage === 2) &&
            page === 5 &&
            totalPages > 6
          ) {
            return (
              <button
                key={index}
                className="mr-[6px] flex h-[28px] w-[39px] flex-col items-center justify-center gap-[10px] rounded-lg border border-neutral-80 bg-static-100 px-[10px] py-[4px]"
                onClick={() => changePage(page)}
              >
                <span className="text-neutral-45">{page}...</span>
              </button>
            );
          } else if (
            (currentPage === totalPages || currentPage === totalPages - 1) &&
            totalPages > 6 &&
            page === totalPages - 4
          ) {
            return (
              <button
                key={index}
                className="mr-[6px] flex h-[28px] w-[39px] flex-col items-center justify-center gap-[10px] rounded-lg border border-neutral-80 bg-static-100 px-[10px] py-[4px]"
                onClick={() => changePage(page)}
              >
                <span className="text-neutral-45">{page}...</span>
              </button>
            );
          } else if (
            currentPage === pages[2] &&
            page === currentPage - 2 &&
            page > 2
          ) {
            return (
              <button
                key={index}
                className="mr-[6px] flex h-[28px] w-[39px] flex-col items-center justify-center gap-[10px] rounded-lg border border-neutral-80 bg-static-100 px-[10px] py-[4px]"
                onClick={() => changePage(page)}
              >
                <span className="text-neutral-45">{page}...</span>
              </button>
            );
          } else if (
            currentPage === pages[2] &&
            page === currentPage + 2 &&
            page < totalPages - 1
          ) {
            return (
              <button
                key={index}
                className="mr-[6px] flex h-[28px] w-[39px] flex-col items-center justify-center gap-[10px] rounded-lg border border-neutral-80 bg-static-100 px-[10px] py-[4px]"
                onClick={() => changePage(page)}
              >
                <span className="text-neutral-45">{page}...</span>
              </button>
            );
          } else {
            return (
              <button
                key={index}
                className={`mr-[6px] flex h-[28px] w-[28px] flex-col items-center justify-center gap-[10px] rounded-full bg-static-100 px-[10px] py-[4px] ${
                  page === currentPage
                    ? "border border-primary text-primary"
                    : "border border-neutral-80 text-neutral-45"
                }`}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            );
          }
        } else {
          return null;
        }
      })}

      {totalPages > 1 && (
        <button
          className={`mr-[6px] flex h-[28px] w-[28px] flex-col items-center justify-center gap-[10px] rounded-full bg-static-100 px-[10px] py-[4px] ${
            currentPage === totalPages
              ? "border border-primary text-primary"
              : "border border-neutral-80 text-neutral-45"
          }`}
          onClick={() => changePage(totalPages)}
        >
          {totalPages}
        </button>
      )}

      {totalPages < 15 && (
        <button
          className="ml-[6px] flex h-[28px] w-[70px] flex-shrink-0 flex-col items-center justify-center gap-[10px] rounded-lg border border-neutral-80 bg-static-100"
          onClick={addPage}
        >
          <span className="text-xsmall14 font-medium tracking-[-0.21px] text-neutral-45">
            추가하기
          </span>
        </button>
      )}
    </div>
  );
};
