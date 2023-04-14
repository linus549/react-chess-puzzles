import { useContext } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import FilterContext from "contexts/FilterContext";

function Presets({ tags, customPresets }) {
  const { setFilter } = useContext(FilterContext);

  const presetList = [
    <Button
      key="Select all"
      variant="outline-primary"
      className="flex-grow-0"
      value="Select all"
      onClick={handleClick}
    >
      Select all
    </Button>,

    <Button
      key="Deselect all"
      variant="outline-primary"
      className="flex-grow-0"
      value="Deselect all"
      onClick={handleClick}
    >
      Deselect all
    </Button>,
  ];

  if (customPresets) {
    for (const preset of customPresets) {
      presetList.push(
        <Button
          key={preset.id}
          variant="outline-primary"
          className="flex-grow-0"
          value={preset.id}
          onClick={handleClick}
        >
          {preset.id}
        </Button>
      );
    }
  }

  function handleClick(e) {
    const value = e.target.value;

    // if "Select all" then set all true, otherwise all false
    const themeFlagMap = tags.reduce(
      (accumulator, currentTheme) => ({
        ...accumulator,
        [currentTheme]: value === "Select all",
      }),
      {}
    );

    // else if custom preset then set included themes to true
    if (value !== "Select all" && value !== "Deselect all") {
      const preset = customPresets.find((preset) => preset.id === value);

      for (const theme of preset.themes) {
        themeFlagMap[theme] = true;
      }
    }

    setFilter((filter) => ({
      ...filter,
      themeFlagMap,
    }));
  }

  return <ButtonGroup className="flex-wrap mb-3">{presetList}</ButtonGroup>;
}

export default Presets;
