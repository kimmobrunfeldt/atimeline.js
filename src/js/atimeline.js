;

(function() {

    var pub = {};
    var options = {
        // Template rendering function
        template: _.template,

    };
    var container;


    var bang = pub.bang = function(opts) {
        options = _.extend(options, opts);
        container = _.isString(options.container) ? $(options.container) : options.container;

        createTimelineItems();
    };


    function createTimelineItems() {
        _.each(options.timeline.items, function(item) {
            createTimelineItem(item);
        });
    }

    function createTimelineItem(item) {
        var html = renderItem(item);
        container.append(html);
    }

    function renderItem(item) {
        var templateText = options.timeline.templates[item.type];

        return options.template(templateText, item.data);
    }

    this.atimeline = bang;

}).call(this);
