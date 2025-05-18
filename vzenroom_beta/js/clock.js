function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

function startClock() {
    updateClock();
    const delay = (60 - new Date().getSeconds()) * 1000;
    setTimeout(() => {
        updateClock();
        setInterval(updateClock, 60000);
    }, delay);
}

startClock();