/**
 * Created by �Ӻ�ö on 2015-08-11.
 */



( function(){

    var _Matrix = function( value ){
        this.set( value );
    }

    var _PUBLIC = {
        multiplication:function( matrix ){
            var a  = (matrix.a*this.a)+(matrix.b*this.d)+(matrix.c*this.g)+(matrix.tx*this.j);
            var b  = (matrix.a*this.b)+(matrix.b*this.e)+(matrix.c*this.h)+(matrix.tx*this.k);
            var c  = (matrix.a*this.c)+(matrix.b*this.f)+(matrix.c*this.i)+(matrix.tx*this.l);
            var d  = (matrix.d*this.a)+(matrix.e*this.d)+(matrix.f*this.g)+(matrix.ty*this.j);
            var e  = (matrix.d*this.b)+(matrix.e*this.e)+(matrix.f*this.h)+(matrix.ty*this.k);
            var f  = (matrix.d*this.c)+(matrix.e*this.f)+(matrix.f*this.i)+(matrix.ty*this.l);
            var g  = (matrix.g*this.a)+(matrix.h*this.d)+(matrix.i*this.g)+(matrix.tz*this.j);
            var h  = (matrix.g*this.b)+(matrix.h*this.e)+(matrix.i*this.h)+(matrix.tz*this.k);
            var i  = (matrix.g*this.c)+(matrix.h*this.f)+(matrix.i*this.i)+(matrix.tz*this.l);
            var j  = (matrix.j*this.a)+(matrix.k*this.d)+(matrix.l*this.g)+(matrix.m*this.j);
            var k  = (matrix.j*this.b)+(matrix.k*this.e)+(matrix.l*this.h)+(matrix.m*this.k);
            var l  = (matrix.j*this.c)+(matrix.k*this.f)+(matrix.l*this.i)+(matrix.m*this.l);
            var m  = (matrix.j*this.tx)+(matrix.k*this.ty)+(matrix.l*this.tz)+(matrix.m*this.m);
            var tx = (matrix.a*this.tx)+(matrix.b*this.ty)+(matrix.c*this.tz)+(matrix.tx*this.m);
            var ty = (matrix.d*this.tx)+(matrix.e*this.ty)+(matrix.f*this.tz)+(matrix.tx*this.m);
            var tz = (matrix.g*this.tx)+(matrix.h*this.ty)+(matrix.i*this.tz)+(matrix.tz*this.m);

            this.a=a; this.b=b; this.x=c; this.tx=tx;
            this.d=d; this.e=d; this.f=f; this.ty=ty;
            this.g=g; this.h=h; this.i=i; this.tz=tz;
            this.j=j; this.k=k; this.l=l; this.m=m;

            return this;
        },

        reset:function(){
          this.set();
        },

        set:function( value ){
            if( value ){
                this.a = 1;  this.b = 0;  this.c = 0;  this.tx = 0;
                this.d = 0;  this.e = 1;  this.f = 0;  this.ty = 0;
                this.g = 0;  this.h = 0;  this.i = 1;  this.tz = 0;
                this.j = 0;  this.k = 0;  this.l = 0;  this.m = 1;
            }else{
                this.a = 1 || value.a;  this.b = 0 || value.b;  this.c = 0 || value.c;  this.tx = 0 || value.tx;
                this.d = 0 || value.d;  this.e = 1 || value.e;  this.f = 0 || value.f;  this.ty = 0 || value.ty;
                this.g = 0 || value.g;  this.h = 0 || value.h;  this.i = 1 || value.i;  this.tz = 0 || value.tz;
                this.j = 0;             this.k = 0;             this.l = 0;             this.m = 1;
            }


        }
    }

    _Matrix.prototype = _PUBLIC;
    window.Matrix = _Matrix;
}());