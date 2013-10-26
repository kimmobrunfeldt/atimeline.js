/*
if (typeof define !== 'function') { var define = require('amdefine')(module, require); }

define(['utils'], function(utils) {
*/
var TimelineGrid = (function(options) {
        /*
        Module to help positioning boxes on a vertical timeline.
        Boxes are added as tightly as possible while keeping chronological
        order.

                     o              Node terms
              ----   |
             |  1 |->|   ----      <----- start
              ----   |<-| 2  |     <----- middle
              ----   |   ----      <----- end
             |  3 |->|
              ----   |

        Calling this module with options returns a new "instance" of TimelineGrid.
        Each instance keeps its own state.
        */

        var pub = {};

        options = _.extend({
            // Padding in start of the timeline.
            timelinePaddingPx: 20,

            // Margin that should be left between boxes at minimum.
            boxMarginPx: 10,

            // Margin that should be left between timeline pointers at minimum.
            lineMarginPx: 20,

            // Which side should be started from
            startSide: 'left'

        }, options);

        // Example node: {side: 'left', 'start': 10, 'middle': 30, 'end': 40}
        var _nodes = [];

        var add = pub.add = function(height) {
            return _nodes.length === 0 ? addFirst(height) : append(height);
        };

        var nodes = pub.nodes = function() {
            return _nodes;
        };

        function addFirst(height) {
            var node = createNode(options.startSide, options.timelinePaddingPx, height);
            _nodes.push(node);
            return node;
        }

        function append(height) {
            var side, newMiddle, lastMiddle, end;

            var left = lastLeft();
            var right = lastRight();
            var leftEnd = left !== null ? left.end : 0;
            var rightEnd = right !== null ? right.end : 0;

            if (leftEnd < rightEnd) {
                side = 'left';
                lastMiddle = right !== null ? right.middle : 0;
                newMiddle = newBoxMiddle(lastMiddle, leftEnd, height);
            } else if (leftEnd === rightEnd) {
                // If the boxes are at same level, favor the starting side
                side = options.startSide;
                newMiddle = leftEnd + height;
            } else {
                side = 'right';
                lastMiddle = left !== null ? left.middle : 0;
                newMiddle = newBoxMiddle(lastMiddle, rightEnd, height);
            }

            var node = createNode(side, newMiddle - height / 2, height);
            _nodes.push(node);
            return node;
        }

        // Calculates middle position for new box to be added
        function newBoxMiddle(lastMiddle, lastBoxEnd, height) {
            var boxMiddle = lastMiddle + options.lineMarginPx;

            // If the new box overlaps a previous box
            if (boxMiddle - height / 2 < lastBoxEnd + options.boxMarginPx) {
                // The new box must be aligned so the boxes don't overlap
                boxMiddle = lastBoxEnd + options.boxMarginPx + height / 2;
            }
            return boxMiddle;
        }

        function lastLeft() {
            return lastOnSide('left');
        }

        function lastRight() {
            return lastOnSide('right');
        }

        function lastOnSide(side) {
            var node = null;

            for (var i = _nodes.length - 1; i >= 0; i--) {
                 if (_nodes[i].side === side) {
                    node = _nodes[i];
                    break;
                 }
            }

            return node;
        }

        function createNode(side, start, height) {
            var end = start + height;
            var middle = start + (end - start) / 2;
            return {side: side, start: start, middle: middle, end: end, height: height};
        }

        return pub;
    });
/*
    return {TimelineGrid: TimelineGrid};
});

*/
