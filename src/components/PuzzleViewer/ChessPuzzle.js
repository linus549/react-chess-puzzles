import React, { useState, useRef, useEffect } from "react";
import Chess from "components/PuzzleViewer/ChessWrapper";
import Chessground from "@react-chess/chessground";
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import usePrevious from "hooks/usePrevious";
import { BOARD_ANIMATION_DURATION } from "config";

function ChessPuzzle({
  startFen,
  solution,
  onStart,
  onCorrect,
  onIncorrect,
  onSolve,
}) {
  const [state, setState] = useState({
    fen: null,
    lastMove: null,
    correctMove: null,
  });

  const previousStartFen = usePrevious(startFen);
  const userColorRef = useRef(null);
  const chessRef = useRef(new Chess());

  useEffect(
    function reload() {
      if (startFen !== previousStartFen) {
        chessRef.current.load(startFen);
        chessRef.current.move(Chess.getFromTo(solution[0]));
        userColorRef.current = chessRef.current.getTurnColor();
        onStart(userColorRef.current);

        setState({
          fen: chessRef.current.fen(),
          lastMove: Object.values(Chess.getFromTo(solution[0])),
          correctMove: Chess.getFromTo(solution[1]),
        });
      }
    },
    [startFen, previousStartFen, solution, onStart]
  );

  function checkMove(from, to) {
    if (from === state.correctMove.from && to === state.correctMove.to) {
      if (chessRef.current.getMoveNumber() < solution.length) {
        // correct move
        onCorrect();

        setTimeout(() => {
          chessRef.current.move(
            Chess.getFromTo(solution[chessRef.current.getMoveNumber()])
          );

          setState({
            fen: chessRef.current.fen(),
            lastMove: [state.correctMove.from, state.correctMove.to],
            correctMove: Chess.getFromTo(
              solution[chessRef.current.getMoveNumber()]
            ),
          });
        }, BOARD_ANIMATION_DURATION);
      } else {
        // puzzle solved
        onSolve();
      }
    } else {
      // incorrect move
      onIncorrect();

      setTimeout(() => {
        chessRef.current.undo();
        setState((state) => ({ ...state, fen: chessRef.current.fen() }));
      }, BOARD_ANIMATION_DURATION);
    }
  }

  function handleMove(from, to) {
    if (chessRef.current.move({ from, to, promotion: "q" }) !== null) {
      setState((state) => ({
        ...state,
        fen: chessRef.current.fen(),
        lastMove: [from, to],
      }));

      checkMove(from, to);
    }
  }

  return (
    <Chessground
      config={{
        coordinates: false,
        fen: state.fen,
        turnColor: chessRef.current.getTurnColor(),
        orientation: userColorRef.current,
        movable:
          chessRef.current.getTurnColor() === userColorRef.current
            ? chessRef.current.getMovable()
            : {},
        lastMove: state.lastMove,
        animation: { duration: BOARD_ANIMATION_DURATION },
        events: { move: handleMove },
      }}
      contained
    />
  );
}

export default ChessPuzzle;
