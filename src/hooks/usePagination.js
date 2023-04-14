import { useState } from "react";
import { ITEMS_PER_PAGE } from "config";

function usePagination(items) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);
  const currentItems = [];

  for (
    let i = (currentPage - 1) * ITEMS_PER_PAGE;
    i < currentPage * ITEMS_PER_PAGE && i < items.length;
    i++
  ) {
    currentItems.push(items[i]);
  }

  const currentStart = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const currentEnd = (currentPage - 1) * ITEMS_PER_PAGE + currentItems.length;

  return [
    currentPage,
    setCurrentPage,
    currentStart,
    currentEnd,
    pageCount,
    currentItems,
  ];
}

export default usePagination;
