const rangeBtn = document.getElementById('rangeBtn');
const copyRangeBtn = document.getElementById('copyRangeBtn');
const rangeStartInput = document.getElementById('RangeStartDate');
const rangeEndInput = document.getElementById('RangeEndDate');
const rangeStatus = document.getElementById('rangeStatus');
const rangeResult = document.getElementById('rangeResult');

rangeBtn.addEventListener('click', async () => {
    rangeStatus.style.color = 'red'; //negative color
    rangeStatus.textContent = '';
    rangeResult.value = '';

    const start = rangeStartInput.value;
    const end = rangeEndInput.value;

    if (!start) {
        rangeStatus.textContent = 'Start date is required';
        return;
    }

    let url = `https://vzenroom-server.fly.dev/range?start=${encodeURIComponent(start)}`;
    if (end) url += `&end=${encodeURIComponent(end)}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Server error: ${res.status} ${res.statusText}`);

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
            rangeStatus.textContent = 'No data for this range';
            return;
        }

        rangeResult.value = JSON.stringify(data, null, 2);
        rangeStatus.style.color = 'green';
        rangeStatus.textContent = `✔ Received ${data.length} records`;
    } catch (err) {
        rangeStatus.textContent = 'Error: ' + err.message;
    }
});

copyRangeBtn.addEventListener('click', () => {
    if (rangeResult.value.trim()) {
        navigator.clipboard.writeText(rangeResult.value)
            .then(() => {
            rangeStatus.style.color = 'green'; //positive color
            rangeStatus.textContent = 'Copied to clipboard!';
            })
            .catch(err => {
            rangeStatus.style.color = 'red'; //negative color
            rangeStatus.textContent = 'Clipboard error: ' + err.message;
            });
    }
});
