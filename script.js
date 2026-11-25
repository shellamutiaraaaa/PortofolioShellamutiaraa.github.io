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
