/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var AccordionSlider = (function (_super) {
    __extends(AccordionSlider, _super);
    function AccordionSlider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            orientation: props.orientation
        };
        _this.panelsSpacing = {
            default: 0,
            expanded: 0,
            shrank: 0
        };
        _this.setSpacing = _this.setSpacing.bind(_this);
        _this.expandPanel = _this.expandPanel.bind(_this);
        _this.calculate = _this.calculate.bind(_this);
        _this.onResize = _this.onResize.bind(_this);
        _this.onResize = _.throttle(_this.onResize, 500);
        return _this;
    }
    AccordionSlider.prototype.componentDidMount = function () {
        var _this = this;
        this.panels = this.refs['panels'].querySelectorAll('.as-panel');
        this.bb = this.refs['accordion-slider'];
        this.panelsCount = this.props.data.length;
        this.isVertical = this.state.orientation == 'vertical';
        window.addEventListener('resize', this.onResize);
        setTimeout(function () {
            _this.onResize();
        }, 500);
    };
    AccordionSlider.prototype.componentDidUpdate = function () {
        var _this = this;
        this.isVertical = this.state.orientation == 'vertical';
        if (this.props.resize != this.state.resize) {
            this.setState({
                resize: this.props.resize
            });
            setTimeout(function () {
                _this.onResize();
            }, 200);
        }
    };
    AccordionSlider.prototype.onResize = function () {
        if (this.props.responsive) {
            var bb = this.bb.getBoundingClientRect();
            this.setState({
                orientation: bb.width < 450 ? 'vertical' : 'horizontal',
            });
        }
        this.calculate();
        this.setSpacing();
    };
    AccordionSlider.prototype.calculate = function () {
        var bb = this.bb.getBoundingClientRect(), imgEl = this.panels[0].querySelector('.as-panel-image img'), imgWidth = imgEl.clientWidth / bb.width * 100, imgHeight = imgEl.clientHeight / bb.height * 100;
        this.panelsSpacing = {
            default: 100 / this.panelsCount,
            expanded: this.isVertical ? imgHeight : imgWidth,
            shrank: (100 - (this.isVertical ? imgHeight : imgWidth)) / (this.panelsCount - 1)
        };
    };
    AccordionSlider.prototype.setSpacing = function () {
        for (var i = 0; i < this.panels.length; i++) {
            this.panels[i].setAttribute('expanded', false);
            this.panels[i].style[this.isVertical ? 'height' : 'width'] = this.panelsSpacing.default + '%';
            this.panels[i].style[!this.isVertical ? 'height' : 'width'] = '';
        }
    };
    AccordionSlider.prototype.expandPanel = function (e) {
        var bb = this.bb.getBoundingClientRect(), el = e.currentTarget, index = el.getAttribute('data-index');
        el.setAttribute('expanded', 'true');
        el.style[this.isVertical ? 'height' : 'width'] = this.panelsSpacing.expanded + '%';
        for (var i = 0; i < this.panels.length; i++) {
            if (i + "" != index) {
                this.panels[i].style[this.isVertical ? 'height' : 'width'] = this.panelsSpacing.shrank + '%';
                this.panels[i].style[!this.isVertical ? 'height' : 'width'] = '';
            }
        }
    };
    AccordionSlider.prototype.render = function () {
        var _this = this;
        var clz = this.props.className || '', props = this.props;
        return (React.createElement("div", { ref: "accordion-slider", className: "accordion-slider " + clz, "data-visible": this.props.visible, "data-orientation": this.state.orientation },
            React.createElement("div", { className: "as-holder" },
                React.createElement("div", { className: "as-panels", ref: "panels" }, this.props.data.map(function (d, i) {
                    return (React.createElement("div", { className: "as-panel", key: i, "data-index": i, onMouseOver: _this.expandPanel, onMouseOut: _this.setSpacing, onClick: props.onItemClick },
                        d.head &&
                            React.createElement("div", { className: "as-panel-head" },
                                React.createElement("div", { className: "as-head-inner" },
                                    React.createElement("h1", null, d.head))),
                        React.createElement("div", { className: "as-panel-image" },
                            React.createElement("img", { src: d.img }))));
                })))));
    };
    return AccordionSlider;
}(React.Component));
exports.AccordionSlider = AccordionSlider;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AccordionSlider_1 = __webpack_require__(0);
if (window && document) {
    (function (yaReact, W, D) {
        yaReact.AccordionSlider = AccordionSlider_1.AccordionSlider;
    }(window.yaReact = window.yaReact || {}, window, document));
}


/***/ })
/******/ ]);
//# sourceMappingURL=AccordionSlider.js.map