import { fetchJSON, formatDate } from "./utils.js";
import { openModal } from "./modal.js";

const EVENTS_JSON = "data/events.json";
const eventsContainer = document.getElementById("events-container");

async function loadEvents() {
   const data = await fetchJSON(EVENTS_JSON);
   
   const events = data?.events?.slice(0, 3) || [];

   if (events.length === 0) {
      eventsContainer.innerHTML = `<p class="notice">No upcoming events.</p>`;
      return;
   }

   renderEvents(events);
}

function renderEvents(events) {
   eventsContainer.innerHTML = "";

   events.forEach((ev) => {
      const card = document.createElement("article");
      card.className = "card event-card"; // Reusing styles from events.css

      card.innerHTML = `
         <h3>${ev.title}</h3>
         <p class="date">${formatDate(ev.date)}</p>
         <p>${ev.location}</p>
         <p class="small">${ev.description}</p>
      `;

      eventsContainer.appendChild(card);
   });
}

loadEvents();