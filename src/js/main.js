(function(){

    var timeline = {
      "items": [
        {
          "start": 1000,
          "type": "project",
          "data": {
            "header": "Timeline.js",
            "text": "This project is my newest stuff"
          }
        },
        {
          "start": 1000,
          "type": "project",
          "data": {
            "header": "Kauko",
            "text": "Remote control for any OS"
          }
        }
      ],

      "templates": {
        "project": "<h1>{{ header }}</h1> <p> {{ text }} </p>"
      }
    };


    // Change underscore template syntax similar to Mustache.js
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    $(window).load(function() {


        window.atimeline({
            timeline: timeline,
            container: '#timeline'
        });
    });
})();
