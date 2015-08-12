/**
 * Created by �Ӻ�ö on 2015-08-11.
 */

( function(){

    var _Polygon = function( context/* vertex...*/){
        this._context = context;
        this._vertex = Array.prototype.slice.call( arguments).splice( 1, arguments.length-1);
        this._pointNum = this._vertex.length;
        this._matrix = new window.Matrix();
        this._matrix2 = new window.Matrix();
        this._chaged = false;
    }

    var _PUBLIC = {

        translate:function( x, y, z ){
            this._chaged = true;
            this._matrix2.set( { tx:x||0, ty:y||0, tz:z||0 } );
            this._matrix.multiplication( this._matrix2 );
            return this;
        },

        scale:function( x, y, z ){
            this._chaged = true;
            this._matrix2.set( { a:x||1, e:y||1, i:z||1 } );
            this._matrix.multiplication( this._matrix2 );
            return this;
        },

        rotateX:function( value, unit ){
            this._chaged = true;
            if( unit === 'deg'){ value = _PRIVATE.toRadian( value ); }
            this._matrix2.reset();
            var cosA = Math.cos( value );
            var sinA = Math.sin( value );
            this._matrix2.set({e:cosA, f:-sinA, h:sinA, i:cosA});
            this._matrix.multiplication( this._matrix2 );
            return this;
        },

        rotateY:function( value, unit ){
            this._chaged = true;
            if( unit === 'deg'){ value = _PRIVATE.toRadian( value ); }
            this._matrix2.reset();
            var cosA = Math.cos( value );
            var sinA = Math.sin( value );
            this._matrix2.set({a:cosA, c:-sinA, g:sinA, i:cosA});
            this._matrix.multiplication( this._matrix2 );
            return this;
        },

        rotateZ:function( value, unit ){
            this._chaged = true;
            if( unit === 'deg'){ value = _PRIVATE.toRadian( value ); }
            this._matrix2.reset();
            var cosA = Math.cos( value );
            var sinA = Math.sin( value );
            this._matrix2.set({a:cosA, b:-sinA, d:sinA, e:cosA});
            this._matrix.multiplication( this._matrix2 );
            return this;
        },

        render:function(){
            if( this._chaged ){
                _PRIVATE.updateVertex.call( this );
                _PRIVATE.drawPath.call( this );
                _PRIVATE.fill.call( this );
                this._chaged = false;
            }
        }
    }

    var _PRIVATE = {
        toRadian:function( deg ){ return deg/180 * Math.PI; },

        updateVertex:function(){
            var vtxs = this._vertex;
            var mtrx = this._matrix;
            for( var i= 0, count=vtxs.length ; i<count ; i+=1 ){
                vtxs[ i ].update( mtrx );
            }
            this._matrix2.reset();
        },

        drawPath:function(){
            var vtxs = this._vertex;
            var vtx;
            for( var i= 0; i<this._pointNum ; i+=1 ){

            }
        },

        fill:function(){

        }
    }

    _Polygon.prototype = _PUBLIC;
    window.Polygon = _Polygon;
}());