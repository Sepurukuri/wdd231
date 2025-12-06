import { formatDate } from "./utils.js";

const eventsBox = document.getElementById("events-container");

async function loadEvents() {
    try {
        const res = await fetch("data/events.json");
        const events = await res.json();

        events.forEach(e => {
            const card = document.createElement("div");
            card.className = "event-card";
            card.innerHTML = `
                <h3>${e.title}</h3>
                <p>${formatDate(e.date)}</p>
                <button class="open-modal" data-info="${e.details}">More Info</button>
            `;
            eventsBox.append(card);
        });

        setModal();
    } catch (error) {
        console.error(error);
    }
}

loadEvents();

function setModal() {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const close = document.getElementById("close-modal");

    document.querySelectorAll(".open-modal").forEach(btn => {
        btn.addEventListener("click", () => {
            modalBody.textContent = btn.dataset.info;
            modal.classList.remove("hidden");
        });
    });

    close.addEventListener("click", () => modal.classList.add("hidden"));
}