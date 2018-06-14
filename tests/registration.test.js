describe('The RegiStration function', function(){

    it('must show that a person is greeted in IsiXhosa ', function(){
      var Reg = RegiStration({"CA 3443":0,"CA 87643":0,"CA 3973":0});

      assert.deepEqual({"CA 3443": 0 ,"CA 87643":0 , "CA 3973":0},Reg.regMap());


    });
});
