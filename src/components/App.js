import { useReducer, useEffect } from "react";
import AppContext from "contexts/AppContext";
import Header from "components/Header";
import GetStarted from "components/GetStarted/GetStarted";
import FilterablePuzzleList from "components/FilterablePuzzleList/FilterablePuzzleList";
import PuzzleViewer from "components/PuzzleViewer/PuzzleViewer";

function App({ data }) {
  const [state, appDispatch] = useReducer(reducer, {
    currentView: view.GET_STARTED,
    selectedPuzzles: [],
  });

  useEffect(
    function scrollToTop() {
      if (state.currentView !== view.ALL_PUZZLES) {
        window.scroll(0, 0);
      }
    },
    [state.currentView]
  );

  return (
    <AppContext.Provider value={{ state, appDispatch }}>
      {state.currentView !== view.PUZZLE_VIEWER && <Header />}

      <main
        style={
          state.currentView !== view.PUZZLE_VIEWER
            ? { paddingTop: "3.5rem" }
            : undefined
        }
      >
        {state.currentView === view.GET_STARTED && <GetStarted data={data} />}

        <FilterablePuzzleList
          data={data}
          isVisible={state.currentView === view.ALL_PUZZLES}
        />
      </main>

      {state.currentView === view.PUZZLE_VIEWER && (
        <PuzzleViewer puzzles={state.selectedPuzzles} />
      )}
    </AppContext.Provider>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "show_get_started":
      return {
        ...state,
        currentView: view.GET_STARTED,
      };
    case "show_all_puzzles":
      return {
        ...state,
        currentView: view.ALL_PUZZLES,
      };
    case "show_puzzle_viewer":
      return {
        currentView: view.PUZZLE_VIEWER,
        selectedPuzzles: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export const view = {
  GET_STARTED: "Get Started",
  ALL_PUZZLES: "All Puzzles",
  PUZZLE_VIEWER: "Puzzle Viewer",
};

export default App;
