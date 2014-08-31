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