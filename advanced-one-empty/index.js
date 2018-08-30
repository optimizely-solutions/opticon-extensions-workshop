var opticonWorkshop = {
    weather: {},
    makeRequest: function(city) {
        var request = new XMLHttpRequest();

        // Add URL endpoint to get weather data
        request.open('GET', '', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                // Add data to weather object

                opticonWorkshop.addChanges(extension.selector);
            };
        };
          
        request.send();
    }, 
    addChanges: function(selector) {
        utils.waitForElement(selector)
        .then(function(elem) {
            // Prepend the extension html to the body
            var html = extension.$render({
                extension: extension
                // Add weather data to HTML rendering
            });
            elem.insertAdjacentHTML('afterend', html);
        });
    }
};

var utils = optimizely.get('utils');

// START HERE
// Check if Optimizely has geolocation data available 
// if so, use this information to trigger a request
