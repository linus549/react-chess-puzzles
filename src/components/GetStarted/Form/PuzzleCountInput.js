import Form from "react-bootstrap/Form";

function PuzzleCountInput({ id, inputValues, onChange }) {
  function handleFocus(e) {
    e.target.select();
  }

  return (
    <Form.Group controlId={id} className="fs-4 mb-3">
      <Form.Label>Number of puzzles</Form.Label>
      <Form.Control
        type="number"
        name={id}
        min="1"
        value={inputValues[id]}
        required
        onChange={onChange}
        onFocus={handleFocus}
      />
    </Form.Group>
  );
}

export default PuzzleCountInput;
