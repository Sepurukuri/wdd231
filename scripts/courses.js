document.addEventListener('DOMContentLoaded', () => {
  const courses = [
    { code: "WDD131", title: "Dynamic Web Fundamentals", credits: 3, completed: true, subject: "WDD" },
    { code: "WDD132", title: "Advanced Web Development", credits: 3, completed: false, subject: "WDD" },
    { code: "CSE110", title: "Intro to Programming", credits: 4, completed: true, subject: "CSE" },
    { code: "CSE120", title: "Data Structures", credits: 4, completed: false, subject: "CSE" }
  ];

  const courseList = document.getElementById('courseList');
  const totalCredits = document.getElementById('totalCredits');
  const filterButtons = document.querySelectorAll('#courseFilters button');

  if (!courseList || !totalCredits) return;

  function renderCourses(filter) {
    courseList.innerHTML = '';
    const filtered = courses.filter(c => filter === 'all' ? true : c.subject === filter);

    filtered.forEach(course => {
      const card = document.createElement('article');
      card.className = 'courseCard';
      if (course.completed) card.classList.add('completed');
      card.setAttribute('tabindex', '0');

      const left = document.createElement('div');
      left.className = 'left';
      left.innerHTML = `<div class="code">${course.code}</div><div class="title">${course.title}</div>`;

      const right = document.createElement('div');
      right.className = 'meta';
      right.innerHTML = `<div>${course.credits} credits</div><div>${course.subject}</div>${course.completed ? '<div aria-label="Completed">✔ Completed</div>' : '<div aria-label="Not completed">In Progress</div>'}`;

      card.appendChild(left);
      card.appendChild(right);
      courseList.appendChild(card);
    });

    const total = filtered.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);
    totalCredits.textContent = total;
  }

  renderCourses('all');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      const filter = btn.dataset.filter || 'all';
      renderCourses(filter);
    });
  });
});