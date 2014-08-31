$d = {
    project : 'your-project-name',
    protocol : window.location.protocol === 'https:' ? 'https:' : 'http:'
};
require.config({

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
        plugins: 'plugins'
    }

});
define(
    $d.project + '/App',
    [
        $d.project + '/Router',
        $d.project + '/MainView'
    ],
    function(Router, MainView){

        var $target;
        var _initialized = false;
        var core = {
            router : null,
            mainView : null
        };

        var App = {
            name : 'hello world',
            initialize : initialize,
            destroy : destroy,
            core : core
        };

        function initialize(_$target){

            if( _initialized ){
                throw new Error("Application had been already initialized");
            }

            $target = _$target;

            core.router = new Router();
            core.mainView = new MainView({
                router : core.router
            });

            _initialized = true;
            $target.html(core.mainView.el);
            core.mainView.render();
            Backbone.history.start();
        }

        function destroy(){

            Backbone.history.stop();
            $target.empty();

            core.router = null;
            core.mainView = null;
            $target = null;
            _initialized = false;

        }

        return App;
    }
);
define(
    $d.project + '/Events',
    [],
    function(){

        var Events = {
            ROUTER_DISPLAY_VIEW : 'router_display_view'
        };

        return Events;
    }
);
define(
    $d.project + '/MainView',
    [
        $d.project + '/base/AbstractView',
        $d.project + '/Events'
    ],
    function(AbstractView, Events){

        var MainView = AbstractView.extend({

            router : null,
            $section : null,

            events : function(events){
                var this_events = {};
                return this._super(_.extend(this_events, events));
            },

            delegateEvents : function(){
                this.stopListening();
                this._super();
                this.listenTo(this.router, Events.ROUTER_DISPLAY_VIEW, this.displaySection);
            },

            initialize : function(options){
                this.$el.html('<div><div class="section"></div></div>');

                if( !options.router ){
                    throw new Error('router option is required');
                }
                this.router = options.router;

            },

            render : function(){
                this.$section = this.$('.section');
            },

            displaySection : function(view){
                this.$section.html(view.el);
                view.render();
            }

        });

        return MainView;
    }
);
define(
    $d.project + '/Router',
    [
        'backbone',
        $d.project + '/dashboard/Dashboard',
        $d.project + '/Events'
    ],
    function(Backbone, Dashboard, Events){

        var Router = Backbone.Router.extend({

            routes : {
                "dashboard"                                    : "dashboard",
                "*path"                                        : "defaultRoute"
            },

            defaultRoute : function() {
                this.navigate('dashboard', {trigger: true});
            },

            dashboard : function(){
                var view = new Dashboard();
                this.display(view);
            },

            display : function(view, options){
                options = options || {};
                this.trigger(Events.ROUTER_DISPLAY_VIEW, view, options);
            }

        });

        return Router;
    }
);
define(
    $d.project + '/base/AbstractView',
    [
        'backbone',
        $d.project + '/Events',
        'plugins'
    ],
    function(Backbone, Events){

        var AbstractView = Backbone.View.extend({

            events : function(events){
                return events;
            }

        });

        return AbstractView;
    }
);
define(
    $d.project + '/dashboard/Dashboard',
    [
        $d.project + '/base/AbstractView',
        $d.project + '/Events'
    ],
    function(AbstractView, Events){

        var Dashboard = AbstractView.extend({

            initialize : function(options){
                this.$el.html('<div>hello world!</div>');
            }

        });

        return Dashboard;
    }
);