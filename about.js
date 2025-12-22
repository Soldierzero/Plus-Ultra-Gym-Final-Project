"use strict";

// Variables, arrays, DOM manipulation, event handling
const team = [
  "Coach Maya — Strength & Mobility",
  "Coach Jordan — HIIT & Conditioning",
  "Coach Sam — Personal Training",
];

const meetBtn = document.getElementById("meetBtn");
const meetMsg = document.getElementById("meetMsg");
const yearEl = document.getElementById("year");

// Set footer year
yearEl.textContent = String(new Date().getFullYear());

// Show team members with a loop
function showTeam() {
  let output = "Today’s coaches:\n";
  for (let i = 0; i < team.length; i++) {
    output += `• ${team[i]}\n`;
  }
  meetMsg.textContent = output;
}

meetBtn.addEventListener("click", showTeam);
