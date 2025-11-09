document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentYear');
  const lastModEl = document.getElementById('lastModified');

  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastModEl) lastModEl.textContent = document.lastModified || new Date().toString();
});