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

        }
    }

    _Vertex.prototype = _PUBLIC;
    window.Vertex = _Vertex;
}( window ));