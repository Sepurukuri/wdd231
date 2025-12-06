import { fetchJSON } from './utils.js';
import { openModal } from './modal.js';
import { saveToLocal } from './storage.js';

const EVENTS_JSON = 'data/events.json';
const eventsContainer = document.getElementById('events-container') || document.getElementById('events-list') || document.getElementById('events-schedule');

async function renderEvents(){
  if(!eventsContainer) return;
  const data = await fetchJSON(EVENTS_JSON);
  if(!data || !Array.isArray(data.events)){
    eventsContainer.innerHTML = '<p class="notice">No upcoming events at the moment.</p>';
    return;
  }

  saveToLocal('sba_events', data.events);

  eventsContainer.innerHTML = '';
  data.events.forEach(ev => {
    const el = document.createElement('article');
    el.className = 'event-card';
    el.innerHTML = `
      <h3>${ev.title}</h3>
      <p class="meta">${ev.date} • ${ev.time || ''}</p>
      <p class="small">${ev.location}</p>
      <p>${ev.description}</p>
      <p style="margin-top:.6rem;"><button class="btn-event-details" data-id="${ev.id}">More details</button></p>
    `;
    eventsContainer.appendChild(el);
  });
}

document.body.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-event-details');
  if(!btn) return;
  const id = btn.dataset.id;
  const events = JSON.parse(localStorage.getItem('sba_events') || '[]');
  const ev = events.find(x => String(x.id) === String(id));
  if(ev){
    openModal(ev.title, `<p><strong>Date:</strong> ${ev.date} ${ev.time ? '• ' + ev.time : ''}</p><p><strong>Location:</strong> ${ev.location}</p><p>${ev.description}</p>`);
  }
});

renderEvents();