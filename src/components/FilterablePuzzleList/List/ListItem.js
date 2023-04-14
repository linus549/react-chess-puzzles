import { forwardRef } from "react";
import Badge from "react-bootstrap/Badge";

const ListItem = forwardRef(({ puzzle, isSelected, onClick }, ref) => {
  function handleClick() {
    onClick(puzzle.puzzleId);
  }

  return (
    <tr
      ref={ref}
      className={isSelected ? "bg-primary" : undefined}
      role="button"
      onClick={handleClick}
    >
      <th scope="row" className="text-white bg-primary">
        {puzzle.rating}
      </th>

      <td className="text-break">
        {puzzle.themes.map((theme) => (
          <Badge
            key={theme}
            bg={getThemeColor(theme)}
            className="text-capitalize ms-1 my-1"
          >
            {/* put spaces in camelCase */}
            {theme.replace(/([A-Z0-9]+)/g, " $1")}
          </Badge>
        ))}
      </td>

      <td
        className={`text-white bg-${
          isSelected ? "primary" : getPopularityColor(puzzle.popularity)
        }`}
      >
        {puzzle.popularity}
      </td>

      <td className={isSelected ? "text-white" : undefined}>
        {puzzle.nbPlays}
      </td>
    </tr>
  );
});

function getThemeColor(theme) {
  switch (theme) {
    case "opening":
      return "warning";
    case "middlegame":
      return "success";
    case "endgame":
      return "info";
    default:
      return "dark";
  }
}

function getPopularityColor(popularity) {
  if (popularity < 0) {
    return "danger";
  }

  if (popularity < 80) {
    return "warning";
  }

  return "success";
}

export default ListItem;
