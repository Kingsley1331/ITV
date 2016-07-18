describe('testing the initial api call', function(){
  it('make api call', function(done){
      firstRequest(function(){
        done();
      });
    });

  it('the http response should be an object', function(done){
    expect(typeof res).toBe('object');
    done();
  });

});
