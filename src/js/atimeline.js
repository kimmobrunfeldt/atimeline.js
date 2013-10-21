;

(function() {

    var pub = {};
    var options = {
        // Template rendering function
        template: _.template,

    };
    var container;


    var create = pub.create = function(opts) {
        options = _.extend(options, opts);
        container = _.isString(options.container) ? $(options.container) : options.container;

        createTimelineItems();
        layoutTimelineItems();
    };

    var render = pub.render = function() {

    };

    function layoutTimelineItems() {
        container.masonry({itemSelector : '.item'});
    }

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
        var itemTypeClass = 'timeline-' + item.type;
        var html = '<div class="timeline-item ' + itemTypeClass + '">' +
            options.template(templateText, item.data) +
            '</div>';

        return html;
    }

    this.atimeline = create;

}).call(this);
