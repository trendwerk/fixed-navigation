(function($) {
  $.fn.fixedNavigation = function(options) {
    const defaults = {
      delta: 40,
      minWidth: 0,
    };

    options = $.extend(defaults, options);

    const fixed = new Fixed(this, options);
    fixed.init();

    return fixed;
  };

  class Fixed {
    constructor(element, options) {
      this.$element = element;
      this.$window = $(window);
      this.delta = options.delta;
      this.fixed = false;
      this.lastFrame = null;
      this.minWidth = options.minWidth;
      this.previousScroll = 0;
      this.scrolling = false;
      this.upScroll = 0;
    }

    init() {
      this.minScroll = this.$element.outerHeight() + this.$element.offset().top;

      if(this.$window.width() >= this.minWidth && ! this.lastFrame) {
        this.lastFrame = this.check();
      }

      this.registerEvents();
    }

    registerEvents() {
      this.$window.resize(() => {
        this.init();
      });
    }

    check() {
      return requestAnimationFrame(() => {
        this.calculate();
      });
    }

    calculate() {
      let currentScroll = this.$window.scrollTop();

      if(currentScroll > this.minScroll) {
        this._setScrolling();

        if(this.previousScroll >= currentScroll) {
          this.upScroll += (this.previousScroll - currentScroll);
        } else {
          this.upScroll = 0;
        }

        if(this.upScroll >= this.delta) {
          this._setFixed();
        } else {
          this._removeFixed();
        }
      } else {
        this._removeScrolling();
        this._removeFixed();
      }

      this.previousScroll = currentScroll;

      if(this.$window.width() > this.minWidth) {
        this.lastFrame = this.check();
      } else {
        this.lastFrame = null;
      }

      return this.lastFrame;
    }

    _setScrolling() {
      if(! this.scrolling) {
        this.$element.addClass('scrolling');
        this.scrolling = true;
      }
    }

    _removeScrolling() {
      if(this.scrolling) {
        this.$element.removeClass('scrolling');
        this.scrolling = false;
      }
    }

    _setFixed() {
      if(! this.fixed) {
        this.$element.addClass('fixed');
        this.fixed = true;
      }
    }

    _removeFixed() {
      if(this.fixed) {
        this.$element.removeClass('fixed');
        this.fixed = false;
      }
    }
  }
})(jQuery);
