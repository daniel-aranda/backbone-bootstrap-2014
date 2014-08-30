define(
    $d.project + '/Router',
    ['backbone', $d.project + '/Events'],
    function(Backbone, Events){

        var Router = Backbone.Router.extend({

            routes : {
                "dashboard"                                    : "dashboard",
                "*path"                                        : "defaultRoute"
            },

            defaultRoute : function() {
                this.navigate('dashboard', {trigger: true});
            },

            dashboard : function(){

            },

            display : function(view, options){
                this.trigger(Events.ROUTER_DISPLAY_VIEW, view, options);
            }

        });

        return Router;
    }
);