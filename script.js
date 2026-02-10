// Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

const yesBtn = document.querySelector(".btn[alt='Yes']");
const noWrapper = document.querySelector(".no-wrapper");
const noBtn = document.querySelector(".no-btn");

const title = document.getElementById("letter-title");
const catNode = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const letterWindow = document.querySelector(".letter-window");

// Click Envelope
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    letterWindow.classList.add("open");
  }, 50);
});

// Helper: move NO somewhere random inside the letter window (safe bounds)
function moveNoRandom() {
  const bounds = letterWindow.getBoundingClientRect();
  const noRect = noWrapper.getBoundingClientRect();

  // Padding so it doesn't go off-screen / behind edges
  const padding = 20;

  const minX = padding;
  const maxX = bounds.width - noRect.width - padding;
  const minY = padding;
  const maxY = bounds.height - noRect.height - padding;

  const x = Math.max(minX, Math.random() * maxX);
  const y = Math.max(minY, Math.random() * maxY);

  // Move relative to the letter window
  noWrapper.style.left = `${x}px`;
  noWrapper.style.top = `${y}px`;
}

// Make sure NO wrapper is absolutely positioned relative to letter window
// (so it can roam anywhere in the window)
noWrapper.style.position = "absolute";
noWrapper.style.zIndex = "5";

// On hover/focus (mouse & mobile-ish)
noBtn.addEventListener("mouseenter", moveNoRandom);
noBtn.addEventListener("mouseover", moveNoRandom);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // stop accidental clicks
  moveNoRandom();
});

// YES is clicked
yesBtn.addEventListener("click", () => {
  title.textContent = "Yippeeee!";

  // If letter-cat is now a DIV (Eevee pair), don't set .src.
  // Just show the celebration via CSS (.letter-window.final).
  letterWindow.classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";
});
