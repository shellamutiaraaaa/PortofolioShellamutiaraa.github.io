// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Highlight active menu while scrolling
const links = [...navLinks.querySelectorAll("a")];
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("section[id]").forEach(s => observer.observe(s));

// Click image to enlarge
const lightbox = document.querySelector(".lightbox");
const lbImg = lightbox.querySelector("img");
document.querySelectorAll(".zoom").forEach(img => {
  img.addEventListener("click", () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.hidden = false;
  });
});
lightbox.addEventListener("click", () => (lightbox.hidden = true));
document.addEventListener("keydown", e => { if (e.key === "Escape") lightbox.hidden = true; });
