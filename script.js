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

let angle = 0;
const RADIUS = 400;           // size of the circle
const ANGLE_STEP = Math.PI / 3; // how far it moves each hover

function teleportNo() {
  const windowEl = document.querySelector(".letter-window");
  if (!windowEl) return;

  const windowRect = windowEl.getBoundingClientRect();

  // IMPORTANT: clear any old transform behavior so we don't orbit around the first jump
  noBtn.style.transform = "none";

  // Make sure it has a measurable size (use offsetWidth/Height for stability)
  const noW = noBtn.offsetWidth;
  const noH = noBtn.offsetHeight;

  // Center of the letter window (this is the ONLY anchor)
  const centerX = 170;
  const centerY = 80;

  angle += ANGLE_STEP;

  let x = centerX + Math.cos(angle) * RADIUS - noW / 2;
  let y = centerY + Math.sin(angle) * RADIUS - noH / 2;

  // Clamp so it stays on screen
  const pad = 10;
  x = Math.max(pad, Math.min(x, window.innerWidth - noW - pad));
  y = Math.max(pad, Math.min(y, window.innerHeight - noH - pad));

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

  hurrayImg.classList.remove("jump");
  void hurrayImg.offsetWidth;
  hurrayImg.classList.add("jump");

  setTimeout(() => {
    hurrayImg.classList.remove("jump");
  }, 5000);

  // Bottom slot swap: buttons -> date idea
  buttonGroup.style.display = "none";
  dateText.style.display = "block";
});
