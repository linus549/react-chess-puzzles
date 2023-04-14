import { useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import FilterContext from "contexts/FilterContext";

function Presets({ id, minLimit, maxLimit, customPresets }) {
  const { filter, setFilter } = useContext(FilterContext);

  const presetList = [
    <ToggleButton
      key="Any"
      variant="outline-primary"
      className="flex-grow-0"
      label="Any"
      type="radio"
      id={id + "-Any"}
      value="Any"
      checked={filter[id].preset === "Any"}
      onChange={handleChange}
    >
      Any
    </ToggleButton>,

    <ToggleButton
      key="Custom"
      variant="outline-primary"
      className="flex-grow-0"
      label="Custom"
      type="radio"
      id={id + "-Custom"}
      value="Custom"
      checked={filter[id].preset === "Custom"}
      onChange={handleChange}
    >
      Custom
    </ToggleButton>,
  ];

  if (customPresets) {
    presetList.splice(
      1,
      0,
      customPresets.map((preset) => (
        <ToggleButton
          key={preset.id}
          variant="outline-primary"
          className="flex-grow-0"
          type="radio"
          id={id + "-" + preset.id.replace(/\s/g, "")}
          value={preset.id}
          checked={filter[id].preset === preset.id}
          onChange={handleChange}
        >
          {preset.id}
        </ToggleButton>
      ))
    );
  }

  function handleChange(e) {
    const value = e.target.value;

    if (value === "Any") {
      setFilter((filter) => ({
        ...filter,
        [id]: {
          preset: value,
          min: minLimit,
          max: maxLimit,
        },
      }));
    } else if (value === "Custom") {
      setFilter((filter) => ({
        ...filter,
        [id]: {
          ...filter[id],
          preset: value,
        },
      }));
    } else if (customPresets) {
      const preset = customPresets.find((preset) => preset.id === value);

      const min =
        "min" in preset && preset.min > minLimit ? preset.min : minLimit;

      const max =
        "max" in preset && preset.max < maxLimit ? preset.max : maxLimit;

      setFilter((filter) => ({
        ...filter,
        [id]: {
          preset: preset.id,
          min,
          max,
        },
      }));
    }
  }

  return <ButtonGroup className="flex-wrap mb-3">{presetList}</ButtonGroup>;
}

export default Presets;
