import { fetchJSON, formatDate } from "./utils.js";
import { openModal } from "./modal.js";

const EVENTS_JSON = "data/events.json";
const eventsContainer = document.getElementById("events-list");
const form = document.getElementById("registration-form");

async function loadEvents() {
  const data = await fetchJSON(EVENTS_JSON);

  if (!data || !Array.isArray(data.events)) {
    eventsContainer.innerHTML = `<p class="notice">Events unavailable.</p>`;
    return;
  }

  renderEvents(data.events);
}

function renderEvents(events) {
  eventsContainer.innerHTML = "";

  events.forEach((ev) => {
    const card = document.createElement("article");
    card.className = "event-card";

    card.innerHTML = `
      <div class="event-header">
        <h3>${ev.title}</h3>
        <span class="event-icon">⚽</span>
      </div>

      <p class="event-date">
        <strong>Date:</strong> ${formatDate(ev.date)}
      </p>

      <p class="event-location">
        <strong>Location:</strong> ${ev.location}
      </p>

      <p>${ev.summary}</p>

      <button class="btn-outline" data-id="${ev.id}">
        View details
      </button>
    `;

    eventsContainer.appendChild(card);
  });
}

document.body.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;

  const id = btn.dataset.id;
  const data = await fetchJSON(EVENTS_JSON);
  const ev = data.events.find((x) => x.id === id);

  if (!ev) return;

  openModal(
    ev.title,
    `
    <p><strong>Date:</strong> ${formatDate(ev.date)}</p>
    <p><strong>Location:</strong> ${ev.location}</p>
    <p><strong>Details:</strong></p>
    <p>${ev.details}</p>
    `
  );
});

// Registration form handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  openModal("Registration Received!", `
    <p>Thank you, <strong>${payload.playerName}</strong>!</p>
    <p>You are now registered for <strong>${payload.eventName}</strong>.</p>
    <p>We will contact you at <strong>${payload.parentEmail}</strong>.</p>
  `);

  form.reset();
});

loadEvents();