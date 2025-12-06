
export async function fetchJSON(path){
  try{
   const res = await fetch(path);
   if(!res.ok) throw new Error(`Fetch failed: ${res.status}`);
   return await res.json();
  }catch(err){
   console.error('fetchJSON error (Criterion 12)', err);
   return null;
 }
}

export function formatDate(isoDate){
  try{
   const d = new Date(isoDate);
   return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short',
year:'numeric' });
  }catch(e){
   return isoDate;
 }
}