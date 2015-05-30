define([
    'jquery',
    'maths'

],function ($, maths){
    describe("각도를 radians값으로 변환하고싶을때",function(){
        it("maths.radians 메소드에 각도를 number값으로 넘겨주면",function(){
            expect(maths.radians(10)).toBeDefined();
        })
    });

});
