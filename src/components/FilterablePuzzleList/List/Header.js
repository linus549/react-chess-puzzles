import HeaderButton from "components/FilterablePuzzleList/List/HeaderButton";

function Header({ sortingScheme, setSortingScheme }) {
  return (
    <thead className="table-dark">
      <tr>
        <HeaderButton
          property="rating"
          label="Rating"
          sortingScheme={sortingScheme}
          setSortingScheme={setSortingScheme}
        />

        <th scope="col">Themes</th>

        <HeaderButton
          property="popularity"
          label="Popularity"
          sortingScheme={sortingScheme}
          setSortingScheme={setSortingScheme}
        />

        <HeaderButton
          property="nbPlays"
          label="Plays"
          sortingScheme={sortingScheme}
          setSortingScheme={setSortingScheme}
        />
      </tr>
    </thead>
  );
}

export default Header;
