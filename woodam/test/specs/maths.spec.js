define([
    'jquery',
    'maths'

],function ($, maths){
    describe('dom�� �ε��ǰ� radians���� �˰� ������', function(){
        it('radians�޼ҵ忡 number���� ������', function() {
            expect(maths.radians(10)).toBeDefined();
        });
    });

});
