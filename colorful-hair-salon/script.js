// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// Custom cursor that follows the mouse and picks up color from hovered elements
const cursorDot = document.getElementById("cursorDot");
const isTouchDevice = window.matchMedia("(hover: none)").matches;

if (!isTouchDevice) {
  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animateCursor() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll("[data-cursor]").forEach((el) => {
    const color = el.getAttribute("data-cursor");
    el.addEventListener("mouseenter", () => {
      cursorDot.classList.add("cursor-active", `cursor-${color}`);
    });
    el.addEventListener("mouseleave", () => {
      cursorDot.classList.remove("cursor-active", `cursor-${color}`);
    });
  });
}

// Scroll-reveal via Intersection Observer
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);

revealEls.forEach((el) => revealObserver.observe(el));
