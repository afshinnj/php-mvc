/**
 * @license AngularJS v1.6.1
 * (c) 2010-2016 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window) {'use strict';

/**
 * @description
 *
 * This object provides a utility for producing rich Error messages within
 * Angular. It can be called as follows:
 *
 * var exampleMinErr = minErr('example');
 * throw exampleMinErr('one', 'This {0} is {1}', foo, bar);
 *
 * The above creates an instance of minErr in the example namespace. The
 * resulting error will have a namespaced error code of example.one.  The
 * resulting error will replace {0} with the value of foo, and {1} with the
 * value of bar. The object is not restricted in the number of arguments it can
 * take.
 *
 * If fewer arguments are specified than necessary for interpolation, the extra
 * interpolation markers will be preserved in the final string.
 *
 * Since data will be parsed statically during a build step, some restrictions
 * are applied with respect to how minErr instances are created and called.
 * Instances should have names of the form namespaceMinErr for a minErr created
 * using minErr('namespace') . Error codes, namespaces and template strings
 * should all be static strings, not variables or general expressions.
 *
 * @param {string} module The namespace to use for the new minErr instance.
 * @param {function} ErrorConstructor Custom error constructor to be instantiated when returning
 *   error from returned function, for cases when a particular type of error is useful.
 * @returns {function(code:string, template:string, ...templateArgs): Error} minErr instance
 */

function minErr(module, ErrorConstructor) {
  ErrorConstructor = ErrorConstructor || Error;
  return function() {
    var SKIP_INDEXES = 2;

    var templateArgs = arguments,
      code = templateArgs[0],
      message = '[' + (module ? module + ':' : '') + code + '] ',
      template = templateArgs[1],
      paramPrefix, i;

    message += template.replace(/\{\d+\}/g, function(match) {
      var index = +match.slice(1, -1),
        shiftedIndex = index + SKIP_INDEXES;

      if (shiftedIndex < templateArgs.length) {
        return toDebugString(templateArgs[shiftedIndex]);
      }

      return match;
    });

    message += '\nhttp://errors.angularjs.org/1.6.1/' +
      (module ? module + '/' : '') + code;

    for (i = SKIP_INDEXES, paramPrefix = '?'; i < templateArgs.length; i++, paramPrefix = '&') {
      message += paramPrefix + 'p' + (i - SKIP_INDEXES) + '=' +
        encodeURIComponent(toDebugString(templateArgs[i]));
    }

    return new ErrorConstructor(message);
  };
}

/* We need to tell ESLint what variables are being exported */
/* exported
  angular,
  msie,
  jqLite,
  jQuery,
  slice,
  splice,
  push,
  toString,
  ngMinErr,
  angularModule,
  uid,
  REGEX_STRING_REGEXP,
  VALIDITY_STATE_PROPERTY,

  lowercase,
  uppercase,
  manualLowercase,
  manualUppercase,
  nodeName_,
  isArrayLike,
  forEach,
  forEachSorted,
  reverseParams,
  nextUid,
  setHashKey,
  extend,
  toInt,
  inherit,
  merge,
  noop,
  identity,
  valueFn,
  isUndefined,
  isDefined,
  isObject,
  isBlankObject,
  isString,
  isNumber,
  isNumberNaN,
  isDate,
  isArray,
  isFunction,
  isRegExp,
  isWindow,
  isScope,
  isFile,
  isFormData,
  isBlob,
  isBoolean,
  isPromiseLike,
  trim,
  escapeForRegexp,
  isElement,
  makeMap,
  includes,
  arrayRemove,
  copy,
  equals,
  csp,
  jq,
  concat,
  sliceArgs,
  bind,
  toJsonReplacer,
  toJson,
  fromJson,
  convertTimezoneToLocal,
  timezoneToOffset,
  startingTag,
  tryDecodeURIComponent,
  parseKeyValue,
  toKeyValue,
  encodeUriSegment,
  encodeUriQuery,
  angularInit,
  bootstrap,
  getTestability,
  snake_case,
  bindJQuery,
  assertArg,
  assertArgFn,
  assertNotHasOwnProperty,
  getter,
  getBlockNodes,
  hasOwnProperty,
  createMap,
  stringify,

  NODE_TYPE_ELEMENT,
  NODE_TYPE_ATTRIBUTE,
  NODE_TYPE_TEXT,
  NODE_TYPE_COMMENT,
  NODE_TYPE_DOCUMENT,
  NODE_TYPE_DOCUMENT_FRAGMENT
*/

////////////////////////////////////

/**
 * @ngdoc module
 * @name ng
 * @module ng
 * @installation
 * @description
 *
 * # ng (core module)
 * The ng module is loaded by default when an AngularJS application is started. The module itself
 * contains the essential components for an AngularJS application to function. The table below
 * lists a high level breakdown of each of the services/factories, filters, directives and testing
 * components available within this core module.
 *
 * <div doc-module-components="ng"></div>
 */

var REGEX_STRING_REGEXP = /^\/(.+)\/([a-z]*)$/;

// The name of a form control's ValidityState property.
// This is used so that it's possible for internal tests to create mock ValidityStates.
var VALIDITY_STATE_PROPERTY = 'validity';


var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @ngdoc function
 * @name angular.lowercase
 * @module ng
 * @kind function
 *
 * @deprecated
 * sinceVersion="1.5.0"
 * removeVersion="1.7.0"
 * Use [String.prototype.toLowerCase](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) instead.
 *
 * @description Converts the specified string to lowercase.
 * @param {string} string String to be converted to lowercase.
 * @returns {string} Lowercased string.
 */
var lowercase = function(string) {return isString(string) ? string.toLowerCase() : string;};

/**
 * @ngdoc function
 * @name angular.uppercase
 * @module ng
 * @kind function
 *
 * @deprecated
 * sinceVersion="1.5.0"
 * removeVersion="1.7.0"
 * Use [String.prototype.toUpperCase](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) instead.
 *
 * @description Converts the specified string to uppercase.
 * @param {string} string String to be converted to uppercase.
 * @returns {string} Uppercased string.
 */
var uppercase = function(string) {return isString(string) ? string.toUpperCase() : string;};


var manualLowercase = function(s) {
  /* eslint-disable no-bitwise */
  return isString(s)
      ? s.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);})
      : s;
  /* eslint-enable */
};
var manualUppercase = function(s) {
  /* eslint-disable no-bitwise */
  return isString(s)
      ? s.replace(/[a-z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) & ~32);})
      : s;
  /* eslint-enable */
};


// String#toLowerCase and String#toUpperCase don't produce correct results in browsers with Turkish
// locale, for this reason we need to detect this case and redefine lowercase/uppercase methods
// with correct but slower alternatives. See https://github.com/angular/angular.js/issues/11387
if ('i' !== 'I'.toLowerCase()) {
  lowercase = manualLowercase;
  uppercase = manualUppercase;
}


var
    msie,             // holds major version number for IE, or NaN if UA is not IE.
    jqLite,           // delay binding since jQuery could be loaded after us.
    jQuery,           // delay binding
    slice             = [].slice,
    splice            = [].splice,
    push              = [].push,
    toString          = Object.prototype.toString,
    getPrototypeOf    = Object.getPrototypeOf,
    ngMinErr          = minErr('ng'),

    /** @name angular */
    angular           = window.angular || (window.angular = {}),
    angularModule,
    uid               = 0;

// Support: IE 9-11 only
/**
 * documentMode is an IE-only property
 * http://msdn.microsoft.com/en-us/library/ie/cc196988(v=vs.85).aspx
 */
msie = window.document.documentMode;


/**
 * @private
 * @param {*} obj
 * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments,
 *                   String ...)
 */
function isArrayLike(obj) {

  // `null`, `undefined` and `window` are not array-like
  if (obj == null || isWindow(obj)) return false;

  // arrays, strings and jQuery/jqLite objects are array like
  // * jqLite is either the jQuery or jqLite constructor function
  // * we have to check the existence of jqLite first as this method is called
  //   via the forEach method when constructing the jqLite object in the first place
  if (isArray(obj) || isString(obj) || (jqLite && obj instanceof jqLite)) return true;

  // Support: iOS 8.2 (not reproducible in simulator)
  // "length" in obj used to prevent JIT error (gh-11508)
  var length = 'length' in Object(obj) && obj.length;

  // NodeList objects (with `item` method) and
  // other objects with suitable length characteristics are array-like
  return isNumber(length) &&
    (length >= 0 && ((length - 1) in obj || obj instanceof Array) || typeof obj.item === 'function');

}

/**
 * @ngdoc function
 * @name angular.forEach
 * @module ng
 * @kind function
 *
 * @description
 * Invokes the `iterator` function once for each item in `obj` collection, which can be either an
 * object or an array. The `iterator` function is invoked with `iterator(value, key, obj)`, where `value`
 * is the value of an object property or an array element, `key` is the object property key or
 * array element index and obj is the `obj` itself. Specifying a `context` for the function is optional.
 *
 * It is worth noting that `.forEach` does not iterate over inherited properties because it filters
 * using the `hasOwnProperty` method.
 *
 * Unlike ES262's
 * [Array.prototype.forEach](http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.4.18),
 * providing 'undefined' or 'null' values for `obj` will not throw a TypeError, but rather just
 * return the value provided.
 *
   ```js
     var values = {name: 'misko', gender: 'male'};
     var log = [];
     angular.forEach(values, function(value, key) {
       this.push(key + ': ' + value);
     }, log);
     expect(log).toEqual(['name: misko', 'gender: male']);
   ```
 *
 * @param {Object|Array} obj Object to iterate over.
 * @param {Function} iterator Iterator function.
 * @param {Object=} context Object to become context (`this`) for the iterator function.
 * @returns {Object|Array} Reference to `obj`.
 */

function forEach(obj, iterator, context) {
  var key, length;
  if (obj) {
    if (isFunction(obj)) {
      for (key in obj) {
        if (key !== 'prototype' && key !== 'length' && key !== 'name' && obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (isArray(obj) || isArrayLike(obj)) {
      var isPrimitive = typeof obj !== 'object';
      for (key = 0, length = obj.length; key < length; key++) {
        if (isPrimitive || key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context, obj);
    } else if (isBlankObject(obj)) {
      // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
      for (key in obj) {
        iterator.call(context, obj[key], key, obj);
      }
    } else if (typeof obj.hasOwnProperty === 'function') {
      // Slow path for objects inheriting Object.prototype, hasOwnProperty check needed
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else {
      // Slow path for objects which do not have a method `hasOwnProperty`
      for (key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }
  return obj;
}

function forEachSorted(obj, iterator, context) {
  var keys = Object.keys(obj).sort();
  for (var i = 0; i < keys.length; i++) {
    iterator.call(context, obj[keys[i]], keys[i]);
  }
  return keys;
}


/**
 * when using forEach the params are value, key, but it is often useful to have key, value.
 * @param {function(string, *)} iteratorFn
 * @returns {function(*, string)}
 */
function reverseParams(iteratorFn) {
  return function(value, key) {iteratorFn(key, value);};
}

/**
 * A consistent way of creating unique IDs in angular.
 *
 * Using simple numbers allows us to generate 28.6 million unique ids per second for 10 years before
 * we hit number precision issues in JavaScript.
 *
 * Math.pow(2,53) / 60 / 60 / 24 / 365 / 10 = 28.6M
 *
 * @returns {number} an unique alpha-numeric string
 */
function nextUid() {
  return ++uid;
}


/**
 * Set or clear the hashkey for an object.
 * @param obj object
 * @param h the hashkey (!truthy to delete the hashkey)
 */
function setHashKey(obj, h) {
  if (h) {
    obj.$$hashKey = h;
  } else {
    delete obj.$$hashKey;
  }
}


function baseExtend(dst, objs, deep) {
  var h = dst.$$hashKey;

  for (var i = 0, ii = objs.length; i < ii; ++i) {
    var obj = objs[i];
    if (!isObject(obj) && !isFunction(obj)) continue;
    var keys = Object.keys(obj);
    for (var j = 0, jj = keys.length; j < jj; j++) {
      var key = keys[j];
      var src = obj[key];

      if (deep && isObject(src)) {
        if (isDate(src)) {
          dst[key] = new Date(src.valueOf());
        } else if (isRegExp(src)) {
          dst[key] = new RegExp(src);
        } else if (src.nodeName) {
          dst[key] = src.cloneNode(true);
        } else if (isElement(src)) {
          dst[key] = src.clone();
        } else {
          if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
          baseExtend(dst[key], [src], true);
        }
      } else {
        dst[key] = src;
      }
    }
  }

  setHashKey(dst, h);
  return dst;
}

/**
 * @ngdoc function
 * @name angular.extend
 * @module ng
 * @kind function
 *
 * @description
 * Extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
 * to `dst`. You can specify multiple `src` objects. If you want to preserve original objects, you can do so
 * by passing an empty object as the target: `var object = angular.extend({}, object1, object2)`.
 *
 * **Note:** Keep in mind that `angular.extend` does not support recursive merge (deep copy). Use
 * {@link angular.merge} for this.
 *
 * @param {Object} dst Destination object.
 * @param {...Object} src Source object(s).
 * @returns {Object} Reference to `dst`.
 */
function extend(dst) {
  return baseExtend(dst, slice.call(arguments, 1), false);
}


/**
* @ngdoc function
* @name angular.merge
* @module ng
* @kind function
*
* @description
* Deeply extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
* to `dst`. You can specify multiple `src` objects. If you want to preserve original objects, you can do so
* by passing an empty object as the target: `var object = angular.merge({}, object1, object2)`.
*
* Unlike {@link angular.extend extend()}, `merge()` recursively descends into object properties of source
* objects, performing a deep copy.
*
* @param {Object} dst Destination object.
* @param {...Object} src Source object(s).
* @returns {Object} Reference to `dst`.
*/
function merge(dst) {
  return baseExtend(dst, slice.call(arguments, 1), true);
}



function toInt(str) {
  return parseInt(str, 10);
}

var isNumberNaN = Number.isNaN || function isNumberNaN(num) {
  // eslint-disable-next-line no-self-compare
  return num !== num;
};


function inherit(parent, extra) {
  return extend(Object.create(parent), extra);
}

/**
 * @ngdoc function
 * @name angular.noop
 * @module ng
 * @kind function
 *
 * @description
 * A function that performs no operations. This function can be useful when writing code in the
 * functional style.
   ```js
     function foo(callback) {
       var result = calculateResult();
       (callback || angular.noop)(result);
     }
   ```
 */
function noop() {}
noop.$inject = [];


/**
 * @ngdoc function
 * @name angular.identity
 * @module ng
 * @kind function
 *
 * @description
 * A function that returns its first argument. This function is useful when writing code in the
 * functional style.
 *
   ```js
   function transformer(transformationFn, value) {
     return (transformationFn || angular.identity)(value);
   };

   // E.g.
   function getResult(fn, input) {
     return (fn || angular.identity)(input);
   };

   getResult(function(n) { return n * 2; }, 21);   // returns 42
   getResult(null, 21);                            // returns 21
   getResult(undefined, 21);                       // returns 21
   ```
 *
 * @param {*} value to be returned.
 * @returns {*} the value passed in.
 */
function identity($) {return $;}
identity.$inject = [];


function valueFn(value) {return function valueRef() {return value;};}

function hasCustomToString(obj) {
  return isFunction(obj.toString) && obj.toString !== toString;
}


/**
 * @ngdoc function
 * @name angular.isUndefined
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is undefined.
 */
function isUndefined(value) {return typeof value === 'undefined';}


/**
 * @ngdoc function
 * @name angular.isDefined
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is defined.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is defined.
 */
function isDefined(value) {return typeof value !== 'undefined';}


/**
 * @ngdoc function
 * @name angular.isObject
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
 * considered to be objects. Note that JavaScript arrays are objects.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Object` but not `null`.
 */
function isObject(value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object';
}


/**
 * Determine if a value is an object with a null prototype
 *
 * @returns {boolean} True if `value` is an `Object` with a null prototype
 */
function isBlankObject(value) {
  return value !== null && typeof value === 'object' && !getPrototypeOf(value);
}


/**
 * @ngdoc function
 * @name angular.isString
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `String`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `String`.
 */
function isString(value) {return typeof value === 'string';}


/**
 * @ngdoc function
 * @name angular.isNumber
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `Number`.
 *
 * This includes the "special" numbers `NaN`, `+Infinity` and `-Infinity`.
 *
 * If you wish to exclude these then you can use the native
 * [`isFinite'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isFinite)
 * method.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Number`.
 */
function isNumber(value) {return typeof value === 'number';}


/**
 * @ngdoc function
 * @name angular.isDate
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a value is a date.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Date`.
 */
function isDate(value) {
  return toString.call(value) === '[object Date]';
}


/**
 * @ngdoc function
 * @name angular.isArray
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is an `Array`. Alias of Array.isArray.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Array`.
 */
var isArray = Array.isArray;

/**
 * @ngdoc function
 * @name angular.isFunction
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a `Function`.
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Function`.
 */
function isFunction(value) {return typeof value === 'function';}


/**
 * Determines if a value is a regular expression object.
 *
 * @private
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `RegExp`.
 */
function isRegExp(value) {
  return toString.call(value) === '[object RegExp]';
}


/**
 * Checks if `obj` is a window object.
 *
 * @private
 * @param {*} obj Object to check
 * @returns {boolean} True if `obj` is a window obj.
 */
function isWindow(obj) {
  return obj && obj.window === obj;
}


function isScope(obj) {
  return obj && obj.$evalAsync && obj.$watch;
}


function isFile(obj) {
  return toString.call(obj) === '[object File]';
}


function isFormData(obj) {
  return toString.call(obj) === '[object FormData]';
}


function isBlob(obj) {
  return toString.call(obj) === '[object Blob]';
}


function isBoolean(value) {
  return typeof value === 'boolean';
}


function isPromiseLike(obj) {
  return obj && isFunction(obj.then);
}


var TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/;
function isTypedArray(value) {
  return value && isNumber(value.length) && TYPED_ARRAY_REGEXP.test(toString.call(value));
}

function isArrayBuffer(obj) {
  return toString.call(obj) === '[object ArrayBuffer]';
}


var trim = function(value) {
  return isString(value) ? value.trim() : value;
};

// Copied from:
// http://docs.closure-library.googlecode.com/git/local_closure_goog_string_string.js.source.html#line1021
// Prereq: s is a string.
var escapeForRegexp = function(s) {
  return s
    .replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, '\\$1')
    // eslint-disable-next-line no-control-regex
    .replace(/\x08/g, '\\x08');
};


/**
 * @ngdoc function
 * @name angular.isElement
 * @module ng
 * @kind function
 *
 * @description
 * Determines if a reference is a DOM element (or wrapped jQuery element).
 *
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a DOM element (or wrapped jQuery element).
 */
function isElement(node) {
  return !!(node &&
    (node.nodeName  // We are a direct element.
    || (node.prop && node.attr && node.find)));  // We have an on and find method part of jQuery API.
}

/**
 * @param str 'key1,key2,...'
 * @returns {object} in the form of {key1:true, key2:true, ...}
 */
function makeMap(str) {
  var obj = {}, items = str.split(','), i;
  for (i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }
  return obj;
}


function nodeName_(element) {
  return lowercase(element.nodeName || (element[0] && element[0].nodeName));
}

function includes(array, obj) {
  return Array.prototype.indexOf.call(array, obj) !== -1;
}

function arrayRemove(array, value) {
  var index = array.indexOf(value);
  if (index >= 0) {
    array.splice(index, 1);
  }
  return index;
}

/**
 * @ngdoc function
 * @name angular.copy
 * @module ng
 * @kind function
 *
 * @description
 * Creates a deep copy of `source`, which should be an object or an array.
 *
 * * If no destination is supplied, a copy of the object or array is created.
 * * If a destination is provided, all of its elements (for arrays) or properties (for objects)
 *   are deleted and then all elements/properties from the source are copied to it.
 * * If `source` is not an object or array (inc. `null` and `undefined`), `source` is returned.
 * * If `source` is identical to `destination` an exception will be thrown.
 *
 * <br />
 * <div class="alert alert-warning">
 *   Only enumerable properties are taken into account. Non-enumerable properties (both on `source`
 *   and on `destination`) will be ignored.
 * </div>
 *
 * @param {*} source The source that will be used to make a copy.
 *                   Can be any type, including primitives, `null`, and `undefined`.
 * @param {(Object|Array)=} destination Destination into which the source is copied. If
 *     provided, must be of the same type as `source`.
 * @returns {*} The copy or updated `destination`, if `destination` was specified.
 *
 * @example
  <example module="copyExample" name="angular-copy">
    <file name="index.html">
      <div ng-controller="ExampleController">
        <form novalidate class="simple-form">
          <label>Name: <input type="text" ng-model="user.name" /></label><br />
          <label>Age:  <input type="number" ng-model="user.age" /></label><br />
          Gender: <label><input type="radio" ng-model="user.gender" value="male" />male</label>
                  <label><input type="radio" ng-model="user.gender" value="female" />female</label><br />
          <button ng-click="reset()">RESET</button>
          <button ng-click="update(user)">SAVE</button>
        </form>
        <pre>form = {{user | json}}</pre>
        <pre>master = {{master | json}}</pre>
      </div>
    </file>
    <file name="script.js">
      // Module: copyExample
      angular.
        module('copyExample', []).
        controller('ExampleController', ['$scope', function($scope) {
          $scope.master = {};

          $scope.reset = function() {
            // Example with 1 argument
            $scope.user = angular.copy($scope.master);
          };

          $scope.update = function(user) {
            // Example with 2 arguments
            angular.copy(user, $scope.master);
          };

          $scope.reset();
        }]);
    </file>
  </example>
 */
function copy(source, destination) {
  var stackSource = [];
  var stackDest = [];

  if (destination) {
    if (isTypedArray(destination) || isArrayBuffer(destination)) {
      throw ngMinErr('cpta', 'Can\'t copy! TypedArray destination cannot be mutated.');
    }
    if (source === destination) {
      throw ngMinErr('cpi', 'Can\'t copy! Source and destination are identical.');
    }

    // Empty the destination object
    if (isArray(destination)) {
      destination.length = 0;
    } else {
      forEach(destination, function(value, key) {
        if (key !== '$$hashKey') {
          delete destination[key];
        }
      });
    }

    stackSource.push(source);
    stackDest.push(destination);
    return copyRecurse(source, destination);
  }

  return copyElement(source);

  function copyRecurse(source, destination) {
    var h = destination.$$hashKey;
    var key;
    if (isArray(source)) {
      for (var i = 0, ii = source.length; i < ii; i++) {
        destination.push(copyElement(source[i]));
      }
    } else if (isBlankObject(source)) {
      // createMap() fast path --- Safe to avoid hasOwnProperty check because prototype chain is empty
      for (key in source) {
        destination[key] = copyElement(source[key]);
      }
    } else if (source && typeof source.hasOwnProperty === 'function') {
      // Slow path, which must rely on hasOwnProperty
      for (key in source) {
        if (source.hasOwnProperty(key)) {
          destination[key] = copyElement(source[key]);
        }
      }
    } else {
      // Slowest path --- hasOwnProperty can't be called as a method
      for (key in source) {
        if (hasOwnProperty.call(source, key)) {
          destination[key] = copyElement(source[key]);
        }
      }
    }
    setHashKey(destination, h);
    return destination;
  }

  function copyElement(source) {
    // Simple values
    if (!isObject(source)) {
      return source;
    }

    // Already copied values
    var index = stackSource.indexOf(source);
    if (index !== -1) {
      return stackDest[index];
    }

    if (isWindow(source) || isScope(source)) {
      throw ngMinErr('cpws',
        'Can\'t copy! Making copies of Window or Scope instances is not supported.');
    }

    var needsRecurse = false;
    var destination = copyType(source);

    if (destination === undefined) {
      destination = isArray(source) ? [] : Object.create(getPrototypeOf(source));
      needsRecurse = true;
    }

    stackSource.push(source);
    stackDest.push(destination);

    return needsRecurse
      ? copyRecurse(source, destination)
      : destination;
  }

  function copyType(source) {
    switch (toString.call(source)) {
      case '[object Int8Array]':
      case '[object Int16Array]':
      case '[object Int32Array]':
      case '[object Float32Array]':
      case '[object Float64Array]':
      case '[object Uint8Array]':
      case '[object Uint8ClampedArray]':
      case '[object Uint16Array]':
      case '[object Uint32Array]':
        return new source.constructor(copyElement(source.buffer), source.byteOffset, source.length);

      case '[object ArrayBuffer]':
        // Support: IE10
        if (!source.slice) {
          // If we're in this case we know the environment supports ArrayBuffer
          /* eslint-disable no-undef */
          var copied = new ArrayBuffer(source.byteLength);
          new Uint8Array(copied).set(new Uint8Array(source));
          /* eslint-enable */
          return copied;
        }
        return source.slice(0);

      case '[object Boolean]':
      case '[object Number]':
      case '[object String]':
      case '[object Date]':
        return new source.constructor(source.valueOf());

      case '[object RegExp]':
        var re = new RegExp(source.source, source.toString().match(/[^/]*$/)[0]);
        re.lastIndex = source.lastIndex;
        return re;

      case '[object Blob]':
        return new source.constructor([source], {type: source.type});
    }

    if (isFunction(source.cloneNode)) {
      return source.cloneNode(true);
    }
  }
}


/**
 * @ngdoc function
 * @name angular.equals
 * @module ng
 * @kind function
 *
 * @description
 * Determines if two objects or two values are equivalent. Supports value types, regular
 * expressions, arrays and objects.
 *
 * Two objects or values are considered equivalent if at least one of the following is true:
 *
 * * Both objects or values pass `===` comparison.
 * * Both objects or values are of the same type and all of their properties are equal by
 *   comparing them with `angular.equals`.
 * * Both values are NaN. (In JavaScript, NaN == NaN => false. But we consider two NaN as equal)
 * * Both values represent the same regular expression (In JavaScript,
 *   /abc/ == /abc/ => false. But we consider two regular expressions as equal when their textual
 *   representation matches).
 *
 * During a property comparison, properties of `function` type and properties with names
 * that begin with `$` are ignored.
 *
 * Scope and DOMWindow objects are being compared only by identify (`===`).
 *
 * @param {*} o1 Object or value to compare.
 * @param {*} o2 Object or value to compare.
 * @returns {boolean} True if arguments are equal.
 *
 * @example
   <example module="equalsExample" name="equalsExample">
     <file name="index.html">
      <div ng-controller="ExampleController">
        <form novalidate>
          <h3>User 1</h3>
          Name: <input type="text" ng-model="user1.name">
          Age: <input type="number" ng-model="user1.age">

          <h3>User 2</h3>
          Name: <input type="text" ng-model="user2.name">
          Age: <input type="number" ng-model="user2.age">

          <div>
            <br/>
            <input type="button" value="Compare" ng-click="compare()">
          </div>
          User 1: <pre>{{user1 | json}}</pre>
          User 2: <pre>{{user2 | json}}</pre>
          Equal: <pre>{{result}}</pre>
        </form>
      </div>
    </file>
    <file name="script.js">
        angular.module('equalsExample', []).controller('ExampleController', ['$scope', function($scope) {
          $scope.user1 = {};
          $scope.user2 = {};
          $scope.compare = function() {
            $scope.result = angular.equals($scope.user1, $scope.user2);
          };
        }]);
    </file>
  </example>
 */
function equals(o1, o2) {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  // eslint-disable-next-line no-self-compare
  if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
  var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
  if (t1 === t2 && t1 === 'object') {
    if (isArray(o1)) {
      if (!isArray(o2)) return false;
      if ((length = o1.length) === o2.length) {
        for (key = 0; key < length; key++) {
          if (!equals(o1[key], o2[key])) return false;
        }
        return true;
      }
    } else if (isDate(o1)) {
      if (!isDate(o2)) return false;
      return equals(o1.getTime(), o2.getTime());
    } else if (isRegExp(o1)) {
      if (!isRegExp(o2)) return false;
      return o1.toString() === o2.toString();
    } else {
      if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2) ||
        isArray(o2) || isDate(o2) || isRegExp(o2)) return false;
      keySet = createMap();
      for (key in o1) {
        if (key.charAt(0) === '$' || isFunction(o1[key])) continue;
        if (!equals(o1[key], o2[key])) return false;
        keySet[key] = true;
      }
      for (key in o2) {
        if (!(key in keySet) &&
            key.charAt(0) !== '$' &&
            isDefined(o2[key]) &&
            !isFunction(o2[key])) return false;
      }
      return true;
    }
  }
  return false;
}

var csp = function() {
  if (!isDefined(csp.rules)) {


    var ngCspElement = (window.document.querySelector('[ng-csp]') ||
                    window.document.querySelector('[data-ng-csp]'));

    if (ngCspElement) {
      var ngCspAttribute = ngCspElement.getAttribute('ng-csp') ||
                    ngCspElement.getAttribute('data-ng-csp');
      csp.rules = {
        noUnsafeEval: !ngCspAttribute || (ngCspAttribute.indexOf('no-unsafe-eval') !== -1),
        noInlineStyle: !ngCspAttribute || (ngCspAttribute.indexOf('no-inline-style') !== -1)
      };
    } else {
      csp.rules = {
        noUnsafeEval: noUnsafeEval(),
        noInlineStyle: false
      };
    }
  }

  return csp.rules;

  function noUnsafeEval() {
    try {
      // eslint-disable-next-line no-new, no-new-func
      new Function('');
      return false;
    } catch (e) {
      return true;
    }
  }
};

/**
 * @ngdoc directive
 * @module ng
 * @name ngJq
 *
 * @element ANY
 * @param {string=} ngJq the name of the library available under `window`
 * to be used for angular.element
 * @description
 * Use this directive to force the angular.element library.  This should be
 * used to force either jqLite by leaving ng-jq blank or setting the name of
 * the jquery variable under window (eg. jQuery).
 *
 * Since angular looks for this directive when it is loaded (doesn't wait for the
 * DOMContentLoaded event), it must be placed on an element that comes before the script
 * which loads angular. Also, only the first instance of `ng-jq` will be used and all
 * others ignored.
 *
 * @example
 * This example shows how to force jqLite using the `ngJq` directive to the `html` tag.
 ```html
 <!doctype html>
 <html ng-app ng-jq>
 ...
 ...
 </html>
 ```
 * @example
 * This example shows how to use a jQuery based library of a different name.
 * The library name must be available at the top most 'window'.
 ```html
 <!doctype html>
 <html ng-app ng-jq="jQueryLib">
 ...
 ...
 </html>
 ```
 */
var jq = function() {
  if (isDefined(jq.name_)) return jq.name_;
  var el;
  var i, ii = ngAttrPrefixes.length, prefix, name;
  for (i = 0; i < ii; ++i) {
    prefix = ngAttrPrefixes[i];
    el = window.document.querySelector('[' + prefix.replace(':', '\\:') + 'jq]');
    if (el) {
      name = el.getAttribute(prefix + 'jq');
      break;
    }
  }

  return (jq.name_ = name);
};

function concat(array1, array2, index) {
  return array1.concat(slice.call(array2, index));
}

function sliceArgs(args, startIndex) {
  return slice.call(args, startIndex || 0);
}


/**
 * @ngdoc function
 * @name angular.bind
 * @module ng
 * @kind function
 *
 * @description
 * Returns a function which calls function `fn` bound to `self` (`self` becomes the `this` for
 * `fn`). You can supply optional `args` that are prebound to the function. This feature is also
 * known as [partial application](http://en.wikipedia.org/wiki/Partial_application), as
 * distinguished from [function currying](http://en.wikipedia.org/wiki/Currying#Contrast_with_partial_function_application).
 *
 * @param {Object} self Context which `fn` should be evaluated in.
 * @param {function()} fn Function to be bound.
 * @param {...*} args Optional arguments to be prebound to the `fn` function call.
 * @returns {function()} Function that wraps the `fn` with all the specified bindings.
 */
function bind(self, fn) {
  var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
  if (isFunction(fn) && !(fn instanceof RegExp)) {
    return curryArgs.length
      ? function() {
          return arguments.length
            ? fn.apply(self, concat(curryArgs, arguments, 0))
            : fn.apply(self, curryArgs);
        }
      : function() {
          return arguments.length
            ? fn.apply(self, arguments)
            : fn.call(self);
        };
  } else {
    // In IE, native methods are not functions so they cannot be bound (note: they don't need to be).
    return fn;
  }
}


function toJsonReplacer(key, value) {
  var val = value;

  if (typeof key === 'string' && key.charAt(0) === '$' && key.charAt(1) === '$') {
    val = undefined;
  } else if (isWindow(value)) {
    val = '$WINDOW';
  } else if (value &&  window.document === value) {
    val = '$DOCUMENT';
  } else if (isScope(value)) {
    val = '$SCOPE';
  }

  return val;
}


/**
 * @ngdoc function
 * @name angular.toJson
 * @module ng
 * @kind function
 *
 * @description
 * Serializes input into a JSON-formatted string. Properties with leading $$ characters will be
 * stripped since angular uses this notation internally.
 *
 * @param {Object|Array|Date|string|number|boolean} obj Input to be serialized into JSON.
 * @param {boolean|number} [pretty=2] If set to true, the JSON output will contain newlines and whitespace.
 *    If set to an integer, the JSON output will contain that many spaces per indentation.
 * @returns {string|undefined} JSON-ified string representing `obj`.
 * @knownIssue
 *
 * The Safari browser throws a `RangeError` instead of returning `null` when it tries to stringify a `Date`
 * object with an invalid date value. The only reliable way to prevent this is to monkeypatch the
 * `Date.prototype.toJSON` method as follows:
 *
 * ```
 * var _DatetoJSON = Date.prototype.toJSON;
 * Date.prototype.toJSON = function() {
 *   try {
 *     return _DatetoJSON.call(this);
 *   } catch(e) {
 *     if (e instanceof RangeError) {
 *       return null;
 *     }
 *     throw e;
 *   }
 * };
 * ```
 *
 * See https://github.com/angular/angular.js/pull/14221 for more information.
 */
function toJson(obj, pretty) {
  if (isUndefined(obj)) return undefined;
  if (!isNumber(pretty)) {
    pretty = pretty ? 2 : null;
  }
  return JSON.stringify(obj, toJsonReplacer, pretty);
}


/**
 * @ngdoc function
 * @name angular.fromJson
 * @module ng
 * @kind function
 *
 * @description
 * Deserializes a JSON string.
 *
 * @param {string} json JSON string to deserialize.
 * @returns {Object|Array|string|number} Deserialized JSON string.
 */
function fromJson(json) {
  return isString(json)
      ? JSON.parse(json)
      : json;
}


var ALL_COLONS = /:/g;
function timezoneToOffset(timezone, fallback) {
  // Support: IE 9-11 only, Edge 13-14+
  // IE/Edge do not "understand" colon (`:`) in timezone
  timezone = timezone.replace(ALL_COLONS, '');
  var requestedTimezoneOffset = Date.parse('Jan 01, 1970 00:00:00 ' + timezone) / 60000;
  return isNumberNaN(requestedTimezoneOffset) ? fallback : requestedTimezoneOffset;
}


function addDateMinutes(date, minutes) {
  date = new Date(date.getTime());
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}


function convertTimezoneToLocal(date, timezone, reverse) {
  reverse = reverse ? -1 : 1;
  var dateTimezoneOffset = date.getTimezoneOffset();
  var timezoneOffset = timezoneToOffset(timezone, dateTimezoneOffset);
  return addDateMinutes(date, reverse * (timezoneOffset - dateTimezoneOffset));
}


/**
 * @returns {string} Returns the string representation of the element.
 */
function startingTag(element) {
  element = jqLite(element).clone();
  try {
    // turns out IE does not let you set .html() on elements which
    // are not allowed to have children. So we just ignore it.
    element.empty();
  } catch (e) { /* empty */ }
  var elemHtml = jqLite('<div>').append(element).html();
  try {
    return element[0].nodeType === NODE_TYPE_TEXT ? lowercase(elemHtml) :
        elemHtml.
          match(/^(<[^>]+>)/)[1].
          replace(/^<([\w-]+)/, function(match, nodeName) {return '<' + lowercase(nodeName);});
  } catch (e) {
    return lowercase(elemHtml);
  }

}


/////////////////////////////////////////////////

/**
 * Tries to decode the URI component without throwing an exception.
 *
 * @private
 * @param str value potential URI component to check.
 * @returns {boolean} True if `value` can be decoded
 * with the decodeURIComponent function.
 */
function tryDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch (e) {
    // Ignore any invalid uri component.
  }
}


/**
 * Parses an escaped url query string into key-value pairs.
 * @returns {Object.<string,boolean|Array>}
 */
function parseKeyValue(/**string*/keyValue) {
  var obj = {};
  forEach((keyValue || '').split('&'), function(keyValue) {
    var splitPoint, key, val;
    if (keyValue) {
      key = keyValue = keyValue.replace(/\+/g,'%20');
      splitPoint = keyValue.indexOf('=');
      if (splitPoint !== -1) {
        key = keyValue.substring(0, splitPoint);
        val = keyValue.substring(splitPoint + 1);
      }
      key = tryDecodeURIComponent(key);
      if (isDefined(key)) {
        val = isDefined(val) ? tryDecodeURIComponent(val) : true;
        if (!hasOwnProperty.call(obj, key)) {
          obj[key] = val;
        } else if (isArray(obj[key])) {
          obj[key].push(val);
        } else {
          obj[key] = [obj[key],val];
        }
      }
    }
  });
  return obj;
}

function toKeyValue(obj) {
  var parts = [];
  forEach(obj, function(value, key) {
    if (isArray(value)) {
      forEach(value, function(arrayValue) {
        parts.push(encodeUriQuery(key, true) +
                   (arrayValue === true ? '' : '=' + encodeUriQuery(arrayValue, true)));
      });
    } else {
    parts.push(encodeUriQuery(key, true) +
               (value === true ? '' : '=' + encodeUriQuery(value, true)));
    }
  });
  return parts.length ? parts.join('&') : '';
}


/**
 * We need our custom method because encodeURIComponent is too aggressive and doesn't follow
 * http://www.ietf.org/rfc/rfc3986.txt with regards to the character set (pchar) allowed in path
 * segments:
 *    segment       = *pchar
 *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
 *    pct-encoded   = "%" HEXDIG HEXDIG
 *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
 *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
 *                     / "*" / "+" / "," / ";" / "="
 */
function encodeUriSegment(val) {
  return encodeUriQuery(val, true).
             replace(/%26/gi, '&').
             replace(/%3D/gi, '=').
             replace(/%2B/gi, '+');
}


/**
 * This method is intended for encoding *key* or *value* parts of query component. We need a custom
 * method because encodeURIComponent is too aggressive and encodes stuff that doesn't have to be
 * encoded per http://tools.ietf.org/html/rfc3986:
 *    query         = *( pchar / "/" / "?" )
 *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "@"
 *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
 *    pct-encoded   = "%" HEXDIG HEXDIG
 *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
 *                     / "*" / "+" / "," / ";" / "="
 */
function encodeUriQuery(val, pctEncodeSpaces) {
  return encodeURIComponent(val).
             replace(/%40/gi, '@').
             replace(/%3A/gi, ':').
             replace(/%24/g, '$').
             replace(/%2C/gi, ',').
             replace(/%3B/gi, ';').
             replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
}

var ngAttrPrefixes = ['ng-', 'data-ng-', 'ng:', 'x-ng-'];

function getNgAttribute(element, ngAttr) {
  var attr, i, ii = ngAttrPrefixes.length;
  for (i = 0; i < ii; ++i) {
    attr = ngAttrPrefixes[i] + ngAttr;
    if (isString(attr = element.getAttribute(attr))) {
      return attr;
    }
  }
  return null;
}

function allowAutoBootstrap(document) {
  if (!document.currentScript) {
    return true;
  }
  var src = document.currentScript.getAttribute('src');
  var link = document.createElement('a');
  link.href = src;
  if (document.location.origin === link.origin) {
    // Same-origin resources are always allowed, even for non-whitelisted schemes.
    return true;
  }
  // Disabled bootstrapping unless angular.js was loaded from a known scheme used on the web.
  // This is to prevent angular.js bundled with browser extensions from being used to bypass the
  // content security policy in web pages and other browser extensions.
  switch (link.protocol) {
    case 'http:':
    case 'https:':
    case 'ftp:':
    case 'blob:':
    case 'file:':
    case 'data:':
      return true;
    default:
      return false;
  }
}

// Cached as it has to run during loading so that document.currentScript is available.
var isAutoBootstrapAllowed = allowAutoBootstrap(window.document);

/**
 * @ngdoc directive
 * @name ngApp
 * @module ng
 *
 * @element ANY
 * @param {angular.Module} ngApp an optional application
 *   {@link angular.module module} name to load.
 * @param {boolean=} ngStrictDi if this attribute is present on the app element, the injector will be
 *   created in "strict-di" mode. This means that the application will fail to invoke functions which
 *   do not use explicit function annotation (and are thus unsuitable for minification), as described
 *   in {@link guide/di the Dependency Injection guide}, and useful debugging info will assist in
 *   tracking down the root of these bugs.
 *
 * @description
 *
 * Use this directive to **auto-bootstrap** an AngularJS application. The `ngApp` directive
 * designates the **root element** of the application and is typically placed near the root element
 * of the page - e.g. on the `<body>` or `<html>` tags.
 *
 * There are a few things to keep in mind when using `ngApp`:
 * - only one AngularJS application can be auto-bootstrapped per HTML document. The first `ngApp`
 *   found in the document will be used to define the root element to auto-bootstrap as an
 *   application. To run multiple applications in an HTML document you must manually bootstrap them using
 *   {@link angular.bootstrap} instead.
 * - AngularJS applications cannot be nested within each other.
 * - Do not use a directive that uses {@link ng.$compile#transclusion transclusion} on the same element as `ngApp`.
 *   This includes directives such as {@link ng.ngIf `ngIf`}, {@link ng.ngInclude `ngInclude`} and
 *   {@link ngRoute.ngView `ngView`}.
 *   Doing this misplaces the app {@link ng.$rootElement `$rootElement`} and the app's {@link auto.$injector injector},
 *   causing animations to stop working and making the injector inaccessible from outside the app.
 *
 * You can specify an **AngularJS module** to be used as the root module for the application.  This
 * module will be loaded into the {@link auto.$injector} when the application is bootstrapped. It
 * should contain the application code needed or have dependencies on other modules that will
 * contain the code. See {@link angular.module} for more information.
 *
 * In the example below if the `ngApp` directive were not placed on the `html` element then the
 * document would not be compiled, the `AppController` would not be instantiated and the `{{ a+b }}`
 * would not be resolved to `3`.
 *
 * `ngApp` is the easiest, and most common way to bootstrap an application.
 *
 <example module="ngAppDemo" name="ng-app">
   <file name="index.html">
   <div ng-controller="ngAppDemoController">
     I can add: {{a}} + {{b}} =  {{ a+b }}
   </div>
   </file>
   <file name="script.js">
   angular.module('ngAppDemo', []).controller('ngAppDemoController', function($scope) {
     $scope.a = 1;
     $scope.b = 2;
   });
   </file>
 </example>
 *
 * Using `ngStrictDi`, you would see something like this:
 *
 <example ng-app-included="true" name="strict-di">
   <file name="index.html">
   <div ng-app="ngAppStrictDemo" ng-strict-di>
       <div ng-controller="GoodController1">
           I can add: {{a}} + {{b}} =  {{ a+b }}

           <p>This renders because the controller does not fail to
              instantiate, by using explicit annotation style (see
              script.js for details)
           </p>
       </div>

       <div ng-controller="GoodController2">
           Name: <input ng-model="name"><br />
           Hello, {{name}}!

           <p>This renders because the controller does not fail to
              instantiate, by using explicit annotation style
              (see script.js for details)
           </p>
       </div>

       <div ng-controller="BadController">
           I can add: {{a}} + {{b}} =  {{ a+b }}

           <p>The controller could not be instantiated, due to relying
              on automatic function annotations (which are disabled in
              strict mode). As such, the content of this section is not
              interpolated, and there should be an error in your web console.
           </p>
       </div>
   </div>
   </file>
   <file name="script.js">
   angular.module('ngAppStrictDemo', [])
     // BadController will fail to instantiate, due to relying on automatic function annotation,
     // rather than an explicit annotation
     .controller('BadController', function($scope) {
       $scope.a = 1;
       $scope.b = 2;
     })
     // Unlike BadController, GoodController1 and GoodController2 will not fail to be instantiated,
     // due to using explicit annotations using the array style and $inject property, respectively.
     .controller('GoodController1', ['$scope', function($scope) {
       $scope.a = 1;
       $scope.b = 2;
     }])
     .controller('GoodController2', GoodController2);
     function GoodController2($scope) {
       $scope.name = 'World';
     }
     GoodController2.$inject = ['$scope'];
   </file>
   <file name="style.css">
   div[ng-controller] {
       margin-bottom: 1em;
       -webkit-border-radius: 4px;
       border-radius: 4px;
       border: 1px solid;
       padding: .5em;
   }
   div[ng-controller^=Good] {
       border-color: #d6e9c6;
       background-color: #dff0d8;
       color: #3c763d;
   }
   div[ng-controller^=Bad] {
       border-color: #ebccd1;
       background-color: #f2dede;
       color: #a94442;
       margin-bottom: 0;
   }
   </file>
 </example>
 */
function angularInit(element, bootstrap) {
  var appElement,
      module,
      config = {};

  // The element `element` has priority over any other element.
  forEach(ngAttrPrefixes, function(prefix) {
    var name = prefix + 'app';

    if (!appElement && element.hasAttribute && element.hasAttribute(name)) {
      appElement = element;
      module = element.getAttribute(name);
    }
  });
  forEach(ngAttrPrefixes, function(prefix) {
    var name = prefix + 'app';
    var candidate;

    if (!appElement && (candidate = element.querySelector('[' + name.replace(':', '\\:') + ']'))) {
      appElement = candidate;
      module = candidate.getAttribute(name);
    }
  });
  if (appElement) {
    if (!isAutoBootstrapAllowed) {
      window.console.error('Angular: disabling automatic bootstrap. <script> protocol indicates ' +
          'an extension, document.location.href does not match.');
      return;
    }
    config.strictDi = getNgAttribute(appElement, 'strict-di') !== null;
    bootstrap(appElement, module ? [module] : [], config);
  }
}

/**
 * @ngdoc function
 * @name angular.bootstrap
 * @module ng
 * @description
 * Use this function to manually start up angular application.
 *
 * For more information, see the {@link guide/bootstrap Bootstrap guide}.
 *
 * Angular will detect if it has been loaded into the browser more than once and only allow the
 * first loaded script to be bootstrapped and will report a warning to the browser console for
 * each of the subsequent scripts. This prevents strange results in applications, where otherwise
 * multiple instances of Angular try to work on the DOM.
 *
 * <div class="alert alert-warning">
 * **Note:** Protractor based end-to-end tests cannot use this function to bootstrap manually.
 * They must use {@link ng.directive:ngApp ngApp}.
 * </div>
 *
 * <div class="alert alert-warning">
 * **Note:** Do not bootstrap the app on an element with a directive that uses {@link ng.$compile#transclusion transclusion},
 * such as {@link ng.ngIf `ngIf`}, {@link ng.ngInclude `ngInclude`} and {@link ngRoute.ngView `ngView`}.
 * Doing this misplaces the app {@link ng.$rootElement `$rootElement`} and the app's {@link auto.$injector injector},
 * causing animations to stop working and making the injector inaccessible from outside the app.
 * </div>
 *
 * ```html
 * <!doctype html>
 * <html>
 * <body>
 * <div ng-controller="WelcomeController">
 *   {{greeting}}
 * </div>
 *
 * <script src="angular.js"></script>
 * <script>
 *   var app = angular.module('demo', [])
 *   .controller('WelcomeController', function($scope) {
 *       $scope.greeting = 'Welcome!';
 *   });
 *   angular.bootstrap(document, ['demo']);
 * </script>
 * </body>
 * </html>
 * ```
 *
 * @param {DOMElement} element DOM element which is the root of angular application.
 * @param {Array<String|Function|Array>=} modules an array of modules to load into the application.
 *     Each item in the array should be the name of a predefined module or a (DI annotated)
 *     function that will be invoked by the injector as a `config` block.
 *     See: {@link angular.module modules}
 * @param {Object=} config an object for defining configuration options for the application. The
 *     following keys are supported:
 *
 * * `strictDi` - disable automatic function annotation for the application. This is meant to
 *   assist in finding bugs which break minified code. Defaults to `false`.
 *
 * @returns {auto.$injector} Returns the newly created injector for this app.
 */
function bootstrap(element, modules, config) {
  if (!isObject(config)) config = {};
  var defaultConfig = {
    strictDi: false
  };
  config = extend(defaultConfig, config);
  var doBootstrap = function() {
    element = jqLite(element);

    if (element.injector()) {
      var tag = (element[0] === window.document) ? 'document' : startingTag(element);
      // Encode angle brackets to prevent input from being sanitized to empty string #8683.
      throw ngMinErr(
          'btstrpd',
          'App already bootstrapped with this element \'{0}\'',
          tag.replace(/</,'&lt;').replace(/>/,'&gt;'));
    }

    modules = modules || [];
    modules.unshift(['$provide', function($provide) {
      $provide.value('$rootElement', element);
    }]);

    if (config.debugInfoEnabled) {
      // Pushing so that this overrides `debugInfoEnabled` setting defined in user's `modules`.
      modules.push(['$compileProvider', function($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
      }]);
    }

    modules.unshift('ng');
    var injector = createInjector(modules, config.strictDi);
    injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector',
       function bootstrapApply(scope, element, compile, injector) {
        scope.$apply(function() {
          element.data('$injector', injector);
          compile(element)(scope);
        });
      }]
    );
    return injector;
  };

  var NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/;
  var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;

  if (window && NG_ENABLE_DEBUG_INFO.test(window.name)) {
    config.debugInfoEnabled = true;
    window.name = window.name.replace(NG_ENABLE_DEBUG_INFO, '');
  }

  if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
    return doBootstrap();
  }

  window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
  angular.resumeBootstrap = function(extraModules) {
    forEach(extraModules, function(module) {
      modules.push(module);
    });
    return doBootstrap();
  };

  if (isFunction(angular.resumeDeferredBootstrap)) {
    angular.resumeDeferredBootstrap();
  }
}

/**
 * @ngdoc function
 * @name angular.reloadWithDebugInfo
 * @module ng
 * @description
 * Use this function to reload the current application with debug information turned on.
 * This takes precedence over a call to `$compileProvider.debugInfoEnabled(false)`.
 *
 * See {@link ng.$compileProvider#debugInfoEnabled} for more.
 */
function reloadWithDebugInfo() {
  window.name = 'NG_ENABLE_DEBUG_INFO!' + window.name;
  window.location.reload();
}

/**
 * @name angular.getTestability
 * @module ng
 * @description
 * Get the testability service for the instance of Angular on the given
 * element.
 * @param {DOMElement} element DOM element which is the root of angular application.
 */
function getTestability(rootElement) {
  var injector = angular.element(rootElement).injector();
  if (!injector) {
    throw ngMinErr('test',
      'no injector found for element argument to getTestability');
  }
  return injector.get('$$testability');
}

var SNAKE_CASE_REGEXP = /[A-Z]/g;
function snake_case(name, separator) {
  separator = separator || '_';
  return name.replace(SNAKE_CASE_REGEXP, function(letter, pos) {
    return (pos ? separator : '') + letter.toLowerCase();
  });
}

var bindJQueryFired = false;
function bindJQuery() {
  var originalCleanData;

  if (bindJQueryFired) {
    return;
  }

  // bind to jQuery if present;
  var jqName = jq();
  jQuery = isUndefined(jqName) ? window.jQuery :   // use jQuery (if present)
           !jqName             ? undefined     :   // use jqLite
                                 window[jqName];   // use jQuery specified by `ngJq`

  // Use jQuery if it exists with proper functionality, otherwise default to us.
  // Angular 1.2+ requires jQuery 1.7+ for on()/off() support.
  // Angular 1.3+ technically requires at least jQuery 2.1+ but it may work with older
  // versions. It will not work for sure with jQuery <1.7, though.
  if (jQuery && jQuery.fn.on) {
    jqLite = jQuery;
    extend(jQuery.fn, {
      scope: JQLitePrototype.scope,
      isolateScope: JQLitePrototype.isolateScope,
      controller: JQLitePrototype.controller,
      injector: JQLitePrototype.injector,
      inheritedData: JQLitePrototype.inheritedData
    });

    // All nodes removed from the DOM via various jQuery APIs like .remove()
    // are passed through jQuery.cleanData. Monkey-patch this method to fire
    // the $destroy event on all removed nodes.
    originalCleanData = jQuery.cleanData;
    jQuery.cleanData = function(elems) {
      var events;
      for (var i = 0, elem; (elem = elems[i]) != null; i++) {
        events = jQuery._data(elem, 'events');
        if (events && events.$destroy) {
          jQuery(elem).triggerHandler('$destroy');
        }
      }
      originalCleanData(elems);
    };
  } else {
    jqLite = JQLite;
  }

  angular.element = jqLite;

  // Prevent double-proxying.
  bindJQueryFired = true;
}

/**
 * throw error if the argument is falsy.
 */
function assertArg(arg, name, reason) {
  if (!arg) {
    throw ngMinErr('areq', 'Argument \'{0}\' is {1}', (name || '?'), (reason || 'required'));
  }
  return arg;
}

function assertArgFn(arg, name, acceptArrayAnnotation) {
  if (acceptArrayAnnotation && isArray(arg)) {
      arg = arg[arg.length - 1];
  }

  assertArg(isFunction(arg), name, 'not a function, got ' +
      (arg && typeof arg === 'object' ? arg.constructor.name || 'Object' : typeof arg));
  return arg;
}

/**
 * throw error if the name given is hasOwnProperty
 * @param  {String} name    the name to test
 * @param  {String} context the context in which the name is used, such as module or directive
 */
function assertNotHasOwnProperty(name, context) {
  if (name === 'hasOwnProperty') {
    throw ngMinErr('badname', 'hasOwnProperty is not a valid {0} name', context);
  }
}

/**
 * Return the value accessible from the object by path. Any undefined traversals are ignored
 * @param {Object} obj starting object
 * @param {String} path path to traverse
 * @param {boolean} [bindFnToScope=true]
 * @returns {Object} value as accessible by path
 */
//TODO(misko): this function needs to be removed
function getter(obj, path, bindFnToScope) {
  if (!path) return obj;
  var keys = path.split('.');
  var key;
  var lastInstance = obj;
  var len = keys.length;

  for (var i = 0; i < len; i++) {
    key = keys[i];
    if (obj) {
      obj = (lastInstance = obj)[key];
    }
  }
  if (!bindFnToScope && isFunction(obj)) {
    return bind(lastInstance, obj);
  }
  return obj;
}

/**
 * Return the DOM siblings between the first and last node in the given array.
 * @param {Array} array like object
 * @returns {Array} the inputted object or a jqLite collection containing the nodes
 */
function getBlockNodes(nodes) {
  // TODO(perf): update `nodes` instead of creating a new object?
  var node = nodes[0];
  var endNode = nodes[nodes.length - 1];
  var blockNodes;

  for (var i = 1; node !== endNode && (node = node.nextSibling); i++) {
    if (blockNodes || nodes[i] !== node) {
      if (!blockNodes) {
        blockNodes = jqLite(slice.call(nodes, 0, i));
      }
      blockNodes.push(node);
    }
  }

  return blockNodes || nodes;
}


/**
 * Creates a new object without a prototype. This object is useful for lookup without having to
 * guard against prototypically inherited properties via hasOwnProperty.
 *
 * Related micro-benchmarks:
 * - http://jsperf.com/object-create2
 * - http://jsperf.com/proto-map-lookup/2
 * - http://jsperf.com/for-in-vs-object-keys2
 *
 * @returns {Object}
 */
function createMap() {
  return Object.create(null);
}

function stringify(value) {
  if (value == null) { // null || undefined
    return '';
  }
  switch (typeof value) {
    case 'string':
      break;
    case 'number':
      value = '' + value;
      break;
    default:
      if (hasCustomToString(value) && !isArray(value) && !isDate(value)) {
        value = value.toString();
      } else {
        value = toJson(value);
      }
  }

  return value;
}

var NODE_TYPE_ELEMENT = 1;
var NODE_TYPE_ATTRIBUTE = 2;
var NODE_TYPE_TEXT = 3;
var NODE_TYPE_COMMENT = 8;
var NODE_TYPE_DOCUMENT = 9;
var NODE_TYPE_DOCUMENT_FRAGMENT = 11;

/**
 * @ngdoc type
 * @name angular.Module
 * @module ng
 * @description
 *
 * Interface for configuring angular {@link angular.module modules}.
 */

function setupModuleLoader(window) {

  var $injectorMinErr = minErr('$injector');
  var ngMinErr = minErr('ng');

  function ensure(obj, name, factory) {
    return obj[name] || (obj[name] = factory());
  }

  var angular = ensure(window, 'angular', Object);

  // We need to expose `angular.$$minErr` to modules such as `ngResource` that reference it during bootstrap
  angular.$$minErr = angular.$$minErr || minErr;

  return ensure(angular, 'module', function() {
    /** @type {Object.<string, angular.Module>} */
    var modules = {};

    /**
     * @ngdoc function
     * @name angular.module
     * @module ng
     * @description
     *
     * The `angular.module` is a global place for creating, registering and retrieving Angular
     * modules.
     * All modules (angular core or 3rd party) that should be available to an application must be
     * registered using this mechanism.
     *
     * Passing one argument retrieves an existing {@link angular.Module},
     * whereas passing more than one argument creates a new {@link angular.Module}
     *
     *
     * # Module
     *
     * A module is a collection of services, directives, controllers, filters, and configuration information.
     * `angular.module` is used to configure the {@link auto.$injector $injector}.
     *
     * ```js
     * // Create a new module
     * var myModule = angular.module('myModule', []);
     *
     * // register a new service
     * myModule.value('appName', 'MyCoolApp');
     *
     * // configure existing services inside initialization blocks.
     * myModule.config(['$locationProvider', function($locationProvider) {
     *   // Configure existing providers
     *   $locationProvider.hashPrefix('!');
     * }]);
     * ```
     *
     * Then you can create an injector and load your modules like this:
     *
     * ```js
     * var injector = angular.injector(['ng', 'myModule'])
     * ```
     *
     * However it's more likely that you'll just use
     * {@link ng.directive:ngApp ngApp} or
     * {@link angular.bootstrap} to simplify this process for you.
     *
     * @param {!string} name The name of the module to create or retrieve.
     * @param {!Array.<string>=} requires If specified then new module is being created. If
     *        unspecified then the module is being retrieved for further configuration.
     * @param {Function=} configFn Optional configuration function for the module. Same as
     *        {@link angular.Module#config Module#config()}.
     * @returns {angular.Module} new module with the {@link angular.Module} api.
     */
    return function module(name, requires, configFn) {
      var assertNotHasOwnProperty = function(name, context) {
        if (name === 'hasOwnProperty') {
          throw ngMinErr('badname', 'hasOwnProperty is not a valid {0} name', context);
        }
      };

      assertNotHasOwnProperty(name, 'module');
      if (requires && modules.hasOwnProperty(name)) {
        modules[name] = null;
      }
      return ensure(modules, name, function() {
        if (!requires) {
          throw $injectorMinErr('nomod', 'Module \'{0}\' is not available! You either misspelled ' +
             'the module name or forgot to load it. If registering a module ensure that you ' +
             'specify the dependencies as the second argument.', name);
        }

        /** @type {!Array.<Array.<*>>} */
        var invokeQueue = [];

        /** @type {!Array.<Function>} */
        var configBlocks = [];

        /** @type {!Array.<Function>} */
        var runBlocks = [];

        var config = invokeLater('$injector', 'invoke', 'push', configBlocks);

        /** @type {angular.Module} */
        var moduleInstance = {
          // Private state
          _invokeQueue: invokeQueue,
          _configBlocks: configBlocks,
          _runBlocks: runBlocks,

          /**
           * @ngdoc property
           * @name angular.Module#requires
           * @module ng
           *
           * @description
           * Holds the list of modules which the injector will load before the current module is
           * loaded.
           */
          requires: requires,

          /**
           * @ngdoc property
           * @name angular.Module#name
           * @module ng
           *
           * @description
           * Name of the module.
           */
          name: name,


          /**
           * @ngdoc method
           * @name angular.Module#provider
           * @module ng
           * @param {string} name service name
           * @param {Function} providerType Construction function for creating new instance of the
           *                                service.
           * @description
           * See {@link auto.$provide#provider $provide.provider()}.
           */
          provider: invokeLaterAndSetModuleName('$provide', 'provider'),

          /**
           * @ngdoc method
           * @name angular.Module#factory
           * @module ng
           * @param {string} name service name
           * @param {Function} providerFunction Function for creating new instance of the service.
           * @description
           * See {@link auto.$provide#factory $provide.factory()}.
           */
          factory: invokeLaterAndSetModuleName('$provide', 'factory'),

          /**
           * @ngdoc method
           * @name angular.Module#service
           * @module ng
           * @param {string} name service name
           * @param {Function} constructor A constructor function that will be instantiated.
           * @description
           * See {@link auto.$provide#service $provide.service()}.
           */
          service: invokeLaterAndSetModuleName('$provide', 'service'),

          /**
           * @ngdoc method
           * @name angular.Module#value
           * @module ng
           * @param {string} name service name
           * @param {*} object Service instance object.
           * @description
           * See {@link auto.$provide#value $provide.value()}.
           */
          value: invokeLater('$provide', 'value'),

          /**
           * @ngdoc method
           * @name angular.Module#constant
           * @module ng
           * @param {string} name constant name
           * @param {*} object Constant value.
           * @description
           * Because the constants are fixed, they get applied before other provide methods.
           * See {@link auto.$provide#constant $provide.constant()}.
           */
          constant: invokeLater('$provide', 'constant', 'unshift'),

           /**
           * @ngdoc method
           * @name angular.Module#decorator
           * @module ng
           * @param {string} name The name of the service to decorate.
           * @param {Function} decorFn This function will be invoked when the service needs to be
           *                           instantiated and should return the decorated service instance.
           * @description
           * See {@link auto.$provide#decorator $provide.decorator()}.
           */
          decorator: invokeLaterAndSetModuleName('$provide', 'decorator', configBlocks),

          /**
           * @ngdoc method
           * @name angular.Module#animation
           * @module ng
           * @param {string} name animation name
           * @param {Function} animationFactory Factory function for creating new instance of an
           *                                    animation.
           * @description
           *
           * **NOTE**: animations take effect only if the **ngAnimate** module is loaded.
           *
           *
           * Defines an animation hook that can be later used with
           * {@link $animate $animate} service and directives that use this service.
           *
           * ```js
           * module.animation('.animation-name', function($inject1, $inject2) {
           *   return {
           *     eventName : function(element, done) {
           *       //code to run the animation
           *       //once complete, then run done()
           *       return function cancellationFunction(element) {
           *         //code to cancel the animation
           *       }
           *     }
           *   }
           * })
           * ```
           *
           * See {@link ng.$animateProvider#register $animateProvider.register()} and
           * {@link ngAnimate ngAnimate module} for more information.
           */
          animation: invokeLaterAndSetModuleName('$animateProvider', 'register'),

          /**
           * @ngdoc method
           * @name angular.Module#filter
           * @module ng
           * @param {string} name Filter name - this must be a valid angular expression identifier
           * @param {Function} filterFactory Factory function for creating new instance of filter.
           * @description
           * See {@link ng.$filterProvider#register $filterProvider.register()}.
           *
           * <div class="alert alert-warning">
           * **Note:** Filter names must be valid angular {@link expression} identifiers, such as `uppercase` or `orderBy`.
           * Names with special characters, such as hyphens and dots, are not allowed. If you wish to namespace
           * your filters, then you can use capitalization (`myappSubsectionFilterx`) or underscores
           * (`myapp_subsection_filterx`).
           * </div>
           */
          filter: invokeLaterAndSetModuleName('$filterProvider', 'register'),

          /**
           * @ngdoc method
           * @name angular.Module#controller
           * @module ng
           * @param {string|Object} name Controller name, or an object map of controllers where the
           *    keys are the names and the values are the constructors.
           * @param {Function} constructor Controller constructor function.
           * @description
           * See {@link ng.$controllerProvider#register $controllerProvider.register()}.
           */
          controller: invokeLaterAndSetModuleName('$controllerProvider', 'register'),

          /**
           * @ngdoc method
           * @name angular.Module#directive
           * @module ng
           * @param {string|Object} name Directive name, or an object map of directives where the
           *    keys are the names and the values are the factories.
           * @param {Function} directiveFactory Factory function for creating new instance of
           * directives.
           * @description
           * See {@link ng.$compileProvider#directive $compileProvider.directive()}.
           */
          directive: invokeLaterAndSetModuleName('$compileProvider', 'directive'),

          /**
           * @ngdoc method
           * @name angular.Module#component
           * @module ng
           * @param {string} name Name of the component in camel-case (i.e. myComp which will match as my-comp)
           * @param {Object} options Component definition object (a simplified
           *    {@link ng.$compile#directive-definition-object directive definition object})
           *
           * @description
           * See {@link ng.$compileProvider#component $compileProvider.component()}.
           */
          component: invokeLaterAndSetModuleName('$compileProvider', 'component'),

          /**
           * @ngdoc method
           * @name angular.Module#config
           * @module ng
           * @param {Function} configFn Execute this function on module load. Useful for service
           *    configuration.
           * @description
           * Use this method to register work which needs to be performed on module loading.
           * For more about how to configure services, see
           * {@link providers#provider-recipe Provider Recipe}.
           */
          config: config,

          /**
           * @ngdoc method
           * @name angular.Module#run
           * @module ng
           * @param {Function} initializationFn Execute this function after injector creation.
           *    Useful for application initialization.
           * @description
           * Use this method to register work which should be performed when the injector is done
           * loading all modules.
           */
          run: function(block) {
            runBlocks.push(block);
            return this;
          }
        };

        if (configFn) {
          config(configFn);
        }

        return moduleInstance;

        /**
         * @param {string} provider
         * @param {string} method
         * @param {String=} insertMethod
         * @returns {angular.Module}
         */
        function invokeLater(provider, method, insertMethod, queue) {
          if (!queue) queue = invokeQueue;
          return function() {
            queue[insertMethod || 'push']([provider, method, arguments]);
            return moduleInstance;
          };
        }

        /**
         * @param {string} provider
         * @param {string} method
         * @returns {angular.Module}
         */
        function invokeLaterAndSetModuleName(provider, method, queue) {
          if (!queue) queue = invokeQueue;
          return function(recipeName, factoryFunction) {
            if (factoryFunction && isFunction(factoryFunction)) factoryFunction.$$moduleName = name;
            queue.push([provider, method, arguments]);
            return moduleInstance;
          };
        }
      });
    };
  });

}

/* global shallowCopy: true */

/**
 * Creates a shallow copy of an object, an array or a primitive.
 *
 * Assumes that there are no proto properties for objects.
 */
function shallowCopy(src, dst) {
  if (isArray(src)) {
    dst = dst || [];

    for (var i = 0, ii = src.length; i < ii; i++) {
      dst[i] = src[i];
    }
  } else if (isObject(src)) {
    dst = dst || {};

    for (var key in src) {
      if (!(key.charAt(0) === '$' && key.charAt(1) === '$')) {
        dst[key] = src[key];
      }
    }
  }

  return dst || src;
}

/* global toDebugString: true */

function serializeObject(obj) {
  var seen = [];

  return JSON.stringify(obj, function(key, val) {
    val = toJsonReplacer(key, val);
    if (isObject(val)) {

      if (seen.indexOf(val) >= 0) return '...';

      seen.push(val);
    }
    return val;
  });
}

function toDebugString(obj) {
  if (typeof obj === 'function') {
    return obj.toString().replace(/ \{[\s\S]*$/, '');
  } else if (isUndefined(obj)) {
    return 'undefined';
  } else if (typeof obj !== 'string') {
    return serializeObject(obj);
  }
  return obj;
}

/* global angularModule: true,
  version: true,

  $CompileProvider,

  htmlAnchorDirective,
  inputDirective,
  inputDirective,
  formDirective,
  scriptDirective,
  selectDirective,
  optionDirective,
  ngBindDirective,
  ngBindHtmlDirective,
  ngBindTemplateDirective,
  ngClassDirective,
  ngClassEvenDirective,
  ngClassOddDirective,
  ngCloakDirective,
  ngControllerDirective,
  ngFormDirective,
  ngHideDirective,
  ngIfDirective,
  ngIncludeDirective,
  ngIncludeFillContentDirective,
  ngInitDirective,
  ngNonBindableDirective,
  ngPluralizeDirective,
  ngRepeatDirective,
  ngShowDirective,
  ngStyleDirective,
  ngSwitchDirective,
  ngSwitchWhenDirective,
  ngSwitchDefaultDirective,
  ngOptionsDirective,
  ngTranscludeDirective,
  ngModelDirective,
  ngListDirective,
  ngChangeDirective,
  patternDirective,
  patternDirective,
  requiredDirective,
  requiredDirective,
  minlengthDirective,
  minlengthDirective,
  maxlengthDirective,
  maxlengthDirective,
  ngValueDirective,
  ngModelOptionsDirective,
  ngAttributeAliasDirectives,
  ngEventDirectives,

  $AnchorScrollProvider,
  $AnimateProvider,
  $CoreAnimateCssProvider,
  $$CoreAnimateJsProvider,
  $$CoreAnimateQueueProvider,
  $$AnimateRunnerFactoryProvider,
  $$AnimateAsyncRunFactoryProvider,
  $BrowserProvider,
  $CacheFactoryProvider,
  $ControllerProvider,
  $DateProvider,
  $DocumentProvider,
  $$IsDocumentHiddenProvider,
  $ExceptionHandlerProvider,
  $FilterProvider,
  $$ForceReflowProvider,
  $InterpolateProvider,
  $IntervalProvider,
  $$HashMapProvider,
  $HttpProvider,
  $HttpParamSerializerProvider,
  $HttpParamSerializerJQLikeProvider,
  $HttpBackendProvider,
  $xhrFactoryProvider,
  $jsonpCallbacksProvider,
  $LocationProvider,
  $LogProvider,
  $ParseProvider,
  $RootScopeProvider,
  $QProvider,
  $$QProvider,
  $$SanitizeUriProvider,
  $SceProvider,
  $SceDelegateProvider,
  $SnifferProvider,
  $TemplateCacheProvider,
  $TemplateRequestProvider,
  $$TestabilityProvider,
  $TimeoutProvider,
  $$RAFProvider,
  $WindowProvider,
  $$jqLiteProvider,
  $$CookieReaderProvider
*/


/**
 * @ngdoc object
 * @name angular.version
 * @module ng
 * @description
 * An object that contains information about the current AngularJS version.
 *
 * This object has the following properties:
 *
 * - `full` – `{string}` – Full version string, such as "0.9.18".
 * - `major` – `{number}` – Major version number, such as "0".
 * - `minor` – `{number}` – Minor version number, such as "9".
 * - `dot` – `{number}` – Dot version number, such as "18".
 * - `codeName` – `{string}` – Code name of the release, such as "jiggling-armfat".
 */
var version = {
  // These placeholder strings will be replaced by grunt's `build` task.
  // They need to be double- or single-quoted.
  full: '1.6.1',
  major: 1,
  minor: 6,
  dot: 1,
  codeName: 'promise-rectification'
};


function publishExternalAPI(angular) {
  extend(angular, {
    'bootstrap': bootstrap,
    'copy': copy,
    'extend': extend,
    'merge': merge,
    'equals': equals,
    'element': jqLite,
    'forEach': forEach,
    'injector': createInjector,
    'noop': noop,
    'bind': bind,
    'toJson': toJson,
    'fromJson': fromJson,
    'identity': identity,
    'isUndefined': isUndefined,
    'isDefined': isDefined,
    'isString': isString,
    'isFunction': isFunction,
    'isObject': isObject,
    'isNumber': isNumber,
    'isElement': isElement,
    'isArray': isArray,
    'version': version,
    'isDate': isDate,
    'lowercase': lowercase,
    'uppercase': uppercase,
    'callbacks': {$$counter: 0},
    'getTestability': getTestability,
    'reloadWithDebugInfo': reloadWithDebugInfo,
    '$$minErr': minErr,
    '$$csp': csp,
    '$$encodeUriSegment': encodeUriSegment,
    '$$encodeUriQuery': encodeUriQuery,
    '$$stringify': stringify
  });

  angularModule = setupModuleLoader(window);

  angularModule('ng', ['ngLocale'], ['$provide',
    function ngModule($provide) {
      // $$sanitizeUriProvider needs to be before $compileProvider as it is used by it.
      $provide.provider({
        $$sanitizeUri: $$SanitizeUriProvider
      });
      $provide.provider('$compile', $CompileProvider).
        directive({
            a: htmlAnchorDirective,
            input: inputDirective,
            textarea: inputDirective,
            form: formDirective,
            script: scriptDirective,
            select: selectDirective,
            option: optionDirective,
            ngBind: ngBindDirective,
            ngBindHtml: ngBindHtmlDirective,
            ngBindTemplate: ngBindTemplateDirective,
            ngClass: ngClassDirective,
            ngClassEven: ngClassEvenDirective,
            ngClassOdd: ngClassOddDirective,
            ngCloak: ngCloakDirective,
            ngController: ngControllerDirective,
            ngForm: ngFormDirective,
            ngHide: ngHideDirective,
            ngIf: ngIfDirective,
            ngInclude: ngIncludeDirective,
            ngInit: ngInitDirective,
            ngNonBindable: ngNonBindableDirective,
            ngPluralize: ngPluralizeDirective,
            ngRepeat: ngRepeatDirective,
            ngShow: ngShowDirective,
            ngStyle: ngStyleDirective,
            ngSwitch: ngSwitchDirective,
            ngSwitchWhen: ngSwitchWhenDirective,
            ngSwitchDefault: ngSwitchDefaultDirective,
            ngOptions: ngOptionsDirective,
            ngTransclude: ngTranscludeDirective,
            ngModel: ngModelDirective,
            ngList: ngListDirective,
            ngChange: ngChangeDirective,
            pattern: patternDirective,
            ngPattern: patternDirective,
            required: requiredDirective,
            ngRequired: requiredDirective,
            minlength: minlengthDirective,
            ngMinlength: minlengthDirective,
            maxlength: maxlengthDirective,
            ngMaxlength: maxlengthDirective,
            ngValue: ngValueDirective,
            ngModelOptions: ngModelOptionsDirective
        }).
        directive({
          ngInclude: ngIncludeFillContentDirective
        }).
        directive(ngAttributeAliasDirectives).
        directive(ngEventDirectives);
      $provide.provider({
        $anchorScroll: $AnchorScrollProvider,
        $animate: $AnimateProvider,
        $animateCss: $CoreAnimateCssProvider,
        $$animateJs: $$CoreAnimateJsProvider,
        $$animateQueue: $$CoreAnimateQueueProvider,
        $$AnimateRunner: $$AnimateRunnerFactoryProvider,
        $$animateAsyncRun: $$AnimateAsyncRunFactoryProvider,
        $browser: $BrowserProvider,
        $cacheFactory: $CacheFactoryProvider,
        $controller: $ControllerProvider,
        $document: $DocumentProvider,
        $$isDocumentHidden: $$IsDocumentHiddenProvider,
        $exceptionHandler: $ExceptionHandlerProvider,
        $filter: $FilterProvider,
        $$forceReflow: $$ForceReflowProvider,
        $interpolate: $InterpolateProvider,
        $interval: $IntervalProvider,
        $http: $HttpProvider,
        $httpParamSerializer: $HttpParamSerializerProvider,
        $httpParamSerializerJQLike: $HttpParamSerializerJQLikeProvider,
        $httpBackend: $HttpBackendProvider,
        $xhrFactory: $xhrFactoryProvider,
        $jsonpCallbacks: $jsonpCallbacksProvider,
        $location: $LocationProvider,
        $log: $LogProvider,
        $parse: $ParseProvider,
        $rootScope: $RootScopeProvider,
        $q: $QProvider,
        $$q: $$QProvider,
        $sce: $SceProvider,
        $sceDelegate: $SceDelegateProvider,
        $sniffer: $SnifferProvider,
        $templateCache: $TemplateCacheProvider,
        $templateRequest: $TemplateRequestProvider,
        $$testability: $$TestabilityProvider,
        $timeout: $TimeoutProvider,
        $window: $WindowProvider,
        $$rAF: $$RAFProvider,
        $$jqLite: $$jqLiteProvider,
        $$HashMap: $$HashMapProvider,
        $$cookieReader: $$CookieReaderProvider
      });
    }
  ]);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *     Any commits to this file should be reviewed with security in mind.  *
 *   Changes to this file can potentially create security vulnerabilities. *
 *          An approval from 2 Core members with history of modifying      *
 *                         this file is required.                          *
 *                                                                         *
 *  Does the change somehow allow for arbitrary javascript to be executed? *
 *    Or allows for someone to change the prototype of built-in objects?   *
 *     Or gives undesired access to variables likes document or window?    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* global
  JQLitePrototype: true,
  BOOLEAN_ATTR: true,
  ALIASED_ATTR: true
*/

//////////////////////////////////
//JQLite
//////////////////////////////////

/**
 * @ngdoc function
 * @name angular.element
 * @module ng
 * @kind function
 *
 * @description
 * Wraps a raw DOM element or HTML string as a [jQuery](http://jquery.com) element.
 *
 * If jQuery is available, `angular.element` is an alias for the
 * [jQuery](http://api.jquery.com/jQuery/) function. If jQuery is not available, `angular.element`
 * delegates to Angular's built-in subset of jQuery, called "jQuery lite" or **jqLite**.
 *
 * jqLite is a tiny, API-compatible subset of jQuery that allows
 * Angular to manipulate the DOM in a cross-browser compatible way. jqLite implements only the most
 * commonly needed functionality with the goal of having a very small footprint.
 *
 * To use `jQuery`, simply ensure it is loaded before the `angular.js` file. You can also use the
 * {@link ngJq `ngJq`} directive to specify that jqlite should be used over jQuery, or to use a
 * specific version of jQuery if multiple versions exist on the page.
 *
 * <div class="alert alert-info">**Note:** All element references in Angular are always wrapped with jQuery or
 * jqLite (such as the element argument in a directive's compile / link function). They are never raw DOM references.</div>
 *
 * <div class="alert alert-warning">**Note:** Keep in mind that this function will not find elements
 * by tag name / CSS selector. For lookups by tag name, try instead `angular.element(document).find(...)`
 * or `$document.find()`, or use the standard DOM APIs, e.g. `document.querySelectorAll()`.</div>
 *
 * ## Angular's jqLite
 * jqLite provides only the following jQuery methods:
 *
 * - [`addClass()`](http://api.jquery.com/addClass/) - Does not support a function as first argument
 * - [`after()`](http://api.jquery.com/after/)
 * - [`append()`](http://api.jquery.com/append/)
 * - [`attr()`](http://api.jquery.com/attr/) - Does not support functions as parameters
 * - [`bind()`](http://api.jquery.com/bind/) (_deprecated_, use [`on()`](http://api.jquery.com/on/)) - Does not support namespaces, selectors or eventData
 * - [`children()`](http://api.jquery.com/children/) - Does not support selectors
 * - [`clone()`](http://api.jquery.com/clone/)
 * - [`contents()`](http://api.jquery.com/contents/)
 * - [`css()`](http://api.jquery.com/css/) - Only retrieves inline-styles, does not call `getComputedStyle()`.
 *   As a setter, does not convert numbers to strings or append 'px', and also does not have automatic property prefixing.
 * - [`data()`](http://api.jquery.com/data/)
 * - [`detach()`](http://api.jquery.com/detach/)
 * - [`empty()`](http://api.jquery.com/empty/)
 * - [`eq()`](http://api.jquery.com/eq/)
 * - [`find()`](http://api.jquery.com/find/) - Limited to lookups by tag name
 * - [`hasClass()`](http://api.jquery.com/hasClass/)
 * - [`html()`](http://api.jquery.com/html/)
 * - [`next()`](http://api.jquery.com/next/) - Does not support selectors
 * - [`on()`](http://api.jquery.com/on/) - Does not support namespaces, selectors or eventData
 * - [`off()`](http://api.jquery.com/off/) - Does not support namespaces, selectors or event object as parameter
 * - [`one()`](http://api.jquery.com/one/) - Does not support namespaces or selectors
 * - [`parent()`](http://api.jquery.com/parent/) - Does not support selectors
 * - [`prepend()`](http://api.jquery.com/prepend/)
 * - [`prop()`](http://api.jquery.com/prop/)
 * - [`ready()`](http://api.jquery.com/ready/) (_deprecated_, use `angular.element(callback)` instead of `angular.element(document).ready(callback)`)
 * - [`remove()`](http://api.jquery.com/remove/)
 * - [`removeAttr()`](http://api.jquery.com/removeAttr/) - Does not support multiple attributes
 * - [`removeClass()`](http://api.jquery.com/removeClass/) - Does not support a function as first argument
 * - [`removeData()`](http://api.jquery.com/removeData/)
 * - [`replaceWith()`](http://api.jquery.com/replaceWith/)
 * - [`text()`](http://api.jquery.com/text/)
 * - [`toggleClass()`](http://api.jquery.com/toggleClass/) - Does not support a function as first argument
 * - [`triggerHandler()`](http://api.jquery.com/triggerHandler/) - Passes a dummy event object to handlers
 * - [`unbind()`](http://api.jquery.com/unbind/) (_deprecated_, use [`off()`](http://api.jquery.com/off/)) - Does not support namespaces or event object as parameter
 * - [`val()`](http://api.jquery.com/val/)
 * - [`wrap()`](http://api.jquery.com/wrap/)
 *
 * ## jQuery/jqLite Extras
 * Angular also provides the following additional methods and events to both jQuery and jqLite:
 *
 * ### Events
 * - `$destroy` - AngularJS intercepts all jqLite/jQuery's DOM destruction apis and fires this event
 *    on all DOM nodes being removed.  This can be used to clean up any 3rd party bindings to the DOM
 *    element before it is removed.
 *
 * ### Methods
 * - `controller(name)` - retrieves the controller of the current element or its parent. By default
 *   retrieves controller associated with the `ngController` directive. If `name` is provided as
 *   camelCase directive name, then the controller for this directive will be retrieved (e.g.
 *   `'ngModel'`).
 * - `injector()` - retrieves the injector of the current element or its parent.
 * - `scope()` - retrieves the {@link ng.$rootScope.Scope scope} of the current
 *   element or its parent. Requires {@link guide/production#disabling-debug-data Debug Data} to
 *   be enabled.
 * - `isolateScope()` - retrieves an isolate {@link ng.$rootScope.Scope scope} if one is attached directly to the
 *   current element. This getter should be used only on elements that contain a directive which starts a new isolate
 *   scope. Calling `scope()` on this element always returns the original non-isolate scope.
 *   Requires {@link guide/production#disabling-debug-data Debug Data} to be enabled.
 * - `inheritedData()` - same as `data()`, but walks up the DOM until a value is found or the top
 *   parent element is reached.
 *
 * @knownIssue You cannot spy on `angular.element` if you are using Jasmine version 1.x. See
 * https://github.com/angular/angular.js/issues/14251 for more information.
 *
 * @param {string|DOMElement} element HTML string or DOMElement to be wrapped into jQuery.
 * @returns {Object} jQuery object.
 */

JQLite.expando = 'ng339';

var jqCache = JQLite.cache = {},
    jqId = 1;

/*
 * !!! This is an undocumented "private" function !!!
 */
JQLite._data = function(node) {
  //jQuery always returns an object on cache miss
  return this.cache[node[this.expando]] || {};
};

function jqNextId() { return ++jqId; }


var DASH_LOWERCASE_REGEXP = /-([a-z])/g;
var MS_HACK_REGEXP = /^-ms-/;
var MOUSE_EVENT_MAP = { mouseleave: 'mouseout', mouseenter: 'mouseover' };
var jqLiteMinErr = minErr('jqLite');

/**
 * Converts kebab-case to camelCase.
 * There is also a special case for the ms prefix starting with a lowercase letter.
 * @param name Name to normalize
 */
function cssKebabToCamel(name) {
    return kebabToCamel(name.replace(MS_HACK_REGEXP, 'ms-'));
}

function fnCamelCaseReplace(all, letter) {
  return letter.toUpperCase();
}

/**
 * Converts kebab-case to camelCase.
 * @param name Name to normalize
 */
function kebabToCamel(name) {
  return name
    .replace(DASH_LOWERCASE_REGEXP, fnCamelCaseReplace);
}

var SINGLE_TAG_REGEXP = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
var HTML_REGEXP = /<|&#?\w+;/;
var TAG_NAME_REGEXP = /<([\w:-]+)/;
var XHTML_TAG_REGEXP = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi;

var wrapMap = {
  'option': [1, '<select multiple="multiple">', '</select>'],

  'thead': [1, '<table>', '</table>'],
  'col': [2, '<table><colgroup>', '</colgroup></table>'],
  'tr': [2, '<table><tbody>', '</tbody></table>'],
  'td': [3, '<table><tbody><tr>', '</tr></tbody></table>'],
  '_default': [0, '', '']
};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function jqLiteIsTextNode(html) {
  return !HTML_REGEXP.test(html);
}

function jqLiteAcceptsData(node) {
  // The window object can accept data but has no nodeType
  // Otherwise we are only interested in elements (1) and documents (9)
  var nodeType = node.nodeType;
  return nodeType === NODE_TYPE_ELEMENT || !nodeType || nodeType === NODE_TYPE_DOCUMENT;
}

function jqLiteHasData(node) {
  for (var key in jqCache[node.ng339]) {
    return true;
  }
  return false;
}

function jqLiteCleanData(nodes) {
  for (var i = 0, ii = nodes.length; i < ii; i++) {
    jqLiteRemoveData(nodes[i]);
  }
}

function jqLiteBuildFragment(html, context) {
  var tmp, tag, wrap,
      fragment = context.createDocumentFragment(),
      nodes = [], i;

  if (jqLiteIsTextNode(html)) {
    // Convert non-html into a text node
    nodes.push(context.createTextNode(html));
  } else {
    // Convert html into DOM nodes
    tmp = fragment.appendChild(context.createElement('div'));
    tag = (TAG_NAME_REGEXP.exec(html) || ['', ''])[1].toLowerCase();
    wrap = wrapMap[tag] || wrapMap._default;
    tmp.innerHTML = wrap[1] + html.replace(XHTML_TAG_REGEXP, '<$1></$2>') + wrap[2];

    // Descend through wrappers to the right content
    i = wrap[0];
    while (i--) {
      tmp = tmp.lastChild;
    }

    nodes = concat(nodes, tmp.childNodes);

    tmp = fragment.firstChild;
    tmp.textContent = '';
  }

  // Remove wrapper from fragment
  fragment.textContent = '';
  fragment.innerHTML = ''; // Clear inner HTML
  forEach(nodes, function(node) {
    fragment.appendChild(node);
  });

  return fragment;
}

function jqLiteParseHTML(html, context) {
  context = context || window.document;
  var parsed;

  if ((parsed = SINGLE_TAG_REGEXP.exec(html))) {
    return [context.createElement(parsed[1])];
  }

  if ((parsed = jqLiteBuildFragment(html, context))) {
    return parsed.childNodes;
  }

  return [];
}

function jqLiteWrapNode(node, wrapper) {
  var parent = node.parentNode;

  if (parent) {
    parent.replaceChild(wrapper, node);
  }

  wrapper.appendChild(node);
}


// IE9-11 has no method "contains" in SVG element and in Node.prototype. Bug #10259.
var jqLiteContains = window.Node.prototype.contains || /** @this */ function(arg) {
  // eslint-disable-next-line no-bitwise
  return !!(this.compareDocumentPosition(arg) & 16);
};

/////////////////////////////////////////////
function JQLite(element) {
  if (element instanceof JQLite) {
    return element;
  }

  var argIsString;

  if (isString(element)) {
    element = trim(element);
    argIsString = true;
  }
  if (!(this instanceof JQLite)) {
    if (argIsString && element.charAt(0) !== '<') {
      throw jqLiteMinErr('nosel', 'Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element');
    }
    return new JQLite(element);
  }

  if (argIsString) {
    jqLiteAddNodes(this, jqLiteParseHTML(element));
  } else if (isFunction(element)) {
    jqLiteReady(element);
  } else {
    jqLiteAddNodes(this, element);
  }
}

function jqLiteClone(element) {
  return element.cloneNode(true);
}

function jqLiteDealoc(element, onlyDescendants) {
  if (!onlyDescendants) jqLiteRemoveData(element);

  if (element.querySelectorAll) {
    var descendants = element.querySelectorAll('*');
    for (var i = 0, l = descendants.length; i < l; i++) {
      jqLiteRemoveData(descendants[i]);
    }
  }
}

function jqLiteOff(element, type, fn, unsupported) {
  if (isDefined(unsupported)) throw jqLiteMinErr('offargs', 'jqLite#off() does not support the `selector` argument');

  var expandoStore = jqLiteExpandoStore(element);
  var events = expandoStore && expandoStore.events;
  var handle = expandoStore && expandoStore.handle;

  if (!handle) return; //no listeners registered

  if (!type) {
    for (type in events) {
      if (type !== '$destroy') {
        element.removeEventListener(type, handle);
      }
      delete events[type];
    }
  } else {

    var removeHandler = function(type) {
      var listenerFns = events[type];
      if (isDefined(fn)) {
        arrayRemove(listenerFns || [], fn);
      }
      if (!(isDefined(fn) && listenerFns && listenerFns.length > 0)) {
        element.removeEventListener(type, handle);
        delete events[type];
      }
    };

    forEach(type.split(' '), function(type) {
      removeHandler(type);
      if (MOUSE_EVENT_MAP[type]) {
        removeHandler(MOUSE_EVENT_MAP[type]);
      }
    });
  }
}

function jqLiteRemoveData(element, name) {
  var expandoId = element.ng339;
  var expandoStore = expandoId && jqCache[expandoId];

  if (expandoStore) {
    if (name) {
      delete expandoStore.data[name];
      return;
    }

    if (expandoStore.handle) {
      if (expandoStore.events.$destroy) {
        expandoStore.handle({}, '$destroy');
      }
      jqLiteOff(element);
    }
    delete jqCache[expandoId];
    element.ng339 = undefined; // don't delete DOM expandos. IE and Chrome don't like it
  }
}


function jqLiteExpandoStore(element, createIfNecessary) {
  var expandoId = element.ng339,
      expandoStore = expandoId && jqCache[expandoId];

  if (createIfNecessary && !expandoStore) {
    element.ng339 = expandoId = jqNextId();
    expandoStore = jqCache[expandoId] = {events: {}, data: {}, handle: undefined};
  }

  return expandoStore;
}


function jqLiteData(element, key, value) {
  if (jqLiteAcceptsData(element)) {
    var prop;

    var isSimpleSetter = isDefined(value);
    var isSimpleGetter = !isSimpleSetter && key && !isObject(key);
    var massGetter = !key;
    var expandoStore = jqLiteExpandoStore(element, !isSimpleGetter);
    var data = expandoStore && expandoStore.data;

    if (isSimpleSetter) { // data('key', value)
      data[kebabToCamel(key)] = value;
    } else {
      if (massGetter) {  // data()
        return data;
      } else {
        if (isSimpleGetter) { // data('key')
          // don't force creation of expandoStore if it doesn't exist yet
          return data && data[kebabToCamel(key)];
        } else { // mass-setter: data({key1: val1, key2: val2})
          for (prop in key) {
            data[kebabToCamel(prop)] = key[prop];
          }
        }
      }
    }
  }
}

function jqLiteHasClass(element, selector) {
  if (!element.getAttribute) return false;
  return ((' ' + (element.getAttribute('class') || '') + ' ').replace(/[\n\t]/g, ' ').
      indexOf(' ' + selector + ' ') > -1);
}

function jqLiteRemoveClass(element, cssClasses) {
  if (cssClasses && element.setAttribute) {
    forEach(cssClasses.split(' '), function(cssClass) {
      element.setAttribute('class', trim(
          (' ' + (element.getAttribute('class') || '') + ' ')
          .replace(/[\n\t]/g, ' ')
          .replace(' ' + trim(cssClass) + ' ', ' '))
      );
    });
  }
}

function jqLiteAddClass(element, cssClasses) {
  if (cssClasses && element.setAttribute) {
    var existingClasses = (' ' + (element.getAttribute('class') || '') + ' ')
                            .replace(/[\n\t]/g, ' ');

    forEach(cssClasses.split(' '), function(cssClass) {
      cssClass = trim(cssClass);
      if (existingClasses.indexOf(' ' + cssClass + ' ') === -1) {
        existingClasses += cssClass + ' ';
      }
    });

    element.setAttribute('class', trim(existingClasses));
  }
}


function jqLiteAddNodes(root, elements) {
  // THIS CODE IS VERY HOT. Don't make changes without benchmarking.

  if (elements) {

    // if a Node (the most common case)
    if (elements.nodeType) {
      root[root.length++] = elements;
    } else {
      var length = elements.length;

      // if an Array or NodeList and not a Window
      if (typeof length === 'number' && elements.window !== elements) {
        if (length) {
          for (var i = 0; i < length; i++) {
            root[root.length++] = elements[i];
          }
        }
      } else {
        root[root.length++] = elements;
      }
    }
  }
}


function jqLiteController(element, name) {
  return jqLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
}

function jqLiteInheritedData(element, name, value) {
  // if element is the document object work with the html element instead
  // this makes $(document).scope() possible
  if (element.nodeType === NODE_TYPE_DOCUMENT) {
    element = element.documentElement;
  }
  var names = isArray(name) ? name : [name];

  while (element) {
    for (var i = 0, ii = names.length; i < ii; i++) {
      if (isDefined(value = jqLite.data(element, names[i]))) return value;
    }

    // If dealing with a document fragment node with a host element, and no parent, use the host
    // element as the parent. This enables directives within a Shadow DOM or polyfilled Shadow DOM
    // to lookup parent controllers.
    element = element.parentNode || (element.nodeType === NODE_TYPE_DOCUMENT_FRAGMENT && element.host);
  }
}

function jqLiteEmpty(element) {
  jqLiteDealoc(element, true);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function jqLiteRemove(element, keepData) {
  if (!keepData) jqLiteDealoc(element);
  var parent = element.parentNode;
  if (parent) parent.removeChild(element);
}


function jqLiteDocumentLoaded(action, win) {
  win = win || window;
  if (win.document.readyState === 'complete') {
    // Force the action to be run async for consistent behavior
    // from the action's point of view
    // i.e. it will definitely not be in a $apply
    win.setTimeout(action);
  } else {
    // No need to unbind this handler as load is only ever called once
    jqLite(win).on('load', action);
  }
}

function jqLiteReady(fn) {
  function trigger() {
    window.document.removeEventListener('DOMContentLoaded', trigger);
    window.removeEventListener('load', trigger);
    fn();
  }

  // check if document is already loaded
  if (window.document.readyState === 'complete') {
    window.setTimeout(fn);
  } else {
    // We can not use jqLite since we are not done loading and jQuery could be loaded later.

    // Works for modern browsers and IE9
    window.document.addEventListener('DOMContentLoaded', trigger);

    // Fallback to window.onload for others
    window.addEventListener('load', trigger);
  }
}

//////////////////////////////////////////
// Functions which are declared directly.
//////////////////////////////////////////
var JQLitePrototype = JQLite.prototype = {
  ready: jqLiteReady,
  toString: function() {
    var value = [];
    forEach(this, function(e) { value.push('' + e);});
    return '[' + value.join(', ') + ']';
  },

  eq: function(index) {
      return (index >= 0) ? jqLite(this[index]) : jqLite(this[this.length + index]);
  },

  length: 0,
  push: push,
  sort: [].sort,
  splice: [].splice
};

//////////////////////////////////////////
// Functions iterating getter/setters.
// these functions return self on setter and
// value on get.
//////////////////////////////////////////
var BOOLEAN_ATTR = {};
forEach('multiple,selected,checked,disabled,readOnly,required,open'.split(','), function(value) {
  BOOLEAN_ATTR[lowercase(value)] = value;
});
var BOOLEAN_ELEMENTS = {};
forEach('input,select,option,textarea,button,form,details'.split(','), function(value) {
  BOOLEAN_ELEMENTS[value] = true;
});
var ALIASED_ATTR = {
  'ngMinlength': 'minlength',
  'ngMaxlength': 'maxlength',
  'ngMin': 'min',
  'ngMax': 'max',
  'ngPattern': 'pattern',
  'ngStep': 'step'
};

function getBooleanAttrName(element, name) {
  // check dom last since we will most likely fail on name
  var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];

  // booleanAttr is here twice to minimize DOM access
  return booleanAttr && BOOLEAN_ELEMENTS[nodeName_(element)] && booleanAttr;
}

function getAliasedAttrName(name) {
  return ALIASED_ATTR[name];
}

forEach({
  data: jqLiteData,
  removeData: jqLiteRemoveData,
  hasData: jqLiteHasData,
  cleanData: jqLiteCleanData
}, function(fn, name) {
  JQLite[name] = fn;
});

forEach({
  data: jqLiteData,
  inheritedData: jqLiteInheritedData,

  scope: function(element) {
    // Can't use jqLiteData here directly so we stay compatible with jQuery!
    return jqLite.data(element, '$scope') || jqLiteInheritedData(element.parentNode || element, ['$isolateScope', '$scope']);
  },

  isolateScope: function(element) {
    // Can't use jqLiteData here directly so we stay compatible with jQuery!
    return jqLite.data(element, '$isolateScope') || jqLite.data(element, '$isolateScopeNoTemplate');
  },

  controller: jqLiteController,

  injector: function(element) {
    return jqLiteInheritedData(element, '$injector');
  },

  removeAttr: function(element, name) {
    element.removeAttribute(name);
  },

  hasClass: jqLiteHasClass,

  css: function(element, name, value) {
    name = cssKebabToCamel(name);

    if (isDefined(value)) {
      element.style[name] = value;
    } else {
      return element.style[name];
    }
  },

  attr: function(element, name, value) {
    var ret;
    var nodeType = element.nodeType;
    if (nodeType === NODE_TYPE_TEXT || nodeType === NODE_TYPE_ATTRIBUTE || nodeType === NODE_TYPE_COMMENT ||
      !element.getAttribute) {
      return;
    }

    var lowercasedName = lowercase(name);
    var isBooleanAttr = BOOLEAN_ATTR[lowercasedName];

    if (isDefined(value)) {
      // setter

      if (value === null || (value === false && isBooleanAttr)) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, isBooleanAttr ? lowercasedName : value);
      }
    } else {
      // getter

      ret = element.getAttribute(name);

      if (isBooleanAttr && ret !== null) {
        ret = lowercasedName;
      }
      // Normalize non-existing attributes to undefined (as jQuery).
      return ret === null ? undefined : ret;
    }
  },

  prop: function(element, name, value) {
    if (isDefined(value)) {
      element[name] = value;
    } else {
      return element[name];
    }
  },

  text: (function() {
    getText.$dv = '';
    return getText;

    function getText(element, value) {
      if (isUndefined(value)) {
        var nodeType = element.nodeType;
        return (nodeType === NODE_TYPE_ELEMENT || nodeType === NODE_TYPE_TEXT) ? element.textContent : '';
      }
      element.textContent = value;
    }
  })(),

  val: function(element, value) {
    if (isUndefined(value)) {
      if (element.multiple && nodeName_(element) === 'select') {
        var result = [];
        forEach(element.options, function(option) {
          if (option.selected) {
            result.push(option.value || option.text);
          }
        });
        return result;
      }
      return element.value;
    }
    element.value = value;
  },

  html: function(element, value) {
    if (isUndefined(value)) {
      return element.innerHTML;
    }
    jqLiteDealoc(element, true);
    element.innerHTML = value;
  },

  empty: jqLiteEmpty
}, function(fn, name) {
  /**
   * Properties: writes return selection, reads return first value
   */
  JQLite.prototype[name] = function(arg1, arg2) {
    var i, key;
    var nodeCount = this.length;

    // jqLiteHasClass has only two arguments, but is a getter-only fn, so we need to special-case it
    // in a way that survives minification.
    // jqLiteEmpty takes no arguments but is a setter.
    if (fn !== jqLiteEmpty &&
        (isUndefined((fn.length === 2 && (fn !== jqLiteHasClass && fn !== jqLiteController)) ? arg1 : arg2))) {
      if (isObject(arg1)) {

        // we are a write, but the object properties are the key/values
        for (i = 0; i < nodeCount; i++) {
          if (fn === jqLiteData) {
            // data() takes the whole object in jQuery
            fn(this[i], arg1);
          } else {
            for (key in arg1) {
              fn(this[i], key, arg1[key]);
            }
          }
        }
        // return self for chaining
        return this;
      } else {
        // we are a read, so read the first child.
        // TODO: do we still need this?
        var value = fn.$dv;
        // Only if we have $dv do we iterate over all, otherwise it is just the first element.
        var jj = (isUndefined(value)) ? Math.min(nodeCount, 1) : nodeCount;
        for (var j = 0; j < jj; j++) {
          var nodeValue = fn(this[j], arg1, arg2);
          value = value ? value + nodeValue : nodeValue;
        }
        return value;
      }
    } else {
      // we are a write, so apply to all children
      for (i = 0; i < nodeCount; i++) {
        fn(this[i], arg1, arg2);
      }
      // return self for chaining
      return this;
    }
  };
});

function createEventHandler(element, events) {
  var eventHandler = function(event, type) {
    // jQuery specific api
    event.isDefaultPrevented = function() {
      return event.defaultPrevented;
    };

    var eventFns = events[type || event.type];
    var eventFnsLength = eventFns ? eventFns.length : 0;

    if (!eventFnsLength) return;

    if (isUndefined(event.immediatePropagationStopped)) {
      var originalStopImmediatePropagation = event.stopImmediatePropagation;
      event.stopImmediatePropagation = function() {
        event.immediatePropagationStopped = true;

        if (event.stopPropagation) {
          event.stopPropagation();
        }

        if (originalStopImmediatePropagation) {
          originalStopImmediatePropagation.call(event);
        }
      };
    }

    event.isImmediatePropagationStopped = function() {
      return event.immediatePropagationStopped === true;
    };

    // Some events have special handlers that wrap the real handler
    var handlerWrapper = eventFns.specialHandlerWrapper || defaultHandlerWrapper;

    // Copy event handlers in case event handlers array is modified during execution.
    if ((eventFnsLength > 1)) {
      eventFns = shallowCopy(eventFns);
    }

    for (var i = 0; i < eventFnsLength; i++) {
      if (!event.isImmediatePropagationStopped()) {
        handlerWrapper(element, event, eventFns[i]);
      }
    }
  };

  // TODO: this is a hack for angularMocks/clearDataCache that makes it possible to deregister all
  //       events on `element`
  eventHandler.elem = element;
  return eventHandler;
}

function defaultHandlerWrapper(element, event, handler) {
  handler.call(element, event);
}

function specialMouseHandlerWrapper(target, event, handler) {
  // Refer to jQuery's implementation of mouseenter & mouseleave
  // Read about mouseenter and mouseleave:
  // http://www.quirksmode.org/js/events_mouse.html#link8
  var related = event.relatedTarget;
  // For mousenter/leave call the handler if related is outside the target.
  // NB: No relatedTarget if the mouse left/entered the browser window
  if (!related || (related !== target && !jqLiteContains.call(target, related))) {
    handler.call(target, event);
  }
}

//////////////////////////////////////////
// Functions iterating traversal.
// These functions chain results into a single
// selector.
//////////////////////////////////////////
forEach({
  removeData: jqLiteRemoveData,

  on: function jqLiteOn(element, type, fn, unsupported) {
    if (isDefined(unsupported)) throw jqLiteMinErr('onargs', 'jqLite#on() does not support the `selector` or `eventData` parameters');

    // Do not add event handlers to non-elements because they will not be cleaned up.
    if (!jqLiteAcceptsData(element)) {
      return;
    }

    var expandoStore = jqLiteExpandoStore(element, true);
    var events = expandoStore.events;
    var handle = expandoStore.handle;

    if (!handle) {
      handle = expandoStore.handle = createEventHandler(element, events);
    }

    // http://jsperf.com/string-indexof-vs-split
    var types = type.indexOf(' ') >= 0 ? type.split(' ') : [type];
    var i = types.length;

    var addHandler = function(type, specialHandlerWrapper, noEventListener) {
      var eventFns = events[type];

      if (!eventFns) {
        eventFns = events[type] = [];
        eventFns.specialHandlerWrapper = specialHandlerWrapper;
        if (type !== '$destroy' && !noEventListener) {
          element.addEventListener(type, handle);
        }
      }

      eventFns.push(fn);
    };

    while (i--) {
      type = types[i];
      if (MOUSE_EVENT_MAP[type]) {
        addHandler(MOUSE_EVENT_MAP[type], specialMouseHandlerWrapper);
        addHandler(type, undefined, true);
      } else {
        addHandler(type);
      }
    }
  },

  off: jqLiteOff,

  one: function(element, type, fn) {
    element = jqLite(element);

    //add the listener twice so that when it is called
    //you can remove the original function and still be
    //able to call element.off(ev, fn) normally
    element.on(type, function onFn() {
      element.off(type, fn);
      element.off(type, onFn);
    });
    element.on(type, fn);
  },

  replaceWith: function(element, replaceNode) {
    var index, parent = element.parentNode;
    jqLiteDealoc(element);
    forEach(new JQLite(replaceNode), function(node) {
      if (index) {
        parent.insertBefore(node, index.nextSibling);
      } else {
        parent.replaceChild(node, element);
      }
      index = node;
    });
  },

  children: function(element) {
    var children = [];
    forEach(element.childNodes, function(element) {
      if (element.nodeType === NODE_TYPE_ELEMENT) {
        children.push(element);
      }
    });
    return children;
  },

  contents: function(element) {
    return element.contentDocument || element.childNodes || [];
  },

  append: function(element, node) {
    var nodeType = element.nodeType;
    if (nodeType !== NODE_TYPE_ELEMENT && nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT) return;

    node = new JQLite(node);

    for (var i = 0, ii = node.length; i < ii; i++) {
      var child = node[i];
      element.appendChild(child);
    }
  },

  prepend: function(element, node) {
    if (element.nodeType === NODE_TYPE_ELEMENT) {
      var index = element.firstChild;
      forEach(new JQLite(node), function(child) {
        element.insertBefore(child, index);
      });
    }
  },

  wrap: function(element, wrapNode) {
    jqLiteWrapNode(element, jqLite(wrapNode).eq(0).clone()[0]);
  },

  remove: jqLiteRemove,

  detach: function(element) {
    jqLiteRemove(element, true);
  },

  after: function(element, newElement) {
    var index = element, parent = element.parentNode;

    if (parent) {
      newElement = new JQLite(newElement);

      for (var i = 0, ii = newElement.length; i < ii; i++) {
        var node = newElement[i];
        parent.insertBefore(node, index.nextSibling);
        index = node;
      }
    }
  },

  addClass: jqLiteAddClass,
  removeClass: jqLiteRemoveClass,

  toggleClass: function(element, selector, condition) {
    if (selector) {
      forEach(selector.split(' '), function(className) {
        var classCondition = condition;
        if (isUndefined(classCondition)) {
          classCondition = !jqLiteHasClass(element, className);
        }
        (classCondition ? jqLiteAddClass : jqLiteRemoveClass)(element, className);
      });
    }
  },

  parent: function(element) {
    var parent = element.parentNode;
    return parent && parent.nodeType !== NODE_TYPE_DOCUMENT_FRAGMENT ? parent : null;
  },

  next: function(element) {
    return element.nextElementSibling;
  },

  find: function(element, selector) {
    if (element.getElementsByTagName) {
      return element.getElementsByTagName(selector);
    } else {
      return [];
    }
  },

  clone: jqLiteClone,

  triggerHandler: function(element, event, extraParameters) {

    var dummyEvent, eventFnsCopy, handlerArgs;
    var eventName = event.type || event;
    var expandoStore = jqLiteExpandoStore(element);
    var events = expandoStore && expandoStore.events;
    var eventFns = events && events[eventName];

    if (eventFns) {
      // Create a dummy event to pass to the handlers
      dummyEvent = {
        preventDefault: function() { this.defaultPrevented = true; },
        isDefaultPrevented: function() { return this.defaultPrevented === true; },
        stopImmediatePropagation: function() { this.immediatePropagationStopped = true; },
        isImmediatePropagationStopped: function() { return this.immediatePropagationStopped === true; },
        stopPropagation: noop,
        type: eventName,
        target: element
      };

      // If a custom event was provided then extend our dummy event with it
      if (event.type) {
        dummyEvent = extend(dummyEvent, event);
      }

      // Copy event handlers in case event handlers array is modified during execution.
      eventFnsCopy = shallowCopy(eventFns);
      handlerArgs = extraParameters ? [dummyEvent].concat(extraParameters) : [dummyEvent];

      forEach(eventFnsCopy, function(fn) {
        if (!dummyEvent.isImmediatePropagationStopped()) {
          fn.apply(element, handlerArgs);
        }
      });
    }
  }
}, function(fn, name) {
  /**
   * chaining functions
   */
  JQLite.prototype[name] = function(arg1, arg2, arg3) {
    var value;

    for (var i = 0, ii = this.length; i < ii; i++) {
      if (isUndefined(value)) {
        value = fn(this[i], arg1, arg2, arg3);
        if (isDefined(value)) {
          // any function which returns a value needs to be wrapped
          value = jqLite(value);
        }
      } else {
        jqLiteAddNodes(value, fn(this[i], arg1, arg2, arg3));
      }
    }
    return isDefined(value) ? value : this;
  };
});

// bind legacy bind/unbind to on/off
JQLite.prototype.bind = JQLite.prototype.on;
JQLite.prototype.unbind = JQLite.prototype.off;


// Provider for private $$jqLite service
/** @this */
function $$jqLiteProvider() {
  this.$get = function $$jqLite() {
    return extend(JQLite, {
      hasClass: function(node, classes) {
        if (node.attr) node = node[0];
        return jqLiteHasClass(node, classes);
      },
      addClass: function(node, classes) {
        if (node.attr) node = node[0];
        return jqLiteAddClass(node, classes);
      },
      removeClass: function(node, classes) {
        if (node.attr) node = node[0];
        return jqLiteRemoveClass(node, classes);
      }
    });
  };
}

/**
 * Computes a hash of an 'obj'.
 * Hash of a:
 *  string is string
 *  number is number as string
 *  object is either result of calling $$hashKey function on the object or uniquely generated id,
 *         that is also assigned to the $$hashKey property of the object.
 *
 * @param obj
 * @returns {string} hash string such that the same input will have the same hash string.
 *         The resulting string key is in 'type:hashKey' format.
 */
function hashKey(obj, nextUidFn) {
  var key = obj && obj.$$hashKey;

  if (key) {
    if (typeof key === 'function') {
      key = obj.$$hashKey();
    }
    return key;
  }

  var objType = typeof obj;
  if (objType === 'function' || (objType === 'object' && obj !== null)) {
    key = obj.$$hashKey = objType + ':' + (nextUidFn || nextUid)();
  } else {
    key = objType + ':' + obj;
  }

  return key;
}

/**
 * HashMap which can use objects as keys
 */
function HashMap(array, isolatedUid) {
  if (isolatedUid) {
    var uid = 0;
    this.nextUid = function() {
      return ++uid;
    };
  }
  forEach(array, this.put, this);
}
HashMap.prototype = {
  /**
   * Store key value pair
   * @param key key to store can be any type
   * @param value value to store can be any type
   */
  put: function(key, value) {
    this[hashKey(key, this.nextUid)] = value;
  },

  /**
   * @param key
   * @returns {Object} the value for the key
   */
  get: function(key) {
    return this[hashKey(key, this.nextUid)];
  },

  /**
   * Remove the key/value pair
   * @param key
   */
  remove: function(key) {
    var value = this[key = hashKey(key, this.nextUid)];
    delete this[key];
    return value;
  }
};

var $$HashMapProvider = [/** @this */function() {
  this.$get = [function() {
    return HashMap;
  }];
}];

/**
 * @ngdoc function
 * @module ng
 * @name angular.injector
 * @kind function
 *
 * @description
 * Creates an injector object that can be used for retrieving services as well as for
 * dependency injection (see {@link guide/di dependency injection}).
 *
 * @param {Array.<string|Function>} modules A list of module functions or their aliases. See
 *     {@link angular.module}. The `ng` module must be explicitly added.
 * @param {boolean=} [strictDi=false] Whether the injector should be in strict mode, which
 *     disallows argument name annotation inference.
 * @returns {injector} Injector object. See {@link auto.$injector $injector}.
 *
 * @example
 * Typical usage
 * ```js
 *   // create an injector
 *   var $injector = angular.injector(['ng']);
 *
 *   // use the injector to kick off your application
 *   // use the type inference to auto inject arguments, or use implicit injection
 *   $injector.invoke(function($rootScope, $compile, $document) {
 *     $compile($document)($rootScope);
 *     $rootScope.$digest();
 *   });
 * ```
 *
 * Sometimes you want to get access to the injector of a currently running Angular app
 * from outside Angular. Perhaps, you want to inject and compile some markup after the
 * application has been bootstrapped. You can do this using the extra `injector()` added
 * to JQuery/jqLite elements. See {@link angular.element}.
 *
 * *This is fairly rare but could be the case if a third party library is injecting the
 * markup.*
 *
 * In the following example a new block of HTML containing a `ng-controller`
 * directive is added to the end of the document body by JQuery. We then compile and link
 * it into the current AngularJS scope.
 *
 * ```js
 * var $div = $('<div ng-controller="MyCtrl">{{content.label}}</div>');
 * $(document.body).append($div);
 *
 * angular.element(document).injector().invoke(function($compile) {
 *   var scope = angular.element($div).scope();
 *   $compile($div)(scope);
 * });
 * ```
 */


/**
 * @ngdoc module
 * @name auto
 * @installation
 * @description
 *
 * Implicit module which gets automatically added to each {@link auto.$injector $injector}.
 */

var ARROW_ARG = /^([^(]+?)=>/;
var FN_ARGS = /^[^(]*\(\s*([^)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var $injectorMinErr = minErr('$injector');

function stringifyFn(fn) {
  // Support: Chrome 50-51 only
  // Creating a new string by adding `' '` at the end, to hack around some bug in Chrome v50/51
  // (See https://github.com/angular/angular.js/issues/14487.)
  // TODO (gkalpak): Remove workaround when Chrome v52 is released
  return Function.prototype.toString.call(fn) + ' ';
}

function extractArgs(fn) {
  var fnText = stringifyFn(fn).replace(STRIP_COMMENTS, ''),
      args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
  return args;
}

function anonFn(fn) {
  // For anonymous functions, showing at the very least the function signature can help in
  // debugging.
  var args = extractArgs(fn);
  if (args) {
    return 'function(' + (args[1] || '').replace(/[\s\r\n]+/, ' ') + ')';
  }
  return 'fn';
}

function annotate(fn, strictDi, name) {
  var $inject,
      argDecl,
      last;

  if (typeof fn === 'function') {
    if (!($inject = fn.$inject)) {
      $inject = [];
      if (fn.length) {
        if (strictDi) {
          if (!isString(name) || !name) {
            name = fn.name || anonFn(fn);
          }
          throw $injectorMinErr('strictdi',
            '{0} is not using explicit annotation and cannot be invoked in strict mode', name);
        }
        argDecl = extractArgs(fn);
        forEach(argDecl[1].split(FN_ARG_SPLIT), function(arg) {
          arg.replace(FN_ARG, function(all, underscore, name) {
            $inject.push(name);
          });
        });
      }
      fn.$inject = $inject;
    }
  } else if (isArray(fn)) {
    last = fn.length - 1;
    assertArgFn(fn[last], 'fn');
    $inject = fn.slice(0, last);
  } else {
    assertArgFn(fn, 'fn', true);
  }
  return $inject;
}

///////////////////////////////////////

/**
 * @ngdoc service
 * @name $injector
 *
 * @description
 *
 * `$injector` is used to retrieve object instances as defined by
 * {@link auto.$provide provider}, instantiate types, invoke methods,
 * and load modules.
 *
 * The following always holds true:
 *
 * ```js
 *   var $injector = angular.injector();
 *   expect($injector.get('$injector')).toBe($injector);
 *   expect($injector.invoke(function($injector) {
 *     return $injector;
 *   })).toBe($injector);
 * ```
 *
 * # Injection Function Annotation
 *
 * JavaScript does not have annotations, and annotations are needed for dependency injection. The
 * following are all valid ways of annotating function with injection arguments and are equivalent.
 *
 * ```js
 *   // inferred (only works if code not minified/obfuscated)
 *   $injector.invoke(function(serviceA){});
 *
 *   // annotated
 *   function explicit(serviceA) {};
 *   explicit.$inject = ['serviceA'];
 *   $injector.invoke(explicit);
 *
 *   // inline
 *   $injector.invoke(['serviceA', function(serviceA){}]);
 * ```
 *
 * ## Inference
 *
 * In JavaScript calling `toString()` on a function returns the function definition. The definition
 * can then be parsed and the function arguments can be extracted. This method of discovering
 * annotations is disallowed when the injector is in strict mode.
 * *NOTE:* This does not work with minification, and obfuscation tools since these tools change the
 * argument names.
 *
 * ## `$inject` Annotation
 * By adding an `$inject` property onto a function the injection parameters can be specified.
 *
 * ## Inline
 * As an array of injection names, where the last item in the array is the function to call.
 */

/**
 * @ngdoc method
 * @name $injector#get
 *
 * @description
 * Return an instance of the service.
 *
 * @param {string} name The name of the instance to retrieve.
 * @param {string=} caller An optional string to provide the origin of the function call for error messages.
 * @return {*} The instance.
 */

/**
 * @ngdoc method
 * @name $injector#invoke
 *
 * @description
 * Invoke the method and supply the method arguments from the `$injector`.
 *
 * @param {Function|Array.<string|Function>} fn The injectable function to invoke. Function parameters are
 *   injected according to the {@link guide/di $inject Annotation} rules.
 * @param {Object=} self The `this` for the invoked method.
 * @param {Object=} locals Optional object. If preset then any argument names are read from this
 *                         object first, before the `$injector` is consulted.
 * @returns {*} the value returned by the invoked `fn` function.
 */

/**
 * @ngdoc method
 * @name $injector#has
 *
 * @description
 * Allows the user to query if the particular service exists.
 *
 * @param {string} name Name of the service to query.
 * @returns {boolean} `true` if injector has given service.
 */

/**
 * @ngdoc method
 * @name $injector#instantiate
 * @description
 * Create a new instance of JS type. The method takes a constructor function, invokes the new
 * operator, and supplies all of the arguments to the constructor function as specified by the
 * constructor annotation.
 *
 * @param {Function} Type Annotated constructor function.
 * @param {Object=} locals Optional object. If preset then any argument names are read from this
 * object first, before the `$injector` is consulted.
 * @returns {Object} new instance of `Type`.
 */

/**
 * @ngdoc method
 * @name $injector#annotate
 *
 * @description
 * Returns an array of service names which the function is requesting for injection. This API is
 * used by the injector to determine which services need to be injected into the function when the
 * function is invoked. There are three ways in which the function can be annotated with the needed
 * dependencies.
 *
 * # Argument names
 *
 * The simplest form is to extract the dependencies from the arguments of the function. This is done
 * by converting the function into a string using `toString()` method and extracting the argument
 * names.
 * ```js
 *   // Given
 *   function MyController($scope, $route) {
 *     // ...
 *   }
 *
 *   // Then
 *   expect(injector.annotate(MyController)).toEqual(['$scope', '$route']);
 * ```
 *
 * You can disallow this method by using strict injection mode.
 *
 * This method does not work with code minification / obfuscation. For this reason the following
 * annotation strategies are supported.
 *
 * # The `$inject` property
 *
 * If a function has an `$inject` property and its value is an array of strings, then the strings
 * represent names of services to be injected into the function.
 * ```js
 *   // Given
 *   var MyController = function(obfuscatedScope, obfuscatedRoute) {
 *     // ...
 *   }
 *   // Define function dependencies
 *   MyController['$inject'] = ['$scope', '$route'];
 *
 *   // Then
 *   expect(injector.annotate(MyController)).toEqual(['$scope', '$route']);
 * ```
 *
 * # The array notation
 *
 * It is often desirable to inline Injected functions and that's when setting the `$inject` property
 * is very inconvenient. In these situations using the array notation to specify the dependencies in
 * a way that survives minification is a better choice:
 *
 * ```js
 *   // We wish to write this (not minification / obfuscation safe)
 *   injector.invoke(function($compile, $rootScope) {
 *     // ...
 *   });
 *
 *   // We are forced to write break inlining
 *   var tmpFn = function(obfuscatedCompile, obfuscatedRootScope) {
 *     // ...
 *   };
 *   tmpFn.$inject = ['$compile', '$rootScope'];
 *   injector.invoke(tmpFn);
 *
 *   // To better support inline function the inline annotation is supported
 *   injector.invoke(['$compile', '$rootScope', function(obfCompile, obfRootScope) {
 *     // ...
 *   }]);
 *
 *   // Therefore
 *   expect(injector.annotate(
 *      ['$compile', '$rootScope', function(obfus_$compile, obfus_$rootScope) {}])
 *    ).toEqual(['$compile', '$rootScope']);
 * ```
 *
 * @param {Function|Array.<string|Function>} fn Function for which dependent service names need to
 * be retrieved as described above.
 *
 * @param {boolean=} [strictDi=false] Disallow argument name annotation inference.
 *
 * @returns {Array.<string>} The names of the services which the function requires.
 */



/**
 * @ngdoc service
 * @name $provide
 *
 * @description
 *
 * The {@link auto.$provide $provide} service has a number of methods for registering components
 * with the {@link auto.$injector $injector}. Many of these functions are also exposed on
 * {@link angular.Module}.
 *
 * An Angular **service** is a singleton object created by a **service factory**.  These **service
 * factories** are functions which, in turn, are created by a **service provider**.
 * The **service providers** are constructor functions. When instantiated they must contain a
 * property called `$get`, which holds the **service factory** function.
 *
 * When you request a service, the {@link auto.$injector $injector} is responsible for finding the
 * correct **service provider**, instantiating it and then calling its `$get` **service factory**
 * function to get the instance of the **service**.
 *
 * Often services have no configuration options and there is no need to add methods to the service
 * provider.  The provider will be no more than a constructor function with a `$get` property. For
 * these cases the {@link auto.$provide $provide} service has additional helper methods to register
 * services without specifying a provider.
 *
 * * {@link auto.$provide#provider provider(name, provider)} - registers a **service provider** with the
 *     {@link auto.$injector $injector}
 * * {@link auto.$provide#constant constant(name, obj)} - registers a value/object that can be accessed by
 *     providers and services.
 * * {@link auto.$provide#value value(name, obj)} - registers a value/object that can only be accessed by
 *     services, not providers.
 * * {@link auto.$provide#factory factory(name, fn)} - registers a service **factory function**
 *     that will be wrapped in a **service provider** object, whose `$get` property will contain the
 *     given factory function.
 * * {@link auto.$provide#service service(name, Fn)} - registers a **constructor function**
 *     that will be wrapped in a **service provider** object, whose `$get` property will instantiate
 *      a new object using the given constructor function.
 * * {@link auto.$provide#decorator decorator(name, decorFn)} - registers a **decorator function** that
 *      will be able to modify or replace the implementation of another service.
 *
 * See the individual methods for more information and examples.
 */

/**
 * @ngdoc method
 * @name $provide#provider
 * @description
 *
 * Register a **provider function** with the {@link auto.$injector $injector}. Provider functions
 * are constructor functions, whose instances are responsible for "providing" a factory for a
 * service.
 *
 * Service provider names start with the name of the service they provide followed by `Provider`.
 * For example, the {@link ng.$log $log} service has a provider called
 * {@link ng.$logProvider $logProvider}.
 *
 * Service provider objects can have additional methods which allow configuration of the provider
 * and its service. Importantly, you can configure what kind of service is created by the `$get`
 * method, or how that service will act. For example, the {@link ng.$logProvider $logProvider} has a
 * method {@link ng.$logProvider#debugEnabled debugEnabled}
 * which lets you specify whether the {@link ng.$log $log} service will log debug messages to the
 * console or not.
 *
 * @param {string} name The name of the instance. NOTE: the provider will be available under `name +
                        'Provider'` key.
 * @param {(Object|function())} provider If the provider is:
 *
 *   - `Object`: then it should have a `$get` method. The `$get` method will be invoked using
 *     {@link auto.$injector#invoke $injector.invoke()} when an instance needs to be created.
 *   - `Constructor`: a new instance of the provider will be created using
 *     {@link auto.$injector#instantiate $injector.instantiate()}, then treated as `object`.
 *
 * @returns {Object} registered provider instance

 * @example
 *
 * The following example shows how to create a simple event tracking service and register it using
 * {@link auto.$provide#provider $provide.provider()}.
 *
 * ```js
 *  // Define the eventTracker provider
 *  function EventTrackerProvider() {
 *    var trackingUrl = '/track';
 *
 *    // A provider method for configuring where the tracked events should been saved
 *    this.setTrackingUrl = function(url) {
 *      trackingUrl = url;
 *    };
 *
 *    // The service factory function
 *    this.$get = ['$http', function($http) {
 *      var trackedEvents = {};
 *      return {
 *        // Call this to track an event
 *        event: function(event) {
 *          var count = trackedEvents[event] || 0;
 *          count += 1;
 *          trackedEvents[event] = count;
 *          return count;
 *        },
 *        // Call this to save the tracked events to the trackingUrl
 *        save: function() {
 *          $http.post(trackingUrl, trackedEvents);
 *        }
 *      };
 *    }];
 *  }
 *
 *  describe('eventTracker', function() {
 *    var postSpy;
 *
 *    beforeEach(module(function($provide) {
 *      // Register the eventTracker provider
 *      $provide.provider('eventTracker', EventTrackerProvider);
 *    }));
 *
 *    beforeEach(module(function(eventTrackerProvider) {
 *      // Configure eventTracker provider
 *      eventTrackerProvider.setTrackingUrl('/custom-track');
 *    }));
 *
 *    it('tracks events', inject(function(eventTracker) {
 *      expect(eventTracker.event('login')).toEqual(1);
 *      expect(eventTracker.event('login')).toEqual(2);
 *    }));
 *
 *    it('saves to the tracking url', inject(function(eventTracker, $http) {
 *      postSpy = spyOn($http, 'post');
 *      eventTracker.event('login');
 *      eventTracker.save();
 *      expect(postSpy).toHaveBeenCalled();
 *      expect(postSpy.mostRecentCall.args[0]).not.toEqual('/track');
 *      expect(postSpy.mostRecentCall.args[0]).toEqual('/custom-track');
 *      expect(postSpy.mostRecentCall.args[1]).toEqual({ 'login': 1 });
 *    }));
 *  });
 * ```
 */

/**
 * @ngdoc method
 * @name $provide#factory
 * @description
 *
 * Register a **service factory**, which will be called to return the service instance.
 * This is short for registering a service where its provider consists of only a `$get` property,
 * which is the given service factory function.
 * You should use {@link auto.$provide#factory $provide.factory(getFn)} if you do not need to
 * configure your service in a provider.
 *
 * @param {string} name The name of the instance.
 * @param {Function|Array.<string|Function>} $getFn The injectable $getFn for the instance creation.
 *                      Internally this is a short hand for `$provide.provider(name, {$get: $getFn})`.
 * @returns {Object} registered provider instance
 *
 * @example
 * Here is an example of registering a service
 * ```js
 *   $provide.factory('ping', ['$http', function($http) {
 *     return function ping() {
 *       return $http.send('/ping');
 *     };
 *   }]);
 * ```
 * You would then inject and use this service like this:
 * ```js
 *   someModule.controller('Ctrl', ['ping', function(ping) {
 *     ping();
 *   }]);
 * ```
 */


/**
 * @ngdoc method
 * @name $provide#service
 * @description
 *
 * Register a **service constructor**, which will be invoked with `new` to create the service
 * instance.
 * This is short for registering a service where its provider's `$get` property is a factory
 * function that returns an instance instantiated by the injector from the service constructor
 * function.
 *
 * Internally it looks a bit like this:
 *
 * ```
 * {
 *   $get: function() {
 *     return $injector.instantiate(constructor);
 *   }
 * }
 * ```
 *
 *
 * You should use {@link auto.$provide#service $provide.service(class)} if you define your service
 * as a type/class.
 *
 * @param {string} name The name of the instance.
 * @param {Function|Array.<string|Function>} constructor An injectable class (constructor function)
 *     that will be instantiated.
 * @returns {Object} registered provider instance
 *
 * @example
 * Here is an example of registering a service using
 * {@link auto.$provide#service $provide.service(class)}.
 * ```js
 *   var Ping = function($http) {
 *     this.$http = $http;
 *   };
 *
 *   Ping.$inject = ['$http'];
 *
 *   Ping.prototype.send = function() {
 *     return this.$http.get('/ping');
 *   };
 *   $provide.service('ping', Ping);
 * ```
 * You would then inject and use this service like this:
 * ```js
 *   someModule.controller('Ctrl', ['ping', function(ping) {
 *     ping.send();
 *   }]);
 * ```
 */


/**
 * @ngdoc method
 * @name $provide#value
 * @description
 *
 * Register a **value service** with the {@link auto.$injector $injector}, such as a string, a
 * number, an array, an object or a function. This is short for registering a service where its
 * provider's `$get` property is a factory function that takes no arguments and returns the **value
 * service**. That also means it is not possible to inject other services into a value service.
 *
 * Value services are similar to constant services, except that they cannot be injected into a
 * module configuration function (see {@link angular.Module#config}) but they can be overridden by
 * an Angular {@link auto.$provide#decorator decorator}.
 *
 * @param {string} name The name of the instance.
 * @param {*} value The value.
 * @returns {Object} registered provider instance
 *
 * @example
 * Here are some examples of creating value services.
 * ```js
 *   $provide.value('ADMIN_USER', 'admin');
 *
 *   $provide.value('RoleLookup', { admin: 0, writer: 1, reader: 2 });
 *
 *   $provide.value('halfOf', function(value) {
 *     return value / 2;
 *   });
 * ```
 */


/**
 * @ngdoc method
 * @name $provide#constant
 * @description
 *
 * Register a **constant service** with the {@link auto.$injector $injector}, such as a string,
 * a number, an array, an object or a function. Like the {@link auto.$provide#value value}, it is not
 * possible to inject other services into a constant.
 *
 * But unlike {@link auto.$provide#value value}, a constant can be
 * injected into a module configuration function (see {@link angular.Module#config}) and it cannot
 * be overridden by an Angular {@link auto.$provide#decorator decorator}.
 *
 * @param {string} name The name of the constant.
 * @param {*} value The constant value.
 * @returns {Object} registered instance
 *
 * @example
 * Here a some examples of creating constants:
 * ```js
 *   $provide.constant('SHARD_HEIGHT', 306);
 *
 *   $provide.constant('MY_COLOURS', ['red', 'blue', 'grey']);
 *
 *   $provide.constant('double', function(value) {
 *     return value * 2;
 *   });
 * ```
 */


/**
 * @ngdoc method
 * @name $provide#decorator
 * @description
 *
 * Register a **decorator function** with the {@link auto.$injector $injector}. A decorator function
 * intercepts the creation of a service, allowing it to override or modify the behavior of the
 * service. The return value of the decorator function may be the original service, or a new service
 * that replaces (or wraps and delegates to) the original service.
 *
 * You can find out more about using decorators in the {@link guide/decorators} guide.
 *
 * @param {string} name The name of the service to decorate.
 * @param {Function|Array.<string|Function>} decorator This function will be invoked when the service needs to be
 *    provided and should return the decorated service instance. The function is called using
 *    the {@link auto.$injector#invoke injector.invoke} method and is therefore fully injectable.
 *    Local injection arguments:
 *
 *    * `$delegate` - The original service instance, which can be replaced, monkey patched, configured,
 *      decorated or delegated to.
 *
 * @example
 * Here we decorate the {@link ng.$log $log} service to convert warnings to errors by intercepting
 * calls to {@link ng.$log#error $log.warn()}.
 * ```js
 *   $provide.decorator('$log', ['$delegate', function($delegate) {
 *     $delegate.warn = $delegate.error;
 *     return $delegate;
 *   }]);
 * ```
 */


function createInjector(modulesToLoad, strictDi) {
  strictDi = (strictDi === true);
  var INSTANTIATING = {},
      providerSuffix = 'Provider',
      path = [],
      loadedModules = new HashMap([], true),
      providerCache = {
        $provide: {
            provider: supportObject(provider),
            factory: supportObject(factory),
            service: supportObject(service),
            value: supportObject(value),
            constant: supportObject(constant),
            decorator: decorator
          }
      },
      providerInjector = (providerCache.$injector =
          createInternalInjector(providerCache, function(serviceName, caller) {
            if (angular.isString(caller)) {
              path.push(caller);
            }
            throw $injectorMinErr('unpr', 'Unknown provider: {0}', path.join(' <- '));
          })),
      instanceCache = {},
      protoInstanceInjector =
          createInternalInjector(instanceCache, function(serviceName, caller) {
            var provider = providerInjector.get(serviceName + providerSuffix, caller);
            return instanceInjector.invoke(
                provider.$get, provider, undefined, serviceName);
          }),
      instanceInjector = protoInstanceInjector;

  providerCache['$injector' + providerSuffix] = { $get: valueFn(protoInstanceInjector) };
  var runBlocks = loadModules(modulesToLoad);
  instanceInjector = protoInstanceInjector.get('$injector');
  instanceInjector.strictDi = strictDi;
  forEach(runBlocks, function(fn) { if (fn) instanceInjector.invoke(fn); });

  return instanceInjector;

  ////////////////////////////////////
  // $provider
  ////////////////////////////////////

  function supportObject(delegate) {
    return function(key, value) {
      if (isObject(key)) {
        forEach(key, reverseParams(delegate));
      } else {
        return delegate(key, value);
      }
    };
  }

  function provider(name, provider_) {
    assertNotHasOwnProperty(name, 'service');
    if (isFunction(provider_) || isArray(provider_)) {
      provider_ = providerInjector.instantiate(provider_);
    }
    if (!provider_.$get) {
      throw $injectorMinErr('pget', 'Provider \'{0}\' must define $get factory method.', name);
    }
    return (providerCache[name + providerSuffix] = provider_);
  }

  function enforceReturnValue(name, factory) {
    return /** @this */ function enforcedReturnValue() {
      var result = instanceInjector.invoke(factory, this);
      if (isUndefined(result)) {
        throw $injectorMinErr('undef', 'Provider \'{0}\' must return a value from $get factory method.', name);
      }
      return result;
    };
  }

  function factory(name, factoryFn, enforce) {
    return provider(name, {
      $get: enforce !== false ? enforceReturnValue(name, factoryFn) : factoryFn
    });
  }

  function service(name, constructor) {
    return factory(name, ['$injector', function($injector) {
      return $injector.instantiate(constructor);
    }]);
  }

  function value(name, val) { return factory(name, valueFn(val), false); }

  function constant(name, value) {
    assertNotHasOwnProperty(name, 'constant');
    providerCache[name] = value;
    instanceCache[name] = value;
  }

  function decorator(serviceName, decorFn) {
    var origProvider = providerInjector.get(serviceName + providerSuffix),
        orig$get = origProvider.$get;

    origProvider.$get = function() {
      var origInstance = instanceInjector.invoke(orig$get, origProvider);
      return instanceInjector.invoke(decorFn, null, {$delegate: origInstance});
    };
  }

  ////////////////////////////////////
  // Module Loading
  ////////////////////////////////////
  function loadModules(modulesToLoad) {
    assertArg(isUndefined(modulesToLoad) || isArray(modulesToLoad), 'modulesToLoad', 'not an array');
    var runBlocks = [], moduleFn;
    forEach(modulesToLoad, function(module) {
      if (loadedModules.get(module)) return;
      loadedModules.put(module, true);

      function runInvokeQueue(queue) {
        var i, ii;
        for (i = 0, ii = queue.length; i < ii; i++) {
          var invokeArgs = queue[i],
              provider = providerInjector.get(invokeArgs[0]);

          provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
        }
      }

      try {
        if (isString(module)) {
          moduleFn = angularModule(module);
          runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
          runInvokeQueue(moduleFn._invokeQueue);
          runInvokeQueue(moduleFn._configBlocks);
        } else if (isFunction(module)) {
            runBlocks.push(providerInjector.invoke(module));
        } else if (isArray(module)) {
            runBlocks.push(providerInjector.invoke(module));
        } else {
          assertArgFn(module, 'module');
        }
      } catch (e) {
        if (isArray(module)) {
          module = module[module.length - 1];
        }
        if (e.message && e.stack && e.stack.indexOf(e.message) === -1) {
          // Safari & FF's stack traces don't contain error.message content
          // unlike those of Chrome and IE
          // So if stack doesn't contain message, we create a new string that contains both.
          // Since error.stack is read-only in Safari, I'm overriding e and not e.stack here.
          // eslint-disable-next-line no-ex-assign
          e = e.message + '\n' + e.stack;
        }
        throw $injectorMinErr('modulerr', 'Failed to instantiate module {0} due to:\n{1}',
                  module, e.stack || e.message || e);
      }
    });
    return runBlocks;
  }

  ////////////////////////////////////
  // internal Injector
  ////////////////////////////////////

  function createInternalInjector(cache, factory) {

    function getService(serviceName, caller) {
      if (cache.hasOwnProperty(serviceName)) {
        if (cache[serviceName] === INSTANTIATING) {
          throw $injectorMinErr('cdep', 'Circular dependency found: {0}',
                    serviceName + ' <- ' + path.join(' <- '));
        }
        return cache[serviceName];
      } else {
        try {
          path.unshift(serviceName);
          cache[serviceName] = INSTANTIATING;
          cache[serviceName] = factory(serviceName, caller);
          return cache[serviceName];
        } catch (err) {
          if (cache[serviceName] === INSTANTIATING) {
            delete cache[serviceName];
          }
          throw err;
        } finally {
          path.shift();
        }
      }
    }


    function injectionArgs(fn, locals, serviceName) {
      var args = [],
          $inject = createInjector.$$annotate(fn, strictDi, serviceName);

      for (var i = 0, length = $inject.length; i < length; i++) {
        var key = $inject[i];
        if (typeof key !== 'string') {
          throw $injectorMinErr('itkn',
                  'Incorrect injection token! Expected service name as string, got {0}', key);
        }
        args.push(locals && locals.hasOwnProperty(key) ? locals[key] :
                                                         getService(key, serviceName));
      }
      return args;
    }

    function isClass(func) {
      // Support: IE 9-11 only
      // IE 9-11 do not support classes and IE9 leaks with the code below.
      if (msie || typeof func !== 'function') {
        return false;
      }
      var result = func.$$ngIsClass;
      if (!isBoolean(result)) {
        // Support: Edge 12-13 only
        // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/6156135/
        result = func.$$ngIsClass = /^(?:class\b|constructor\()/.test(stringifyFn(func));
      }
      return result;
    }

    function invoke(fn, self, locals, serviceName) {
      if (typeof locals === 'string') {
        serviceName = locals;
        locals = null;
      }

      var args = injectionArgs(fn, locals, serviceName);
      if (isArray(fn)) {
        fn = fn[fn.length - 1];
      }

      if (!isClass(fn)) {
        // http://jsperf.com/angularjs-invoke-apply-vs-switch
        // #5388
        return fn.apply(self, args);
      } else {
        args.unshift(null);
        return new (Function.prototype.bind.apply(fn, args))();
      }
    }


    function instantiate(Type, locals, serviceName) {
      // Check if Type is annotated and use just the given function at n-1 as parameter
      // e.g. someModule.factory('greeter', ['$window', function(renamed$window) {}]);
      var ctor = (isArray(Type) ? Type[Type.length - 1] : Type);
      var args = injectionArgs(Type, locals, serviceName);
      // Empty object at position 0 is ignored for invocation with `new`, but required.
      args.unshift(null);
      return new (Function.prototype.bind.apply(ctor, args))();
    }


    return {
      invoke: invoke,
      instantiate: instantiate,
      get: getService,
      annotate: createInjector.$$annotate,
      has: function(name) {
        return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
      }
    };
  }
}

createInjector.$$annotate = annotate;

/**
 * @ngdoc provider
 * @name $anchorScrollProvider
 * @this
 *
 * @description
 * Use `$anchorScrollProvider` to disable automatic scrolling whenever
 * {@link ng.$location#hash $location.hash()} changes.
 */
function $AnchorScrollProvider() {

  var autoScrollingEnabled = true;

  /**
   * @ngdoc method
   * @name $anchorScrollProvider#disableAutoScrolling
   *
   * @description
   * By default, {@link ng.$anchorScroll $anchorScroll()} will automatically detect changes to
   * {@link ng.$location#hash $location.hash()} and scroll to the element matching the new hash.<br />
   * Use this method to disable automatic scrolling.
   *
   * If automatic scrolling is disabled, one must explicitly call
   * {@link ng.$anchorScroll $anchorScroll()} in order to scroll to the element related to the
   * current hash.
   */
  this.disableAutoScrolling = function() {
    autoScrollingEnabled = false;
  };

  /**
   * @ngdoc service
   * @name $anchorScroll
   * @kind function
   * @requires $window
   * @requires $location
   * @requires $rootScope
   *
   * @description
   * When called, it scrolls to the element related to the specified `hash` or (if omitted) to the
   * current value of {@link ng.$location#hash $location.hash()}, according to the rules specified
   * in the
   * [HTML5 spec](http://www.w3.org/html/wg/drafts/html/master/browsers.html#an-indicated-part-of-the-document).
   *
   * It also watches the {@link ng.$location#hash $location.hash()} and automatically scrolls to
   * match any anchor whenever it changes. This can be disabled by calling
   * {@link ng.$anchorScrollProvider#disableAutoScrolling $anchorScrollProvider.disableAutoScrolling()}.
   *
   * Additionally, you can use its {@link ng.$anchorScroll#yOffset yOffset} property to specify a
   * vertical scroll-offset (either fixed or dynamic).
   *
   * @param {string=} hash The hash specifying the element to scroll to. If omitted, the value of
   *                       {@link ng.$location#hash $location.hash()} will be used.
   *
   * @property {(number|function|jqLite)} yOffset
   * If set, specifies a vertical scroll-offset. This is often useful when there are fixed
   * positioned elements at the top of the page, such as navbars, headers etc.
   *
   * `yOffset` can be specified in various ways:
   * - **number**: A fixed number of pixels to be used as offset.<br /><br />
   * - **function**: A getter function called everytime `$anchorScroll()` is executed. Must return
   *   a number representing the offset (in pixels).<br /><br />
   * - **jqLite**: A jqLite/jQuery element to be used for specifying the offset. The distance from
   *   the top of the page to the element's bottom will be used as offset.<br />
   *   **Note**: The element will be taken into account only as long as its `position` is set to
   *   `fixed`. This option is useful, when dealing with responsive navbars/headers that adjust
   *   their height and/or positioning according to the viewport's size.
   *
   * <br />
   * <div class="alert alert-warning">
   * In order for `yOffset` to work properly, scrolling should take place on the document's root and
   * not some child element.
   * </div>
   *
   * @example
     <example module="anchorScrollExample" name="anchor-scroll">
       <file name="index.html">
         <div id="scrollArea" ng-controller="ScrollController">
           <a ng-click="gotoBottom()">Go to bottom</a>
           <a id="bottom"></a> You're at the bottom!
         </div>
       </file>
       <file name="script.js">
         angular.module('anchorScrollExample', [])
           .controller('ScrollController', ['$scope', '$location', '$anchorScroll',
             function($scope, $location, $anchorScroll) {
               $scope.gotoBottom = function() {
                 // set the location.hash to the id of
                 // the element you wish to scroll to.
                 $location.hash('bottom');

                 // call $anchorScroll()
                 $anchorScroll();
               };
             }]);
       </file>
       <file name="style.css">
         #scrollArea {
           height: 280px;
           overflow: auto;
         }

         #bottom {
           display: block;
           margin-top: 2000px;
         }
       </file>
     </example>
   *
   * <hr />
   * The example below illustrates the use of a vertical scroll-offset (specified as a fixed value).
   * See {@link ng.$anchorScroll#yOffset $anchorScroll.yOffset} for more details.
   *
   * @example
     <example module="anchorScrollOffsetExample" name="anchor-scroll-offset">
       <file name="index.html">
         <div class="fixed-header" ng-controller="headerCtrl">
           <a href="" ng-click="gotoAnchor(x)" ng-repeat="x in [1,2,3,4,5]">
             Go to anchor {{x}}
           </a>
         </div>
         <div id="anchor{{x}}" class="anchor" ng-repeat="x in [1,2,3,4,5]">
           Anchor {{x}} of 5
         </div>
       </file>
       <file name="script.js">
         angular.module('anchorScrollOffsetExample', [])
           .run(['$anchorScroll', function($anchorScroll) {
             $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
           }])
           .controller('headerCtrl', ['$anchorScroll', '$location', '$scope',
             function($anchorScroll, $location, $scope) {
               $scope.gotoAnchor = function(x) {
                 var newHash = 'anchor' + x;
                 if ($location.hash() !== newHash) {
                   // set the $location.hash to `newHash` and
                   // $anchorScroll will automatically scroll to it
                   $location.hash('anchor' + x);
                 } else {
                   // call $anchorScroll() explicitly,
                   // since $location.hash hasn't changed
                   $anchorScroll();
                 }
               };
             }
           ]);
       </file>
       <file name="style.css">
         body {
           padding-top: 50px;
         }

         .anchor {
           border: 2px dashed DarkOrchid;
           padding: 10px 10px 200px 10px;
         }

         .fixed-header {
           background-color: rgba(0, 0, 0, 0.2);
           height: 50px;
           position: fixed;
           top: 0; left: 0; right: 0;
         }

         .fixed-header > a {
           display: inline-block;
           margin: 5px 15px;
         }
       </file>
     </example>
   */
  this.$get = ['$window', '$location', '$rootScope', function($window, $location, $rootScope) {
    var document = $window.document;

    // Helper function to get first anchor from a NodeList
    // (using `Array#some()` instead of `angular#forEach()` since it's more performant
    //  and working in all supported browsers.)
    function getFirstAnchor(list) {
      var result = null;
      Array.prototype.some.call(list, function(element) {
        if (nodeName_(element) === 'a') {
          result = element;
          return true;
        }
      });
      return result;
    }

    function getYOffset() {

      var offset = scroll.yOffset;

      if (isFunction(offset)) {
        offset = offset();
      } else if (isElement(offset)) {
        var elem = offset[0];
        var style = $window.getComputedStyle(elem);
        if (style.position !== 'fixed') {
          offset = 0;
        } else {
          offset = elem.getBoundingClientRect().bottom;
        }
      } else if (!isNumber(offset)) {
        offset = 0;
      }

      return offset;
    }

    function scrollTo(elem) {
      if (elem) {
        elem.scrollIntoView();

        var offset = getYOffset();

        if (offset) {
          // `offset` is the number of pixels we should scroll UP in order to align `elem` properly.
          // This is true ONLY if the call to `elem.scrollIntoView()` initially aligns `elem` at the
          // top of the viewport.
          //
          // IF the number of pixels from the top of `elem` to the end of the page's content is less
          // than the height of the viewport, then `elem.scrollIntoView()` will align the `elem` some
          // way down the page.
          //
          // This is often the case for elements near the bottom of the page.
          //
          // In such cases we do not need to scroll the whole `offset` up, just the difference between
          // the top of the element and the offset, which is enough to align the top of `elem` at the
          // desired position.
          var elemTop = elem.getBoundingClientRect().top;
          $window.scrollBy(0, elemTop - offset);
        }
      } else {
        $window.scrollTo(0, 0);
      }
    }

    function scroll(hash) {
      // Allow numeric hashes
      hash = isString(hash) ? hash : isNumber(hash) ? hash.toString() : $location.hash();
      var elm;

      // empty hash, scroll to the top of the page
      if (!hash) scrollTo(null);

      // element with given id
      else if ((elm = document.getElementById(hash))) scrollTo(elm);

      // first anchor with given name :-D
      else if ((elm = getFirstAnchor(document.getElementsByName(hash)))) scrollTo(elm);

      // no element and hash === 'top', scroll to the top of the page
      else if (hash === 'top') scrollTo(null);
    }

    // does not scroll when user clicks on anchor link that is currently on
    // (no url change, no $location.hash() change), browser native does scroll
    if (autoScrollingEnabled) {
      $rootScope.$watch(function autoScrollWatch() {return $location.hash();},
        function autoScrollWatchAction(newVal, oldVal) {
          // skip the initial scroll if $location.hash is empty
          if (newVal === oldVal && newVal === '') return;

          jqLiteDocumentLoaded(function() {
            $rootScope.$evalAsync(scroll);
          });
        });
    }

    return scroll;
  }];
}

var $animateMinErr = minErr('$animate');
var ELEMENT_NODE = 1;
var NG_ANIMATE_CLASSNAME = 'ng-animate';

function mergeClasses(a,b) {
  if (!a && !b) return '';
  if (!a) return b;
  if (!b) return a;
  if (isArray(a)) a = a.join(' ');
  if (isArray(b)) b = b.join(' ');
  return a + ' ' + b;
}

function extractElementNode(element) {
  for (var i = 0; i < element.length; i++) {
    var elm = element[i];
    if (elm.nodeType === ELEMENT_NODE) {
      return elm;
    }
  }
}

function splitClasses(classes) {
  if (isString(classes)) {
    classes = classes.split(' ');
  }

  // Use createMap() to prevent class assumptions involving property names in
  // Object.prototype
  var obj = createMap();
  forEach(classes, function(klass) {
    // sometimes the split leaves empty string values
    // incase extra spaces were applied to the options
    if (klass.length) {
      obj[klass] = true;
    }
  });
  return obj;
}

// if any other type of options value besides an Object value is
// passed into the $animate.method() animation then this helper code
// will be run which will ignore it. While this patch is not the
// greatest solution to this, a lot of existing plugins depend on
// $animate to either call the callback (< 1.2) or return a promise
// that can be changed. This helper function ensures that the options
// are wiped clean incase a callback function is provided.
function prepareAnimateOptions(options) {
  return isObject(options)
      ? options
      : {};
}

var $$CoreAnimateJsProvider = /** @this */ function() {
  this.$get = noop;
};

// this is prefixed with Core since it conflicts with
// the animateQueueProvider defined in ngAnimate/animateQueue.js
var $$CoreAnimateQueueProvider = /** @this */ function() {
  var postDigestQueue = new HashMap();
  var postDigestElements = [];

  this.$get = ['$$AnimateRunner', '$rootScope',
       function($$AnimateRunner,   $rootScope) {
    return {
      enabled: noop,
      on: noop,
      off: noop,
      pin: noop,

      push: function(element, event, options, domOperation) {
        if (domOperation) {
          domOperation();
        }

        options = options || {};
        if (options.from) {
          element.css(options.from);
        }
        if (options.to) {
          element.css(options.to);
        }

        if (options.addClass || options.removeClass) {
          addRemoveClassesPostDigest(element, options.addClass, options.removeClass);
        }

        var runner = new $$AnimateRunner();

        // since there are no animations to run the runner needs to be
        // notified that the animation call is complete.
        runner.complete();
        return runner;
      }
    };


    function updateData(data, classes, value) {
      var changed = false;
      if (classes) {
        classes = isString(classes) ? classes.split(' ') :
                  isArray(classes) ? classes : [];
        forEach(classes, function(className) {
          if (className) {
            changed = true;
            data[className] = value;
          }
        });
      }
      return changed;
    }

    function handleCSSClassChanges() {
      forEach(postDigestElements, function(element) {
        var data = postDigestQueue.get(element);
        if (data) {
          var existing = splitClasses(element.attr('class'));
          var toAdd = '';
          var toRemove = '';
          forEach(data, function(status, className) {
            var hasClass = !!existing[className];
            if (status !== hasClass) {
              if (status) {
                toAdd += (toAdd.length ? ' ' : '') + className;
              } else {
                toRemove += (toRemove.length ? ' ' : '') + className;
              }
            }
          });

          forEach(element, function(elm) {
            if (toAdd) {
              jqLiteAddClass(elm, toAdd);
            }
            if (toRemove) {
              jqLiteRemoveClass(elm, toRemove);
            }
          });
          postDigestQueue.remove(element);
        }
      });
      postDigestElements.length = 0;
    }


    function addRemoveClassesPostDigest(element, add, remove) {
      var data = postDigestQueue.get(element) || {};

      var classesAdded = updateData(data, add, true);
      var classesRemoved = updateData(data, remove, false);

      if (classesAdded || classesRemoved) {

        postDigestQueue.put(element, data);
        postDigestElements.push(element);

        if (postDigestElements.length === 1) {
          $rootScope.$$postDigest(handleCSSClassChanges);
        }
      }
    }
  }];
};

/**
 * @ngdoc provider
 * @name $animateProvider
 *
 * @description
 * Default implementation of $animate that doesn't perform any animations, instead just
 * synchronously performs DOM updates and resolves the returned runner promise.
 *
 * In order to enable animations the `ngAnimate` module has to be loaded.
 *
 * To see the functional implementation check out `src/ngAnimate/animate.js`.
 */
var $AnimateProvider = ['$provide', /** @this */ function($provide) {
  var provider = this;

  this.$$registeredAnimations = Object.create(null);

   /**
   * @ngdoc method
   * @name $animateProvider#register
   *
   * @description
   * Registers a new injectable animation factory function. The factory function produces the
   * animation object which contains callback functions for each event that is expected to be
   * animated.
   *
   *   * `eventFn`: `function(element, ... , doneFunction, options)`
   *   The element to animate, the `doneFunction` and the options fed into the animation. Depending
   *   on the type of animation additional arguments will be injected into the animation function. The
   *   list below explains the function signatures for the different animation methods:
   *
   *   - setClass: function(element, addedClasses, removedClasses, doneFunction, options)
   *   - addClass: function(element, addedClasses, doneFunction, options)
   *   - removeClass: function(element, removedClasses, doneFunction, options)
   *   - enter, leave, move: function(element, doneFunction, options)
   *   - animate: function(element, fromStyles, toStyles, doneFunction, options)
   *
   *   Make sure to trigger the `doneFunction` once the animation is fully complete.
   *
   * ```js
   *   return {
   *     //enter, leave, move signature
   *     eventFn : function(element, done, options) {
   *       //code to run the animation
   *       //once complete, then run done()
   *       return function endFunction(wasCancelled) {
   *         //code to cancel the animation
   *       }
   *     }
   *   }
   * ```
   *
   * @param {string} name The name of the animation (this is what the class-based CSS value will be compared to).
   * @param {Function} factory The factory function that will be executed to return the animation
   *                           object.
   */
  this.register = function(name, factory) {
    if (name && name.charAt(0) !== '.') {
      throw $animateMinErr('notcsel', 'Expecting class selector starting with \'.\' got \'{0}\'.', name);
    }

    var key = name + '-animation';
    provider.$$registeredAnimations[name.substr(1)] = key;
    $provide.factory(key, factory);
  };

  /**
   * @ngdoc method
   * @name $animateProvider#classNameFilter
   *
   * @description
   * Sets and/or returns the CSS class regular expression that is checked when performing
   * an animation. Upon bootstrap the classNameFilter value is not set at all and will
   * therefore enable $animate to attempt to perform an animation on any element that is triggered.
   * When setting the `classNameFilter` value, animations will only be performed on elements
   * that successfully match the filter expression. This in turn can boost performance
   * for low-powered devices as well as applications containing a lot of structural operations.
   * @param {RegExp=} expression The className expression which will be checked against all animations
   * @return {RegExp} The current CSS className expression value. If null then there is no expression value
   */
  this.classNameFilter = function(expression) {
    if (arguments.length === 1) {
      this.$$classNameFilter = (expression instanceof RegExp) ? expression : null;
      if (this.$$classNameFilter) {
        var reservedRegex = new RegExp('(\\s+|\\/)' + NG_ANIMATE_CLASSNAME + '(\\s+|\\/)');
        if (reservedRegex.test(this.$$classNameFilter.toString())) {
          throw $animateMinErr('nongcls','$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', NG_ANIMATE_CLASSNAME);
        }
      }
    }
    return this.$$classNameFilter;
  };

  this.$get = ['$$animateQueue', function($$animateQueue) {
    function domInsert(element, parentElement, afterElement) {
      // if for some reason the previous element was removed
      // from the dom sometime before this code runs then let's
      // just stick to using the parent element as the anchor
      if (afterElement) {
        var afterNode = extractElementNode(afterElement);
        if (afterNode && !afterNode.parentNode && !afterNode.previousElementSibling) {
          afterElement = null;
        }
      }
      if (afterElement) {
        afterElement.after(element);
      } else {
        parentElement.prepend(element);
      }
    }

    /**
     * @ngdoc service
     * @name $animate
     * @description The $animate service exposes a series of DOM utility methods that provide support
     * for animation hooks. The default behavior is the application of DOM operations, however,
     * when an animation is detected (and animations are enabled), $animate will do the heavy lifting
     * to ensure that animation runs with the triggered DOM operation.
     *
     * By default $animate doesn't trigger any animations. This is because the `ngAnimate` module isn't
     * included and only when it is active then the animation hooks that `$animate` triggers will be
     * functional. Once active then all structural `ng-` directives will trigger animations as they perform
     * their DOM-related operations (enter, leave and move). Other directives such as `ngClass`,
     * `ngShow`, `ngHide` and `ngMessages` also provide support for animations.
     *
     * It is recommended that the`$animate` service is always used when executing DOM-related procedures within directives.
     *
     * To learn more about enabling animation support, click here to visit the
     * {@link ngAnimate ngAnimate module page}.
     */
    return {
      // we don't call it directly since non-existant arguments may
      // be interpreted as null within the sub enabled function

      /**
       *
       * @ngdoc method
       * @name $animate#on
       * @kind function
       * @description Sets up an event listener to fire whenever the animation event (enter, leave, move, etc...)
       *    has fired on the given element or among any of its children. Once the listener is fired, the provided callback
       *    is fired with the following params:
       *
       * ```js
       * $animate.on('enter', container,
       *    function callback(element, phase) {
       *      // cool we detected an enter animation within the container
       *    }
       * );
       * ```
       *
       * @param {string} event the animation event that will be captured (e.g. enter, leave, move, addClass, removeClass, etc...)
       * @param {DOMElement} container the container element that will capture each of the animation events that are fired on itself
       *     as well as among its children
       * @param {Function} callback the callback function that will be fired when the listener is triggered
       *
       * The arguments present in the callback function are:
       * * `element` - The captured DOM element that the animation was fired on.
       * * `phase` - The phase of the animation. The two possible phases are **start** (when the animation starts) and **close** (when it ends).
       */
      on: $$animateQueue.on,

      /**
       *
       * @ngdoc method
       * @name $animate#off
       * @kind function
       * @description Deregisters an event listener based on the event which has been associated with the provided element. This method
       * can be used in three different ways depending on the arguments:
       *
       * ```js
       * // remove all the animation event listeners listening for `enter`
       * $animate.off('enter');
       *
       * // remove listeners for all animation events from the container element
       * $animate.off(container);
       *
       * // remove all the animation event listeners listening for `enter` on the given element and its children
       * $animate.off('enter', container);
       *
       * // remove the event listener function provided by `callback` that is set
       * // to listen for `enter` on the given `container` as well as its children
       * $animate.off('enter', container, callback);
       * ```
       *
       * @param {string|DOMElement} event|container the animation event (e.g. enter, leave, move,
       * addClass, removeClass, etc...), or the container element. If it is the element, all other
       * arguments are ignored.
       * @param {DOMElement=} container the container element the event listener was placed on
       * @param {Function=} callback the callback function that was registered as the listener
       */
      off: $$animateQueue.off,

      /**
       * @ngdoc method
       * @name $animate#pin
       * @kind function
       * @description Associates the provided element with a host parent element to allow the element to be animated even if it exists
       *    outside of the DOM structure of the Angular application. By doing so, any animation triggered via `$animate` can be issued on the
       *    element despite being outside the realm of the application or within another application. Say for example if the application
       *    was bootstrapped on an element that is somewhere inside of the `<body>` tag, but we wanted to allow for an element to be situated
       *    as a direct child of `document.body`, then this can be achieved by pinning the element via `$animate.pin(element)`. Keep in mind
       *    that calling `$animate.pin(element, parentElement)` will not actually insert into the DOM anywhere; it will just create the association.
       *
       *    Note that this feature is only active when the `ngAnimate` module is used.
       *
       * @param {DOMElement} element the external element that will be pinned
       * @param {DOMElement} parentElement the host parent element that will be associated with the external element
       */
      pin: $$animateQueue.pin,

      /**
       *
       * @ngdoc method
       * @name $animate#enabled
       * @kind function
       * @description Used to get and set whether animations are enabled or not on the entire application or on an element and its children. This
       * function can be called in four ways:
       *
       * ```js
       * // returns true or false
       * $animate.enabled();
       *
       * // changes the enabled state for all animations
       * $animate.enabled(false);
       * $animate.enabled(true);
       *
       * // returns true or false if animations are enabled for an element
       * $animate.enabled(element);
       *
       * // changes the enabled state for an element and its children
       * $animate.enabled(element, true);
       * $animate.enabled(element, false);
       * ```
       *
       * @param {DOMElement=} element the element that will be considered for checking/setting the enabled state
       * @param {boolean=} enabled whether or not the animations will be enabled for the element
       *
       * @return {boolean} whether or not animations are enabled
       */
      enabled: $$animateQueue.enabled,

      /**
       * @ngdoc method
       * @name $animate#cancel
       * @kind function
       * @description Cancels the provided animation.
       *
       * @param {Promise} animationPromise The animation promise that is returned when an animation is started.
       */
      cancel: function(runner) {
        if (runner.end) {
          runner.end();
        }
      },

      /**
       *
       * @ngdoc method
       * @name $animate#enter
       * @kind function
       * @description Inserts the element into the DOM either after the `after` element (if provided) or
       *   as the first child within the `parent` element and then triggers an animation.
       *   A promise is returned that will be resolved during the next digest once the animation
       *   has completed.
       *
       * @param {DOMElement} element the element which will be inserted into the DOM
       * @param {DOMElement} parent the parent element which will append the element as
       *   a child (so long as the after element is not present)
       * @param {DOMElement=} after the sibling element after which the element will be appended
       * @param {object=} options an optional collection of options/styles that will be applied to the element.
       *   The object can have the following properties:
       *
       *   - **addClass** - `{string}` - space-separated CSS classes to add to element
       *   - **from** - `{Object}` - CSS properties & values at the beginning of animation. Must have matching `to`
       *   - **removeClass** - `{string}` - space-separated CSS classes to remove from element
       *   - **to** - `{Object}` - CSS properties & values at end of animation. Must have matching `from`
       *
       * @return {Promise} the animation callback promise
       */
      enter: function(element, parent, after, options) {
        parent = parent && jqLite(parent);
        after = after && jqLite(after);
        parent = parent || after.parent();
        domInsert(element, parent, after);
        return $$animateQueue.push(element, 'enter', prepareAnimateOptions(options));
      },

      /**
       *
       * @ngdoc method
       * @name $animate#move
       * @kind function
       * @description Inserts (moves) the element into its new position in the DOM either after
       *   the `after` element (if provided) or as the first child within the `parent` element
       *   and then triggers an animation. A promise is returned that will be resolved
       *   during the next digest once the animation has completed.
       *
       * @param {DOMElement} element the element which will be moved into the new DOM position
       * @param {DOMElement} parent the parent element which will append the element as
       *   a child (so long as the after element is not present)
       * @param {DOMElement=} after the sibling element after which the element will be appended
       * @param {object=} options an optional collection of options/styles that will be applied to the element.
       *   The object can have the following properties:
       *
       *   - **addClass** - `{string}` - space-separated CSS classes to add to element
       *   - **from** - `{Object}` - CSS properties & values at the beginning of animation. Must have matching `to`
       *   - **removeClass** - `{string}` - space-separated CSS classes to remove from element
       *   - **to** - `{Object}` - CSS properties & values at end of animation. Must have matching `from`
       *
       * @return {Promise} the animation callback promise
       */
      move: function(element, parent, after, options) {
        parent = parent && jqLite(parent);
        after = after && jqLite(after);
        parent = parent || after.parent();
        domInsert(element, parent, after);
        return $$animateQueue.push(element, 'move', prepareAnimateOptions(options));
      },

      /**
       * @ngdoc method
       * @name $animate#leave
       * @kind function
       * @description Triggers an animation and then removes the element from the DOM.
       * When the function is called a promise is returned that will be resolved during the next
       * digest once the animation has completed.
       *
       * @param {DOMElement} element the element which will be removed from the DOM
       * @param {object=} options an optional collection of options/styles that will be applied to the element.
       *   The object can have the following properties:
       *
       *   - **addClass** - `{string}` - space-separated CSS classes to add to element
       *   - **from** - `{Object}` - CSS properties & values at the beginning of animation. Must have matching `to`
       *   - **removeClass** - `{string}` - space-separated CSS classes to remove from element
       *   - **to** - `{Object}` - CSS properties & values at end of animation. Must have matching `from`
       *
       * @return {Promise} the animation callback promise
       */
      leave: function(element, options) {
        return $$animateQueue.push(element, 'leave', prepareAnimateOptions(options), function() {
          element.remove();
        });
      },

      /**
       * @ngdoc method
       * @name $animate#addClass
       * @kind function
       *
       * @description Triggers an addClass animation surrounding the addition of the provided CSS class(es). Upon
       *   execution, the addClass operation will only be handled after the next digest and it will not trigger an
       *   animation if element already contains the CSS class or if the class is removed at a later step.
       *   Note that class-based animations are treated differently compared to structural animations
       *   (like enter, move and leave) since the CSS classes may be added/removed at different points
       *   depending if CSS or JavaScript animations are used.
       *
       * @param {DOMElement} element the element which the CSS classes will be applied to
       * @param {string} className the CSS class(es) that will be added (multiple classes are separated via spaces)
       * @param {object=} options an optional collection of options/styles that will be applied to the element.
       *   The object can have the following properties:
       *
       *   - **addClass** - `{string}` - space-separated CSS classes to add to element
       *   - **from** - `{Object}` - CSS properties & values at the beginning of animation. Must have matching `to`
       *   - **removeClass** - `{string}` - space-separated CSS classes to remove from element
       *   - **to** - `{Object}` - CSS properties & values at end of animation. Must have matching `from`
       *
       * @return {Promise} the animation callback promise
       */
      addClass: function(element, className, options) {
        options = prepareAnimateOptions(options);
        options.addClass = mergeClasses(options.addclass, className);
        return $$animateQueue.push(element, 'addClass', options);
      },

      /**
       * @ngdoc method
       * @name $animate#removeClass
       * @kind function
       *
       * @description Triggers a removeClass animation surrounding the removal of the provided CSS class(es). Upon
       *   execution, the removeClass operation will only be handled after the next digest and it will not trigger an
       *   animation if element does not contain the CSS class or if the class is added at a later step.
       *   Note that class-based animations are treated differently compared to structural animations
       *   (like enter, move and leave) since the CSS classes may be added/removed at different points
       *   depending if CSS or JavaScript animations are used.
       *
       * @param {DOMElement} element the element which the CSS classes will be applied to
       * @param {string} className the CSS class(es) that will be removed (multiple classes are separated via spaces)
       * @param {object=} options an optional collection of options/styles that will be applied to the element.
       *   The object can have the following properties:
       *
       *   - **addClass** - `{string}` - space-separated CSS classes to add to element
       *   - **from** - `{Object}` - CSS properties & values at the beginning of animation. Must have matching `to`
       *   - **removeClass** - `{string}` - space-separated CSS classes to remove from element
       *   - **to** - `{Object}` - CSS properties & values at end of animation. Must have matching `from`
       *
       * @return {Promise} the animation callback promise
       */
      removeClass: function(element, className, options) {
        options = prepareAnimateOptions(options);
        options.removeClass = mergeClasses(options.removeClass, className);
        return $$animateQueue.push(element, 'removeClass', options);
      },

      /**
       * @ngdoc method
       * @name $animate#setClass
       * @kind function
       *
       * @description Performs both the addition and removal of a CSS classes on an element and (during the process)
       *    triggers an animation surrounding the class addition/removal. Much like `$animate.addClass` and
       *    `$animate.removeClass`, `setClass` will only evaluate the classes being added/removed once a digest has
       *    passed. Note that class-based animations are treated differently compared to structural animations
       *    (like enter, move and leave) since the CSS classes may be added/removed at different points
       *    depending if CSS or JavaScript animations are used.
       *
       * @param {DOMElement} element the element which the CSS classes will be applied to
       * @param {string} add the CSS class(es) that will be added (multiple classes are separated via spaces)
       * @param {string} remove the CSS class(es) that will be removed (multiple classes are separated via spaces)
       * @param {object=} options an optional collection of options/styles that will be applied to the element.
       *   The object can have the following properties:
       *
       *   - **addClass** - `{string}` - space-separated CSS classes to add to element
       *   - **from** - `{Object}` - CSS properties & values at the beginning of animation. Must have matching `to`
       *   - **removeClass** - `{string}` - space-separated CSS classes to remove from element
       *   - **to** - `{Object}` - CSS properties & values at end of animation. Must have matching `from`
       *
       * @return {Promise} the animation callback promise
       */
      setClass: function(element, add, remove, options) {
        options = prepareAnimateOptions(options);
        options.addClass = mergeClasses(options.addClass, add);
        options.removeClass = mergeClasses(options.removeClass, remove);
        return $$animateQueue.push(element, 'setClass', options);
      },

      /**
       * @ngdoc method
       * @name $animate#animate
       * @kind function
       *
       * @description Performs an inline animation on the element which applies the provided to and from CSS styles to the element.
       * If any detected CSS transition, keyframe or JavaScript matches the provided className value, then the animation will take
       * on the provided styles. For example, if a transition animation is set for the given className, then the provided `from` and
       * `to` styles will be applied alongside the given transition. If the CSS style provided in `from` does not have a corresponding
       * style in `to`, the style in `from` is applied immediately, and no animation is run.
       * If a JavaScript animation is detected then the provided styles will be given in as function parameters into the `animate`
       * method (or as part of the `options` parameter):
       *
       * ```js
       * ngModule.animation('.my-inline-animation', function() {
       *   return {
       *     animate : function(element, from, to, done, options) {
       *       //animation
       *       done();
       *     }
       *   }
       * });
       * ```
       *
       * @param {DOMElement} element the element which the CSS styles will be applied to
       * @param {object} from the from (starting) CSS styles that will be applied to the element and across the animation.
       * @param {object} to the to (destination) CSS styles that will be applied to the element and across the animation.
       * @param {string=} className an optional CSS class that will be applied to the element for the duration of the animation. If
       *    this value is left as empty then a CSS class of `ng-inline-animate` will be applied to the element.
       *    (Note that if no animation is detected then this value will not be applied to the element.)
       * @param {object=} options an optional collection of options/styles that will be applied to the element.
       *   The object can have the following properties:
       *
       *   - **addClass** - `{string}` - space-separated CSS classes to add to element
       *   - **from** - `{Object}` - CSS properties & values at the beginning of animation. Must have matching `to`
       *   - **removeClass** - `{string}` - space-separated CSS classes to remove from element
       *   - **to** - `{Object}` - CSS properties & values at end of animation. Must have matching `from`
       *
       * @return {Promise} the animation callback promise
       */
      animate: function(element, from, to, className, options) {
        options = prepareAnimateOptions(options);
        options.from = options.from ? extend(options.from, from) : from;
        options.to   = options.to   ? extend(options.to, to)     : to;

        className = className || 'ng-inline-animate';
        options.tempClasses = mergeClasses(options.tempClasses, className);
        return $$animateQueue.push(element, 'animate', options);
      }
    };
  }];
}];

var $$AnimateAsyncRunFactoryProvider = /** @this */ function() {
  this.$get = ['$$rAF', function($$rAF) {
    var waitQueue = [];

    function waitForTick(fn) {
      waitQueue.push(fn);
      if (waitQueue.length > 1) return;
      $$rAF(function() {
        for (var i = 0; i < waitQueue.length; i++) {
          waitQueue[i]();
        }
        waitQueue = [];
      });
    }

    return function() {
      var passed = false;
      waitForTick(function() {
        passed = true;
      });
      return function(callback) {
        if (passed) {
          callback();
        } else {
          waitForTick(callback);
        }
      };
    };
  }];
};

var $$AnimateRunnerFactoryProvider = /** @this */ function() {
  this.$get = ['$q', '$sniffer', '$$animateAsyncRun', '$$isDocumentHidden', '$timeout',
       function($q,   $sniffer,   $$animateAsyncRun,   $$isDocumentHidden,   $timeout) {

    var INITIAL_STATE = 0;
    var DONE_PENDING_STATE = 1;
    var DONE_COMPLETE_STATE = 2;

    AnimateRunner.chain = function(chain, callback) {
      var index = 0;

      next();
      function next() {
        if (index === chain.length) {
          callback(true);
          return;
        }

        chain[index](function(response) {
          if (response === false) {
            callback(false);
            return;
          }
          index++;
          next();
        });
      }
    };

    AnimateRunner.all = function(runners, callback) {
      var count = 0;
      var status = true;
      forEach(runners, function(runner) {
        runner.done(onProgress);
      });

      function onProgress(response) {
        status = status && response;
        if (++count === runners.length) {
          callback(status);
        }
      }
    };

    function AnimateRunner(host) {
      this.setHost(host);

      var rafTick = $$animateAsyncRun();
      var timeoutTick = function(fn) {
        $timeout(fn, 0, false);
      };

      this._doneCallbacks = [];
      this._tick = function(fn) {
        if ($$isDocumentHidden()) {
          timeoutTick(fn);
        } else {
          rafTick(fn);
        }
      };
      this._state = 0;
    }

    AnimateRunner.prototype = {
      setHost: function(host) {
        this.host = host || {};
      },

      done: function(fn) {
        if (this._state === DONE_COMPLETE_STATE) {
          fn();
        } else {
          this._doneCallbacks.push(fn);
        }
      },

      progress: noop,

      getPromise: function() {
        if (!this.promise) {
          var self = this;
          this.promise = $q(function(resolve, reject) {
            self.done(function(status) {
              if (status === false) {
                reject();
              } else {
                resolve();
              }
            });
          });
        }
        return this.promise;
      },

      then: function(resolveHandler, rejectHandler) {
        return this.getPromise().then(resolveHandler, rejectHandler);
      },

      'catch': function(handler) {
        return this.getPromise()['catch'](handler);
      },

      'finally': function(handler) {
        return this.getPromise()['finally'](handler);
      },

      pause: function() {
        if (this.host.pause) {
          this.host.pause();
        }
      },

      resume: function() {
        if (this.host.resume) {
          this.host.resume();
        }
      },

      end: function() {
        if (this.host.end) {
          this.host.end();
        }
        this._resolve(true);
      },

      cancel: function() {
        if (this.host.cancel) {
          this.host.cancel();
        }
        this._resolve(false);
      },

      complete: function(response) {
        var self = this;
        if (self._state === INITIAL_STATE) {
          self._state = DONE_PENDING_STATE;
          self._tick(function() {
            self._resolve(response);
          });
        }
      },

      _resolve: function(response) {
        if (this._state !== DONE_COMPLETE_STATE) {
          forEach(this._doneCallbacks, function(fn) {
            fn(response);
          });
          this._doneCallbacks.length = 0;
          this._state = DONE_COMPLETE_STATE;
        }
      }
    };

    return AnimateRunner;
  }];
};

/* exported $CoreAnimateCssProvider */

/**
 * @ngdoc service
 * @name $animateCss
 * @kind object
 * @this
 *
 * @description
 * This is the core version of `$animateCss`. By default, only when the `ngAnimate` is included,
 * then the `$animateCss` service will actually perform animations.
 *
 * Click here {@link ngAnimate.$animateCss to read the documentation for $animateCss}.
 */
var $CoreAnimateCssProvider = function() {
  this.$get = ['$$rAF', '$q', '$$AnimateRunner', function($$rAF, $q, $$AnimateRunner) {

    return function(element, initialOptions) {
      // all of the animation functions should create
      // a copy of the options data, however, if a
      // parent service has already created a copy then
      // we should stick to using that
      var options = initialOptions || {};
      if (!options.$$prepared) {
        options = copy(options);
      }

      // there is no point in applying the styles since
      // there is no animation that goes on at all in
      // this version of $animateCss.
      if (options.cleanupStyles) {
        options.from = options.to = null;
      }

      if (options.from) {
        element.css(options.from);
        options.from = null;
      }

      var closed, runner = new $$AnimateRunner();
      return {
        start: run,
        end: run
      };

      function run() {
        $$rAF(function() {
          applyAnimationContents();
          if (!closed) {
            runner.complete();
          }
          closed = true;
        });
        return runner;
      }

      function applyAnimationContents() {
        if (options.addClass) {
          element.addClass(options.addClass);
          options.addClass = null;
        }
        if (options.removeClass) {
          element.removeClass(options.removeClass);
          options.removeClass = null;
        }
        if (options.to) {
          element.css(options.to);
          options.to = null;
        }
      }
    };
  }];
};

/* global stripHash: true */

/**
 * ! This is a private undocumented service !
 *
 * @name $browser
 * @requires $log
 * @description
 * This object has two goals:
 *
 * - hide all the global state in the browser caused by the window object
 * - abstract away all the browser specific features and inconsistencies
 *
 * For tests we provide {@link ngMock.$browser mock implementation} of the `$browser`
 * service, which can be used for convenient testing of the application without the interaction with
 * the real browser apis.
 */
/**
 * @param {object} window The global window object.
 * @param {object} document jQuery wrapped document.
 * @param {object} $log window.console or an object with the same interface.
 * @param {object} $sniffer $sniffer service
 */
function Browser(window, document, $log, $sniffer) {
  var self = this,
      location = window.location,
      history = window.history,
      setTimeout = window.setTimeout,
      clearTimeout = window.clearTimeout,
      pendingDeferIds = {};

  self.isMock = false;

  var outstandingRequestCount = 0;
  var outstandingRequestCallbacks = [];

  // TODO(vojta): remove this temporary api
  self.$$completeOutstandingRequest = completeOutstandingRequest;
  self.$$incOutstandingRequestCount = function() { outstandingRequestCount++; };

  /**
   * Executes the `fn` function(supports currying) and decrements the `outstandingRequestCallbacks`
   * counter. If the counter reaches 0, all the `outstandingRequestCallbacks` are executed.
   */
  function completeOutstandingRequest(fn) {
    try {
      fn.apply(null, sliceArgs(arguments, 1));
    } finally {
      outstandingRequestCount--;
      if (outstandingRequestCount === 0) {
        while (outstandingRequestCallbacks.length) {
          try {
            outstandingRequestCallbacks.pop()();
          } catch (e) {
            $log.error(e);
          }
        }
      }
    }
  }

  function getHash(url) {
    var index = url.indexOf('#');
    return index === -1 ? '' : url.substr(index);
  }

  /**
   * @private
   * Note: this method is used only by scenario runner
   * TODO(vojta): prefix this method with $$ ?
   * @param {function()} callback Function that will be called when no outstanding request
   */
  self.notifyWhenNoOutstandingRequests = function(callback) {
    if (outstandingRequestCount === 0) {
      callback();
    } else {
      outstandingRequestCallbacks.push(callback);
    }
  };

  //////////////////////////////////////////////////////////////
  // URL API
  //////////////////////////////////////////////////////////////

  var cachedState, lastHistoryState,
      lastBrowserUrl = location.href,
      baseElement = document.find('base'),
      pendingLocation = null,
      getCurrentState = !$sniffer.history ? noop : function getCurrentState() {
        try {
          return history.state;
        } catch (e) {
          // MSIE can reportedly throw when there is no state (UNCONFIRMED).
        }
      };

  cacheState();
  lastHistoryState = cachedState;

  /**
   * @name $browser#url
   *
   * @description
   * GETTER:
   * Without any argument, this method just returns current value of location.href.
   *
   * SETTER:
   * With at least one argument, this method sets url to new value.
   * If html5 history api supported, pushState/replaceState is used, otherwise
   * location.href/location.replace is used.
   * Returns its own instance to allow chaining
   *
   * NOTE: this api is intended for use only by the $location service. Please use the
   * {@link ng.$location $location service} to change url.
   *
   * @param {string} url New url (when used as setter)
   * @param {boolean=} replace Should new url replace current history record?
   * @param {object=} state object to use with pushState/replaceState
   */
  self.url = function(url, replace, state) {
    // In modern browsers `history.state` is `null` by default; treating it separately
    // from `undefined` would cause `$browser.url('/foo')` to change `history.state`
    // to undefined via `pushState`. Instead, let's change `undefined` to `null` here.
    if (isUndefined(state)) {
      state = null;
    }

    // Android Browser BFCache causes location, history reference to become stale.
    if (location !== window.location) location = window.location;
    if (history !== window.history) history = window.history;

    // setter
    if (url) {
      var sameState = lastHistoryState === state;

      // Don't change anything if previous and current URLs and states match. This also prevents
      // IE<10 from getting into redirect loop when in LocationHashbangInHtml5Url mode.
      // See https://github.com/angular/angular.js/commit/ffb2701
      if (lastBrowserUrl === url && (!$sniffer.history || sameState)) {
        return self;
      }
      var sameBase = lastBrowserUrl && stripHash(lastBrowserUrl) === stripHash(url);
      lastBrowserUrl = url;
      lastHistoryState = state;
      // Don't use history API if only the hash changed
      // due to a bug in IE10/IE11 which leads
      // to not firing a `hashchange` nor `popstate` event
      // in some cases (see #9143).
      if ($sniffer.history && (!sameBase || !sameState)) {
        history[replace ? 'replaceState' : 'pushState'](state, '', url);
        cacheState();
        // Do the assignment again so that those two variables are referentially identical.
        lastHistoryState = cachedState;
      } else {
        if (!sameBase) {
          pendingLocation = url;
        }
        if (replace) {
          location.replace(url);
        } else if (!sameBase) {
          location.href = url;
        } else {
          location.hash = getHash(url);
        }
        if (location.href !== url) {
          pendingLocation = url;
        }
      }
      if (pendingLocation) {
        pendingLocation = url;
      }
      return self;
    // getter
    } else {
      // - pendingLocation is needed as browsers don't allow to read out
      //   the new location.href if a reload happened or if there is a bug like in iOS 9 (see
      //   https://openradar.appspot.com/22186109).
      // - the replacement is a workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=407172
      return pendingLocation || location.href.replace(/%27/g,'\'');
    }
  };

  /**
   * @name $browser#state
   *
   * @description
   * This method is a getter.
   *
   * Return history.state or null if history.state is undefined.
   *
   * @returns {object} state
   */
  self.state = function() {
    return cachedState;
  };

  var urlChangeListeners = [],
      urlChangeInit = false;

  function cacheStateAndFireUrlChange() {
    pendingLocation = null;
    cacheState();
    fireUrlChange();
  }

  // This variable should be used *only* inside the cacheState function.
  var lastCachedState = null;
  function cacheState() {
    // This should be the only place in $browser where `history.state` is read.
    cachedState = getCurrentState();
    cachedState = isUndefined(cachedState) ? null : cachedState;

    // Prevent callbacks fo fire twice if both hashchange & popstate were fired.
    if (equals(cachedState, lastCachedState)) {
      cachedState = lastCachedState;
    }
    lastCachedState = cachedState;
  }

  function fireUrlChange() {
    if (lastBrowserUrl === self.url() && lastHistoryState === cachedState) {
      return;
    }

    lastBrowserUrl = self.url();
    lastHistoryState = cachedState;
    forEach(urlChangeListeners, function(listener) {
      listener(self.url(), cachedState);
    });
  }

  /**
   * @name $browser#onUrlChange
   *
   * @description
   * Register callback function that will be called, when url changes.
   *
   * It's only called when the url is changed from outside of angular:
   * - user types different url into address bar
   * - user clicks on history (forward/back) button
   * - user clicks on a link
   *
   * It's not called when url is changed by $browser.url() method
   *
   * The listener gets called with new url as parameter.
   *
   * NOTE: this api is intended for use only by the $location service. Please use the
   * {@link ng.$location $location service} to monitor url changes in angular apps.
   *
   * @param {function(string)} listener Listener function to be called when url changes.
   * @return {function(string)} Returns the registered listener fn - handy if the fn is anonymous.
   */
  self.onUrlChange = function(callback) {
    // TODO(vojta): refactor to use node's syntax for events
    if (!urlChangeInit) {
      // We listen on both (hashchange/popstate) when available, as some browsers (e.g. Opera)
      // don't fire popstate when user change the address bar and don't fire hashchange when url
      // changed by push/replaceState

      // html5 history api - popstate event
      if ($sniffer.history) jqLite(window).on('popstate', cacheStateAndFireUrlChange);
      // hashchange event
      jqLite(window).on('hashchange', cacheStateAndFireUrlChange);

      urlChangeInit = true;
    }

    urlChangeListeners.push(callback);
    return callback;
  };

  /**
   * @private
   * Remove popstate and hashchange handler from window.
   *
   * NOTE: this api is intended for use only by $rootScope.
   */
  self.$$applicationDestroyed = function() {
    jqLite(window).off('hashchange popstate', cacheStateAndFireUrlChange);
  };

  /**
   * Checks whether the url has changed outside of Angular.
   * Needs to be exported to be able to check for changes that have been done in sync,
   * as hashchange/popstate events fire in async.
   */
  self.$$checkUrlChange = fireUrlChange;

  //////////////////////////////////////////////////////////////
  // Misc API
  //////////////////////////////////////////////////////////////

  /**
   * @name $browser#baseHref
   *
   * @description
   * Returns current <base href>
   * (always relative - without domain)
   *
   * @returns {string} The current base href
   */
  self.baseHref = function() {
    var href = baseElement.attr('href');
    return href ? href.replace(/^(https?:)?\/\/[^/]*/, '') : '';
  };

  /**
   * @name $browser#defer
   * @param {function()} fn A function, who's execution should be deferred.
   * @param {number=} [delay=0] of milliseconds to defer the function execution.
   * @returns {*} DeferId that can be used to cancel the task via `$browser.defer.cancel()`.
   *
   * @description
   * Executes a fn asynchronously via `setTimeout(fn, delay)`.
   *
   * Unlike when calling `setTimeout` directly, in test this function is mocked and instead of using
   * `setTimeout` in tests, the fns are queued in an array, which can be programmatically flushed
   * via `$browser.defer.flush()`.
   *
   */
  self.defer = function(fn, delay) {
    var timeoutId;
    outstandingRequestCount++;
    timeoutId = setTimeout(function() {
      delete pendingDeferIds[timeoutId];
      completeOutstandingRequest(fn);
    }, delay || 0);
    pendingDeferIds[timeoutId] = true;
    return timeoutId;
  };


  /**
   * @name $browser#defer.cancel
   *
   * @description
   * Cancels a deferred task identified with `deferId`.
   *
   * @param {*} deferId Token returned by the `$browser.defer` function.
   * @returns {boolean} Returns `true` if the task hasn't executed yet and was successfully
   *                    canceled.
   */
  self.defer.cancel = function(deferId) {
    if (pendingDeferIds[deferId]) {
      delete pendingDeferIds[deferId];
      clearTimeout(deferId);
      completeOutstandingRequest(noop);
      return true;
    }
    return false;
  };

}

/** @this */
function $BrowserProvider() {
  this.$get = ['$window', '$log', '$sniffer', '$document',
      function($window, $log, $sniffer, $document) {
        return new Browser($window, $document, $log, $sniffer);
      }];
}

/**
 * @ngdoc service
 * @name $cacheFactory
 * @this
 *
 * @description
 * Factory that constructs {@link $cacheFactory.Cache Cache} objects and gives access to
 * them.
 *
 * ```js
 *
 *  var cache = $cacheFactory('cacheId');
 *  expect($cacheFactory.get('cacheId')).toBe(cache);
 *  expect($cacheFactory.get('noSuchCacheId')).not.toBeDefined();
 *
 *  cache.put("key", "value");
 *  cache.put("another key", "another value");
 *
 *  // We've specified no options on creation
 *  expect(cache.info()).toEqual({id: 'cacheId', size: 2});
 *
 * ```
 *
 *
 * @param {string} cacheId Name or id of the newly created cache.
 * @param {object=} options Options object that specifies the cache behavior. Properties:
 *
 *   - `{number=}` `capacity` — turns the cache into LRU cache.
 *
 * @returns {object} Newly created cache object with the following set of methods:
 *
 * - `{object}` `info()` — Returns id, size, and options of cache.
 * - `{{*}}` `put({string} key, {*} value)` — Puts a new key-value pair into the cache and returns
 *   it.
 * - `{{*}}` `get({string} key)` — Returns cached value for `key` or undefined for cache miss.
 * - `{void}` `remove({string} key)` — Removes a key-value pair from the cache.
 * - `{void}` `removeAll()` — Removes all cached values.
 * - `{void}` `destroy()` — Removes references to this cache from $cacheFactory.
 *
 * @example
   <example module="cacheExampleApp" name="cache-factory">
     <file name="index.html">
       <div ng-controller="CacheController">
         <input ng-model="newCacheKey" placeholder="Key">
         <input ng-model="newCacheValue" placeholder="Value">
         <button ng-click="put(newCacheKey, newCacheValue)">Cache</button>

         <p ng-if="keys.length">Cached Values</p>
         <div ng-repeat="key in keys">
           <span ng-bind="key"></span>
           <span>: </span>
           <b ng-bind="cache.get(key)"></b>
         </div>

         <p>Cache Info</p>
         <div ng-repeat="(key, value) in cache.info()">
           <span ng-bind="key"></span>
           <span>: </span>
           <b ng-bind="value"></b>
         </div>
       </div>
     </file>
     <file name="script.js">
       angular.module('cacheExampleApp', []).
         controller('CacheController', ['$scope', '$cacheFactory', function($scope, $cacheFactory) {
           $scope.keys = [];
           $scope.cache = $cacheFactory('cacheId');
           $scope.put = function(key, value) {
             if (angular.isUndefined($scope.cache.get(key))) {
               $scope.keys.push(key);
             }
             $scope.cache.put(key, angular.isUndefined(value) ? null : value);
           };
         }]);
     </file>
     <file name="style.css">
       p {
         margin: 10px 0 3px;
       }
     </file>
   </example>
 */
function $CacheFactoryProvider() {

  this.$get = function() {
    var caches = {};

    function cacheFactory(cacheId, options) {
      if (cacheId in caches) {
        throw minErr('$cacheFactory')('iid', 'CacheId \'{0}\' is already taken!', cacheId);
      }

      var size = 0,
          stats = extend({}, options, {id: cacheId}),
          data = createMap(),
          capacity = (options && options.capacity) || Number.MAX_VALUE,
          lruHash = createMap(),
          freshEnd = null,
          staleEnd = null;

      /**
       * @ngdoc type
       * @name $cacheFactory.Cache
       *
       * @description
       * A cache object used to store and retrieve data, primarily used by
       * {@link $http $http} and the {@link ng.directive:script script} directive to cache
       * templates and other data.
       *
       * ```js
       *  angular.module('superCache')
       *    .factory('superCache', ['$cacheFactory', function($cacheFactory) {
       *      return $cacheFactory('super-cache');
       *    }]);
       * ```
       *
       * Example test:
       *
       * ```js
       *  it('should behave like a cache', inject(function(superCache) {
       *    superCache.put('key', 'value');
       *    superCache.put('another key', 'another value');
       *
       *    expect(superCache.info()).toEqual({
       *      id: 'super-cache',
       *      size: 2
       *    });
       *
       *    superCache.remove('another key');
       *    expect(superCache.get('another key')).toBeUndefined();
       *
       *    superCache.removeAll();
       *    expect(superCache.info()).toEqual({
       *      id: 'super-cache',
       *      size: 0
       *    });
       *  }));
       * ```
       */
      return (caches[cacheId] = {

        /**
         * @ngdoc method
         * @name $cacheFactory.Cache#put
         * @kind function
         *
         * @description
         * Inserts a named entry into the {@link $cacheFactory.Cache Cache} object to be
         * retrieved later, and incrementing the size of the cache if the key was not already
         * present in the cache. If behaving like an LRU cache, it will also remove stale
         * entries from the set.
         *
         * It will not insert undefined values into the cache.
         *
         * @param {string} key the key under which the cached data is stored.
         * @param {*} value the value to store alongside the key. If it is undefined, the key
         *    will not be stored.
         * @returns {*} the value stored.
         */
        put: function(key, value) {
          if (isUndefined(value)) return;
          if (capacity < Number.MAX_VALUE) {
            var lruEntry = lruHash[key] || (lruHash[key] = {key: key});

            refresh(lruEntry);
          }

          if (!(key in data)) size++;
          data[key] = value;

          if (size > capacity) {
            this.remove(staleEnd.key);
          }

          return value;
        },

        /**
         * @ngdoc method
         * @name $cacheFactory.Cache#get
         * @kind function
         *
         * @description
         * Retrieves named data stored in the {@link $cacheFactory.Cache Cache} object.
         *
         * @param {string} key the key of the data to be retrieved
         * @returns {*} the value stored.
         */
        get: function(key) {
          if (capacity < Number.MAX_VALUE) {
            var lruEntry = lruHash[key];

            if (!lruEntry) return;

            refresh(lruEntry);
          }

          return data[key];
        },


        /**
         * @ngdoc method
         * @name $cacheFactory.Cache#remove
         * @kind function
         *
         * @description
         * Removes an entry from the {@link $cacheFactory.Cache Cache} object.
         *
         * @param {string} key the key of the entry to be removed
         */
        remove: function(key) {
          if (capacity < Number.MAX_VALUE) {
            var lruEntry = lruHash[key];

            if (!lruEntry) return;

            if (lruEntry === freshEnd) freshEnd = lruEntry.p;
            if (lruEntry === staleEnd) staleEnd = lruEntry.n;
            link(lruEntry.n,lruEntry.p);

            delete lruHash[key];
          }

          if (!(key in data)) return;

          delete data[key];
          size--;
        },


        /**
         * @ngdoc method
         * @name $cacheFactory.Cache#removeAll
         * @kind function
         *
         * @description
         * Clears the cache object of any entries.
         */
        removeAll: function() {
          data = createMap();
          size = 0;
          lruHash = createMap();
          freshEnd = staleEnd = null;
        },


        /**
         * @ngdoc method
         * @name $cacheFactory.Cache#destroy
         * @kind function
         *
         * @description
         * Destroys the {@link $cacheFactory.Cache Cache} object entirely,
         * removing it from the {@link $cacheFactory $cacheFactory} set.
         */
        destroy: function() {
          data = null;
          stats = null;
          lruHash = null;
          delete caches[cacheId];
        },


        /**
         * @ngdoc method
         * @name $cacheFactory.Cache#info
         * @kind function
         *
         * @description
         * Retrieve information regarding a particular {@link $cacheFactory.Cache Cache}.
         *
         * @returns {object} an object with the following properties:
         *   <ul>
         *     <li>**id**: the id of the cache instance</li>
         *     <li>**size**: the number of entries kept in the cache instance</li>
         *     <li>**...**: any additional properties from the options object when creating the
         *       cache.</li>
         *   </ul>
         */
        info: function() {
          return extend({}, stats, {size: size});
        }
      });


      /**
       * makes the `entry` the freshEnd of the LRU linked list
       */
      function refresh(entry) {
        if (entry !== freshEnd) {
          if (!staleEnd) {
            staleEnd = entry;
          } else if (staleEnd === entry) {
            staleEnd = entry.n;
          }

          link(entry.n, entry.p);
          link(entry, freshEnd);
          freshEnd = entry;
          freshEnd.n = null;
        }
      }


      /**
       * bidirectionally links two entries of the LRU linked list
       */
      function link(nextEntry, prevEntry) {
        if (nextEntry !== prevEntry) {
          if (nextEntry) nextEntry.p = prevEntry; //p stands for previous, 'prev' didn't minify
          if (prevEntry) prevEntry.n = nextEntry; //n stands for next, 'next' didn't minify
        }
      }
    }


  /**
   * @ngdoc method
   * @name $cacheFactory#info
   *
   * @description
   * Get information about all the caches that have been created
   *
   * @returns {Object} - key-value map of `cacheId` to the result of calling `cache#info`
   */
    cacheFactory.info = function() {
      var info = {};
      forEach(caches, function(cache, cacheId) {
        info[cacheId] = cache.info();
      });
      return info;
    };


  /**
   * @ngdoc method
   * @name $cacheFactory#get
   *
   * @description
   * Get access to a cache object by the `cacheId` used when it was created.
   *
   * @param {string} cacheId Name or id of a cache to access.
   * @returns {object} Cache object identified by the cacheId or undefined if no such cache.
   */
    cacheFactory.get = function(cacheId) {
      return caches[cacheId];
    };


    return cacheFactory;
  };
}

/**
 * @ngdoc service
 * @name $templateCache
 * @this
 *
 * @description
 * The first time a template is used, it is loaded in the template cache for quick retrieval. You
 * can load templates directly into the cache in a `script` tag, or by consuming the
 * `$templateCache` service directly.
 *
 * Adding via the `script` tag:
 *
 * ```html
 *   <script type="text/ng-template" id="templateId.html">
 *     <p>This is the content of the template</p>
 *   </script>
 * ```
 *
 * **Note:** the `script` tag containing the template does not need to be included in the `head` of
 * the document, but it must be a descendent of the {@link ng.$rootElement $rootElement} (IE,
 * element with ng-app attribute), otherwise the template will be ignored.
 *
 * Adding via the `$templateCache` service:
 *
 * ```js
 * var myApp = angular.module('myApp', []);
 * myApp.run(function($templateCache) {
 *   $templateCache.put('templateId.html', 'This is the content of the template');
 * });
 * ```
 *
 * To retrieve the template later, simply use it in your component:
 * ```js
 * myApp.component('myComponent', {
 *    templateUrl: 'templateId.html'
 * });
 * ```
 *
 * or get it via the `$templateCache` service:
 * ```js
 * $templateCache.get('templateId.html')
 * ```
 *
 * See {@link ng.$cacheFactory $cacheFactory}.
 *
 */
function $TemplateCacheProvider() {
  this.$get = ['$cacheFactory', function($cacheFactory) {
    return $cacheFactory('templates');
  }];
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *     Any commits to this file should be reviewed with security in mind.  *
 *   Changes to this file can potentially create security vulnerabilities. *
 *          An approval from 2 Core members with history of modifying      *
 *                         this file is required.                          *
 *                                                                         *
 *  Does the change somehow allow for arbitrary javascript to be executed? *
 *    Or allows for someone to change the prototype of built-in objects?   *
 *     Or gives undesired access to variables like document or window?    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* ! VARIABLE/FUNCTION NAMING CONVENTIONS THAT APPLY TO THIS FILE!
 *
 * DOM-related variables:
 *
 * - "node" - DOM Node
 * - "element" - DOM Element or Node
 * - "$node" or "$element" - jqLite-wrapped node or element
 *
 *
 * Compiler related stuff:
 *
 * - "linkFn" - linking fn of a single directive
 * - "nodeLinkFn" - function that aggregates all linking fns for a particular node
 * - "childLinkFn" -  function that aggregates all linking fns for child nodes of a particular node
 * - "compositeLinkFn" - function that aggregates all linking fns for a compilation root (nodeList)
 */


/**
 * @ngdoc service
 * @name $compile
 * @kind function
 *
 * @description
 * Compiles an HTML string or DOM into a template and produces a template function, which
 * can then be used to link {@link ng.$rootScope.Scope `scope`} and the template together.
 *
 * The compilation is a process of walking the DOM tree and matching DOM elements to
 * {@link ng.$compileProvider#directive directives}.
 *
 * <div class="alert alert-warning">
 * **Note:** This document is an in-depth reference of all directive options.
 * For a gentle introduction to directives with examples of common use cases,
 * see the {@link guide/directive directive guide}.
 * </div>
 *
 * ## Comprehensive Directive API
 *
 * There are many different options for a directive.
 *
 * The difference resides in the return value of the factory function.
 * You can either return a {@link $compile#directive-definition-object Directive Definition Object (see below)}
 * that defines the directive properties, or just the `postLink` function (all other properties will have
 * the default values).
 *
 * <div class="alert alert-success">
 * **Best Practice:** It's recommended to use the "directive definition object" form.
 * </div>
 *
 * Here's an example directive declared with a Directive Definition Object:
 *
 * ```js
 *   var myModule = angular.module(...);
 *
 *   myModule.directive('directiveName', function factory(injectables) {
 *     var directiveDefinitionObject = {
 *       {@link $compile#-priority- priority}: 0,
 *       {@link $compile#-template- template}: '<div></div>', // or // function(tElement, tAttrs) { ... },
 *       // or
 *       // {@link $compile#-templateurl- templateUrl}: 'directive.html', // or // function(tElement, tAttrs) { ... },
 *       {@link $compile#-transclude- transclude}: false,
 *       {@link $compile#-restrict- restrict}: 'A',
 *       {@link $compile#-templatenamespace- templateNamespace}: 'html',
 *       {@link $compile#-scope- scope}: false,
 *       {@link $compile#-controller- controller}: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
 *       {@link $compile#-controlleras- controllerAs}: 'stringIdentifier',
 *       {@link $compile#-bindtocontroller- bindToController}: false,
 *       {@link $compile#-require- require}: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
 *       {@link $compile#-multielement- multiElement}: false,
 *       {@link $compile#-compile- compile}: function compile(tElement, tAttrs, transclude) {
 *         return {
 *            {@link $compile#pre-linking-function pre}: function preLink(scope, iElement, iAttrs, controller) { ... },
 *            {@link $compile#post-linking-function post}: function postLink(scope, iElement, iAttrs, controller) { ... }
 *         }
 *         // or
 *         // return function postLink( ... ) { ... }
 *       },
 *       // or
 *       // {@link $compile#-link- link}: {
 *       //  {@link $compile#pre-linking-function pre}: function preLink(scope, iElement, iAttrs, controller) { ... },
 *       //  {@link $compile#post-linking-function post}: function postLink(scope, iElement, iAttrs, controller) { ... }
 *       // }
 *       // or
 *       // {@link $compile#-link- link}: function postLink( ... ) { ... }
 *     };
 *     return directiveDefinitionObject;
 *   });
 * ```
 *
 * <div class="alert alert-warning">
 * **Note:** Any unspecified options will use the default value. You can see the default values below.
 * </div>
 *
 * Therefore the above can be simplified as:
 *
 * ```js
 *   var myModule = angular.module(...);
 *
 *   myModule.directive('directiveName', function factory(injectables) {
 *     var directiveDefinitionObject = {
 *       link: function postLink(scope, iElement, iAttrs) { ... }
 *     };
 *     return directiveDefinitionObject;
 *     // or
 *     // return function postLink(scope, iElement, iAttrs) { ... }
 *   });
 * ```
 *
 * ### Life-cycle hooks
 * Directive controllers can provide the following methods that are called by Angular at points in the life-cycle of the
 * directive:
 * * `$onInit()` - Called on each controller after all the controllers on an element have been constructed and
 *   had their bindings initialized (and before the pre &amp; post linking functions for the directives on
 *   this element). This is a good place to put initialization code for your controller.
 * * `$onChanges(changesObj)` - Called whenever one-way (`<`) or interpolation (`@`) bindings are updated. The
 *   `changesObj` is a hash whose keys are the names of the bound properties that have changed, and the values are an
 *   object of the form `{ currentValue, previousValue, isFirstChange() }`. Use this hook to trigger updates within a
 *   component such as cloning the bound value to prevent accidental mutation of the outer value.
 * * `$doCheck()` - Called on each turn of the digest cycle. Provides an opportunity to detect and act on
 *   changes. Any actions that you wish to take in response to the changes that you detect must be
 *   invoked from this hook; implementing this has no effect on when `$onChanges` is called. For example, this hook
 *   could be useful if you wish to perform a deep equality check, or to check a Date object, changes to which would not
 *   be detected by Angular's change detector and thus not trigger `$onChanges`. This hook is invoked with no arguments;
 *   if detecting changes, you must store the previous value(s) for comparison to the current values.
 * * `$onDestroy()` - Called on a controller when its containing scope is destroyed. Use this hook for releasing
 *   external resources, watches and event handlers. Note that components have their `$onDestroy()` hooks called in
 *   the same order as the `$scope.$broadcast` events are triggered, which is top down. This means that parent
 *   components will have their `$onDestroy()` hook called before child components.
 * * `$postLink()` - Called after this controller's element and its children have been linked. Similar to the post-link
 *   function this hook can be used to set up DOM event handlers and do direct DOM manipulation.
 *   Note that child elements that contain `templateUrl` directives will not have been compiled and linked since
 *   they are waiting for their template to load asynchronously and their own compilation and linking has been
 *   suspended until that occurs.
 *
 * #### Comparison with Angular 2 life-cycle hooks
 * Angular 2 also uses life-cycle hooks for its components. While the Angular 1 life-cycle hooks are similar there are
 * some differences that you should be aware of, especially when it comes to moving your code from Angular 1 to Angular 2:
 *
 * * Angular 1 hooks are prefixed with `$`, such as `$onInit`. Angular 2 hooks are prefixed with `ng`, such as `ngOnInit`.
 * * Angular 1 hooks can be defined on the controller prototype or added to the controller inside its constructor.
 *   In Angular 2 you can only define hooks on the prototype of the Component class.
 * * Due to the differences in change-detection, you may get many more calls to `$doCheck` in Angular 1 than you would to
 *   `ngDoCheck` in Angular 2
 * * Changes to the model inside `$doCheck` will trigger new turns of the digest loop, which will cause the changes to be
 *   propagated throughout the application.
 *   Angular 2 does not allow the `ngDoCheck` hook to trigger a change outside of the component. It will either throw an
 *   error or do nothing depending upon the state of `enableProdMode()`.
 *
 * #### Life-cycle hook examples
 *
 * This example shows how you can check for mutations to a Date object even though the identity of the object
 * has not changed.
 *
 * <example name="doCheckDateExample" module="do-check-module">
 *   <file name="app.js">
 *     angular.module('do-check-module', [])
 *       .component('app', {
 *         template:
 *           'Month: <input ng-model="$ctrl.month" ng-change="$ctrl.updateDate()">' +
 *           'Date: {{ $ctrl.date }}' +
 *           '<test date="$ctrl.date"></test>',
 *         controller: function() {
 *           this.date = new Date();
 *           this.month = this.date.getMonth();
 *           this.updateDate = function() {
 *             this.date.setMonth(this.month);
 *           };
 *         }
 *       })
 *       .component('test', {
 *         bindings: { date: '<' },
 *         template:
 *           '<pre>{{ $ctrl.log | json }}</pre>',
 *         controller: function() {
 *           var previousValue;
 *           this.log = [];
 *           this.$doCheck = function() {
 *             var currentValue = this.date && this.date.valueOf();
 *             if (previousValue !== currentValue) {
 *               this.log.push('doCheck: date mutated: ' + this.date);
 *               previousValue = currentValue;
 *             }
 *           };
 *         }
 *       });
 *   </file>
 *   <file name="index.html">
 *     <app></app>
 *   </file>
 * </example>
 *
 * This example show how you might use `$doCheck` to trigger changes in your component's inputs even if the
 * actual identity of the component doesn't change. (Be aware that cloning and deep equality checks on large
 * arrays or objects can have a negative impact on your application performance)
 *
 * <example name="doCheckArrayExample" module="do-check-module">
 *   <file name="index.html">
 *     <div ng-init="items = []">
 *       <button ng-click="items.push(items.length)">Add Item</button>
 *       <button ng-click="items = []">Reset Items</button>
 *       <pre>{{ items }}</pre>
 *       <test items="items"></test>
 *     </div>
 *   </file>
 *   <file name="app.js">
 *      angular.module('do-check-module', [])
 *        .component('test', {
 *          bindings: { items: '<' },
 *          template:
 *            '<pre>{{ $ctrl.log | json }}</pre>',
 *          controller: function() {
 *            this.log = [];
 *
 *            this.$doCheck = function() {
 *              if (this.items_ref !== this.items) {
 *                this.log.push('doCheck: items changed');
 *                this.items_ref = this.items;
 *              }
 *              if (!angular.equals(this.items_clone, this.items)) {
 *                this.log.push('doCheck: items mutated');
 *                this.items_clone = angular.copy(this.items);
 *              }
 *            };
 *          }
 *        });
 *   </file>
 * </example>
 *
 *
 * ### Directive Definition Object
 *
 * The directive definition object provides instructions to the {@link ng.$compile
 * compiler}. The attributes are:
 *
 * #### `multiElement`
 * When this property is set to true (default is `false`), the HTML compiler will collect DOM nodes between
 * nodes with the attributes `directive-name-start` and `directive-name-end`, and group them
 * together as the directive elements. It is recommended that this feature be used on directives
 * which are not strictly behavioral (such as {@link ngClick}), and which
 * do not manipulate or replace child nodes (such as {@link ngInclude}).
 *
 * #### `priority`
 * When there are multiple directives defined on a single DOM element, sometimes it
 * is necessary to specify the order in which the directives are applied. The `priority` is used
 * to sort the directives before their `compile` functions get called. Priority is defined as a
 * number. Directives with greater numerical `priority` are compiled first. Pre-link functions
 * are also run in priority order, but post-link functions are run in reverse order. The order
 * of directives with the same priority is undefined. The default priority is `0`.
 *
 * #### `terminal`
 * If set to true then the current `priority` will be the last set of directives
 * which will execute (any directives at the current priority will still execute
 * as the order of execution on same `priority` is undefined). Note that expressions
 * and other directives used in the directive's template will also be excluded from execution.
 *
 * #### `scope`
 * The scope property can be `false`, `true`, or an object:
 *
 * * **`false` (default):** No scope will be created for the directive. The directive will use its
 * parent's scope.
 *
 * * **`true`:** A new child scope that prototypically inherits from its parent will be created for
 * the directive's element. If multiple directives on the same element request a new scope,
 * only one new scope is created.
 *
 * * **`{...}` (an object hash):** A new "isolate" scope is created for the directive's element. The
 * 'isolate' scope differs from normal scope in that it does not prototypically inherit from its parent
 * scope. This is useful when creating reusable components, which should not accidentally read or modify
 * data in the parent scope.
 *
 * The 'isolate' scope object hash defines a set of local scope properties derived from attributes on the
 * directive's element. These local properties are useful for aliasing values for templates. The keys in
 * the object hash map to the name of the property on the isolate scope; the values define how the property
 * is bound to the parent scope, via matching attributes on the directive's element:
 *
 * * `@` or `@attr` - bind a local scope property to the value of DOM attribute. The result is
 *   always a string since DOM attributes are strings. If no `attr` name is specified then the
 *   attribute name is assumed to be the same as the local name. Given `<my-component
 *   my-attr="hello {{name}}">` and the isolate scope definition `scope: { localName:'@myAttr' }`,
 *   the directive's scope property `localName` will reflect the interpolated value of `hello
 *   {{name}}`. As the `name` attribute changes so will the `localName` property on the directive's
 *   scope. The `name` is read from the parent scope (not the directive's scope).
 *
 * * `=` or `=attr` - set up a bidirectional binding between a local scope property and an expression
 *   passed via the attribute `attr`. The expression is evaluated in the context of the parent scope.
 *   If no `attr` name is specified then the attribute name is assumed to be the same as the local
 *   name. Given `<my-component my-attr="parentModel">` and the isolate scope definition `scope: {
 *   localModel: '=myAttr' }`, the property `localModel` on the directive's scope will reflect the
 *   value of `parentModel` on the parent scope. Changes to `parentModel` will be reflected in
 *   `localModel` and vice versa. Optional attributes should be marked as such with a question mark:
 *   `=?` or `=?attr`. If the binding expression is non-assignable, or if the attribute isn't
 *   optional and doesn't exist, an exception ({@link error/$compile/nonassign `$compile:nonassign`})
 *   will be thrown upon discovering changes to the local value, since it will be impossible to sync
 *   them back to the parent scope. By default, the {@link ng.$rootScope.Scope#$watch `$watch`}
 *   method is used for tracking changes, and the equality check is based on object identity.
 *   However, if an object literal or an array literal is passed as the binding expression, the
 *   equality check is done by value (using the {@link angular.equals} function). It's also possible
 *   to watch the evaluated value shallowly with {@link ng.$rootScope.Scope#$watchCollection
 *   `$watchCollection`}: use `=*` or `=*attr` (`=*?` or `=*?attr` if the attribute is optional).
 *
  * * `<` or `<attr` - set up a one-way (one-directional) binding between a local scope property and an
 *   expression passed via the attribute `attr`. The expression is evaluated in the context of the
 *   parent scope. If no `attr` name is specified then the attribute name is assumed to be the same as the
 *   local name. You can also make the binding optional by adding `?`: `<?` or `<?attr`.
 *
 *   For example, given `<my-component my-attr="parentModel">` and directive definition of
 *   `scope: { localModel:'<myAttr' }`, then the isolated scope property `localModel` will reflect the
 *   value of `parentModel` on the parent scope. Any changes to `parentModel` will be reflected
 *   in `localModel`, but changes in `localModel` will not reflect in `parentModel`. There are however
 *   two caveats:
 *     1. one-way binding does not copy the value from the parent to the isolate scope, it simply
 *     sets the same value. That means if your bound value is an object, changes to its properties
 *     in the isolated scope will be reflected in the parent scope (because both reference the same object).
 *     2. one-way binding watches changes to the **identity** of the parent value. That means the
 *     {@link ng.$rootScope.Scope#$watch `$watch`} on the parent value only fires if the reference
 *     to the value has changed. In most cases, this should not be of concern, but can be important
 *     to know if you one-way bind to an object, and then replace that object in the isolated scope.
 *     If you now change a property of the object in your parent scope, the change will not be
 *     propagated to the isolated scope, because the identity of the object on the parent scope
 *     has not changed. Instead you must assign a new object.
 *
 *   One-way binding is useful if you do not plan to propagate changes to your isolated scope bindings
 *   back to the parent. However, it does not make this completely impossible.
 *
 * * `&` or `&attr` - provides a way to execute an expression in the context of the parent scope. If
 *   no `attr` name is specified then the attribute name is assumed to be the same as the local name.
 *   Given `<my-component my-attr="count = count + value">` and the isolate scope definition `scope: {
 *   localFn:'&myAttr' }`, the isolate scope property `localFn` will point to a function wrapper for
 *   the `count = count + value` expression. Often it's desirable to pass data from the isolated scope
 *   via an expression to the parent scope. This can be done by passing a map of local variable names
 *   and values into the expression wrapper fn. For example, if the expression is `increment(amount)`
 *   then we can specify the amount value by calling the `localFn` as `localFn({amount: 22})`.
 *
 * In general it's possible to apply more than one directive to one element, but there might be limitations
 * depending on the type of scope required by the directives. The following points will help explain these limitations.
 * For simplicity only two directives are taken into account, but it is also applicable for several directives:
 *
 * * **no scope** + **no scope** => Two directives which don't require their own scope will use their parent's scope
 * * **child scope** + **no scope** =>  Both directives will share one single child scope
 * * **child scope** + **child scope** =>  Both directives will share one single child scope
 * * **isolated scope** + **no scope** =>  The isolated directive will use it's own created isolated scope. The other directive will use
 * its parent's scope
 * * **isolated scope** + **child scope** =>  **Won't work!** Only one scope can be related to one element. Therefore these directives cannot
 * be applied to the same element.
 * * **isolated scope** + **isolated scope**  =>  **Won't work!** Only one scope can be related to one element. Therefore these directives
 * cannot be applied to the same element.
 *
 *
 * #### `bindToController`
 * This property is used to bind scope properties directly to the controller. It can be either
 * `true` or an object hash with the same format as the `scope` property.
 *
 * When an isolate scope is used for a directive (see above), `bindToController: true` will
 * allow a component to have its properties bound to the controller, rather than to scope.
 *
 * After the controller is instantiated, the initial values of the isolate scope bindings will be bound to the controller
 * properties. You can access these bindings once they have been initialized by providing a controller method called
 * `$onInit`, which is called after all the controllers on an element have been constructed and had their bindings
 * initialized.
 *
 * <div class="alert alert-warning">
 * **Deprecation warning:** although bindings for non-ES6 class controllers are currently
 * bound to `this` before the controller constructor is called, this use is now deprecated. Please place initialization
 * code that relies upon bindings inside a `$onInit` method on the controller, instead.
 * </div>
 *
 * It is also possible to set `bindToController` to an object hash with the same format as the `scope` property.
 * This will set up the scope bindings to the controller directly. Note that `scope` can still be used
 * to define which kind of scope is created. By default, no scope is created. Use `scope: {}` to create an isolate
 * scope (useful for component directives).
 *
 * If both `bindToController` and `scope` are defined and have object hashes, `bindToController` overrides `scope`.
 *
 *
 * #### `controller`
 * Controller constructor function. The controller is instantiated before the
 * pre-linking phase and can be accessed by other directives (see
 * `require` attribute). This allows the directives to communicate with each other and augment
 * each other's behavior. The controller is injectable (and supports bracket notation) with the following locals:
 *
 * * `$scope` - Current scope associated with the element
 * * `$element` - Current element
 * * `$attrs` - Current attributes object for the element
 * * `$transclude` - A transclude linking function pre-bound to the correct transclusion scope:
 *   `function([scope], cloneLinkingFn, futureParentElement, slotName)`:
 *    * `scope`: (optional) override the scope.
 *    * `cloneLinkingFn`: (optional) argument to create clones of the original transcluded content.
 *    * `futureParentElement` (optional):
 *        * defines the parent to which the `cloneLinkingFn` will add the cloned elements.
 *        * default: `$element.parent()` resp. `$element` for `transclude:'element'` resp. `transclude:true`.
 *        * only needed for transcludes that are allowed to contain non html elements (e.g. SVG elements)
 *          and when the `cloneLinkingFn` is passed,
 *          as those elements need to created and cloned in a special way when they are defined outside their
 *          usual containers (e.g. like `<svg>`).
 *        * See also the `directive.templateNamespace` property.
 *    * `slotName`: (optional) the name of the slot to transclude. If falsy (e.g. `null`, `undefined` or `''`)
 *      then the default transclusion is provided.
 *    The `$transclude` function also has a method on it, `$transclude.isSlotFilled(slotName)`, which returns
 *    `true` if the specified slot contains content (i.e. one or more DOM nodes).
 *
 * #### `require`
 * Require another directive and inject its controller as the fourth argument to the linking function. The
 * `require` property can be a string, an array or an object:
 * * a **string** containing the name of the directive to pass to the linking function
 * * an **array** containing the names of directives to pass to the linking function. The argument passed to the
 * linking function will be an array of controllers in the same order as the names in the `require` property
 * * an **object** whose property values are the names of the directives to pass to the linking function. The argument
 * passed to the linking function will also be an object with matching keys, whose values will hold the corresponding
 * controllers.
 *
 * If the `require` property is an object and `bindToController` is truthy, then the required controllers are
 * bound to the controller using the keys of the `require` property. This binding occurs after all the controllers
 * have been constructed but before `$onInit` is called.
 * If the name of the required controller is the same as the local name (the key), the name can be
 * omitted. For example, `{parentDir: '^^'}` is equivalent to `{parentDir: '^^parentDir'}`.
 * See the {@link $compileProvider#component} helper for an example of how this can be used.
 * If no such required directive(s) can be found, or if the directive does not have a controller, then an error is
 * raised (unless no link function is specified and the required controllers are not being bound to the directive
 * controller, in which case error checking is skipped). The name can be prefixed with:
 *
 * * (no prefix) - Locate the required controller on the current element. Throw an error if not found.
 * * `?` - Attempt to locate the required controller or pass `null` to the `link` fn if not found.
 * * `^` - Locate the required controller by searching the element and its parents. Throw an error if not found.
 * * `^^` - Locate the required controller by searching the element's parents. Throw an error if not found.
 * * `?^` - Attempt to locate the required controller by searching the element and its parents or pass
 *   `null` to the `link` fn if not found.
 * * `?^^` - Attempt to locate the required controller by searching the element's parents, or pass
 *   `null` to the `link` fn if not found.
 *
 *
 * #### `controllerAs`
 * Identifier name for a reference to the controller in the directive's scope.
 * This allows the controller to be referenced from the directive template. This is especially
 * useful when a directive is used as component, i.e. with an `isolate` scope. It's also possible
 * to use it in a directive without an `isolate` / `new` scope, but you need to be aware that the
 * `controllerAs` reference might overwrite a property that already exists on the parent scope.
 *
 *
 * #### `restrict`
 * String of subset of `EACM` which restricts the directive to a specific directive
 * declaration style. If omitted, the defaults (elements and attributes) are used.
 *
 * * `E` - Element name (default): `<my-directive></my-directive>`
 * * `A` - Attribute (default): `<div my-directive="exp"></div>`
 * * `C` - Class: `<div class="my-directive: exp;"></div>`
 * * `M` - Comment: `<!-- directive: my-directive exp -->`
 *
 *
 * #### `templateNamespace`
 * String representing the document type used by the markup in the template.
 * AngularJS needs this information as those elements need to be created and cloned
 * in a special way when they are defined outside their usual containers like `<svg>` and `<math>`.
 *
 * * `html` - All root nodes in the template are HTML. Root nodes may also be
 *   top-level elements such as `<svg>` or `<math>`.
 * * `svg` - The root nodes in the template are SVG elements (excluding `<math>`).
 * * `math` - The root nodes in the template are MathML elements (excluding `<svg>`).
 *
 * If no `templateNamespace` is specified, then the namespace is considered to be `html`.
 *
 * #### `template`
 * HTML markup that may:
 * * Replace the contents of the directive's element (default).
 * * Replace the directive's element itself (if `replace` is true - DEPRECATED).
 * * Wrap the contents of the directive's element (if `transclude` is true).
 *
 * Value may be:
 *
 * * A string. For example `<div red-on-hover>{{delete_str}}</div>`.
 * * A function which takes two arguments `tElement` and `tAttrs` (described in the `compile`
 *   function api below) and returns a string value.
 *
 *
 * #### `templateUrl`
 * This is similar to `template` but the template is loaded from the specified URL, asynchronously.
 *
 * Because template loading is asynchronous the compiler will suspend compilation of directives on that element
 * for later when the template has been resolved.  In the meantime it will continue to compile and link
 * sibling and parent elements as though this element had not contained any directives.
 *
 * The compiler does not suspend the entire compilation to wait for templates to be loaded because this
 * would result in the whole app "stalling" until all templates are loaded asynchronously - even in the
 * case when only one deeply nested directive has `templateUrl`.
 *
 * Template loading is asynchronous even if the template has been preloaded into the {@link $templateCache}
 *
 * You can specify `templateUrl` as a string representing the URL or as a function which takes two
 * arguments `tElement` and `tAttrs` (described in the `compile` function api below) and returns
 * a string value representing the url.  In either case, the template URL is passed through {@link
 * $sce#getTrustedResourceUrl $sce.getTrustedResourceUrl}.
 *
 *
 * #### `replace` ([*DEPRECATED*!], will be removed in next major release - i.e. v2.0)
 * specify what the template should replace. Defaults to `false`.
 *
 * * `true` - the template will replace the directive's element.
 * * `false` - the template will replace the contents of the directive's element.
 *
 * The replacement process migrates all of the attributes / classes from the old element to the new
 * one. See the {@link guide/directive#template-expanding-directive
 * Directives Guide} for an example.
 *
 * There are very few scenarios where element replacement is required for the application function,
 * the main one being reusable custom components that are used within SVG contexts
 * (because SVG doesn't work with custom elements in the DOM tree).
 *
 * #### `transclude`
 * Extract the contents of the element where the directive appears and make it available to the directive.
 * The contents are compiled and provided to the directive as a **transclusion function**. See the
 * {@link $compile#transclusion Transclusion} section below.
 *
 *
 * #### `compile`
 *
 * ```js
 *   function compile(tElement, tAttrs, transclude) { ... }
 * ```
 *
 * The compile function deals with transforming the template DOM. Since most directives do not do
 * template transformation, it is not used often. The compile function takes the following arguments:
 *
 *   * `tElement` - template element - The element where the directive has been declared. It is
 *     safe to do template transformation on the element and child elements only.
 *
 *   * `tAttrs` - template attributes - Normalized list of attributes declared on this element shared
 *     between all directive compile functions.
 *
 *   * `transclude` -  [*DEPRECATED*!] A transclude linking function: `function(scope, cloneLinkingFn)`
 *
 * <div class="alert alert-warning">
 * **Note:** The template instance and the link instance may be different objects if the template has
 * been cloned. For this reason it is **not** safe to do anything other than DOM transformations that
 * apply to all cloned DOM nodes within the compile function. Specifically, DOM listener registration
 * should be done in a linking function rather than in a compile function.
 * </div>

 * <div class="alert alert-warning">
 * **Note:** The compile function cannot handle directives that recursively use themselves in their
 * own templates or compile functions. Compiling these directives results in an infinite loop and
 * stack overflow errors.
 *
 * This can be avoided by manually using $compile in the postLink function to imperatively compile
 * a directive's template instead of relying on automatic template compilation via `template` or
 * `templateUrl` declaration or manual compilation inside the compile function.
 * </div>
 *
 * <div class="alert alert-danger">
 * **Note:** The `transclude` function that is passed to the compile function is deprecated, as it
 *   e.g. does not know about the right outer scope. Please use the transclude function that is passed
 *   to the link function instead.
 * </div>

 * A compile function can have a return value which can be either a function or an object.
 *
 * * returning a (post-link) function - is equivalent to registering the linking function via the
 *   `link` property of the config object when the compile function is empty.
 *
 * * returning an object with function(s) registered via `pre` and `post` properties - allows you to
 *   control when a linking function should be called during the linking phase. See info about
 *   pre-linking and post-linking functions below.
 *
 *
 * #### `link`
 * This property is used only if the `compile` property is not defined.
 *
 * ```js
 *   function link(scope, iElement, iAttrs, controller, transcludeFn) { ... }
 * ```
 *
 * The link function is responsible for registering DOM listeners as well as updating the DOM. It is
 * executed after the template has been cloned. This is where most of the directive logic will be
 * put.
 *
 *   * `scope` - {@link ng.$rootScope.Scope Scope} - The scope to be used by the
 *     directive for registering {@link ng.$rootScope.Scope#$watch watches}.
 *
 *   * `iElement` - instance element - The element where the directive is to be used. It is safe to
 *     manipulate the children of the element only in `postLink` function since the children have
 *     already been linked.
 *
 *   * `iAttrs` - instance attributes - Normalized list of attributes declared on this element shared
 *     between all directive linking functions.
 *
 *   * `controller` - the directive's required controller instance(s) - Instances are shared
 *     among all directives, which allows the directives to use the controllers as a communication
 *     channel. The exact value depends on the directive's `require` property:
 *       * no controller(s) required: the directive's own controller, or `undefined` if it doesn't have one
 *       * `string`: the controller instance
 *       * `array`: array of controller instances
 *
 *     If a required controller cannot be found, and it is optional, the instance is `null`,
 *     otherwise the {@link error:$compile:ctreq Missing Required Controller} error is thrown.
 *
 *     Note that you can also require the directive's own controller - it will be made available like
 *     any other controller.
 *
 *   * `transcludeFn` - A transclude linking function pre-bound to the correct transclusion scope.
 *     This is the same as the `$transclude` parameter of directive controllers,
 *     see {@link ng.$compile#-controller- the controller section for details}.
 *     `function([scope], cloneLinkingFn, futureParentElement)`.
 *
 * #### Pre-linking function
 *
 * Executed before the child elements are linked. Not safe to do DOM transformation since the
 * compiler linking function will fail to locate the correct elements for linking.
 *
 * #### Post-linking function
 *
 * Executed after the child elements are linked.
 *
 * Note that child elements that contain `templateUrl` directives will not have been compiled
 * and linked since they are waiting for their template to load asynchronously and their own
 * compilation and linking has been suspended until that occurs.
 *
 * It is safe to do DOM transformation in the post-linking function on elements that are not waiting
 * for their async templates to be resolved.
 *
 *
 * ### Transclusion
 *
 * Transclusion is the process of extracting a collection of DOM elements from one part of the DOM and
 * copying them to another part of the DOM, while maintaining their connection to the original AngularJS
 * scope from where they were taken.
 *
 * Transclusion is used (often with {@link ngTransclude}) to insert the
 * original contents of a directive's element into a specified place in the template of the directive.
 * The benefit of transclusion, over simply moving the DOM elements manually, is that the transcluded
 * content has access to the properties on the scope from which it was taken, even if the directive
 * has isolated scope.
 * See the {@link guide/directive#creating-a-directive-that-wraps-other-elements Directives Guide}.
 *
 * This makes it possible for the widget to have private state for its template, while the transcluded
 * content has access to its originating scope.
 *
 * <div class="alert alert-warning">
 * **Note:** When testing an element transclude directive you must not place the directive at the root of the
 * DOM fragment that is being compiled. See {@link guide/unit-testing#testing-transclusion-directives
 * Testing Transclusion Directives}.
 * </div>
 *
 * There are three kinds of transclusion depending upon whether you want to transclude just the contents of the
 * directive's element, the entire element or multiple parts of the element contents:
 *
 * * `true` - transclude the content (i.e. the child nodes) of the directive's element.
 * * `'element'` - transclude the whole of the directive's element including any directives on this
 *   element that defined at a lower priority than this directive. When used, the `template`
 *   property is ignored.
 * * **`{...}` (an object hash):** - map elements of the content onto transclusion "slots" in the template.
 *
 * **Mult-slot transclusion** is declared by providing an object for the `transclude` property.
 *
 * This object is a map where the keys are the name of the slot to fill and the value is an element selector
 * used to match the HTML to the slot. The element selector should be in normalized form (e.g. `myElement`)
 * and will match the standard element variants (e.g. `my-element`, `my:element`, `data-my-element`, etc).
 *
 * For further information check out the guide on {@link guide/directive#matching-directives Matching Directives}
 *
 * If the element selector is prefixed with a `?` then that slot is optional.
 *
 * For example, the transclude object `{ slotA: '?myCustomElement' }` maps `<my-custom-element>` elements to
 * the `slotA` slot, which can be accessed via the `$transclude` function or via the {@link ngTransclude} directive.
 *
 * Slots that are not marked as optional (`?`) will trigger a compile time error if there are no matching elements
 * in the transclude content. If you wish to know if an optional slot was filled with content, then you can call
 * `$transclude.isSlotFilled(slotName)` on the transclude function passed to the directive's link function and
 * injectable into the directive's controller.
 *
 *
 * #### Transclusion Functions
 *
 * When a directive requests transclusion, the compiler extracts its contents and provides a **transclusion
 * function** to the directive's `link` function and `controller`. This transclusion function is a special
 * **linking function** that will return the compiled contents linked to a new transclusion scope.
 *
 * <div class="alert alert-info">
 * If you are just using {@link ngTransclude} then you don't need to worry about this function, since
 * ngTransclude will deal with it for us.
 * </div>
 *
 * If you want to manually control the insertion and removal of the transcluded content in your directive
 * then you must use this transclude function. When you call a transclude function it returns a a jqLite/JQuery
 * object that contains the compiled DOM, which is linked to the correct transclusion scope.
 *
 * When you call a transclusion function you can pass in a **clone attach function**. This function accepts
 * two parameters, `function(clone, scope) { ... }`, where the `clone` is a fresh compiled copy of your transcluded
 * content and the `scope` is the newly created transclusion scope, which the clone will be linked to.
 *
 * <div class="alert alert-info">
 * **Best Practice**: Always provide a `cloneFn` (clone attach function) when you call a transclude function
 * since you then get a fresh clone of the original DOM and also have access to the new transclusion scope.
 * </div>
 *
 * It is normal practice to attach your transcluded content (`clone`) to the DOM inside your **clone
 * attach function**:
 *
 * ```js
 * var transcludedContent, transclusionScope;
 *
 * $transclude(function(clone, scope) {
 *   element.append(clone);
 *   transcludedContent = clone;
 *   transclusionScope = scope;
 * });
 * ```
 *
 * Later, if you want to remove the transcluded content from your DOM then you should also destroy the
 * associated transclusion scope:
 *
 * ```js
 * transcludedContent.remove();
 * transclusionScope.$destroy();
 * ```
 *
 * <div class="alert alert-info">
 * **Best Practice**: if you intend to add and remove transcluded content manually in your directive
 * (by calling the transclude function to get the DOM and calling `element.remove()` to remove it),
 * then you are also responsible for calling `$destroy` on the transclusion scope.
 * </div>
 *
 * The built-in DOM manipulation directives, such as {@link ngIf}, {@link ngSwitch} and {@link ngRepeat}
 * automatically destroy their transcluded clones as necessary so you do not need to worry about this if
 * you are simply using {@link ngTransclude} to inject the transclusion into your directive.
 *
 *
 * #### Transclusion Scopes
 *
 * When you call a transclude function it returns a DOM fragment that is pre-bound to a **transclusion
 * scope**. This scope is special, in that it is a child of the directive's scope (and so gets destroyed
 * when the directive's scope gets destroyed) but it inherits the properties of the scope from which it
 * was taken.
 *
 * For example consider a directive that uses transclusion and isolated scope. The DOM hierarchy might look
 * like this:
 *
 * ```html
 * <div ng-app>
 *   <div isolate>
 *     <div transclusion>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * The `$parent` scope hierarchy will look like this:
 *
   ```
   - $rootScope
     - isolate
       - transclusion
   ```
 *
 * but the scopes will inherit prototypically from different scopes to their `$parent`.
 *
   ```
   - $rootScope
     - transclusion
   - isolate
   ```
 *
 *
 * ### Attributes
 *
 * The {@link ng.$compile.directive.Attributes Attributes} object - passed as a parameter in the
 * `link()` or `compile()` functions. It has a variety of uses.
 *
 * * *Accessing normalized attribute names:* Directives like 'ngBind' can be expressed in many ways:
 *   'ng:bind', `data-ng-bind`, or 'x-ng-bind'. The attributes object allows for normalized access
 *   to the attributes.
 *
 * * *Directive inter-communication:* All directives share the same instance of the attributes
 *   object which allows the directives to use the attributes object as inter directive
 *   communication.
 *
 * * *Supports interpolation:* Interpolation attributes are assigned to the attribute object
 *   allowing other directives to read the interpolated value.
 *
 * * *Observing interpolated attributes:* Use `$observe` to observe the value changes of attributes
 *   that contain interpolation (e.g. `src="{{bar}}"`). Not only is this very efficient but it's also
 *   the only way to easily get the actual value because during the linking phase the interpolation
 *   hasn't been evaluated yet and so the value is at this time set to `undefined`.
 *
 * ```js
 * function linkingFn(scope, elm, attrs, ctrl) {
 *   // get the attribute value
 *   console.log(attrs.ngModel);
 *
 *   // change the attribute
 *   attrs.$set('ngModel', 'new value');
 *
 *   // observe changes to interpolated attribute
 *   attrs.$observe('ngModel', function(value) {
 *     console.log('ngModel has changed value to ' + value);
 *   });
 * }
 * ```
 *
 * ## Example
 *
 * <div class="alert alert-warning">
 * **Note**: Typically directives are registered with `module.directive`. The example below is
 * to illustrate how `$compile` works.
 * </div>
 *
 <example module="compileExample" name="compile">
   <file name="index.html">
    <script>
      angular.module('compileExample', [], function($compileProvider) {
        // configure new 'compile' directive by passing a directive
        // factory function. The factory function injects the '$compile'
        $compileProvider.directive('compile', function($compile) {
          // directive factory creates a link function
          return function(scope, element, attrs) {
            scope.$watch(
              function(scope) {
                 // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
              },
              function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
              }
            );
          };
        });
      })
      .controller('GreeterController', ['$scope', function($scope) {
        $scope.name = 'Angular';
        $scope.html = 'Hello {{name}}';
      }]);
    </script>
    <div ng-controller="GreeterController">
      <input ng-model="name"> <br/>
      <textarea ng-model="html"></textarea> <br/>
      <div compile="html"></div>
    </div>
   </file>
   <file name="protractor.js" type="protractor">
     it('should auto compile', function() {
       var textarea = $('textarea');
       var output = $('div[compile]');
       // The initial state reads 'Hello Angular'.
       expect(output.getText()).toBe('Hello Angular');
       textarea.clear();
       textarea.sendKeys('{{name}}!');
       expect(output.getText()).toBe('Angular!');
     });
   </file>
 </example>

 *
 *
 * @param {string|DOMElement} element Element or HTML string to compile into a template function.
 * @param {function(angular.Scope, cloneAttachFn=)} transclude function available to directives - DEPRECATED.
 *
 * <div class="alert alert-danger">
 * **Note:** Passing a `transclude` function to the $compile function is deprecated, as it
 *   e.g. will not use the right outer scope. Please pass the transclude function as a
 *   `parentBoundTranscludeFn` to the link function instead.
 * </div>
 *
 * @param {number} maxPriority only apply directives lower than given priority (Only effects the
 *                 root element(s), not their children)
 * @returns {function(scope, cloneAttachFn=, options=)} a link function which is used to bind template
 * (a DOM element/tree) to a scope. Where:
 *
 *  * `scope` - A {@link ng.$rootScope.Scope Scope} to bind to.
 *  * `cloneAttachFn` - If `cloneAttachFn` is provided, then the link function will clone the
 *  `template` and call the `cloneAttachFn` function allowing the caller to attach the
 *  cloned elements to the DOM document at the appropriate place. The `cloneAttachFn` is
 *  called as: <br/> `cloneAttachFn(clonedElement, scope)` where:
 *
 *      * `clonedElement` - is a clone of the original `element` passed into the compiler.
 *      * `scope` - is the current scope with which the linking function is working with.
 *
 *  * `options` - An optional object hash with linking options. If `options` is provided, then the following
 *  keys may be used to control linking behavior:
 *
 *      * `parentBoundTranscludeFn` - the transclude function made available to
 *        directives; if given, it will be passed through to the link functions of
 *        directives found in `element` during compilation.
 *      * `transcludeControllers` - an object hash with keys that map controller names
 *        to a hash with the key `instance`, which maps to the controller instance;
 *        if given, it will make the controllers available to directives on the compileNode:
 *        ```
 *        {
 *          parent: {
 *            instance: parentControllerInstance
 *          }
 *        }
 *        ```
 *      * `futureParentElement` - defines the parent to which the `cloneAttachFn` will add
 *        the cloned elements; only needed for transcludes that are allowed to contain non html
 *        elements (e.g. SVG elements). See also the directive.controller property.
 *
 * Calling the linking function returns the element of the template. It is either the original
 * element passed in, or the clone of the element if the `cloneAttachFn` is provided.
 *
 * After linking the view is not updated until after a call to $digest which typically is done by
 * Angular automatically.
 *
 * If you need access to the bound view, there are two ways to do it:
 *
 * - If you are not asking the linking function to clone the template, create the DOM element(s)
 *   before you send them to the compiler and keep this reference around.
 *   ```js
 *     var element = $compile('<p>{{total}}</p>')(scope);
 *   ```
 *
 * - if on the other hand, you need the element to be cloned, the view reference from the original
 *   example would not point to the clone, but rather to the original template that was cloned. In
 *   this case, you can access the clone via the cloneAttachFn:
 *   ```js
 *     var templateElement = angular.element('<p>{{total}}</p>'),
 *         scope = ....;
 *
 *     var clonedElement = $compile(templateElement)(scope, function(clonedElement, scope) {
 *       //attach the clone to DOM document at the right place
 *     });
 *
 *     //now we have reference to the cloned DOM via `clonedElement`
 *   ```
 *
 *
 * For information on how the compiler works, see the
 * {@link guide/compiler Angular HTML Compiler} section of the Developer Guide.
 *
 * @knownIssue
 *
 * ### Double Compilation
 *
   Double compilation occurs when an already compiled part of the DOM gets
   compiled again. This is an undesired effect and can lead to misbehaving directives, performance issues,
   and memory leaks. Refer to the Compiler Guide {@link guide/compiler#double-compilation-and-how-to-avoid-it
   section on double compilation} for an in-depth explanation and ways to avoid it.
 *
 */

var $compileMinErr = minErr('$compile');

function UNINITIALIZED_VALUE() {}
var _UNINITIALIZED_VALUE = new UNINITIALIZED_VALUE();

/**
 * @ngdoc provider
 * @name $compileProvider
 *
 * @description
 */
$CompileProvider.$inject = ['$provide', '$$sanitizeUriProvider'];
/** @this */
function $CompileProvider($provide, $$sanitizeUriProvider) {
  var hasDirectives = {},
      Suffix = 'Directive',
      COMMENT_DIRECTIVE_REGEXP = /^\s*directive:\s*([\w-]+)\s+(.*)$/,
      CLASS_DIRECTIVE_REGEXP = /(([\w-]+)(?::([^;]+))?;?)/,
      ALL_OR_NOTHING_ATTRS = makeMap('ngSrc,ngSrcset,src,srcset'),
      REQUIRE_PREFIX_REGEXP = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/;

  // Ref: http://developers.whatwg.org/webappapis.html#event-handler-idl-attributes
  // The assumption is that future DOM event attribute names will begin with
  // 'on' and be composed of only English letters.
  var EVENT_HANDLER_ATTR_REGEXP = /^(on[a-z]+|formaction)$/;
  var bindingCache = createMap();

  function parseIsolateBindings(scope, directiveName, isController) {
    var LOCAL_REGEXP = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/;

    var bindings = createMap();

    forEach(scope, function(definition, scopeName) {
      if (definition in bindingCache) {
        bindings[scopeName] = bindingCache[definition];
        return;
      }
      var match = definition.match(LOCAL_REGEXP);

      if (!match) {
        throw $compileMinErr('iscp',
            'Invalid {3} for directive \'{0}\'.' +
            ' Definition: {... {1}: \'{2}\' ...}',
            directiveName, scopeName, definition,
            (isController ? 'controller bindings definition' :
            'isolate scope definition'));
      }

      bindings[scopeName] = {
        mode: match[1][0],
        collection: match[2] === '*',
        optional: match[3] === '?',
        attrName: match[4] || scopeName
      };
      if (match[4]) {
        bindingCache[definition] = bindings[scopeName];
      }
    });

    return bindings;
  }

  function parseDirectiveBindings(directive, directiveName) {
    var bindings = {
      isolateScope: null,
      bindToController: null
    };
    if (isObject(directive.scope)) {
      if (directive.bindToController === true) {
        bindings.bindToController = parseIsolateBindings(directive.scope,
                                                         directiveName, true);
        bindings.isolateScope = {};
      } else {
        bindings.isolateScope = parseIsolateBindings(directive.scope,
                                                     directiveName, false);
      }
    }
    if (isObject(directive.bindToController)) {
      bindings.bindToController =
          parseIsolateBindings(directive.bindToController, directiveName, true);
    }
    if (bindings.bindToController && !directive.controller) {
      // There is no controller
      throw $compileMinErr('noctrl',
            'Cannot bind to controller without directive \'{0}\'s controller.',
            directiveName);
    }
    return bindings;
  }

  function assertValidDirectiveName(name) {
    var letter = name.charAt(0);
    if (!letter || letter !== lowercase(letter)) {
      throw $compileMinErr('baddir', 'Directive/Component name \'{0}\' is invalid. The first character must be a lowercase letter', name);
    }
    if (name !== name.trim()) {
      throw $compileMinErr('baddir',
            'Directive/Component name \'{0}\' is invalid. The name should not contain leading or trailing whitespaces',
            name);
    }
  }

  function getDirectiveRequire(directive) {
    var require = directive.require || (directive.controller && directive.name);

    if (!isArray(require) && isObject(require)) {
      forEach(require, function(value, key) {
        var match = value.match(REQUIRE_PREFIX_REGEXP);
        var name = value.substring(match[0].length);
        if (!name) require[key] = match[0] + key;
      });
    }

    return require;
  }

  function getDirectiveRestrict(restrict, name) {
    if (restrict && !(isString(restrict) && /[EACM]/.test(restrict))) {
      throw $compileMinErr('badrestrict',
          'Restrict property \'{0}\' of directive \'{1}\' is invalid',
          restrict,
          name);
    }

    return restrict || 'EA';
  }

  /**
   * @ngdoc method
   * @name $compileProvider#directive
   * @kind function
   *
   * @description
   * Register a new directive with the compiler.
   *
   * @param {string|Object} name Name of the directive in camel-case (i.e. <code>ngBind</code> which
   *    will match as <code>ng-bind</code>), or an object map of directives where the keys are the
   *    names and the values are the factories.
   * @param {Function|Array} directiveFactory An injectable directive factory function. See the
   *    {@link guide/directive directive guide} and the {@link $compile compile API} for more info.
   * @returns {ng.$compileProvider} Self for chaining.
   */
  this.directive = function registerDirective(name, directiveFactory) {
    assertArg(name, 'name');
    assertNotHasOwnProperty(name, 'directive');
    if (isString(name)) {
      assertValidDirectiveName(name);
      assertArg(directiveFactory, 'directiveFactory');
      if (!hasDirectives.hasOwnProperty(name)) {
        hasDirectives[name] = [];
        $provide.factory(name + Suffix, ['$injector', '$exceptionHandler',
          function($injector, $exceptionHandler) {
            var directives = [];
            forEach(hasDirectives[name], function(directiveFactory, index) {
              try {
                var directive = $injector.invoke(directiveFactory);
                if (isFunction(directive)) {
                  directive = { compile: valueFn(directive) };
                } else if (!directive.compile && directive.link) {
                  directive.compile = valueFn(directive.link);
                }
                directive.priority = directive.priority || 0;
                directive.index = index;
                directive.name = directive.name || name;
                directive.require = getDirectiveRequire(directive);
                directive.restrict = getDirectiveRestrict(directive.restrict, name);
                directive.$$moduleName = directiveFactory.$$moduleName;
                directives.push(directive);
              } catch (e) {
                $exceptionHandler(e);
              }
            });
            return directives;
          }]);
      }
      hasDirectives[name].push(directiveFactory);
    } else {
      forEach(name, reverseParams(registerDirective));
    }
    return this;
  };

  /**
   * @ngdoc method
   * @name $compileProvider#component
   * @module ng
   * @param {string} name Name of the component in camelCase (i.e. `myComp` which will match `<my-comp>`)
   * @param {Object} options Component definition object (a simplified
   *    {@link ng.$compile#directive-definition-object directive definition object}),
   *    with the following properties (all optional):
   *
   *    - `controller` – `{(string|function()=}` – controller constructor function that should be
   *      associated with newly created scope or the name of a {@link ng.$compile#-controller-
   *      registered controller} if passed as a string. An empty `noop` function by default.
   *    - `controllerAs` – `{string=}` – identifier name for to reference the controller in the component's scope.
   *      If present, the controller will be published to scope under the `controllerAs` name.
   *      If not present, this will default to be `$ctrl`.
   *    - `template` – `{string=|function()=}` – html template as a string or a function that
   *      returns an html template as a string which should be used as the contents of this component.
   *      Empty string by default.
   *
   *      If `template` is a function, then it is {@link auto.$injector#invoke injected} with
   *      the following locals:
   *
   *      - `$element` - Current element
   *      - `$attrs` - Current attributes object for the element
   *
   *    - `templateUrl` – `{string=|function()=}` – path or function that returns a path to an html
   *      template that should be used  as the contents of this component.
   *
   *      If `templateUrl` is a function, then it is {@link auto.$injector#invoke injected} with
   *      the following locals:
   *
   *      - `$element` - Current element
   *      - `$attrs` - Current attributes object for the element
   *
   *    - `bindings` – `{object=}` – defines bindings between DOM attributes and component properties.
   *      Component properties are always bound to the component controller and not to the scope.
   *      See {@link ng.$compile#-bindtocontroller- `bindToController`}.
   *    - `transclude` – `{boolean=}` – whether {@link $compile#transclusion content transclusion} is enabled.
   *      Disabled by default.
   *    - `require` - `{Object<string, string>=}` - requires the controllers of other directives and binds them to
   *      this component's controller. The object keys specify the property names under which the required
   *      controllers (object values) will be bound. See {@link ng.$compile#-require- `require`}.
   *    - `$...` – additional properties to attach to the directive factory function and the controller
   *      constructor function. (This is used by the component router to annotate)
   *
   * @returns {ng.$compileProvider} the compile provider itself, for chaining of function calls.
   * @description
   * Register a **component definition** with the compiler. This is a shorthand for registering a special
   * type of directive, which represents a self-contained UI component in your application. Such components
   * are always isolated (i.e. `scope: {}`) and are always restricted to elements (i.e. `restrict: 'E'`).
   *
   * Component definitions are very simple and do not require as much configuration as defining general
   * directives. Component definitions usually consist only of a template and a controller backing it.
   *
   * In order to make the definition easier, components enforce best practices like use of `controllerAs`,
   * `bindToController`. They always have **isolate scope** and are restricted to elements.
   *
   * Here are a few examples of how you would usually define components:
   *
   * ```js
   *   var myMod = angular.module(...);
   *   myMod.component('myComp', {
   *     template: '<div>My name is {{$ctrl.name}}</div>',
   *     controller: function() {
   *       this.name = 'shahar';
   *     }
   *   });
   *
   *   myMod.component('myComp', {
   *     template: '<div>My name is {{$ctrl.name}}</div>',
   *     bindings: {name: '@'}
   *   });
   *
   *   myMod.component('myComp', {
   *     templateUrl: 'views/my-comp.html',
   *     controller: 'MyCtrl',
   *     controllerAs: 'ctrl',
   *     bindings: {name: '@'}
   *   });
   *
   * ```
   * For more examples, and an in-depth guide, see the {@link guide/component component guide}.
   *
   * <br />
   * See also {@link ng.$compileProvider#directive $compileProvider.directive()}.
   */
  this.component = function registerComponent(name, options) {
    var controller = options.controller || function() {};

    function factory($injector) {
      function makeInjectable(fn) {
        if (isFunction(fn) || isArray(fn)) {
          return /** @this */ function(tElement, tAttrs) {
            return $injector.invoke(fn, this, {$element: tElement, $attrs: tAttrs});
          };
        } else {
          return fn;
        }
      }

      var template = (!options.template && !options.templateUrl ? '' : options.template);
      var ddo = {
        controller: controller,
        controllerAs: identifierForController(options.controller) || options.controllerAs || '$ctrl',
        template: makeInjectable(template),
        templateUrl: makeInjectable(options.templateUrl),
        transclude: options.transclude,
        scope: {},
        bindToController: options.bindings || {},
        restrict: 'E',
        require: options.require
      };

      // Copy annotations (starting with $) over to the DDO
      forEach(options, function(val, key) {
        if (key.charAt(0) === '$') ddo[key] = val;
      });

      return ddo;
    }

    // TODO(pete) remove the following `forEach` before we release 1.6.0
    // The component-router@0.2.0 looks for the annotations on the controller constructor
    // Nothing in Angular looks for annotations on the factory function but we can't remove
    // it from 1.5.x yet.

    // Copy any annotation properties (starting with $) over to the factory and controller constructor functions
    // These could be used by libraries such as the new component router
    forEach(options, function(val, key) {
      if (key.charAt(0) === '$') {
        factory[key] = val;
        // Don't try to copy over annotations to named controller
        if (isFunction(controller)) controller[key] = val;
      }
    });

    factory.$inject = ['$injector'];

    return this.directive(name, factory);
  };


  /**
   * @ngdoc method
   * @name $compileProvider#aHrefSanitizationWhitelist
   * @kind function
   *
   * @description
   * Retrieves or overrides the default regular expression that is used for whitelisting of safe
   * urls during a[href] sanitization.
   *
   * The sanitization is a security measure aimed at preventing XSS attacks via html links.
   *
   * Any url about to be assigned to a[href] via data-binding is first normalized and turned into
   * an absolute url. Afterwards, the url is matched against the `aHrefSanitizationWhitelist`
   * regular expression. If a match is found, the original url is written into the dom. Otherwise,
   * the absolute url is prefixed with `'unsafe:'` string and only then is it written into the DOM.
   *
   * @param {RegExp=} regexp New regexp to whitelist urls with.
   * @returns {RegExp|ng.$compileProvider} Current RegExp if called without value or self for
   *    chaining otherwise.
   */
  this.aHrefSanitizationWhitelist = function(regexp) {
    if (isDefined(regexp)) {
      $$sanitizeUriProvider.aHrefSanitizationWhitelist(regexp);
      return this;
    } else {
      return $$sanitizeUriProvider.aHrefSanitizationWhitelist();
    }
  };


  /**
   * @ngdoc method
   * @name $compileProvider#imgSrcSanitizationWhitelist
   * @kind function
   *
   * @description
   * Retrieves or overrides the default regular expression that is used for whitelisting of safe
   * urls during img[src] sanitization.
   *
   * The sanitization is a security measure aimed at prevent XSS attacks via html links.
   *
   * Any url about to be assigned to img[src] via data-binding is first normalized and turned into
   * an absolute url. Afterwards, the url is matched against the `imgSrcSanitizationWhitelist`
   * regular expression. If a match is found, the original url is written into the dom. Otherwise,
   * the absolute url is prefixed with `'unsafe:'` string and only then is it written into the DOM.
   *
   * @param {RegExp=} regexp New regexp to whitelist urls with.
   * @returns {RegExp|ng.$compileProvider} Current RegExp if called without value or self for
   *    chaining otherwise.
   */
  this.imgSrcSanitizationWhitelist = function(regexp) {
    if (isDefined(regexp)) {
      $$sanitizeUriProvider.imgSrcSanitizationWhitelist(regexp);
      return this;
    } else {
      return $$sanitizeUriProvider.imgSrcSanitizationWhitelist();
    }
  };

  /**
   * @ngdoc method
   * @name  $compileProvider#debugInfoEnabled
   *
   * @param {boolean=} enabled update the debugInfoEnabled state if provided, otherwise just return the
   * current debugInfoEnabled state
   * @returns {*} current value if used as getter or itself (chaining) if used as setter
   *
   * @kind function
   *
   * @description
   * Call this method to enable/disable various debug runtime information in the compiler such as adding
   * binding information and a reference to the current scope on to DOM elements.
   * If enabled, the compiler will add the following to DOM elements that have been bound to the scope
   * * `ng-binding` CSS class
   * * `$binding` data property containing an array of the binding expressions
   *
   * You may want to disable this in production for a significant performance boost. See
   * {@link guide/production#disabling-debug-data Disabling Debug Data} for more.
   *
   * The default value is true.
   */
  var debugInfoEnabled = true;
  this.debugInfoEnabled = function(enabled) {
    if (isDefined(enabled)) {
      debugInfoEnabled = enabled;
      return this;
    }
    return debugInfoEnabled;
  };

  /**
   * @ngdoc method
   * @name  $compileProvider#preAssignBindingsEnabled
   *
   * @param {boolean=} enabled update the preAssignBindingsEnabled state if provided, otherwise just return the
   * current preAssignBindingsEnabled state
   * @returns {*} current value if used as getter or itself (chaining) if used as setter
   *
   * @kind function
   *
   * @description
   * Call this method to enable/disable whether directive controllers are assigned bindings before
   * calling the controller's constructor.
   * If enabled (true), the compiler assigns the value of each of the bindings to the
   * properties of the controller object before the constructor of this object is called.
   *
   * If disabled (false), the compiler calls the constructor first before assigning bindings.
   *
   * The default value is true in Angular 1.5.x but will switch to false in Angular 1.6.x.
   */
  var preAssignBindingsEnabled = false;
  this.preAssignBindingsEnabled = function(enabled) {
    if (isDefined(enabled)) {
      preAssignBindingsEnabled = enabled;
      return this;
    }
    return preAssignBindingsEnabled;
  };


  var TTL = 10;
  /**
   * @ngdoc method
   * @name $compileProvider#onChangesTtl
   * @description
   *
   * Sets the number of times `$onChanges` hooks can trigger new changes before giving up and
   * assuming that the model is unstable.
   *
   * The current default is 10 iterations.
   *
   * In complex applications it's possible that dependencies between `$onChanges` hooks and bindings will result
   * in several iterations of calls to these hooks. However if an application needs more than the default 10
   * iterations to stabilize then you should investigate what is causing the model to continuously change during
   * the `$onChanges` hook execution.
   *
   * Increasing the TTL could have performance implications, so you should not change it without proper justification.
   *
   * @param {number} limit The number of `$onChanges` hook iterations.
   * @returns {number|object} the current limit (or `this` if called as a setter for chaining)
   */
  this.onChangesTtl = function(value) {
    if (arguments.length) {
      TTL = value;
      return this;
    }
    return TTL;
  };

  var commentDirectivesEnabledConfig = true;
  /**
   * @ngdoc method
   * @name $compileProvider#commentDirectivesEnabled
   * @description
   *
   * It indicates to the compiler
   * whether or not directives on comments should be compiled.
   * Defaults to `true`.
   *
   * Calling this function with false disables the compilation of directives
   * on comments for the whole application.
   * This results in a compilation performance gain,
   * as the compiler doesn't have to check comments when looking for directives.
   * This should however only be used if you are sure that no comment directives are used in
   * the application (including any 3rd party directives).
   *
   * @param {boolean} enabled `false` if the compiler may ignore directives on comments
   * @returns {boolean|object} the current value (or `this` if called as a setter for chaining)
   */
  this.commentDirectivesEnabled = function(value) {
    if (arguments.length) {
      commentDirectivesEnabledConfig = value;
      return this;
    }
    return commentDirectivesEnabledConfig;
  };


  var cssClassDirectivesEnabledConfig = true;
  /**
   * @ngdoc method
   * @name $compileProvider#cssClassDirectivesEnabled
   * @description
   *
   * It indicates to the compiler
   * whether or not directives on element classes should be compiled.
   * Defaults to `true`.
   *
   * Calling this function with false disables the compilation of directives
   * on element classes for the whole application.
   * This results in a compilation performance gain,
   * as the compiler doesn't have to check element classes when looking for directives.
   * This should however only be used if you are sure that no class directives are used in
   * the application (including any 3rd party directives).
   *
   * @param {boolean} enabled `false` if the compiler may ignore directives on element classes
   * @returns {boolean|object} the current value (or `this` if called as a setter for chaining)
   */
  this.cssClassDirectivesEnabled = function(value) {
    if (arguments.length) {
      cssClassDirectivesEnabledConfig = value;
      return this;
    }
    return cssClassDirectivesEnabledConfig;
  };

  this.$get = [
            '$injector', '$interpolate', '$exceptionHandler', '$templateRequest', '$parse',
            '$controller', '$rootScope', '$sce', '$animate', '$$sanitizeUri',
    function($injector,   $interpolate,   $exceptionHandler,   $templateRequest,   $parse,
             $controller,   $rootScope,   $sce,   $animate,   $$sanitizeUri) {

    var SIMPLE_ATTR_NAME = /^\w/;
    var specialAttrHolder = window.document.createElement('div');


    var commentDirectivesEnabled = commentDirectivesEnabledConfig;
    var cssClassDirectivesEnabled = cssClassDirectivesEnabledConfig;


    var onChangesTtl = TTL;
    // The onChanges hooks should all be run together in a single digest
    // When changes occur, the call to trigger their hooks will be added to this queue
    var onChangesQueue;

    // This function is called in a $$postDigest to trigger all the onChanges hooks in a single digest
    function flushOnChangesQueue() {
      try {
        if (!(--onChangesTtl)) {
          // We have hit the TTL limit so reset everything
          onChangesQueue = undefined;
          throw $compileMinErr('infchng', '{0} $onChanges() iterations reached. Aborting!\n', TTL);
        }
        // We must run this hook in an apply since the $$postDigest runs outside apply
        $rootScope.$apply(function() {
          var errors = [];
          for (var i = 0, ii = onChangesQueue.length; i < ii; ++i) {
            try {
              onChangesQueue[i]();
            } catch (e) {
              errors.push(e);
            }
          }
          // Reset the queue to trigger a new schedule next time there is a change
          onChangesQueue = undefined;
          if (errors.length) {
            throw errors;
          }
        });
      } finally {
        onChangesTtl++;
      }
    }


    function Attributes(element, attributesToCopy) {
      if (attributesToCopy) {
        var keys = Object.keys(attributesToCopy);
        var i, l, key;

        for (i = 0, l = keys.length; i < l; i++) {
          key = keys[i];
          this[key] = attributesToCopy[key];
        }
      } else {
        this.$attr = {};
      }

      this.$$element = element;
    }

    Attributes.prototype = {
      /**
       * @ngdoc method
       * @name $compile.directive.Attributes#$normalize
       * @kind function
       *
       * @description
       * Converts an attribute name (e.g. dash/colon/underscore-delimited string, optionally prefixed with `x-` or
       * `data-`) to its normalized, camelCase form.
       *
       * Also there is special case for Moz prefix starting with upper case letter.
       *
       * For further information check out the guide on {@link guide/directive#matching-directives Matching Directives}
       *
       * @param {string} name Name to normalize
       */
      $normalize: directiveNormalize,


      /**
       * @ngdoc method
       * @name $compile.directive.Attributes#$addClass
       * @kind function
       *
       * @description
       * Adds the CSS class value specified by the classVal parameter to the element. If animations
       * are enabled then an animation will be triggered for the class addition.
       *
       * @param {string} classVal The className value that will be added to the element
       */
      $addClass: function(classVal) {
        if (classVal && classVal.length > 0) {
          $animate.addClass(this.$$element, classVal);
        }
      },

      /**
       * @ngdoc method
       * @name $compile.directive.Attributes#$removeClass
       * @kind function
       *
       * @description
       * Removes the CSS class value specified by the classVal parameter from the element. If
       * animations are enabled then an animation will be triggered for the class removal.
       *
       * @param {string} classVal The className value that will be removed from the element
       */
      $removeClass: function(classVal) {
        if (classVal && classVal.length > 0) {
          $animate.removeClass(this.$$element, classVal);
        }
      },

      /**
       * @ngdoc method
       * @name $compile.directive.Attributes#$updateClass
       * @kind function
       *
       * @description
       * Adds and removes the appropriate CSS class values to the element based on the difference
       * between the new and old CSS class values (specified as newClasses and oldClasses).
       *
       * @param {string} newClasses The current CSS className value
       * @param {string} oldClasses The former CSS className value
       */
      $updateClass: function(newClasses, oldClasses) {
        var toAdd = tokenDifference(newClasses, oldClasses);
        if (toAdd && toAdd.length) {
          $animate.addClass(this.$$element, toAdd);
        }

        var toRemove = tokenDifference(oldClasses, newClasses);
        if (toRemove && toRemove.length) {
          $animate.removeClass(this.$$element, toRemove);
        }
      },

      /**
       * Set a normalized attribute on the element in a way such that all directives
       * can share the attribute. This function properly handles boolean attributes.
       * @param {string} key Normalized key. (ie ngAttribute)
       * @param {string|boolean} value The value to set. If `null` attribute will be deleted.
       * @param {boolean=} writeAttr If false, does not write the value to DOM element attribute.
       *     Defaults to true.
       * @param {string=} attrName Optional none normalized name. Defaults to key.
       */
      $set: function(key, value, writeAttr, attrName) {
        // TODO: decide whether or not to throw an error if "class"
        //is set through this function since it may cause $updateClass to
        //become unstable.

        var node = this.$$element[0],
            booleanKey = getBooleanAttrName(node, key),
            aliasedKey = getAliasedAttrName(key),
            observer = key,
            nodeName;

        if (booleanKey) {
          this.$$element.prop(key, value);
          attrName = booleanKey;
        } else if (aliasedKey) {
          this[aliasedKey] = value;
          observer = aliasedKey;
        }

        this[key] = value;

        // translate normalized key to actual key
        if (attrName) {
          this.$attr[key] = attrName;
        } else {
          attrName = this.$attr[key];
          if (!attrName) {
            this.$attr[key] = attrName = snake_case(key, '-');
          }
        }

        nodeName = nodeName_(this.$$element);

        if ((nodeName === 'a' && (key === 'href' || key === 'xlinkHref')) ||
            (nodeName === 'img' && key === 'src')) {
          // sanitize a[href] and img[src] values
          this[key] = value = $$sanitizeUri(value, key === 'src');
        } else if (nodeName === 'img' && key === 'srcset' && isDefined(value)) {
          // sanitize img[srcset] values
          var result = '';

          // first check if there are spaces because it's not the same pattern
          var trimmedSrcset = trim(value);
          //                (   999x   ,|   999w   ,|   ,|,   )
          var srcPattern = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/;
          var pattern = /\s/.test(trimmedSrcset