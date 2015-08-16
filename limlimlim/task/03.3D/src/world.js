/**
 * Created by admin on 15. 8. 12..
 */


( function(){

    function World( canvas ){
        this._canvas = canvas;
        this._context = this._canvas.getContext( '2d' );
        this._childList = [];
        this._childMap = {};
    }


    var _PUBLIC = {
        append:function( name, data ) {
            var model = new window.Model(this._context );
            model.setData(data);
            this._childList.push(model);
            this._childMap[ name ] = model;
            return this;
        },
        getModel:function( name ){
            return this._childMap[ name ];
        },
        render:function(){
            this._canvas.width = this._canvas.width;
            for( var i= 0, count=this._childList.length ; i<count ; i+=1 ){
                this._context.save();
                this._childList[ i].render();
                this._context.restore();
            }
        }
    }

    World.prototype = _PUBLIC;
    window.World = World;
}());