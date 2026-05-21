
fetch('https://api.open-meteo.com/v1/forecast?latitude=39.4765&longitude=-6.3722&hourly=temperature_2m,relative_humidity_2m&timezone=auto&forecast_days=1')
  .then(response => response.json()) 
  .then(json => {
    printWeather(json);
  });

function printWeather(data) {
  const container = document.getElementById('container')

  const l = data.latitude;
  container.innerText = "latitude:" + l+ "\n";

  horaactual = new Date().getHours();
  container.innerText = container.innerText + data.hourly.temperature_2m[horaactual+2];

/*
  const clima = data.current_weather;
  container.innerText = clima
*/
}



