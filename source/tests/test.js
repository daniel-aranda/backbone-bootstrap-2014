describe('hello', function(){

    it('world ', function(done){


        require([$d.project + '/App'], function (app) {

            expect(app.name).toBe('hello');
            done();

        });

    });


});