import { useContext } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import FilterContext from "contexts/FilterContext";

function Tags({ id, tags }) {
  const { filter, setFilter } = useContext(FilterContext);

  const tagsCheckboxList = tags.map((tag) => (
    <ToggleButton
      key={tag}
      id={tag}
      name={tag}
      type="checkbox"
      variant="outline-primary"
      className="me-1 mb-1"
      checked={filter[id][tag]}
      onChange={handleChange}
    >
      {/* put spaces in camelCase */}
      <span className="text-capitalize">
        {tag.replace(/([A-Z0-9]+)/g, " $1")}
      </span>
    </ToggleButton>
  ));

  function handleChange(e) {
    setFilter((filter) => ({
      ...filter,
      [id]: {
        ...filter[id],
        [e.target.name]: e.target.checked,
      },
    }));
  }

  return <div className="d-flex flex-wrap">{tagsCheckboxList}</div>;
}

export default Tags;
