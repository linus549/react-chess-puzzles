import { forwardRef } from "react";
import Button from "react-bootstrap/Button";
import ActionBar from "components/FilterablePuzzleList/ActionBar";

const FilterActionBar = forwardRef(
  ({ foundCount, onClearFilterClick, onDoneClick }, ref) => {
    return (
      <ActionBar
        ref={ref}
        text={`${foundCount} puzzles found`}
        color="dark"
        background="white"
        // needs z-index for position-fixed to show in front of Accordion
        style={{ zIndex: "1010" }}
      >
        <Button variant="secondary" onClick={onClearFilterClick}>
          Clear Filter
        </Button>

        <Button variant="primary" className="ms-2" onClick={onDoneClick}>
          Done
        </Button>
      </ActionBar>
    );
  }
);

export default FilterActionBar;
