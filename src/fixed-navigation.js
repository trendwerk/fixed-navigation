import Fixed from './fixed';

(function register($) {
  $.fn.fixedNavigation = function fixedNavigation(options) {
    const defaults = {
      delta: 40,
      minWidth: 0,
    };

    const fixed = new Fixed(this, $(window), $.extend(defaults, options));
    fixed.init();

    return fixed;
  };
}(window.jQuery));
