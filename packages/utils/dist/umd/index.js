/*@desc utils */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash'], factory) :
    (global = global || self, factory((global.Dx = global.Dx || {}, global.Dx.utils = {}), global._));
}(this, (function (exports, lodash) { 'use strict';

    lodash = lodash && Object.prototype.hasOwnProperty.call(lodash, 'default') ? lodash['default'] : lodash;

    function extend() {
        return 'f';
    }
    function getDef() {
        return 'd';
    }

    exports._ = lodash;
    exports.extend = extend;
    exports.getDef = getDef;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
