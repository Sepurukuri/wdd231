import { formatDate } from "./utils.js";

const container = document.getElementById("program-container");

async function loadPrograms() {
    try {
        const response = await fetch("data/programs.json");
        const programs = await response.json();

        programs.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("program-card");
            card.innerHTML = `
                <h3>${p.name}</h3>
                <p><strong>Age:</strong> ${p.age}</p>
                <p><strong>Coach:</strong> ${p.coach}</p>
                <p><strong>Schedule:</strong> ${p.schedule}</p>
            `;
            container.append(card);
        });
    } catch (err) {
        console.error(err);
    }
}

loadPrograms();