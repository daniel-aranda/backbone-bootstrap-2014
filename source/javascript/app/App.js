define(
    $d.project + '/App',
    [
        $d.project + '/Router',
        $d.project + '/MainView'
    ],
    function(Router, MainView){

        var router;
        var $target;
        var mainView;
        var _initialized = false;

        function initialize(_$target){

            if( _initialized ){
                throw new Error("Application had been already initialized");
            }

            $target = _$target;

            router = new Router();
            mainView = new MainView({
                router : router
            });

            _initialized = true;
            $target.html(mainView.el);
            mainView.render();
            Backbone.history.start();
        }

        function destroy(){

            Backbone.history.stop();
            $target.empty();

            router = null;
            mainView = null;
            $target = null;
            _initialized = false;

        }

        var App = {
            name : 'hello world',
            initialize : initialize,
            destroy : destroy
        };

        return App;
    }
);