export class Fixed {
  constructor(element, context, options) {
    this.$context = context;
    this.$element = element;
    this.currentScroll = 0;
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
      this.setScrolling();

      if (this.previousScroll >= this.currentScroll) {
        this.upScroll += (this.previousScroll - this.currentScroll);
      } else {
        this.upScroll = 0;
      }

      if (this.upScroll >= this.delta) {
        this.setFixed();
      } else {
        this.removeFixed();
      }
    } else {
      this.removeScrolling();
      this.removeFixed();
    }

    this.previousScroll = this.currentScroll;

    if (this.$context.width() > this.minWidth) {
      this.lastFrame = this.check();
    } else {
      this.lastFrame = null;
    }

    return this.lastFrame;
  }

  setScrolling() {
    if (! this.scrolling) {
      this.$element.addClass('scrolling');
      this.scrolling = true;
    }
  }

  removeScrolling() {
    if (this.scrolling) {
      this.$element.removeClass('scrolling');
      this.scrolling = false;
    }
  }

  setFixed() {
    if (! this.fixed) {
      this.$element.addClass('fixed');
      this.fixed = true;
    }
  }

  removeFixed() {
    if (this.fixed) {
      this.$element.removeClass('fixed');
      this.fixed = false;
    }
  }
}
