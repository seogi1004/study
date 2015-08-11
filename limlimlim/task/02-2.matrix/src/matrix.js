/**
 * Created by ¿”∫¥√∂ on 2015-08-11.
 */



( function(){

    var _Matrix = function( value ){
        this.a = 1 || value.a;  this.b = 0 || value.b;  this.c = 0 || value.c;  this.tx = 0 || value.tx;
        this.d = 0 || value.d;  this.e = 1 || value.e;  this.g = 0 || value.g;  this.ty = 0 || value.ty;
        this.h = 0 || value.h;  this.i = 0 || value.i;  this.j = 1 || value.j;  this.k = 0 || value.k;
        this.l = 0 || value.l;  this.m = 0 || value.m;  this.n = 0 || value.n;  this.o = 1 || value.o;
    }

    var _PUBLIC = {
        concat:function( matrix ){



            return this;
        }
    }

    _Matrix.prototype = _PUBLIC;
    window.Polygon = _Matrix;
}());