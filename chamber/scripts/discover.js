import { places } from "../data/discover.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#discoverGrid");
  const visitMessage = document.querySelector("#visitMessage");

  if (!grid || !visitMessage) return;

  places.forEach((place, index) => {
    const card = document.createElement("article");
    card.className = "discover-card";
    card.setAttribute("aria-labelledby", `place-title-${index}`);

    const imgHTML = `
      <figure>
        <img src="${place.image}" alt="${place.name} — photo" loading="lazy" width="300" height="200">
      </figure>
    `;

    card.innerHTML = `
      <h2 id="place-title-${index}">${place.name}</h2>
      ${imgHTML}
      <address>${place.address}</address>
      <p>${place.description}</p>
      <div class="card-actions">
        <button class="learn-btn" type="button" aria-label="Learn more about ${place.name}">Learn more</button>
      </div>
    `;

    grid.appendChild(card);
  });

  const LS_KEY = "chamber-last-visit";
  const lastVisit = localStorage.getItem(LS_KEY);
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const days = Math.floor((now - parseInt(lastVisit, 10)) / (1000 * 60 * 60 * 24));
    if (days < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${days} days ago.`;
    }
  }

  localStorage.setItem(LS_KEY, String(now));

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".learn-btn");
    if (!btn) return;
    const article = btn.closest(".discover-card");
    const title = article?.querySelector("h2")?.textContent || "this place";
    alert(`Learn more about: ${title}`);
  });
});