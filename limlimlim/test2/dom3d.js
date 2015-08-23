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
                x, 0, 0, 0,
                0, y, 0, 0,
                0, 0, z, 0,
                0, 0, 0, 1
            );
            this._matrix.multiplication( this._matrix2 );
            return this;
        },
        render:function(){
            this.$el.css( { transform:_PRIVATE.getTransformData.call( this ), 'z-index': this._z, 'data-index':this._z  }  );
            this._matrix.reset();
            return this;
        }
    }

    var _PRIVATE = {
        getTransformData:function( ){
            var matrix = this._matrix;
            var x = this._x;
            var y = this._y;
            var z = this._z;

            this._x = matrix.a*x + matrix.b*y + matrix.c*z + matrix.tx*1;
            this._y = matrix.d*x + matrix.e*y + matrix.f*z + matrix.ty*1;
            this._z = matrix.g*x + matrix.h*y + matrix.i*z + matrix.tz*1;
            return 'translate3d('+[this._x+'px', this._y+'px', this._z+'px'].join(',')+')';
            //return 'translate('+[this._x+'px', this._y+'px' ].join(',')+')';
        }
    }

    Dom3D.prototype = _PUBLIC;

    window.Dom3D = Dom3D;
}())