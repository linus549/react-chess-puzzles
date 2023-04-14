import Presets from "components/FilterablePuzzleList/FilterSettings/TagsSelector/Presets";
import Tags from "components/FilterablePuzzleList/FilterSettings/TagsSelector/Tags";

function TagsSelector({ id, tags, customPresets }) {
  return (
    <>
      <Presets tags={tags} customPresets={customPresets} />
      <Tags id={id} tags={tags} />
    </>
  );
}

export default TagsSelector;
