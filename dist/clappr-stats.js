(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Clappr"));
	else if(typeof define === 'function' && define.amd)
		define(["Clappr"], factory);
	else if(typeof exports === 'object')
		exports["ClapprStats"] = factory(require("Clappr"));
	else
		root["ClapprStats"] = factory(root["Clappr"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__clappr_core__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "latest/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/clappr-stats.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/lodash.get/index.js":
/*!******************************************!*\
  !*** ./node_modules/lodash.get/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

/** Built-in value references. */
var _Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function (string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return func + '';
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || resolver && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),

/***/ "./src/clappr-stats.js":
/*!*****************************!*\
  !*** ./src/clappr-stats.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = __webpack_require__(/*! @clappr/core */ "@clappr/core");

var _lodash = __webpack_require__(/*! lodash.get */ "./node_modules/lodash.get/index.js");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClapprStats = function (_ContainerPlugin) {
  _inherits(ClapprStats, _ContainerPlugin);

  _createClass(ClapprStats, [{
    key: '_now',
    value: function _now() {
      var hasPerformanceSupport = window.performance && typeof window.performance.now === 'function';
      return hasPerformanceSupport ? window.performance.now() : new Date();
    }
  }, {
    key: '_inc',
    value: function _inc(counter) {
      this._metrics.counters[counter] += 1;
    }
  }, {
    key: '_timerHasStarted',
    value: function _timerHasStarted(timer) {
      return this['_start' + timer] !== undefined;
    }
  }, {
    key: '_start',
    value: function _start(timer) {
      this['_start' + timer] = this._now();
    }
  }, {
    key: '_stop',
    value: function _stop(timer) {
      this._metrics.timers[timer] += this._now() - this['_start' + timer];
    }
  }, {
    key: '_defaultReport',
    value: function _defaultReport(metrics) {
      console.log(metrics);
    } //eslint-disable-line no-console

  }, {
    key: 'name',
    get: function get() {
      return 'clappr_stats';
    }
  }, {
    key: 'supportedVersion',
    get: function get() {
      return { min: '0.4.2' };
    }
  }, {
    key: '_playbackName',
    get: function get() {
      return this.container.playback.name;
    }
  }, {
    key: '_playbackType',
    get: function get() {
      return this.container.getPlaybackType();
    }
  }]);

  function ClapprStats(container) {
    _classCallCheck(this, ClapprStats);

    var _this = _possibleConstructorReturn(this, (ClapprStats.__proto__ || Object.getPrototypeOf(ClapprStats)).call(this, container));

    _this._runEach = (0, _lodash2.default)(container, 'options.clapprStats.runEach', 5000);
    _this._onReport = (0, _lodash2.default)(container, 'options.clapprStats.onReport', _this._defaultReport);
    _this._uriToMeasureLatency = (0, _lodash2.default)(container, 'options.clapprStats.uriToMeasureLatency');
    _this._urisToMeasureBandwidth = (0, _lodash2.default)(container, 'options.clapprStats.urisToMeasureBandwidth');
    _this._runBandwidthTestEvery = (0, _lodash2.default)(container, 'options.clapprStats.runBandwidthTestEvery', 10);
    _this._bwMeasureCount = 0;

    _this._completion = {
      watch: (0, _lodash2.default)(container, 'options.clapprStats.onCompletion', []),
      calls: []
    };

    _this._newMetrics();
    _this.on(ClapprStats.REPORT_EVENT, _this._onReport);
    return _this;
  }

  _createClass(ClapprStats, [{
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.listenTo(this.container, _core.Events.CONTAINER_BITRATE, this.onBitrate);
      this.listenTo(this.container, _core.Events.CONTAINER_STOP, this.stopReporting);
      this.listenTo(this.container, _core.Events.CONTAINER_ENDED, this.stopReporting);
      this.listenToOnce(this.container.playback, _core.Events.PLAYBACK_PLAY_INTENT, this.startTimers);
      this.listenToOnce(this.container, _core.Events.CONTAINER_PLAY, this.onFirstPlaying);
      this.listenTo(this.container, _core.Events.CONTAINER_PLAY, this.onPlay);
      this.listenTo(this.container, _core.Events.CONTAINER_PAUSE, this.onPause);
      this.listenToOnce(this.container, _core.Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
      this.listenTo(this.container, _core.Events.CONTAINER_SEEK, this.onSeek);
      this.listenTo(this.container, _core.Events.CONTAINER_ERROR, function () {
        return _this2._inc('error');
      });
      this.listenTo(this.container, _core.Events.CONTAINER_FULLSCREEN, function () {
        return _this2._inc('fullscreen');
      });
      this.listenTo(this.container, _core.Events.CONTAINER_PLAYBACKDVRSTATECHANGED, function (dvrInUse) {
        dvrInUse && _this2._inc('dvrUsage');
      });
      this.listenTo(this.container.playback, _core.Events.PLAYBACK_PROGRESS, this.onProgress);
      this.listenTo(this.container.playback, _core.Events.PLAYBACK_TIMEUPDATE, this.onTimeUpdate);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.stopReporting();
      _get(ClapprStats.prototype.__proto__ || Object.getPrototypeOf(ClapprStats.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'onBitrate',
    value: function onBitrate(newBitrate) {
      var bitrate = parseInt((0, _lodash2.default)(newBitrate, 'bitrate', 0), 10);
      var now = this._now();

      if (this._metrics.extra.bitratesHistory.length > 0) {
        var beforeLast = this._metrics.extra.bitratesHistory[this._metrics.extra.bitratesHistory.length - 1];
        beforeLast.end = now;
        beforeLast.time = now - beforeLast.start;
      }

      this._metrics.extra.bitratesHistory.push({ start: this._now(), bitrate: bitrate });

      this._inc('changeLevel');
    }
  }, {
    key: 'stopReporting',
    value: function stopReporting() {
      this._buildReport();

      clearInterval(this._intervalId);
      this._newMetrics();

      this.stopListening();
      this.bindEvents();
    }
  }, {
    key: 'startTimers',
    value: function startTimers() {
      this._intervalId = setInterval(this._buildReport.bind(this), this._runEach);
      this._start('session');
      this._start('startup');
    }
  }, {
    key: 'onFirstPlaying',
    value: function onFirstPlaying() {
      this.listenTo(this.container, _core.Events.CONTAINER_TIMEUPDATE, this.onContainerUpdateWhilePlaying);

      this._start('watch');
      this._stop('startup');
    }
  }, {
    key: 'playAfterPause',
    value: function playAfterPause() {
      this.listenTo(this.container, _core.Events.CONTAINER_TIMEUPDATE, this.onContainerUpdateWhilePlaying);
      this._stop('pause');
      this._start('watch');
    }
  }, {
    key: 'onPlay',
    value: function onPlay() {
      this._inc('play');
    }
  }, {
    key: 'onPause',
    value: function onPause() {
      this._stop('watch');
      this._start('pause');
      this._inc('pause');
      this.listenToOnce(this.container, _core.Events.CONTAINER_PLAY, this.playAfterPause);
      this.stopListening(this.container, _core.Events.CONTAINER_TIMEUPDATE, this.onContainerUpdateWhilePlaying);
    }
  }, {
    key: 'onSeek',
    value: function onSeek(e) {
      this._inc('seek');
      this._metrics.extra.watchHistory.push([e * 1000, e * 1000]);
    }
  }, {
    key: 'onTimeUpdate',
    value: function onTimeUpdate(e) {
      var current = e.current * 1000,
          total = e.total * 1000,
          l = this._metrics.extra.watchHistory.length;

      this._metrics.extra.duration = total;
      this._metrics.extra.currentTime = current;
      this._metrics.extra.watchedPercentage = current / total * 100;

      if (l === 0) {
        this._metrics.extra.watchHistory.push([current, current]);
      } else {
        this._metrics.extra.watchHistory[l - 1][1] = current;
      }

      if (this._metrics.extra.bitratesHistory.length > 0) {
        var lastBitrate = this._metrics.extra.bitratesHistory[this._metrics.extra.bitratesHistory.length - 1];
        if (!lastBitrate.end) {
          lastBitrate.time = this._now() - lastBitrate.start;
        }
      }

      this._onCompletion();
    }
  }, {
    key: 'onContainerUpdateWhilePlaying',
    value: function onContainerUpdateWhilePlaying() {
      if (this.container.playback.isPlaying()) {
        this._stop('watch');
        this._start('watch');
      }
    }
  }, {
    key: 'onBuffering',
    value: function onBuffering() {
      this._inc('buffering');
      this._start('buffering');
      this.listenToOnce(this.container, _core.Events.CONTAINER_STATE_BUFFERFULL, this.onBufferfull);
    }
  }, {
    key: 'onBufferfull',
    value: function onBufferfull() {
      this._stop('buffering');
      this.listenToOnce(this.container, _core.Events.CONTAINER_STATE_BUFFERING, this.onBuffering);
    }
  }, {
    key: 'onProgress',
    value: function onProgress(progress) {
      this._metrics.extra.buffersize = progress.current * 1000;
    }
  }, {
    key: '_newMetrics',
    value: function _newMetrics() {
      this._metrics = {
        counters: {
          play: 0, pause: 0, error: 0, buffering: 0, decodedFrames: 0, droppedFrames: 0,
          fps: 0, changeLevel: 0, seek: 0, fullscreen: 0, dvrUsage: 0
        },
        timers: {
          startup: 0, watch: 0, pause: 0, buffering: 0, session: 0, latency: 0
        },
        extra: {
          playbackName: '', playbackType: '', bitratesHistory: [], bitrateWeightedMean: 0,
          bitrateMostUsed: 0, buffersize: 0, watchHistory: [], watchedPercentage: 0,
          bufferingPercentage: 0, bandwidth: 0, duration: 0, currentTime: 0
        }
      };
    }
  }, {
    key: '_onCompletion',
    value: function _onCompletion() {
      var currentPercentage = this._metrics.extra.watchedPercentage;
      var allPercentages = this._completion.watch;
      var isCalled = this._completion.calls.indexOf(currentPercentage) != -1;

      if (allPercentages.indexOf(currentPercentage) != -1 && !isCalled) {
        _core.Log.info(this.name + ' PERCENTAGE_EVENT: ' + currentPercentage);
        this._completion.calls.push(currentPercentage);
        this.trigger(ClapprStats.PERCENTAGE_EVENT, currentPercentage);
      }
    }
  }, {
    key: '_buildReport',
    value: function _buildReport() {
      this._stop('session');
      this._start('session');

      this._metrics.extra.playbackName = this._playbackName;
      this._metrics.extra.playbackType = this._playbackType;

      this._calculateBitrates();
      this._calculatePercentages();
      this._fetchFPS();
      this._measureLatency();
      this._measureBandwidth();

      this.trigger(ClapprStats.REPORT_EVENT, JSON.parse(JSON.stringify(this._metrics)));
    }
  }, {
    key: '_fetchFPS',
    value: function _fetchFPS() {
      // flashls ??? - hls.droppedFramesl hls.stream.bufferLength (seconds)
      // hls ??? (use the same?)
      var fetchFPS = {
        'html5_video': this._html5FetchFPS,
        'hls': this._html5FetchFPS,
        'dash_shaka_playback': this._html5FetchFPS
      };

      fetchFPS[this._playbackName] && fetchFPS[this._playbackName].call(this);
    }
  }, {
    key: '_calculateBitrates',
    value: function _calculateBitrates() {
      var totalTime = this._metrics.extra.bitratesHistory.map(function (x) {
        return x.time;
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
      this._metrics.extra.bitrateWeightedMean = this._metrics.extra.bitratesHistory.map(function (x) {
        return x.bitrate * x.time;
      }).reduce(function (a, b) {
        return a + b;
      }, 0) / totalTime;

      if (this._metrics.extra.bitratesHistory.length > 0) {
        this._metrics.extra.bitrateMostUsed = this._metrics.extra.bitratesHistory.slice().sort(function (a, b) {
          return a.time < b.time;
        })[0].bitrate;
      }
    }
  }, {
    key: '_calculatePercentages',
    value: function _calculatePercentages() {
      if (this._metrics.extra.duration > 0) {
        this._metrics.extra.bufferingPercentage = this._metrics.timers.buffering / this._metrics.extra.duration * 100;
      }
    }
  }, {
    key: '_html5FetchFPS',
    value: function _html5FetchFPS() {
      var videoTag = this.container.playback.el;
      var decodedFrames = videoTag.webkitDecodedFrameCount || videoTag.mozDecodedFrames || 0;
      var droppedFrames = videoTag.webkitDroppedFrameCount || videoTag.mozParsedFrames - videoTag.mozDecodedFrames || 0;
      var decodedFramesLastTime = decodedFrames - (this._lastDecodedFramesCount || 0);

      this._metrics.counters.decodedFrames = decodedFrames;
      this._metrics.counters.droppedFrames = droppedFrames;
      this._metrics.counters.fps = decodedFramesLastTime / (this._runEach / 1000);

      this._lastDecodedFramesCount = decodedFrames;
    }

    // originally from https://www.smashingmagazine.com/2011/11/analyzing-network-characteristics-using-javascript-and-the-dom-part-1/

  }, {
    key: '_measureLatency',
    value: function _measureLatency() {
      var _this3 = this;

      if (this._uriToMeasureLatency) {
        var t = [],
            n = 2,
            rtt;
        var ld = function ld() {
          t.push(_this3._now());
          if (t.length > n) done();else {
            var img = new Image();
            img.onload = ld;
            img.src = _this3._uriToMeasureLatency + '?' + Math.random() + '=' + _this3._now();
          }
        };
        var done = function done() {
          rtt = t[2] - t[1];
          _this3._metrics.timers.latency = rtt;
        };
        ld();
      }
    }

    // originally from https://www.smashingmagazine.com/2011/11/analyzing-network-characteristics-using-javascript-and-the-dom-part-1/

  }, {
    key: '_measureBandwidth',
    value: function _measureBandwidth() {
      var _this4 = this;

      if (this._urisToMeasureBandwidth && this._bwMeasureCount % this._runBandwidthTestEvery == 0) {
        var i = 0;

        var ld = function ld(e) {
          if (i > 0) {
            _this4._urisToMeasureBandwidth[i - 1].end = _this4._now();
            clearTimeout(_this4._urisToMeasureBandwidth[i - 1].timer);
          }
          if (i >= _this4._urisToMeasureBandwidth.length || i > 0 && _this4._urisToMeasureBandwidth[i - 1].expired) done(e);else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', _this4._urisToMeasureBandwidth[i].url, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = xhr.onabort = ld;
            _this4._urisToMeasureBandwidth[i].start = _this4._now();
            _this4._urisToMeasureBandwidth[i].timer = setTimeout(function (j) {
              _this4._urisToMeasureBandwidth[j].expired = true;
              xhr.abort();
            }, _this4._urisToMeasureBandwidth[i].timeout, i);
            xhr.send();
          }
          i++;
        };

        var done = function done(e) {
          var timeSpent = (_this4._urisToMeasureBandwidth[i - 1].end - _this4._urisToMeasureBandwidth[i - 1].start) / 1000;
          var bandwidthBps = e.loaded * 8 / timeSpent;
          _this4._metrics.extra.bandwidth = bandwidthBps;
          _this4._urisToMeasureBandwidth.forEach(function (x) {
            x.start = 0;
            x.end = 0;
            x.expired = false;
            clearTimeout(x.timer);
          });
        };

        ld();
      }
      this._bwMeasureCount++;
    }
  }]);

  return ClapprStats;
}(_core.ContainerPlugin);

exports.default = ClapprStats;


ClapprStats.REPORT_EVENT = 'clappr:stats:report';
ClapprStats.PERCENTAGE_EVENT = 'clappr:stats:percentage';
module.exports = exports['default'];

/***/ }),

/***/ "@clappr/core":
/*!*************************!*\
  !*** external "Clappr" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__clappr_core__;

/***/ })

/******/ });
});
//# sourceMappingURL=clappr-stats.js.map