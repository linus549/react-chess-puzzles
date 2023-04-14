import { useState, useMemo } from "react";
import { sortingOrder } from "config";

function useSort(array) {
  const [sortingScheme, setSortingScheme] = useState({
    property: "rating",
    order: sortingOrder.ASCENDING,
  });

  const sortedArray = useMemo(
    () => [...array].sort(getCompareFunction(sortingScheme)),
    [array, sortingScheme]
  );

  return [sortingScheme, setSortingScheme, sortedArray];
}

function getCompareFunction(sortingScheme) {
  if (sortingScheme.order === sortingOrder.ASCENDING) {
    return function compareAscending(a, b) {
      if (
        Number(a[sortingScheme.property]) > Number(b[sortingScheme.property])
      ) {
        return 1;
      }

      if (
        Number(a[sortingScheme.property]) < Number(b[sortingScheme.property])
      ) {
        return -1;
      }

      return 0;
    };
  }

  return function compareDescending(a, b) {
    if (Number(a[sortingScheme.property]) < Number(b[sortingScheme.property])) {
      return 1;
    }

    if (Number(a[sortingScheme.property]) > Number(b[sortingScheme.property])) {
      return -1;
    }

    return 0;
  };
}

export default useSort;
