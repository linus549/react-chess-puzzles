export const ITEMS_PER_PAGE = 50;
export const BOARD_ANIMATION_DURATION = 500;
export const FILTER_DEBOUNCE_DELAY = 500;
export const UPDATE_LAYOUT_DEBOUNCE_DELAY = 500;

export const sortingOrder = {
  ASCENDING: "ascending",
  DESCENDING: "descending",
};

export const RATING_PRESETS = [
  {
    id: "Novice",
    max: 1200,
  },
  {
    id: "Casual",
    min: 1201,
    max: 1800,
  },
  {
    id: "Intermediate",
    min: 1801,
    max: 2200,
  },
  {
    id: "Advanced",
    min: 2201,
    max: 2500,
  },
];

export const POPULARITY_PRESETS = [
  {
    id: "Not negative",
    min: 0,
  },
  {
    id: "Liked",
    min: 80,
  },
];

export const THEMES_PRESETS = [
  {
    id: "General motifs",
    themes: [
      "attraction",
      "clearance",
      "deflection",
      "discoveredAttack",
      "fork",
      "interference",
      "pin",
      "skewer",
      "xRayAttack",
    ],
  },
];
