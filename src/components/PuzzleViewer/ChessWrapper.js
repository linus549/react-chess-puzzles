import Chess from "chess.js";

class ChessWrapper {
  static getFromTo(uci) {
    return {
      from: uci.substring(0, 2),
      to: uci.substring(2, 4),
      promotion: "q",
    };
  }

  constructor(fen) {
    this.chess = new Chess(fen);
  }

  getTurnColor() {
    return this.chess.turn() === "w" ? "white" : "black";
  }

  getMoveNumber() {
    return this.chess.history().length;
  }

  getMovable() {
    const destinations = new Map();

    for (const square of this.chess.SQUARES) {
      const moves = this.chess.moves({ square, verbose: true });

      if (moves.length > 0) {
        destinations.set(
          square,
          moves.map((move) => move.to)
        );
      }
    }

    return {
      free: false,
      dests: destinations,
      color: this.getTurnColor(),
    };
  }

  fen() {
    return this.chess.fen();
  }

  load(fen) {
    return this.chess.load(fen);
  }

  move(move) {
    return this.chess.move(move);
  }

  moves(options) {
    return this.chess.moves(options);
  }

  undo() {
    return this.chess.undo();
  }
}

export default ChessWrapper;
