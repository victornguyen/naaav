(function($) {
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

    module('jQuery plugin operation', {
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
            strictEqual( this.$nav.naaav(), this.$nav, 'should be chainable' );
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


}(jQuery));
