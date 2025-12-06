
export function saveToLocal(key, value){
  try{
    localStorage.setItem(key, JSON.stringify(value));
  }catch(e){
    console.error('Storage save failed', e);
  }
}

export function getFromLocal(key){
  try{
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  }catch(e){
    console.error('Storage read failed', e);
    return null;
  }
}