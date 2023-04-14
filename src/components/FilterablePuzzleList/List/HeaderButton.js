import { sortingOrder } from "config";

function HeaderButton({ property, label, sortingScheme, setSortingScheme }) {
  function handleClick() {
    // use ascending as default, toggle ascending/descending if was already active
    let order =
      property === sortingScheme.property &&
      sortingScheme.order === sortingOrder.ASCENDING
        ? sortingOrder.DESCENDING
        : sortingOrder.ASCENDING;

    setSortingScheme({ property, order });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }

  return (
    <th
      scope="col"
      tabIndex="0"
      role="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className="text-nowrap">
        {label}
        {sortingScheme.property === property &&
          ORDER_ICON_MAP[sortingScheme.order]}
      </span>
    </th>
  );
}

const ORDER_ICON_MAP = {
  ascending: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-caret-up-fill ms-1"
      viewBox="0 0 16 16"
    >
      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
    </svg>
  ),
  descending: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-caret-down-fill ms-1"
      viewBox="0 0 16 16"
    >
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
  ),
};

export default HeaderButton;
