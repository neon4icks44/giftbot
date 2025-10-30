const tg = window.Telegram.WebApp;
tg.expand();

let user = tg.initDataUnsafe.user;
let stars = 0;
let casesOpened = 0;

// Инициализация
document.getElementById('username').textContent = user.first_name;
document.getElementById('avatar').src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;

const navButtons = document.querySelectorAll('.bottom-nav button');
navButtons.forEach(btn => {
    btn.dataset.icon = {
        contests: '🎁',
        upgrade: '💀',
        cases: '🎃',
        friends: '👥',
        profile: '👤'
    }[btn.dataset.page];
    btn.innerHTML = btn.dataset.icon + '<br>' + btn.textContent;
});

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('cases-list').classList.add('hidden');
        
        if (btn.dataset.page === 'cases') {
            document.getElementById('cases-list').classList.remove('hidden');
        }
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Открытие кейса
document.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('click', () => {
        const qty = 1; // Потом можно из кнопок
        openCaseAnimation(card.querySelector('img').src, qty);
    });
});

function openCaseAnimation(imgSrc, qty) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.95)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 999;

    overlay.innerHTML = `
        <img src="${imgSrc}" style="width: 150px; margin-bottom: 20px;" />
        <h2>Открываем ${qty} кейс...</h2>
        <div class="spinner"></div>
    `;

    document.body.appendChild(overlay);

    setTimeout(() => {
        const gifts = ['🎁 Подарок', '💎 Редкий', '⭐ Звезда', '👻 Призрак', '🦇 Летучая мышь'];
        const gift = gifts[Math.floor(Math.random() * gifts.length)];
        stars += 10;
        casesOpened += qty;

        overlay.innerHTML = `
            <h1>Получено!</h1>
            <h2 style="color: #00ff00; margin: 20px 0;">${gift}</h2>
            <button onclick="this.parentElement.remove(); updateUI();" 
                    style="padding: 12px 24px; background: #00d0ff; border: none; border-radius: 8px; color: #000; font-weight: bold;">
                Забрать
            </button>
        `;

        updateUI();
    }, 2000);
}

function updateUI() {
    document.getElementById('stars').textContent = stars;
    document.getElementById('balance').textContent = stars;
    document.getElementById('cases').textContent = casesOpened;
}

// Демо-режим
document.getElementById('demo-mode').addEventListener('change', (e) => {
    document.querySelector('.stars-needed').textContent = e.target.checked 
        ? "Демо режим: всё бесплатно" 
        : "⭐ 225 (у вас не хватает 225)";
});