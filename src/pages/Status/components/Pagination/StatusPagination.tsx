import { useState } from "react";
import { useStatusPagination } from "../../../../shared/hooks/useStatusPagination";

interface PaginationComponentProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StatusPagination: React.FC<PaginationComponentProps> = ({
  totalItems,
  itemsPerPage,
  currentPage: initialPage,
  totalPages,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { handlePrevClick, handleNextClick, changePage, getVisiblePages } =
    useStatusPagination(
      totalItems,
      itemsPerPage,
      currentPage,
      handlePageChange,
    );

  function handlePageChange(page: number) {
    setCurrentPage(page);
    onPageChange(page);
  }

  return (
    <nav className="mt-[20px] inline-flex items-center gap-[32px]">
      <button
        onClick={handlePrevClick}
        className={`flex items-center justify-center rounded-xxs border bg-static-100 py-[4px] pl-[3px] pr-[5px] ${
          currentPage > 1 ? "border-primary-50" : "border-neutral-80"
        }`}
        disabled={currentPage === 1}
      >
        {currentPage > 1 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#4D55F5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#E7E7E7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <ul className="flex items-center">
        {getVisiblePages().map((number, index) => (
          <li
            key={index}
            className={`mx-[6px] ${
              number !== "..." ? "cursor-pointer" : ""
            } text-xsmall16 tracking-[-0.096px] ${
              number === currentPage
                ? "font-bold text-primary"
                : "font-medium text-neutral-45"
            }`}
          >
            {number === "..." ? (
              <span>{number}</span>
            ) : (
              <span onClick={() => changePage(number as number)}>{number}</span>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={handleNextClick}
        className={`flex items-center justify-center rounded-xxs border bg-static-100 py-[4px] pl-[5px] pr-[3px] ${
          currentPage - 1 < totalPages
            ? "border-primary-50"
            : "border-neutral-80"
        }`}
        disabled={currentPage - 1 === totalPages}
      >
        {currentPage - 1 < totalPages ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#4D55F5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="#E7E7E7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </nav>
  );
};

export default StatusPagination;
