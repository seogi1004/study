if (typeof jQuery === 'undefined') {
    throw new Error('error');
}

+function ($) {

    "use strict";

    var Scroll = function(element, options){

        this.$element   = $(element);
        this.$container = this.$element.find('.scoll_container')
        this.$contents  = this.$element.find('.contents');
        this.$document  = $(document);

        this.options    = options;

        this.arrowCount = 1;
        this.moveRatio = null;

        this.init();

        this.$element.on('mousewheel', $.proxy(this.wheelScollbar, this));
        this.$element.on('mousedown.scroll', '.thumb', $.proxy(this.dragSCrollbar, this));
        this.$element.on('mousedown', '.track', $.proxy(this.trackScrollbar, this));
        this.$element.on('mousedown', '.arrow', $.proxy(this.arrowScrollbar, this));

    };

    Scroll.DEFAULTS = {
        width : 500,
        height : 250,
        barHeight : 20,
        wstep : 20,
        axis : 'y'
    };

    Scroll.prototype.init = function(){
        this.setContainerStyle();
        this.setScrollStyle();
    };

    //컨테이너
    Scroll.prototype.setContainerStyle = function(){
        this.$element.css({
            'width' : this.options.width,
            'height' : this.options.height
        })
    };

    //스크롤바
    Scroll.prototype.setScrollStyle = function(){
        var $container = this.$element.find('.scroll_container');
        var thumbHeight = Math.max(($container.outerHeight() / $container[0].scrollHeight) * $container.outerHeight(), this.options.barHeight)
        this.$element.find('.thumb').css('height', thumbHeight);

        //console.log($container);
    };

    //화살표
    Scroll.prototype.arrowScrollbar = function(e){

        var $self = $(e.target);
        var $parent = $self.parents('.scrollbar');

        var direction = $self.attr('data-dir') === 'up' ? -1 : 1;
        var moveStep = 20;

        this.doScroll(moveStep * this.arrowCount, 'arrow');

        this.arrowCount++;
    };

    //트랙
    Scroll.prototype.trackScrollbar = function(e){
        if(!$(e.target).hasClass('thumb')){
            var offsetY = e.offsetY;
            this.doScroll(offsetY, 'track');
        }
    };

    //마우스
    Scroll.prototype.wheelScollbar = function(e){

        var $thumb = this.$element.find('.thumb');
        var thumbY = parseFloat($thumb.css('top'));
        var updateY = null;
        var delta = (e.deltaY==1) ? -1 : 1;

        updateY = thumbY + (this.options.wstep * delta);

        $thumb.css('top', updateY);
        this.doScroll(0, 'drag');

    }

    //드래그시
    Scroll.prototype.dragSCrollbar = function(e){

        var that = this;

        var $self = $(e.currentTarget);

        var pageY = e.pageY;
        var thumbY = parseFloat($self.css('top'));

        var max = this.options.height - $self.height();

        this.$document.on('mousemove.scroll', function(e){

            var updateY = thumbY + e.pageY - pageY;
            $self.css('top', updateY);

            that.doScroll(0, 'drag');

            that.$document.on('mouseup.scroll', function(){
                that.$document.off('.scroll');
            });

        });

    };

    //움직임 설정
    Scroll.prototype.doScroll = function(value, type){

        var $track = this.$element.find('.track')
        var $thumb = this.$element.find('.thumb');

        var delta = value;
        var limit = $track.height() - $thumb.height();

        if(type=='drag'){

            delta = parseInt($thumb.css('top')) + value * parseInt(this.options.wstep) / 100 * $thumb.outerHeight();
            delta = Math.min(Math.max(delta, 0), limit);
            delta = (value > 0) ? Math.ceil(delta) : Math.floor(delta);

            $thumb.css({ top: delta + 'px' });
        }

        if(type=='track'){

            delta = value;
            delta = Math.min(Math.max(delta, 0), limit);
            //$thumb.css('top', delta);
            $thumb.animate({'top' : delta}, 300);
        }

        if(type=='arrow'){
            delta = value;
            $thumb.animate({'top' : delta}, 300);
            //alert('고민중......');
        }

        this.moveRatio = (type == 'track') ? delta / limit : parseInt($thumb.css('top')) / limit; //비율
        delta = this.moveRatio * (this.$element.outerHeight() - this.$contents.outerHeight()) //비율 * 실제컨텐츠크기 - 컨테이너크기

        if(type == 'track'){
            this.$contents.animate({
                'top' : delta
            },300)
        }else{
            this.$contents.css('top', delta);
        }


    };

    function Plugin(option) {
        return this.each(function () {

            var $this = $(this);
            var data = $this.data('scroll');
            var options = $.extend({}, Scroll.DEFAULTS, $this.data(), typeof option === 'object' && option);
            if (!data) $this.data('scroll', (data = new Scroll(this, options)));
            if (typeof option === 'string') data[option]();
        });
    }


    $.fn.scroll = Plugin;

}(jQuery);

$(function(){

    //$('.customscroll').scroll({
    //    width:600,
    //    height:200,
    //    wstep:10
    //});

    $('#example1').scroll({
        width:600,
        height:200,
        wstep:10
    });

    $('#example2').scroll({
        width:800,
        height:100,
        wstep:20
    });
});
