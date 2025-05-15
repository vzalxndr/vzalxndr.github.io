const analyzeBtn = document.getElementById('analyzeBtn');
const analyzeStartInput = document.getElementById('AnalyzeStartDate');
const analyzeEndInput = document.getElementById('AnalyzeEndDate');
const analyzeStatus = document.getElementById('analyzeStatus');
const analyzeResult = document.getElementById('analyzeResult');

analyzeBtn.addEventListener('click', async () => {
    analyzeStatus.textContent = '';
    analyzeResult.textContent = '';

    const start = analyzeStartInput.value;
    const end = analyzeEndInput.value;

    if (!start) {
        analyzeStatus.textContent = 'Start date is required';
        return;
    }

    let url = `https://vzenroom-server.fly.dev/analyze?start=${encodeURIComponent(start)}`;
    if (end) url += `&end=${encodeURIComponent(end)}`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        const formatted = `
        🔹 Period: ${data.range}
        🌡️ Temperature: 
        - Avg: ${data.avg_temp}°C
        - Min: ${data.min_temp}°C
        - Max: ${data.max_temp}°C
        - Median: ${data.median_temp}°C
        - Range: ${data.temp_range}
        - Exceeds count: ${data.temp_exceeds_count}

        💧 Humidity:
        - Avg: ${data.avg_humidity}%
        - Min: ${data.min_humidity}%
        - Max: ${data.max_humidity}%
        - Median: ${data.median_humidity}%
        - Range: ${data.humidity_range}
        - Exceeds count: ${data.humidity_exceeds_count}

        💡 Light:
        - Min: ${data.min_light}
        - Max: ${data.max_light}
        - Range: ${data.light_range}    
        - Std dev: ${data.std_light}
        - Exceeds count: ${data.light_exceeds_count}
        `;

        analyzeResult.textContent = formatted.trim();
        analyzeStatus.style.color = 'green'; //positive color
        analyzeStatus.textContent = '✔ Analysis loaded';
    } catch (err) {
        analyzeStatus.style.color = 'red'; //negative color
        analyzeStatus.textContent = 'Error: ' + err.message;
    }
});
