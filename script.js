const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const clickStatus = document.querySelector(".click-status");
let statusTimer;

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".agent-action, .site-nav a, .project-card, .skill-card").forEach((target) => {
  target.addEventListener("click", () => {
    const message = target.dataset.agentMessage || "processing request";
    clickStatus.textContent = `${message} ... connected`;
    clickStatus.classList.add("show");
    target.classList.add("processing");
    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(() => {
      clickStatus.classList.remove("show");
      target.classList.remove("processing");
    }, 1400);
  });
});

const revealTargets = document.querySelectorAll(
  ".section-heading, .intro-grid, .skill-card, .project-card, .timeline-item, .credentials-section, .contact-inner, .terminal-card"
  + ", .vision-inner, .vision-grid article, .goal-panel"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-30% 0px -55% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));
