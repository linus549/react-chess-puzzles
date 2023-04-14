import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

function ThemesInput({ id, inputValues, setInputValues, themes }) {
  const isValid = Object.values(inputValues.themesCheckedState).some(
    (checked) => checked
  );

  function handleChange(e) {
    setInputValues((inputValues) => ({
      ...inputValues,
      [id]: {
        ...inputValues[id],
        [e.target.name]: e.target.checked,
      },
    }));
  }

  return (
    <Form.Group>
      <fieldset className="mb-3">
        <legend>Themes</legend>

        <ButtonGroup className="flex-wrap">
          {themes.map((theme) => (
            <ToggleButton
              key={theme}
              id={theme}
              name={theme}
              type="checkbox"
              variant="outline-primary"
              className="flex-grow-0 text-capitalize"
              checked={inputValues[id][theme]}
              onChange={handleChange}
            >
              {theme}
            </ToggleButton>
          ))}
        </ButtonGroup>

        {!isValid && (
          <p className="text-danger mb-0">Please select at least one theme.</p>
        )}
      </fieldset>
    </Form.Group>
  );
}

export default ThemesInput;
