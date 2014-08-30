$d = {
    project : 'your-project-name',
    protocol : window.location.protocol
};
require.config({

    baseUrl: 'js/',

    shim : {
        backbone : {
            deps : ['jquery', 'underscore'],
            exports : 'Backbone'
        },
        underscore : {
            exports : '_'
        },
        'plugins' : {
            deps : ['jquery', 'backbone']
        }
    },

    paths: {
        jquery: $d.protocol + '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        underscore: $d.protocol + '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        backbone: $d.protocol + '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        domReady: $d.protocol + '//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady',
        plugins: 'plugins.js'
    }

});