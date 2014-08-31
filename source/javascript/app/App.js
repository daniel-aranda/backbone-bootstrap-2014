define(
    $d.project + '/App',
    [$d.project + '/Router', $d.project + '/MainView'],
    function(Router, MainView){

        var router = new Router();
        var mainView = new MainView({
            router : router
        });
        var _initialized = false;

        function initialize($target){

            if( _initialized ){
                throw new Error("Application had been already initialized");
            }

            _initialized = true;
            $target.html(mainView.el);
            mainView.render();
            Backbone.history.start();
        }

        var App = {
            name : 'hello world',
            router : router,
            initialize : initialize
        };

        return App;
    }
);