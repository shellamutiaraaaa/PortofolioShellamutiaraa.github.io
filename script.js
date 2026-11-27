// Navbar background on scroll
const navWrap = document.querySelector(".nav-wrap");
const onScroll = () => navWrap.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll); onScroll();

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Active menu while scrolling
const links = [...navLinks.querySelectorAll("a")];
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => sectionObs.observe(s));

// Fade-in on scroll
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

// Stagger: children appear one after another
document.querySelectorAll(".stagger").forEach(group => {
  [...group.children].forEach((el, i) => el.style.setProperty("--i", i % 3));
});

// Scroll progress bar + timeline line that grows while scrolling
const bar = document.querySelector(".progress");
const timeline = document.querySelector(".timeline");
const onProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  const r = timeline.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
  timeline.style.setProperty("--line", p);
};
window.addEventListener("scroll", onProgress, { passive: true }); onProgress();

// Experience filter
document.querySelectorAll(".filter button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.f;
    document.querySelectorAll(".timeline .item").forEach(item => {
      item.classList.toggle("hide", f !== "all" && item.dataset.type !== f);
      item.classList.add("in");
    });
  });
});

// Click image to enlarge
const lightbox = document.querySelector(".lightbox");
const lbImg = lightbox.querySelector("img");
document.querySelectorAll(".zoom").forEach(img => img.addEventListener("click", () => {
  lbImg.src = img.src; lbImg.alt = img.alt; lightbox.hidden = false;
}));
lightbox.addEventListener("click", () => (lightbox.hidden = true));
document.addEventListener("keydown", e => { if (e.key === "Escape") lightbox.hidden = true; });

// Little Lemon code viewer
const codeModal = document.querySelector(".code-modal");
if (codeModal && typeof LITTLE_LEMON_CODE !== "undefined") {
  const codeEl = codeModal.querySelector("code");
  const langOf = f => f.endsWith(".css") ? "css" : f.endsWith(".js") ? "javascript" : "markup";
  let current = "index.html";
  const show = file => {
    current = file;
    codeEl.className = "language-" + langOf(file);
    codeEl.textContent = LITTLE_LEMON_CODE[file];
    if (window.Prism) Prism.highlightElement(codeEl);
    codeModal.querySelectorAll("[data-file]").forEach(b => b.classList.toggle("active", b.dataset.file === file));
  };
  document.querySelectorAll("[data-code-open]").forEach(b => b.addEventListener("click", () => { show("index.html"); codeModal.hidden = false; }));
  codeModal.querySelectorAll("[data-file]").forEach(b => b.addEventListener("click", () => show(b.dataset.file)));
  const close = () => (codeModal.hidden = true);
  codeModal.querySelector(".code-close").addEventListener("click", close);
  codeModal.addEventListener("click", e => { if (e.target === codeModal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  const copyBtn = codeModal.querySelector(".copy-btn");
  copyBtn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(LITTLE_LEMON_CODE[current]); copyBtn.textContent = "Copied!"; }
    catch { copyBtn.textContent = "Copy failed"; }
    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
  });
}
