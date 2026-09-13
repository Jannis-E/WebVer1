// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// Custom glowing cursor
const cursorGlow = document.getElementById("cursorGlow");
const isTouchDevice = window.matchMedia("(hover: none)").matches;

if (!isTouchDevice) {
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animateCursor() {
    glowX += (mouseX - glowX) * 0.18;
    glowY += (mouseY - glowY) * 0.18;
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursorGlow.classList.add("cursor-active"));
    el.addEventListener("mouseleave", () => cursorGlow.classList.remove("cursor-active"));
  });
}

// Scroll-reveal via Intersection Observer, staggered within each parent group
const revealEls = document.querySelectorAll(".reveal");
const staggerCounters = new WeakMap();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        const count = staggerCounters.get(parent) || 0;
        staggerCounters.set(parent, count + 1);

        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, count * 90);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);

revealEls.forEach((el) => revealObserver.observe(el));

// Header background intensifies slightly on scroll
const siteHeader = document.getElementById("siteHeader");

function updateHeader() {
  siteHeader.style.background = window.scrollY > 40
    ? "rgba(10, 10, 10, 0.82)"
    : "rgba(10, 10, 10, 0.6)";
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
