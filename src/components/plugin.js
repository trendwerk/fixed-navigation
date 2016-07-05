import { Fixed } from './fixed';

export class Plugin {
  init() {
    $.fn.fixedNavigation = function fixedNavigation(options) {
      if (! window.requestAnimationFrame) {
        return false;
      }

      const defaults = {
        delta: 40,
        minWidth: 0,
      };

      const fixed = new Fixed(this, $(window), $.extend(defaults, options));
      fixed.init();
      fixed.registerEvents();

      return fixed;
    };
  }
}
