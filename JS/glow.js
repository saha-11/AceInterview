const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "350px";
glow.style.height = "350px";
glow.style.background = "rgba(201,169,106,0.15)";
glow.style.borderRadius = "50%";
glow.style.filter = "blur(80px)";
glow.style.pointerEvents = "none";
glow.style.zIndex = "9999";
glow.style.transition = "transform 0.12s ease-out, opacity 0.15s ease-out";
glow.style.opacity = "0.95";

const clickGlow = document.createElement("div");
clickGlow.style.position = "fixed";
clickGlow.style.width = "120px";
clickGlow.style.height = "120px";
clickGlow.style.background = "rgba(255, 240, 190, 0.4)";
clickGlow.style.borderRadius = "50%";
clickGlow.style.filter = "blur(28px)";
clickGlow.style.pointerEvents = "none";
clickGlow.style.zIndex = "9999";
clickGlow.style.opacity = "0";
clickGlow.style.transition = "opacity 0.3s ease, transform 0.3s ease";

const container = document.body || document.documentElement;
container.appendChild(glow);
container.appendChild(clickGlow);

document.addEventListener("mousemove", event => {
  glow.style.left = `${event.clientX - 175}px`;
  glow.style.top = `${event.clientY - 175}px`;
});

document.addEventListener("mousedown", event => {
  clickGlow.style.left = `${event.clientX - 60}px`;
  clickGlow.style.top = `${event.clientY - 60}px`;
  clickGlow.style.opacity = "1";
  clickGlow.style.transform = "scale(1)";
  window.requestAnimationFrame(() => {
    clickGlow.style.opacity = "0";
    clickGlow.style.transform = "scale(1.6)";
  });
});

// Keep glow visible when the page is active.
document.addEventListener("mouseleave", () => {
  glow.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
  glow.style.opacity = "0.95";
});
