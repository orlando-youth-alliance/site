// Applies the stored theme or falls back to OS preference.
// Called on initial load and whenever the OS preference or storage changes.
// (The inline <head> script also calls this logic to avoid flash-of-wrong-theme.)
function applyTheme() {
  var stored = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = stored === 'dark' || (stored === null && prefersDark);
  document.documentElement.classList.toggle('dark', isDark);
}

// Dark mode toggle button
document.getElementById('dark-toggle').addEventListener('click', function () {
  var isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Re-apply when OS preference changes (only takes effect when user hasn't chosen explicitly)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

// Sync across tabs — if the user toggles in another tab, update this one instantly
window.addEventListener('storage', function (e) {
  if (e.key === 'theme') applyTheme();
});

// Mobile menu
var menuBtn = document.getElementById('mobile-menu-btn');
var mobileNav = document.getElementById('mobile-nav');

menuBtn.addEventListener('click', function () {
  var isOpen = mobileNav.classList.toggle('hidden') === false;
  mobileNav.classList.toggle('flex', isOpen);
  menuBtn.setAttribute('aria-expanded', String(isOpen));
});

mobileNav.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    mobileNav.classList.add('hidden');
    mobileNav.classList.remove('flex');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});
