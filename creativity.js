"use strict";

// Arrays
const focuses = [
  "Full Body",
  "Upper Body",
  "Lower Body",
  "Core + Cardio",
  "Mobility",
];
const warmups = [
  "5 min incline walk + dynamic stretching",
  "Jump rope 3 min + hip openers",
  "Row 500m + shoulder circles",
  "Bike 5 min + bodyweight squats",
];
const mains = [
  "3x8 Squat + 3x10 Push-ups + 3x12 Rows",
  "4x6 Deadlift + 3x10 Lunges + 3x30s Plank",
  "3 rounds: 12 KB swings, 10 DB press, 12 goblet squats",
  "EMOM 12 min: 10 burpees (modify as needed)",
];
const finishers = [
  "8 min treadmill intervals (30s fast / 60s easy)",
  "3 rounds: 20 mountain climbers + 10 sit-ups",
  "Farmer carries: 6 x 30 seconds",
  "Stretch + breathing: 6 minutes",
];

// DOM
const focusOut = document.getElementById("focusOut");
const warmupOut = document.getElementById("warmupOut");
const mainOut = document.getElementById("mainOut");
const finisherOut = document.getElementById("finisherOut");

const generateBtn = document.getElementById("generateBtn");
const updateBtn = document.getElementById("updateBtn");
const completedInput = document.getElementById("completed");
const bar = document.getElementById("bar");
const progressMsg = document.getElementById("progressMsg");
const themeToggle = document.getElementById("themeToggle");

document.getElementById("year").textContent = String(new Date().getFullYear());

//  LIMIT WORKOUT GENERATION TO 2 TIMES
const MAX_FREE_GENERATIONS = 2;
let generationCount = 0;

// Functions
function pickRandom(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function generateWorkout() {
  // Stop after 2 generations
  if (generationCount >= MAX_FREE_GENERATIONS) {
    focusOut.textContent = "Locked";
    warmupOut.textContent = "Locked";
    mainOut.textContent =
      "Sign up for our membership to unlock unlimited workout generation";
    finisherOut.textContent = "Locked";
    return;
  }

  // Generate workout
  focusOut.textContent = pickRandom(focuses);
  warmupOut.textContent = pickRandom(warmups);
  mainOut.textContent = pickRandom(mains);
  finisherOut.textContent = pickRandom(finishers);

  generationCount += 1;

  // Change button text when they hit the limit
  if (generationCount >= MAX_FREE_GENERATIONS) {
    generateBtn.textContent = "Unlock Unlimited Workouts";
  }
}

function clamp(num, min, max) {
  return Math.min(max, Math.max(min, num));
}

function updateProgress() {
  const goal = 4;
  const completedRaw = Number(completedInput.value);

  if (Number.isNaN(completedRaw)) {
    progressMsg.textContent = "Enter a number from 0 to 4.";
    bar.style.width = "0%";
    return;
  }

  const completed = clamp(completedRaw, 0, goal);
  completedInput.value = String(completed);

  const pct = Math.round((completed / goal) * 100);
  bar.style.width = `${pct}%`;

  switch (completed) {
    case 0:
      progressMsg.textContent = `${pct}% complete — start with a quick 20-minute session.`;
      break;
    case 4:
      progressMsg.textContent = `${pct}% complete — Let’s go! You did great, crushing your goal. Keep the streak going!`;
      break;
    default:
      progressMsg.textContent = `${pct}% complete — nice work, keep going.`;
  }
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

// Event handling
generateBtn.addEventListener("click", generateWorkout);
updateBtn.addEventListener("click", updateProgress);
themeToggle.addEventListener("click", toggleTheme);

// Give the user a default workout on load
generateWorkout();
updateProgress();
