/**
 * Created by �Ӻ�ö on 2015-08-11.
 */



( function(){

    var _Matrix = function() {
        this.reset();
    }

    var _PUBLIC = {
        multiplication:function( matrix ){
            /*
             a,b,c,tx        a,b,c,tx
             d,e,f,ty    x   d,e,f,ty
             g,h,i,tz        g,h,i,tz
             j,k,l,m         j,k,l,m
             */
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
            var ty = (matrix.d*this.tx)+(matrix.e*this.ty)+(matrix.f*this.tz)+(matrix.ty*this.m);
            var tz = (matrix.g*this.tx)+(matrix.h*this.ty)+(matrix.i*this.tz)+(matrix.tz*this.m);

            this.a=a; this.b=b; this.c=c; this.tx=tx;
            this.d=d; this.e=e; this.f=f; this.ty=ty;
            this.g=g; this.h=h; this.i=i; this.tz=tz;
            this.j=j; this.k=k; this.l=l; this.m=m;
            return this;
        },

        reset:function(){
          this.set(
              1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0 ,0 ,0, 1
          );
        },

        set:function(
                a,b,c,tx,
                d,e,f,ty,
                g,h,i,tz,
                j,k,l,m ){
            this.a = a;  this.b = b;  this.c = c;  this.tx = tx;
            this.d = d;  this.e = e;  this.f = f;  this.ty = ty;
            this.g = g;  this.h = h;  this.i = i;  this.tz = tz;
            this.j = j;  this.k = k;  this.l = l;  this.m = m;


        }
    }

    _Matrix.prototype = _PUBLIC;
    window.Matrix = _Matrix;
}());