;( function( $ ){

	var _defaultOption = {

	};

	$.fn.scroller = function( option ){
		
		var scrollerOotion = $.extend( _defaultOption, option );
		return this.each( function(){
			new Scroller( $( this ), scrollerOotion  );
		} );
	}

	function Scroller( $container, option ){
		var self = this;
		this._scale =  null;
		this._scrollbarSize = 15;
		this._$container = $container;
		this._$contents = $container.find( '.contents' );
		this._$container.append( this._$blank );
		console.log( this._$container);
		this._vscollbar = new ScrollBar( this._$container, "v", this._scrollbarSize, function( value ){ self._$contents.css( 'top', value ); } );
		this._hscollbar = new ScrollBar( this._$container, "h", this._scrollbarSize, function( value ){ self._$contents.css( 'left', value ); } );
		this._blank = new Blank( $container, this._scrollbarSize, function( value ){ 
			var width = self._$container.width();
			var height = self._$container.height();
			self._$container.css( { width:width+value[0], height:height+value[1] } );
			self.update();
		} );
		this.update();
	}

	Scroller.prototype.update = function(){
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

	function ScrollBar( $container, type, size, onchange ){
		console.log( $container);
		this._size = size;
		this._sizeProp = type === 'v' ? 'height' : 'width';
		this._sizeProp2 = type !== 'v' ? 'height' : 'width';
		this._posProp = type === 'v' ? 'top' : 'left';
		this._posProp2 = type === 'v' ? 'Y' : 'X';
		this._posProp3 = type === 'v' ? 'right' : 'bottom';
		this._scale = null;

		this._$container = $container;
		this._$contents = $container.find( '.contents' );
		this._$scrollbar = $( '<div></div>' ).addClass( 'scrollbar' ).addClass( type+'-scrollbar' ).css( this._sizeProp2, this._size ).css( this._posProp3, 0 ).css( 'position', 'absolute') ;
		this._$handle = $( '<div></div>' ).addClass( 'handle').css( this._sizeProp2, '100%');
		this._$scrollbar.append( this._$handle );
		this._$container.append( this._$scrollbar );
		this._limit = 0;
		this.useOffset = false;
		this.update();

		var self = this;
		addEvent();
		function addEvent(){
			self._$handle.on( 'mousedown', function( event ){
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
	}

	ScrollBar.prototype.update = function(){
		var offset = 0;
		if( this.useOffset ){
			this._$scrollbar.css( this._sizeProp, this._$container[this._sizeProp]()-this._size );
			offset = this._size;
		}else{
			this._$scrollbar.css( this._sizeProp, this._$container[this._sizeProp]() )	
		}
		var scollbarSize = this._$scrollbar[this._sizeProp]();
		var handleSize = this._$handle[this._sizeProp]();
		this._limit = scollbarSize - handleSize;

		var cntnrSize = this._$container[this._sizeProp]();
		var cntnsSize = this._$contents[this._sizeProp]();		
		var sizeRatio = cntnrSize / cntnsSize;
		var scrollSize = cntnrSize * sizeRatio;
		this._$handle.css( this._sizeProp, scrollSize );
		this._scale =  new Scale( [ 0, cntnrSize-cntnsSize-offset ], [ 0, this._limit] );
	}

	ScrollBar.prototype.show = function(){
		this._$scrollbar.show();
	}

	ScrollBar.prototype.hide = function(){
		this._$scrollbar.hide();	
	}


	function Blank( $container, size, onResize ){
		this._$blank = $( '<div></div>').addClass('blank').css( { position:'absolute', width:size, height:size, right:0, bottom:0 }).hide();
		$container.append( this._$blank );

		var self = this;
		//addEvent();
		function addEvent(){
			self._$blank.on( 'mousedown', function( event ){
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

	Blank.prototype.show = function(){
		this._$blank.show();
	}

	Blank.prototype.hide = function(){
		this._$blank.hide();	
	}

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