// THEME TOGGLE (Light default → Dark → Light)
(function () {
  const toggleBtn = document.getElementById("theme_toggle");
  const icon = document.getElementById("theme_icon");
  if (!toggleBtn || !icon) return;

  const stored = localStorage.getItem("theme");
  if (stored === "dark") {
    document.body.classList.add("dark-mode");
    icon.className = "fa-solid fa-sun";
  } else {
    icon.className = "fa-solid fa-moon";
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    if (isDark) {
      localStorage.setItem("theme", "dark");
      icon.className = "fa-solid fa-sun";
    } else {
      localStorage.removeItem("theme");
      icon.className = "fa-solid fa-moon";
    }
  });
})();

// MOBILE NAV
(function () {
  const menuBtn = document.getElementById("menu_btn");
  const mobileNav = document.getElementById("mobile_nav");
  const links = document.querySelectorAll(".mobile_link, .mobile_resume");
  if (!menuBtn || !mobileNav) return;

  let open = false;

  const toggleNav = () => {
    open = !open;
    mobileNav.style.display = open ? "block" : "none";
    document.body.style.overflowY = open ? "hidden" : "auto";
    menuBtn.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  };

  menuBtn.addEventListener("click", toggleNav);
  links.forEach((l) =>
    l.addEventListener("click", () => {
      if (!open) return;
      toggleNav();
    })
  );
})();

// TYPING ANIMATION ON NAME
(function () {
  const nameSpan = document.getElementById("typed_name");
  const cursorSpan = document.getElementById("typed_cursor");
  if (!nameSpan || !cursorSpan) return;

  const text = "Gowtham Pandiyan";
  const typingDelay = 80;
  const erasingDelay = 50;
  const pauseDelay = 1200;
  let index = 0;
  let typing = true;

  function type() {
    if (typing && index <= text.length) {
      nameSpan.textContent = text.substring(0, index);
      index++;
      setTimeout(type, typingDelay);
    } else {
      typing = false;
      setTimeout(erase, pauseDelay);
    }
  }

  function erase() {
    if (!typing && index >= 0) {
      nameSpan.textContent = text.substring(0, index);
      index--;
      setTimeout(erase, erasingDelay);
    } else {
      typing = true;
      setTimeout(type, 500);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 700);
  });
})();

// SCROLL REVEAL
(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
})();
