import { forwardRef } from "react";
import Button from "react-bootstrap/Button";
import ActionBar from "components/FilterablePuzzleList/ActionBar";

const SelectionActionBar = forwardRef(
  ({ selectionCount, clearSelections, handlePlayClick }, ref) => {
    return (
      <ActionBar
        ref={ref}
        text={selectionCount + " selected"}
        color="white"
        background="primary"
      >
        <Button variant="primary" onClick={clearSelections}>
          Clear
        </Button>

        <Button variant="primary" className="ms-2" onClick={handlePlayClick}>
          Play
        </Button>
      </ActionBar>
    );
  }
);

export default SelectionActionBar;
