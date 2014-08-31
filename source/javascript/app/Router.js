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