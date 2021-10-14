export const personSearchingParams = [
  {
    content: [
      { option: "All", id: 1 },
      { option: "Alive", id: 2 },
      { option: "Dead", id: 3 },
      { option: "Unknown", id: 4 },
    ],
    type: "status",
    key: 1,
  },
  {
    content: [
      { option: "All", id: 1 },
      { option: "Human", id: 2 },
      { option: "Alien", id: 3 },
      { option: "Humanoid", id: 4 },
      { option: "Unknown", id: 5 },
      { option: "Animal", id: 6 },
      { option: "Robot", id: 7 },
    ],
    type: "species",
    key: 2,
  },
  {
    content: [
      { option: "All", id: 1 },
      { option: "Parasite", id: 2 },
      { option: "Vampire", id: 3 },
      { option: "Centaur", id: 4 },
    ],
    type: "type",
    key: 3,
  },
  {
    content: [
      { option: "All", id: 1 },
      { option: "Female", id: 2 },
      { option: "Male", id: 3 },
      { option: "Genderless", id: 4 },
      { option: "Unknown", id: 5 },
    ],
    type: "gender",
    key: 4,
  },
];

export const episodeSearchingParams = [
  { type: "season", id: 1, max: 3 },
  { type: "episode", id: 2, max: 25 },
];
