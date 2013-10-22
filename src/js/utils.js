if (typeof define !== 'function') { var define = require('amdefine')(module, require); }

define([], function() {
    var pub = {};

    // Taken from underscore.js
    // Extend a given object with all the properties in passed-in object(s).
    var extend = pub.extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };


    return pub;
});