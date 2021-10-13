export const initialPersonSearchingParams = {
  statuses: [
    { status: "All", id: "" },
    { status: "Alive", id: "alive" },
    { status: "Dead", id: "dead" },
    { status: "Unknown", id: "unknown" },
  ],
  species: [
    { species: "All", id: "" },
    { species: "Human", id: "human" },
    { species: "Alien", id: "alien" },
    { species: "Humanoid", id: "humanoid" },
    { species: "Unknown", id: "unknown" },
    { species: "Animal", id: "animal" },
    { species: "Robot", id: "robot" },
  ],
  types: [
    { type: "All", id: "" },
    { type: "Parasite", id: "parasite" },
    { type: "Vampire", id: "vampire" },
    { type: "Centaur", id: "centaur" },
  ],
  gender: [
    { gender: "All", id: "" },
    { gender: "Female", id: "female" },
    { gender: "Male", id: "male" },
    { gender: "Genderless", id: "genderless" },
    { gender: "Unknown", id: "unknown" },
  ],
};
