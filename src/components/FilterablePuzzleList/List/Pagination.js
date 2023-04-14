import BootstrapPagination from "react-bootstrap/Pagination";
import { range } from "helpers";

function Pagination({ currentPage, setCurrentPage, pageCount }) {
  function handleItemClick(e) {
    setCurrentPage(Number(e.target.dataset.page));
  }

  function handlePrevClick() {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  function handleNextClick() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  return (
    <BootstrapPagination className="d-flex flex-wrap">
      <BootstrapPagination.Prev
        disabled={currentPage === 1}
        onClick={handlePrevClick}
      />

      {getPaginationItems(currentPage, pageCount, 2).map((item, i) =>
        item === ELLIPSIS ? (
          <BootstrapPagination.Ellipsis key={i} />
        ) : (
          <BootstrapPagination.Item
            key={i}
            active={Number(item) === currentPage}
            data-page={item}
            onClick={handleItemClick}
          >
            {item}
          </BootstrapPagination.Item>
        )
      )}

      <BootstrapPagination.Next
        disabled={currentPage === pageCount}
        onClick={handleNextClick}
      />
    </BootstrapPagination>
  );
}

const ELLIPSIS = "...";

function getPaginationItems(currentPage, pageCount, adjacentCount = 1) {
  const FIRST = 1;
  const LAST = pageCount;
  // first + last + current + (ellipsis * 2) = 5
  const MAX_ITEMS = 5 + adjacentCount * 2;
  // MAX_ITEMS - first - last - ellipsis - (adjacentCount * 2)
  const TO_MAINTAIN_MAX = 2;

  if (pageCount <= MAX_ITEMS) {
    return range(FIRST, LAST);
  }

  const leftmostAdjacent = Math.max(currentPage - adjacentCount, FIRST);
  const rightmostAdjacent = Math.min(currentPage + adjacentCount, LAST);
  const shouldShowLeftEllipsis = leftmostAdjacent > FIRST + 1;
  const shouldShowRightEllipsis = rightmostAdjacent < LAST - 1;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftRange = range(FIRST, FIRST + TO_MAINTAIN_MAX + adjacentCount * 2);
    return [...leftRange, ELLIPSIS, LAST];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightRange = range(
      LAST - (TO_MAINTAIN_MAX + adjacentCount * 2),
      LAST
    );
    return [FIRST, ELLIPSIS, ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const midRange = range(leftmostAdjacent, rightmostAdjacent);
    return [FIRST, ELLIPSIS, ...midRange, ELLIPSIS, LAST];
  }
}

export default Pagination;
