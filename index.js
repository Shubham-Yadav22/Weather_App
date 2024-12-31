let btn = document.querySelector(".sb-but");
let search_value; 
let lati, long; 
let temperature = document.querySelector(".temp");
let humidity = document.querySelector(".humid");
let city = document.querySelector(".city");
let windspeed = document.querySelector(".wind-speed");
let windunit = document.querySelector(".wind-unit");
let humidtext = document.querySelector(".humid-text");

// Function for getting data
function getValues() {
    return document.querySelector(".sb").value;
}

async function TellWeather_Without() {
   
    // console.log(search_value);
    try {
        search_value = "Lucknow";
        
        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=Lucknow,%20India&format=json&apiKey=5846eced3e5d4952ac852a83edaa807e`);
        const jsonData = await response.json();


        if (jsonData.results && Array.isArray(jsonData.results) && jsonData.results.length > 0) {
            const firstResult = jsonData.results[0];
            lati = firstResult.lat; 
            long = firstResult.lon; 
            console.log("Latitude and Longitude values updated globally:", lati, long);
        }

         else {
            console.error("No valid results found in the JSON data.");
        }
    
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
    
    try {

        const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${26.8381}&lon=${80.9346001}&appid=184da8999931f15e74d136c917a5aedc&units=metric`);
        const jsonData1 = await response1.json();
        
        const temp = jsonData1.main.temp;
        const name = jsonData1.name ; 
        const humid = jsonData1.main.humidity; 
        const wind_speed = jsonData1.wind.speed ;

        temperature.textContent = `${temp}°C`;
        city.textContent = search_value; 
        humidity.textContent = `${humid} % ` ;
        windspeed.textContent = `${wind_speed} m/s`; 

        windunit.textContent = "Wind Speed";
        humidtext.textContent = "Humidity"
        
    }
    catch (error){
        console.log("Not accesible");
    }

}

TellWeather_Without();





// Add event listener
btn.addEventListener("click", async function TellWeather() {
    search_value  = getValues();
    if (search_value == ""){
        alert("Enter a city ")
    }
    else {
    // console.log(search_value);
    try {
        search_value = getValues(); 
        
        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${search_value},%20India&format=json&apiKey=5846eced3e5d4952ac852a83edaa807e`);
        const jsonData = await response.json();


        if (jsonData.results && Array.isArray(jsonData.results) && jsonData.results.length > 0) {
            const firstResult = jsonData.results[0];
            lati = firstResult.lat; 
            long = firstResult.lon; 
            console.log("Latitude and Longitude values updated globally:", lati, long);
        }

         else {
            console.error("No valid results found in the JSON data.");
        }
    
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
    
    try {

        const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=184da8999931f15e74d136c917a5aedc&units=metric`);
        const jsonData1 = await response1.json();
        
        const temp = jsonData1.main.temp;
        const name = jsonData1.name ; 
        const humid = jsonData1.main.humidity; 
        const wind_speed = jsonData1.wind.speed ;

        temperature.textContent = `${temp}°C`;
        city.textContent = search_value; 
        humidity.textContent = `${humid} % ` ;
        windspeed.textContent = `${wind_speed} m/s`; 

        windunit.textContent = "Wind Speed";
        humidtext.textContent = "Humidity"

        
       
    
    }
    catch (error){
        console.log("Not accesible");
    }
    }









});
