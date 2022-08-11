var APIKey = '669b73b56a8f6db287f2b8beca5e8a18';
var city = $('#search-button');
//Create Time Variables
var date_raw = new Date();
var weekday = new Array(14);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
weekday[7] = "Sunday";
weekday[8] = "Monday";
weekday[9] = "Tuesday";
weekday[10] = "Wednesday";
weekday[11] = "Thursday";
weekday[12] = "Friday";
weekday[13] = "Saturday";
var d = new Date();
var date = date_raw.getDate();
var month = date_raw.getMonth();
var day = weekday[d.getDay()];
var year = date_raw.getFullYear();
var today = month + '/' + date + '/' + year;
var day1 = weekday[d.getDay()+1];
var day2 = weekday[d.getDay()+2];
var day3 = weekday[d.getDay()+3];
var day4 = weekday[d.getDay()+4];
var day5 = weekday[d.getDay()+5];
//Establish starting cities in boxes
var city1 = 'New York';
var city2 = 'Los Angeles';
var city3 = 'Phoenix';
var city4 = 'Detroit';
var city5 = 'Miami';
$('#city1').html(city1);
$('#city2').html(city2);
$('#city3').html(city3);
$('#city4').html(city4);
$('#city5').html(city5);
//Grabbing last city searched to appear first
var storedCity =localStorage.getItem('lastCity');

if (storedCity != null) {
    searchParam = storedCity;
    getAPI(searchParam);
}
else {
    searchParam = 'Salt Lake City';
    getAPI(searchParam);
}




$('#citySubmit').click(function (event) {
    event.preventDefault();
    var searchParam = $('#city').val();
    getAPI(searchParam);
    
    if (city5) {
        city5 = '';
    }
    if (city4) {
        city5 = city4;
    }
    if (city3) {
        city4 = city3;
    }
    if (city2) {
        city3 = city2;
    }
    if (city1) {
        city2 = city1;
    }
    city1 = searchParam;
})
$('#city1').click(function (event) {
    event.preventDefault();
    var searchParam = city1;
    getAPI(searchParam);
})
$('#city2').click(function (event) {
    event.preventDefault();
    var searchParam = city2;
    getAPI(searchParam);
})
$('#city3').click(function (event) {
    event.preventDefault();
    var searchParam = city3;
    getAPI(searchParam);
})
$('#city4').click(function (event) {
    event.preventDefault();
    var searchParam = city4;
    getAPI(searchParam);
})
$('#city5').click(function (event) {
    event.preventDefault();
    var searchParam = city5;
    getAPI(searchParam);
})


function getAPI(searchParam) {
    var requestURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchParam + "&appid=" + APIKey;
    fetch(requestURL)
    .then(function (response) {
        return response.json();
        
    })
    .then(function (data) {
        console.log(data)    
        populateInfo(data);
    })
    
    
}



function populateInfo(data) {
var cityTemp = convertToFah(data.list[0].main.temp);
var cityName = data.city.name;
var cityWind = data.list[0].wind.speed;
var cityHum = data.list[0].main.humidity; 
var cityWeather = convertSymbol(data.list[0].weather[0].main); 

//console.log(cityWeather);
roundedTemp = Math.round(cityTemp);

$('#cityTemp').html(roundedTemp);
$('#cityName').html(cityName);
$('#cityWind').html(cityWind);
$('#cityHum').html(cityHum);
$('#citySym').html(cityWeather);
$('#today').html(today);
$('#day1').html(day1);
$('#day2').html(day2);
$('#day3').html(day3);
$('#day4').html(day4);
$('#day5').html(day5);
$('#city1').html(city1);
$('#city2').html(city2);
$('#city3').html(city3);
$('#city4').html(city4);
$('#city5').html(city5);



const fiveDay = [{
    'weather': convertSymbol(data.list[1].weather[0].main),
    'temperature': Math.round(convertToFah(data.list[1].main.temp)),
    'wind': data.list[1].wind.speed,
    'humidity': data.list[1].main.humidity
}, {
    'weather': convertSymbol(data.list[2].weather[0].main),
    'temperature': Math.round(convertToFah(data.list[2].main.temp)),
    'wind': data.list[2].wind.speed,
    'humidity': data.list[2].main.humidity
}, {
    'weather': convertSymbol(data.list[3].weather[0].main),
    'temperature': Math.round(convertToFah(data.list[3].main.temp)),
    'wind': data.list[3].wind.speed,
    'humidity': data.list[3].main.humidity
}, {
    'weather': convertSymbol(data.list[4].weather[0].main),
    'temperature': Math.round(convertToFah(data.list[4].main.temp)),
    'wind': data.list[4].wind.speed,
    'humidity': data.list[4].main.humidity
}, {
    'weather': convertSymbol(data.list[5].weather[0].main),
    'temperature': Math.round(convertToFah(data.list[5].main.temp)),
    'wind': data.list[5].wind.speed,
    'humidity': data.list[5].main.humidity
}
]

    function pushSubDays() {
        $('#day0-container').empty();
        $('#day1-container').empty();
        $('#day2-container').empty();
        $('#day3-container').empty();
        $('#day4-container').empty();

        
        $('#day0-container').append(`<div> ${fiveDay[0].weather} </div> <li> Temp: ${fiveDay[0].temperature}° F </li>
            <li> Wind: ${fiveDay[0].wind} MPH</li><li> Humidity: ${fiveDay[0].humidity}% </li>`);
        $('#day1-container').append(`<div> ${fiveDay[1].weather} </div> <li> Temp: ${fiveDay[1].temperature}° F </li>
            <li> Wind: ${fiveDay[1].wind} MPH</li><li> Humidity: ${fiveDay[1].humidity}% </li>`);
        $('#day2-container').append(`<div> ${fiveDay[2].weather} </div> <li> Temp: ${fiveDay[2].temperature}° F </li>
            <li> Wind: ${fiveDay[2].wind} MPH</li><li> Humidity: ${fiveDay[2].humidity}% </li>`);
        $('#day3-container').append(`<div> ${fiveDay[3].weather} </div> <li> Temp: ${fiveDay[3].temperature}° F </li>
            <li> Wind: ${fiveDay[3].wind} MPH</li><li> Humidity: ${fiveDay[3].humidity}% </li>`);
        $('#day4-container').append(`<div> ${fiveDay[4].weather} </div> <li> Temp: ${fiveDay[4].temperature}° F </li>
            <li> Wind: ${fiveDay[4].wind} MPH</li><li> Humidity: ${fiveDay[4].humidity}% </li>`);
          
        
    }
    pushSubDays();
    var lastCitySearch = $('#cityName').text();
    localStorage.setItem('lastCity', lastCitySearch);


}


//C 273 less than kelvin 
function convertToFah(cityTemp) {
    var celsius = cityTemp - 273; 
    var fahrenheit = celsius * 9/5 +32; 
    return fahrenheit; 
}
 function convertSymbol(cityWeather) {
    if (cityWeather == 'Rain') {
        var symbol = '☔'
        return symbol;
    }
    else if (cityWeather == 'Clouds') {
        var symbol = '⛅';
        return symbol;
    }
    else if (cityWeather == 'Clear') {
        var symbol = '☀️';
        return symbol;
    }
 }

 
 
 
        
    
    
