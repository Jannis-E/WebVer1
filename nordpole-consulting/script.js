// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// Subtle parallax on hero background
const heroBg = document.getElementById("heroBg");

function updateParallax() {
  const offset = window.scrollY * 0.35;
  heroBg.style.transform = `translateY(${offset}px)`;
}

window.addEventListener("scroll", updateParallax, { passive: true });
updateParallax();

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

// Newsletter form (front-end only, no backend)
const newsletterForm = document.getElementById("newsletterForm");
const newsletterStatus = document.getElementById("newsletterStatus");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterStatus.textContent = "Thank you — you're on the list.";
  newsletterForm.reset();
});
