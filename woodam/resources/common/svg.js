define(['jquery'], function ($){
    var svg = {
        /**
         * 원 형태로 그려주는 메소드
         * @param object {
         *     sx : x시작점
          *    , sy : y시작점
          *    , radius : 반지름
          *    , cnt : element총갯수
          *    , ele : 반복할element
          *    , par : 반복한 element룰 붙여 넣을 부모
          *    , wid : element 넓이
          *    , he : elemenet 높이
          *    , fill : 색
         *     }
         * @returns svg
         */
        circlePath : function( set ){
            var defaultSet = {
                sx : 250
                , sy : 250
                , radius : 100
                , cnt : 20
                , ele : document.createElementNS('http://www.w3.org/2000/svg','rect')
                , par : $("svg")
                , wid : 10
                , he : 10
                , fill : "red"
            }
            var initialSet = set ? $.extend( defaultSet, set ) : defaultSet;

            this.radian = (360 * Math.PI/180) / initialSet.cnt; //radians
            var angle = 0;
            var svgEle = $(initialSet.ele );
            var tagName = svgEle.prop("tagName");
            this.wraper = initialSet.par;
            this.sx = initialSet.sx;
            this.sy = initialSet.sy;
            this.cnt = initialSet.cnt;

            for( var i = 0; i < this.cnt; i++ ){
                var dx = this.sx + Math.cos( angle ) * initialSet.radius;
                var dy = this.sy  + Math.sin( angle ) * initialSet.radius;

                var ele = svgEle.clone();

                switch ( tagName ){
                    case "rect" :  ele.attr({ x : dx, y : dy, width: initialSet.wid, height:initialSet.he , fill : initialSet.fill  });
                        break;
                    case "circle" : ele.attr({ cx : dx, cy : dy, r: initialSet.wid , fill : initialSet.fill  });
                        break;
                }
                ele.appendTo( initialSet.par );
                angle += this.radian;
            }
            return this;
        }
       /* , growRadius : function( radius ) {
            var tar = this.wraper.children();
            var rad = radius || 100;
            var angle = 0;
            var radian = 0;

            var set = setInterval(function(){ radian++; animation.call(svg) },50);

            function animation() {
                for (var i = 0; i < this.cnt; i++) {
                    var dx = this.sx + Math.cos(angle) * radian;
                    var dy = this.sy + Math.sin(angle) * radian;

                    tar.eq(i).attr({cx: dx, cy: dy, r: 10, fill: "red"});

                    angle += this.radian;
                }
            }
        }*/
    }

    return svg;
});