const chatbox_input = document.getElementById('question');
const chatbox_output = document.getElementById('Answer');

function chatbox() {
    const msg = chatbox_input.value.trim();
    if (!msg) return;

    const filtering_weather = msg.match(/filter (\w+ ?\w*)/i);

    chatbox_output.innerHTML += `<div class="My_question">You: ${msg}</div>`;
    chatbox_input.value = '';

    let reply;

    if (filtering_weather) {
        const condition = filtering_weather[1].toLowerCase();
        const matches = total_dataEntries.filter(e => e.weather[0].description.includes(condition));
        if (matches.length > 0) {
            displayForecast(matches);
            reply = `Showing ${matches.length} forecast entries for "${condition}".`;
        } else {
            reply = `No entries found for "${condition}".`;
        }
    } else if (msg.toLowerCase().includes('weather')) {
        const city = document.getElementById('cityInput').value;
        if (msg.toLowerCase().includes('today')) {
            reply = `Current weather data is shown in the dashboard for ${city || 'the searched city'}.`;
        } else if (msg.toLowerCase().includes('highest')) {
            reply = temperatures.length
                ? `Highest temperature: ${getHighestTemperature(temperatures)} °C`
                : 'No data loaded yet. Search a city first.';
        } else if (msg.toLowerCase().includes('lowest')) {
            reply = temperatures.length
                ? `Lowest temperature: ${getlowestTemperature(temperatures)} °C`
                : 'No data loaded yet. Search a city first.';
        } else if (msg.toLowerCase().includes('average')) {
            reply = temperatures.length
                ? `Average temperature: ${getaverageTemperature(temperatures)} °C`
                : 'No data loaded yet. Search a city first.';
        } else if (msg.toLowerCase().includes('asort')) {
            sortTemperaturesAscending();
            reply = 'Forecast sorted by temperature (ascending).';
        } else if (msg.toLowerCase().includes('dsort')) {
            sortTemperaturesDecending();
            reply = 'Forecast sorted by temperature (descending).';
        } else {
            reply = 'Try: "weather highest", "weather lowest", "weather average", "filter rain", or "weather asort/dsort".';
        }
    } else {
        reply = 'I only answer weather-related questions. Try "weather highest" or "filter rain".';
    }

    chatbox_output.innerHTML += `<div class="computer-answer">🤖 ${reply}</div>`;
    chatbox_output.scrollTop = chatbox_output.scrollHeight;
}

document.getElementById('Sendbutton').addEventListener('click', chatbox);
document.getElementById('question').addEventListener('keypress', e => {
    if (e.key === 'Enter') chatbox();
});
document.getElementById('removebutton').addEventListener('click', () => {
    chatbox_output.innerHTML = '';
});