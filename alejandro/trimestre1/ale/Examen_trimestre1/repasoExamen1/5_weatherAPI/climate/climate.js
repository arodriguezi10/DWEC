fetch('https://api.open-meteo.com/v1/forecast?latitude=39.4765&longitude=-6.3722&hourly=temperature_2m,relative_humidity_2m&timezone=auto&forecast_days=1')
    .then(response => response.json())
    .then(json => {
        printClimate(json)
    });

/*
EXPLICACIÓN 1ª PARTE:

**1. fetch() 
- Hace la petición a la API
- Devuelve una "promesa" (una "promesa de que los datos llegarán")

**2. .then(response => response.json())
- then(): significa que "cuando termines, haz esto"
- response => response.json(): recibe la respuesta "response" y la convierte a json
- =>: fución flecha

**3. .then(json => {printClimate(json)});
- then(): significa que "cuando termines, haz esto"
- json => {printClimate(json)}: cuando el json este listo, ejecuta la función printClimate
                                el json contiene todos los datos del clima
- =>: fución flecha
*/

function printClimate(data){ //data es como la caja que almacena la información

    const container = document.getElementById('container')

    //Para obtener los datos del 'data'
    const latitude = data.latitude;
    const longitude = data.longitude;
    const horaactual = new Date().getHours();
    const temperature = data.hourly.temperature_2m[horaactual + 2];

    //Para mostrar los datos
    container.innerHTML = `
        <p>
            <strong>Ubicación:</strong>
            <br>Latitude: ${latitude}
            <br>Longitude: ${longitude}
            <br><strong>Clima actual (${horaactual} horas):</strong>
            Temperature: ${temperature}°C
        </p>
    `;
}