var opticonWorkshop = {
    weather: {},
    makeRequest: function(city) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+ city +',us&APPID=635dd60132394e6d05519fad6fc47062&units=imperial', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = JSON.parse(request.responseText);
                opticonWorkshop.weather.temperature =  Math.floor(data.main.temp);
                opticonWorkshop.weather.city = data.name;

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
                extension: extension,
                weather: opticonWorkshop.weather,
            });
            elem.insertAdjacentHTML('afterend', html);
        });
    }
};

var utils = optimizely.get('utils');
if(optimizely.get('visitor') !== undefined) {
  var locationObject = optimizely.get('visitor').location || undefined;
  if(locationObject) {
    opticonWorkshop.makeRequest(location.city);
  }  
}


GITHUB JSON with extension with empty zones 

CREATE GITHUB REPO