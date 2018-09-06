
var opticonWorkshop = {
    // This is the API key for our external API
    apiKey: '635dd60132394e6d05519fad6fc47062',
    // This object stores the data we get back from the API and sends it to the HTML template for rendering
    weather: {},
    // This function makes a request to an external API
    makeRequest: function(city) {
        var request = new XMLHttpRequest();

        // STEP 2
        // Add URL endpoint to get weather data
        // https://api.openweathermap.org/data/2.5/weather?q=Philadelphia,us&APPID=635dd60132394e6d05519fad6fc47062&units=imperial
        request.open('GET', '', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                // STEP 3
                // Add data to weather object

                opticonWorkshop.addChanges(extension.selector);
            };
        };
          
        request.send();
    }, 
    // This function adds the weather HTML element onto the page
    addChanges: function(selector) {
        var utils = optimizely.get('utils');
        utils.waitForElement(selector)
        .then(function(elem) {
            var html = extension.$render({
                extension: extension
                // STEP 4
                // Add weather data to HTML rendering
            });
            elem.insertAdjacentHTML('afterend', html);
        });
    }
};

// STEP 1: START HERE
// Check if Optimizely has geolocation data available 
// if so, use this information to trigger a request

/* Insert condition here */
// Make request to the external API
opticonWorkshop.makeRequest(locationObject.city);

