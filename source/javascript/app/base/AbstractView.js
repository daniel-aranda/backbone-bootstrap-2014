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