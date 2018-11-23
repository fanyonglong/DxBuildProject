module.exports =
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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1367);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 1004:
/***/ (function(module, exports) {

	module.exports = require("./kendo.core");

/***/ }),

/***/ 1367:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(1004) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function() {

	var __meta__ = { // jshint ignore:line
	    id: "webcomponents",
	    name: "Web Components",
	    category: "framework",
	    description: "Adds Kendo UI custom elements for Web Components",
	    depends: [ "core" ]
	};

	(function ($, angular, undefined) {
	    if (!kendo.support.customElements || kendo.webComponents.length) {
	        return;
	    }
	    if (angular && (angular.version.major == 1 || angular.injector)) {
	        return;
	    }
	    var TAGNAMES = {
	        editor         : "textarea",
	        numerictextbox : "input",
	        datepicker     : "input",
	        datetimepicker : "input",
	        timepicker     : "input",
	        autocomplete   : "input",
	        colorpicker    : "input",
	        maskedtextbox  : "input",
	        dropdownlist   : "select",
	        multiselect    : "select",
	        upload         : "input",
	        validator      : "form",
	        button         : "button",
	        mobilebutton        : "a",
	        mobilebackbutton    : "a",
	        mobiledetailbutton  : "a",
	        listview       : "ul",
	        mobilelistview : "ul",
	        treeview       : "ul",
	        menu           : "ul",
	        contextmenu    : "ul",
	        actionsheet    : "ul"
	    };

	    var EVENT_PREFIX = "on-";

	    var registered = [];

	    kendo.onWidgetRegistered(function(entry) {
	        var elementName = entry.prefix + entry.widget.prototype.options.name.toLowerCase();
	        if (registered.indexOf(elementName) === -1) {
	            registered.push(elementName);
	            registerElement(elementName, entry.widget);
	        }
	    });

	    var jsonRegExp = /^\s*(?:\{(?:.|\r\n|\n)*\}|\[(?:.|\r\n|\n)*\])\s*$/;
	    var jsonFormatRegExp = /^\{(\d+)(:[^\}]+)?\}|^\[[A-Za-z_]*\]$/;
	    var numberRegExp = /^(\+|-?)\d+(\.?)\d*$/;

	    function parseOption(element, option) {
	        var value = element.getAttribute(option);

	        if (value === null) {
	            value = undefined;
	        } else if (value === "null") {
	            value = null;
	        } else if (value === "true") {
	            value = true;
	        } else if (value === "false") {
	            value = false;
	        } else if (numberRegExp.test(value)) {
	            value = parseFloat(value);
	        } else if (jsonRegExp.test(value) && !jsonFormatRegExp.test(value)) {
	            value = new Function("return (" + value + ")")(); // jshint ignore:line
	        }

	        return value;
	    }

	    function parseOptions(element, options) {
	        var result = {};

	        Object.keys(options).concat("dataSource").forEach(function(name) {
	            if (element.hasAttribute(kendo.toHyphens(name))) {
	                result[name] = parseOption(element, kendo.toHyphens(name));
	            }
	        });

	        return result;
	    }

	    function cloneEvent(e) {
	        var result = {};

	        Object.keys(e).forEach(function(key) {
	            if (key[0] != "_") {
	                result[key] = e[key];
	            }
	        });

	        return result;
	    }

	    function eventHandler(eventName, e) {
	        var event = document.createEvent("CustomEvent");

	        event.initCustomEvent(eventName, /*bubbles*/ false, /*cancelable*/true, cloneEvent(e));

	        this.dispatchEvent(event);

	        if (event.defaultPrevented) {
	            e.preventDefault();
	        }
	    }

	    function expose(component, obj) {
	        var props  = Object.keys(obj);
	        for(var idx = 0; idx <= props.length; idx++) {
	            if(typeof(obj[props[idx]]) === "function"){
	                if(!component[props[idx]]) {
	                    component[props[idx]] = obj[props[idx]].bind(component.widget);
	                }
	            }else{
	                if (props[idx] === "options") {
	                    continue;
	                }

	                component[props[idx]] = component[props[idx]] || obj[props[idx]];
	            }
	        }
	    }

	    function registerElement(name, widget) {
	        var options = widget.prototype.options;

	        var prototype = Object.create(HTMLElement.prototype);

	        Object.defineProperty(prototype, 'options', {
	            get: function() {
	                return this.widget.options;
	            },

	            set: function(options) {
	                var instance = this.widget;
	                options = $.extend(true, {}, instance.options, options);

	                var _wrapper = $(instance.wrapper)[0];
	                var _element = $(instance.element)[0];

	                instance._destroy();

	                var newElement = document.createElement(TAGNAMES[name] || "div");

	                if (_wrapper && _element) {
	                    _wrapper.parentNode.replaceChild(_element, _wrapper);
	                    $(_element).replaceWith(newElement);
	                }

	                if (instance.value) {
	                    options.value = instance.value();
	                }

	                instance.init(newElement, options);

	                this.bindEvents();

	            }
	        });

	        prototype.bindEvents = function() {
	            if (widget.prototype.events.indexOf("init") < 0) {
	                widget.prototype.events.push("init");
	            }
	            widget.prototype.events.forEach(function(eventName) {
	                this.widget.bind(eventName, eventHandler.bind(this, eventName));

	                if (this.hasAttribute(EVENT_PREFIX + eventName)) {
	                    this.bind(eventName, function(e) {
	                        window[this.getAttribute(EVENT_PREFIX + eventName)].call(this, e);
	                    }.bind(this));
	                }
	            }.bind(this));
	        };

	        prototype.attachedCallback = function() {
	            var that = this;
	            var element = document.createElement(TAGNAMES[name] || "div");

	            $(element).append(that.childNodes);
	            $(element).attr("class", $(that).attr("class"));
	            $(element).attr("style", $(that).attr("style"));
	            that.appendChild(element);
	            that.widget = new widget(element, parseOptions(that, options));

	            var obj = that.widget;
	            do {
	                expose(that, obj);
	            } while ((obj = Object.getPrototypeOf(obj)));

	            this.bindEvents();
	            that.widget.trigger("init");
	        };

	        prototype.detachedCallback = function() {
	            kendo.destroy(this.element);
	        };

	        kendo.webComponents.push("kendo-" + name);

	        document.registerElement("kendo-" + name, {
	            prototype: prototype
	        });
	    }
	})(window.kendo.jQuery, window.angular);

	return window.kendo;

	}, __webpack_require__(3));


/***/ })

/******/ });