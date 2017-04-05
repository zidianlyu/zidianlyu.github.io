$(document).ready(function() {

    //get location info
    $.ajax({
        type: 'GET',
        url: 'https://ipinfo.io/json/',
        success: coordinates
    });

    //coordinates callback
    function coordinates(point) {
        // get lat and lon
        let coords = point.loc.split(',');
        let lat = parseFloat(coords[0]);
        let lon = parseFloat(coords[1]);

        // get city, region, country
        let city = point.city;
        let region = point.region;
        let country = point.country;

        //forecast.io api
        let secretKey = '621a7281a9b5805cccf2d0c2d955a1c7';
        let api = 'https://api.forecast.io/forecast/' + secretKey + '/' + lat + ',' + lon + '?units=si';

        //display city, region and country in home page
        displayLocation(city, region, country);

        //insert location into getWeather function
        getWeather(api);

    } //end coordinates

    function displayLocation(city, region, country) {
        // debugger;
        $.ajax({
            type: 'GET',
            url: 'https://restcountries.eu/rest/v1/alpha?codes=' + country,
            success: function(data) {
                $('.forecast-city').text(city + ', ' + region);
                // $('.forecast-country').text(data[0].name);
            }
        });
    } //end displayLocation

    //get the damn weather
    function getWeather(url) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: weather
        });

        function weather(data) {

            //main forecast
            let temp = Math.round(data.currently.temperature),
                conditions = data.currently.icon.split('-').join(' '),
                icon = data.currently.icon,
                low = Math.round(data.daily.data[0].temperatureMin),
                high = Math.round(data.daily.data[0].temperatureMax);

            //weekly forecast
            for (let i = 1; i < 6; i++) {
                let day = moment.unix(data.daily.data[i].time).format('ddd'),
                    weekIcon = data.daily.data[i].icon,
                    weekCond = data.daily.data[i].icon.split('-').join(' '),
                    weekLow = Math.round(data.daily.data[i].temperatureMin),
                    weekHigh = Math.round(data.daily.data[i].temperatureMax);

                //display weekly weather
                displayWeekly(day, weekIcon, weekCond, weekLow.toFixed(0), weekHigh.toFixed(0));
            }

            //display weather on homepage
            displayWeather(icon, temp.toFixed(0), conditions, low, high);

            //convert daily units
            $('#temp-f').on('click', function() {
                displayWeather(icon, toF(temp.toFixed(0)), conditions, toF(low), toF(high));
                $('#temp-f').prop('disabled', true);
                $('#temp-c').prop('disabled', false);
                $('#temp-weekly').empty();
                // six days weather
                for (let i = 1; i < 6; i++) {
                    let day = moment.unix(data.daily.data[i].time).format('dddd'),
                        weekIcon = data.daily.data[i].icon,
                        weekCond = data.daily.data[i].icon.split('-').join(' '),
                        weekLow = toF(Math.round(data.daily.data[i].temperatureMin)),
                        weekHigh = toF(Math.round(data.daily.data[i].temperatureMax));

                    displayWeekly(day, weekIcon, weekCond, weekLow.toFixed(0), weekHigh.toFixed(0));
                }
            });

            $('#temp-c').on('click', function() {
                displayWeather(icon, temp.toFixed(0), conditions, low, high);
                $('#temp-c').prop('disabled', true);
                $('#temp-f').prop('disabled', false);
                $('#temp-weekly').empty();
                for (let i = 1; i < 6; i++) {
                    let day = moment.unix(data.daily.data[i].time).format('dddd'),
                        weekIcon = data.daily.data[i].icon,
                        weekCond = data.daily.data[i].icon.split('-').join(' '),
                        weekLow = Math.round(data.daily.data[i].temperatureMin),
                        weekHigh = Math.round(data.daily.data[i].temperatureMax);

                    displayWeekly(day, weekIcon, weekCond, weekLow.toFixed(0), weekHigh.toFixed(0));
                }
            });

        } //end weather callback

        function displayWeather(icon, temp, condition, low, high) {
            $('.forecast-icon').addClass('wi wi-forecast-io-' + icon);
            $('.forecast-summary').text(condition);
            $('.temp-l').text(low + '\xB0');
            $('.temp-h').text(high + '\xB0');
            $('.temp-now').text(temp + '\xB0');

        } //end displayWeather

        function displayWeekly(day, icon, condition, low, high) {
            let list = '<p class="day-name">' + day + '</p>';
            list += '<p class="day-icon wi wi-forecast-io-' + icon + '"></p>';
            list += '<p class="day-cond">' + condition + '</p>';
            list += '<p class="day-high">' + '<span class="wi wi-direction-up"></span>' + high + '°, ' + '<span class="wi wi-direction-down"></span>' + low + '°' + '</p>';
            $('#temp-weekly').append('<li class="day">' + list + '</li>');

        } // end display weekly weather

        function toF(temp) {
            return parseInt(temp * (9 / 5) + 32);
        }
    }
});
