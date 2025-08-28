const services = [
    { id: 1, title: 'National Emergency Number', subtitle: 'National Emergency', number: '999', tag: 'All', icon: 'alarm' },
    { id: 2, title: 'Police Helpline Number', subtitle: 'Police', number: '999', tag: 'Police', icon: 'shield' },
    { id: 3, title: 'Fire Service Number', subtitle: 'Fire Service', number: '999', tag: 'Fire', icon: 'fire' },
    { id: 4, title: 'Ambulance Service', subtitle: 'Ambulance', number: '1994-999999', tag: 'Health', icon: 'ambulance' },
    { id: 5, title: 'Women & Child Helpline', subtitle: 'Women & Child Helpline', number: '109', tag: 'Help', icon: 'help' },
    { id: 6, title: 'Anti-Corruption Helpline', subtitle: 'Anti-Corruption', number: '106', tag: 'Govt.', icon: 'gov' },
    { id: 7, title: 'Electricity Helpline', subtitle: 'Electricity Outage', number: '16216', tag: 'Electricity', icon: 'bolt' },
    { id: 8, title: 'Brac Helpline', subtitle: 'Brac', number: '16445', tag: 'NGO', icon: 'org' },
    { id: 9, title: 'Bangladesh Railway Helpline', subtitle: 'Bangladesh Railway', number: '163', tag: 'Travel', icon: 'train' }
  ];
  
  const cardsGrid = document.getElementById('cardsGrid');
  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistory');
  
  let callHistory = JSON.parse(localStorage.getItem('callHistoryEmergency') || '[]');
  
  function renderCards() {
    cardsGrid.innerHTML = services.map(s => `
      <div class="bg-white rounded-xl p-5 shadow border border-emerald-50 relative">
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-lg bg-pink-50 flex items-center justify-center">
              ${getIconSvg(s.icon)}
            </div>
            <div>
              <h4 class="font-semibold text-sm">${s.title}</h4>
              <p class="text-xs text-gray-400">${s.subtitle}</p>
            </div>
          </div>
          <button class="btn-heart text-gray-300 hover:text-red-500" data-id="${s.id}" aria-label="favorite">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.182 4.318 12.682a4.5 4.5 0 010-6.364z"></path>
            </svg>
          </button>
        </div>
  
        <div class="mt-4">
          <div class="text-2xl font-bold">${s.number}</div>
          <div class="mt-2"><span class="text-xs bg-gray-100 px-2 py-1 rounded-full">${s.tag}</span></div>
        </div>
  
        <div class="mt-4 flex items-center gap-3">
          <button class="btn-copy flex-1 py-2 px-3 border rounded-full text-sm" data-number="${s.number}">Copy</button>
          <button class="btn-call bg-emerald-600 text-white px-4 py-2 rounded-full text-sm" data-number="${s.number}">Call</button>
        </div>
      </div>
    `).join('');
  }
  
  function getIconSvg(name){
    switch(name){
      case 'shield': return `<svg class='w-6 h-6 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 2l7 4v6c0 5-4 9-7 11-3-2-7-6-7-11V6l7-4z'/></svg>`;
      case 'fire': return `<svg class='w-6 h-6 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 2s4 4 4 8a4 4 0 11-8 0c0-4 4-8 4-8z'/></svg>`;
      case 'ambulance': return `<svg class='w-6 h-6 text-pink-600' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M3 7h13v10H3zM7 21v-3M17 21v-3'/></svg>`;
      case 'help': return `<svg class='w-6 h-6 text-emerald-600' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 8a4 4 0 10-4 4'/></svg>`;
      case 'gov': return `<svg class='w-6 h-6 text-emerald-600' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M12 2v20M6 7h12'/></svg>`;
      case 'bolt': return `<svg class='w-6 h-6 text-yellow-500' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/></svg>`;
      case 'org': return `<svg class='w-6 h-6 text-emerald-600' viewBox='0 0 24 24'><circle cx='12' cy='8' r='3'/><path d='M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2'/></svg>`;
      case 'train': return `<svg class='w-6 h-6 text-emerald-600' viewBox='0 0 24 24'><rect x='3' y='5' width='18' height='11' rx='2'/><path d='M7 16v3M17 16v3'/></svg>`;
      default: return `<svg class='w-6 h-6 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'><circle cx='12' cy='12' r='8'/></svg>`;
    }
  }
  
  function renderHistory() {
    if(!callHistory.length){
      historyList.innerHTML = '<li class="text-sm text-gray-400">No calls yet</li>';
      return;
    }
    historyList.innerHTML = callHistory.slice().reverse().map(h => `
      <li class="bg-gray-50 p-3 rounded-md flex items-center justify-between">
        <div>
          <div class="text-sm font-medium">${h.title}</div>
          <div class="text-xs text-gray-500">${h.number} • ${h.time}</div>
        </div>
      </li>
    `).join('');
  }
  
  function addToHistory(service){
    const now = new Date();
    const time = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'});
    callHistory.push({id:service.id,title:service.title,number:service.number,time});
    if(callHistory.length>50) callHistory.shift();
    localStorage.setItem('callHistoryEmergency', JSON.stringify(callHistory));
    renderHistory();
  }
  
  // Event delegation
  document.addEventListener('click',(e)=>{
    const copyBtn = e.target.closest('.btn-copy');
    const callBtn = e.target.closest('.btn-call');
    const heartBtn = e.target.closest('.btn-heart');
  
    if(copyBtn){
      const num = copyBtn.dataset.number;
      navigator.clipboard.writeText(num).then(()=>{
        copyBtn.innerHTML = 'Copied';
        setTimeout(()=>copyBtn.innerHTML='Copy',1000);
      }).catch(()=>alert('Copy failed'));
    }
  
    if(callBtn){
      const num = callBtn.dataset.number;
      const svc = services.find(s=>s.number===num||s.number.replace(/-/g,'')===num.replace(/-/g,''));
      if(svc) addToHistory(svc);
      window.open('tel:'+num);
    }
  
    if(heartBtn){
      const id = heartBtn.dataset.id;
      heartBtn.classList.toggle('text-red-500');
      heartBtn.classList.toggle('text-gray-300');
      let favs = JSON.parse(localStorage.getItem('favoritesEmergency')||'[]');
      if(favs.includes(id)) favs=favs.filter(x=>x!==id); else favs.push(id);
      localStorage.setItem('favoritesEmergency', JSON.stringify(favs));
    }
  });
  
  clearHistoryBtn.addEventListener('click',()=>{
    callHistory=[];
    localStorage.removeItem('callHistoryEmergency');
    renderHistory();
  });
  
  renderCards();
  renderHistory();
  
  // restore favorites look
  (function applyFavs(){
    const favs = JSON.parse(localStorage.getItem('favoritesEmergency')||'[]');
    favs.forEach(id=>{
      const btn = document.querySelector(`.btn-heart[data-id='${id}']`);
      if(btn){ btn.classList.remove('text-gray-300'); btn.classList.add('text-red-500'); }
    });
  })();
  