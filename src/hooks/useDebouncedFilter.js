import { useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import { inRange } from "helpers";
import { FILTER_DEBOUNCE_DELAY } from "config";

function useDebouncedFilter(source, filter, setFilteredPuzzles) {
  const debouncedFilterRef = useRef(
    debounce(
      (filter) =>
        setFilteredPuzzles(
          source.filter((puzzle) => {
            if (!puzzle.themes.some((theme) => filter.themeFlagMap[theme])) {
              // puzzle does not include any of selected themes
              return false;
            }

            return (
              inRange(puzzle.rating, filter.rating.min, filter.rating.max) &&
              inRange(
                puzzle.popularity,
                filter.popularity.min,
                filter.popularity.max
              ) &&
              inRange(puzzle.nbPlays, filter.plays.min, filter.plays.max)
            );
          })
        ),
      FILTER_DEBOUNCE_DELAY
    )
  );

  useEffect(() => debouncedFilterRef.current(filter), [filter]);
}

export default useDebouncedFilter;
