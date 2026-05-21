fetch('https://restcountries.com/v3.1/all?fields=name,capital')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error de red al cargar los países.');
        }
        return response.json();
    })
    .then(data => {
        printCountries(data);
    })
    .catch(error => {
        console.error("Fetch failed:", error);
    }); 
    
function printCountries(data){

    const container = document.getElementById('info-paises');
    if (!container) return; // Salir si el contenedor no existe

    let htmlContent = "<h2>Capitales (Primeros 10 Países)</h2><ul>";
    
    // 2. CORRECCIÓN: Iterar sobre el array de países
    // Usamos .slice(0, 10) para no sobrecargar el navegador
    data.slice(0, 10).forEach(country => {
        
        // 3. CORRECCIÓN: La capital es un array (country.capital)
        const countryName = country.name.common;
        const capital = country.capital ? country.capital[0] : "N/A";

        htmlContent += `
             <li>
                 <strong>${countryName}:</strong> ${capital}
             </li>
        `;
    });
    
    htmlContent += "</ul>";

    container.innerHTML = htmlContent;
}
