import { fetchJSON, formatDate } from './utils.js';
import { openModal } from './modal.js';
import { saveToLocal, getFromLocal } from './storage.js';
 
const PROGRAMS_JSON = 'data/programs.json';
const container = document.getElementById('programs-container');
 
async function renderPrograms(){
   const data = await fetchJSON(PROGRAMS_JSON);
   if(!data || !Array.isArray(data.programs)) {
      container.innerHTML = '<p class="notice">Programs data unavailable.</p>';
      return;
   }
 
   saveToLocal('sba_programs', data.programs);
 
   const list = data.programs;
   showList(list);
}
 
function showList(list){
   container.innerHTML = '';
   list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'card program-card';
      card.innerHTML = `
         <div class="program-media media-ratio">
           <img data-src="${p.image || 'images/placeholder-program.jpg'}" alt="${p.name}" class="responsive-img" />
         </div>
         <div class="program-info">
           <h3>${p.name}</h3>
           <p class="small"><strong>Age:</strong> ${p.ageGroup}</p>
           <p><strong>Schedule:</strong> ${p.schedule}</p>
           <p class="small"><strong>Coach:</strong> ${p.coach}</p>
           <p class="program-fee small"><strong>Fee:</strong> ${p.fee}</p>
           <div style="margin-top:.5rem;">
             <button class="btn-details" data-id="${p.id}">View details</button>
           </div>
         </div>
      `;
      container.appendChild(card);
   });
 
   const imgs = container.querySelectorAll('img[data-src]');
   if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries, obs) => {
         entries.forEach(en => {
            if(en.isIntersecting){
               const img = en.target;
               img.src = img.dataset.src;
               img.removeAttribute('data-src');
               obs.unobserve(img);
            }
         });
      }, {rootMargin: '100px'});
      imgs.forEach(i => io.observe(i));
   }
}
 
document.body.addEventListener('click', async (e) => {
   const btn = e.target.closest('.btn-details');
   if(!btn) return;
   const id = btn.dataset.id;
   const programs = getFromLocal('sba_programs') || [];
   const prog = programs.find(x => String(x.id) === String(id));
   if(prog){
      openModal(prog.name, `
         <p><strong>Age:</strong> ${prog.ageGroup}</p>
         <p><strong>Schedule:</strong> ${prog.schedule}</p>
         <p><strong>Coach:</strong> ${prog.coach}</p>
         <p><strong>Fee:</strong> ${prog.fee}</p>
         <p>${prog.description || ''}</p>
      `);
   }
   else {
      const data = await fetchJSON(PROGRAMS_JSON);
      const p = data.programs.find(x => String(x.id) === String(id));
      if(p){
         openModal(p.name, `
            <p><strong>Age:</strong> ${p.ageGroup}</p>
            <p><strong>Schedule:</strong> ${p.schedule}</p>
            <p><strong>Coach:</strong> ${p.coach}</p>
            <p><strong>Fee:</strong> ${p.fee}</p>
            <p>${p.description || ''}</p>
         `);
      }
   }
});
 
renderPrograms();