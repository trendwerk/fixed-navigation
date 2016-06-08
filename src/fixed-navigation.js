(function($) {
  $.fn.fixedNavigation = function(options) {
    const defaults = {
      delta: 40,
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
      this.scrolling = false;
      this.upScroll = 0;
      this.previousScroll = 0;
      this.lastFrame = null;
    }

    init() {
      this.$window.resize(() => {
        this.calculateVariables();
      });

      this.calculateVariables();

      return this.check();
    }

    calculateVariables() {
      this.minScroll = this.$element.outerHeight() + this.$element.offset().top;

      if (this.$window.width() >= 682) {
        this.check();
      }
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

      if (this.$window.width() > 682) {
        cancelAnimationFrame(this.lastFrame);
        this.lastFrame = this.check();
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
