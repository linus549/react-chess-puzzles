import { useState, useContext } from "react";
import AppContext from "contexts/AppContext";
import Button from "react-bootstrap/Button";
import Instruction from "components/PuzzleViewer/Instruction";
import ChessPuzzle from "components/PuzzleViewer/ChessPuzzle";

function PuzzleViewer({ puzzles }) {
  const { appDispatch } = useContext(AppContext);
  const [instruction, setInstruction] = useState({});
  const [puzzleIndex, setPuzzleIndex] = useState(0);

  function handleStart(userColor) {
    setInstruction({ ...INSTRUCTION_MAP.start, userColor });
  }

  function handleCorrect() {
    setInstruction({ ...INSTRUCTION_MAP.correct });
  }

  function handleIncorrect() {
    setInstruction({ ...INSTRUCTION_MAP.incorrect });
  }

  function handleSolve() {
    setInstruction({ ...INSTRUCTION_MAP.solve });
  }

  function handleNextPuzzleClick() {
    setPuzzleIndex((puzzleIndex) => puzzleIndex + 1);
  }

  function handleBackToListClick() {
    appDispatch({ type: "show_all_puzzles" });
  }

  return (
    <div className="d-flex flex-wrap align-items-center">
      <div
        style={{
          width: "min(100vw, 100vh)",
          height: "min(100vw, 100vh)",
        }}
      >
        <ChessPuzzle
          startFen={puzzles[puzzleIndex].fen}
          solution={puzzles[puzzleIndex].moves}
          onStart={handleStart}
          onCorrect={handleCorrect}
          onIncorrect={handleIncorrect}
          onSolve={handleSolve}
        />
      </div>

      <div className="m-4">
        <p className="fs-4 mb-4">
          Puzzle {puzzleIndex + 1} of {puzzles.length}
        </p>

        <Instruction {...instruction} />

        <Button
          variant="primary"
          size="lg"
          className="d-block mb-2"
          disabled={puzzleIndex === puzzles.length - 1}
          onClick={handleNextPuzzleClick}
        >
          Next Puzzle
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="d-block"
          onClick={handleBackToListClick}
        >
          Back to List
        </Button>
      </div>
    </div>
  );
}

const INSTRUCTION_MAP = {
  start: {
    textColor: "dark",
    background: "light",
    primaryText: "Your turn",
    secondaryText: "Find the best move for ",
  },
  correct: {
    textColor: "dark",
    background: "light",
    primaryText: "Best move!",
    secondaryText: "Keep going...",
  },
  incorrect: {
    textColor: "white",
    background: "danger",
    primaryText: "That's not the move!",
    secondaryText: "Try something else.",
  },
  solve: {
    textColor: "white",
    background: "success",
    primaryText: "Success!",
    secondaryText: "",
  },
};

export default PuzzleViewer;
