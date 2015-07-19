;( function( $ ){

	var _defaultOption = {
		showArrow:false,
		scrollbarSize:15
	};

	$.fn.scroller = function( option ){
		var scrollerOption = $.extend( true, {}, _defaultOption, option );
		return this.each( function(){
			new Scroller( $( this ), scrollerOption  );
		} );
	}

	var _ScrollerHelper = {
		init:function(  $container, option ){
			this._scale =  null;
			this._scrollbarSize = option.scrollbarSize;
			this._$container = $container;
			this._$contents = $container.find( '.contents').css( 'position', 'absolute' );
		},
		createParts:function(  $container, option ){
			var self = this;
			this._$container.append( this._$blank );
			this._vscollbar = new ScrollBar( this._$container, ScrollBar.TYPE_VERTICAL, option, function( value ){ self._$contents.css( 'top', value ); } );
			this._hscollbar = new ScrollBar( this._$container, ScrollBar.TYPE_HORIZONTAL, option, function( value ){ self._$contents.css( 'left', value ); } );
			this._blank = new Blank( $container, this._scrollbarSize, function( value ){
				var width = self._$container.width();
				var height = self._$container.height();
				self._$container.css( { width:width+value[0], height:height+value[1] } );
				self.update();
			} );
		}
	}

	function Scroller( $container, option ){
		_ScrollerHelper.init.call( this, $container, option );
		_ScrollerHelper.createParts.call( this, $container, option );
		this.update();
	}

	Scroller.prototype = {
		update : function(){
			var contanerWidth = this._$container.width();
			var contentsWidth = this._$contents.width();
			var contanerHeight = this._$container.height();
			var contentsHeight = this._$contents.height();
			var isAcriveV = contanerWidth < contentsWidth;
			var isAcriveH = contanerHeight < contentsHeight;
			var isActiveAll = isAcriveV && isAcriveH;

			if( isActiveAll ){
				this._vscollbar.useOffset = true;
				this._hscollbar.useOffset = true;
				this._vscollbar.show();
				this._hscollbar.show();
				this._vscollbar.update();
				this._hscollbar.update();
				this._blank.show();
			}else{
				this._blank.hide();
				this._vscollbar.useOffset = false;
				this._hscollbar.useOffset = false;
				if( isAcriveV ){
					this._vscollbar.show();
					this._vscollbar.update();
				}else{
					this._vscollbar.hide()
				}

				if( isAcriveH ){
					this._hscollbar.show();
					this._hscollbar.update();
				}else{
					this._hscollbar.hide();
				}
			}
		}
	};


	var _ScrollBarHelper = {
		init:function(  $container, type, option ){
			this._showArrow = option.showArrow;
			this._size = option.scrollbarSize;
			this._sizeProp = type === ScrollBar.TYPE_VERTICAL ? 'height' : 'width';
			this._sizeProp2 = type !== ScrollBar.TYPE_VERTICAL ? 'height' : 'width';
			this._posProp = type === ScrollBar.TYPE_VERTICAL ? 'top' : 'left';
			this._posProp2 = type === ScrollBar.TYPE_VERTICAL ? 'Y' : 'X';
			this._posProp3 = type === ScrollBar.TYPE_VERTICAL ? 'right' : 'bottom';
			this._scale = null;
			this._$container = $container;
			this._$contents = $container.find( '.contents' );
			this._limit = 0;
			this.useOffset = false;
		},

		createParts:function( $container, type, option ){
			this._$scrollbar = $( '<div></div>' ).addClass( 'scrollbar' ).addClass( type+'-scrollbar' ).css( this._sizeProp2, this._size ).css( this._posProp3, 0 ).css( 'position', 'absolute') ;
			this._$handle = $( '<div></div>' ).addClass( 'handle').css( this._sizeProp2, '100%').css( 'position', 'absolute' );
			this._$scrollbar.append( this._$handle );
			this._$container.append( this._$scrollbar );
			if( this._showArrow ){
				this._arrow = new Arrow( this._$scrollbar, type, option.scrollbarSize );
			}
		},

		addEvent:function( onchange ){
			var self = this;
			this._$handle.on( 'mousedown', function( event ){
				event.preventDefault();
				var mousePos = event['screen' + self._posProp2 ];
				var handlePos = self._$handle.position()[self._posProp ];
				var $document = $( document )
					.on( 'mousemove', function( event ){
						event.preventDefault()
						var crrMousePos = event['screen' + self._posProp2 ];
						var pos = handlePos + crrMousePos - mousePos;
						if( pos < 0 ){ pos = 0; }
						else if( pos > self._limit ){ pos=self._limit; }
						self._$handle.css( self._posProp, pos );
						onchange( self._scale.get( pos ) );
					})
					.on( 'mouseup', function(){
						event.preventDefault()
						$document.off( 'mousemove' );
						$document.off( 'mouseend' );
					})
			})
		}
	};

	function ScrollBar( $container, type, option, onchange ){
		_ScrollBarHelper.init.call( this, $container, type, option );
		_ScrollBarHelper.createParts.call( this, $container, type, option );
		_ScrollBarHelper.addEvent.call( this, onchange );
		this.update();
	}

	ScrollBar.TYPE_VERTICAL = 'vertical';
	ScrollBar.TYPE_HORIZONTAL = 'horizontal';
	ScrollBar.prototype = {
		update:function(){
			var blankOffset = 0;
			if( this.useOffset ){
				this._$scrollbar.css( this._sizeProp, this._$container[this._sizeProp]()-this._size );
				blankOffset = this._size;
			}else{
				this._$scrollbar.css( this._sizeProp, this._$container[this._sizeProp]() )
			}

			var arrowOffset = this._showArrow ? this._showArrow : 0;
			var scollbarSize = this._$scrollbar[this._sizeProp]();
			var handleSize = this._$handle[this._sizeProp]();
			this._limit = scollbarSize - handleSize;

			var cntnrSize = this._$container[this._sizeProp]();
			var cntnsSize = this._$contents[this._sizeProp]();
			var sizeRatio = cntnrSize / cntnsSize;
			var scrollSize = cntnrSize * sizeRatio;
			this._$handle.css( this._sizeProp, scrollSize );
			////////////////////////////////////@@@@@@@@@@@@@@@@
			this._scale =  new Scale( [ 0, cntnrSize-cntnsSize-blankOffset ], [ 0, this._limit] );
		},
		show: function(){ this._$scrollbar.show(); },
		hide: function(){ this._$scrollbar.hide(); }
	}

	var _BlankHelper = {
		init:function(){},
		createParts:function( $container, size ){
			this._$blank = $( '<div></div>').addClass('blank').css( { position:'absolute', width:size, height:size, right:0, bottom:0 }).hide();
			$container.append( this._$blank );
		},
		addEvent:function(){
			var self = this;
			this._$blank.on( 'mousedown', function( event ){
				event.preventDefault();
				var mouseX = event.screenX;
				var mouseY = event.screenY;
				var $document = $( document )
					.on( 'mousemove', function( event ){
						event.preventDefault();
					})
					.on( 'mouseup', function( event ){
						event.preventDefault();
						var crrMouseX = event.screenX;
						var crrMouseY = event.screenY;
						onResize( [crrMouseX - mouseX, crrMouseY - mouseY ] );
						$document.off( 'mousemove' );
						$document.off( 'mouseend' );
					})
			})
		}
	}
	function Blank( $container, size, onresize ){
		_BlankHelper.createParts.call( this, $container, size  );
		_BlankHelper.addEvent.call( this, onresize );
	}

	Blank.prototype = {
		show:function(){
			this._$blank.show();
		},
		hide:function(){
			this._$blank.hide();
		}
	}

	var _ArrowHelper = {
		init:function( type ){
			this._className1 = type === ScrollBar.TYPE_VERTICAL ? 'up' : 'left';
			this._className2 = type === ScrollBar.TYPE_VERTICAL ? 'down' : 'right';
			this._posProp1 = type === ScrollBar.TYPE_VERTICAL ? 'top' : 'left';
			this._posProp2 = type === ScrollBar.TYPE_VERTICAL ? 'bottom' : 'right';
		},
		createParts:function(){
			this._$upArrow = $( '<div></div>').addClass('arrow').addClass( this._className1 +'-arrow' ).css( { position:'absolute', width:this._size, height:this._size }).css( this._posProp1, 0 );
			this._$downArrow = $( '<div></div>').addClass('arrow').addClass( this._className2 +'-arrow' ).css( { position:'absolute', width:this._size, height:this._size}).css( this._posProp2, 0 );
			this._$container.append( this._$upArrow );
			this._$container.append( this._$downArrow );
		}
	}
	function Arrow( $container, type, size, onchange ){
		this._$container = $container;
		this._size = size;
		_ArrowHelper.init.call( this, type );
		_ArrowHelper.createParts.call( this, $container, type );

	}

	Arrow.prototype = {};

	function Scale( domain, range ){
		this._domain = domain;
		this._range = range;
	}

	Scale.prototype.get = function( value ){
		// y = ax  + b
		// y = 기울기 * x + y절편  			
		// y = (y증가량)/(x증가량) * x + 시작 보정 값  			
		var y = ( this._domain[1]-this._domain[0] ) / ( this._range[1]-this._range[0] ) * value;
		return y;
	}
}( jQuery ));