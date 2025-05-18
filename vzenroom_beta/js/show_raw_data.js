const rangeBtn = document.getElementById('rangeBtn');
const copyRangeBtn = document.getElementById('copyRangeBtn');
const rangeStartInput = document.getElementById('RangeStartDate');
const rangeEndInput = document.getElementById('RangeEndDate');
const rangeStatus = document.getElementById('exportStatus');
const rangeResult = document.getElementById('rangeResult');

rangeBtn.addEventListener('click', async () => {
    rangeStatus.style.display = 'none';
    rangeStatus.textContent = '';
    rangeResult.value = '';

    const start = rangeStartInput.value;
    const end = rangeEndInput.value;

    if (!start) {
        rangeStatus.style.display = 'block';
        rangeStatus.textContent = 'Start date is required';
        return;
    }

    if (end && new Date(start) > new Date(end)) {
        rangeStatus.style.display = 'block';
        rangeStatus.textContent = 'Start date cannot be after end date';
        return;
    }

    let url = `https://vzenroom-server.fly.dev/range?start=${encodeURIComponent(start)}`;
    if (end) url += `&end=${encodeURIComponent(end)}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Server error: ${res.status} ${res.statusText}`);

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            rangeStatus.style.display = 'block';
            rangeStatus.textContent = 'No data for this range';
            return;
        }

        rangeResult.value = JSON.stringify(data, null, 2);
        rangeStatus.style.display = 'none';
    } catch (err) {
        rangeStatus.style.display = 'block';
        rangeStatus.textContent = 'Error: ' + err.message;
    }
});

copyRangeBtn.addEventListener('click', () => {
    if (rangeResult.value.trim()) {
        navigator.clipboard.writeText(rangeResult.value)
            .then(() => {
                rangeStatus.style.display = 'block';
                rangeStatus.textContent = 'Copied to clipboard!';
            })
            .catch(err => {
                rangeStatus.style.display = 'block';
                rangeStatus.textContent = 'Clipboard error: ' + err.message;
            });
    }
});
