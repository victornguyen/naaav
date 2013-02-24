(function($,sinon) {
    /*
        ======== A Handy Little QUnit Reference ========
        http://api.qunitjs.com/

        Test methods:
        module(name, {[setup][ ,teardown]})
        test(name, callback)
        expect(numberOfAssertions)
        stop(increment)
        start(decrement)
        Test assertions:
        ok(value, [message])
        equal(actual, expected, [message])
        notEqual(actual, expected, [message])
        deepEqual(actual, expected, [message])
        notDeepEqual(actual, expected, [message])
        strictEqual(actual, expected, [message])
        notStrictEqual(actual, expected, [message])
        throws(block, [expected], [message])
    */

    /**
     * jQuery Plugin Operation Tests
     */
    module('jQuery Plugin Operation', {
        setup: function() {
            this.elems  = $('#qunit-fixture').children();
            this.$nav   = this.elems.find('#nav');
        }
    });

        test('is available on the jQuery object', 1, function() {
            ok( $.isFunction( $.fn.naaav ), 'is on $.fn' );
        });

        test('instance API is avaiable', 3, function() {
            this.$nav.naaav();
            var api = this.$nav.data('naaav');
            ok( api, 'successfully accessed the API via the element\'s data' );
            ok( $.isFunction(api.hideAll), 'hideAll() method is available' );
            throws(
                function(){
                    api.methodThatDoesntExist();
                },
                /methodThatDoesntExist/,
                'throws an error when a non-existant method is called'
            );
        });

        test('is chainable', 1, function() {
            strictEqual( this.$nav.naaav(), this.$nav, 'returns elem' );
        });

        test('has default values', 2, function() {
            strictEqual( typeof $.fn.naaav.defaults, 'object', 'has an exposed default values map' );
            strictEqual( typeof $.fn.naaav.defaults.activeClass, 'string', 'activeClass default value is a string' );
        });

        test('options applied override defaults', 1, function() {
            var testClass = 'victorious';
            this.$nav.naaav({ activeClass:testClass });
            var api = this.$nav.data('naaav');
            strictEqual( api.config.activeClass, testClass, 'successfully applied activeClass option' );
        });


    /**
     * Initialisation Tests
     */
    module('Initialisation', {
        setup: function() {
            this.elems  = $('#qunit-fixture').children();
            this.$nav   = this.elems.find('#nav');
        }
    });

        test('easing function applied correctly when passed during initialisation', 1, function(){
            this.$nav.naaav({ easing:'linear' });
            strictEqual( this.$nav.data('naaav').config.easing, 'linear', '"linear" easing applied successfully' );
        });

        test('easing function should default to "swing" when an invalid easing fn is passed', 1, function(){
            this.$nav.naaav({ easing:'thisEasingFnDoesntExist' });
            strictEqual( this.$nav.data('naaav').config.easing, 'swing', 'falls back to "swing" when easing fn not available' );
        });

        test('animationMethod should default to "fade" when an unavailable animationMethod is passed', 2, function(){
            this.$nav.naaav({ animation:'thisAnimMethodDoesntExist' });
            strictEqual( this.$nav.data('naaav').animateMethod.show, 'fadeIn', 'specifying animation:"thisAnimMethodDoesntExist" defaults show method to "fadeIn"' );
            strictEqual( this.$nav.data('naaav').animateMethod.hide, 'fadeOut', 'specifying animation:"thisAnimMethodDoesntExist" defaults hide method to "fadeOut"' );
        });


    /**
     * Showing & Hiding Tests
     */
    module('Showing & Hiding', {
        setup: function() {
            this.elems      = $('#qunit-fixture').children();
            this.$nav       = this.elems.find('#nav');
            this.$subnav1   = this.$nav.find('#nav-about ul');
            this.$subnav2   = this.$nav.find('#nav-another ul');
            this.clock      = sinon.useFakeTimers();
        },
        teardown: function() {
            this.clock.restore();
        },
        initNaaav: function(options) {
            var config = {
                show:       0,
                hide:       0,
                delayIn:    0,
                delayOut:   0
            };
            config = $.extend(config, options || {});
            this.$nav.naaav(config);
        }
    });

        test('hideAll: hides all other submenus before showing the triggered one', 3, function(){
            this.initNaaav({
                delayIn:        100,
                delayOut:       200
            });

            this.$subnav1.trigger('mouseenter');
            this.clock.tick(100);
            ok( this.$subnav1.is(':visible'), 'subnav1 is visible when mouseentered' );

            this.$subnav2.trigger('mouseenter');
            this.clock.tick(10);
            ok( this.$subnav1.is(':hidden'), 'subnav1 is hidden when subnav2 is mouseentered' );

            this.clock.tick(210);
            ok( this.$subnav2.is(':visible'), 'subnav2 is visible when mouseentered' );
        });

        test('delayIn: shows subnav after delayIn time elapses', 3, function(){
            this.initNaaav({
                delayIn:    200
            });

            this.$subnav1.trigger('mouseenter');
            this.clock.tick(100);
            ok( this.$subnav1.is(':hidden'), 'subnav is hidden after 100ms, after mousing in on a naaav with 200ms delayIn' );

            this.$subnav1.trigger('mouseleave');
            this.clock.tick(100);
            ok( this.$subnav1.is(':hidden'), 'subnav remains hidden after 200ms elapsed time, and a mouseleave event at 100ms' );

            this.$subnav1.trigger('mouseenter');
            this.clock.tick(200);
            ok( this.$subnav1.is(':visible'), 'subnav is visible after 200ms on a naaav with 200ms delayIn' );
        });

        test('delayOut: hides subnav after delayOut time elapses', function(){
            this.initNaaav({
                delayOut:   200
            });

            this.$subnav1.trigger('mouseenter');
            this.clock.tick(10);
            this.$subnav1.trigger('mouseleave');
            ok( this.$subnav1.is(':visible'), 'subnav is visible after 0ms, after mousing out on a naaav with 200ms delayOut' );
            this.clock.tick(100);
            ok( this.$subnav1.is(':visible'), 'subnav is visible after 100ms, after mousing out on a naaav with 200ms delayOut' );
            this.clock.tick(100);
            ok( this.$subnav1.is(':hidden'), 'subnav is hidden after 200ms, after mousing out on a naaav with 200ms delayOut' );
        });


}(jQuery, sinon));
