import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function DifficultyLevelInput({ id, inputValues, presets, onChange }) {
  return (
    <Form.Group>
      <fieldset className="mb-3">
        <legend>Difficulty level</legend>

        <ButtonGroup className="flex-wrap">
          {presets.map((preset) => (
            <ToggleButton
              key={preset.id}
              id={preset.id}
              type="radio"
              variant="outline-primary"
              className="flex-grow-0"
              name={id}
              value={preset.id}
              checked={inputValues[id] === preset.id}
              onChange={onChange}
            >
              {preset.id}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </fieldset>
    </Form.Group>
  );
}

export default DifficultyLevelInput;
