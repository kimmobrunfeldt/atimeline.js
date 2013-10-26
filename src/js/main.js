

(function(){

    var timeline = {
        "options": {
            "timelineWidth": "10px"
        },

        "templates": {
            "project": "<h1>{{ header }}</h1> <p> {{ text }} </p>"
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
        }
      ]
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

        var timelinegrid = TimelineGrid();
        var heights = [50, 10, 30, 20, 50, 10, 30, 5, 50, 100, 30, 200, 30, 20, 10, 50, 25, 50, 30];
        _.each(heights, function(height) {
            var box = timelinegrid.add(height);
            $('.timecontainer').append('<div class="line ' + box.side + '" style="top: ' + box.start + 'px; height: ' + box.height + 'px;"><div class="middle"></div></div>');
            console.log(box);
        });


    });
})();
