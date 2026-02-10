// Elements
const envelope = document.getElementById("envelope-container");
const letterContainer = document.getElementById("letter-container");
const letterWindow = document.getElementById("letterWindow");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noSlot = document.getElementById("noSlot");

const finalText = document.getElementById("final-text");

// Open letter
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letterContainer.style.display = "flex";

  // Let layout paint first
  setTimeout(() => letterWindow.classList.add("open"), 50);

  // Reserve NO button space so layout won't shift later
  reserveNoSpace();
});

function reserveNoSpace() {
  // lock the slot to NO's size so YES stays in place even when NO becomes fixed
  const w = noBtn.offsetWidth;
  const h = noBtn.offsetHeight;
  noSlot.style.width = `${w}px`;
  noSlot.style.height = `${h}px`;
}

// Move NO anywhere on screen (true viewport randomness)
let lastX = -9999;
let lastY = -9999;

function moveNo() {
  const padding = 20;

  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  const maxX = window.innerWidth - btnW - padding;
  const maxY = window.innerHeight - btnH - padding;

  let x, y;

  // avoid tiny hops near the last location
  do {
    x = Math.random() * maxX + padding;
    y = Math.random() * maxY + padding;
  } while (Math.abs(x - lastX) < 140 && Math.abs(y - lastY) < 140);

  lastX = x;
  lastY = y;

  // IMPORTANT: fixed = not trapped by any container
  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.zIndex = "9999";
}

// Keep them side-by-side at first (no suspicion),
// then NO teleports away when she approaches.
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("click", moveNo);
noBtn.addEventListener("touchstart", moveNo);

// YES -> final screen
yesBtn.addEventListener("click", () => {
  letterWindow.classList.add("final");
  finalText.style.display = "block";
});

// Keep slot reserved on resize too
window.addEventListener("resize", () => {
  reserveNoSpace();
});
