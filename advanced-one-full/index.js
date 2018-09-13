var opticonWorkshop = {
    apiKey: '635dd60132394e6d05519fad6fc47062',
    weather: {},
    makeRequest: function(city) {
        var request = new XMLHttpRequest();
      	var url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +',us&type=like&APPID='+ opticonWorkshop.apiKey +'&units=imperial';
        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                opticonWorkshop.weather.temperature =  Math.floor(data.main.temp_max);
                opticonWorkshop.weather.city = data.name;

                opticonWorkshop.addChanges(extension.selector);
            };
        };
      
      	request.onerror = function() {
  				// There was a connection error of some sort
				};

          
        request.send();
    }, 
    addChanges: function(selector) {
        var utils = optimizely.get('utils');
        utils.waitForElement(selector)
        .then(function(elem) {
            // Prepend the extension html to the body
            var html = extension.$render({
                extension: extension,
                weather: opticonWorkshop.weather,
            });
            elem.insertAdjacentHTML('afterend', html);
        });
    }
};


var city = encodeURI(extension.city).toLowerCase();
if(city) {
 opticonWorkshop.makeRequest(city);
}  


