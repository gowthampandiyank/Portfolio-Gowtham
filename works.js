// THEME TOGGLE
(function () {
  const toggle = document.getElementById("theme_toggle");
  const icon = document.getElementById("theme_icon");

  const stored = localStorage.getItem("theme");
  if (stored === "dark") {
    document.body.classList.add("dark-mode");
    icon.className = "fa-solid fa-sun";
  }

  toggle?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  });
})();

// MOBILE MENU
(function () {
  const menu = document.getElementById("mobile_menu");
  document.getElementById("hamburger_btn")?.addEventListener("click", () => {
    menu.classList.add("active");
  });
  document.querySelector(".close_menu")?.addEventListener("click", () => {
    menu.classList.remove("active");
  });
})();

// SEARCH FILTER
(function () {
  const input = document.getElementById("search_input");
  const cards = document.querySelectorAll(".card");

  if (!input) return;

  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();

    cards.forEach((card) => {
      const title = card.querySelector(".card_title")?.textContent.toLowerCase();
      const desc = card.querySelector(".card_desc")?.textContent.toLowerCase();

      card.style.display = title.includes(q) || desc.includes(q)
        ? "inline-block"
        : "none";
    });
  });
})();

// FILTER BUTTON LOGIC
(function () {
  const buttons = document.querySelectorAll(".filter_btn");
  const cards = document.querySelectorAll(".card");

  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      cards.forEach((card) => {
        const category = card.dataset.category;
        card.style.display =
          filter === "all" || filter === category ? "inline-block" : "none";
      });
    });
  });
})();

// MODAL VIEWER
(function () {
  const modal = document.getElementById("project_modal");
  const modalImg = document.getElementById("modal_img");
  const modalTitle = document.getElementById("modal_title");
  const modalDesc = document.getElementById("modal_desc");
  const modalLink = document.getElementById("modal_link");

  document.querySelectorAll(".card").forEach((card) =>
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn")) return;

      modalImg.src = card.querySelector("img").src;
      modalTitle.textContent = card.querySelector(".card_title").textContent;
      modalDesc.textContent = card.querySelector(".card_desc").textContent;
      modalLink.href = card.querySelector(".btn").href;
      modal.style.display = "flex";
    })
  );

  document.querySelector(".modal_close")?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  document.querySelector(".modal_backdrop")?.addEventListener("click", () => {
    modal.style.display = "none";
  });
})();
