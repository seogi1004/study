

function Matrix(){
    this.setValue( 1, 0, 0, 0, 1, 0, 0, 0, 1 );
}

Matrix.prototype = {
    setValue:function( a, b, c, d, e, f, g, h, i ){
        this.a = a; this.b = b; this.c = c;
        this.d = d; this.e = e; this.f = f;
        this.g = g; this.h = h; this.i = i;
    },
    concat:function( matrix ) {
        if( matrix === null ) return;
        var temp = {};
        /*
        | this.a, this.b, this.c |     | matrix.a, matrix.b, matrix.c |
        | this.d, this.e, this.f |  x  | matrix.d, matrix.e, matrix.f |
        | this.g, this.h, this.i |     | matrix.g, matrix.h, matrix.i |
        */
        temp.a = this.a * matrix.a + this.b * matrix.d + this.c * matrix.g;
        temp.b = this.a * matrix.b + this.b * matrix.e + this.c * matrix.h;
        temp.c = this.a * matrix.c + this.b * matrix.f + this.c * matrix.i;

        temp.d = this.d * matrix.a + this.e * matrix.d + this.f * matrix.g;
        temp.e = this.d * matrix.b + this.e * matrix.e + this.f * matrix.h;
        temp.f = this.d * matrix.c + this.e * matrix.f + this.f * matrix.i;

        temp.g = this.g * matrix.a + this.h * matrix.d + this.i * matrix.g;
        temp.h = this.g * matrix.b + this.h * matrix.e + this.i * matrix.h;
        temp.i = this.g * matrix.c + this.h * matrix.f + this.i * matrix.i;

        this.a = temp.a;
        this.b = temp.b;
        this.c = temp.c;
        this.d = temp.d;
        this.e = temp.e;
        this.f = temp.f;
        this.g = temp.g;
        this.h = temp.h;
        this.i = temp.i;

    },
    rotateX:function( ang ){
        /*
         | 1,    0,      0     |
         | 0,  cos(a), -sin(a) |
         | 0,  sin(a), cos(a)  |
         */
        var matrix = new Matrix();
        var cosA = Math.cos( ang );
        var sinA = Math.sin( ang );
        matrix.setValue( 1, 0, 0, 0, cosA, -sinA, 0, sinA, cosA );
        this.concat( matrix );
    },
    rotateY:function( ang ){
        /*
         | cos(a),  0,  -sin(a) |
         |   0,     1,     0    |
         | sin(a),  0,   cos(a) |
         */
        var matrix = new Matrix();
        var cosA = Math.cos( ang );
        var sinA = Math.sin( ang );
        matrix.setValue( cosA, 0, -sinA, 0, 1, 0, sinA, 0, cosA );
        this.concat( matrix );
    },
    rotateZ:function( ang ){
        /*
         | cos(a),  -sin(a),   0 |
         | sin(a),  cos(a),    1 |
         |   0,       0,       1 |
         */
        var matrix = new Matrix();
        var cosA = Math.cos( ang );
        var sinA = Math.sin( ang );
        matrix.setValue( cosA, -sinA, 0, sinA, cosA, 0, 0, 0, 1 );
        this.concat( matrix );
    },
    transform:function( vtx ){
        var result = [];
        var x = vtx[ 0 ];
        var y = vtx[ 1 ];
        var z = vtx[ 2 ];
        /*
        | a, b, c |       | x |
        | d, e, f |   x   | y |
        | g, h, i |       | z |
         */
        result[ 0 ] = this.a * x + this.b * y + this.c * z;
        result[ 1 ] = this.d * x + this.e * y + this.f * z;
        result[ 2 ] = this.g * x + this.h * y + this.i * z;
        return result;
    }
};

