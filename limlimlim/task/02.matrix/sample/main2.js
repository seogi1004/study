
( function(){
    function Rect( w, h ){

        this.points = [
            { x:0, y:0, z:0 },
            { x:w, y:0, z:0 },
            { x:w, y:h, z:0 },
            { x:0, y:h, z:0 }
        ];
        this.width = w;
        this.height = h;
    }

    Rect.prototype = {
        getPoints : function(){
            return this.points;
        },

        rotateZ:function( a ){
            a = a/180*Math.PI;
            /*
             | cosA, -sinA, 0 |     | x |      | x`|
             | sinA, cosA,  0 |  x  | y |   =  | y`|
             |    0,    0,  1 |     | z |   =  | z`|
             */
            var points = this.points;
            var point = null;
            var pointX = 0;
            var pointY = 0;
            var pointZ = 0;
            var cosA = 0;
            var sinA = 0;
            for( var i= 0, count=points.length ; i<count ; i+=1 ){
                point = points[ i ];
                pointX = point.x;
                pointY = point.y;
                pointZ = point.z;
                cosA = Math.cos(a);
                sinA = Math.sin(a);
                point.x = ( cosA * pointX ) + ( -sinA * pointY );
                point.y = ( sinA * pointX ) + ( cosA * pointY );
                point.z = ( 0 * pointX ) + ( 0 * pointY ) + ( 1 * pointZ );
            }

            return this.getPoints();
        },

        rotateX:function( a ){
            a = a/180*Math.PI;
            /*
             | 1,    0,     0 |     | x |      | x`|
             | 0, cosA, -sinA |  x  | y |   =  | y`|
             | 0, sinA,  cosA |     | z |   =  | z`|
             */
            var points = this.points;
            var point = null;
            var pointX = 0;
            var pointY = 0;
            var pointZ = 0;
            var cosA = 0;
            var sinA = 0;
            for( var i= 0, count=points.length ; i<count ; i+=1 ){
                point = points[ i ];
                pointX = point.x;
                pointY = point.y;
                pointZ = point.z;
                cosA = Math.cos(a);
                sinA = Math.sin(a);
                point.x = ( 1 * pointX ) + ( 0 * pointY ) + ( 0 * pointZ );
                point.y = ( 0 * pointX ) + ( cosA * pointY ) + ( -sinA * pointZ ) ;
                point.z = ( 0 * pointX ) + ( sinA * pointY ) + ( cosA * pointZ ) ;
            }

            return this.getPoints();
        },

        rotateY:function( a ){
            a = a/180*Math.PI;
            /*
             | cosA,  0, -sinA |     | x |      | x`|
             |    0,  1,   0   |  x  | y |   =  | y`|
             | sinA,  0,  cosA |     | z |   =  | z`|
             */
            var points = this.points;
            var point = null;
            var pointX = 0;
            var pointY = 0;
            var pointZ = 0;
            var cosA = 0;
            var sinA = 0;
            for( var i= 0, count=points.length ; i<count ; i+=1 ){
                point = points[ i ];
                pointX = point.x;
                pointY = point.y;
                pointZ = point.z;
                cosA = Math.cos(a);
                sinA = Math.sin(a);
                point.x = ( cosA * pointX ) + ( 0 * pointY ) + ( -sinA * pointZ );
                point.y = ( 0 * pointX ) + ( 1 * pointY ) + ( 0 * pointZ );
                point.z = ( sinA * pointX ) + ( 0 * pointY ) + ( cosA * pointZ );
            }

            return this.getPoints();
        }
    }

    window.Rect = Rect;
}());
