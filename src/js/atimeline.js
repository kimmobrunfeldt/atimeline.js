;

(function() {
    var resizeTimeout;
    $(window).resize(function() {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 300);
    });
})();


(function() {

    var pub = {};
    var options = {
        // Template rendering function
        renderTemplate: _.template,

    };
    var container;

    $(window).on('resizeEnd', function() {
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
        var uniq = 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

        return 'timeline-' + uniq;
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
