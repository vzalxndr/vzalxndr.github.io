const analyzeBtn = document.getElementById('analyzeBtn');
const analyzeStartInput = document.getElementById('AnalyzeStartDate');
const analyzeEndInput = document.getElementById('AnalyzeEndDate');
const analyzeStatus = document.getElementById('analyzeStatus');
const analyzeResult = document.getElementById('analyzeResult');

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const toDateInputFormat = (date) => date.toISOString().split('T')[0];

analyzeStartInput.value = toDateInputFormat(today);
analyzeEndInput.value = toDateInputFormat(tomorrow);

analyzeBtn.addEventListener('click', async () => {
    analyzeStatus.textContent = '';
    analyzeResult.textContent = '';
    analyzeStatus.style.display = 'none'

    const start = analyzeStartInput.value;
    const end = analyzeEndInput.value;

    if (!start) {
        analyzeStatus.style.display = 'block'
        analyzeStatus.textContent = 'Start date is required';
        return;
    }

    let url = `https://vzenroom-server.fly.dev/analyze?start=${encodeURIComponent(start)}`;
    if (end) url += `&end=${encodeURIComponent(end)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (res.status === 404 && data.error === 'No data for this range') {
            analyzeStatus.style.display = 'block'
            analyzeStatus.textContent = 'No data for selected range.';
            analyzeStatus.style.color = '#ffffff6a';
            analyzeResult.innerHTML = '';
            return;
        }

        if (!res.ok) {
            throw new Error(data.error || 'Server error');
        }

        analyzeStatus.textContent = 'Analysis loaded';
        analyzeStatus.style.color = '#ffffff';
        analyzeStatus.style.display = 'none'

        analyzeResult.innerHTML = `
            <h3>Period: <span>${data.range}</span></h3>
            <div class="analyzeListsContainer">
                <div class="analyzeBlock">
                <h4>Temperature</h4>
                <ul class="analyze-list">
                    <li>Average: <span>${data.avg_temp}°C</span></li>
                    <li>Minimum: <span>${data.min_temp}°C</span></li>
                    <li>Maximum: <span>${data.max_temp}°C</span></li>
                    <li>Median: <span>${data.median_temp}°C</span></li>
                    <li>Range: <span>${data.temp_range}</span></li>
                    <li>Exceeds: <span>${data.temp_exceeds_count}</span></li>
                </ul>
                </div>
                <div class="analyzeBlock">
                <h4>Humidity</h4>
                <ul class="analyze-list">
                    <li>Average: <span>${data.avg_humidity}%</span></li>
                    <li>Minimum: <span>${data.min_humidity}%</span></li>
                    <li>Maximum: <span>${data.max_humidity}%</span></li>
                    <li>Median: <span>${data.median_humidity}%</span></li>
                    <li>Range: <span>${data.humidity_range}</span></li>
                    <li>Exceeds: <span>${data.humidity_exceeds_count}</span></li>
                </ul>
                </div>
                <div class="analyzeBlock">
                <h4>Light</h4>
                <ul class="analyze-list">
                    <li>Average: <span>${data.avg_light}</span></li>
                    <li>Minimum: <span>${data.min_light}</span></li>
                    <li>Maximum: <span>${data.max_light}</span></li>
                    <li>Std Deviation: <span>${data.std_light}</span></li>
                    <li>Range: <span>${data.light_range}</span></li>
                    <li>Exceeds: <span>${data.light_exceeds_count}</span></li>
                </ul>
                </div>
            </div>
            `.trim();

    } catch (err) {
        analyzeStatus.style.display = 'block'
        analyzeStatus.textContent = 'Error :( ' + err.message;
        analyzeStatus.style.color = '#ffffff';
        analyzeResult.innerHTML = '';
    }
});

window.addEventListener('DOMContentLoaded', () => {
    analyzeBtn.click();
});

