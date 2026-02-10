// ===== Elements =====
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const letterWindow = document.getElementById("letter-window");

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

const buttonsArea = document.getElementById("letter-buttons");
const finalArea = document.getElementById("final");

// ===== Open envelope -> show letter =====
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  // Reset "No" movement each open
  noBtn.dataset.t = "0,0";
  noBtn.style.transform = "translateX(-50%) translate(0px, 0px)";

  // Reset Yes size
  yesBtn.dataset.m = "1";
  yesBtn.style.transform = "translateX(-50%) scale(1)";

  // Animate letter opening
  setTimeout(() => letterWindow.classList.add("open"), 50);
});

// ===== Move "No" inside letter bounds =====
function moveNoButton() {
  const bounds = letterWindow.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const padding = 12;

  const minX = bounds.left + padding;
  const maxX = bounds.right - btn.width - padding;
  const minY = bounds.top + padding;
  const maxY = bounds.bottom - btn.height - padding;

  if (maxX <= minX || maxY <= minY) return;

  // Random target (viewport coords)
  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  const current = noBtn.getBoundingClientRect();

  // Delta needed to move to target
  const dx = x - current.left;
  const dy = y - current.top;

  // Keep accumulating translation so it "stays where it ran to"
  const prev = (noBtn.dataset.t || "0,0").split(",").map(Number);
  const nx = prev[0] + dx;
  const ny = prev[1] + dy;

  noBtn.dataset.t = `${nx},${ny}`;
  noBtn.style.transform = `translateX(-50%) translate(${nx}px, ${ny}px)`;
}

// Move on hover
noBtn.addEventListener("mouseover", moveNoButton);

// Move on click + grow YES quickly
noBtn.addEventListener("click", () => {
  moveNoButton();

  const currentScale = yesBtn.dataset.m ? Number(yesBtn.dataset.m) : 1;
  const nextScale = Math.min(currentScale + 0.14, 2.2); // faster growth
  yesBtn.dataset.m = String(nextScale);

  yesBtn.style.transform = `translateX(-50%) scale(${nextScale})`;
});

// ===== YES clicked -> show final =====
yesBtn.addEventListener("click", () => {
  buttonsArea.style.display = "none";
  finalArea.style.display = "grid";
});

// ===== Safety: on resize, reset No so it can't end up outside =====
window.addEventListener("resize", () => {
  noBtn.dataset.t = "0,0";
  noBtn.style.transform = "translateX(-50%) translate(0px, 0px)";
});
