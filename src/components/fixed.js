export class Fixed {
  constructor(element, window, body, options) {
    this.$body = body;
    this.$element = element;
    this.$window = window;
    this.currentScroll = 0;
    this.delta = options.delta;
    this.fixed = false;
    this.lastFrame = null;
    this.minWidth = options.minWidth;
    this.previousScroll = 0;
    this.upScroll = 0;
    this.visible = true;
  }

  init() {
    this.minScroll = this.$element.outerHeight();

    if (this.$window.width() >= this.minWidth && ! this.lastFrame) {
      this.lastFrame = this.check();
      this.setFixed();
    }
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
    this.currentScroll = this.$window.scrollTop();

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

    if (this.$window.width() > this.minWidth) {
      this.lastFrame = this.check();
    } else {
      this.lastFrame = null;
      this.removeFixed();
    }
  }

  setFixed() {
    if (! this.fixed) {
      this.$body.addClass('fixed');
      this.fixed = true;
    }
  }

  removeFixed() {
    if (this.fixed) {
      this.$body.removeClass('fixed');
      this.fixed = false;
    }
  }

  hideFixed() {
    if (this.visible) {
      this.$element.addClass('hide-fixed');
      this.visible = false;
    }
  }

  showFixed() {
    if (! this.visible) {
      this.$element.removeClass('hide-fixed');
      this.visible = true;
    }
  }
}
