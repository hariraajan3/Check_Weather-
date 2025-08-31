const weatherForm=document.querySelector(".weatherForm")
const cityInput=document.getElementById("cityInput")
const card=document.querySelector(".card")
const apikey="f0350efd1ad5966f76385c1829697aca";

weatherForm.addEventListener("submit",async event=>{

   event.preventDefault();
   const city=cityInput.value;
   if(city){
     try {
        const weatherData=await getWeather(city)
        displayWeatherInfo(weatherData)
     } 
     catch (error) {
        displayError("Invalid Data. Please enter a city name")
     }
   }
   else{
    card.style.display = "none";
   }
})

async function getWeather(city){
    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response= await fetch(apiUrl);
    if(!response.ok){
        throw new error("could not fetch the data");
    }
    const data=await response.json();
    
    return data

}
function displayWeatherInfo(data){

    const {name:city,
             main:{temp,humidity},
             weather:[{description,id}] } =data
    console.log( {name:city,
        main:{temp,humidity},
        weather:[{description,id}] });
    
    card.textContent="";
    card.style.display="flex";


    const cityDisplay=document.createElement("p")
    const tempDisplay=document.createElement("p")
    const emojiDisplay=document.createElement("p")
    const humidityDisplay=document.createElement("p")
    const weatherDisplay=document.createElement("p")

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    emojiDisplay.textContent=weatherEmoji(id);
    humidityDisplay.textContent=`humidity: ${humidity}%`
    weatherDisplay.textContent=description;
    
    cityDisplay.classList.add("cityDisplay")
    tempDisplay.classList.add("tempDisplay")
    emojiDisplay.classList.add("emojiDisplay")
    humidityDisplay.classList.add("humidityDisplay")
    weatherDisplay.classList.add("weatherDisplay")

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(weatherDisplay)
    card.appendChild(emojiDisplay)



}
function weatherEmoji(id){
   switch(true){
    case (200<=id && 300>id):
        return "⛈";
    case (300<=id && 400>id):
        return "🌧";
    case (500<=id && 600>id):
        return "🌧";
    case (600<=id && 700>id):
        return "❄";
    case (700<=id && 800>id):
        return "🌫";       
    case (id==800):
        return "☀";
    case (800<id && 900>id):
        return "☁";

   }
}
function displayError(message){
   const hi= document.createElement("p")
   hi.textContent=message;
   hi.classList.add("errorDisplay")
   card.style.display="flex"

   card.textContent="";
   card.appendChild(hi);

}