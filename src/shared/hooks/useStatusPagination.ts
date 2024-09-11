import { useEffect, useState } from "react";

export const useStatusPagination = (
  totalItems: number,
  itemsPerPage: number,
  initialPage: number,
  onPageChange: (page: number) => void,
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage-1 >=  1) {
      changePage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage-1 <= totalPages) {
      changePage(currentPage + 1);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage > totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return {
    currentPage,
    totalPages,
    changePage,
    handlePrevClick,
    handleNextClick,
    getVisiblePages,
  };
};
