export class Fixed {
  constructor(element, context, body, options) {
    this.$body = body;
    this.$context = context;
    this.$element = element;
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

    if (this.$context.width() >= this.minWidth && ! this.lastFrame) {
      this.lastFrame = this.check();
      this.setFixed();
    } else if (! this.lastFrame) {
      this.removeFixed();
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
