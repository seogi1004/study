/*!
 * DataVisualiztion Scroll Jquery Plugin.
 *
 * @author		shimgoon ( asojiroa@gmail.com )
 * @version		0.1.0
 * @since		2015.07.18
 */
(function($) {
	var origAppend = $.fn.append;
	$.fn.append = function () {
        return origAppend.apply(this, arguments).trigger("append");
    };
})(jQuery);

function blockContentSelect( disabled ){
	var attributeValue = ( !disabled ) ? "" : "none";
	$('body').css({
		'user-select':attributeValue,
		'-o-user-select':attributeValue,
		'-moz-user-select':attributeValue,
		'-khtml-user-select':attributeValue,
		'-webkit-user-select':attributeValue
	});
}

;(function(){
	(function( $, window, document ){
		"use strict";
		var Plugin,
			defaults,
			pluginNm = "studyScroll";

		defaults = {
			'range':10,
			'width':null,
			'height':null,
			'axis':'y'
		};

		Plugin = (function(){
			function Plugin( $target, options ){
				var $content,
					$scrollbar = null,
					$track = null,
					$thumb = null,
					mousePos = 0,
					thumbPos = 0,
					moveRatio = 0,
					max = 0;
				
				this.element = $target;
				this.opts = $.extend( true, {}, defaults, options );
				this.init();
			}
			return Plugin;
		})();

		Plugin.prototype = {
			init:function(){
				var $element = $(this.element),
					_this = this;
				_this.$content = $element.find( '.scrollContent' );
				if( _this.$content.length < 1 ){ throw Error( "[ERROR] Plugin 을 사용하기 위한 DOM의 구조를 확인해주세요." ); return; }

				this.data = $.data( this );
				// 기본 data
				$.data( this, "containerSize", {
					'w':( this.opts.width === null ) ? $element.width() : this.opts.width,
					'h':( this.opts.height === null ) ? $element.height() : this.opts.height
				});
				$.data( this, "contentSize", {
					'w':_this.$content.width(),
					'h':_this.$content.height()
				});

				/* scroll 적용을 위한 기본 css 적용 */
				$element.css({
					'position':"relative",
					'width':this.data.containerSize.w,
					'height':this.data.containerSize.h,
					'display':"block",
					'overflow':"hidden"
				});
				
				_this.$content.css({
					'top':0,
					'left':0,
					'position':"absolute",
					'display':"block"
				});
				
				_this.opts.axis = _this.opts.axis.toLowerCase();
				if( _this.opts.axis === "yx" ){
				
				} else if( _this.opts.axis === "y" ){
					_this.data.containerSize.w -= _this.opts.range;
				} else if( _this.opts.axis === "x" ){
					
				}
				_this.renderScrollBar();
			},
			renderScrollBar:function(){
				var $element = $(this.element),
					_this = this;
				var scrollbar = "";
				scrollbar += '<div class="verticalScrollbar">';
				scrollbar += '	<div class="track">';
				scrollbar += '		<div class="thumb"></div>';
				scrollbar += '	</div>';
				scrollbar += '</div>';
				$element.bind("append", function(){ 
					// callback
					var thumbSize = parseInt( _this.data.containerSize.h * _this.data.containerSize.h / _this.data.contentSize.h, 10 ); 

					_this.$scrollbar = $(this).find('.verticalScrollbar');
					_this.$track = $(this).find('.track');
					_this.$thumb = $(this).find('.thumb');
					_this.thumbPos = _this.$thumb.position().top;
					_this.max = _this.data.containerSize.h - thumbSize;
					
					_this.$scrollbar .css({
						'width':_this.opts.range + "px",
						'height':_this.data.containerSize.h,
						'top':0,
						'left':_this.data.containerSize.w,
						'position':"absolute"
					});

					_this.$track.css({
						'background-color':"#ccc",
						'width':_this.opts.range + "px",
						'height':_this.data.containerSize.h,
						'postion':"relative",
						'display':"block"
					}).bind( "mousedown.scrollbar", function(e){
						_this.startScrollbar( e, true );
					});

					_this.$thumb.css({
						'background-color':"#525252",
						'width':_this.opts.range + "px",
						'height':thumbSize + "px",
						'top':0,
						'left':0,
						'position':"absolute",
						'display':"block"
					}).bind( "mousedown.scrollbar", function(e){
						e.stopPropagation();
						_this.startScrollbar( e );
					});
					
				});
				$element.append( scrollbar );
			},
			contentScroll:function(){
				var _this = this;
				var pos = ( _this.data.contentSize.h - _this.data.containerSize.h ) * _this.moveRatio * -1;
				_this.$content.css({
					'top':pos + "px"
				});
			},
			startScrollbar:function( e, useTrack ){
				var _this = this;
				blockContentSelect(true);
				
				_this.mousePos = ( useTrack ) ? _this.$thumb.offset().top : e.pageY;

				$(document).bind( "mousemove.scrollbar", function(e){
					_this.dragScrollbar(e); 
				});
                $(document).bind( "mouseup.scrollbar",  function(e){
                	_this.endScrollbar(e); 
                });
                _this.$thumb.bind( "mouseup.scrollbar",  function(e){
                	_this.endScrollbar(e);
                });
                _this.$track.bind( "mouseup.scrollbar",  function(e){
                	_this.endScrollbar(e);
                });

                _this.dragScrollbar( e );
			},
			dragScrollbar:function( e ){
				var _this = this;
				
				var currentMousePos = e.pageY,
					thumbMovePos = parseInt( currentMousePos - _this.mousePos, 10 );
				var pos = _this.thumbPos + thumbMovePos;
				pos = ( pos < 0 ) ? 0 : ( pos > _this.max ) ? _this.max : pos; 
				_this.moveRatio = pos / _this.max;
				_this.$thumb.css({
					'top':pos + "px"
				});
				_this.contentScroll();
			},
			endScrollbar:function( e ){
				var _this = this;
				blockContentSelect(false);
				
				_this.thumbPos = _this.$thumb.position().top;

				$(document).unbind( "mousemove.scrollbar" );
				$(document).unbind( "mouseup.scrollbar" );
				_this.$thumb.unbind( "mouseup.scrollbar" );
				_this.$track.unbind( "mouseup.scrollbar" );
			}
		};

		return $.fn[pluginNm] = function( options ){
			return this.each( function(){
				if( !$.data( this, "plugin_" + pluginNm ) ){
					return $.data( this, "plugin_" + pluginNm, new Plugin( this, options ) );
				}
			});
		};
	})( jQuery, window, document );
}).call(this);