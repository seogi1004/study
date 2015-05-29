define(['jquery'], function ($){
    var matchs = {
        /**
         * radians값을 구하는 메소드
         * @param number
         * @returns radians 타입에 number값 리턴
         */
        radians : function( number ){
            rda =  number * Math.PI/180;
            return rda;
        }
    }
    return matchs;
});