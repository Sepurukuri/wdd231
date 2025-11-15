async function loadSpotlights() {
  const container = document.getElementById("spotlight-container");
  try {
    const res = await fetch("data/members.json", {cache: "no-store"});
    if (!res.ok) throw new Error("members.json fetch failed");
    const members = await res.json();

    const filtered = members.filter(m => Number(m.membershipLevel) >= 2);
    if (!filtered.length) {
      container.innerHTML = "<p>No silver/gold members found.</p>";
      return;
    }

    const count = Math.random() > 0.5 ? 3 : 2;
    const selected = [];
    while (selected.length < count && selected.length < filtered.length) {
      const candidate = filtered[Math.floor(Math.random() * filtered.length)];
      if (!selected.includes(candidate)) selected.push(candidate);
    }

    container.innerHTML = "";
    selected.forEach(m => {
      const div = document.createElement("div");
      div.className = "spotlight-card";
      div.innerHTML = `
        <img src="images/${m.image}" alt="${m.name} logo" width="240" height="160">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <p><a href="${m.website}" target="_blank" rel="noopener noreferrer">Visit website</a></p>
        <p class="member-level">${m.membershipLevel === 3 ? 'Gold Member' : 'Silver Member'}</p>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error("Spotlights error", err);
    container.innerHTML = "<p>Spotlights unavailable at this time.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadSpotlights);