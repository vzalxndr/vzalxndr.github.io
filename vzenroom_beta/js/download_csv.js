const btn = document.getElementById('downloadCSVBtn');
const startInput = document.getElementById('DownloadCSVStartDate');
const endInput = document.getElementById('DownloadCSVEndDate');
const statusDiv = document.getElementById('downloadCSVStatusElement');

btn.addEventListener('click', async () => {
    statusDiv.style.color = 'red'; //color - negative 
    statusDiv.textContent = '';

    const start = startInput.value;
    const end = endInput.value;
    

    if (!start) {
        statusDiv.textContent = 'Start date is required';
        return;
    }
    if (end) url += `&end=${encodeURIComponent(end)}`;

    let url = `https://vzenroom-server.fly.dev/export?start=${encodeURIComponent(start)}`;
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        const contentType = res.headers.get('Content-Type') || '';

        if (contentType.includes('text/csv')) {
            const startStr = start.replace(/-/g, '_');
            const filename = end 
                ? `export_${startStr}_to_${end.replace(/-/g, '_')}.csv`
                : `export_${startStr}.csv`;

            const blob = await res.blob();

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();

            statusDiv.style.color = 'green'; //color - positive 
            statusDiv.textContent = 'Download started';
        } else {
            const text = await res.text();
            statusDiv.textContent = 'Server response error:\n' + text;
        }
    } catch (err) {
        statusDiv.textContent = 'Fetch error: ' + err.message;
    }
});
