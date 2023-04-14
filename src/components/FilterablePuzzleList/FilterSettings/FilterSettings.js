import { useState, useRef, useEffect } from "react";
import useLayoutFix from "hooks/useLayoutFix";
import { RATING_PRESETS, POPULARITY_PRESETS, THEMES_PRESETS } from "config";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import FilterSettingsActionBar from "components/FilterablePuzzleList/FilterSettings/FilterSettingsActionBar";
import RangeSelector from "components/FilterablePuzzleList/FilterSettings/RangeSelector/RangeSelector";
import TagsSelector from "components/FilterablePuzzleList/FilterSettings/TagsSelector/TagsSelector";

function FilterSettings({
  parameters,
  foundCount,
  onClearFilterClick,
  onDoneClick,
}) {
  const actionBarRef = useRef(null);
  const [padding, setPadding] = useState(0);
  useLayoutFix(setPadding, [actionBarRef]);

  useEffect(function scrollToTopOnMount() {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <FilterSettingsActionBar
        ref={actionBarRef}
        foundCount={foundCount}
        onClearFilterClick={onClearFilterClick}
        onDoneClick={onDoneClick}
      />

      <Container
        className="px-0"
        style={{
          paddingTop: padding + "px",
        }}
      >
        <Accordion defaultActiveKey="0" flush className="text-center">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Rating</Accordion.Header>
            <Accordion.Body>
              <RangeSelector
                id="rating"
                minLimit={parameters.lowestRating}
                maxLimit={parameters.highestRating}
                step="10"
                customPresets={RATING_PRESETS}
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Themes</Accordion.Header>
            <Accordion.Body>
              <TagsSelector
                id="themeFlagMap"
                tags={parameters.themes}
                customPresets={THEMES_PRESETS}
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Popularity</Accordion.Header>
            <Accordion.Body>
              <RangeSelector
                id="popularity"
                minLimit={parameters.lowestPopularity}
                maxLimit={parameters.highestPopularity}
                customPresets={POPULARITY_PRESETS}
              />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>Plays</Accordion.Header>
            <Accordion.Body>
              <RangeSelector
                id="plays"
                minLimit={parameters.lowestPlays}
                maxLimit={parameters.highestPlays}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}

export default FilterSettings;
