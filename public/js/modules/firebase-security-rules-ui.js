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
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min'
    }

});

/**
 *
 *
define(
    'fsr-ui/test',
    [],
    function(){
        return {a : 'b'};
    }
);

require(['backbone', 'fsr-ui/test'], function(Backbone, app){
    console.log('yeah',app);
});
*/