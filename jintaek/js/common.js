
//console log
function log () {
    'use strict';
    if (typeof console !== 'undefined') {
        if (typeof console.log === 'function') {
            console && console.log.apply(console, arguments);
        }
        else if (typeof console !== 'undefined') {
            for (var i = 0; i < arguments.length; i++) {
                console.log(arguments[i]);
            }
        }
    }
};

$(document).ready(function() {
    $('.prettyprint').html(function(i,h){
        return h.replace(/[<>\"\'\t\n]/g, function(m) { return {
            '<' : '&lt;',
            '>' : '&gt;',
            "'" : '&#39;',
            '"' : '&quot;',
            '\t': '  ',
            '\n': '<br/>' // needed for IE
        }[m]});
    });
});


