jui.defineUI("ui.scroll", [ "jquery", "util.base" ], function($, _) {

    /**
     * @class ui.scroll
     *
     * @extends core
     * @alias Scroll
     * @requires jquery
     */
    var UI = function() {
        var $xHandle = null,
            $yHandle = null,
            handleX = 0,
            handleY = 0;

        function setContentScroll(self) {
            var handleSize = $yHandle.outerHeight(),
                maxHeight = self.options.height,
                scrollHeight = $(self.root)[0].scrollHeight,
                rate = scrollHeight / (maxHeight - handleSize);

            self.addEvent(self.root, "mousewheel", function(e) {
                var top = $(this).scrollTop(),
                    delta = e.originalEvent.wheelDelta,
                    offset = delta / 120;

                if(offset > 0) {
                    if(top < 0) return;
                    $(this).scrollTop(top - delta);
                } else {
                    if(top > $(this)[0].scrollHeight) return;
                    $(this).scrollTop(top - delta);
                }

                handleY = $(this).scrollTop() / rate;
                setHandleScrollTop(self, handleY);
            });
        }

        function setHorizontalScroll(self) {
            $xHandle = createHandleObject(self);

            if($xHandle != null) {
                $(self.root).css({
                    "overflow-x": "hidden",
                    "max-width": self.options.width
                }).append($xHandle);

                setHorizontalHandleEvent(self);
            }
        }

        function setVerticalScroll(self) {
            $yHandle = createHandleObject(self);

            if($yHandle != null) {
                $(self.root).css({
                    "overflow-y": "hidden",
                    "max-height": self.options.height
                }).append($yHandle);

                setVerticalHandleEvent(self);
            }
        }

        function setVerticalHandleEvent(self) {
            var handleSize = $yHandle.outerHeight(),
                maxHeight = self.options.height,
                scrollHeight = $(self.root)[0].scrollHeight,
                rate = scrollHeight / (maxHeight - handleSize),
                startY = 0,
                moveY = 0;

            self.addEvent($yHandle, "mousedown", function(e) {
                if(startY != 0) return;

                startY = e.pageY;
                userSelectRootMarkup(self, true);
            });

            self.addEvent("body", "mousemove", function(e) {
                if(startY == 0) return;
                moveY = handleY + e.pageY - startY;

                if(moveY >= 0 && moveY <= maxHeight - handleSize) {
                    $(self.root).scrollTop(rate * moveY);
                    setHandleScrollTop(self, moveY);
                }
            });

            self.addEvent("body", "mouseup", function(e) {
                if(startY == 0) return;

                handleY = moveY;
                startY = 0;
                moveY = 0;
                userSelectRootMarkup(self, false);
            });
        }

        function setHorizontalHandleEvent(self) {
            var handleSize = $xHandle.outerWidth(),
                maxWidth = self.options.width,
                scrollWidth = $(self.root)[0].scrollWidth,
                rate = scrollWidth / (maxWidth - handleSize),
                startX = 0,
                moveX = 0;

            self.addEvent($xHandle, "mousedown", function(e) {
                if(startX != 0) return;

                startX = e.pageX;
                userSelectRootMarkup(self, true);
            });

            self.addEvent(window, "mousemove", function(e) {
                if(startX == 0) return;
                moveX = handleX + e.pageX - startX;

                if(moveX >= 0 && moveX <= maxWidth - handleSize) {
                    $(self.root).scrollLeft(rate * moveX);
                    setHandleScrollLeft(self, moveX);
                }
            });

            self.addEvent(window, "mouseup", function(e) {
                if(startX == 0) return;

                handleX = moveX;
                startX = 0;
                moveX = 0;
                userSelectRootMarkup(self, false);
            });
        }

        function setHandleScrollTop(self, y) {
            var top = $(self.root).scrollTop();

            if($xHandle != null)
                $xHandle.css("top", (top + $(self.root).outerHeight() - $xHandle.outerHeight()) + "px");

            if($yHandle != null)
                $yHandle.css("top", (top + y) + "px");
        }

        function setHandleScrollLeft(self, x) {
            var left = $(self.root).scrollLeft();

            if($xHandle != null)
                $xHandle.css("left", (left + x) + "px");

            if($yHandle != null)
                $yHandle.css("left", (left + $(self.root).outerWidth() - $yHandle.outerWidth()) + "px");
        }

        function createHandleObject(self) {
            var tpl = self.tpl.handle;

            if(tpl != null) {
                return $(tpl()).css({
                    "position": "absolute",
                    "cursor": "pointer"
                });
            }

            return null;
        }

        function userSelectRootMarkup(self, isDrag) {
            $(self.root).css({
                "-webkit-user-select": isDrag ? "none" : "inherit",  /* Chrome all / Safari all */
                "-moz-user-select": isDrag ? "none" : "inherit",     /* Firefox all */
                "-ms-user-select": isDrag ? "none" : "inherit",      /* IE 10+ */
                "user-select": isDrag ? "none" : "inherit"
            })
        }

        this.init = function() {
            // 루트 포지션 설정
            $(this.root).css("position", "relative");

            // 세로 스크롤 설정
            if(_.typeCheck("integer", this.options.width)) {
                setVerticalScroll(this);
                setContentScroll(this);
            }

            // 가로 스크롤 설정
            if(_.typeCheck("integer", this.options.height)) {
                setHorizontalScroll(this);
            }

            // 핸들 위치 설정
            setHandleScrollTop(this, 0);
            setHandleScrollLeft(this, 0);
        }
    }

    UI.setup = function() {
        return {
            width: null,
            height: null
        }
    }

    return UI;
});