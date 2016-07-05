export class Fixed {
  constructor(element, context, options) {
    this.$context = context;
    this.$element = element;
    this.currentScroll = 0;
    this.delta = options.delta;
    this.fixed = true;
    this.lastFrame = null;
    this.minWidth = options.minWidth;
    this.previousScroll = 0;
    this.upScroll = 0;
  }

  init() {
    this.minScroll = this.$element.outerHeight();

    if (this.$context.width() >= this.minWidth && ! this.lastFrame) {
      this.lastFrame = this.check();
    }
  }

  registerEvents() {
    this.$context.resize(() => {
      this.init();
    });
  }

  check() {
    return requestAnimationFrame(() => {
      this.calculate();
    });
  }

  calculate() {
    this.currentScroll = this.$context.scrollTop();

    if (this.currentScroll > this.minScroll) {
      if (this.previousScroll >= this.currentScroll) {
        this.upScroll += (this.previousScroll - this.currentScroll);
      } else {
        this.upScroll = 0;
      }

      if (this.upScroll >= this.delta) {
        this.showFixed();
      } else {
        this.hideFixed();
      }
    } else {
      this.showFixed();
    }

    this.previousScroll = this.currentScroll;

    if (this.$context.width() > this.minWidth) {
      this.lastFrame = this.check();
    } else {
      this.lastFrame = null;
    }
  }

  hideFixed() {
    if (this.fixed) {
      this.$element.addClass('hide-fixed');
      this.fixed = false;
    }
  }

  showFixed() {
    if (! this.fixed) {
      this.$element.removeClass('hide-fixed');
      this.fixed = true;
    }
  }
}
