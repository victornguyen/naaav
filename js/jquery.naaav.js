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

(function($,window){
    
    var Naaav = function($el, options) {
         if (!$el.length || !$el.find('ul').length) return;

         // return if 'nav' has already been invoked on this element
         if ($el.data('naaav')) return;

         // tag element with data to indicate 'nav' has been invoked
         $el.data('naaav', true);

         var o = $.extend({}, $.fn.naaav.defaults, options);

         var hasEasingFunc = ($.isFunction($.easing[o.easing]));
         if (!hasEasingFunc) o.easing = "swing";

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

         // handlers     
         this.show = function(e) {
             var $item = $(this);
             _hideAll($item);
             $item.children('a').addClass(o.activeClass);
             window.clearTimeout($item.data('timeoutId'));
             window.setTimeout(function(){
                 _animateSubNav($item, 'show');
             }, o.delayIn);
         };

         this.hide = function(e) {
             var $item = $(this);
             $item.children('a').removeClass(o.activeClass);
             var timeoutId = window.setTimeout(function(){
                     _animateSubNav($item, 'hide');
                 }, o.delayOut);
             // store this timeout id against the item to clear in _show() later...
             // this prevents multiple hide animations from queing up
             $item.data('timeoutId', timeoutId);
         };

         // bind event handlers
         $el.children('li')
             .bind('mouseenter', o, o.showFunc || this.show)
             .bind('mouseleave', o, o.hideFunc || this.hide);
        
    };
    
    $.fn.naaav = function(options) {
        // return if no elements found
        if (!this.length) return this;

        var args = (arguments[1]) ? Array.prototype.slice.call(arguments,1) : null,
            inst;

        this.each(function(){
            var $elem = $(this);
            if (typeof options === 'string') {
                inst = $elem.data('naaav');
                if (inst[options])
                    return inst[options].apply(inst,args);
                else
                    $.error('Method '+options+' does not exist on jQuery.naaav');
            }
            else {
                // create and store instance in data of $elem
                if ($elem.data('naaav')) return this;
                inst = new Naaav($elem, options);
                $elem.data('naaav', inst);
            }
        });

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

}(jQuery,window));