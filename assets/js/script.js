const eventDate = new Date('2025-10-01T00:00:00').getTime();
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownEl = document.getElementById('countdown');
const leadForm = document.getElementById('lead-form');
const confirmationEl = document.getElementById('confirmation');
const submitBtn = document.getElementById('submit-btn');
function formatNumber(value) {
    const s = value.toString();
    return s.length < 2 ? `0${s}` : s;
}
function updateCountdown() {
    const now = Date.now();
    const distance = eventDate - now;
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !countdownEl) {
        return;
    }
    if (distance < 0) {
        countdownEl.innerHTML = '<p>O evento começou!</p>';
        return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    daysEl.innerHTML = formatNumber(days);
    hoursEl.innerHTML = formatNumber(hours);
    minutesEl.innerHTML = formatNumber(minutes);
    secondsEl.innerHTML = formatNumber(seconds);
}
function getInputValue(id) {
    var _a;
    const input = document.getElementById(id);
    return (_a = input === null || input === void 0 ? void 0 : input.value.trim()) !== null && _a !== void 0 ? _a : '';
}
function storeLead(lead) {
    const raw = localStorage.getItem('leads');
    const leads = raw ? JSON.parse(raw) : [];
    leads.push(lead);
    localStorage.setItem('leads', JSON.stringify(leads));
}
function submitListener(event) {
    event.preventDefault();
    if (!leadForm || !submitBtn || !confirmationEl) {
        return;
    }
    const name = getInputValue('name');
    const email = getInputValue('email');
    const phone = getInputValue('phone');
    if (!name || !email || !phone) {
        window.alert('Por favor, preencha todos os campos.');
        return;
    }
    submitBtn.innerText = 'Processando...';
    submitBtn.disabled = true;
    const lead = {
        name,
        email,
        phone,
        timestamp: new Date().toISOString(),
    };
    storeLead(lead);
    setTimeout(() => {
        leadForm.style.display = 'none';
        confirmationEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.innerText = 'Garantir Minha Vaga na Lista VIP';
        console.log('Lead cadastrado:', lead);
    }, 600);
}
function attachHandlers() {
    if (leadForm) {
        leadForm.addEventListener('submit', submitListener);
    }
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = anchor.getAttribute('href');
            if (!target) {
                return;
            }
            const section = document.querySelector(target);
            section === null || section === void 0 ? void 0 : section.scrollIntoView({ behavior: 'smooth' });
        });
    });
}
updateCountdown();
setInterval(updateCountdown, 1000);
attachHandlers();
export {};
//# sourceMappingURL=script.js.map