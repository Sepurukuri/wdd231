document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isExpanded = navLinks.classList.contains('open');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }

    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    const skip = document.querySelector('.skip-link');
    if (skip) {
        skip.addEventListener('click', () => {
            const main = document.querySelector('main');
            if (main) main.focus();
        });
    }
});