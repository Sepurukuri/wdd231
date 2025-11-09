document.addEventListener('DOMContentLoaded', () => {
  const membersListEl = document.getElementById('membersList');
  const gridBtn = document.getElementById('gridBtn');
  const listBtn = document.getElementById('listBtn');
  const membershipFilter = document.getElementById('membershipFilter');

  let members = [];
  let displayType = 'grid';

  async function loadMembers() {
    try {
      const res = await fetch('data/members.json', {cache: "no-store"});
      if (!res.ok) throw new Error('Failed to fetch members.json');
      members = await res.json();
      render();
    } catch (err) {
      console.error(err);
      membersListEl.innerHTML = `<p class="error">Sorry — could not load member data.</p>`;
    }
  }

  function render() {
    const filterVal = membershipFilter.value;
    const filtered = members.filter(m => {
      if (filterVal === 'all') return true;
      return String(m.membershipLevel) === String(filterVal);
    });

    if (displayType === 'grid') {
      renderGrid(filtered);
    } else {
      renderList(filtered);
    }
  }

  function renderGrid(list) {
    membersListEl.className = 'members-grid';
    membersListEl.innerHTML = '';
    list.forEach(m => {
      const card = document.createElement('article');
      card.className = 'member-card';
      card.setAttribute('role','listitem');

      const img = document.createElement('img');
      img.src = `images/${m.image}`;
      img.alt = m.name + ' logo';
      img.width = 72; img.height = 72;

      const info = document.createElement('div');
      info.className = 'member-info';
      info.innerHTML = `<div class="title">${m.name}</div>
                        <div class="member-meta">${m.address}<br>${m.phone}</div>`;

      const actions = document.createElement('div');
      actions.className = 'member-actions';
      const a = document.createElement('a');
      a.href = m.website;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Visit website';
      a.className = 'visit-link';

      const badge = document.createElement('div');
      badge.className = `member-badge badge-${m.membershipLevel}`;
      badge.textContent = membershipLabel(m.membershipLevel);

      actions.appendChild(badge);
      actions.appendChild(a);

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(actions);

      membersListEl.appendChild(card);
    });
  }

  function renderList(list) {
    membersListEl.className = '';
    membersListEl.innerHTML = '';
    list.forEach(m => {
      const li = document.createElement('div');
      li.className = 'list-item';
      li.setAttribute('role','listitem');
      li.innerHTML = `<div class="title">${m.name} <span class="member-badge ${'badge-'+m.membershipLevel}">${membershipLabel(m.membershipLevel)}</span></div>
                      <div class="member-meta">${m.address} • ${m.phone} • <a href="${m.website}" target="_blank" rel="noopener noreferrer">Website</a></div>`;
      membersListEl.appendChild(li);
    });
  }

  function membershipLabel(level) {
    switch (String(level)) {
      case '3': return 'Gold';
      case '2': return 'Silver';
      default: return 'Member';
    }
  }

  gridBtn.addEventListener('click', () => {
    displayType = 'grid';
    gridBtn.setAttribute('aria-pressed','true');
    listBtn.setAttribute('aria-pressed','false');
    render();
  });

  listBtn.addEventListener('click', () => {
    displayType = 'list';
    gridBtn.setAttribute('aria-pressed','false');
    listBtn.setAttribute('aria-pressed','true');
    render();
  });

  membershipFilter.addEventListener('change', render);

  loadMembers();
});