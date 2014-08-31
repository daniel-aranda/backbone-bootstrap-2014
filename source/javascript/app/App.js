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