import { Fixed } from './fixed';

export class Plugin {
  constructor(jQuery) {
    this.jQuery = jQuery;
  }

  init() {
    const jQuery = this.jQuery;

    this.jQuery.fn.fixedNavigation = function fixedNavigation(options) {
      if (! window.requestAnimationFrame) {
        return;
      }
      
      const defaults = {
        delta: 40,
        minWidth: 0,
      };

      const fixed = new Fixed(this, jQuery(window), jQuery.extend(defaults, options));
      fixed.init();
      fixed.registerEvents();

      return fixed;
    };
  }
}
