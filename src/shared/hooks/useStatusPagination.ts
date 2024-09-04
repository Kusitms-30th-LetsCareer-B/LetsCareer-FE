import { useState, useEffect } from "react";

export const useStatusPagination = (
  totalItems: number,
  itemsPerPage: number,
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const changePage = (page: number) => {
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage > totalPages - 4) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        const startPage = Math.max(
          1,
          currentPage - Math.floor(maxVisiblePages / 2),
        );
        const endPage = Math.min(
          totalPages,
          currentPage + Math.floor(maxVisiblePages / 2),
        );

        if (startPage > 1) {
          pages.push(1);
          if (startPage > 2) {
            pages.push("...");
          }
        }

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
            pages.push("...");
          }
          pages.push(totalPages);
        }
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
