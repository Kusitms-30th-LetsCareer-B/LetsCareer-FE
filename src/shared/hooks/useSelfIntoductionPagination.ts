import { useState } from "react";

const useSelfIntroductionPagination = (
  totalPages: number,
  maxVisiblePages: number = 5,
) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getPageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (totalPages <= maxVisiblePages) {
      start = 1;
      end = totalPages;
    } else if (end === totalPages) {
      start = totalPages - maxVisiblePages + 1;
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    pages: getPageNumbers(),
    currentPage,
    changePage,
    totalPages,
  };
};

export default useSelfIntroductionPagination;
