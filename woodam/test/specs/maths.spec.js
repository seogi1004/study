define([
    'jquery',
    'maths'

],function ($, maths){
    describe('dom이 로딩되고 radians값을 알고 싶을때', function(){
        it('radians메소드에 number값을 던지면', function() {
            expect(maths.radians(10)).toBeDefined();
        });
    });

});
