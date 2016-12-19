$.ajax({
    url: "http://ipinfo.io/json",
    dataType: "jsonp",
    success: function(data, status, xhr) {
        var result = data.city;
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${result}&APPID=6350735645c6beef3f293d34b73060e5`,
            dataType: "jsonp",
            success: function(data, status, xhr) {
                console.log(data);
                render(data.name, data.sys.country, data.main.temp, data.weather[0].main, data.weather[0].main);
            }
        })
    }
});

function render(city, country, temp, weather, icon) {
    if (weather == "Clouds") {
        icon = "Y";
    }
    if (weather == "Rains") {
        icon = "R";
    }
    if (weather == "Clear") {
        icon = "1";
    }
    if (weather == "Snow") {
        icon = "W";
    }
    if (weather == "Fog" || weather == "Mist") {
        icon = "M";
    }
    document.querySelector('.c').innerHTML = `<span class = "city">${city},</span><span class="country">${country}</span><div><span class = "temp">${Math.round(temp - 273.15)}</span><span>°</span><button class="convert">C</button></div><div class="weather">${weather}</div><div><i class="icon active" data-icon=${icon}></i></div>`;
    document.querySelector('.convert').addEventListener('click', function() {
        var pun = document.querySelector('.convert').textContent;
        if (pun == "C") {
            var fValue = Math.round(temp * 1.8 - 459.67);
            document.querySelector('.convert').textContent = "F";
            document.querySelector('.temp').textContent = fValue;
        }
        if (pun == "F") {
            var fValue = Math.round(temp - 273.15);
            document.querySelector('.convert').textContent = "C";
            document.querySelector('.temp').textContent = fValue;
        }
    })

}


function request(url, method, body) {
    if (!method) {
        method = 'GET'
    }
    var obj = {
        method: method,
        mode: "cors",
        headers: {
            'X-Mashape-Key': 'lYs60WHzYemshQMRaMCm5BBmpNspp1uO0KWjsneUQdIJ9Tvux2',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    }
    if (method == 'POST' || method == 'DELETE') {
        obj.body = JSON.stringify(body)
    }
    return fetch(url, obj).then(function(response) {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            return response.json();
        }
    }, function(err) {
        console.log(err)
        return Promise.reject(err);
    })
};
