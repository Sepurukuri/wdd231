const courses = [
  { code: "WDD131", title: "Dynamic Web Fundamentals", credits: 3, completed: true, subject: "WDD" },
  { code: "WDD132", title: "Advanced Web Development", credits: 3, completed: false, subject: "WDD" },
  { code: "CSE110", title: "Intro to Programming", credits: 4, completed: true, subject: "CSE" },
  { code: "CSE120", title: "Data Structures", credits: 4, completed: false, subject: "CSE" }
];

const courseList = document.getElementById('courseList');
const totalCredits = document.getElementById('totalCredits');
const filterButtons = document.querySelectorAll('#courseFilters button');

function renderCourses(filter) {
  courseList.innerHTML = '';
  let filtered = courses.filter(course => filter === 'all' ? true : course.subject === filter);
  filtered.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('courseCard');
    if(course.completed) div.classList.add('completed');
    div.innerHTML = `<strong>${course.code}</strong>: ${course.title} (${course.credits} credits)`;
    courseList.appendChild(div);
  });
  totalCredits.textContent = filtered.reduce((sum, c) => sum + c.credits, 0);
}

renderCourses('all');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => renderCourses(btn.dataset.filter));
});