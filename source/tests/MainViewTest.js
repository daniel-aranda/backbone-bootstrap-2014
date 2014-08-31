describe('App', function(){

    var MainView;
    var Router;
    var Events;

    beforeEach(function(done){

        require([
            $d.project + '/MainView',
            $d.project + '/Router',
            $d.project + '/Events'
        ], function (_MainView, _Router, _Events) {

            MainView = _MainView;
            Router = _Router;
            Events = _Events;
            done();

        });

    });

    afterEach(function(){
    });

    it('should call displaySection on router change', function(){

        var router = new Router();
        var mainView = new MainView({
            router : router
        });

        spyOn(mainView, 'displaySection');
        mainView.delegateEvents();

        Backbone.history.start();

        expect(mainView.displaySection).toHaveBeenCalled();
        expect(mainView.displaySection.calls.count()).toEqual(1);

        Backbone.history.stop();

    });

});