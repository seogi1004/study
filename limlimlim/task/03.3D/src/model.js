/**
 * Created by ¿”∫¥√∂ on 2015-08-11.
 */


( function (){


    function Model( context ){
        this._context = context;
        this._points = null;
        this._faces = null;
        this._option = _PRIVATE.option;
        this._polygons = [];
    }

    var _PUBLIC = {
        setData:function( data ){
            this._points = data.points;
            this._faces = data.faces;
            _PRIVATE.createPolygon.call( this );
            return this;
        },
        translate:function( x, y, z ){
            var poly = this._polygons;
            var matrix = new window.Matrix();
            matrix.set(
                1, 0, 0, x,
                0, 1, 0, y,
                0, 0, 1, z,
                0, 0, 0, 1
            );
            for( var i= 0, count=poly.length ; i<count ; i+=1 ){
                poly[ i].transform( matrix );
            }
            return this;
        },

        scale:function( x, y, z ){
            var poly = this._polygons;
            var matrix = new window.Matrix();
            matrix.set(
                x||1, 0, 0, 0,
                0, y||1, 0, 0,
                0, 0, z||1, 0,
                0, 0, 0, 1
            );
            for( var i= 0, count=poly.length ; i<count ; i+=1 ){
                poly[ i].transform( matrix );
            }
            return this;
        },

        rotateX:function( value, unit ){
            if( unit === 'deg'){ value = _PRIVATE.toRadian( value ); }
            var poly = this._polygons;
            var cosA = Math.cos( value );
            var sinA = Math.sin( value );
            var matrix = new window.Matrix();
            matrix.set(
                1, 0,    0,     0,
                0, cosA, -sinA, 0,
                0, sinA, cosA,  0,
                0, 0,    0,     1
            );
            for( var i= 0, count=poly.length ; i<count ; i+=1 ){
                poly[ i].transform( matrix );
            }
            return this;
        },

        rotateY:function( value, unit ){
            var poly = this._polygons;
            if( unit === 'deg'){ value = _PRIVATE.toRadian( value ); }
            var poly = this._polygons;
            var cosA = Math.cos( value );
            var sinA = Math.sin( value );
            var matrix = new window.Matrix();
            matrix.set(
                cosA,   0,  -sinA,  0,
                0,      1,      0,  0,
                sinA,   0,   cosA,  0,
                0,      0,      0,  1
            );

            for( var i= 0, count=poly.length ; i<count ; i+=1 ){
                poly[ i].transform( matrix );
            }
            return this;
        },

        rotateZ:function( value, unit ){
            var poly = this._polygons;
            if( unit === 'deg'){ value = _PRIVATE.toRadian( value ); }
            var poly = this._polygons;
            var cosA = Math.cos( value );
            var sinA = Math.sin( value );
            var matrix = new window.Matrix();
            matrix.set(
                cosA,   -sinA,   0,  0,
                sinA,   cosA,   0,  0,
                0,      0,      1,  0,
                0,      0,      0,  1
            );
            for( var i= 0, count=poly.length ; i<count ; i+=1 ){
                poly[ i].transform( matrix );
            }
            return this;
        },
        render:function(){
            var context = this._context;
            var polygons = this._polygons;
            context.strokeStyle = this._option.strokeStyle;
            context.lineWidth = this._option.lineWidth;
            for( var i= 0, count=polygons.length ; i<count ; i+=1 ){
                polygons[ i].render();
            }
        }
    }

    var _PRIVATE = {

        toRadian:function( deg ){ return deg/180 * Math.PI; },

        option:{
            strokeStyle:'silver',
            lineWidth:1
        },

        createPolygon:function(){
            var points = this._points;
            var faces = this._faces;
            var Vertex = window.Vertex;
            var Polygon = window.Polygon;
            for( var i= 0, count=faces.length ; i<count ; i+=1 ){
                var face = faces[ i ];
                var point1 = points[ face[0] ];
                var point2 = points[ face[1] ];
                var point3 = points[ face[2] ];
               this._polygons.push(  new window.Polygon( this._context,
                    [
                        new Vertex( point1.x, point1.y, point1.z ),
                        new Vertex( point2.x, point2.y, point2.z ),
                        new Vertex( point3.x, point3.y, point3.z )
                    ])
               );
            }
        }
    }

    Model.prototype = _PUBLIC;
    window.Model = Model;
}());