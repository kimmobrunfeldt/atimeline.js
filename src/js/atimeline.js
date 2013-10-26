;

(function() {

    var pub = {};
    var options = {
        // Template rendering function
        renderTemplate: _.template,

    };
    var container;

    $(window).resize(function() {
        layout();
    });

    var create = pub.create = function(opts) {
        options = _.extend(options, opts);
        container = _.isString(options.container) ? $(options.container) : options.container;

        createTimelineItems();
    };

    var layout = pub.layout = function() {
        positionTimelineItems();
    };

    function createTimelineItems() {
        _.each(options.timeline.items, function(item, index) {
            createTimelineItem(item);
        });
        positionTimelineItems();

        createTimeline();
    }

    function createTimeline() {
        container.append('<div class="timeline"></div>');
    }

    function createTimelineItem(item) {
        var id = item.id ? item.id : randomId();
        var html = renderItem(item, id);
        container.append(html);
    }

    function positionTimelineItems() {
        var grid = TimelineGrid();
        $('.timeline-item').each(function() {
            positionTimelineItem(grid, $(this));
        });
    }

    function positionTimelineItem(grid, $el) {
        var height = $el.height();
        var node = grid.add(height);
        $el.css('top', node.start);
        var className = node.side === 'left' ? 'timeline-item-left' : 'timeline-item-right';
        $el.removeClass('timeline-item-left timeline-item-right');
        $el.addClass(className);
    }

    function randomId() {
        var currentTime = +new Date();
        return 'timeline-' + currentTime;
    }

    function renderItem(item, id) {
        var templateText = options.timeline.templates[item.type];
        var itemTypeClass = 'timeline-' + item.type;
        var html = '<div id="' + id + '" class="timeline-item ' +
            itemTypeClass + '">' +
            options.renderTemplate(templateText, item.data) +
            '<div class="timeline-pointer"></div>' +
            '</div>';

        return html;
    }

    this.atimeline = create;

}).call(this);
