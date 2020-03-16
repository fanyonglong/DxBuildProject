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

	__webpack_require__(471);
	module.exports = __webpack_require__(471);


/***/ }),

/***/ 471:
/***/ (function(module, exports) {

	(function( window, undefined ) {
	    kendo.cultures["ko-KR"] = {
	        name: "ko-KR",
	        numberFormat: {
	            pattern: ["-n"],
	            decimals: 2,
	            ",": ",",
	            ".": ".",
	            groupSize: [3],
	            percent: {
	                pattern: ["-n%","n%"],
	                decimals: 2,
	                ",": ",",
	                ".": ".",
	                groupSize: [3],
	                symbol: "%"
	            },
	            currency: {
	                name: "South Korean Won",
	                abbr: "KRW",
	                pattern: ["-$n","$n"],
	                decimals: 0,
	                ",": ",",
	                ".": ".",
	                groupSize: [3],
	                symbol: "₩"
	            }
	        },
	        calendars: {
	            standard: {
	                days: {
	                    names: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
	                    namesAbbr: ["일","월","화","수","목","금","토"],
	                    namesShort: ["일","월","화","수","목","금","토"]
	                },
	                months: {
	                    names: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
	                    namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12"]
	                },
	                AM: ["오전","오전","오전"],
	                PM: ["오후","오후","오후"],
	                patterns: {
	                    d: "yyyy-MM-dd",
	                    D: "yyyy'년' M'월' d'일' dddd",
	                    F: "yyyy'년' M'월' d'일' dddd tt h:mm:ss",
	                    g: "yyyy-MM-dd tt h:mm",
	                    G: "yyyy-MM-dd tt h:mm:ss",
	                    m: "M월 d일",
	                    M: "M월 d일",
	                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
	                    t: "tt h:mm",
	                    T: "tt h:mm:ss",
	                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
	                    y: "yyyy'년' M'월'",
	                    Y: "yyyy'년' M'월'"
	                },
	                "/": "-",
	                ":": ":",
	                firstDay: 0
	            }
	        }
	    }
	})(this);


/***/ })

/******/ });