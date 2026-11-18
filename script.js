// Shared behaviour for every page: mobile menu, nav shadow and back-to-top button.
// Home-page-only parts (contact highlight) are skipped on other pages.
// Smooth scrolling for in-page links is handled by CSS (scroll-behavior).

const nav = document.querySelector(".nav-container");
const hamburger = document.getElementById("hamburger");
const navBar = document.getElementById("nav-bar");
const backToTop = document.querySelector(".back-to-top");

/* Mobile menu ------------------------------------------------------------ */
function setMenuOpen(open) {
    navBar.classList.toggle("active", open);
    hamburger.setAttribute("aria-expanded", String(open));
}

hamburger.addEventListener("click", () => {
    setMenuOpen(!navBar.classList.contains("active"));
});

// Close the menu after following a link, or on any click outside the nav.
document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) || event.target.closest("#nav-bar a")) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
});

/* Scroll-dependent UI (passive listener, so it never delays scrolling) --- */
function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 50);
    backToTop.classList.toggle("show", window.scrollY > 300);
    document.documentElement.classList.toggle("is-scrolled", window.scrollY > 80);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Home page: highlight the footer email whenever a "#contact" link is clicked.
   (CSS :target can't do this: it also fires on page load and won't replay
   when the same link is clicked twice.) */
const contact = document.getElementById("contact");

if (contact) {
    document.querySelectorAll('a[href="#contact"]').forEach((link) => {
        link.addEventListener("click", () => contact.classList.add("highlight"));
    });
    // Remove the class when the animation ends so the next click replays it.
    contact.addEventListener("animationend", () => contact.classList.remove("highlight"));
}

