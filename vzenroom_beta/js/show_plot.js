const plotBtn = document.getElementById('plotShowBtn');
const plotStartInput = document.getElementById('plotStartDate');
const plotEndInput = document.getElementById('plotEndDate');
const plotTypeSelect = document.getElementById('plotType');
const plotColorInput = document.getElementById('plotColor');
const plotUseDefaultColorCheckbox = document.getElementById('plotUseDefaultColor');
const plotStatus = document.getElementById('plotStatus');
const plotContainer = document.getElementById('plotContainer');

plotBtn.addEventListener('click', () => {
    plotStatus.style.color = 'red'; //negative color
    plotStatus.textContent = '';
    plotContainer.innerHTML = '';

    const start = plotStartInput.value;
    if (!start) {
        plotStatus.textContent = 'Start date is required';
        return;
    }

    let url = `https://vzenroom-server.fly.dev/plot?start=${encodeURIComponent(start)}`;

    const end = plotEndInput.value;
    if (end) url += `&end=${encodeURIComponent(end)}`;

    const type = plotTypeSelect.value || 'all';
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
        plotStatus.style.color = 'green';  //positive color
        plotStatus.textContent = 'Plot loaded';
    };
    img.onerror = () => {
        plotStatus.textContent = 'Failed to load plot image';
    };

    plotContainer.appendChild(img);
});
