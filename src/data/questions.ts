export interface Question {
  id: number;
  mission: string;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

export const questions: Question[] = [
  {
    id: 1,
    mission: "MISSION ALPHA",
    question: "What is the approximate distance between Earth and Mars at closest approach?",
    options: ["54.6 million km", "78.3 million km", "120 million km", "225 million km"],
    correct: 0,
    category: "Navigation"
  },
  {
    id: 2,
    mission: "MISSION ALPHA",
    question: "How long does it take to travel from Earth to Mars using current propulsion technology?",
    options: ["3-4 weeks", "6-9 months", "1-2 years", "3-4 months"],
    correct: 1,
    category: "Navigation"
  },
  {
    id: 3,
    mission: "MISSION BETA",
    question: "What is the atmospheric composition of Mars primarily made of?",
    options: ["Oxygen and Nitrogen", "Carbon Dioxide (95%)", "Methane and Hydrogen", "Nitrogen and Argon"],
    correct: 1,
    category: "Environment"
  },
  {
    id: 4,
    mission: "MISSION BETA",
    question: "What is the average surface temperature on Mars?",
    options: ["-63°C", "-20°C", "0°C", "-120°C"],
    correct: 0,
    category: "Environment"
  },
  {
    id: 5,
    mission: "MISSION GAMMA",
    question: "Which NASA rover first successfully landed on Mars and returned images?",
    options: ["Curiosity", "Sojourner", "Spirit", "Perseverance"],
    correct: 1,
    category: "History"
  },
  {
    id: 6,
    mission: "MISSION GAMMA",
    question: "What is the name of the largest volcano in the solar system, located on Mars?",
    options: ["Elysium Mons", "Olympus Mons", "Arsia Mons", "Pavonis Mons"],
    correct: 1,
    category: "Geography"
  },
  {
    id: 7,
    mission: "MISSION DELTA",
    question: "Mars has two moons. What are their names?",
    options: ["Io and Europa", "Titan and Triton", "Phobos and Deimos", "Callisto and Ganymede"],
    correct: 2,
    category: "Astronomy"
  },
  {
    id: 8,
    mission: "MISSION DELTA",
    question: "What is the atmospheric pressure on Mars compared to Earth?",
    options: ["About 50% of Earth", "About 0.6% of Earth", "About 10% of Earth", "About 25% of Earth"],
    correct: 1,
    category: "Environment"
  },
  {
    id: 9,
    mission: "MISSION EPSILON",
    question: "What technology is being tested on Mars to produce oxygen from CO2?",
    options: ["MOXIE", "ISRU-X", "OxyGen", "AirSplit"],
    correct: 0,
    category: "Technology"
  },
  {
    id: 10,
    mission: "MISSION EPSILON",
    question: "What is the length of a Martian day (Sol)?",
    options: ["24 hours exactly", "24 hours 37 minutes", "26 hours 14 minutes", "23 hours 56 minutes"],
    correct: 1,
    category: "Astronomy"
  },
  {
    id: 11,
    mission: "MISSION ZETA",
    question: "What caused Mars to lose most of its atmosphere?",
    options: ["Asteroid bombardment", "Loss of magnetic field", "Solar wind erosion", "Both B and C"],
    correct: 3,
    category: "Science"
  },
  {
    id: 12,
    mission: "MISSION ZETA",
    question: "Which canyon on Mars is the largest in the solar system?",
    options: ["Hellas Planitia", "Valles Marineris", "Argyre Planitia", "Arabia Terra"],
    correct: 1,
    category: "Geography"
  },
  {
    id: 13,
    mission: "MISSION ETA",
    question: "What is the gravity on Mars relative to Earth?",
    options: ["38% of Earth's gravity", "52% of Earth's gravity", "62% of Earth's gravity", "25% of Earth's gravity"],
    correct: 0,
    category: "Physics"
  },
  {
    id: 14,
    mission: "MISSION ETA",
    question: "Which mission first achieved powered flight on another planet?",
    options: ["Curiosity Rover", "Ingenuity Helicopter", "Mars Pathfinder", "ExoMars"],
    correct: 1,
    category: "Technology"
  },
  {
    id: 15,
    mission: "MISSION THETA",
    question: "What radiation shield would Mars colonists need most protection from?",
    options: ["Gamma rays from Mars core", "Solar and cosmic radiation", "Infrared heat radiation", "Ultraviolet from sun only"],
    correct: 1,
    category: "Survival"
  },
  {
    id: 16,
    mission: "MISSION THETA",
    question: "How long is a Martian year?",
    options: ["365 Earth days", "426 Earth days", "687 Earth days", "543 Earth days"],
    correct: 2,
    category: "Astronomy"
  },
  {
    id: 17,
    mission: "MISSION IOTA",
    question: "What color is the Martian sky during the day?",
    options: ["Deep blue", "Pinkish-red/butterscotch", "Orange-yellow", "Pale white"],
    correct: 1,
    category: "Environment"
  },
  {
    id: 18,
    mission: "MISSION IOTA",
    question: "Which company announced plans for the first crewed Mars mission by the 2030s?",
    options: ["NASA only", "SpaceX", "Blue Origin", "Both NASA and SpaceX"],
    correct: 3,
    category: "Missions"
  },
  {
    id: 19,
    mission: "MISSION KAPPA",
    question: "What is the main material proposed for building Mars habitats?",
    options: ["Transported steel", "3D-printed Martian regolith", "Inflatable polymer domes", "Excavated ice tunnels"],
    correct: 1,
    category: "Colony"
  },
  {
    id: 20,
    mission: "MISSION KAPPA",
    question: "What potential resource on Mars could be used for rocket fuel production?",
    options: ["Liquid methane from atmosphere", "Water ice and CO2 for methane synthesis", "Hydrogen from surface rocks", "Solar energy stored in batteries"],
    correct: 1,
    category: "Resources"
  }
];
