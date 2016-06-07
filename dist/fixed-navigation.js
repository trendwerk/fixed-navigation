'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
  $.fn.fixedNavigation = function (options) {
    var defaults = {
      delta: 40
    };

    options = $.extend(defaults, options);

    var fixed = new Fixed(this, options);
    fixed.init();

    return fixed;
  };

  var Fixed = function () {
    function Fixed(element, options) {
      _classCallCheck(this, Fixed);

      this.$element = element;
      this.$window = $(window);
      this.delta = options.delta;
      this.fixed = false;
      this.minScroll = element.outerHeight();
      this.scrolling = false;
      this.upScroll = 0;
      this.previousScroll = 0;
      this.lastFrame = null;
    }

    _createClass(Fixed, [{
      key: 'init',
      value: function init() {
        var _this = this;

        this.$window.resize(function () {
          _this.resizeCheck();
        });

        return this.check();
      }
    }, {
      key: 'check',
      value: function check() {
        var _this2 = this;

        return requestAnimationFrame(function () {
          _this2.calculate();
        });
      }
    }, {
      key: 'resizeCheck',
      value: function resizeCheck() {
        this.minScroll = this.$element.outerHeight();

        if (this.$window.width() >= 682) {
          this.check();
        }
      }
    }, {
      key: 'calculate',
      value: function calculate() {
        var currentScroll = this.$window.scrollTop();

        if (currentScroll > this.minScroll) {
          this._setScrolling();

          if (this.previousScroll >= currentScroll) {
            this.upScroll += this.previousScroll - currentScroll;
          } else {
            this.upScroll = 0;
          }

          if (this.upScroll >= this.delta) {
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
    }, {
      key: '_setScrolling',
      value: function _setScrolling() {
        if (!this.scrolling) {
          this.$element.addClass('scrolling');
          this.scrolling = true;
        }
      }
    }, {
      key: '_removeScrolling',
      value: function _removeScrolling() {
        if (this.scrolling) {
          this.$element.removeClass('scrolling');
          this.scrolling = false;
        }
      }
    }, {
      key: '_setFixed',
      value: function _setFixed() {
        if (!this.fixed) {
          this.$element.addClass('fixed');
          this.fixed = true;
        }
      }
    }, {
      key: '_removeFixed',
      value: function _removeFixed() {
        if (this.fixed) {
          this.$element.removeClass('fixed');
          this.fixed = false;
        }
      }
    }]);

    return Fixed;
  }();
})(jQuery);