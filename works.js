// THEME TOGGLE (Light default → Dark → Light)
(function () {
  const toggleBtn = document.getElementById("theme_toggle");
  const icon = document.getElementById("theme_icon");
  if (!toggleBtn || !icon) return;

  const stored = localStorage.getItem("theme");
  if (stored === "dark") {
    document.body.classList.add("dark-mode");
    icon.className = "fa-solid fa-sun"; // show sun in dark mode
  } else {
    icon.className = "fa-solid fa-moon"; // show moon in light mode
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

// mobile_nav toggle
(function () {
  const toggleBtn = document.getElementById("mobile_nav_theme_toggle");
  const icon = document.getElementById("theme_icon");
  if (!toggleBtn || !icon) return;

  const stored = localStorage.getItem("theme");
  if (stored === "dark") {
    document.body.classList.add("dark-mode");
    icon.className = "fa-solid fa-sun"; // show sun in dark mode
  } else {
    icon.className = "fa-solid fa-moon"; // show moon in light mode
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

// SCROLL REVEAL FOR CARDS
(function () {
  const section = document.querySelector(".masonry");
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("active");
          observer.unobserve(section);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(section);
})();

// FILTER BY CATEGORY
(function () {
  const filterBtns = document.querySelectorAll(".mobile_nav_filter_btn");
  const cards = document.querySelectorAll(".card");
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // filter cards
      cards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        if (filter === "all" || category.includes(filter)) {
          card.style.display = "inline-block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
})();

// SEARCH FILTER
(function () {
  const input = document.getElementById("search_input");
  const cards = document.querySelectorAll(".card");
  if (!input || !cards.length) return;

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();

    cards.forEach((card) => {
      const title =
        card.querySelector(".card_title")?.textContent.toLowerCase() || "";
      const desc =
        card.querySelector(".card_desc")?.textContent.toLowerCase() || "";

      if (title.includes(query) || desc.includes(query)) {
        card.style.display = "inline-block";
      } else {
        card.style.display = "none";
      }
    });
  });
})();

// MODAL PREVIEW
(function () {
  const cards = document.querySelectorAll(".card");
  const modal = document.getElementById("project_modal");
  const modalImg = document.getElementById("modal_img");
  const modalTitle = document.getElementById("modal_title");
  const modalDesc = document.getElementById("modal_desc");
  const modalLink = document.getElementById("modal_link");
  const closeBtn = document.querySelector(".modal_close");
  const backdrop = document.querySelector(".modal_backdrop");

  if (!cards.length || !modal) return;

  function openModal(card) {
    const img = card.querySelector("img");
    const title = card.querySelector(".card_title");
    const desc = card.querySelector(".card_desc");
    const btn = card.querySelector(".btn");

    modalImg.src = img?.src || "";
    modalImg.alt = img?.alt || "Project preview";
    modalTitle.textContent = title?.textContent || "";
    modalDesc.textContent = desc?.textContent || "";
    modalLink.href = btn?.href || "#";
    modalLink.style.display = btn?.href ? "inline-flex" : "none";

    modal.style.display = "flex";
    document.body.style.overflowY = "hidden";
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflowY = "auto";
  }

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // let "View" button open link directly
      if (e.target.closest(".btn")) return;
      openModal(card);
    });
  });

  closeBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });
})();
