$d = {
    project : 'your-project-name'
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
        jquery: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        domReady: 'http://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady'
        //TODO: add plugins
    }

});