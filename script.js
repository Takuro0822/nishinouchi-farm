const menuButton = document.querySelector(".menu-button");
const globalNav = document.querySelector(".global-nav");
const dropdownButtons = document.querySelectorAll(".dropdown-button");

if (menuButton && globalNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    globalNav.classList.toggle("is-open", !isOpen);
  });

  globalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      globalNav.classList.remove("is-open");
    });
  });
}

dropdownButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const parent = button.closest(".has-dropdown");
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    parent?.classList.toggle("is-open", !isOpen);
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll("a.is-placeholder").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

const contactForm = document.querySelector(".contact-form");
if (contactForm?.getAttribute("action") === "#") {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    window.alert("現在、お問い合わせフォームは送信先の設定前です。");
  });
}
