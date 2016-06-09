import Fixed from './fixed';

export default class Plugin {
  constructor(jQuery) {
    this.jQuery = jQuery;
  }

  init() {
    const jQuery = this.jQuery;

    this.jQuery.fn.fixedNavigation = function fixedNavigation(options) {
      const defaults = {
        delta: 40,
        minWidth: 0,
      };

      const fixed = new Fixed(this, jQuery(window), jQuery.extend(defaults, options));
      fixed.init();

      return fixed;
    };
  }
}
