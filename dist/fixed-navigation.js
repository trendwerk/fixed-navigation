/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _fixed = __webpack_require__(1);

	var _fixed2 = _interopRequireDefault(_fixed);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log('test');

	(function register($) {
	  $.fn.fixedNavigation = function fixedNavigation(options) {
	    var defaults = {
	      delta: 40,
	      minWidth: 0
	    };

	    var fixed = new _fixed2.default(this, $.extend(defaults, options));
	    fixed.init();

	    return fixed;
	  };
	})(jQuery);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Fixed = function () {
	  function Fixed(element, options) {
	    _classCallCheck(this, Fixed);

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

	  _createClass(Fixed, [{
	    key: 'init',
	    value: function init() {
	      this.minScroll = this.$element.outerHeight() + this.$element.offset().top;

	      if (this.$window.width() >= this.minWidth && !this.lastFrame) {
	        console.log('start');
	        this.lastFrame = this.check();
	      }

	      this.registerEvents();
	    }
	  }, {
	    key: 'registerEvents',
	    value: function registerEvents() {
	      var _this = this;

	      this.$window.resize(function () {
	        _this.init();
	      });
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
	    key: 'calculate',
	    value: function calculate() {
	      console.log('running');
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

	      if (this.$window.width() > this.minWidth) {
	        this.lastFrame = this.check();
	      } else {
	        console.log('end');
	        this.lastFrame = null;
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

	exports.default = Fixed;

/***/ }
/******/ ]);