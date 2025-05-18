const btn = document.getElementById('downloadCSVBtn');
const startInput = document.getElementById('DownloadCSVStartDate');
const endInput = document.getElementById('DownloadCSVEndDate');
const statusDiv = document.getElementById('exportStatus');

btn.addEventListener('click', async () => {
    statusDiv.style.display = 'none';
    statusDiv.textContent = '';

    const start = startInput.value;
    const end = endInput.value;

    if (!start) {
        statusDiv.style.display = 'block';
        statusDiv.textContent = 'Start date is required';
        return;
    }

    if (end && new Date(start) > new Date(end)) {
        statusDiv.style.display = 'block';
        statusDiv.textContent = 'Start date cannot be after end date';
        return;
    }

    let url = `https://vzenroom-server.fly.dev/export?start=${encodeURIComponent(start)}`;
    if (end) url += `&end=${encodeURIComponent(end)}`;

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

            statusDiv.style.display = 'none';
        } else {
            const text = await res.text();
            statusDiv.style.display = 'block';
            statusDiv.textContent = 'Server response error:\n' + text;
        }
    } catch (err) {
        statusDiv.style.display = 'block';
        statusDiv.textContent = 'Fetch error: ' + err.message;
    }
});
