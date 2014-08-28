describe('hello', function(){

    var app;

    beforeEach(function(done){

        require([$d.project + '/App'], function (_app) {

            app = _app;
            done();

        });

    });

    it('world ', function(){

        expect(app.name).toBe('hello');

    });


});