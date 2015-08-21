/**
 * Created by �Ӻ�ö on 2015-08-11.
 */



( function( window ){

    var _Vertex = function( x, y, z ){
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }

    var _PUBLIC = {
        update:function( matrix ){
            /*
            a,b,c,tx        x
            d,e,f,ty    x   y
            g,h,i,tz        z
            j,k,l,m         1
            */
            var x = this.x;
            var y = this.y;
            var z = this.z;

            var resultX = matrix.a*x + matrix.b*y + matrix.c*z + matrix.tx;
            var resultY = matrix.d*x + matrix.e*y + matrix.f*z + matrix.ty;
            var resultZ = matrix.g*x + matrix.h*y + matrix.i*z + matrix.tz;
            this.x = resultX; this.y = resultY; this.z = resultZ;
        }
    }

    _Vertex.prototype = _PUBLIC;
    window.Vertex = _Vertex;
}( window ));