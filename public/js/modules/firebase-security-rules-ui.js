require.config({

    baseUrl: 'javascript',

    shim : {
        backbone : {
            deps : ['jquery', 'underscore'],
            exports : 'Backbone'
        },
        underscore : {
            exports : '_'
        }
    },

    paths: {
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min',
        domReady: '//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady'
    }

});
define(
    'fsr-ui/App',
    [],
    function(){
        return {};
    }
);