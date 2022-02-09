//API KEY = "db288bff3983a6336a874d8fb3add4ec"

let loc = document.getElementById("location");

let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
});

const getWeather = async (city) => {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db288bff3983a6336a874d8fb3add4ec`,

            { mode: 'cors' }
        );

        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);

    }

    catch (err) {
        alert('city is not found.....!');
    }

};






window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";


            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=db288bff3983a6336a874d8fb3add4ec`

            fetch(api).then((response) => {
                return response.json();
            })

                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];


                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);
                    console.log(data);

                })

        }

        )
    }
})