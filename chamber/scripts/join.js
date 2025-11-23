document.addEventListener('DOMContentLoaded', () => {
  const ts = document.getElementById('timestamp');
  if (ts) {
    const now = new Date();
    ts.value = now.toISOString();
  }

  const moreLinks = document.querySelectorAll('.more-info');
  moreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const dialogId = link.getAttribute('data-dialog');
      const dlg = document.getElementById(dialogId);
      if (dlg && typeof dlg.showModal === 'function') {
        dlg.showModal();
        const closeBtn = dlg.querySelector('.dialog-close');
        if (closeBtn) closeBtn.focus();
      } else if (dlg) {
        dlg.setAttribute('open','');
      }
    });
  });

  const dialogs = document.querySelectorAll('dialog');
  dialogs.forEach(dlg => {
    const closeBtn = dlg.querySelector('.dialog-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => { dlg.close(); });
    }
    dlg.addEventListener('cancel', (e) => {
    });
  });

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const link = card.querySelector('.more-info');
        if (link) { link.click(); e.preventDefault(); }
      }
    });
  });

  const orgTitle = document.getElementById('orgTitle');
  if (orgTitle) {
    orgTitle.addEventListener('invalid', (e) => {
      orgTitle.setCustomValidity('Enter at least 7 letters (letters, hyphens and spaces only).');
    });
    orgTitle.addEventListener('input', () => {
      orgTitle.setCustomValidity('');
    });
  }
});