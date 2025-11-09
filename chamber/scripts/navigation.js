document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.getElementById('primary-navigation');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    document.documentElement.classList.toggle('nav-open');
    if (!expanded) {
      const firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.documentElement.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});