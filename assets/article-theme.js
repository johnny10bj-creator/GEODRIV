(() => {
  const root = document.documentElement;
  const button = document.getElementById('themeBtn');
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (button) {
      button.textContent = theme === 'dark' ? '🌙' : '☀️';
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }
  let saved;
  try { saved = localStorage.getItem('geodriv-theme'); } catch {}
  apply(saved === 'light' || saved === 'dark' ? saved : 'dark');
  window.toggleTheme = () => {
    const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(theme);
    try { localStorage.setItem('geodriv-theme', theme); } catch {}
  };
})();
