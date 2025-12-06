import { fetchJSON, formatDate } from "./utils.js";
import { openModal } from "./modal.js";

const eventsContainer = document.getElementById("events-list");
const form = document.getElementById("registration-form");

const EVENTS_JSON = "data/events.json";

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

         <p>${ev.description}</p>
         
         `;

      eventsContainer.appendChild(card);
   });
}

form.addEventListener("submit", (e) => {
   e.preventDefault();
   
   const formData = new FormData(form);
   const payload = Object.fromEntries(formData.entries());

   openModal("Registration Received!", `
      <p>Thank you, <strong>${payload.player}</strong>!</p>
      <p>You are now registered for <strong>${payload.program}</strong>.</p>
      <p>We will contact you at <strong>${payload.email}</strong>.</p>
    `);
    
   form.reset();
});

loadEvents();