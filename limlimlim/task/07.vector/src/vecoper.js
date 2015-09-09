/**
 * Created by admin on 15. 9. 9..
 */

window.vecoper = {

    sum:function( /* vertors */){
        var x = 0;
        var y = 0;
        var result = new Vec();
        for( var i= 0, count=arguments.length ; i<count ; i+=1 ){
            var v = arguments[ i ];
            x += v.get( 'x' );
            y += v.get( 'y' );
        }
        return result.setPosition( x, y );
    },

    sub:function(){
        var x = 0;
        var y = 0;
        var result = new Vec();
        for( var i= 0, count=arguments.length ; i<count ; i+=1 ){
            var v = arguments[ i ];
            x -= v.get( 'x' );
            y -= v.get( 'y' );
        }
        return result.setPosition( x, y );
    },

    inn:function(){

    },

    crs:function(){

    }
}