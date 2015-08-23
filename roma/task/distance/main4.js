
( function(){

    var distance = 15;

    function Rect( w, h, z ){
        var w2 = w/2;
        var h2 = h/2;
        var z2 = z/2;
        this.points = [
            { x:-w2, y:h2, z:-z2 },
            { x:w2, y:h2, z:-z2 },
            { x:w2, y:-h2, z:-z2 },
            { x:-w2, y:-h2, z:-z2 },
            { x:-w2, y:h2, z:z2 },
            { x:w2, y:h2, z:z2 },
            { x:w2, y:-h2, z:z2 },
            { x:-w2, y:-h2, z:z2 }
        ];
        this.width = w;
        this.height = h;
    }

    Rect.prototype = {
        getPoints : function( m ){
            /*
            |a, b, c| |x|
            |d, e, f| |y|
            |g, h, i| |z|
             */
            var points = this.points;
            var point;
            var x, y, z, scale = 0;
            var result = null;
            for( var i= 0, count=points.length ; i<count ; i+=1 ){
                point = points[ i ];
                z = point.z;
                x = point.x;
                y = point.y;
                result = {};
                result.x = m.a * x + m.b * y + m.c * z;
                result.y = m.d * x + m.e * y + m.f * z;
                result.z = m.g * x  + m.h * y + m.i * z;
                points[ i ] = result;
            }

            var scalePoints = [];
            for( i= 0, count=points.length ; i<count ; i+=1 ){
                scale = distance / ( distance+points[i].z);
                scalePoints[ i ] = { x:points[ i].x * scale, y:points[ i].y * scale };
            }
            return scalePoints;
        },

        rotateZ:function( a ){
            a = a/180*Math.PI;
            /*
                 | a, b, c || cosA, -sinA, 0 |
                 | d, e, f || sinA, cosA,  0 |
                 | g, h, i ||    0,    0,  1 |
                 */
                var cosA = Math.cos( a );
            var sinA = Math.sin( a );
            return this.getPoints( {
                a : cosA,
                b : -sinA,
                c : 0,
                d : sinA,
                e : cosA,
                f : 0,
                g : 0,
                h : 0,
                i : 1
            } );
        },

        rotateX:function( a ){
            a = a/180*Math.PI;
            /*
             | a, b, c || 1,    0,     0 |
             | d, e, f || 0, cosA, -sinA |
             | g, h, i || 0, sinA,  cosA |
             */
            var cosA = Math.cos( a );
            var sinA = Math.sin( a );
            return this.getPoints( {
                a : 1,
                b : 0,
                c : 0,
                d : 0,
                e : cosA,
                f :  -sinA,
                g : 0,
                h : sinA,
                i : cosA
            } );
        },

        rotateY:function( a ){
            a = a/180*Math.PI;
            /*
             | a, b, c || cosA,  0, -sinA |
             | d, e, f || 0,    1,     0 |
             | g, h, i || sinA, 0,  cosA |
             */
            var cosA = Math.cos( a );
            var sinA = Math.sin( a );
            return this.getPoints( {
                a : cosA,
                b : 0,
                c : -sinA ,
                d : 0,
                e : 1,
                f : 0,
                g : sinA,
                h : 0,
                i : cosA
            } );
        }
    };

    window.Rect = Rect;
}());
