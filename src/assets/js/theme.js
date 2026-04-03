(function() {
  var stored = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (stored === null && prefersDark)) {
    document.documentElement.classList.add('dark');
  }
})();

document.addEventListener('DOMContentLoaded', function() {
  function applyTheme() {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', stored === 'dark' || (stored === null && prefersDark));
  }

  document.getElementById('dark-toggle').addEventListener('click', function() {
    var isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
  window.addEventListener('storage', function(e) { if (e.key === 'theme') applyTheme(); });

  var menuBtn = document.getElementById('mobile-menu-btn');
  var mobileNav = document.getElementById('mobile-nav');
  menuBtn.addEventListener('click', function() {
    var isOpen = mobileNav.classList.toggle('hidden') === false;
    mobileNav.classList.toggle('flex', isOpen);
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
  mobileNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileNav.classList.add('hidden');
      mobileNav.classList.remove('flex');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
});
