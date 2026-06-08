let barChart, doughnutChart, line_Chart;

function chart_Maker(Temperatures, weatherConditionsCount) {
    const bar_chart = document.getElementById('temperature-bar-chart');
    const Doughnut_chart = document.getElementById('weather-doughnut-c');
    const lineChart = document.getElementById('temperature-line-c');

    if (barChart) barChart.destroy();
    if (doughnutChart) doughnutChart.destroy();
    if (line_Chart) line_Chart.destroy();

    const conditions = Object.keys(weatherConditionsCount);
    const colors = conditions.map(c => BackgroundColor_Updater(c));

    const chartDefaults = {
        color: '#7a90b0',
        borderColor: 'rgba(59,139,255,0.12)',
    };

    Chart.defaults.color = chartDefaults.color;

    const gridStyle = {
        color: 'rgba(59,139,255,0.08)',
        drawBorder: false,
    };

    const tickStyle = {
        color: '#415570',
        font: { family: "'Space Grotesk', sans-serif", size: 11 }
    };

    // Bar Chart
    barChart = new Chart(bar_chart, {
        type: 'bar',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Temp (°C)',
                data: Temperatures.slice(0, 5),
                backgroundColor: [
                    'rgba(59,139,255,0.7)',
                    'rgba(0,212,170,0.7)',
                    'rgba(255,107,53,0.7)',
                    'rgba(168,85,247,0.7)',
                    'rgba(255,193,7,0.7)',
                ],
                borderColor: 'transparent',
                borderRadius: 6,
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: gridStyle, ticks: tickStyle },
                y: { grid: gridStyle, ticks: tickStyle }
            },
            animation: { duration: 1500, easing: 'easeOutQuart' }
        }
    });

    // Doughnut Chart
    doughnutChart = new Chart(Doughnut_chart, {
        type: 'doughnut',
        data: {
            labels: conditions,
            datasets: [{
                data: Object.values(weatherConditionsCount),
                backgroundColor: colors,
                borderColor: '#0d1520',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: '#7a90b0',
                        font: { size: 10, family: "'Space Grotesk', sans-serif" },
                        boxWidth: 10,
                        padding: 8,
                    }
                }
            },
            animation: { animateRotate: true, duration: 1500 }
        }
    });

    // Line Chart
    line_Chart = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Temp (°C)',
                data: Temperatures.slice(0, 5),
                borderColor: 'rgba(59,139,255,1)',
                backgroundColor: 'rgba(59,139,255,0.08)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59,139,255,1)',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4,
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: gridStyle, ticks: tickStyle },
                y: { grid: gridStyle, ticks: tickStyle, beginAtZero: false }
            },
            animation: { duration: 1500, easing: 'easeOutQuart' }
        }
    });
}

function BackgroundColor_Updater(condition) {
    const map = {
        'light rain': 'rgba(59,139,255,0.75)',
        'moderate rain': 'rgba(40,110,220,0.75)',
        'scattered clouds': 'rgba(100,160,230,0.75)',
        'clear sky': 'rgba(0,212,170,0.75)',
        'haze': 'rgba(168,140,80,0.75)',
        'overcast clouds': 'rgba(80,100,130,0.75)',
        'few clouds': 'rgba(120,170,220,0.75)',
        'broken clouds': 'rgba(90,120,160,0.75)',
        'mist': 'rgba(130,160,190,0.75)',
        'smoke': 'rgba(100,90,80,0.75)',
    };
    return map[condition] || 'rgba(59,139,255,0.6)';
}