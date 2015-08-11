/**
 * Created by ¿”∫¥√∂ on 2015-08-11.
 */



( function(){

    var _Polygon = function( /*[x, y, z ]...*/){
        this._vertex = Array.prototype.slice.call( arguments );
    }

    var _PUBLIC = {
        render:function(){

        }
    }

    _Polygon.prototype = _PUBLIC;
    window.Polygon = _Polygon;
}());