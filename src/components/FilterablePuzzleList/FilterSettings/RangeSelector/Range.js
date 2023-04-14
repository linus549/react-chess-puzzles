import { useContext } from "react";
import Form from "react-bootstrap/Form";
import FilterContext from "contexts/FilterContext";

function Range({ id, minLimit, maxLimit, step }) {
  const { filter, setFilter } = useContext(FilterContext);

  function handleChange(e) {
    let value = Number(e.target.value);

    if (e.target.name === "min" && value > filter[id].max) {
      value = filter[id].max;
    } else if (e.target.name === "max" && value < filter[id].min) {
      value = filter[id].min;
    }

    setFilter((filter) => ({
      ...filter,
      [id]: {
        ...filter[id],
        preset: "Custom",
        [e.target.name]: value,
      },
    }));
  }

  return (
    <div>
      <Form.Label htmlFor={id + "-min"}>
        Minimum: <span className="fw-bold">{filter[id].min}</span>
      </Form.Label>

      <Form.Range
        id={id + "-min"}
        name="min"
        min={Math.floor(minLimit / step) * step}
        max={Math.ceil(maxLimit / step) * step}
        step={step}
        value={filter[id].min}
        onChange={handleChange}
      />

      <Form.Label htmlFor={id + "-max"}>
        Maximum: <span className="fw-bold">{filter[id].max}</span>
      </Form.Label>

      <Form.Range
        id={id + "-max"}
        name="max"
        min={Math.floor(minLimit / step) * step}
        max={Math.ceil(maxLimit / step) * step}
        step={step}
        value={filter[id].max}
        onChange={handleChange}
      />
    </div>
  );
}

export default Range;
