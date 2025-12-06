let backdropEl = null;
let modalEl = null;
let closeBtn = null;
let previouslyFocused = null;

export function initModal(){
  if(backdropEl) return;
  backdropEl = document.createElement('div');
  backdropEl.className = 'modal-backdrop';
  backdropEl.setAttribute('role','dialog');
  backdropEl.setAttribute('aria-hidden','true');
  backdropEl.innerHTML = `<div class="modal" role="document"><div class="modal-header"><h2 id="modal-title"></h2><button class="close-btn" aria-label="Close dialog">&times;</button></div><div class="modal-body" id="modal-body"></div></div>`;
  document.body.appendChild(backdropEl);

  modalEl = backdropEl.querySelector('.modal');
  closeBtn = backdropEl.querySelector('.close-btn');

  closeBtn.addEventListener('click', closeModal);
  backdropEl.addEventListener('click', (e) => {
    if(e.target === backdropEl) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && backdropEl.classList.contains('open')) closeModal();
  });
}

export function openModal(title, htmlContent){
  if(!backdropEl) initModal();
  previouslyFocused = document.activeElement;
  backdropEl.querySelector('#modal-title').textContent = title;
  backdropEl.querySelector('#modal-body').innerHTML = htmlContent;
  backdropEl.classList.add('open');
  backdropEl.setAttribute('aria-hidden','false');
  const focusable = backdropEl.querySelector('button, a, input, select, textarea') || closeBtn;
  if(focusable) focusable.focus();
  document.body.style.overflow = 'hidden';
}

export function closeModal(){
  if(!backdropEl) return;
  backdropEl.classList.remove('open');
  backdropEl.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  if(previouslyFocused) previouslyFocused.focus();
}