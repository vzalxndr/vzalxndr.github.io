const plotBtn = document.getElementById('plotShowBtn');
const plotStartInput = document.getElementById('plotStartDate');
const plotEndInput = document.getElementById('plotEndDate');
const plotTypeSelect = document.getElementById('plotType');
const plotColorInput = document.getElementById('plotColor');
const plotUseDefaultColorCheckbox = document.getElementById('plotUseDefaultColor');
const plotStatus = document.getElementById('plotStatus');
const plotContainer = document.getElementById('plotContainer');

function formatDateToInput(date) {
    return date.toISOString().split('T')[0];
}

function loadPlot() {
    plotStatus.style.color = '#';
    plotStatus.textContent = '';
    plotContainer.innerHTML = '';

    const start = plotStartInput.value;
    const end = plotEndInput.value;

    if (!start) {
        plotStatus.style.display = 'block';
        plotStatus.textContent = 'Start date is required';
        return;
    }

    if (end && new Date(start) > new Date(end)) {
        plotStatus.style.display = 'block';
        plotStatus.textContent = 'Start date cannot be after end date';
        return;
    }

    let url = `https://vzenroom-server.fly.dev/plot?start=${encodeURIComponent(start)}`;
    if (end) url += `&end=${encodeURIComponent(end)}`;

    const type = plotTypeSelect.value || 'temperature';
    url += `&type=${encodeURIComponent(type)}`;

    if (!plotUseDefaultColorCheckbox.checked) {
        const color = plotColorInput.value || '#ff0000';
        url += `&color=${encodeURIComponent(color)}`;
    }

    const img = document.createElement('img');
    url += `&t=${Date.now()}`;
    img.src = url;
    img.alt = 'Plot image';
    img.style.maxWidth = '100%';

    img.onload = () => {
        plotStatus.textContent = '';
        plotStatus.style.display = 'none';
    };

    img.onerror = () => {
        plotStatus.style.display = 'block';
        plotStatus.textContent = 'Failed to load plot image';
    };

    plotContainer.appendChild(img);
}

plotBtn.addEventListener('click', loadPlot);

window.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    plotStartInput.value = formatDateToInput(today);
    plotEndInput.value = formatDateToInput(tomorrow);
    plotTypeSelect.value = 'humidity';
    plotUseDefaultColorCheckbox.checked = true;

    loadPlot();
});
