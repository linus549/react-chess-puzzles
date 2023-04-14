function Introduction({ puzzleCount }) {
  return (
    <div className="fs-4">
      <h1>Chess Puzzles</h1>
      <p>
        Play <span className="fw-bold">{puzzleCount}</span> chess puzzles from
        the{" "}
        <a
          href="https://database.lichess.org/#puzzles"
          target="_blank"
          rel="noreferrer"
        >
          Lichess Puzzles Database
        </a>
      </p>
      <p>Filter and sort by rating, themes, popularity and number of plays</p>
    </div>
  );
}

export default Introduction;
