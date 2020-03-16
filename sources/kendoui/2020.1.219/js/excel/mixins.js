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

	__webpack_require__(999);
	module.exports = __webpack_require__(999);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }),

/***/ 938:
/***/ (function(module, exports) {

	module.exports = require("./main");

/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(f, define){
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [ __webpack_require__(938), __webpack_require__(1000) ], __WEBPACK_AMD_DEFINE_FACTORY__ = (f), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(function(){

	(function($, kendo){


	kendo.ExcelMixin = {
	    extend: function(proto) {
	       proto.events.push("excelExport");
	       proto.options.excel = $.extend(proto.options.excel, this.options);
	       proto.saveAsExcel = this.saveAsExcel;
	    },
	    options: {
	        proxyURL: "",
	        allPages: false,
	        filterable: false,
	        fileName: "Export.xlsx",
	        collapsible: false
	    },
	    saveAsExcel: function() {
	        var excel = this.options.excel || {};

	        var exporter = new kendo.ExcelExporter({
	            columns: this.columns,
	            dataSource: this.dataSource,
	            allPages: excel.allPages,
	            filterable: excel.filterable,
	            hierarchy: excel.hierarchy,
	            collapsible: excel.collapsible
	        });

	        exporter.workbook().then($.proxy(function(book, data) {
	            if (!this.trigger("excelExport", { workbook: book, data: data })) {
	                var workbook = new kendo.ooxml.Workbook(book);

	                workbook.toDataURLAsync().then(function(dataURI) {
	                    kendo.saveAs({
	                        dataURI: dataURI,
	                        fileName: book.fileName || excel.fileName,
	                        proxyURL: excel.proxyURL,
	                        forceProxy: excel.forceProxy
	                    });
	                });

	            }
	        }, this));
	    }
	};

	})(kendo.jQuery, kendo);

	return kendo;

	}, __webpack_require__(3));


/***/ }),

/***/ 1000:
/***/ (function(module, exports) {

	module.exports = require("../kendo.ooxml");

/***/ })

/******/ });