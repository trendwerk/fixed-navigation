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

	var _plugin = __webpack_require__(1);

	var plugin = new _plugin.Plugin(window.jQuery);
	plugin.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Plugin = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fixed = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Plugin = exports.Plugin = function () {
	  function Plugin(jQuery) {
	    _classCallCheck(this, Plugin);

	    this.jQuery = jQuery;
	  }

	  _createClass(Plugin, [{
	    key: 'init',
	    value: function init() {
	      var jQuery = this.jQuery;

	      this.jQuery.fn.fixedNavigation = function fixedNavigation(options) {
	        if (!window.requestAnimationFrame) {
	          return false;
	        }

	        var defaults = {
	          delta: 40,
	          minWidth: 0
	        };

	        var fixed = new _fixed.Fixed(this, jQuery(window), jQuery.extend(defaults, options));
	        fixed.init();
	        fixed.registerEvents();

	        return fixed;
	      };
	    }
	  }]);

	  return Plugin;
	}();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Fixed = exports.Fixed = function () {
	  function Fixed(element, context, options) {
	    _classCallCheck(this, Fixed);

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

	  _createClass(Fixed, [{
	    key: 'init',
	    value: function init() {
	      this.minScroll = this.$element.outerHeight() + this.$element.offset().top;

	      if (this.$context.width() >= this.minWidth && !this.lastFrame) {
	        this.lastFrame = this.check();
	      }
	    }
	  }, {
	    key: 'registerEvents',
	    value: function registerEvents() {
	      var _this = this;

	      this.$context.resize(function () {
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
	      this.currentScroll = this.$context.scrollTop();

	      if (this.currentScroll > this.minScroll) {
	        this.setScrolling();

	        if (this.previousScroll >= this.currentScroll) {
	          this.upScroll += this.previousScroll - this.currentScroll;
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
	  }, {
	    key: 'setScrolling',
	    value: function setScrolling() {
	      if (!this.scrolling) {
	        this.$element.addClass('scrolling');
	        this.scrolling = true;
	      }
	    }
	  }, {
	    key: 'removeScrolling',
	    value: function removeScrolling() {
	      if (this.scrolling) {
	        this.$element.removeClass('scrolling');
	        this.scrolling = false;
	      }
	    }
	  }, {
	    key: 'setFixed',
	    value: function setFixed() {
	      if (!this.fixed) {
	        this.$element.addClass('fixed');
	        this.fixed = true;
	      }
	    }
	  }, {
	    key: 'removeFixed',
	    value: function removeFixed() {
	      if (this.fixed) {
	        this.$element.removeClass('fixed');
	        this.fixed = false;
	      }
	    }
	  }]);

	  return Fixed;
	}();

/***/ }
/******/ ]);