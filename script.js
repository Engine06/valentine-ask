// --------------------
// Elements
// --------------------
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

// Buttons
const noBtn = document.querySelector(".no-hitbox");
const yesBtn = document.querySelector(".yes-hitbox");

// Swappable UI parts (NEW IDs from your cleaned HTML)
const titleText = document.getElementById("title-text");
const pokemonPair = document.getElementById("pokemon-pair");
const hurrayImg = document.getElementById("hurray-img");
const buttonGroup = document.getElementById("button-group");
const dateText = document.getElementById("date-text");

// Text variables (easy to edit)
const QUESTION_TEXT = "Will you be my Valentine?";
const YES_TEXT = "Yippeeee!";

let mouseArmed = false;

// --------------------
// Open Envelope
// --------------------
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");

    // Reset state in case page is reopened
    titleText.textContent = QUESTION_TEXT;

    pokemonPair.style.display = "flex";
    hurrayImg.style.display = "none";

    buttonGroup.style.display = "flex";
    dateText.style.display = "none";

    // Prevent instant NO teleport if mouse is already there
    mouseArmed = false;
    document.addEventListener(
      "mousemove",
      () => {
        mouseArmed = true;
      },
      { once: true }
    );
  }, 50);
});

// --------------------
// NO teleport
// --------------------
function teleportNo() {
  const windowEl = document.querySelector(".letter-window");
  if (!windowEl) return;

  const windowRect = windowEl.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  // Center of the letter window
  const centerX = windowRect.left + windowRect.width / 2;
  const centerY = windowRect.top + windowRect.height / 2;

  // Random offset within ±100px
  const RANGE = 100;
  const offsetX = (Math.random() * 2 - 1) * RANGE; // -100 → +100
  const offsetY = (Math.random() * 2 - 1) * RANGE; // -100 → +100

  // Place NO so its center lands on (center + offset)
  let x = centerX + offsetX - noRect.width / 2;
  let y = centerY + offsetY - noRect.height / 2;

  // Clamp so it stays on screen
  const pad = 10;
  x = Math.max(pad, Math.min(x, window.innerWidth - noRect.width - pad));
  y = Math.max(pad, Math.min(y, window.innerHeight - noRect.height - pad));

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}





// Move NO when she tries to hover it
noBtn.addEventListener("pointerenter", () => {
  if (!mouseArmed) return;
  teleportNo();
});

// --------------------
// YES clicked (swap state)
// --------------------
yesBtn.addEventListener("click", () => {
  titleText.textContent = YES_TEXT;

  // Center slot swap: pair -> hurray
  pokemonPair.style.display = "none";
  hurrayImg.style.display = "block";

  // Bottom slot swap: buttons -> date idea
  buttonGroup.style.display = "none";
  dateText.style.display = "block";
});
