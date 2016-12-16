(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.ie11ScrollIntoView = factory(root.jQuery);
    }
}(this, function ($) {
    'use strict';
    function detectIE11() {
        return window.navigator.userAgent.indexOf('Trident/') > 0;
    }

    // Return early if this isn't IE 11

    if (!detectIE11()) return;

    // hasScroller - snippet from StackOverflow:
    // http://stackoverflow.com/a/34700876
    var hasScroller = (function () {
        var getComputedStyle = document.body && document.body.currentStyle ? function (elem) {
            return elem.currentStyle;
        } : function (elem) {
            return document.defaultView.getComputedStyle(elem, null);
        };

        function getActualCss(elem, style) {
            return getComputedStyle(elem)[style];
        }

        function autoOrScroll(text) {
            return text === 'scroll' || text === 'auto';
        }

        function isXScrollable(elem) {
            return elem.offsetWidth < elem.scrollWidth &&
                autoOrScroll(getActualCss(elem, 'overflow-x'));
        }

        function isYScrollable(elem) {
            return elem.offsetHeight < elem.scrollHeight &&
                autoOrScroll(getActualCss(elem, 'overflow-y'));
        }

        return function (elem) {
            return isYScrollable(elem) || isXScrollable(elem);
        };
    })();

    // One of the element's parents is hopefully a scroller
    function recursiveFindClosestScroller(el) {
        if (hasScroller(el)) {
            return el;
        }

        if (el.parentNode === null) {
            return null;
        }

        return recursiveFindClosestScroller(el.parentNode);
    }

    function ieScrollIntoView(el) {
        var scrollContainer = recursiveFindClosestScroller(el)
            , $scrollContainer
            , $el
            , gridMainScrollTop
            , elOffsetTop
            , gridMainTop
            ;
        if (scrollContainer === null) {
            // We couldn't find a scroll container.
            // This is probably because no scrolling is needed, so do nothing.
        } else {
            $scrollContainer  = $(scrollContainer);
            $el               = $(el);
            gridMainScrollTop = $scrollContainer.scrollTop();
            elOffsetTop       = $el.offset().top;
            gridMainTop       = $scrollContainer.offset().top;

            $scrollContainer.scrollTop(
                gridMainScrollTop + elOffsetTop - gridMainTop
            );
        }
    }

    HTMLElement.prototype.scrollIntoView = function () {
        ieScrollIntoView(this);
    };

    return {};
}));
