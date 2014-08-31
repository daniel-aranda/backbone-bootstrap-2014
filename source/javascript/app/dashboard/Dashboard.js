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