/**
 * Created by admin on 15. 8. 20..
 */


( function(){



    function Dom3D( $el ){
        this.$el = $el;
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._matrix = new window.Matrix();
        this._matrix2 = new window.Matrix();
    }

    var _PUBLIC = {
        translate:function( x, y, z ){
            this._matrix2.set(
                1, 0, 0, x,
                0, 1, 0, y,
                0, 0, 1, z,
                0, 0, 0, 1
            );
            this._matrix.multiplication( this._matrix2 );
            return this;
        },
        rotateX:function( value ){
            var cosA = Math.cos( value );
            var sinA = Math.sin( value );
            this._matrix2.set(
                1, 0,    0,     0,
                0, cosA, -sinA, 0,
                0, sinA, cosA,  0,
                0, 0,    0,     1
            );
            this._matrix.multiplication( this._matrix2 );
            return this;
        },
        rotateY:function( value ){
            var cosA = Math.cos( value );
            var sinA = Math.sin( value );
            this._matrix2.set(
                cosA,   0,  -sinA,  0,
                0,      1,      0,  0,
                sinA,   0,   cosA,  0,
                0,      0,      0,  1
            );
            this._matrix.multiplication( this._matrix2 );
            return this;
        },
        rotateZ:function( value ){
            var cosA = Math.cos( value );
            var sinA = Math.sin( value );
            this._matrix2.set(
                cosA,   -sinA,   0,  0,
                sinA,   cosA,   0,  0,
                0,      0,      1,  0,
                0,      0,      0,  1
            );
            this._matrix.multiplication( this._matrix2 );
            return this;
        },
        scale:function( x, y, z ){
            this._matrix2.set(
                x||1, 0, 0, 0,
                0, y||1, 0, 0,
                0, 0, z||1, 0,
                0, 0, 0, 1
            );
            this._matrix.multiplication( this._matrix2 );
            return this;
        },
        render:function(){

            this.$el.css( 'transform', _PRIVATE.getTransformData( this._matrix ) );
            //this._matrix.reset();
            return this;
        }
    }

    var _PRIVATE = {
        getTransformData:function( matrix ){
            var value =
                [
                    matrix.a,   matrix.b,   matrix.c,   0,
                    matrix.d,   matrix.e,   matrix.f,   0,
                    matrix.g,   matrix.h,   matrix.i,   0,
                    matrix.tx,  matrix.ty,  matrix.tz,  1
                ].join( ',' )
            return 'matrix3d('+value+')';
        }
    }

    Dom3D.prototype = _PUBLIC;

    window.Dom3D = Dom3D;
}())