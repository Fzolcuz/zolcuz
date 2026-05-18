// theme.js — prevents flash of wrong theme on page load
// Must run before CSS renders — included inline in <head>
(function() {
  const saved = localStorage.getItem('zolcuz-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
})();

// Theme toggle — called when toggle button is clicked
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('zolcuz-theme', next);
    setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 350);
  });
}
