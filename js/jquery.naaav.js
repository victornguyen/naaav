/*
    # jQuery naaav
	A Homebrand Dropdown Menu Plugin

    Just _another_ jQuery drop-down menu plugin :)

    This one is a **super** basic one that's intended to just streamline the
    setting up of a drop-down navigation. It sets up event listeners and handlers,
    along with the in/out delays around a sub-menu's show/hide effect.

    You can pass in your own show/hide functions to completely customise the
    sub-menu display behaviour.

    Created by Victor Nguyen
	@victornguyen
*/

(function($){
	
    $.fn.naaav = function(options) {
        // return if no element or no <ul> child elements
        var $nav = this;
    	if (!$nav.length || !$nav.find('ul').length) return;

    	// return if 'nav' has already been invoked on this element
    	if ($nav.data('naaav')) return;

        // tag element with data to indicate 'nav' has been invoked
    	$nav.data('naaav', true);
		
        var o = $.extend($.fn.naaav.defaults, options);
		
        // make sure easing function exists...
		if (!$.isFunction($.easing[o.easing])) o.easing = "swing";

        // set vars
        var animateMethod;
        switch (o.animation) {
	    	case 'fade':
	    	    animateMethod = {
	    	        show: 'fadeIn',
	    	        hide: 'fadeOut'
	    	    };
	    		break;
	    	case 'slide':
	    		animateMethod = {
	    	        show: 'slideDown',
	    	        hide: 'slideUp'
	    	    };
	    		break;
	    	default:
	    	    animateMethod = {
	    	        show: 'fadeIn',
	    	        hide: 'fadeOut'
	    	    };
        }
        
        // bind event handlers
        $nav.children('li')
            .bind('mouseenter', o, o.showFunc || _show)
            .bind('mouseleave', o, o.hideFunc || _hide);
            
        // handlers
        function _show(e) {
            var $item = $(this);
            _hideAll($item);
            $item.children('a').addClass(o.activeClass);
            clearTimeout($item.data('timeoutId'));
            setTimeout(function(){
                _animateSubNav($item, 'show');
            }, o.delayIn);
        }

        function _hide(e) {
            var $item = $(this);
            $item.children('a').removeClass(o.activeClass);
            var timeoutId = setTimeout(function(){
                    _animateSubNav($item, 'hide');
                }, o.delayOut);
            // store this timeout id against the item to clear in _show() later...
            // this prevents multiple hide animations from queing up
            $item.data('timeoutId', timeoutId);
        }

        // funcs
        function _animateSubNav($item, type) {
            $item.children('ul:first')
                .stop(false, true)
                [animateMethod[type]](o[type], o.easing, function(){ $(this)[type](); });
        }

        function _hideAll($item) {
        	$item
        	    .siblings('li')
        	        .children('a')
        	            .removeClass(o.activeClass)
        	            .end()
    	            .children('ul')
                        .stop(false, true)
                        .hide();
        }

        // return element to chain
    	return this;
    };

	$.fn.naaav.defaults = {
        activeClass:    'active',
        animation:      'slide',    // 'slide' or 'fade'
        easing:         'swing',
        show:           125,
        hide:           100,
        delayIn:        0,
        delayOut:       150,
        showFunc:       null,       // specify your own show/hide
        hideFunc:       null        // submenu functions...
	};

}(jQuery));