define(['jquery'], function ($){
    var svg = {
        /**
         * 원 형태로 그려주는 메소드
         * @param object {
         *     sx : x시작점
          *    , sy : y시작점
          *    , radius : 반지름
          *    , breadth : 폭(넓이)
          *    , cnt : element총갯수
          *    , ele : 반복할element
          *    , par : 반복한 element룰 붙여 넣을 부모
         *     }
         * @returns undefined
         */
        circlePath : function( set ){
            var defaultSet = {
                sx : 250
                , sy : 250
                , radius : 100
                , angle : 10
                , cnt : 10
                , ele : "rect"
                , par : $("svg")
            }
            var initialSet = set ? $.extend( defaultSet, set ) : defaultSet;

            var cnt = 360/initialSet.angle;
            var angle = 0;


            for( var i = 0; i < initialSet.cnt; i++ ){
                var dx = initialSet.sx + Math.cos( angle ) * initialSet.radius;
                var dy = initialSet.sy + Math.sin( angle ) * initialSet.radius;

                console.log( dx )

                var ele = initialSet.par.find( initialSet.ele).eq(i).clone();
                ele.attr({ cx : dx, cy : dy })
                ele.appendTo( initialSet.par );
                angle += cnt;

            }

            initialSet.par.find( initialSet.ele).eq(0).remove();

        }
    }

    return svg;
});