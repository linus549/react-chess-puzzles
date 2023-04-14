import { useState, useRef, useEffect, useContext } from "react";
import useLayoutFix from "hooks/useLayoutFix";
import useSort from "hooks/useSort";
import usePagination from "hooks/usePagination";
import { getRandomElements } from "helpers";
import AppContext from "contexts/AppContext";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import ListActionBar from "components/FilterablePuzzleList/List/ListActionBar";
import SelectionActionBar from "components/FilterablePuzzleList/List/SelectionActionBar";
import Header from "components/FilterablePuzzleList/List/Header";
import ListItem from "components/FilterablePuzzleList/List/ListItem";
import Pagination from "components/FilterablePuzzleList/List/Pagination";

function List({ isVisible, puzzles, onFilterClick }) {
  const { appDispatch } = useContext(AppContext);
  const [selectionIDs, setSelectionIDs] = useState(Object.create(null));
  const IDs = Object.keys(selectionIDs);
  const mostRecentSelectionID = IDs.length > 0 ? IDs[IDs.length - 1] : null;
  const mostRecentSelectionRef = useRef(null);
  const listActionBarRef = useRef(null);
  const selectionActionBarRef = useRef(null);
  const [sortingScheme, setSortingScheme, sortedPuzzles] = useSort(puzzles);

  const [
    currentPage,
    setCurrentPage,
    currentStart,
    currentEnd,
    pageCount,
    currentSortedPuzzles,
  ] = usePagination(sortedPuzzles);

  const [padding, setPadding] = useState(0);
  useLayoutFix(
    setPadding,
    [listActionBarRef, selectionActionBarRef],
    [isVisible, selectionIDs]
  );

  useEffect(
    function resetCurrentPage() {
      setCurrentPage(1);
    },
    [puzzles, setCurrentPage]
  );

  useEffect(
    function scroll() {
      if (isVisible) {
        if (mostRecentSelectionRef.current) {
          mostRecentSelectionRef.current.scrollIntoView({ block: "center" });
        } else {
          setTimeout(() => {
            window.scroll(0, 0);
          }, 0);
        }
      }
    },
    [isVisible, currentPage]
  );

  function toggleSelected(id) {
    if (id in selectionIDs) {
      setSelectionIDs((selectionIDs) => {
        const remaining = { ...selectionIDs };
        delete remaining[id];
        return remaining;
      });
    } else {
      setSelectionIDs((selectionIDs) => ({
        ...selectionIDs,
        [id]: "",
      }));
    }
  }

  function selectAll() {
    setSelectionIDs(
      Object.fromEntries(sortedPuzzles.map((puzzle) => [puzzle.puzzleId, ""]))
    );
  }

  function selectRandom(count) {
    const randomPuzzles = getRandomElements(sortedPuzzles, count);

    setSelectionIDs(
      Object.fromEntries(randomPuzzles.map((puzzle) => [puzzle.puzzleId, ""]))
    );
  }

  function clearSelections() {
    setSelectionIDs({});
  }

  function handlePlayClick() {
    appDispatch({
      type: "show_puzzle_viewer",
      payload: sortedPuzzles.filter(
        (puzzle) => puzzle.puzzleId in selectionIDs
      ),
    });
  }

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {Object.keys(selectionIDs).length > 0 ? (
        <SelectionActionBar
          ref={selectionActionBarRef}
          selectionCount={Object.keys(selectionIDs).length}
          clearSelections={clearSelections}
          handlePlayClick={handlePlayClick}
        />
      ) : (
        <ListActionBar
          ref={listActionBarRef}
          text={`${currentStart}-${currentEnd} of ${sortedPuzzles.length} puzzles`}
          selectAll={selectAll}
          selectRandom={selectRandom}
          onFilterClick={onFilterClick}
        />
      )}

      <Container
        className="px-0"
        style={{
          paddingTop: padding + "px",
        }}
      >
        <Table responsive striped hover className="border user-select-none">
          <Header
            sortingScheme={sortingScheme}
            setSortingScheme={setSortingScheme}
          />

          <tbody>
            {currentSortedPuzzles.map((puzzle) => (
              <ListItem
                ref={
                  puzzle.puzzleId === mostRecentSelectionID
                    ? mostRecentSelectionRef
                    : undefined
                }
                key={puzzle.puzzleId}
                puzzle={puzzle}
                isSelected={puzzle.puzzleId in selectionIDs}
                onClick={toggleSelected}
              />
            ))}
          </tbody>
        </Table>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
        />
      </Container>
    </>
  );
}

export default List;
