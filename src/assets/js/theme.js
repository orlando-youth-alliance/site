// Runs immediately in <head> to prevent flash of wrong theme.
(function () {
  var stored = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (stored === "dark" || (stored === null && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();

document.addEventListener("DOMContentLoaded", function () {

  // --- Theme helpers ---

  function getStored() {
    return localStorage.getItem("theme"); // "light" | "dark" | null (system)
  }

  function applyTheme(stored) {
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = stored === "dark" || (stored === null && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
    showIcon(stored === null ? "system" : stored);
  }

  function showIcon(name) {
    ["system", "dark", "light"].forEach(function (id) {
      var el = document.getElementById("icon-" + id);
      if (el) el.classList.toggle("hidden", id !== name);
    });
  }

  // --- Toggle cycles: system → dark → light → system ---

  document.getElementById("dark-toggle").addEventListener("click", function () {
    var stored = getStored();
    var next = stored === null ? "dark" : stored === "dark" ? "light" : null;
    if (next === null) {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", next);
    }
    applyTheme(next);
  });

  // --- Sync with OS preference changes (only when in system mode) ---

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    applyTheme(getStored());
  });

  // --- Sync across tabs ---

  window.addEventListener("storage", function (e) {
    if (e.key === "theme") applyTheme(e.newValue);
  });

  // --- Set initial icon ---

  applyTheme(getStored());

  // --- Mobile nav ---

  var menuBtn = document.getElementById("mobile-menu-btn");
  var mobileNav = document.getElementById("mobile-nav");
  menuBtn.addEventListener("click", function () {
    var isOpen = mobileNav.classList.toggle("hidden") === false;
    mobileNav.classList.toggle("flex", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileNav.classList.add("hidden");
      mobileNav.classList.remove("flex");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // --- Disable drag on linked images ---

  document.querySelectorAll("a img").forEach(function (img) {
    img.draggable = false;
  });
});
