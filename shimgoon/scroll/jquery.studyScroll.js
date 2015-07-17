/*!
 * DataVisualiztion Scroll Jquery Plugin.
 *
 * @author		shimgoon ( asojiroa@gmail.com )
 * @version		0.1.0
 * @since		2015.07.13
 */

;(function(){
	(function( $, window, document ){
		"use strict";
		var Plugin,
			defaults,
			pluginNm = "studyScroll";

		defaults = {

		};

		Plugin = (function(){
			function Plugin( $target, options ){
				this.element = $target;
				this.opts = $.extends( true, {}, defaults, options );
				this.init();
			}
			return Plugin;
		})();

		Plugin.prototype.init = function(){
			var $element, _this = this;

			this.data = $.data( this );

			$element = $(this.element);

		};

		Plugin.prototype.initContainer

		return $.fn[pluginNm] = function( options ){
			return this.each( function(){
				if( !$.data( this, "plugin_" + pluginNm ) ){
					return $.data( this, "plugin_" + pluginNm, new Plugin( this, options ) );
				}
			});
		}

	})( jQuery, window, document );
});