import { useState, useMemo, useEffect } from "react";
import useDebouncedFilter from "hooks/useDebouncedFilter";
import { getStats, getThemes } from "data";
import List from "components/FilterablePuzzleList/List/List";
import FilterSettings from "components/FilterablePuzzleList/FilterSettings/FilterSettings";
import FilterContext from "contexts/FilterContext";

function FilterablePuzzleList({ data: originalData, isVisible }) {
  const data = useMemo(
    () => originalData.map((puzzle) => placePrimaryThemeFirst(puzzle)),
    [originalData]
  );

  const [showFilterSettings, setShowFilterSettings] = useState(false);
  const [filter, setFilter] = useState(INITIAL_FILTER);
  const [filteredPuzzles, setFilteredPuzzles] = useState(data);

  useDebouncedFilter(data, filter, setFilteredPuzzles);

  useEffect(
    function hideFilterSettings() {
      setShowFilterSettings(false);
    },
    [isVisible]
  );

  function handleFilterClick() {
    setShowFilterSettings(true);
  }

  function handleClearFilterClick() {
    setFilter(INITIAL_FILTER);
  }

  function handleDoneClick() {
    setShowFilterSettings(false);
  }

  return (
    <div hidden={!isVisible}>
      <List
        isVisible={isVisible && !showFilterSettings}
        puzzles={filteredPuzzles}
        onFilterClick={handleFilterClick}
      />

      {showFilterSettings && (
        <FilterContext.Provider value={{ filter, setFilter }}>
          <FilterSettings
            parameters={FILTER_PARAMETERS}
            foundCount={filteredPuzzles.length}
            onClearFilterClick={handleClearFilterClick}
            onDoneClick={handleDoneClick}
          />
        </FilterContext.Provider>
      )}
    </div>
  );
}

const {
  minRating,
  maxRating,
  minPopularity,
  maxPopularity,
  minPlays,
  maxPlays,
} = getStats();

const FILTER_PARAMETERS = {
  lowestRating: minRating,
  highestRating: maxRating,
  lowestPopularity: minPopularity,
  highestPopularity: maxPopularity,
  lowestPlays: minPlays,
  highestPlays: maxPlays,
  themes: getThemes(),
};

const INITIAL_FILTER = {
  rating: {
    preset: "Any",
    min: minRating,
    max: maxRating,
  },
  popularity: {
    preset: "Any",
    min: minPopularity,
    max: maxPopularity,
  },
  plays: {
    preset: "Any",
    min: minPlays,
    max: maxPlays,
  },
  themeFlagMap: Object.fromEntries(
    FILTER_PARAMETERS.themes.map((theme) => [theme, true])
  ),
};

function placePrimaryThemeFirst(sourcePuzzle) {
  const puzzle = { ...sourcePuzzle };
  const primaryThemes = ["opening", "middlegame", "endgame"];
  let primaryThemeIndex = -1;

  for (let i = 0; primaryThemeIndex === -1 && i < primaryThemes.length; i++) {
    primaryThemeIndex = puzzle.themes.indexOf(primaryThemes[i]);
  }

  const primaryTheme = puzzle.themes.splice(primaryThemeIndex, 1);
  puzzle.themes.unshift(...primaryTheme);

  return puzzle;
}

export default FilterablePuzzleList;
