"use strict";

/**
 Registration page for Plus Ultra Fitness
 */

const membershipTypes = ["Basic", "Plus", "Elite", "Student", "Family"];

const yearEl = document.getElementById("year");
yearEl.textContent = String(new Date().getFullYear());

const form = document.getElementById("regForm");
const resultBox = document.getElementById("resultBox");
const resetBtn = document.getElementById("resetBtn");

// Populate membership types (array + DOM)
const membershipSelect = document.getElementById("membershipType");
for (let i = 0; i < membershipTypes.length; i++) {
  const option = document.createElement("option");
  option.value = membershipTypes[i].toLowerCase();
  option.textContent = membershipTypes[i];
  membershipSelect.appendChild(option);
}

// Helpers
function setResult(message, isSuccess) {
  resultBox.style.display = "block";
  resultBox.textContent = message;

  // a tiny "selection statement" style touch
  if (isSuccess) {
    resultBox.style.borderColor = "rgba(110, 231, 255, 0.55)";
  } else {
    resultBox.style.borderColor = "rgba(255, 107, 107, 0.55)";
  }
}

function showError(errId, message) {
  const el = document.getElementById(errId);
  el.textContent = message;
}

function clearErrors() {
  const errorIds = [
    "errFullName",
    "errEmail",
    "errPhone",
    "errAge",
    "errMembership",
    "errStartDate",
    "errEmergency",
    "errExperience",
    "errGoals",
  ];

  // loop ✅
  for (let i = 0; i < errorIds.length; i++) {
    document.getElementById(errorIds[i]).textContent = "";
  }
}

function isValidEmail(email) {
  // Basic email pattern
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

function isValidPhone(phone) {
  // Accepts: 555-123-4567 OR (555) 123-4567 OR 5551234567
  const re = /^(\(\d{3}\)\s?|\d{3}[-\s]?)\d{3}[-\s]?\d{4}$/;
  return re.test(phone.trim());
}

function validateAge(ageValue) {
  const age = Number(ageValue);
  if (Number.isNaN(age)) return { ok: false, msg: "Age must be a number." };
  if (age < 13 || age > 90)
    return { ok: false, msg: "Age must be between 13 and 90." };
  return { ok: true, msg: "" };
}

function validateRequired(value) {
  return value.trim().length > 0;
}

function validateForm() {
  clearErrors();

  // Variables ✅
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const age = document.getElementById("age").value;
  const membershipType = document.getElementById("membershipType").value;
  const startDate = document.getElementById("startDate").value;
  const emergencyContact = document.getElementById("emergencyContact").value;
  const experience = document.getElementById("experience").value;
  const goals = document.getElementById("goals").value;

  // Store field checks in an array ✅
  const requiredChecks = [
    { value: fullName, errId: "errFullName", msg: "Full name is required." },
    { value: email, errId: "errEmail", msg: "Email is required." },
    { value: phone, errId: "errPhone", msg: "Phone number is required." },
    { value: age, errId: "errAge", msg: "Age is required." },
    {
      value: membershipType,
      errId: "errMembership",
      msg: "Select a membership type.",
    },
    { value: startDate, errId: "errStartDate", msg: "Select a start date." },
    {
      value: emergencyContact,
      errId: "errEmergency",
      msg: "Emergency contact is required.",
    },
    {
      value: experience,
      errId: "errExperience",
      msg: "Select your experience level.",
    },
    { value: goals, errId: "errGoals", msg: "Fitness goals are required." },
  ];

  let isValid = true;

  // Loop over required fields ✅
  for (let i = 0; i < requiredChecks.length; i++) {
    if (!validateRequired(requiredChecks[i].value)) {
      showError(requiredChecks[i].errId, requiredChecks[i].msg);
      isValid = false;
    }
  }

  // More checks (selection statements ✅)
  if (validateRequired(email) && !isValidEmail(email)) {
    showError("errEmail", "Enter a valid email (example: name@email.com).");
    isValid = false;
  }

  if (validateRequired(phone) && !isValidPhone(phone)) {
    showError("errPhone", "Enter a valid phone (347-123-4567).");
    isValid = false;
  }

  const ageCheck = validateAge(age);
  if (validateRequired(age) && !ageCheck.ok) {
    showError("errAge", ageCheck.msg);
    isValid = false;
  }

  // Switch statement example ✅ (helpful extra validation)
  switch (experience) {
    case "":
      // already covered by required
      break;
    case "beginner":
    case "intermediate":
    case "advanced":
      // ok
      break;
    default:
      showError("errExperience", "Invalid experience selection.");
      isValid = false;
  }

  // Simple future-date check for start date
  if (validateRequired(startDate)) {
    const chosen = new Date(startDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen < today) {
      showError("errStartDate", "Start date cannot be in the past.");
      isValid = false;
    }
  }

  return {
    isValid,
    data: {
      fullName,
      email,
      phone,
      age,
      membershipType,
      startDate,
      emergencyContact,
      experience,
      goals,
    },
  };
}

// Events ✅
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const { isValid, data } = validateForm();

  if (!isValid) {
    setResult("Please fix the highlighted errors and submit again.", false);
    return;
  }

  // If valid, show a confirmation (demo only; not sending anywhere)
  setResult(
    `Success! Thanks, ${
      data.fullName
    }. Welcome to Plus Ultra Fitness — your ${data.membershipType.toUpperCase()} membership request is ready.`,
    true
  );

  // Optional: reset the form after success
  // form.reset();
});

resetBtn.addEventListener("click", () => {
  form.reset();
  clearErrors();
  resultBox.style.display = "none";
});
