/**
 * Created by �Ӻ�ö on 2015-08-11.
 */

( function(){

    var _Polygon = function( context,vertexList){
        this._context = context;
        this._vertexList = vertexList;
        this._matrix = new window.Matrix();
        this._chaged = true;
    }

    var _PUBLIC = {

        transform:function( matrix ){
            this._chaged = true;
            this._matrix.multiplication( matrix );
            return this;
        },

        render:function(){
            if( this._chaged ){
                _PRIVATE.updateVertex.call( this );
                _PRIVATE.drawPath.call( this );
                _PRIVATE.fill.call( this );
                this._chaged = false;
                this._matrix.reset();
            }
        }
    }

    var _PRIVATE = {
        toRadian:function( deg ){ return deg/180 * Math.PI; },

        updateVertex:function(){
            var vtxs = this._vertexList;
            var mtrx = this._matrix;

            for( var i= 0, count=vtxs.length ; i<count ; i+=1 ){
                vtxs[ i ].update( mtrx );
            }
        },
        drawPath:function(){
            var vtxs = this._vertexList;
            var vtx1 = vtxs[0];
            var vtx2 = vtxs[1];
            var vtx3 = vtxs[2];
            var context = this._context;
            context.save();
            context.beginPath();
            context.moveTo( vtx1.x, vtx1.y );
            context.lineTo( vtx2.x, vtx2.y );
            context.lineTo( vtx3.x, vtx3.y );
            context.lineTo( vtx1.x, vtx1.y );
            context.closePath();
            context.stroke();
            context.restore();

        },

        fill:function(){

        }
    }

    _Polygon.prototype = _PUBLIC;
    window.Polygon = _Polygon;
}());