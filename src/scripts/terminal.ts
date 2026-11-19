export {};

const navigation = document.querySelectorAll<HTMLAnchorElement>(
  ".terminal-bar nav a",
);
const sections = Array.from(navigation, (link) =>
  document.querySelector<HTMLElement>(link.hash),
).filter((section): section is HTMLElement => section !== null);

function updateLocation() {
  const page = document.documentElement;
  const atEnd =
    window.scrollY > 0 &&
    page.scrollHeight - window.scrollY - window.innerHeight <= 2;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.35)
      current = section;
  }
  if (atEnd) current = sections[sections.length - 1];
  for (const link of navigation) {
    if (link.hash === `#${current?.id}`)
      link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}

const revealed = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      revealed.unobserve(entry.target);
    }
  },
  { rootMargin: "0px 0px -12% 0px" },
);
for (const block of document.querySelectorAll("[data-reveal]")) {
  revealed.observe(block);
}

let scrollPending = false;
window.addEventListener(
  "scroll",
  () => {
    if (scrollPending) return;
    scrollPending = true;
    window.requestAnimationFrame(() => {
      updateLocation();
      scrollPending = false;
    });
  },
  { passive: true },
);
window.addEventListener("resize", updateLocation);

updateLocation();
