define(['jquery'], function ($){
    var matchs = {
        /**
         * radians���� ���ϴ� �޼ҵ�
         * @param number
         * @returns radians Ÿ�Կ� number�� ����
         */
        radians : function( number ){
            rda =  number * Math.PI/180;
            return rda;
        }
    }
    return matchs;
});