import { useContext, useState, useMemo } from "react";
import { getStats } from "data";
import { RATING_PRESETS } from "config";
import { inRange, getRandomElements } from "helpers";
import Button from "react-bootstrap/Button";
import BootstrapForm from "react-bootstrap/Form";
import DifficultyLevelInput from "components/GetStarted/Form/DifficultyLevelInput";
import ThemesInput from "components/GetStarted/Form/ThemesInput";
import PuzzleCountInput from "components/GetStarted/Form/PuzzleCountInput";
import AppContext from "contexts/AppContext";

function Form({ data }) {
  const { appDispatch } = useContext(AppContext);

  const [inputValues, setInputValues] = useState({
    difficultyLevel: RATING_PRESETS[0].id,
    themesCheckedState: Object.fromEntries(
      themes.map((theme) => [theme, true])
    ),
    puzzleCount: "10",
  });

  const filteredPuzzles = useMemo(
    function filter() {
      const preset = RATING_PRESETS.find(
        (preset) => preset.id === inputValues.difficultyLevel
      );

      const minRating = "min" in preset ? preset.min : minRatingStat;
      const maxRating = "max" in preset ? preset.max : maxRatingStat;

      return data.filter((puzzle) => {
        for (const [theme, checked] of Object.entries(
          inputValues.themesCheckedState
        )) {
          if (!checked && puzzle.themes.includes(theme)) {
            // puzzle includes deselected theme
            return false;
          }
        }

        return (
          inRange(puzzle.rating, minRating, maxRating) &&
          puzzle.popularity >= 80
        );
      });
    },
    [data, inputValues.difficultyLevel, inputValues.themesCheckedState]
  );

  function handleChange(e) {
    setInputValues((inputValues) => ({
      ...inputValues,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    appDispatch({
      type: "show_puzzle_viewer",
      payload: getRandomElements(filteredPuzzles, inputValues.puzzleCount),
    });
  }

  return (
    <div>
      <h2 className="mb-3">Get Started</h2>
      <BootstrapForm onSubmit={handleSubmit}>
        <DifficultyLevelInput
          id="difficultyLevel"
          inputValues={inputValues}
          presets={RATING_PRESETS}
          onChange={handleChange}
        />

        <ThemesInput
          id="themesCheckedState"
          inputValues={inputValues}
          setInputValues={setInputValues}
          themes={themes}
        />

        <PuzzleCountInput
          id="puzzleCount"
          inputValues={inputValues}
          onChange={handleChange}
        />

        <small
          className={`d-block mb-3 
          ${filteredPuzzles.length > 0 ? "text-muted" : "text-danger"}`}
        >
          {filteredPuzzles.length} puzzles match
        </small>

        <div className="d-flex justify-content-center mb-3">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={filteredPuzzles.length === 0}
          >
            Play
          </Button>
        </div>
      </BootstrapForm>
    </div>
  );
}

const { minRating: minRatingStat, maxRating: maxRatingStat } = getStats();
// primary themes - must be included because every puzzle is categorized as one of these
const themes = ["opening", "middlegame", "endgame"];

export default Form;
