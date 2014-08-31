describe('App', function(){

    var App;

    beforeEach(function(done){

        require([$d.project + '/App', 'plugins'], function (_App) {

            App = _App;
            $('body').append('<div id="application-place-holder"></div>');
            done();

        });

    });

    it('should have a router ', function(){

        App.initialize($('#application-place-holder'));
        //expect(App.router).toBeInstanceOf(Backbone.Router);

    });

});