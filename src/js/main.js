
(function(){

    var timeline = {
        "options": {
            "timelineWidth": "10px"
        },

        "templates": {
            "project": "<h1>{{ header }}</h1> <p> {{ text }} </p>",
            "thought": "<p>{{ text }}</p>"
        },

        "items": [
        {
          "start": 1000,
          "type": "project",
          "keywords": ['proudof'],
          "data": {
            "header": "Timeline.js",
            "text": "This project is my newest stuff"
          }
        },
        {
          "start": 1500,
          "type": "project",
          "keywords": ['proudof'],
          "data": {
            "header": "Kauko",
            "text": "Remote control for any OS"
          }
        },
        {
          "start": 2000,
          "type": "project",
          "keywords": ['proudof'],
          "data": {
            "header": "Test",
            "text": "Remote control for any OS"
          }
        },
        {
          "start": 3000,
          "type": "thought",
          "keywords": ['proudof'],
          "data": {
            "text": "This is a thought"
          }
        },
      ]
    };


    // Change underscore template syntax similar to Mustache.js
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };

    $(window).load(function() {

        atimeline({
            timeline: timeline,
            container: '#timeline'
        });

    });
})();
