
( function(){
    function Rect( w, h ){

        this.points = [
            { x:0, y:0 },
            { x:w, y:0 },
            { x:w, y:h },
            { x:0, y:h }
        ];
        this.width = w;
        this.height = h;
    }

    Rect.prototype = {
        getPoints : function(){
            return this.points;
        },
        translate : function( x, y ){
            /*
            | 1, 0, x |     | x |      | x`|
            | 0, 1, y |  x  | y |   =  | y`|
                            | 1 |      | 1 |
             */
            var points = this.points;
            var point = null;
            var pointX = 0;
            var pointY = 0;
            for( var i= 0, count=points.length ; i<count ; i+=1 ){
                point = points[ i ];
                pointX = point.x;
                pointY = point.y;
                point.x = ( 1 * pointX ) + ( 0 * pointY ) + ( x * 1 );
                point.y = ( 0 * pointX ) + ( 1 * pointY ) + ( y * 1 );
            }

            return this.getPoints();
        },
        scale:function( sx, sy ){
            /*
             | sx, 0 |     | x |      | x`|
             | 0, sy |  x  | y |   =  | y`|
             */
            var points = this.points;
            var point = null;
            var pointX = 0;
            var pointY = 0;
            for( var i= 0, count=points.length ; i<count ; i+=1 ){
                point = points[ i ];
                pointX = point.x;
                pointY = point.y;
                point.x = ( sx * pointX ) + ( 0 * pointY );
                point.y = ( 0 * pointX ) + ( sy * pointY );
            }

            return this.getPoints();
        },
        rotate:function( a ){
            a = a/180*Math.PI;
            /*
             | cosA, -sinA |     | x |      | x`|
             | sinA, cosA  |  x  | y |   =  | y`|
             */
            var points = this.points;
            var point = null;
            var pointX = 0;
            var pointY = 0;
            var cosA = 0;
            var sinA = 0;
            for( var i= 0, count=points.length ; i<count ; i+=1 ){
                point = points[ i ];
                pointX = point.x;
                pointY = point.y;
                cosA = Math.cos(a);
                sinA = Math.sin(a);
                point.x = ( cosA * pointX ) + ( -sinA * pointY );
                point.y = ( sinA * pointX ) + ( cosA * pointY );
            }

            return this.getPoints();
        }
    }

    window.Rect = Rect;
}());
