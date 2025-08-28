// Data for cards (from screenshot)
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

  // load history from localStorage
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
          <button class="btn-copy flex-1 py-2 px-3 border rounded-full text-sm" data-number="${s.number}">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline-block mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h11a2 2 0 002-2v-3"></path><rect x="8" y="3" width="13" height="13" rx="2" ry="2"></rect></svg>
            Copy
          </button>
          <button class="btn-call bg-emerald-600 text-white px-4 py-2 rounded-full text-sm" data-number="${s.number}">Call</button>
        </div>
      </div>
    `).join('');
  }

  function getIconSvg(name) {
    const basePath = "assets"; // folder path
  
    switch (name) {
      case "shield":
        return `<img src="${basePath}/police.png" alt="shield" class="w-6 h-6">`;
      case "fire":
        return `<img src="${basePath}/fire-service.png" alt="fire" class="w-6 h-6">`;
      case "ambulance":
        return `<img src="${basePath}/ambulance.png" alt="ambulance" class="w-6 h-6">`;
      case "help":
        return `<img src="${basePath}/emergency.png" alt="help" class="w-6 h-6">`;
      case "gov":
        return `<img src="${basePath}/emergency.png" alt="gov" class="w-6 h-6">`;
      case "bolt":
        return `<img src="${basePath}/emergency.png" alt="bolt" class="w-6 h-6">`;
      case "org":
        return `<img src="${basePath}/brac.png" alt="org" class="w-6 h-6">`;
      case "train":
        return `<img src="${basePath}/Bangladesh-Railway.png" alt="train" class="w-6 h-6">`;
      default:
        return `<img src="${basePath}/emergency.png" alt="default" class="w-6 h-6">`;
    }
  }
  

  // History rendering
  function renderHistory() {
    if (!callHistory.length) {
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

  function addToHistory(service) {
    const now = new Date();
    const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    callHistory.push({ id: service.id, title: service.title, number: service.number, time });
    // keep only last 50
    if (callHistory.length > 50) callHistory.shift();
    localStorage.setItem('callHistoryEmergency', JSON.stringify(callHistory));
    renderHistory();
  }

  // Event delegation for buttons
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.btn-copy');
    const callBtn = e.target.closest('.btn-call');
    const heartBtn = e.target.closest('.btn-heart');

    if (copyBtn) {
      const num = copyBtn.dataset.number;
      navigator.clipboard.writeText(num).then(() => {
        // small feedback
        copyBtn.innerHTML = 'Copied';
        setTimeout(() => copyBtn.innerHTML = 'Copy', 1000);
      }).catch(() => alert('Copy failed'));
    }

    if (callBtn) {
      const num = callBtn.dataset.number;
      // find service meta
      const svc = services.find(s => s.number === num || s.number.replace(/-/g,'') === num.replace(/-/g,''));
      if (svc) addToHistory(svc);
      // try to initiate tel: (works on mobile)
      window.open('tel:' + num);
    }

    if (heartBtn) {
      const id = heartBtn.dataset.id;
      heartBtn.classList.toggle('text-red-500');
      heartBtn.classList.toggle('text-gray-300');
      // simple localStorage favorites
      let favs = JSON.parse(localStorage.getItem('favoritesEmergency') || '[]');
      if (favs.includes(id)) {
        favs = favs.filter(x => x !== id);
      } else {
        favs.push(id);
      }
      localStorage.setItem('favoritesEmergency', JSON.stringify(favs));
    }
  });

  clearHistoryBtn.addEventListener('click', () => {
    callHistory = [];
    localStorage.removeItem('callHistoryEmergency');
    renderHistory();
  });

  // initial render
  renderCards();
  renderHistory();

  // restore favorites look
  (function applyFavs(){
    const favs = JSON.parse(localStorage.getItem('favoritesEmergency') || '[]');
    favs.forEach(id => {
      const btn = document.querySelector(`.btn-heart[data-id='${id}']`);
      if (btn) {
        btn.classList.remove('text-gray-300');
        btn.classList.add('text-red-500');
      }
    });
  })();