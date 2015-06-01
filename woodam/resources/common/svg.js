define(['jquery'], function ($){
    var svg = {
        /**
         * 원 형태로 그려주는 메소드
         * @param object { sx : x시작점, sy : y시작점, radius : 반지름, breadth : 폭(넓이) }
         * @returns undefined
         */
        circlePath : function( set ){
            var defaultSet = {
                sx : 250
                , sy : 250
                , radius : 100
                , angle : 10
            }
            var initialSet = set ? $.extend( defaultSet, set ) : defaultSet;


        }
    }
});