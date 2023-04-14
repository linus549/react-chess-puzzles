import Presets from "components/FilterablePuzzleList/FilterSettings/RangeSelector/Presets";
import Range from "components/FilterablePuzzleList/FilterSettings/RangeSelector/Range";

function RangeSelector({ id, minLimit, maxLimit, step = "1", customPresets }) {
  return (
    <>
      <Presets
        id={id}
        minLimit={minLimit}
        maxLimit={maxLimit}
        customPresets={customPresets}
      />

      <Range id={id} minLimit={minLimit} maxLimit={maxLimit} step={step} />
    </>
  );
}

export default RangeSelector;
