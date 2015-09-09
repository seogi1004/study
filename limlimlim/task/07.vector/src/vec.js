/**
 * Created by admin on 15. 9. 9..
 */


(function(){

    function Vec( d, l ){
        this.d = d || 0;
        this.l = l || 0;
        this.x = 0;
        this.y = 0;
        PRIVATE.updatePosition.call( this );
    }


    var PUBLIC = {
        setPosition : function( x, y ){
            this.x = x;
            this.y = y;
            PRIVATE.updateDirection.call( this );
            PRIVATE.updateLength.call( this );
            return this;
        },

        setDirection : function( value ){
            this.d = value;
            PRIVATE.updatePosition.call( this );
            return this;
        },

        setLength : function( value ){
            this.l = value;
            PRIVATE.updatePosition.call( this );
            return this;
        },

        get : function( key ){
            return this[ key ];
        }
    }

    var PRIVATE = {
        updatePosition:function(){
            this.x = this.l * Math.cos( this.d );
            this.y = this.l * Math.sin( this.d );
        },

        updateDirection:function(){
            this.d = Math.atan2( this.x, this.y );
        },

        updateLength:function(){
            var x = this.x;
            var y = this.y;
            this.l = Math.sqrt( (x*x) + (y*y) );
        }
    };

    Vec.prototype = PUBLIC;
    window.Vec = Vec;
}())