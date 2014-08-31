describe('App', function(){

    var App;

    beforeEach(function(done){

        require([$d.project + '/App', 'plugins'], function (_App) {

            App = _App;
            $('body').append('<div id="application-place-holder"></div>');
            done();

        });

    });

    afterEach(function(){
        App.destroy();
    });

    it('should start application', function(){

        App.initialize($('#application-place-holder'));

    });

    it('should re start application', function(){

        App.initialize($('#application-place-holder'));

    });

    it('should throw exception to double start', function(){

        App.initialize($('#application-place-holder'));

        expect(function(){
            App.initialize($('#application-place-holder'));
        }).toThrow(new Error("Application had been already initialized"));

    });

});