(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/autotrack/lib/constants.js":
/*!*************************************************!*\
  !*** ./node_modules/autotrack/lib/constants.js ***!
  \*************************************************/
/*! exports provided: VERSION, DEV_ID, VERSION_PARAM, USAGE_PARAM, NULL_DIMENSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEV_ID", function() { return DEV_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION_PARAM", function() { return VERSION_PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USAGE_PARAM", function() { return USAGE_PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NULL_DIMENSION", function() { return NULL_DIMENSION; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var VERSION = '2.4.1';
var DEV_ID = 'i5iSjo';
var VERSION_PARAM = '_av';
var USAGE_PARAM = '_au';
var NULL_DIMENSION = '(not set)';

/***/ }),

/***/ "./node_modules/autotrack/lib/event-emitter.js":
/*!*****************************************************!*\
  !*** ./node_modules/autotrack/lib/event-emitter.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventEmitter; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * An simple reimplementation of the native Node.js EventEmitter class.
 * The goal of this implementation is to be as small as possible.
 */
var EventEmitter =
/*#__PURE__*/
function () {
  /**
   * Creates the event registry.
   */
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.registry_ = {};
  }
  /**
   * Adds a handler function to the registry for the passed event.
   * @param {string} event The event name.
   * @param {!Function} fn The handler to be invoked when the passed
   *     event is emitted.
   */


  _createClass(EventEmitter, [{
    key: "on",
    value: function on(event, fn) {
      this.getRegistry_(event).push(fn);
    }
    /**
     * Removes a handler function from the registry for the passed event.
     * @param {string=} event The event name.
     * @param {Function=} fn The handler to be removed.
     */

  }, {
    key: "off",
    value: function off() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (event && fn) {
        var eventRegistry = this.getRegistry_(event);
        var handlerIndex = eventRegistry.indexOf(fn);

        if (handlerIndex > -1) {
          eventRegistry.splice(handlerIndex, 1);
        }
      } else {
        this.registry_ = {};
      }
    }
    /**
     * Runs all registered handlers for the passed event with the optional args.
     * @param {string} event The event name.
     * @param {...*} args The arguments to be passed to the handler.
     */

  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.getRegistry_(event).forEach(function (fn) {
        return fn.apply(void 0, args);
      });
    }
    /**
     * Returns the total number of event handlers currently registered.
     * @return {number}
     */

  }, {
    key: "getEventCount",
    value: function getEventCount() {
      var _this = this;

      var eventCount = 0;
      Object.keys(this.registry_).forEach(function (event) {
        eventCount += _this.getRegistry_(event).length;
      });
      return eventCount;
    }
    /**
     * Returns an array of handlers associated with the passed event name.
     * If no handlers have been registered, an empty array is returned.
     * @private
     * @param {string} event The event name.
     * @return {!Array} An array of handler functions.
     */

  }, {
    key: "getRegistry_",
    value: function getRegistry_(event) {
      return this.registry_[event] = this.registry_[event] || [];
    }
  }]);

  return EventEmitter;
}();



/***/ }),

/***/ "./node_modules/autotrack/lib/method-chain.js":
/*!****************************************************!*\
  !*** ./node_modules/autotrack/lib/method-chain.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MethodChain; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * The functions exported by this module make it easier (and safer) to override
 * foreign object methods (in a modular way) and respond to or modify their
 * invocation. The primary feature is the ability to override a method without
 * worrying if it's already been overridden somewhere else in the codebase. It
 * also allows for safe restoring of an overridden method by only fully
 * restoring a method once all overrides have been removed.
 */
var instances = [];
/**
 * A class that wraps a foreign object method and emit events before and
 * after the original method is called.
 */

var MethodChain =
/*#__PURE__*/
function () {
  _createClass(MethodChain, null, [{
    key: "add",

    /**
     * Adds the passed override method to the list of method chain overrides.
     * @param {!Object} context The object containing the method to chain.
     * @param {string} methodName The name of the method on the object.
     * @param {!Function} methodOverride The override method to add.
     */
    value: function add(context, methodName, methodOverride) {
      getOrCreateMethodChain(context, methodName).add(methodOverride);
    }
    /**
     * Removes a method chain added via `add()`. If the override is the
     * only override added, the original method is restored.
     * @param {!Object} context The object containing the method to unchain.
     * @param {string} methodName The name of the method on the object.
     * @param {!Function} methodOverride The override method to remove.
     */

  }, {
    key: "remove",
    value: function remove(context, methodName, methodOverride) {
      getOrCreateMethodChain(context, methodName).remove(methodOverride);
    }
    /**
     * Wraps a foreign object method and overrides it. Also stores a reference
     * to the original method so it can be restored later.
     * @param {!Object} context The object containing the method.
     * @param {string} methodName The name of the method on the object.
     */

  }]);

  function MethodChain(context, methodName) {
    var _this = this;

    _classCallCheck(this, MethodChain);

    this.context = context;
    this.methodName = methodName;
    this.isTask = /Task$/.test(methodName);
    this.originalMethodReference = this.isTask ? context.get(methodName) : context[methodName];
    this.methodChain = [];
    this.boundMethodChain = []; // Wraps the original method.

    this.wrappedMethod = function () {
      var lastBoundMethod = _this.boundMethodChain[_this.boundMethodChain.length - 1];
      return lastBoundMethod.apply(void 0, arguments);
    }; // Override original method with the wrapped one.


    if (this.isTask) {
      context.set(methodName, this.wrappedMethod);
    } else {
      context[methodName] = this.wrappedMethod;
    }
  }
  /**
   * Adds a method to the method chain.
   * @param {!Function} overrideMethod The override method to add.
   */


  _createClass(MethodChain, [{
    key: "add",
    value: function add(overrideMethod) {
      this.methodChain.push(overrideMethod);
      this.rebindMethodChain();
    }
    /**
     * Removes a method from the method chain and restores the prior order.
     * @param {!Function} overrideMethod The override method to remove.
     */

  }, {
    key: "remove",
    value: function remove(overrideMethod) {
      var index = this.methodChain.indexOf(overrideMethod);

      if (index > -1) {
        this.methodChain.splice(index, 1);

        if (this.methodChain.length > 0) {
          this.rebindMethodChain();
        } else {
          this.destroy();
        }
      }
    }
    /**
     * Loops through the method chain array and recreates the bound method
     * chain array. This is necessary any time a method is added or removed
     * to ensure proper original method context and order.
     */

  }, {
    key: "rebindMethodChain",
    value: function rebindMethodChain() {
      this.boundMethodChain = [];

      for (var method, i = 0; method = this.methodChain[i]; i++) {
        var previousMethod = this.boundMethodChain[i - 1] || this.originalMethodReference.bind(this.context);
        this.boundMethodChain.push(method(previousMethod));
      }
    }
    /**
     * Calls super and destroys the instance if no registered handlers remain.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var index = instances.indexOf(this);

      if (index > -1) {
        instances.splice(index, 1);

        if (this.isTask) {
          this.context.set(this.methodName, this.originalMethodReference);
        } else {
          this.context[this.methodName] = this.originalMethodReference;
        }
      }
    }
  }]);

  return MethodChain;
}();
/**
 * Gets a MethodChain instance for the passed object and method. If the method
 * has already been wrapped via an existing MethodChain instance, that
 * instance is returned.
 * @param {!Object} context The object containing the method.
 * @param {string} methodName The name of the method on the object.
 * @return {!MethodChain}
 */




function getOrCreateMethodChain(context, methodName) {
  var methodChain = instances.filter(function (h) {
    return h.context == context && h.methodName == methodName;
  })[0];

  if (!methodChain) {
    methodChain = new MethodChain(context, methodName);
    instances.push(methodChain);
  }

  return methodChain;
}

/***/ }),

/***/ "./node_modules/autotrack/lib/plugins/clean-url-tracker.js":
/*!*****************************************************************!*\
  !*** ./node_modules/autotrack/lib/plugins/clean-url-tracker.js ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-utils */ "./node_modules/dom-utils/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./node_modules/autotrack/lib/constants.js");
/* harmony import */ var _method_chain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../method-chain */ "./node_modules/autotrack/lib/method-chain.js");
/* harmony import */ var _provide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../provide */ "./node_modules/autotrack/lib/provide.js");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../usage */ "./node_modules/autotrack/lib/usage.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities */ "./node_modules/autotrack/lib/utilities.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * Class for the `cleanUrlTracker` analytics.js plugin.
 * @implements {CleanUrlTrackerPublicInterface}
 */

var CleanUrlTracker =
/*#__PURE__*/
function () {
  /**
   * Registers clean URL tracking on a tracker object. The clean URL tracker
   * removes query parameters from the page value reported to Google Analytics.
   * It also helps to prevent tracking similar URLs, e.g. sometimes ending a
   * URL with a slash and sometimes not.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?CleanUrlTrackerOpts} opts Passed by the require command.
   */
  function CleanUrlTracker(tracker, opts) {
    _classCallCheck(this, CleanUrlTracker);

    Object(_usage__WEBPACK_IMPORTED_MODULE_4__["trackUsage"])(tracker, _usage__WEBPACK_IMPORTED_MODULE_4__["plugins"].CLEAN_URL_TRACKER);
    /** @type {CleanUrlTrackerOpts} */

    var defaultOpts = {// stripQuery: undefined,
      // queryParamsWhitelist: undefined,
      // queryDimensionIndex: undefined,
      // indexFilename: undefined,
      // trailingSlash: undefined,
      // urlFilter: undefined,
    };
    this.opts =
    /** @type {CleanUrlTrackerOpts} */
    Object(_utilities__WEBPACK_IMPORTED_MODULE_5__["assign"])(defaultOpts, opts);
    this.tracker = tracker;
    /** @type {string|null} */

    this.queryDimension = this.opts.stripQuery && this.opts.queryDimensionIndex ? "dimension".concat(this.opts.queryDimensionIndex) : null; // Binds methods to `this`.

    this.trackerGetOverride = this.trackerGetOverride.bind(this);
    this.buildHitTaskOverride = this.buildHitTaskOverride.bind(this); // Override built-in tracker method to watch for changes.

    _method_chain__WEBPACK_IMPORTED_MODULE_2__["default"].add(tracker, 'get', this.trackerGetOverride);
    _method_chain__WEBPACK_IMPORTED_MODULE_2__["default"].add(tracker, 'buildHitTask', this.buildHitTaskOverride);
  }
  /**
   * Ensures reads of the tracker object by other plugins always see the
   * "cleaned" versions of all URL fields.
   * @param {function(string):*} originalMethod A reference to the overridden
   *     method.
   * @return {function(string):*}
   */


  _createClass(CleanUrlTracker, [{
    key: "trackerGetOverride",
    value: function trackerGetOverride(originalMethod) {
      var _this = this;

      return function (field) {
        if (field == 'page' || field == _this.queryDimension) {
          var fieldsObj =
          /** @type {!FieldsObj} */
          {
            location: originalMethod('location'),
            page: originalMethod('page')
          };

          var cleanedFieldsObj = _this.cleanUrlFields(fieldsObj);

          return cleanedFieldsObj[field];
        } else {
          return originalMethod(field);
        }
      };
    }
    /**
     * Cleans URL fields passed in a send command.
     * @param {function(!Model)} originalMethod A reference to the
     *     overridden method.
     * @return {function(!Model)}
     */

  }, {
    key: "buildHitTaskOverride",
    value: function buildHitTaskOverride(originalMethod) {
      var _this2 = this;

      return function (model) {
        var cleanedFieldsObj = _this2.cleanUrlFields({
          location: model.get('location'),
          page: model.get('page')
        });

        model.set(cleanedFieldsObj, null, true);
        originalMethod(model);
      };
    }
    /**
     * Accepts of fields object containing URL fields and returns a new
     * fields object with the URLs "cleaned" according to the tracker options.
     * @param {!FieldsObj} fieldsObj
     * @return {!FieldsObj}
     */

  }, {
    key: "cleanUrlFields",
    value: function cleanUrlFields(fieldsObj) {
      var url = Object(dom_utils__WEBPACK_IMPORTED_MODULE_0__["parseUrl"])(
      /** @type {string} */
      fieldsObj.page || fieldsObj.location);
      var pathname = url.pathname; // If an index filename was provided, remove it if it appears at the end
      // of the URL.

      if (this.opts.indexFilename) {
        var parts = pathname.split('/');

        if (this.opts.indexFilename == parts[parts.length - 1]) {
          parts[parts.length - 1] = '';
          pathname = parts.join('/');
        }
      } // Ensure the URL ends with or doesn't end with slash based on the
      // `trailingSlash` option. Note that filename URLs should never contain
      // a trailing slash.


      if (this.opts.trailingSlash == 'remove') {
        pathname = pathname.replace(/\/+$/, '');
      } else if (this.opts.trailingSlash == 'add') {
        var isFilename = /\.\w+$/.test(pathname);

        if (!isFilename && pathname.substr(-1) != '/') {
          pathname = pathname + '/';
        }
      }
      /** @type {!FieldsObj} */


      var cleanedFieldsObj = {
        page: pathname + (this.opts.stripQuery ? this.stripNonWhitelistedQueryParams(url.search) : url.search)
      };

      if (fieldsObj.location) {
        cleanedFieldsObj.location = fieldsObj.location;
      }

      if (this.queryDimension) {
        cleanedFieldsObj[this.queryDimension] = url.search.slice(1) || _constants__WEBPACK_IMPORTED_MODULE_1__["NULL_DIMENSION"];
      } // Apply the `urlFieldsFilter()` option if passed.


      if (typeof this.opts.urlFieldsFilter == 'function') {
        /** @type {!FieldsObj} */
        var userCleanedFieldsObj = this.opts.urlFieldsFilter(cleanedFieldsObj, dom_utils__WEBPACK_IMPORTED_MODULE_0__["parseUrl"]); // Ensure only the URL fields are returned.

        var returnValue = {
          page: userCleanedFieldsObj.page,
          location: userCleanedFieldsObj.location
        };

        if (this.queryDimension) {
          returnValue[this.queryDimension] = userCleanedFieldsObj[this.queryDimension];
        }

        return returnValue;
      } else {
        return cleanedFieldsObj;
      }
    }
    /**
     * Accpets a raw URL search string and returns a new search string containing
     * only the site search params (if they exist).
     * @param {string} searchString The URL search string (starting with '?').
     * @return {string} The query string
     */

  }, {
    key: "stripNonWhitelistedQueryParams",
    value: function stripNonWhitelistedQueryParams(searchString) {
      var _this3 = this;

      if (Array.isArray(this.opts.queryParamsWhitelist)) {
        var foundParams = [];
        searchString.slice(1).split('&').forEach(function (kv) {
          var _kv$split = kv.split('='),
              _kv$split2 = _slicedToArray(_kv$split, 2),
              key = _kv$split2[0],
              value = _kv$split2[1];

          if (_this3.opts.queryParamsWhitelist.indexOf(key) > -1 && value) {
            foundParams.push([key, value]);
          }
        });
        return foundParams.length ? '?' + foundParams.map(function (kv) {
          return kv.join('=');
        }).join('&') : '';
      } else {
        return '';
      }
    }
    /**
     * Restores all overridden tasks and methods.
     */

  }, {
    key: "remove",
    value: function remove() {
      _method_chain__WEBPACK_IMPORTED_MODULE_2__["default"].remove(this.tracker, 'get', this.trackerGetOverride);
      _method_chain__WEBPACK_IMPORTED_MODULE_2__["default"].remove(this.tracker, 'buildHitTask', this.buildHitTaskOverride);
    }
  }]);

  return CleanUrlTracker;
}();

Object(_provide__WEBPACK_IMPORTED_MODULE_3__["default"])('cleanUrlTracker', CleanUrlTracker);

/***/ }),

/***/ "./node_modules/autotrack/lib/plugins/event-tracker.js":
/*!*************************************************************!*\
  !*** ./node_modules/autotrack/lib/plugins/event-tracker.js ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-utils */ "./node_modules/dom-utils/index.js");
/* harmony import */ var _provide__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../provide */ "./node_modules/autotrack/lib/provide.js");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../usage */ "./node_modules/autotrack/lib/usage.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities */ "./node_modules/autotrack/lib/utilities.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Class for the `eventTracker` analytics.js plugin.
 * @implements {EventTrackerPublicInterface}
 */

var EventTracker =
/*#__PURE__*/
function () {
  /**
   * Registers declarative event tracking.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?EventTrackerOpts} opts Passed by the require command.
   */
  function EventTracker(tracker, opts) {
    var _this = this;

    _classCallCheck(this, EventTracker);

    Object(_usage__WEBPACK_IMPORTED_MODULE_2__["trackUsage"])(tracker, _usage__WEBPACK_IMPORTED_MODULE_2__["plugins"].EVENT_TRACKER); // Feature detects to prevent errors in unsupporting browsers.

    if (!window.addEventListener) return;
    /** @type {EventTrackerOpts} */

    var defaultOpts = {
      events: ['click'],
      fieldsObj: {},
      attributePrefix: 'ga-' // hitFilter: undefined,

    };
    this.opts =
    /** @type {EventTrackerOpts} */
    Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["assign"])(defaultOpts, opts);
    this.tracker = tracker; // Binds methods.

    this.handleEvents = this.handleEvents.bind(this);
    var selector = '[' + this.opts.attributePrefix + 'on]'; // Creates a mapping of events to their delegates

    this.delegates = {};
    this.opts.events.forEach(function (event) {
      _this.delegates[event] = Object(dom_utils__WEBPACK_IMPORTED_MODULE_0__["delegate"])(document, event, selector, _this.handleEvents, {
        composed: true,
        useCapture: true
      });
    });
  }
  /**
   * Handles all events on elements with event attributes.
   * @param {Event} event The DOM click event.
   * @param {Element} element The delegated DOM element target.
   */


  _createClass(EventTracker, [{
    key: "handleEvents",
    value: function handleEvents(event, element) {
      var prefix = this.opts.attributePrefix;
      var events = element.getAttribute(prefix + 'on').split(/\s*,\s*/); // Ensures the type matches one of the events specified on the element.

      if (events.indexOf(event.type) < 0) return;
      /** @type {FieldsObj} */

      var defaultFields = {
        transport: 'beacon'
      };
      var attributeFields = Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["getAttributeFields"])(element, prefix);
      var userFields = Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["assign"])({}, this.opts.fieldsObj, attributeFields);
      var hitType = attributeFields.hitType || 'event';
      this.tracker.send(hitType, Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["createFieldsObj"])(defaultFields, userFields, this.tracker, this.opts.hitFilter, element, event));
    }
    /**
     * Removes all event listeners and instance properties.
     */

  }, {
    key: "remove",
    value: function remove() {
      var _this2 = this;

      Object.keys(this.delegates).forEach(function (key) {
        _this2.delegates[key].destroy();
      });
    }
  }]);

  return EventTracker;
}();

Object(_provide__WEBPACK_IMPORTED_MODULE_1__["default"])('eventTracker', EventTracker);

/***/ }),

/***/ "./node_modules/autotrack/lib/plugins/impression-tracker.js":
/*!******************************************************************!*\
  !*** ./node_modules/autotrack/lib/plugins/impression-tracker.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _provide__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../provide */ "./node_modules/autotrack/lib/provide.js");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../usage */ "./node_modules/autotrack/lib/usage.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities */ "./node_modules/autotrack/lib/utilities.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Class for the `impressionTracker` analytics.js plugin.
 * @implements {ImpressionTrackerPublicInterface}
 */

var ImpressionTracker =
/*#__PURE__*/
function () {
  /**
   * Registers impression tracking.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?ImpressionTrackerOpts} opts Passed by the require command.
   */
  function ImpressionTracker(tracker, opts) {
    var _this = this;

    _classCallCheck(this, ImpressionTracker);

    Object(_usage__WEBPACK_IMPORTED_MODULE_1__["trackUsage"])(tracker, _usage__WEBPACK_IMPORTED_MODULE_1__["plugins"].IMPRESSION_TRACKER); // Feature detects to prevent errors in unsupporting browsers.

    if (!(window.IntersectionObserver && window.MutationObserver)) return;
    /** type {ImpressionTrackerOpts} */

    var defaultOptions = {
      // elements: undefined,
      rootMargin: '0px',
      fieldsObj: {},
      attributePrefix: 'ga-' // hitFilter: undefined,

    };
    this.opts =
    /** type {ImpressionTrackerOpts} */
    Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["assign"])(defaultOptions, opts);
    this.tracker = tracker; // Binds methods.

    this.handleDomMutations = this.handleDomMutations.bind(this);
    this.handleIntersectionChanges = this.handleIntersectionChanges.bind(this);
    this.handleDomElementAdded = this.handleDomElementAdded.bind(this);
    this.handleDomElementRemoved = this.handleDomElementRemoved.bind(this);
    /** @type {MutationObserver} */

    this.mutationObserver = null; // The primary list of elements to observe. Each item contains the
    // element ID, threshold, and whether it's currently in-view.

    this.items = []; // A map of element IDs in the `items` array to DOM elements in the
    // document. The presence of a key indicates that the element ID is in the
    // `items` array, and the presence of an element value indicates that the
    // element is in the DOM.

    this.elementMap = {}; // A map of threshold values. Each threshold is mapped to an
    // IntersectionObserver instance specific to that threshold.

    this.thresholdMap = {}; // Once the DOM is ready, start observing for changes (if present).

    Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["domReady"])(function () {
      if (_this.opts.elements) {
        _this.observeElements(_this.opts.elements);
      }
    });
  }
  /**
   * Starts observing the passed elements for impressions.
   * @param {Array<!ImpressionTrackerElementsItem|string>} elements
   */


  _createClass(ImpressionTracker, [{
    key: "observeElements",
    value: function observeElements(elements) {
      var _this2 = this;

      var data = this.deriveDataFromElements(elements); // Merge the new data with the data already on the plugin instance.

      this.items = this.items.concat(data.items);
      this.elementMap = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["assign"])({}, data.elementMap, this.elementMap);
      this.thresholdMap = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["assign"])({}, data.thresholdMap, this.thresholdMap); // Observe each new item.

      data.items.forEach(function (item) {
        var observer = _this2.thresholdMap[item.threshold] = _this2.thresholdMap[item.threshold] || new IntersectionObserver(_this2.handleIntersectionChanges, {
          rootMargin: _this2.opts.rootMargin,
          threshold: [+item.threshold]
        });
        var element = _this2.elementMap[item.id] || (_this2.elementMap[item.id] = document.getElementById(item.id));

        if (element) {
          observer.observe(element);
        }
      });

      if (!this.mutationObserver) {
        this.mutationObserver = new MutationObserver(this.handleDomMutations);
        this.mutationObserver.observe(document.body, {
          childList: true,
          subtree: true
        });
      } // TODO(philipwalton): Remove temporary hack to force a new frame
      // immediately after adding observers.
      // https://bugs.chromium.org/p/chromium/issues/detail?id=612323


      requestAnimationFrame(function () {});
    }
    /**
     * Stops observing the passed elements for impressions.
     * @param {Array<!ImpressionTrackerElementsItem|string>} elements
     * @return {undefined}
     */

  }, {
    key: "unobserveElements",
    value: function unobserveElements(elements) {
      var itemsToKeep = [];
      var itemsToRemove = [];
      this.items.forEach(function (item) {
        var itemInItems = elements.some(function (element) {
          var itemToRemove = getItemFromElement(element);
          return itemToRemove.id === item.id && itemToRemove.threshold === item.threshold && itemToRemove.trackFirstImpressionOnly === item.trackFirstImpressionOnly;
        });

        if (itemInItems) {
          itemsToRemove.push(item);
        } else {
          itemsToKeep.push(item);
        }
      }); // If there are no items to keep, run the `unobserveAllElements` logic.

      if (!itemsToKeep.length) {
        this.unobserveAllElements();
      } else {
        var dataToKeep = this.deriveDataFromElements(itemsToKeep);
        var dataToRemove = this.deriveDataFromElements(itemsToRemove);
        this.items = dataToKeep.items;
        this.elementMap = dataToKeep.elementMap;
        this.thresholdMap = dataToKeep.thresholdMap; // Unobserve removed elements.

        itemsToRemove.forEach(function (item) {
          if (!dataToKeep.elementMap[item.id]) {
            var observer = dataToRemove.thresholdMap[item.threshold];
            var element = dataToRemove.elementMap[item.id];

            if (element) {
              observer.unobserve(element);
            } // Disconnect unneeded threshold observers.


            if (!dataToKeep.thresholdMap[item.threshold]) {
              dataToRemove.thresholdMap[item.threshold].disconnect();
            }
          }
        });
      }
    }
    /**
     * Stops observing all currently observed elements.
     */

  }, {
    key: "unobserveAllElements",
    value: function unobserveAllElements() {
      var _this3 = this;

      Object.keys(this.thresholdMap).forEach(function (key) {
        _this3.thresholdMap[key].disconnect();
      });
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
      this.items = [];
      this.elementMap = {};
      this.thresholdMap = {};
    }
    /**
     * Loops through each of the passed elements and creates a map of element IDs,
     * threshold values, and a list of "items" (which contains each element's
     * `threshold` and `trackFirstImpressionOnly` property).
     * @param {Array} elements A list of elements to derive item data from.
     * @return {Object} An object with the properties `items`, `elementMap`
     *     and `threshold`.
     */

  }, {
    key: "deriveDataFromElements",
    value: function deriveDataFromElements(elements) {
      var _this4 = this;

      var items = [];
      var thresholdMap = {};
      var elementMap = {};

      if (elements.length) {
        elements.forEach(function (element) {
          var item = getItemFromElement(element);
          items.push(item);
          elementMap[item.id] = _this4.elementMap[item.id] || null;
          thresholdMap[item.threshold] = _this4.thresholdMap[item.threshold] || null;
        });
      }

      return {
        items: items,
        elementMap: elementMap,
        thresholdMap: thresholdMap
      };
    }
    /**
     * Handles nodes being added or removed from the DOM. This function is passed
     * as the callback to `this.mutationObserver`.
     * @param {Array} mutations A list of `MutationRecord` instances
     */

  }, {
    key: "handleDomMutations",
    value: function handleDomMutations(mutations) {
      for (var i = 0, mutation; mutation = mutations[i]; i++) {
        // Handles removed elements.
        for (var k = 0, removedEl; removedEl = mutation.removedNodes[k]; k++) {
          this.walkNodeTree(removedEl, this.handleDomElementRemoved);
        } // Handles added elements.


        for (var j = 0, addedEl; addedEl = mutation.addedNodes[j]; j++) {
          this.walkNodeTree(addedEl, this.handleDomElementAdded);
        }
      }
    }
    /**
     * Iterates through all descendents of a DOM node and invokes the passed
     * callback if any of them match an elememt in `elementMap`.
     * @param {Node} node The DOM node to walk.
     * @param {Function} callback A function to be invoked if a match is found.
     */

  }, {
    key: "walkNodeTree",
    value: function walkNodeTree(node, callback) {
      if (node.nodeType == 1 && node.id in this.elementMap) {
        callback(node.id);
      }

      for (var i = 0, child; child = node.childNodes[i]; i++) {
        this.walkNodeTree(child, callback);
      }
    }
    /**
     * Handles intersection changes. This function is passed as the callback to
     * `this.intersectionObserver`
     * @param {Array} records A list of `IntersectionObserverEntry` records.
     */

  }, {
    key: "handleIntersectionChanges",
    value: function handleIntersectionChanges(records) {
      var itemsToRemove = [];

      for (var i = 0, record; record = records[i]; i++) {
        for (var j = 0, item; item = this.items[j]; j++) {
          if (record.target.id !== item.id) continue;

          if (isTargetVisible(item.threshold, record)) {
            this.handleImpression(item.id);

            if (item.trackFirstImpressionOnly) {
              itemsToRemove.push(item);
            }
          }
        }
      }

      if (itemsToRemove.length) {
        this.unobserveElements(itemsToRemove);
      }
    }
    /**
     * Sends a hit to Google Analytics with the impression data.
     * @param {string} id The ID of the element making the impression.
     */

  }, {
    key: "handleImpression",
    value: function handleImpression(id) {
      var element = document.getElementById(id);
      /** @type {FieldsObj} */

      var defaultFields = {
        transport: 'beacon',
        eventCategory: 'Viewport',
        eventAction: 'impression',
        eventLabel: id,
        nonInteraction: true
      };
      /** @type {FieldsObj} */

      var userFields = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["assign"])({}, this.opts.fieldsObj, Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["getAttributeFields"])(element, this.opts.attributePrefix));
      this.tracker.send('event', Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["createFieldsObj"])(defaultFields, userFields, this.tracker, this.opts.hitFilter, element));
    }
    /**
     * Handles an element in the items array being added to the DOM.
     * @param {string} id The ID of the element that was added.
     */

  }, {
    key: "handleDomElementAdded",
    value: function handleDomElementAdded(id) {
      var _this5 = this;

      var element = this.elementMap[id] = document.getElementById(id);
      this.items.forEach(function (item) {
        if (id == item.id) {
          _this5.thresholdMap[item.threshold].observe(element);
        }
      });
    }
    /**
     * Handles an element currently being observed for intersections being
     * removed from the DOM.
     * @param {string} id The ID of the element that was removed.
     */

  }, {
    key: "handleDomElementRemoved",
    value: function handleDomElementRemoved(id) {
      var _this6 = this;

      var element = this.elementMap[id];
      this.items.forEach(function (item) {
        if (id == item.id) {
          _this6.thresholdMap[item.threshold].unobserve(element);
        }
      });
      this.elementMap[id] = null;
    }
    /**
     * Removes all listeners and observers.
     * @private
     */

  }, {
    key: "remove",
    value: function remove() {
      this.unobserveAllElements();
    }
  }]);

  return ImpressionTracker;
}();

Object(_provide__WEBPACK_IMPORTED_MODULE_0__["default"])('impressionTracker', ImpressionTracker);
/**
 * Detects whether or not an intersection record represents a visible target
 * given a particular threshold.
 * @param {number} threshold The threshold the target is visible above.
 * @param {IntersectionObserverEntry} record The most recent record entry.
 * @return {boolean} True if the target is visible.
 */

function isTargetVisible(threshold, record) {
  if (threshold === 0) {
    var i = record.intersectionRect;
    return i.top > 0 || i.bottom > 0 || i.left > 0 || i.right > 0;
  } else {
    return record.intersectionRatio >= threshold;
  }
}
/**
 * Creates an item by merging the passed element with the item defaults.
 * If the passed element is just a string, that string is treated as
 * the item ID.
 * @param {!ImpressionTrackerElementsItem|string} element The element to
 *     convert to an item.
 * @return {!ImpressionTrackerElementsItem} The item object.
 */


function getItemFromElement(element) {
  /** @type {ImpressionTrackerElementsItem} */
  var defaultOpts = {
    threshold: 0,
    trackFirstImpressionOnly: true
  };

  if (typeof element == 'string') {
    element =
    /** @type {!ImpressionTrackerElementsItem} */
    {
      id: element
    };
  }

  return Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["assign"])(defaultOpts, element);
}

/***/ }),

/***/ "./node_modules/autotrack/lib/plugins/max-scroll-tracker.js":
/*!******************************************************************!*\
  !*** ./node_modules/autotrack/lib/plugins/max-scroll-tracker.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-utils */ "./node_modules/dom-utils/index.js");
/* harmony import */ var _method_chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../method-chain */ "./node_modules/autotrack/lib/method-chain.js");
/* harmony import */ var _provide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../provide */ "./node_modules/autotrack/lib/provide.js");
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../session */ "./node_modules/autotrack/lib/session.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ "./node_modules/autotrack/lib/store.js");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../usage */ "./node_modules/autotrack/lib/usage.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities */ "./node_modules/autotrack/lib/utilities.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







/**
 * Class for the `maxScrollQueryTracker` analytics.js plugin.
 * @implements {MaxScrollTrackerPublicInterface}
 */

var MaxScrollTracker =
/*#__PURE__*/
function () {
  /**
   * Registers outbound link tracking on tracker object.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function MaxScrollTracker(tracker, opts) {
    _classCallCheck(this, MaxScrollTracker);

    Object(_usage__WEBPACK_IMPORTED_MODULE_5__["trackUsage"])(tracker, _usage__WEBPACK_IMPORTED_MODULE_5__["plugins"].MAX_SCROLL_TRACKER); // Feature detects to prevent errors in unsupporting browsers.

    if (!window.addEventListener) return;
    /** @type {MaxScrollTrackerOpts} */

    var defaultOpts = {
      increaseThreshold: 20,
      sessionTimeout: _session__WEBPACK_IMPORTED_MODULE_3__["default"].DEFAULT_TIMEOUT,
      // timeZone: undefined,
      // maxScrollMetricIndex: undefined,
      fieldsObj: {} // hitFilter: undefined

    };
    this.opts =
    /** @type {MaxScrollTrackerOpts} */
    Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["assign"])(defaultOpts, opts);
    this.tracker = tracker;
    this.pagePath = this.getPagePath(); // Binds methods to `this`.

    this.handleScroll = Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["debounce"])(this.handleScroll.bind(this), 500);
    this.trackerSetOverride = this.trackerSetOverride.bind(this); // Creates the store and binds storage change events.

    this.store = _store__WEBPACK_IMPORTED_MODULE_4__["default"].getOrCreate(tracker.get('trackingId'), 'plugins/max-scroll-tracker'); // Creates the session and binds session events.

    this.session = _session__WEBPACK_IMPORTED_MODULE_3__["default"].getOrCreate(tracker, this.opts.sessionTimeout, this.opts.timeZone); // Override the built-in tracker.set method to watch for changes.

    _method_chain__WEBPACK_IMPORTED_MODULE_1__["default"].add(tracker, 'set', this.trackerSetOverride);
    this.listenForMaxScrollChanges();
  }
  /**
   * Adds a scroll event listener if the max scroll percentage for the
   * current page isn't already at 100%.
   */


  _createClass(MaxScrollTracker, [{
    key: "listenForMaxScrollChanges",
    value: function listenForMaxScrollChanges() {
      var maxScrollPercentage = this.getMaxScrollPercentageForCurrentPage();

      if (maxScrollPercentage < 100) {
        window.addEventListener('scroll', this.handleScroll);
      }
    }
    /**
     * Removes an added scroll listener.
     */

  }, {
    key: "stopListeningForMaxScrollChanges",
    value: function stopListeningForMaxScrollChanges() {
      window.removeEventListener('scroll', this.handleScroll);
    }
    /**
     * Handles the scroll event. If the current scroll percentage is greater
     * that the stored scroll event by at least the specified increase threshold,
     * send an event with the increase amount.
     */

  }, {
    key: "handleScroll",
    value: function handleScroll() {
      var pageHeight = getPageHeight();
      var scrollPos = window.pageYOffset; // scrollY isn't supported in IE.

      var windowHeight = window.innerHeight; // Ensure scrollPercentage is an integer between 0 and 100.

      var scrollPercentage = Math.min(100, Math.max(0, Math.round(100 * (scrollPos / (pageHeight - windowHeight))))); // If the max scroll data gets out of the sync with the session data
      // (for whatever reason), clear it.

      var sessionId = this.session.getId();

      if (sessionId != this.store.get().sessionId) {
        this.store.clear();
        this.store.set({
          sessionId: sessionId
        });
      } // If the session has expired, clear the stored data and don't send any
      // events (since they'd start a new session). Note: this check is needed,
      // in addition to the above check, to handle cases where the session IDs
      // got out of sync, but the session didn't expire.


      if (this.session.isExpired(this.store.get().sessionId)) {
        this.store.clear();
      } else {
        var maxScrollPercentage = this.getMaxScrollPercentageForCurrentPage();

        if (scrollPercentage > maxScrollPercentage) {
          if (scrollPercentage == 100 || maxScrollPercentage == 100) {
            this.stopListeningForMaxScrollChanges();
          }

          var increaseAmount = scrollPercentage - maxScrollPercentage;

          if (scrollPercentage == 100 || increaseAmount >= this.opts.increaseThreshold) {
            this.setMaxScrollPercentageForCurrentPage(scrollPercentage);
            this.sendMaxScrollEvent(increaseAmount, scrollPercentage);
          }
        }
      }
    }
    /**
     * Detects changes to the tracker object and triggers an update if the page
     * field has changed.
     * @param {function((Object|string), (string|undefined))} originalMethod
     *     A reference to the overridden method.
     * @return {function((Object|string), (string|undefined))}
     */

  }, {
    key: "trackerSetOverride",
    value: function trackerSetOverride(originalMethod) {
      var _this = this;

      return function (field, value) {
        originalMethod(field, value);
        /** @type {!FieldsObj} */

        var fields = Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["isObject"])(field) ? field : _defineProperty({}, field, value);

        if (fields.page) {
          var lastPagePath = _this.pagePath;
          _this.pagePath = _this.getPagePath();

          if (_this.pagePath != lastPagePath) {
            // Since event listeners for the same function are never added twice,
            // we don't need to worry about whether we're already listening. We
            // can just add the event listener again.
            _this.listenForMaxScrollChanges();
          }
        }
      };
    }
    /**
     * Sends an event for the increased max scroll percentage amount.
     * @param {number} increaseAmount
     * @param {number} scrollPercentage
     */

  }, {
    key: "sendMaxScrollEvent",
    value: function sendMaxScrollEvent(increaseAmount, scrollPercentage) {
      /** @type {FieldsObj} */
      var defaultFields = {
        transport: 'beacon',
        eventCategory: 'Max Scroll',
        eventAction: 'increase',
        eventValue: increaseAmount,
        eventLabel: String(scrollPercentage),
        nonInteraction: true
      }; // If a custom metric was specified, set it equal to the event value.

      if (this.opts.maxScrollMetricIndex) {
        defaultFields['metric' + this.opts.maxScrollMetricIndex] = increaseAmount;
      }

      this.tracker.send('event', Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["createFieldsObj"])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
    }
    /**
     * Stores the current max scroll percentage for the current page.
     * @param {number} maxScrollPercentage
     */

  }, {
    key: "setMaxScrollPercentageForCurrentPage",
    value: function setMaxScrollPercentageForCurrentPage(maxScrollPercentage) {
      var _this$store$set;

      this.store.set((_this$store$set = {}, _defineProperty(_this$store$set, this.pagePath, maxScrollPercentage), _defineProperty(_this$store$set, "sessionId", this.session.getId()), _this$store$set));
    }
    /**
     * Gets the stored max scroll percentage for the current page.
     * @return {number}
     */

  }, {
    key: "getMaxScrollPercentageForCurrentPage",
    value: function getMaxScrollPercentageForCurrentPage() {
      return this.store.get()[this.pagePath] || 0;
    }
    /**
     * Gets the page path from the tracker object.
     * @return {number}
     */

  }, {
    key: "getPagePath",
    value: function getPagePath() {
      var url = Object(dom_utils__WEBPACK_IMPORTED_MODULE_0__["parseUrl"])(this.tracker.get('page') || this.tracker.get('location'));
      return url.pathname + url.search;
    }
    /**
     * Removes all event listeners and restores overridden methods.
     */

  }, {
    key: "remove",
    value: function remove() {
      this.session.destroy();
      this.stopListeningForMaxScrollChanges();
      _method_chain__WEBPACK_IMPORTED_MODULE_1__["default"].remove(this.tracker, 'set', this.trackerSetOverride);
    }
  }]);

  return MaxScrollTracker;
}();

Object(_provide__WEBPACK_IMPORTED_MODULE_2__["default"])('maxScrollTracker', MaxScrollTracker);
/**
 * Gets the maximum height of the page including scrollable area.
 * @return {number}
 */

function getPageHeight() {
  var html = document.documentElement;
  var body = document.body;
  return Math.max(html.offsetHeight, html.scrollHeight, body.offsetHeight, body.scrollHeight);
}

/***/ }),

/***/ "./node_modules/autotrack/lib/plugins/media-query-tracker.js":
/*!*******************************************************************!*\
  !*** ./node_modules/autotrack/lib/plugins/media-query-tracker.js ***!
  \*******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/autotrack/lib/constants.js");
/* harmony import */ var _provide__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../provide */ "./node_modules/autotrack/lib/provide.js");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../usage */ "./node_modules/autotrack/lib/usage.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities */ "./node_modules/autotrack/lib/utilities.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Declares the MediaQueryList instance cache.
 */

var mediaMap = {};
/**
 * Class for the `mediaQueryTracker` analytics.js plugin.
 * @implements {MediaQueryTrackerPublicInterface}
 */

var MediaQueryTracker =
/*#__PURE__*/
function () {
  /**
   * Registers media query tracking.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function MediaQueryTracker(tracker, opts) {
    _classCallCheck(this, MediaQueryTracker);

    Object(_usage__WEBPACK_IMPORTED_MODULE_2__["trackUsage"])(tracker, _usage__WEBPACK_IMPORTED_MODULE_2__["plugins"].MEDIA_QUERY_TRACKER); // Feature detects to prevent errors in unsupporting browsers.

    if (!window.matchMedia) return;
    /** @type {MediaQueryTrackerOpts} */

    var defaultOpts = {
      // definitions: unefined,
      changeTemplate: this.changeTemplate,
      changeTimeout: 1000,
      fieldsObj: {} // hitFilter: undefined,

    };
    this.opts =
    /** @type {MediaQueryTrackerOpts} */
    Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["assign"])(defaultOpts, opts); // Exits early if media query data doesn't exist.

    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["isObject"])(this.opts.definitions)) return;
    this.opts.definitions = Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["toArray"])(this.opts.definitions);
    this.tracker = tracker;
    this.changeListeners = [];
    this.processMediaQueries();
  }
  /**
   * Loops through each media query definition, sets the custom dimenion data,
   * and adds the change listeners.
   */


  _createClass(MediaQueryTracker, [{
    key: "processMediaQueries",
    value: function processMediaQueries() {
      var _this = this;

      this.opts.definitions.forEach(function (definition) {
        // Only processes definitions with a name and index.
        if (definition.name && definition.dimensionIndex) {
          var mediaName = _this.getMatchName(definition);

          _this.tracker.set('dimension' + definition.dimensionIndex, mediaName);

          _this.addChangeListeners(definition);
        }
      });
    }
    /**
     * Takes a definition object and return the name of the matching media item.
     * If no match is found, the NULL_DIMENSION value is returned.
     * @param {Object} definition A set of named media queries associated
     *     with a single custom dimension.
     * @return {string} The name of the matched media or NULL_DIMENSION.
     */

  }, {
    key: "getMatchName",
    value: function getMatchName(definition) {
      var match;
      definition.items.forEach(function (item) {
        if (getMediaList(item.media).matches) {
          match = item;
        }
      });
      return match ? match.name : _constants__WEBPACK_IMPORTED_MODULE_0__["NULL_DIMENSION"];
    }
    /**
     * Adds change listeners to each media query in the definition list.
     * Debounces the changes to prevent unnecessary hits from being sent.
     * @param {Object} definition A set of named media queries associated
     *     with a single custom dimension
     */

  }, {
    key: "addChangeListeners",
    value: function addChangeListeners(definition) {
      var _this2 = this;

      definition.items.forEach(function (item) {
        var mql = getMediaList(item.media);
        var fn = Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["debounce"])(function () {
          _this2.handleChanges(definition);
        }, _this2.opts.changeTimeout);
        mql.addListener(fn);

        _this2.changeListeners.push({
          mql: mql,
          fn: fn
        });
      });
    }
    /**
     * Handles changes to the matched media. When the new value differs from
     * the old value, a change event is sent.
     * @param {Object} definition A set of named media queries associated
     *     with a single custom dimension
     */

  }, {
    key: "handleChanges",
    value: function handleChanges(definition) {
      var newValue = this.getMatchName(definition);
      var oldValue = this.tracker.get('dimension' + definition.dimensionIndex);

      if (newValue !== oldValue) {
        this.tracker.set('dimension' + definition.dimensionIndex, newValue);
        /** @type {FieldsObj} */

        var defaultFields = {
          transport: 'beacon',
          eventCategory: definition.name,
          eventAction: 'change',
          eventLabel: this.opts.changeTemplate(oldValue, newValue),
          nonInteraction: true
        };
        this.tracker.send('event', Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["createFieldsObj"])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
      }
    }
    /**
     * Removes all event listeners and instance properties.
     */

  }, {
    key: "remove",
    value: function remove() {
      for (var i = 0, listener; listener = this.changeListeners[i]; i++) {
        listener.mql.removeListener(listener.fn);
      }
    }
    /**
     * Sets the default formatting of the change event label.
     * This can be overridden by setting the `changeTemplate` option.
     * @param {string} oldValue The value of the media query prior to the change.
     * @param {string} newValue The value of the media query after the change.
     * @return {string} The formatted event label.
     */

  }, {
    key: "changeTemplate",
    value: function changeTemplate(oldValue, newValue) {
      return oldValue + ' => ' + newValue;
    }
  }]);

  return MediaQueryTracker;
}();

Object(_provide__WEBPACK_IMPORTED_MODULE_1__["default"])('mediaQueryTracker', MediaQueryTracker);
/**
 * Accepts a media query and returns a MediaQueryList object.
 * Caches the values to avoid multiple unnecessary instances.
 * @param {string} media A media query value.
 * @return {MediaQueryList} The matched media.
 */

function getMediaList(media) {
  return mediaMap[media] || (mediaMap[media] = window.matchMedia(media));
}

/***/ }),

/***/ "./node_modules/autotrack/lib/plugins/outbound-link-tracker.js":
/*!*********************************************************************!*\
  !*** ./node_modules/autotrack/lib/plugins/outbound-link-tracker.js ***!
  \*********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-utils */ "./node_modules/dom-utils/index.js");
/* harmony import */ var _provide__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../provide */ "./node_modules/autotrack/lib/provide.js");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../usage */ "./node_modules/autotrack/lib/usage.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities */ "./node_modules/autotrack/lib/utilities.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/**
 * Class for the `outboundLinkTracker` analytics.js plugin.
 * @implements {OutboundLinkTrackerPublicInterface}
 */

var OutboundLinkTracker =
/*#__PURE__*/
function () {
  /**
   * Registers outbound link tracking on a tracker object.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function OutboundLinkTracker(tracker, opts) {
    var _this = this;

    _classCallCheck(this, OutboundLinkTracker);

    Object(_usage__WEBPACK_IMPORTED_MODULE_2__["trackUsage"])(tracker, _usage__WEBPACK_IMPORTED_MODULE_2__["plugins"].OUTBOUND_LINK_TRACKER); // Feature detects to prevent errors in unsupporting browsers.

    if (!window.addEventListener) return;
    /** @type {OutboundLinkTrackerOpts} */

    var defaultOpts = {
      events: ['click'],
      linkSelector: 'a, area',
      shouldTrackOutboundLink: this.shouldTrackOutboundLink,
      fieldsObj: {},
      attributePrefix: 'ga-' // hitFilter: undefined,

    };
    this.opts =
    /** @type {OutboundLinkTrackerOpts} */
    Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["assign"])(defaultOpts, opts);
    this.tracker = tracker; // Binds methods.

    this.handleLinkInteractions = this.handleLinkInteractions.bind(this); // Creates a mapping of events to their delegates

    this.delegates = {};
    this.opts.events.forEach(function (event) {
      _this.delegates[event] = Object(dom_utils__WEBPACK_IMPORTED_MODULE_0__["delegate"])(document, event, _this.opts.linkSelector, _this.handleLinkInteractions, {
        composed: true,
        useCapture: true
      });
    });
  }
  /**
   * Handles all interactions on link elements. A link is considered an outbound
   * link if its hostname property does not match location.hostname. When the
   * beacon transport method is not available, the links target is set to
   * "_blank" to ensure the hit can be sent.
   * @param {Event} event The DOM click event.
   * @param {Element} link The delegated event target.
   */


  _createClass(OutboundLinkTracker, [{
    key: "handleLinkInteractions",
    value: function handleLinkInteractions(event, link) {
      var _this2 = this;

      if (this.opts.shouldTrackOutboundLink(link, dom_utils__WEBPACK_IMPORTED_MODULE_0__["parseUrl"])) {
        var href = link.getAttribute('href') || link.getAttribute('xlink:href');
        var url = Object(dom_utils__WEBPACK_IMPORTED_MODULE_0__["parseUrl"])(href);
        /** @type {FieldsObj} */

        var defaultFields = {
          transport: 'beacon',
          eventCategory: 'Outbound Link',
          eventAction: event.type,
          eventLabel: url.href
        };
        /** @type {FieldsObj} */

        var userFields = Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["assign"])({}, this.opts.fieldsObj, Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["getAttributeFields"])(link, this.opts.attributePrefix));
        var fieldsObj = Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["createFieldsObj"])(defaultFields, userFields, this.tracker, this.opts.hitFilter, link, event);

        if (!navigator.sendBeacon && linkClickWillUnloadCurrentPage(event, link)) {
          // Adds a new event handler at the last minute to minimize the chances
          // that another event handler for this click will run after this logic.
          var clickHandler = function clickHandler() {
            window.removeEventListener('click', clickHandler); // Checks to make sure another event handler hasn't already prevented
            // the default action. If it has the custom redirect isn't needed.

            if (!event.defaultPrevented) {
              // Stops the click and waits until the hit is complete (with
              // timeout) for browsers that don't support beacon.
              event.preventDefault();
              var oldHitCallback = fieldsObj.hitCallback;
              fieldsObj.hitCallback = Object(_utilities__WEBPACK_IMPORTED_MODULE_3__["withTimeout"])(function () {
                if (typeof oldHitCallback == 'function') oldHitCallback();
                location.href = href;
              });
            }

            _this2.tracker.send('event', fieldsObj);
          };

          window.addEventListener('click', clickHandler);
        } else {
          this.tracker.send('event', fieldsObj);
        }
      }
    }
    /**
     * Determines whether or not the tracker should send a hit when a link is
     * clicked. By default links with a hostname property not equal to the current
     * hostname are tracked.
     * @param {Element} link The link that was clicked on.
     * @param {Function} parseUrlFn A cross-browser utility method for url
     *     parsing (note: renamed to disambiguate when compiling).
     * @return {boolean} Whether or not the link should be tracked.
     */

  }, {
    key: "shouldTrackOutboundLink",
    value: function shouldTrackOutboundLink(link, parseUrlFn) {
      var href = link.getAttribute('href') || link.getAttribute('xlink:href');
      var url = parseUrlFn(href);
      return url.hostname != location.hostname && url.protocol.slice(0, 4) == 'http';
    }
    /**
     * Removes all event listeners and instance properties.
     */

  }, {
    key: "remove",
    value: function remove() {
      var _this3 = this;

      Object.keys(this.delegates).forEach(function (key) {
        _this3.delegates[key].destroy();
      });
    }
  }]);

  return OutboundLinkTracker;
}();

Object(_provide__WEBPACK_IMPORTED_MODULE_1__["default"])('outboundLinkTracker', OutboundLinkTracker);
/**
 * Determines if a link click event will cause the current page to upload.
 * Note: most link clicks *will* cause the current page to unload because they
 * initiate a page navigation. The most common reason a link click won't cause
 * the page to unload is if the clicked was to open the link in a new tab.
 * @param {Event} event The DOM event.
 * @param {Element} link The link element clicked on.
 * @return {boolean} True if the current page will be unloaded.
 */

function linkClickWillUnloadCurrentPage(event, link) {
  return !( // The event type can be customized; we only care about clicks here.
  event.type != 'click' || // Links with target="_blank" set will open in a new window/tab.
  link.target == '_blank' || // On mac, command clicking will open a link in a new tab. Control
  // clicking does this on windows.
  event.metaKey || event.ctrlKey || // Shift clicking in Chrome/Firefox opens the link in a new window
  // In Safari it adds the URL to a favorites list.
  event.shiftKey || // On Mac, clicking with the option key is used to download a resouce.
  event.altKey || // Middle mouse button clicks (which == 2) are used to open a link
  // in a new tab, and right clicks (which == 3) on Firefox trigger
  // a click event.
  event.which > 1);
}

/***/ }),

/***/ "./node_modules/autotrack/lib/plugins/page-visibility-tracker.js":
/*!***********************************************************************!*\
  !*** ./node_modules/autotrack/lib/plugins/page-visibility-tracker.js ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./node_modules/autotrack/lib/constants.js");
/* harmony import */ var _method_chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../method-chain */ "./node_modules/autotrack/lib/method-chain.js");
/* harmony import */ var _provide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../provide */ "./node_modules/autotrack/lib/provide.js");
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../session */ "./node_modules/autotrack/lib/session.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ "./node_modules/autotrack/lib/store.js");
/* harmony import */ var _usage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../usage */ "./node_modules/autotrack/lib/usage.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities */ "./node_modules/autotrack/lib/utilities.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







var HIDDEN = 'hidden';
var VISIBLE = 'visible';
var PAGE_ID = Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["uuid"])();
var SECONDS = 1000;
/**
 * Class for the `pageVisibilityTracker` analytics.js plugin.
 * @implements {PageVisibilityTrackerPublicInterface}
 */

var PageVisibilityTracker =
/*#__PURE__*/
function () {
  /**
   * Registers outbound link tracking on tracker object.
   * @param {!Tracker} tracker Passed internally by analytics.js
   * @param {?Object} opts Passed by the require command.
   */
  function PageVisibilityTracker(tracker, opts) {
    var _this = this;

    _classCallCheck(this, PageVisibilityTracker);

    Object(_usage__WEBPACK_IMPORTED_MODULE_5__["trackUsage"])(tracker, _usage__WEBPACK_IMPORTED_MODULE_5__["plugins"].PAGE_VISIBILITY_TRACKER); // Feature detects to prevent errors in unsupporting browsers.

    if (!document.visibilityState) return;
    /** @type {PageVisibilityTrackerOpts} */

    var defaultOpts = {
      sessionTimeout: _session__WEBPACK_IMPORTED_MODULE_3__["default"].DEFAULT_TIMEOUT,
      visibleThreshold: 5 * SECONDS,
      // timeZone: undefined,
      sendInitialPageview: false,
      // pageLoadsMetricIndex: undefined,
      // visibleMetricIndex: undefined,
      fieldsObj: {} // hitFilter: undefined

    };
    this.opts =
    /** @type {PageVisibilityTrackerOpts} */
    Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["assign"])(defaultOpts, opts);
    this.tracker = tracker;
    this.lastPageState = document.visibilityState;
    this.visibleThresholdTimeout_ = null;
    this.isInitialPageviewSent_ = false; // Binds methods to `this`.

    this.trackerSetOverride = this.trackerSetOverride.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleWindowUnload = this.handleWindowUnload.bind(this);
    this.handleExternalStoreSet = this.handleExternalStoreSet.bind(this); // Creates the store and binds storage change events.

    this.store = _store__WEBPACK_IMPORTED_MODULE_4__["default"].getOrCreate(tracker.get('trackingId'), 'plugins/page-visibility-tracker');
    this.store.on('externalSet', this.handleExternalStoreSet); // Creates the session and binds session events.

    this.session = _session__WEBPACK_IMPORTED_MODULE_3__["default"].getOrCreate(tracker, this.opts.sessionTimeout, this.opts.timeZone); // Override the built-in tracker.set method to watch for changes.

    _method_chain__WEBPACK_IMPORTED_MODULE_1__["default"].add(tracker, 'set', this.trackerSetOverride);
    window.addEventListener('unload', this.handleWindowUnload);
    document.addEventListener('visibilitychange', this.handleChange); // Postpone sending any hits until the next call stack, which allows all
    // autotrack plugins to be required sync before any hits are sent.

    Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["deferUntilPluginsLoaded"])(this.tracker, function () {
      if (document.visibilityState == VISIBLE) {
        if (_this.opts.sendInitialPageview) {
          _this.sendPageview({
            isPageLoad: true
          });

          _this.isInitialPageviewSent_ = true;
        }

        _this.store.set(
        /** @type {PageVisibilityStoreData} */
        {
          time: Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["now"])(),
          state: VISIBLE,
          pageId: PAGE_ID,
          sessionId: _this.session.getId()
        });
      } else {
        if (_this.opts.sendInitialPageview && _this.opts.pageLoadsMetricIndex) {
          _this.sendPageLoad();
        }
      }
    });
  }
  /**
   * Inspects the last visibility state change data and determines if a
   * visibility event needs to be tracked based on the current visibility
   * state and whether or not the session has expired. If the session has
   * expired, a change to `visible` will trigger an additional pageview.
   * This method also sends as the event value (and optionally a custom metric)
   * the elapsed time between this event and the previously reported change
   * in the same session, allowing you to more accurately determine when users
   * were actually looking at your page versus when it was in the background.
   */


  _createClass(PageVisibilityTracker, [{
    key: "handleChange",
    value: function handleChange() {
      var _this2 = this;

      if (!(document.visibilityState == VISIBLE || document.visibilityState == HIDDEN)) {
        return;
      }

      var lastStoredChange = this.getAndValidateChangeData();
      /** @type {PageVisibilityStoreData} */

      var change = {
        time: Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["now"])(),
        state: document.visibilityState,
        pageId: PAGE_ID,
        sessionId: this.session.getId()
      }; // If the visibilityState has changed to visible and the initial pageview
      // has not been sent (and the `sendInitialPageview` option is `true`).
      // Send the initial pageview now.

      if (document.visibilityState == VISIBLE && this.opts.sendInitialPageview && !this.isInitialPageviewSent_) {
        this.sendPageview();
        this.isInitialPageviewSent_ = true;
      } // If the visibilityState has changed to hidden, clear any scheduled
      // pageviews waiting for the visibleThreshold timeout.


      if (document.visibilityState == HIDDEN && this.visibleThresholdTimeout_) {
        clearTimeout(this.visibleThresholdTimeout_);
      }

      if (this.session.isExpired(lastStoredChange.sessionId)) {
        this.store.clear();

        if (this.lastPageState == HIDDEN && document.visibilityState == VISIBLE) {
          // If the session has expired, changes from hidden to visible should
          // be considered a new pageview rather than a visibility event.
          // This behavior ensures all sessions contain a pageview so
          // session-level page dimensions and metrics (e.g. ga:landingPagePath
          // and ga:entrances) are correct.
          // Also, in order to prevent false positives, we add a small timeout
          // that is cleared if the visibilityState changes to hidden shortly
          // after the change to visible. This can happen if a user is quickly
          // switching through their open tabs but not actually interacting with
          // and of them. It can also happen when a user goes to a tab just to
          // immediately close it. Such cases should not be considered pageviews.
          clearTimeout(this.visibleThresholdTimeout_);
          this.visibleThresholdTimeout_ = setTimeout(function () {
            _this2.store.set(change);

            _this2.sendPageview({
              hitTime: change.time
            });
          }, this.opts.visibleThreshold);
        }
      } else {
        if (lastStoredChange.pageId == PAGE_ID && lastStoredChange.state == VISIBLE) {
          this.sendPageVisibilityEvent(lastStoredChange);
        }

        this.store.set(change);
      }

      this.lastPageState = document.visibilityState;
    }
    /**
     * Retroactively updates the stored change data in cases where it's known to
     * be out of sync.
     * This plugin keeps track of each visiblity change and stores the last one
     * in localStorage. LocalStorage is used to handle situations where the user
     * has multiple page open at the same time and we don't want to
     * double-report page visibility in those cases.
     * However, a problem can occur if a user closes a page when one or more
     * visible pages are still open. In such cases it's impossible to know
     * which of the remaining pages the user will interact with next.
     * To solve this problem we wait for the next change on any page and then
     * retroactively update the stored data to reflect the current page as being
     * the page on which the last change event occured and measure visibility
     * from that point.
     * @return {!PageVisibilityStoreData}
     */

  }, {
    key: "getAndValidateChangeData",
    value: function getAndValidateChangeData() {
      var lastStoredChange =
      /** @type {PageVisibilityStoreData} */
      this.store.get();

      if (this.lastPageState == VISIBLE && lastStoredChange.state == HIDDEN && lastStoredChange.pageId != PAGE_ID) {
        lastStoredChange.state = VISIBLE;
        lastStoredChange.pageId = PAGE_ID;
        this.store.set(lastStoredChange);
      }

      return lastStoredChange;
    }
    /**
     * Sends a Page Visibility event to track the time this page was in the
     * visible state (assuming it was in that state long enough to meet the
     * threshold).
     * @param {!PageVisibilityStoreData} lastStoredChange
     * @param {{hitTime: (number|undefined)}=} param1
     *     - hitTime: A hit timestap used to help ensure original order in cases
     *                where the send is delayed.
     */

  }, {
    key: "sendPageVisibilityEvent",
    value: function sendPageVisibilityEvent(lastStoredChange) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          hitTime = _ref.hitTime;

      var delta = this.getTimeSinceLastStoredChange(lastStoredChange, {
        hitTime: hitTime
      }); // If the detla is greater than the visibileThreshold, report it.

      if (delta && delta >= this.opts.visibleThreshold) {
        var deltaInSeconds = Math.round(delta / SECONDS);
        /** @type {FieldsObj} */

        var defaultFields = {
          transport: 'beacon',
          nonInteraction: true,
          eventCategory: 'Page Visibility',
          eventAction: 'track',
          eventValue: deltaInSeconds,
          eventLabel: _constants__WEBPACK_IMPORTED_MODULE_0__["NULL_DIMENSION"]
        };

        if (hitTime) {
          defaultFields.queueTime = Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["now"])() - hitTime;
        } // If a custom metric was specified, set it equal to the event value.


        if (this.opts.visibleMetricIndex) {
          defaultFields['metric' + this.opts.visibleMetricIndex] = deltaInSeconds;
        }

        this.tracker.send('event', Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["createFieldsObj"])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
      }
    }
    /**
     * Sends a page load event.
     */

  }, {
    key: "sendPageLoad",
    value: function sendPageLoad() {
      var _defaultFields;

      /** @type {FieldsObj} */
      var defaultFields = (_defaultFields = {
        transport: 'beacon',
        eventCategory: 'Page Visibility',
        eventAction: 'page load',
        eventLabel: _constants__WEBPACK_IMPORTED_MODULE_0__["NULL_DIMENSION"]
      }, _defineProperty(_defaultFields, 'metric' + this.opts.pageLoadsMetricIndex, 1), _defineProperty(_defaultFields, "nonInteraction", true), _defaultFields);
      this.tracker.send('event', Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["createFieldsObj"])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
    }
    /**
     * Sends a pageview, optionally calculating an offset if hitTime is passed.
     * @param {{
     *   hitTime: (number|undefined),
     *   isPageLoad: (boolean|undefined)
     * }=} param1
     *     hitTime: The timestamp of the current hit.
     *     isPageLoad: True if this pageview was also a page load.
     */

  }, {
    key: "sendPageview",
    value: function sendPageview() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          hitTime = _ref2.hitTime,
          isPageLoad = _ref2.isPageLoad;

      /** @type {FieldsObj} */
      var defaultFields = {
        transport: 'beacon'
      };

      if (hitTime) {
        defaultFields.queueTime = Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["now"])() - hitTime;
      }

      if (isPageLoad && this.opts.pageLoadsMetricIndex) {
        defaultFields['metric' + this.opts.pageLoadsMetricIndex] = 1;
      }

      this.tracker.send('pageview', Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["createFieldsObj"])(defaultFields, this.opts.fieldsObj, this.tracker, this.opts.hitFilter));
    }
    /**
     * Detects changes to the tracker object and triggers an update if the page
     * field has changed.
     * @param {function((Object|string), (string|undefined))} originalMethod
     *     A reference to the overridden method.
     * @return {function((Object|string), (string|undefined))}
     */

  }, {
    key: "trackerSetOverride",
    value: function trackerSetOverride(originalMethod) {
      var _this3 = this;

      return function (field, value) {
        /** @type {!FieldsObj} */
        var fields = Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["isObject"])(field) ? field : _defineProperty({}, field, value);

        if (fields.page && fields.page !== _this3.tracker.get('page')) {
          if (_this3.lastPageState == VISIBLE) {
            _this3.handleChange();
          }
        }

        originalMethod(field, value);
      };
    }
    /**
     * Calculates the time since the last visibility change event in the current
     * session. If the session has expired the reported time is zero.
     * @param {PageVisibilityStoreData} lastStoredChange
     * @param {{hitTime: (number|undefined)}=} param1
     *     hitTime: The time of the current hit (defaults to now).
     * @return {number} The time (in ms) since the last change.
     */

  }, {
    key: "getTimeSinceLastStoredChange",
    value: function getTimeSinceLastStoredChange(lastStoredChange) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          hitTime = _ref4.hitTime;

      return lastStoredChange.time ? (hitTime || Object(_utilities__WEBPACK_IMPORTED_MODULE_6__["now"])()) - lastStoredChange.time : 0;
    }
    /**
     * Handles responding to the `storage` event.
     * The code on this page needs to be informed when other tabs or windows are
     * updating the stored page visibility state data. This method checks to see
     * if a hidden state is stored when there are still visible tabs open, which
     * can happen if multiple windows are open at the same time.
     * @param {PageVisibilityStoreData} newData
     * @param {PageVisibilityStoreData} oldData
     */

  }, {
    key: "handleExternalStoreSet",
    value: function handleExternalStoreSet(newData, oldData) {
      // If the change times are the same, then the previous write only
      // updated the active page ID. It didn't enter a new state and thus no
      // hits should be sent.
      if (newData.time == oldData.time) return; // Page Visibility events must be sent by the tracker on the page
      // where the original event occurred. So if a change happens on another
      // page, but this page is where the previous change event occurred, then
      // this page is the one that needs to send the event (so all dimension
      // data is correct).

      if (oldData.pageId == PAGE_ID && oldData.state == VISIBLE && !this.session.isExpired(oldData.sessionId)) {
        this.sendPageVisibilityEvent(oldData, {
          hitTime: newData.time
        });
      }
    }
    /**
     * Handles responding to the `unload` event.
     * Since some browsers don't emit a `visibilitychange` event in all cases
     * where a page might be unloaded, it's necessary to hook into the `unload`
     * event to ensure the correct state is always stored.
     */

  }, {
    key: "handleWindowUnload",
    value: function handleWindowUnload() {
      // If the stored visibility state isn't hidden when the unload event
      // fires, it means the visibilitychange event didn't fire as the document
      // was being unloaded, so we invoke it manually.
      if (this.lastPageState != HIDDEN) {
        this.handleChange();
      }
    }
    /**
     * Removes all event listeners and restores overridden methods.
     */

  }, {
    key: "remove",
    value: function remove() {
      this.store.destroy();
      this.session.destroy();
      _method_chain__WEBPACK_IMPORTED_MODULE_1__["default"].remove(this.tracker, 'set', this.trackerSetOverride);
      window.removeEventListener('unload', this.handleWindowUnload);
      document.removeEventListener('visibilitychange', this.handleChange);
    }
  }]);

  return PageVisibilityTracker;
}();

Object(_provide__WEBPACK_IMPORTED_MODULE_2__["default"])('pageVisibilityTracker', PageVisibilityTracker);

/***/ }),

/***/ "./node_modules/autotrack/lib/provide.js":
/*!***********************************************!*\
  !*** ./node_modules/autotrack/lib/provide.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return provide; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/autotrack/lib/constants.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./node_modules/autotrack/lib/utilities.js");
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Provides a plugin for use with analytics.js, accounting for the possibility
 * that the global command queue has been renamed or not yet defined.
 * @param {string} pluginName The plugin name identifier.
 * @param {Function} pluginConstructor The plugin constructor function.
 */

function provide(pluginName, pluginConstructor) {
  var gaAlias = window.GoogleAnalyticsObject || 'ga';

  window[gaAlias] = window[gaAlias] || function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (window[gaAlias].q = window[gaAlias].q || []).push(args);
  }; // Adds the autotrack dev ID if not already included.


  window.gaDevIds = window.gaDevIds || [];

  if (window.gaDevIds.indexOf(_constants__WEBPACK_IMPORTED_MODULE_0__["DEV_ID"]) < 0) {
    window.gaDevIds.push(_constants__WEBPACK_IMPORTED_MODULE_0__["DEV_ID"]);
  } // Formally provides the plugin for use with analytics.js.


  window[gaAlias]('provide', pluginName, pluginConstructor); // Registers the plugin on the global gaplugins object.

  window.gaplugins = window.gaplugins || {};
  window.gaplugins[Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["capitalize"])(pluginName)] = pluginConstructor;
}

/***/ }),

/***/ "./node_modules/autotrack/lib/session.js":
/*!***********************************************!*\
  !*** ./node_modules/autotrack/lib/session.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Session; });
/* harmony import */ var _method_chain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./method-chain */ "./node_modules/autotrack/lib/method-chain.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./node_modules/autotrack/lib/store.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ "./node_modules/autotrack/lib/utilities.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var SECONDS = 1000;
var MINUTES = 60 * SECONDS;
var instances = {};
/**
 * A session management class that helps track session boundaries
 * across multiple open tabs/windows.
 */

var Session =
/*#__PURE__*/
function () {
  _createClass(Session, null, [{
    key: "getOrCreate",

    /**
     * Gets an existing instance for the passed arguments or creates a new
     * instance if one doesn't exist.
     * @param {!Tracker} tracker An analytics.js tracker object.
     * @param {number} timeout The session timeout (in minutes). This value
     *     should match what's set in the "Session settings" section of the
     *     Google Analytics admin.
     * @param {string=} timeZone The optional IANA time zone of the view. This
     *     value should match what's set in the "View settings" section of the
     *     Google Analytics admin. (Note: this assumes all views for the property
     *     use the same time zone. If that's not true, it's better not to use
     *     this feature).
     * @return {Session} The Session instance.
     */
    value: function getOrCreate(tracker, timeout, timeZone) {
      // Don't create multiple instances for the same property.
      var trackingId = tracker.get('trackingId');

      if (instances[trackingId]) {
        return instances[trackingId];
      } else {
        return instances[trackingId] = new Session(tracker, timeout, timeZone);
      }
    }
    /**
     * @param {!Tracker} tracker An analytics.js tracker object.
     * @param {number} timeout The session timeout (in minutes). This value
     *     should match what's set in the "Session settings" section of the
     *     Google Analytics admin.
     * @param {string=} timeZone The optional IANA time zone of the view. This
     *     value should match what's set in the "View settings" section of the
     *     Google Analytics admin. (Note: this assumes all views for the property
     *     use the same time zone. If that's not true, it's better not to use
     *     this feature).
     */

  }]);

  function Session(tracker, timeout, timeZone) {
    _classCallCheck(this, Session);

    this.tracker = tracker;
    this.timeout = timeout || Session.DEFAULT_TIMEOUT;
    this.timeZone = timeZone; // Binds methods.

    this.sendHitTaskOverride = this.sendHitTaskOverride.bind(this); // Overrides into the trackers sendHitTask method.

    _method_chain__WEBPACK_IMPORTED_MODULE_0__["default"].add(tracker, 'sendHitTask', this.sendHitTaskOverride); // Some browser doesn't support various features of the
    // `Intl.DateTimeFormat` API, so we have to try/catch it. Consequently,
    // this allows us to assume the presence of `this.dateTimeFormatter` means
    // it works in the current browser.

    try {
      this.dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: this.timeZone
      });
    } catch (err) {} // Do nothing.

    /** @type {SessionStoreData} */


    var defaultProps = {
      hitTime: 0,
      isExpired: false
    };
    this.store = _store__WEBPACK_IMPORTED_MODULE_1__["default"].getOrCreate(tracker.get('trackingId'), 'session', defaultProps); // Ensure the session has an ID.

    if (!this.store.get().id) {
      this.store.set(
      /** @type {SessionStoreData} */
      {
        id: Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["uuid"])()
      });
    }
  }
  /**
   * Returns the ID of the current session.
   * @return {string}
   */


  _createClass(Session, [{
    key: "getId",
    value: function getId() {
      return this.store.get().id;
    }
    /**
     * Accepts a session ID and returns true if the specified session has
     * evidentially expired. A session can expire for two reasons:
     *   - More than 30 minutes has elapsed since the previous hit
     *     was sent (The 30 minutes number is the Google Analytics default, but
     *     it can be modified in GA admin "Session settings").
     *   - A new day has started since the previous hit, in the
     *     specified time zone (should correspond to the time zone of the
     *     property's views).
     *
     * Note: since real session boundaries are determined at processing time,
     * this is just a best guess rather than a source of truth.
     *
     * @param {string} id The ID of a session to check for expiry.
     * @return {boolean} True if the session has not exp
     */

  }, {
    key: "isExpired",
    value: function isExpired() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getId();
      // If a session ID is passed and it doesn't match the current ID,
      // assume it's from an expired session. If no ID is passed, assume the ID
      // of the current session.
      if (id != this.getId()) return true;
      /** @type {SessionStoreData} */

      var sessionData = this.store.get(); // `isExpired` will be `true` if the sessionControl field was set to
      // 'end' on the previous hit.

      if (sessionData.isExpired) return true;
      var oldHitTime = sessionData.hitTime; // Only consider a session expired if previous hit time data exists, and
      // the previous hit time is greater than that session timeout period or
      // the hits occurred on different days in the session timezone.

      if (oldHitTime) {
        var currentDate = new Date();
        var oldHitDate = new Date(oldHitTime);

        if (currentDate - oldHitDate > this.timeout * MINUTES || this.datesAreDifferentInTimezone(currentDate, oldHitDate)) {
          return true;
        }
      } // For all other cases return false.


      return false;
    }
    /**
     * Returns true if (and only if) the timezone date formatting is supported
     * in the current browser and if the two dates are definitively not the
     * same date in the session timezone. Anything short of this returns false.
     * @param {!Date} d1
     * @param {!Date} d2
     * @return {boolean}
     */

  }, {
    key: "datesAreDifferentInTimezone",
    value: function datesAreDifferentInTimezone(d1, d2) {
      if (!this.dateTimeFormatter) {
        return false;
      } else {
        return this.dateTimeFormatter.format(d1) != this.dateTimeFormatter.format(d2);
      }
    }
    /**
     * Keeps track of when the previous hit was sent to determine if a session
     * has expired. Also inspects the `sessionControl` field to handles
     * expiration accordingly.
     * @param {function(!Model)} originalMethod A reference to the overridden
     *     method.
     * @return {function(!Model)}
     */

  }, {
    key: "sendHitTaskOverride",
    value: function sendHitTaskOverride(originalMethod) {
      var _this = this;

      return function (model) {
        originalMethod(model);
        var sessionControl = model.get('sessionControl');

        var sessionWillStart = sessionControl == 'start' || _this.isExpired();

        var sessionWillEnd = sessionControl == 'end';
        /** @type {SessionStoreData} */

        var sessionData = _this.store.get();

        sessionData.hitTime = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["now"])();

        if (sessionWillStart) {
          sessionData.isExpired = false;
          sessionData.id = Object(_utilities__WEBPACK_IMPORTED_MODULE_2__["uuid"])();
        }

        if (sessionWillEnd) {
          sessionData.isExpired = true;
        }

        _this.store.set(sessionData);
      };
    }
    /**
     * Restores the tracker's original `sendHitTask` to the state before
     * session control was initialized and removes this instance from the global
     * store.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      _method_chain__WEBPACK_IMPORTED_MODULE_0__["default"].remove(this.tracker, 'sendHitTask', this.sendHitTaskOverride);
      this.store.destroy();
      delete instances[this.tracker.get('trackingId')];
    }
  }]);

  return Session;
}();


Session.DEFAULT_TIMEOUT = 30; // minutes

/***/ }),

/***/ "./node_modules/autotrack/lib/store.js":
/*!*********************************************!*\
  !*** ./node_modules/autotrack/lib/store.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./event-emitter */ "./node_modules/autotrack/lib/event-emitter.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./node_modules/autotrack/lib/utilities.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var AUTOTRACK_PREFIX = 'autotrack';
var instances = {};
var isListening = false;
/** @type {boolean|undefined} */

var browserSupportsLocalStorage;
/**
 * A storage object to simplify interacting with localStorage.
 */

var Store =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(Store, _EventEmitter);

  _createClass(Store, null, [{
    key: "getOrCreate",

    /**
     * Gets an existing instance for the passed arguements or creates a new
     * instance if one doesn't exist.
     * @param {string} trackingId The tracking ID for the GA property.
     * @param {string} namespace A namespace unique to this store.
     * @param {Object=} defaults An optional object of key/value defaults.
     * @return {Store} The Store instance.
     */
    value: function getOrCreate(trackingId, namespace, defaults) {
      var key = [AUTOTRACK_PREFIX, trackingId, namespace].join(':'); // Don't create multiple instances for the same tracking Id and namespace.

      if (!instances[key]) {
        instances[key] = new Store(key, defaults);
        if (!isListening) initStorageListener();
      }

      return instances[key];
    }
    /**
     * Returns true if the browser supports and can successfully write to
     * localStorage. The results is cached so this method can be invoked many
     * times with no extra performance cost.
     * @private
     * @return {boolean}
     */

  }, {
    key: "isSupported_",
    value: function isSupported_() {
      if (browserSupportsLocalStorage != null) {
        return browserSupportsLocalStorage;
      }

      try {
        window.localStorage.setItem(AUTOTRACK_PREFIX, AUTOTRACK_PREFIX);
        window.localStorage.removeItem(AUTOTRACK_PREFIX);
        browserSupportsLocalStorage = true;
      } catch (err) {
        browserSupportsLocalStorage = false;
      }

      return browserSupportsLocalStorage;
    }
    /**
     * Wraps the native localStorage method for each stubbing in tests.
     * @private
     * @param {string} key The store key.
     * @return {string|null} The stored value.
     */

  }, {
    key: "get_",
    value: function get_(key) {
      return window.localStorage.getItem(key);
    }
    /**
     * Wraps the native localStorage method for each stubbing in tests.
     * @private
     * @param {string} key The store key.
     * @param {string} value The value to store.
     */

  }, {
    key: "set_",
    value: function set_(key, value) {
      window.localStorage.setItem(key, value);
    }
    /**
     * Wraps the native localStorage method for each stubbing in tests.
     * @private
     * @param {string} key The store key.
     */

  }, {
    key: "clear_",
    value: function clear_(key) {
      window.localStorage.removeItem(key);
    }
    /**
     * @param {string} key A key unique to this store.
     * @param {Object=} defaults An optional object of key/value defaults.
     */

  }]);

  function Store(key) {
    var _this;

    var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Store);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Store).call(this));
    _this.key_ = key;
    _this.defaults_ = defaults;
    /** @type {?Object} */

    _this.cache_ = null; // Will be set after the first get.

    return _this;
  }
  /**
   * Gets the data stored in localStorage for this store. If the cache is
   * already populated, return it as is (since it's always kept up-to-date
   * and in sync with activity in other windows via the `storage` event).
   * TODO(philipwalton): Implement schema migrations if/when a new
   * schema version is introduced.
   * @return {!Object} The stored data merged with the defaults.
   */


  _createClass(Store, [{
    key: "get",
    value: function get() {
      if (this.cache_) {
        return this.cache_;
      } else {
        if (Store.isSupported_()) {
          try {
            this.cache_ = parse(Store.get_(this.key_));
          } catch (err) {// Do nothing.
          }
        }

        return this.cache_ = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, this.defaults_, this.cache_);
      }
    }
    /**
     * Saves the passed data object to localStorage,
     * merging it with the existing data.
     * @param {Object} newData The data to save.
     */

  }, {
    key: "set",
    value: function set(newData) {
      this.cache_ = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, this.defaults_, this.cache_, newData);

      if (Store.isSupported_()) {
        try {
          Store.set_(this.key_, JSON.stringify(this.cache_));
        } catch (err) {// Do nothing.
        }
      }
    }
    /**
     * Clears the data in localStorage for the current store.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.cache_ = {};

      if (Store.isSupported_()) {
        try {
          Store.clear_(this.key_);
        } catch (err) {// Do nothing.
        }
      }
    }
    /**
     * Removes the store instance for the global instances map. If this is the
     * last store instance, the storage listener is also removed.
     * Note: this does not erase the stored data. Use `clear()` for that.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      delete instances[this.key_];

      if (!Object.keys(instances).length) {
        removeStorageListener();
      }
    }
  }]);

  return Store;
}(_event_emitter__WEBPACK_IMPORTED_MODULE_0__["default"]);
/**
 * Adds a single storage event listener and flips the global `isListening`
 * flag so multiple events aren't added.
 */




function initStorageListener() {
  window.addEventListener('storage', storageListener);
  isListening = true;
}
/**
 * Removes the storage event listener and flips the global `isListening`
 * flag so it can be re-added later.
 */


function removeStorageListener() {
  window.removeEventListener('storage', storageListener);
  isListening = false;
}
/**
 * The global storage event listener.
 * @param {!Event} event The DOM event.
 */


function storageListener(event) {
  var store = instances[event.key];

  if (store) {
    var oldData = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, store.defaults_, parse(event.oldValue));
    var newData = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["assign"])({}, store.defaults_, parse(event.newValue));
    store.cache_ = newData;
    store.emit('externalSet', newData, oldData);
  }
}
/**
 * Parses a source string as JSON
 * @param {string|null} source
 * @return {!Object} The JSON object.
 */


function parse(source) {
  var data = {};

  if (source) {
    try {
      data =
      /** @type {!Object} */
      JSON.parse(source);
    } catch (err) {// Do nothing.
    }
  }

  return data;
}

/***/ }),

/***/ "./node_modules/autotrack/lib/usage.js":
/*!*********************************************!*\
  !*** ./node_modules/autotrack/lib/usage.js ***!
  \*********************************************/
/*! exports provided: plugins, trackUsage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugins", function() { return plugins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackUsage", function() { return trackUsage; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./node_modules/autotrack/lib/constants.js");
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var plugins = {
  CLEAN_URL_TRACKER: 1,
  EVENT_TRACKER: 2,
  IMPRESSION_TRACKER: 3,
  MEDIA_QUERY_TRACKER: 4,
  OUTBOUND_FORM_TRACKER: 5,
  OUTBOUND_LINK_TRACKER: 6,
  PAGE_VISIBILITY_TRACKER: 7,
  SOCIAL_WIDGET_TRACKER: 8,
  URL_CHANGE_TRACKER: 9,
  MAX_SCROLL_TRACKER: 10
};
var PLUGIN_COUNT = Object.keys(plugins).length;
/**
 * Tracks the usage of the passed plugin by encoding a value into a usage
 * string sent with all hits for the passed tracker.
 * @param {!Tracker} tracker The analytics.js tracker object.
 * @param {number} plugin The plugin enum.
 */

function trackUsage(tracker, plugin) {
  trackVersion(tracker);
  trackPlugin(tracker, plugin);
}
/**
 * Converts a hexadecimal string to a binary string.
 * @param {string} hex A hexadecimal numeric string.
 * @return {string} a binary numeric string.
 */

function convertHexToBin(hex) {
  return parseInt(hex || '0', 16).toString(2);
}
/**
 * Converts a binary string to a hexadecimal string.
 * @param {string} bin A binary numeric string.
 * @return {string} a hexadecimal numeric string.
 */


function convertBinToHex(bin) {
  return parseInt(bin || '0', 2).toString(16);
}
/**
 * Adds leading zeros to a string if it's less than a minimum length.
 * @param {string} str A string to pad.
 * @param {number} len The minimum length of the string
 * @return {string} The padded string.
 */


function padZeros(str, len) {
  if (str.length < len) {
    var toAdd = len - str.length;

    while (toAdd) {
      str = '0' + str;
      toAdd--;
    }
  }

  return str;
}
/**
 * Accepts a binary numeric string and flips the digit from 0 to 1 at the
 * specified index.
 * @param {string} str The binary numeric string.
 * @param {number} index The index to flip the bit.
 * @return {string} The new binary string with the bit flipped on
 */


function flipBitOn(str, index) {
  return str.substr(0, index) + 1 + str.substr(index + 1);
}
/**
 * Accepts a tracker and a plugin index and flips the bit at the specified
 * index on the tracker's usage parameter.
 * @param {Object} tracker An analytics.js tracker.
 * @param {number} pluginIndex The index of the plugin in the global list.
 */


function trackPlugin(tracker, pluginIndex) {
  var usageHex = tracker.get('&' + _constants__WEBPACK_IMPORTED_MODULE_0__["USAGE_PARAM"]);
  var usageBin = padZeros(convertHexToBin(usageHex), PLUGIN_COUNT); // Flip the bit of the plugin being tracked.

  usageBin = flipBitOn(usageBin, PLUGIN_COUNT - pluginIndex); // Stores the modified usage string back on the tracker.

  tracker.set('&' + _constants__WEBPACK_IMPORTED_MODULE_0__["USAGE_PARAM"], convertBinToHex(usageBin));
}
/**
 * Accepts a tracker and adds the current version to the version param.
 * @param {Object} tracker An analytics.js tracker.
 */


function trackVersion(tracker) {
  tracker.set('&' + _constants__WEBPACK_IMPORTED_MODULE_0__["VERSION_PARAM"], _constants__WEBPACK_IMPORTED_MODULE_0__["VERSION"]);
}

/***/ }),

/***/ "./node_modules/autotrack/lib/utilities.js":
/*!*************************************************!*\
  !*** ./node_modules/autotrack/lib/utilities.js ***!
  \*************************************************/
/*! exports provided: createFieldsObj, getAttributeFields, domReady, debounce, withTimeout, deferUntilPluginsLoaded, assign, camelCase, capitalize, isObject, toArray, now, uuid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFieldsObj", function() { return createFieldsObj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttributeFields", function() { return getAttributeFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "domReady", function() { return domReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTimeout", function() { return withTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deferUntilPluginsLoaded", function() { return deferUntilPluginsLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelCase", function() { return camelCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalize", function() { return capitalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "now", function() { return now; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uuid", function() { return uuid; });
/* harmony import */ var dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dom-utils */ "./node_modules/dom-utils/index.js");
/* harmony import */ var _method_chain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./method-chain */ "./node_modules/autotrack/lib/method-chain.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Accepts default and user override fields and an optional tracker, hit
 * filter, and target element and returns a single object that can be used in
 * `ga('send', ...)` commands.
 * @param {FieldsObj} defaultFields The default fields to return.
 * @param {FieldsObj} userFields Fields set by the user to override the
 *     defaults.
 * @param {Tracker=} tracker The tracker object to apply the hit filter to.
 * @param {Function=} hitFilter A filter function that gets
 *     called with the tracker model right before the `buildHitTask`. It can
 *     be used to modify the model for the current hit only.
 * @param {Element=} target If the hit originated from an interaction
 *     with a DOM element, hitFilter is invoked with that element as the
 *     second argument.
 * @param {(Event|TwttrEvent)=} event If the hit originated via a DOM event,
 *     hitFilter is invoked with that event as the third argument.
 * @return {!FieldsObj} The final fields object.
 */

function createFieldsObj(defaultFields, userFields) {
  var tracker = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var hitFilter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var target = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
  var event = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;

  if (typeof hitFilter == 'function') {
    var originalBuildHitTask = tracker.get('buildHitTask');
    return {
      buildHitTask: function buildHitTask(
      /** @type {!Model} */
      model) {
        model.set(defaultFields, null, true);
        model.set(userFields, null, true);
        hitFilter(model, target, event);
        originalBuildHitTask(model);
      }
    };
  } else {
    return assign({}, defaultFields, userFields);
  }
}
/**
 * Retrieves the attributes from an DOM element and returns a fields object
 * for all attributes matching the passed prefix string.
 * @param {Element} element The DOM element to get attributes from.
 * @param {string} prefix An attribute prefix. Only the attributes matching
 *     the prefix will be returned on the fields object.
 * @return {FieldsObj} An object of analytics.js fields and values
 */

function getAttributeFields(element, prefix) {
  var attributes = Object(dom_utils__WEBPACK_IMPORTED_MODULE_0__["getAttributes"])(element);
  var attributeFields = {};
  Object.keys(attributes).forEach(function (attribute) {
    // The `on` prefix is used for event handling but isn't a field.
    if (attribute.indexOf(prefix) === 0 && attribute != prefix + 'on') {
      var value = attributes[attribute]; // Detects Boolean value strings.

      if (value == 'true') value = true;
      if (value == 'false') value = false;
      var field = camelCase(attribute.slice(prefix.length));
      attributeFields[field] = value;
    }
  });
  return attributeFields;
}
/**
 * Accepts a function to be invoked once the DOM is ready. If the DOM is
 * already ready, the callback is invoked immediately.
 * @param {!Function} callback The ready callback.
 */

function domReady(callback) {
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', function fn() {
      document.removeEventListener('DOMContentLoaded', fn);
      callback();
    });
  } else {
    callback();
  }
}
/**
 * Returns a function, that, as long as it continues to be called, will not
 * actually run. The function will only run after it stops being called for
 * `wait` milliseconds.
 * @param {!Function} fn The function to debounce.
 * @param {number} wait The debounce wait timeout in ms.
 * @return {!Function} The debounced function.
 */

function debounce(fn, wait) {
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return fn.apply(void 0, args);
    }, wait);
  };
}
/**
 * Accepts a function and returns a wrapped version of the function that is
 * expected to be called elsewhere in the system. If it's not called
 * elsewhere after the timeout period, it's called regardless. The wrapper
 * function also prevents the callback from being called more than once.
 * @param {!Function} callback The function to call.
 * @param {number=} wait How many milliseconds to wait before invoking
 *     the callback.
 * @return {!Function} The wrapped version of the passed function.
 */

function withTimeout(callback) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  var called = false;

  var fn = function fn() {
    if (!called) {
      called = true;
      callback();
    }
  };

  setTimeout(fn, wait);
  return fn;
} // Maps trackers to queue by tracking ID.

var queueMap = {};
/**
 * Queues a function for execution in the next call stack, or immediately
 * before any send commands are executed on the tracker. This allows
 * autotrack plugins to defer running commands until after all other plugins
 * are required but before any other hits are sent.
 * @param {!Tracker} tracker
 * @param {!Function} fn
 */

function deferUntilPluginsLoaded(tracker, fn) {
  var trackingId = tracker.get('trackingId');
  var ref = queueMap[trackingId] = queueMap[trackingId] || {};

  var processQueue = function processQueue() {
    clearTimeout(ref.timeout);

    if (ref.send) {
      _method_chain__WEBPACK_IMPORTED_MODULE_1__["default"].remove(tracker, 'send', ref.send);
    }

    delete queueMap[trackingId];
    ref.queue.forEach(function (fn) {
      return fn();
    });
  };

  clearTimeout(ref.timeout);
  ref.timeout = setTimeout(processQueue, 0);
  ref.queue = ref.queue || [];
  ref.queue.push(fn);

  if (!ref.send) {
    ref.send = function (originalMethod) {
      return function () {
        processQueue();
        originalMethod.apply(void 0, arguments);
      };
    };

    _method_chain__WEBPACK_IMPORTED_MODULE_1__["default"].add(tracker, 'send', ref.send);
  }
}
/**
 * A small shim of Object.assign that aims for brevity over spec-compliant
 * handling all the edge cases.
 * @param {!Object} target The target object to assign to.
 * @param {...?Object} sources Additional objects who properties should be
 *     assigned to target. Non-objects are converted to objects.
 * @return {!Object} The modified target object.
 */

var assign = Object.assign || function (target) {
  for (var i = 0, len = arguments.length <= 1 ? 0 : arguments.length - 1; i < len; i++) {
    var source = Object(i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
/**
 * Accepts a string containing hyphen or underscore word separators and
 * converts it to camelCase.
 * @param {string} str The string to camelCase.
 * @return {string} The camelCased version of the string.
 */

function camelCase(str) {
  return str.replace(/[\-\_]+(\w?)/g, function (match, p1) {
    return p1.toUpperCase();
  });
}
/**
 * Capitalizes the first letter of a string.
 * @param {string} str The input string.
 * @return {string} The capitalized string
 */

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Indicates whether the passed variable is a JavaScript object.
 * @param {*} value The input variable to test.
 * @return {boolean} Whether or not the test is an object.
 */

function isObject(value) {
  return _typeof(value) == 'object' && value !== null;
}
/**
 * Accepts a value that may or may not be an array. If it is not an array,
 * it is returned as the first item in a single-item array.
 * @param {*} value The value to convert to an array if it is not.
 * @return {!Array} The array-ified value.
 */

function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
/**
 * @return {number} The current date timestamp
 */

function now() {
  return +new Date();
}
/*eslint-disable */
// https://gist.github.com/jed/982883

/** @param {?=} a */

var uuid = function b(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};
/*eslint-enable */

/***/ }),

/***/ "./node_modules/dom-utils/index.js":
/*!*****************************************!*\
  !*** ./node_modules/dom-utils/index.js ***!
  \*****************************************/
/*! exports provided: closest, delegate, dispatch, getAttributes, matches, parents, parseUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_closest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/closest */ "./node_modules/dom-utils/lib/closest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "closest", function() { return _lib_closest__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _lib_delegate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/delegate */ "./node_modules/dom-utils/lib/delegate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "delegate", function() { return _lib_delegate__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _lib_dispatch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/dispatch */ "./node_modules/dom-utils/lib/dispatch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return _lib_dispatch__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _lib_get_attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/get-attributes */ "./node_modules/dom-utils/lib/get-attributes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAttributes", function() { return _lib_get_attributes__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _lib_matches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/matches */ "./node_modules/dom-utils/lib/matches.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return _lib_matches__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _lib_parents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/parents */ "./node_modules/dom-utils/lib/parents.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parents", function() { return _lib_parents__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _lib_parse_url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/parse-url */ "./node_modules/dom-utils/lib/parse-url.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseUrl", function() { return _lib_parse_url__WEBPACK_IMPORTED_MODULE_6__["default"]; });










/***/ }),

/***/ "./node_modules/dom-utils/lib/closest.js":
/*!***********************************************!*\
  !*** ./node_modules/dom-utils/lib/closest.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return closest; });
/* harmony import */ var _matches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matches */ "./node_modules/dom-utils/lib/matches.js");
/* harmony import */ var _parents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parents */ "./node_modules/dom-utils/lib/parents.js");


/**
 * Gets the closest parent element that matches the passed selector.
 * @param {Element} element The element whose parents to check.
 * @param {string} selector The CSS selector to match against.
 * @param {boolean=} shouldCheckSelf True if the selector should test against
 *     the passed element itself.
 * @return {Element|undefined} The matching element or undefined.
 */

function closest(element, selector) {
  var shouldCheckSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!(element && element.nodeType == 1 && selector)) return;
  var parentElements = (shouldCheckSelf ? [element] : []).concat(Object(_parents__WEBPACK_IMPORTED_MODULE_1__["default"])(element));

  for (var i = 0, parent; parent = parentElements[i]; i++) {
    if (Object(_matches__WEBPACK_IMPORTED_MODULE_0__["default"])(parent, selector)) return parent;
  }
}

/***/ }),

/***/ "./node_modules/dom-utils/lib/delegate.js":
/*!************************************************!*\
  !*** ./node_modules/dom-utils/lib/delegate.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return delegate; });
/* harmony import */ var _closest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./closest */ "./node_modules/dom-utils/lib/closest.js");
/* harmony import */ var _matches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matches */ "./node_modules/dom-utils/lib/matches.js");


/**
 * Delegates the handling of events for an element matching a selector to an
 * ancestor of the matching element.
 * @param {!Node} ancestor The ancestor element to add the listener to.
 * @param {string} eventType The event type to listen to.
 * @param {string} selector A CSS selector to match against child elements.
 * @param {!Function} callback A function to run any time the event happens.
 * @param {Object=} opts A configuration options object. The available options:
 *     - useCapture<boolean>: If true, bind to the event capture phase.
 *     - deep<boolean>: If true, delegate into shadow trees.
 * @return {Object} The delegate object. It contains a destroy method.
 */

function delegate(ancestor, eventType, selector, callback) {
  var opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  // Defines the event listener.
  var listener = function listener(event) {
    var delegateTarget; // If opts.composed is true and the event originated from inside a Shadow
    // tree, check the composed path nodes.

    if (opts.composed && typeof event.composedPath == 'function') {
      var composedPath = event.composedPath();

      for (var i = 0, node; node = composedPath[i]; i++) {
        if (node.nodeType == 1 && Object(_matches__WEBPACK_IMPORTED_MODULE_1__["default"])(node, selector)) {
          delegateTarget = node;
        }
      }
    } else {
      // Otherwise check the parents.
      delegateTarget = Object(_closest__WEBPACK_IMPORTED_MODULE_0__["default"])(event.target, selector, true);
    }

    if (delegateTarget) {
      callback.call(delegateTarget, event, delegateTarget);
    }
  };

  ancestor.addEventListener(eventType, listener, opts.useCapture);
  return {
    destroy: function destroy() {
      ancestor.removeEventListener(eventType, listener, opts.useCapture);
    }
  };
}

/***/ }),

/***/ "./node_modules/dom-utils/lib/dispatch.js":
/*!************************************************!*\
  !*** ./node_modules/dom-utils/lib/dispatch.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dispatch; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Dispatches an event on the passed element.
 * @param {!Element} element The DOM element to dispatch the event on.
 * @param {string} eventType The type of event to dispatch.
 * @param {Object|string=} eventName A string name of the event constructor
 *     to use. Defaults to 'Event' if nothing is passed or 'CustomEvent' if
 *     a value is set on `initDict.detail`. If eventName is given an object
 *     it is assumed to be initDict and thus reassigned.
 * @param {Object=} initDict The initialization attributes for the
 *     event. A `detail` property can be used here to pass custom data.
 * @return {boolean} The return value of `element.dispatchEvent`, which will
 *     be false if any of the event listeners called `preventDefault`.
 */
function dispatch(element, eventType) {
  var eventName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Event';
  var initDict = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var event;
  var isCustom; // eventName is optional

  if (_typeof(eventName) == 'object') {
    initDict = eventName;
    eventName = 'Event';
  }

  initDict.bubbles = initDict.bubbles || false;
  initDict.cancelable = initDict.cancelable || false;
  initDict.composed = initDict.composed || false; // If a detail property is passed, this is a custom event.

  if ('detail' in initDict) isCustom = true;
  eventName = isCustom ? 'CustomEvent' : eventName; // Tries to create the event using constructors, if that doesn't work,
  // fallback to `document.createEvent()`.

  try {
    event = new window[eventName](eventType, initDict);
  } catch (err) {
    event = document.createEvent(eventName);
    var initMethod = 'init' + (isCustom ? 'Custom' : '') + 'Event';
    event[initMethod](eventType, initDict.bubbles, initDict.cancelable, initDict.detail);
  }

  return element.dispatchEvent(event);
}

/***/ }),

/***/ "./node_modules/dom-utils/lib/get-attributes.js":
/*!******************************************************!*\
  !*** ./node_modules/dom-utils/lib/get-attributes.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getAttributes; });
/**
 * Gets all attributes of an element as a plain JavaScriot object.
 * @param {Element} element The element whose attributes to get.
 * @return {!Object} An object whose keys are the attribute keys and whose
 *     values are the attribute values. If no attributes exist, an empty
 *     object is returned.
 */
function getAttributes(element) {
  var attrs = {}; // Validate input.

  if (!(element && element.nodeType == 1)) return attrs; // Return an empty object if there are no attributes.

  var map = element.attributes;
  if (map.length === 0) return {};

  for (var i = 0, attr; attr = map[i]; i++) {
    attrs[attr.name] = attr.value;
  }

  return attrs;
}

/***/ }),

/***/ "./node_modules/dom-utils/lib/matches.js":
/*!***********************************************!*\
  !*** ./node_modules/dom-utils/lib/matches.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return matches; });
var proto = window.Element.prototype;
var nativeMatches = proto.matches || proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;
/**
 * Tests if a DOM elements matches any of the test DOM elements or selectors.
 * @param {Element} element The DOM element to test.
 * @param {Element|string|Array<Element|string>} test A DOM element, a CSS
 *     selector, or an array of DOM elements or CSS selectors to match against.
 * @return {boolean} True of any part of the test matches.
 */

function matches(element, test) {
  // Validate input.
  if (element && element.nodeType == 1 && test) {
    // if test is a string or DOM element test it.
    if (typeof test == 'string' || test.nodeType == 1) {
      return element == test || matchesSelector(element,
      /** @type {string} */
      test);
    } else if ('length' in test) {
      // if it has a length property iterate over the items
      // and return true if any match.
      for (var i = 0, item; item = test[i]; i++) {
        if (element == item || matchesSelector(element, item)) return true;
      }
    }
  } // Still here? Return false


  return false;
}
/**
 * Tests whether a DOM element matches a selector. This polyfills the native
 * Element.prototype.matches method across browsers.
 * @param {!Element} element The DOM element to test.
 * @param {string} selector The CSS selector to test element against.
 * @return {boolean} True if the selector matches.
 */

function matchesSelector(element, selector) {
  if (typeof selector != 'string') return false;
  if (nativeMatches) return nativeMatches.call(element, selector);
  var nodes = element.parentNode.querySelectorAll(selector);

  for (var i = 0, node; node = nodes[i]; i++) {
    if (node == element) return true;
  }

  return false;
}

/***/ }),

/***/ "./node_modules/dom-utils/lib/parents.js":
/*!***********************************************!*\
  !*** ./node_modules/dom-utils/lib/parents.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parents; });
/**
 * Returns an array of a DOM element's parent elements.
 * @param {!Element} element The DOM element whose parents to get.
 * @return {!Array} An array of all parent elemets, or an empty array if no
 *     parent elements are found.
 */
function parents(element) {
  var list = [];

  while (element && element.parentNode && element.parentNode.nodeType == 1) {
    element =
    /** @type {!Element} */
    element.parentNode;
    list.push(element);
  }

  return list;
}

/***/ }),

/***/ "./node_modules/dom-utils/lib/parse-url.js":
/*!*************************************************!*\
  !*** ./node_modules/dom-utils/lib/parse-url.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return parseUrl; });
var HTTP_PORT = '80';
var HTTPS_PORT = '443';
var DEFAULT_PORT = RegExp(':(' + HTTP_PORT + '|' + HTTPS_PORT + ')$');
var a = document.createElement('a');
var cache = {};
/**
 * Parses the given url and returns an object mimicing a `Location` object.
 * @param {string} url The url to parse.
 * @return {!Object} An object with the same properties as a `Location`.
 */

function parseUrl(url) {
  // All falsy values (as well as ".") should map to the current URL.
  url = !url || url == '.' ? location.href : url;
  if (cache[url]) return cache[url];
  a.href = url; // When parsing file relative paths (e.g. `../index.html`), IE will correctly
  // resolve the `href` property but will keep the `..` in the `path` property.
  // It will also not include the `host` or `hostname` properties. Furthermore,
  // IE will sometimes return no protocol or just a colon, especially for things
  // like relative protocol URLs (e.g. "//google.com").
  // To workaround all of these issues, we reparse with the full URL from the
  // `href` property.

  if (url.charAt(0) == '.' || url.charAt(0) == '/') return parseUrl(a.href); // Don't include default ports.

  var port = a.port == HTTP_PORT || a.port == HTTPS_PORT ? '' : a.port; // PhantomJS sets the port to "0" when using the file: protocol.

  port = port == '0' ? '' : port; // Sometimes IE incorrectly includes a port for default ports
  // (e.g. `:80` or `:443`) even when no port is specified in the URL.
  // http://bit.ly/1rQNoMg

  var host = a.host.replace(DEFAULT_PORT, ''); // Not all browser support `origin` so we have to build it.

  var origin = a.origin ? a.origin : a.protocol + '//' + host; // Sometimes IE doesn't include the leading slash for pathname.
  // http://bit.ly/1rQNoMg

  var pathname = a.pathname.charAt(0) == '/' ? a.pathname : '/' + a.pathname;
  return cache[url] = {
    hash: a.hash,
    host: host,
    hostname: a.hostname,
    href: a.href,
    origin: origin,
    pathname: pathname,
    port: port,
    protocol: a.protocol,
    search: a.search
  };
}

/***/ }),

/***/ "./node_modules/tti-polyfill/src/activityTrackerUtils.js":
/*!***************************************************************!*\
  !*** ./node_modules/tti-polyfill/src/activityTrackerUtils.js ***!
  \***************************************************************/
/*! exports provided: patchXMLHTTPRequest, patchFetch, observeResourceFetchingMutations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patchXMLHTTPRequest", function() { return patchXMLHTTPRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patchFetch", function() { return patchFetch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observeResourceFetchingMutations", function() { return observeResourceFetchingMutations; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Copyright 2017 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var CallCounter =
/*#__PURE__*/
function () {
  function CallCounter() {
    _classCallCheck(this, CallCounter);

    this._count = 0;
  }

  _createClass(CallCounter, [{
    key: "next",
    value: function next() {
      this._count++;
      return this._count;
    }
  }]);

  return CallCounter;
}();

var requestCounter = new CallCounter();
function patchXMLHTTPRequest(beforeXHRSendCb, onRequestCompletedCb) {
  var send = XMLHttpRequest.prototype.send;
  var requestId = requestCounter.next();

  XMLHttpRequest.prototype.send = function () {
    var _this = this;

    beforeXHRSendCb(requestId);
    this.addEventListener('readystatechange', function (e) {
      // readyState 4 corresponds to 'DONE'
      if (_this.readyState === 4) onRequestCompletedCb(requestId);
    });
    return send.apply(this, arguments);
  };
}
function patchFetch(beforeRequestCb, afterRequestCb) {
  var originalFetch = fetch;

  fetch = function fetch() {
    var _this2 = this,
        _arguments = arguments;

    return new Promise(function (resolve, reject) {
      console.log("New fetch running");
      var requestId = requestCounter.next();
      beforeRequestCb(requestId);
      originalFetch.apply(_this2, _arguments).then(function (value) {
        afterRequestCb(requestId);
        resolve(value);
      }, function (e) {
        afterRequestCb(e);
        reject(e);
      });
    });
  };
}
var _nodeTypesFetchingNetworkResources = ["img", "script", "iframe", "link", "audio", "video", "source"];

function _descendentContainsNodeType(nodeTypes, nodes) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      if (nodeTypes.includes(node.nodeName.toLowerCase())) {
        return true;
      }

      if (node.children && _descendentContainsNodeType(nodeTypes, node.children)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

function observeResourceFetchingMutations(callback) {
  var mutationObserver = new MutationObserver(function (mutations) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = mutations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var mutation = _step2.value;

        switch (mutation.type) {
          case "childList":
            if (_descendentContainsNodeType(_nodeTypesFetchingNetworkResources, mutation.addedNodes)) {
              callback(mutation);
            }

            break;

          case "attributes":
            if (_nodeTypesFetchingNetworkResources.includes(mutation.target.tagName.toLowerCase())) {
              callback(mutation);
            }

            break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
  var observerConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ['href', 'src']
  };
  mutationObserver.observe(document, observerConfig);
  return mutationObserver;
}

/***/ }),

/***/ "./node_modules/tti-polyfill/src/firstConsistentlyInteractiveCore.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tti-polyfill/src/firstConsistentlyInteractiveCore.js ***!
  \***************************************************************************/
/*! exports provided: computeFirstConsistentlyInteractive, computeLastKnownNetwork2Busy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeFirstConsistentlyInteractive", function() { return computeFirstConsistentlyInteractive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computeLastKnownNetwork2Busy", function() { return computeLastKnownNetwork2Busy; });
// Copyright 2017 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
function computeFirstConsistentlyInteractive(searchStart, minValue, lastKnownNetwork2Busy, currentTime, longTasks) {
  // Have not reached network 2-quiet yet.
  if (currentTime - lastKnownNetwork2Busy < 5000) return null;
  var maybeFCI = longTasks.length === 0 ? searchStart : longTasks[longTasks.length - 1].end; // Main thread has not been quiet for long enough.

  if (currentTime - maybeFCI < 5000) return null;
  return Math.max(maybeFCI, minValue);
}
function computeLastKnownNetwork2Busy(incompleteRequestStarts, observedResourceRequests, currentTime) {
  if (incompleteRequestStarts.length > 2) return currentTime;
  var endpoints = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = observedResourceRequests[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var req = _step.value;
      endpoints.push({
        timestamp: req.start,
        type: 'requestStart'
      });
      endpoints.push({
        timestamp: req.end,
        type: 'requestEnd'
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = incompleteRequestStarts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var ts = _step2.value;
      endpoints.push({
        timestamp: ts,
        type: 'requestStart'
      });
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  endpoints.sort(function (a, b) {
    return a.timestamp - b.timestamp;
  });
  var currentActive = incompleteRequestStarts.length;

  for (var i = endpoints.length - 1; i >= 0; i--) {
    var endpoint = endpoints[i];

    switch (endpoint.type) {
      case 'requestStart':
        currentActive--;
        break;

      case 'requestEnd':
        currentActive++;

        if (currentActive > 2) {
          return endpoint.timestamp;
        }

        break;

      default:
        throw Error("Internal Error: This should never happen");
    }
  } // If we reach here, we were never network 2-busy.


  return 0;
}

/***/ }),

/***/ "./node_modules/tti-polyfill/src/firstConsistentlyInteractiveDetector.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tti-polyfill/src/firstConsistentlyInteractiveDetector.js ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FirstConsistentlyInteractiveDetector; });
/* harmony import */ var _activityTrackerUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activityTrackerUtils.js */ "./node_modules/tti-polyfill/src/activityTrackerUtils.js");
/* harmony import */ var _firstConsistentlyInteractiveCore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./firstConsistentlyInteractiveCore.js */ "./node_modules/tti-polyfill/src/firstConsistentlyInteractiveCore.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Copyright 2017 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.



var FirstConsistentlyInteractiveDetector =
/*#__PURE__*/
function () {
  function FirstConsistentlyInteractiveDetector() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, FirstConsistentlyInteractiveDetector);

    this._debugMode = config.debugMode !== undefined ? config.debugMode : false;
    this._useMutationObserver = config.useMutationObserver !== undefined ? config.useMutationObserver : true;
    var snippetEntries = window.__tti && window.__tti.e;
    var snippetObserver = window.__tti && window.__tti.o; // If we recorded some long tasks before this class was initialized,
    // consume them now.

    if (snippetEntries) {
      this._debugLog("Consuming the long task entries already recorded.");

      this._longTasks = snippetEntries.map(function (performanceEntry) {
        return {
          start: performanceEntry.startTime,
          end: performanceEntry.startTime + performanceEntry.duration
        };
      });
    } else {
      this._longTasks = [];
    } // If we had a long task observer attached by the snippet, disconnect it
    // here. We will be adding a new long task observer soon with a more
    // complex callback.


    if (snippetObserver) {
      snippetObserver.disconnect();
    }

    this._networkRequests = [];
    this._incompleteJSInitiatedRequestStartTimes = new Map();
    this._timerId = null;
    this._timerActivationTime = -Infinity; // Timer tasks are only scheduled when detector is enabled.

    this._scheduleTimerTasks = false; // If minValue is null, by default it is DOMContentLoadedEnd.

    this._minValue = config.minValue || null;

    this._registerListeners();
  }

  _createClass(FirstConsistentlyInteractiveDetector, [{
    key: "getFirstConsistentlyInteractive",
    value: function getFirstConsistentlyInteractive() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._firstConsistentlyInteractiveResolver = resolve;

        if (document.readyState == "complete") {
          _this.startSchedulingTimerTasks();
        } else {
          window.addEventListener('load', function () {
            // You can use this to set a custom minimum value.
            // this.setMinValue(20000);
            _this.startSchedulingTimerTasks();
          });
        }
      });
    }
  }, {
    key: "startSchedulingTimerTasks",
    value: function startSchedulingTimerTasks() {
      this._debugLog("Enabling FirstConsistentlyInteractiveDetector");

      this._scheduleTimerTasks = true;
      var lastLongTaskEnd = this._longTasks.length > 0 ? this._longTasks[this._longTasks.length - 1].end : 0;
      var lastKnownNetwork2Busy = _firstConsistentlyInteractiveCore_js__WEBPACK_IMPORTED_MODULE_1__["computeLastKnownNetwork2Busy"](this._incompleteRequestStarts, this._networkRequests);
      this.rescheduleTimer(Math.max(lastKnownNetwork2Busy + 5000, lastLongTaskEnd));
    }
  }, {
    key: "setMinValue",
    value: function setMinValue(minValue) {
      this._minValue = minValue;
    } // earlistTime is a timestamp in ms, and the time is relative to navigationStart.

  }, {
    key: "rescheduleTimer",
    value: function rescheduleTimer(earliestTime) {
      var _this2 = this;

      // Check if ready to start looking for firstConsistentlyInteractive
      if (!this._scheduleTimerTasks) {
        this._debugLog("startSchedulingTimerTasks must be called before calling rescheduleTimer");

        return;
      }

      this._debugLog("Attempting to reschedule FirstConsistentlyInteractive check to ", earliestTime);

      this._debugLog("Previous timer activation time: ", this._timerActivationTime);

      if (this._timerActivationTime > earliestTime) {
        this._debugLog("Current activation time is greater than attempted reschedule time. No need to postpone.");

        return;
      }

      clearTimeout(this._timerId);
      this._timerId = setTimeout(function () {
        return _this2._checkTTI();
      }, earliestTime - performance.now());
      this._timerActivationTime = earliestTime;

      this._debugLog("Rescheduled firstConsistentlyInteractive check at ", earliestTime);
    }
  }, {
    key: "disable",
    value: function disable() {
      this._debugLog("Disabling FirstConsistentlyInteractiveDetector");

      clearTimeout(this._timerId);
      this._scheduleTimerTasks = false;

      this._unregisterListeners();
    }
  }, {
    key: "_debugLog",
    value: function _debugLog() {
      if (this._debugMode) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    }
  }, {
    key: "_registerPerformanceObserver",
    value: function _registerPerformanceObserver() {
      var _this3 = this;

      this._performanceObserver = new PerformanceObserver(function (entryList) {
        var entries = entryList.getEntries();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var entry = _step.value;

            if (entry.entryType === 'resource') {
              _this3._networkRequestFinishedCallback(entry);
            }

            if (entry.entryType === "longtask") {
              _this3._longTaskFinishedCallback(entry);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });

      this._performanceObserver.observe({
        entryTypes: ["longtask", "resource"]
      });
    }
  }, {
    key: "_registerMutationObserver",
    value: function _registerMutationObserver() {
      this._mutationObserver = _activityTrackerUtils_js__WEBPACK_IMPORTED_MODULE_0__["observeResourceFetchingMutations"](this._mutationObserverCallback.bind(this));
    }
  }, {
    key: "_registerListeners",
    value: function _registerListeners() {
      _activityTrackerUtils_js__WEBPACK_IMPORTED_MODULE_0__["patchXMLHTTPRequest"](this._beforeJSInitiatedRequestCallback.bind(this), this._afterJSInitiatedRequestCallback.bind(this));
      _activityTrackerUtils_js__WEBPACK_IMPORTED_MODULE_0__["patchFetch"](this._beforeJSInitiatedRequestCallback.bind(this), this._afterJSInitiatedRequestCallback.bind(this));

      this._registerPerformanceObserver();

      if (this._useMutationObserver) this._registerMutationObserver();
    }
  }, {
    key: "_unregisterListeners",
    value: function _unregisterListeners() {
      // We will leave the XHR / Fetch objects the way they were,
      // since we cannot guarantee they were not modified further in between.
      // Only unregister performance observers.
      if (this._performanceObserver) this._performanceObserver.disconnect();
      if (this._mutationObserver) this._mutationObserver.disconnect();
    }
  }, {
    key: "_beforeJSInitiatedRequestCallback",
    value: function _beforeJSInitiatedRequestCallback(requestId) {
      this._debugLog("Starting JS initiated request. Request ID: ", requestId);

      this._incompleteJSInitiatedRequestStartTimes.set(requestId, performance.now());

      this._debugLog("Active XHRs: ", this._incompleteJSInitiatedRequestStartTimes.size);
    }
  }, {
    key: "_afterJSInitiatedRequestCallback",
    value: function _afterJSInitiatedRequestCallback(requestId) {
      this._debugLog("Completed JS initiated request with request ID: ", requestId);

      this._incompleteJSInitiatedRequestStartTimes["delete"](requestId);

      this._debugLog("Active XHRs: ", this._incompleteJSInitiatedRequestStartTimes.size);
    }
  }, {
    key: "_networkRequestFinishedCallback",
    value: function _networkRequestFinishedCallback(performanceEntry) {
      this._debugLog("Network request finished: ", performanceEntry);

      this._networkRequests.push({
        start: performanceEntry.fetchStart,
        end: performanceEntry.responseEnd
      });

      this.rescheduleTimer(_firstConsistentlyInteractiveCore_js__WEBPACK_IMPORTED_MODULE_1__["computeLastKnownNetwork2Busy"](this._incompleteRequestStarts, this._networkRequests) + 5000);
    }
  }, {
    key: "_longTaskFinishedCallback",
    value: function _longTaskFinishedCallback(performanceEntry) {
      this._debugLog("Long task finished: ", performanceEntry);

      var taskEndTime = performanceEntry.startTime + performanceEntry.duration;

      this._longTasks.push({
        start: performanceEntry.startTime,
        end: taskEndTime
      });

      this.rescheduleTimer(taskEndTime + 5000);
    }
  }, {
    key: "_mutationObserverCallback",
    value: function _mutationObserverCallback(mutationRecord) {
      this._debugLog("Potentially network resource fetching mutation detected: ", mutationRecord);

      this._debugLog("Pushing back FirstConsistentlyInteractive check by 5 seconds.");

      this.rescheduleTimer(performance.now() + 5000);
    }
  }, {
    key: "_getMinValue",
    value: function _getMinValue() {
      if (this._minValue) return this._minValue;

      if (performance.timing.domContentLoadedEventEnd) {
        return performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
      }

      return null;
    }
  }, {
    key: "_checkTTI",
    value: function _checkTTI() {
      this._debugLog("Checking if First Consistently Interactive was reached...");

      var navigationStart = performance.timing.navigationStart;
      var lastBusy = _firstConsistentlyInteractiveCore_js__WEBPACK_IMPORTED_MODULE_1__["computeLastKnownNetwork2Busy"](this._incompleteRequestStarts, this._networkRequests);
      var firstPaint = window.chrome && window.chrome.loadTimes ? window.chrome.loadTimes().firstPaintTime * 1000 - navigationStart : 0; // First paint is not available in non-chrome browsers at the moment.

      var searchStart = firstPaint || performance.timing.domContentLoadedEventEnd - navigationStart;

      var minValue = this._getMinValue();

      var currentTime = performance.now(); // Ideally we will only start scheduling timers after DOMContentLoaded and
      // this case should never be hit.

      if (minValue === null) {
        this._debugLog("No usable minimum value yet. Postponing check.");

        this.rescheduleTimer(Math.max(lastBusy + 5000, performance.now() + 1000));
      }

      this._debugLog("Parameter values: ");

      this._debugLog("NavigationStart: ", navigationStart);

      this._debugLog("lastKnownNetwork2Busy: ", lastBusy);

      this._debugLog("Search Start: ", searchStart);

      this._debugLog("Min Value: ", minValue);

      this._debugLog("Last busy: ", lastBusy);

      this._debugLog("Current time: ", currentTime);

      this._debugLog("Long tasks: ", this._longTasks);

      this._debugLog("Incomplete JS Request Start Times: ", this._incompleteRequestStarts);

      this._debugLog("Network requests: ", this._networkRequests);

      var maybeFCI = _firstConsistentlyInteractiveCore_js__WEBPACK_IMPORTED_MODULE_1__["computeFirstConsistentlyInteractive"](searchStart, minValue, lastBusy, currentTime, this._longTasks);

      if (maybeFCI) {
        this._firstConsistentlyInteractiveResolver(maybeFCI);

        this.disable();
      } // First Consistently Interactive was not reached for whatever reasons. Check again in
      // one second.
      // Eventually we should become confident enough in our scheduler logic to
      // get rid of this step.


      this._debugLog("Could not detect First Consistently Interactive. Retrying in 1 second.");

      this.rescheduleTimer(performance.now() + 1000);
    }
  }, {
    key: "_incompleteRequestStarts",
    get: function get() {
      return _toConsumableArray(this._incompleteJSInitiatedRequestStartTimes.values());
    }
  }]);

  return FirstConsistentlyInteractiveDetector;
}();



/***/ }),

/***/ "./node_modules/tti-polyfill/src/index.js":
/*!************************************************!*\
  !*** ./node_modules/tti-polyfill/src/index.js ***!
  \************************************************/
/*! exports provided: getFirstConsistentlyInteractive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstConsistentlyInteractive", function() { return getFirstConsistentlyInteractive; });
/* harmony import */ var _firstConsistentlyInteractiveDetector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firstConsistentlyInteractiveDetector.js */ "./node_modules/tti-polyfill/src/firstConsistentlyInteractiveDetector.js");
// Copyright 2017 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var getFirstConsistentlyInteractive = function getFirstConsistentlyInteractive(opts) {
  if (!window.PerformanceLongTaskTiming) {
    return Promise.resolve(null);
  } else {
    var detector = new _firstConsistentlyInteractiveDetector_js__WEBPACK_IMPORTED_MODULE_0__["default"](opts);
    return detector.getFirstConsistentlyInteractive();
  }
};

/***/ }),

/***/ "./node_modules/uuid/rng-browser.js":
/*!******************************************!*\
  !*** ./node_modules/uuid/rng-browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/uuid/uuid.js":
/*!***********************************!*\
  !*** ./node_modules/uuid/uuid.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = __webpack_require__(/*! ./rng */ "./node_modules/uuid/rng-browser.js");

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;


/***/ })

}]);
//# sourceMappingURL=common.js.map