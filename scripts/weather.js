/*
Filename: weather.js
Written : January, 2022
Author  : Md Ishraq Tanzim
Description: This is the javascript file that contains all api calls and functions for updating
the UI.
*/ 

//Variables are declared here
const key ="b8fb0ac8b1ad48cf876163601210110";
const details = document.querySelector('.details');
const form = document.querySelector('form');
const body = document.querySelector('body');
const card = document.querySelector('.card');
const intro =  document.querySelector('.intro');

/*
Name      : getWeather
Type      : async
Parameters: String city (Name of city queried by user)
Return    : JSON 
Description: This function returns the JSON object after calling the weather API.
the UI.
*/ 
const getWeather = async(city) =>{
    const str = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`; 
    const answer = await fetch(str);
    const info = await answer.json();
    console.log(info);
    return info;
}

/*
Name      : updateCard
Parameters: info (JSON object containing info about specific location)
Return    : void 
Description: This function updates the UI with info obtained from the weather API.
the UI.
*/ 
const updateCard = (info) =>{
    details.innerHTML = 
    `<h5 class="my-3">${info.location.name} , ${info.location.country}</h5>
    <div class="display-6 my-4">
        <span>${info.current.temp_c}</span>
        <span>&deg; C</span>
    </div>
    <div class="display-6 my-4">
        <span>${info.current.condition.text}</span>
    </div>
    <div class="display-6 my-4">
     <span>Humidity</span>
     <span>${info.current.humidity} %</span>
    </div>`;
    intro.style.backgroundColor = "transparent";
    if(info.current.is_day!=1) body.style.backgroundImage = "url('assets/night.png')";
    else body.style.backgroundImage = "url('assets/day.jpg')";
}

/*
Event Listener for the user form
Description: The event listener fetches api info after the user submits a location name.
After that, the UI is updated with the newly obtained info
the UI.
*/ 
form.addEventListener('submit', e => {
    e.preventDefault();
    const city = form.city.value.trim();
    form.reset();
    getWeather(city).then(info => updateCard(info))
    .catch(info => {
        details.innerHTML = 
    `<h1>Sorry No Location Found With This name</h1>`;
    });;
});
