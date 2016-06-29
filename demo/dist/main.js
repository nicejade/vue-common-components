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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Vue = __webpack_require__(1)
	var VueRouter = __webpack_require__(3)
	var rootView = __webpack_require__(4)
	Vue.use(VueRouter)
	
	var router = new VueRouter({
		hashbang: false,
		transitionOnLoad: true
	});
	
	var routerMap = {
	    "/": {
	        name: 'index',
	        component: __webpack_require__(12)
	    },
	    '/index':{
	        name: 'index',
	        component: __webpack_require__(4)
	    },
	    '/popupToast':{
	        name: 'popupToast',
	        component: __webpack_require__(17)
	    },
	    '/normalDialog':{
	        name: 'normalDialog',
	        component: __webpack_require__(35)
	    },
	    '/strongDialog':{
	        name: 'strongDialog',
	        component: __webpack_require__(45)
	    },
	    '/tabBarWithJq':{
	        name: 'tabBarWithJq',
	        component: __webpack_require__(53)
	    },
	    '/tabBarWithRouter/':{
	        name: 'tabBarWithRouter',
	        component: __webpack_require__(61)
	    },
	    '/spanFlexTable':{
	        name: 'spanFlexTable',
	        component: __webpack_require__(70)
	    },
	    '/countDown':{
	        name: 'countDown',
	        component: __webpack_require__(80)
	    },
	    '/commonTable':{
	        name: 'commonTable',
	        component: __webpack_require__(88)
	    },
	
	
	    '/turnTable':{
	        name: 'turnTable',
	        component: __webpack_require__(98)
	    },
	    '/formDialog':{
	        name: 'formDialog',
	        component: __webpack_require__(106)
	    },
		'/shaveLottery':{
	        name: 'shaveLottery',
	        component: __webpack_require__(114)
	    }
	}
	
	if (!Object.assign) {
	  Object.defineProperty(Object, "assign", {
	    enumerable: false,
	    configurable: true,
	    writable: true,
	    value: function(target, firstSource) {
	      "use strict";
	      if (target === undefined || target === null)
	        throw new TypeError("Cannot convert first argument to object");
	      var to = Object(target);
	      for (var i = 1; i < arguments.length; i++) {
	        var nextSource = arguments[i];
	        if (nextSource === undefined || nextSource === null) continue;
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	          var nextKey = keysArray[nextIndex];
	          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	          if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
	        }
	      }
	      return to;
	    }
	  });
	}
	
	/*-----------------------------------tabBarWithRouter-------------------------------Start*/
	var tabbarConfig = __webpack_require__(68)();
	
	var tabbarRouter = {
	    '/tabBarWithRouter':{
	        name: 'tabBarWithRouter',
	        component:  __webpack_require__(61),
	        subRoutes:{
	            '/':{
	                component: __webpack_require__(125)
	            }
	        }
	    }
	}
	
	for(var key in tabbarConfig){
	    var index = tabbarConfig[key]['index']
	    var components = tabbarConfig[key]['components']
	    tabbarRouter['/tabBarWithRouter'].subRoutes[index] = {
	        component: __webpack_require__(127)(components)
	    }
	}
	/*-----------------------------------tabBarWithRouter---------------------------------End*/
	
	routerMap = Object.assign(routerMap, tabbarRouter)
	
	router.map(routerMap);
	
	router.start(rootView, '#root')


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*!
	 * Vue.js v1.0.24
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';
	
	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;
	
	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	function _toString(value) {
	  return value == null ? '' : value.toString();
	}
	
	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */
	
	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}
	
	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */
	
	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}
	
	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */
	
	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	
	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	
	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}
	
	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var classifyRE = /(?:^|[-_\/])(\w)/g;
	
	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */
	
	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}
	
	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}
	
	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */
	
	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}
	
	var hasProto = ('__proto__' in {});
	
	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var isWechat = UA && UA.indexOf('micromessenger') > 0;
	
	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;
	
	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();
	
	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}
	
	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}
	
	var p = Cache.prototype;
	
	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */
	
	p.put = function (key, value) {
	  var removed;
	  if (this.size === this.limit) {
	    removed = this.shift();
	  }
	
	  var entry = this.get(key, true);
	  if (!entry) {
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;
	
	  return removed;
	};
	
	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */
	
	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};
	
	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */
	
	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};
	
	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;
	
	/**
	 * Parser state
	 */
	
	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */
	
	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}
	
	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */
	
	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}
	
	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */
	
	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }
	
	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};
	
	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }
	
	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  cache$1.put(s, dir);
	  return dir;
	}
	
	var directive = Object.freeze({
	  parseDirective: parseDirective
	});
	
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */
	
	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}
	
	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}
	
	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */
	
	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}
	
	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */
	
	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}
	
	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */
	
	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}
	
	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}
	
	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});
	
	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];
	
	var config = Object.defineProperties({
	
	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */
	
	  debug: false,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
	  /**
	   * Whether to use async rendering.
	   */
	
	  async: true,
	
	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */
	
	  warnExpressionErrors: true,
	
	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */
	
	  devtools: process.env.NODE_ENV !== 'production',
	
	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */
	
	  _delimitersChanged: true,
	
	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */
	
	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],
	
	  /**
	   * prop binding modes
	   */
	
	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },
	
	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */
	
	  _maxUpdateCount: 100
	
	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */
	
	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});
	
	var warn = undefined;
	var formatComponentName = undefined;
	
	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	
	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };
	
	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}
	
	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}
	
	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}
	
	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}
	
	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}
	
	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});
	
	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */
	
	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}
	
	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}
	
	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */
	
	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}
	
	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */
	
	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}
	
	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */
	
	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}
	
	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}
	
	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}
	
	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */
	
	function remove(el) {
	  el.parentNode.removeChild(el);
	}
	
	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}
	
	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */
	
	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}
	
	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */
	
	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}
	
	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}
	
	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */
	
	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}
	
	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}
	
	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}
	
	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */
	
	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}
	
	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */
	
	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}
	
	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}
	
	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */
	
	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}
	
	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */
	
	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}
	
	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */
	
	var refRE = /^v-ref:/;
	
	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}
	
	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */
	
	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}
	
	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */
	
	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}
	
	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isFragment(node) {
	  return node && node.nodeType === 11;
	}
	
	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */
	
	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}
	
	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;
	
	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)
	      );
	    }
	  };
	}
	
	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */
	
	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}
	
	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */
	
	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */
	
	var strats = config.optionMergeStrategies = Object.create(null);
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	
	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}
	
	/**
	 * Data
	 */
	
	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};
	
	/**
	 * El
	 */
	
	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	
	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	
	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	
	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};
	
	/**
	 * Other object hashes.
	 */
	
	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};
	
	/**
	 * Default strategy.
	 */
	
	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */
	
	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */
	
	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}
	
	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */
	
	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */
	
	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */
	
	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}
	
	var uid$1 = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */
	
	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */
	
	var shouldConvert = true;
	
	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */
	
	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new Dep();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	
	
	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIos: isIos,
		isWechat: isWechat,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});
	
	var uid = 0;
	
	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */
	
	  Vue.prototype._init = function (options) {
	    options = options || {};
	
	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives
	
	    // a uid
	    this._uid = uid++;
	
	    // a flag to avoid this being observed
	    this._isVue = true;
	
	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization
	
	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}
	
	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;
	
	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;
	
	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;
	
	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }
	
	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }
	
	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);
	
	    // set ref
	    this._updateRef();
	
	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};
	
	    // call init hook
	    this._callHook('init');
	
	    // initialize data observation and scope inheritance.
	    this._initState();
	
	    // setup event system and option events.
	    this._initEvents();
	
	    // call created hook
	    this._callHook('created');
	
	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}
	
	var pathCache = new Cache(1000);
	
	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;
	
	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;
	
	var pathStateMachine = [];
	
	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};
	
	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};
	
	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};
	
	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};
	
	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};
	
	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */
	
	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }
	
	  var code = ch.charCodeAt(0);
	
	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;
	
	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';
	
	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }
	
	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }
	
	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }
	
	  return 'else';
	}
	
	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */
	
	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}
	
	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;
	
	  var actions = [];
	
	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };
	
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };
	
	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };
	
	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };
	
	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }
	
	  while (mode != null) {
	    index++;
	    c = path[index];
	
	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }
	
	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;
	
	    if (transition === ERROR) {
	      return; // parse error
	    }
	
	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }
	
	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}
	
	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}
	
	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */
	
	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}
	
	/**
	 * Warn against setting non-existent root path on a vm.
	 */
	
	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}
	
	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */
	
	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}
	
	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});
	
	var expressionCache = new Cache(1000);
	
	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;
	
	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */
	
	var saved = [];
	
	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */
	
	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}
	
	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */
	
	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}
	
	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */
	
	function restore(str, i) {
	  return saved[i];
	}
	
	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */
	
	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}
	
	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */
	
	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}
	
	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */
	
	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}
	
	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */
	
	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}
	
	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}
	
	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});
	
	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	
	/**
	 * Reset the batcher's state.
	 */
	
	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	
	function flushBatcherQueue() {
	  var _again = true;
	
	  _function: while (_again) {
	    _again = false;
	
	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}
	
	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */
	
	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */
	
	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}
	
	var uid$2 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */
	
	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */
	
	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if (isA || isO) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}
	
	var text$1 = {
	
	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },
	
	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};
	
	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);
	
	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};
	
	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];
	
	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];
	
	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}
	
	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	
	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */
	
	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }
	
	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	
	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');
	
	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }
	
	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}
	
	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */
	
	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}
	
	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();
	
	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();
	
	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */
	
	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */
	
	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;
	
	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }
	
	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }
	
	  return frag && shouldClone ? cloneNode(frag) : frag;
	}
	
	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});
	
	var html = {
	
	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },
	
	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },
	
	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};
	
	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}
	
	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */
	
	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};
	
	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, single node version
	 */
	
	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, multi-nodes version
	 */
	
	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Prepare the fragment for removal.
	 */
	
	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};
	
	/**
	 * Destroy the fragment.
	 */
	
	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};
	
	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}
	
	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}
	
	var linkerCache = new Cache(5000);
	
	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}
	
	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */
	
	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};
	
	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;
	
	var uid$3 = 0;
	
	var vFor = {
	
	  priority: FOR,
	  terminal: true,
	
	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],
	
	  bind: function bind() {
	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }
	
	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }
	
	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;
	
	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';
	
	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);
	
	    // cache
	    this.cache = Object.create(null);
	
	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },
	
	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },
	
	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */
	
	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');
	
	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;
	
	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }
	
	    // we're done for the initial render.
	    if (init) {
	      return;
	    }
	
	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }
	
	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },
	
	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */
	
	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },
	
	  /**
	   * Update the v-ref on owner vm.
	   */
	
	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },
	
	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */
	
	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },
	
	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */
	
	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },
	
	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */
	
	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },
	
	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */
	
	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },
	
	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */
	
	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },
	
	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */
	
	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },
	
	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */
	
	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },
	
	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */
	
	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },
	
	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */
	
	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },
	
	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */
	
	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};
	
	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */
	
	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}
	
	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */
	
	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}
	
	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */
	
	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}
	
	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */
	
	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}
	
	var vIf = {
	
	  priority: IF,
	  terminal: true,
	
	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },
	
	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },
	
	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};
	
	var show = {
	
	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },
	
	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },
	
	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};
	
	var text$2 = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;
	
	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }
	
	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }
	
	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };
	
	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }
	
	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }
	
	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }
	
	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.value = _toString(value);
	  },
	
	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};
	
	var radio = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };
	
	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);
	
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};
	
	var select = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };
	
	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');
	
	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);
	
	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }
	
	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },
	
	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};
	
	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */
	
	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */
	
	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}
	
	var checkbox = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };
	
	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }
	
	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };
	
	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};
	
	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};
	
	var model = {
	
	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],
	
	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */
	
	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },
	
	  /**
	   * Check read/write filter stats.
	   */
	
	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },
	
	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};
	
	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}
	
	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}
	
	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}
	
	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}
	
	var on$1 = {
	
	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,
	
	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },
	
	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }
	
	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }
	
	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }
	
	    this.reset();
	    this.handler = handler;
	
	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },
	
	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },
	
	  unbind: function unbind() {
	    this.reset();
	  }
	};
	
	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);
	
	var testEl = null;
	
	var style = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },
	
	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }
	
	};
	
	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}
	
	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}
	
	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;
	
	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;
	
	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};
	
	var bind$1 = {
	
	  priority: BIND,
	
	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }
	
	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }
	
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }
	
	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  // share object handler with v-bind:class
	  handleObject: style.handleObject,
	
	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;
	
	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};
	
	var el = {
	
	  priority: EL,
	
	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },
	
	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};
	
	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};
	
	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};
	
	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};
	
	var vClass = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },
	
	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },
	
	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};
	
	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */
	
	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}
	
	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */
	
	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}
	
	var component = {
	
	  priority: COMPONENT,
	
	  params: ['keep-alive', 'transition-mode', 'inline-template'],
	
	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */
	
	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },
	
	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */
	
	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },
	
	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */
	
	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },
	
	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */
	
	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },
	
	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */
	
	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },
	
	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */
	
	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },
	
	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */
	
	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },
	
	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */
	
	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },
	
	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */
	
	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },
	
	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */
	
	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },
	
	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */
	
	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },
	
	  /**
	   * Unbind.
	   */
	
	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};
	
	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */
	
	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}
	
	var propBindingModes = config._propBindingModes;
	var empty = {};
	
	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;
	
	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */
	
	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;
	
	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }
	
	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }
	
	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };
	
	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;
	
	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}
	
	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */
	
	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}
	
	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */
	
	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}
	
	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}
	
	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}
	
	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */
	
	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}
	
	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */
	
	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}
	
	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */
	
	function coerceProp(prop, value) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  // coerce is a function
	  return coerce(value);
	}
	
	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */
	
	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}
	
	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */
	
	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}
	
	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}
	
	var bindingModes = config._propBindingModes;
	
	var propDef = {
	
	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;
	
	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });
	
	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);
	
	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },
	
	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};
	
	var queue$1 = [];
	var queued = false;
	
	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */
	
	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}
	
	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */
	
	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}
	
	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';
	
	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */
	
	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};
	
	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}
	
	var p$1 = Transition.prototype;
	
	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */
	
	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};
	
	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */
	
	p$1.enterNextTick = function () {
	  var _this = this;
	
	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};
	
	/**
	 * The "cleanup" phase of an entering transition.
	 */
	
	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};
	
	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */
	
	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};
	
	/**
	 * The "nextTick" phase of a leaving transition.
	 */
	
	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};
	
	/**
	 * The "cleanup" phase of a leaving transition.
	 */
	
	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};
	
	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */
	
	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};
	
	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */
	
	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};
	
	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */
	
	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};
	
	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */
	
	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};
	
	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};
	
	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */
	
	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}
	
	var transition$1 = {
	
	  priority: TRANSITION,
	
	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};
	
	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};
	
	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;
	
	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;
	
	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */
	
	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;
	
	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */
	
	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}
	
	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */
	
	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}
	
	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */
	
	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}
	
	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */
	
	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}
	
	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */
	
	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}
	
	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */
	
	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}
	
	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */
	
	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;
	
	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }
	
	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }
	
	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);
	
	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}
	
	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}
	
	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}
	
	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */
	
	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }
	
	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }
	
	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }
	
	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}
	
	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */
	
	function removeText(vm, node) {
	  remove(node);
	}
	
	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */
	
	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}
	
	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */
	
	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}
	
	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}
	
	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */
	
	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}
	
	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */
	
	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}
	
	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}
	
	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */
	
	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	
	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }
	
	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}
	
	function skip() {}
	skip.terminal = true;
	
	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */
	
	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}
	
	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */
	
	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');
	
	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else
	
	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else
	
	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else
	
	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else
	
	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];
	
	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }
	
	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }
	
	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */
	
	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }
	
	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}
	
	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */
	
	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}
	
	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */
	
	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}
	
	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */
	
	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}
	
	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}
	
	var specialCharRE = /[^\w\-:\.]/;
	
	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}
	
	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}
	
	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */
	
	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}
	
	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */
	
	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}
	
	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */
	
	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}
	
	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */
	
	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}
	
	
	
	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});
	
	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */
	
	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });
	
	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */
	
	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };
	
	  /**
	   * Initialize props.
	   */
	
	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };
	
	  /**
	   * Initialize the data.
	   */
	
	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };
	
	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */
	
	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };
	
	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };
	
	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };
	
	  /**
	   * Force update on every watcher in scope.
	   */
	
	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };
	
	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */
	
	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };
	
	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }
	
	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */
	
	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };
	
	  /**
	   * Initialize meta information like $index, $key & $value.
	   */
	
	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}
	
	var eventRE = /^v-on:|^@/;
	
	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */
	
	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };
	
	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */
	
	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }
	
	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */
	
	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }
	
	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */
	
	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }
	
	  /**
	   * Setup recursive attached/detached calls
	   */
	
	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };
	
	  /**
	   * Callback to recursively call attached hook on children
	   */
	
	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }
	
	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }
	
	  /**
	   * Callback to recursively call detached hook on children
	   */
	
	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }
	
	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }
	
	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */
	
	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}
	
	function noop() {}
	
	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}
	
	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */
	
	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;
	
	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }
	
	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }
	
	  // setup directive params
	  this._setupParams();
	
	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;
	
	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};
	
	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */
	
	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};
	
	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */
	
	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};
	
	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */
	
	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};
	
	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */
	
	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};
	
	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */
	
	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};
	
	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */
	
	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};
	
	/**
	 * Teardown the watcher and call unbind.
	 */
	
	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};
	
	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */
	
	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };
	
	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */
	
	  Vue.prototype._compile = function (el) {
	    var options = this.$options;
	
	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);
	
	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }
	
	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);
	
	    // resolve slot distribution
	    resolveSlots(this, options._content);
	
	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }
	
	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);
	
	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };
	
	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }
	
	    this._isCompiled = true;
	    this._callHook('compiled');
	  };
	
	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */
	
	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };
	
	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */
	
	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };
	
	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */
	
	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }
	
	    var destroyReady;
	    var pendingRemoval;
	
	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };
	
	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }
	
	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }
	
	    destroyReady = true;
	    cleanupIfPossible();
	  };
	
	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */
	
	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}
	
	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */
	
	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };
	
	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */
	
	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}
	
	var filterRE$1 = /[^|]\|[^|]/;
	
	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */
	
	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };
	
	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */
	
	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };
	
	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };
	
	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */
	
	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };
	
	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */
	
	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };
	
	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */
	
	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };
	
	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */
	
	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };
	
	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */
	
	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}
	
	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };
	
	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };
	
	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };
	
	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };
	
	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */
	
	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }
	
	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */
	
	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }
	
	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }
	
	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }
	
	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}
	
	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };
	
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };
	
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */
	
	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };
	
	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };
	
	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */
	
	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}
	
	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */
	
	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };
	
	  /**
	   * Mark an instance as ready.
	   */
	
	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }
	
	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */
	
	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };
	
	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */
	
	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}
	
	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */
	
	function Vue(options) {
	  this._init(options);
	}
	
	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);
	
	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);
	
	var slot = {
	
	  priority: SLOT,
	  params: ['name'],
	
	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },
	
	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },
	
	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },
	
	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};
	
	var partial = {
	
	  priority: PARTIAL,
	
	  params: ['name'],
	
	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },
	
	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },
	
	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};
	
	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};
	
	var convertArray = vFor._postProcess;
	
	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */
	
	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */
	
	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */
	
	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);
	
	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }
	
	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }
	
	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }
	
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}
	
	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */
	
	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}
	
	var digitsRE = /(\d{3})(?=\d)/g;
	
	// asset collections must be a plain object.
	var filters = {
	
	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,
	
	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */
	
	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },
	
	  /**
	   * 'abc' => 'Abc'
	   */
	
	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },
	
	  /**
	   * 'abc' => 'ABC'
	   */
	
	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },
	
	  /**
	   * 'AbC' => 'abc'
	   */
	
	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },
	
	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */
	
	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },
	
	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */
	
	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },
	
	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */
	
	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};
	
	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */
	
	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };
	
	  /**
	   * Expose useful internals
	   */
	
	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;
	
	  /**
	   * The following are exposed for advanced usage / plugins
	   */
	
	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };
	
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */
	
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };
	
	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */
	
	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }
	
	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */
	
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };
	
	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */
	
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };
	
	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */
	
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	
	  // expose internal transition API
	  extend(Vue.transition, transition);
	}
	
	installGlobalAPI(Vue);
	
	Vue.version = '1.0.24';
	
	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);
	
	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.13
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';
	
	  var babelHelpers = {};
	
	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }
	
	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;
	
	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }
	
	      this.matcher.add(this.path, target);
	
	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };
	
	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }
	
	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },
	
	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;
	
	      var match = generateMatch(path, matcher, delegate);
	
	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }
	
	      callback(match);
	    }
	  };
	
	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;
	
	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }
	
	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }
	
	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }
	
	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;
	
	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);
	
	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }
	
	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();
	
	    callback(generateMatch("", matcher, this.delegate));
	
	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }
	
	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
	
	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
	
	  var noWarning = false;
	  function warn(msg) {
	    if (!noWarning && typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }
	
	  function tryDecode(uri, asComponent) {
	    try {
	      return asComponent ? decodeURIComponent(uri) : decodeURI(uri);
	    } catch (e) {
	      warn('malformed URI' + (asComponent ? ' component: ' : ': ') + uri);
	    }
	  }
	
	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }
	
	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat
	
	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;
	
	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },
	
	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },
	
	    generate: function generate() {
	      return this.string;
	    }
	  };
	
	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },
	
	    regex: function regex() {
	      return "([^/]+)";
	    },
	
	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };
	
	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },
	
	    regex: function regex() {
	      return "(.+)";
	    },
	
	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };
	
	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };
	
	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }
	
	    var segments = route.split("/"),
	        results = [];
	
	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';
	
	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;
	
	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }
	
	    specificity.val = +specificity.val;
	
	    return results;
	  }
	
	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.
	
	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }
	
	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;
	
	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];
	
	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
	
	        if (isEqual) {
	          return child;
	        }
	      }
	    },
	
	    put: function put(charSpec) {
	      var state;
	
	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }
	
	      // Make a new state for the character spec
	      state = new State(charSpec);
	
	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);
	
	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }
	
	      // Return the new state
	      return state;
	    },
	
	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;
	
	      // DEBUG "  " + debugState(this)
	      var returned = [];
	
	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];
	
	        charSpec = child.charSpec;
	
	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }
	
	      return returned;
	    }
	
	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };
	
	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }
	
	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/
	
	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }
	
	  function recognizeChar(states, ch) {
	    var nextStates = [];
	
	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];
	
	      nextStates = nextStates.concat(state.match(ch));
	    }
	
	    return nextStates;
	  }
	
	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };
	
	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });
	
	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);
	
	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};
	
	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }
	
	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }
	
	    return result;
	  }
	
	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;
	
	      currentState = currentState.put(ch);
	    });
	
	    return currentState;
	  }
	
	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return tryDecode(part, true);
	  }
	
	  // The main interface
	
	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };
	
	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;
	
	      var isEmpty = true;
	
	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];
	
	        var segments = parse(route.path, names, specificity);
	
	        allSegments = allSegments.concat(segments);
	
	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];
	
	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }
	
	          isEmpty = false;
	
	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";
	
	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }
	
	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }
	
	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }
	
	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;
	
	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },
	
	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }
	
	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }
	
	      return result;
	    },
	
	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },
	
	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }
	
	      var segments = route.segments;
	
	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];
	
	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }
	
	        output += "/";
	        output += segment.generate(params);
	      }
	
	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }
	
	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }
	
	      return output;
	    },
	
	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }
	
	      if (pairs.length === 0) {
	        return '';
	      }
	
	      return "?" + pairs.join("&");
	    },
	
	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },
	
	    recognize: function recognize(path, silent) {
	      noWarning = silent;
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;
	
	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        if (queryString) {
	          queryParams = this.parseQueryString(queryString);
	        }
	      }
	
	      path = tryDecode(path);
	      if (!path) return;
	
	      // DEBUG GROUP path
	
	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }
	
	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }
	
	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }
	
	      // END DEBUG GROUP
	
	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }
	
	      states = sortSolutions(solutions);
	
	      var state = solutions[0];
	
	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };
	
	  RouteRecognizer.prototype.map = map;
	
	  var genQuery = RouteRecognizer.prototype.generateQueryString;
	
	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */
	
	  function warn$1(msg) {
	    /* istanbul ignore next */
	    if (typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }
	
	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */
	
	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }
	
	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */
	
	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }
	
	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */
	
	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }
	
	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */
	
	  var resolver = undefined;
	
	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }
	
	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */
	
	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};
	
	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      /* istanbul ignore if */
	      if (!val) {
	        warn$1('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }
	
	  var hashRE = /#.*$/;
	
	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);
	
	      if (root && root !== '/') {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }
	
	    HTML5History.prototype.start = function start() {
	      var _this = this;
	
	      this.listener = function (e) {
	        var url = location.pathname + location.search;
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };
	
	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };
	
	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '', location.href);
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };
	
	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };
	
	    return HTML5History;
	  })();
	
	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);
	
	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }
	
	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(path.replace(/^#!?/, '') + query);
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };
	
	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };
	
	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };
	
	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };
	
	    return HashHistory;
	  })();
	
	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);
	
	      this.onChange = onChange;
	      this.currentPath = '/';
	    }
	
	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };
	
	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };
	
	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };
	
	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };
	
	    return AbstractHistory;
	  })();
	
	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */
	
	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }
	
	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */
	
	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }
	
	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */
	
	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }
	
	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */
	
	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }
	
	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */
	
	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      saveChildView(view);
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }
	
	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');
	
	    view.depth = depth;
	    view.activated = false;
	
	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);
	
	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;
	
	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      saveChildView(view);
	
	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);
	
	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        },
	        created: function created() {
	          this._routerView = view;
	        }
	      });
	
	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedChildView = component._keepAliveRouterView;
	        if (cachedChildView) {
	          view.childView = cachedChildView;
	          component._keepAliveRouterView = null;
	        }
	      }
	    }
	
	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };
	
	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };
	
	    var afterData = function afterData() {
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      insert();
	    };
	
	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, afterData, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        afterData();
	      }
	    };
	
	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup,
	        postActivate: true
	      });
	    } else {
	      afterActivate();
	    }
	  }
	
	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */
	
	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }
	
	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */
	
	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function () {
	      component.$loadingRouteData = false;
	      component.$emit('route-data-loaded', component);
	      cb && cb();
	    }, {
	      cleanup: cleanup,
	      postActivate: true,
	      processData: function processData(data) {
	        // handle promise sugar syntax
	        var promises = [];
	        if (isPlainObject(data)) {
	          Object.keys(data).forEach(function (key) {
	            var val = data[key];
	            if (isPromise(val)) {
	              promises.push(val.then(function (resolvedVal) {
	                component.$set(key, resolvedVal);
	              }));
	            } else {
	              component.$set(key, val);
	            }
	          });
	        }
	        if (promises.length) {
	          return promises[0].constructor.all(promises);
	        }
	      }
	    });
	  }
	
	  /**
	   * Save the child view for a kept-alive view so that
	   * we can restore it when it is switched back to.
	   *
	   * @param {Directive} view
	   */
	
	  function saveChildView(view) {
	    if (view.keepAlive && view.childVM && view.childView) {
	      view.childVM._keepAliveRouterView = view.childView;
	    }
	    view.childView = null;
	  }
	
	  /**
	   * Check plain object.
	   *
	   * @param {*} val
	   */
	
	  function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }
	
	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */
	
	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);
	
	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	    }
	
	    /**
	     * Abort current transition and return to previous location.
	     */
	
	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };
	
	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */
	
	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };
	
	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */
	
	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;
	
	      // determine the queue of views to deactivate
	      var deactivateQueue = [];
	      var view = this.router._rootView;
	      while (view) {
	        deactivateQueue.unshift(view);
	        view = view.childView;
	      }
	      var reverseDeactivateQueue = deactivateQueue.slice().reverse();
	
	      // determine the queue of route handlers to activate
	      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
	        return match.handler;
	      });
	
	      // 1. Reusability phase
	      var i = undefined,
	          reuseQueue = undefined;
	      for (i = 0; i < reverseDeactivateQueue.length; i++) {
	        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = reverseDeactivateQueue.slice(0, i);
	        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
	        activateQueue = activateQueue.slice(i);
	      }
	
	      // 2. Validation phase
	      transition.runQueue(deactivateQueue, canDeactivate, function () {
	        transition.runQueue(activateQueue, canActivate, function () {
	          transition.runQueue(deactivateQueue, deactivate, function () {
	            // 3. Activation phase
	
	            // Update router current route
	            transition.router._onTransitionValidated(transition);
	
	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              return reuse(view, transition);
	            });
	
	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (deactivateQueue.length) {
	              var _view = deactivateQueue[deactivateQueue.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(_view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };
	
	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */
	
	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };
	
	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} postActive
	     *                 - {Function} processData
	     *                 - {Function} cleanup
	     */
	
	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$postActivate = _ref.postActivate;
	      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
	      var processData = _ref.processData;
	      var cleanup = _ref.cleanup;
	
	      var transition = this;
	      var nextCalled = false;
	
	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };
	
	      // handle errors
	      var onError = function onError(err) {
	        postActivate ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn$1('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };
	
	      // since promise swallows errors, we have to
	      // throw it in the next tick...
	      var onPromiseError = function onPromiseError(err) {
	        try {
	          onError(err);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          }, 0);
	        }
	      };
	
	      // advance the transition to the next step
	      var next = function next() {
	        if (nextCalled) {
	          warn$1('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb();
	      };
	
	      var nextWithBoolean = function nextWithBoolean(res) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (isPromise(res)) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onPromiseError);
	        } else if (!hook.length) {
	          next();
	        }
	      };
	
	      var nextWithData = function nextWithData(data) {
	        var res = undefined;
	        try {
	          res = processData(data);
	        } catch (err) {
	          return onError(err);
	        }
	        if (isPromise(res)) {
	          res.then(next, onPromiseError);
	        } else {
	          next();
	        }
	      };
	
	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: processData ? nextWithData : next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };
	
	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }
	
	      if (expectBoolean) {
	        // boolean hooks
	        nextWithBoolean(res);
	      } else if (isPromise(res)) {
	        // promise
	        if (processData) {
	          res.then(nextWithData, onPromiseError);
	        } else {
	          res.then(next, onPromiseError);
	        }
	      } else if (processData && isPlainOjbect(res)) {
	        // data promise sugar
	        nextWithData(res);
	      } else if (!hook.length) {
	        next();
	      }
	    };
	
	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */
	
	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;
	
	      if (Array.isArray(hooks)) {
	        this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, next, options);
	          }
	        }, cb);
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };
	
	    return RouteTransition;
	  })();
	
	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }
	
	  function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	  }
	
	  var internalKeysRE = /^(component|subRoutes|fullPath)$/;
	
	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */
	
	  var Route = function Route(path, router) {
	    var _this = this;
	
	    babelHelpers.classCallCheck(this, Route);
	
	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // internal reference to router
	    Object.defineProperty(this, 'router', {
	      enumerable: false,
	      value: router
	    });
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };
	
	  function applyOverride (Vue) {
	    var _Vue$util = Vue.util;
	    var extend = _Vue$util.extend;
	    var isArray = _Vue$util.isArray;
	    var defineReactive = _Vue$util.defineReactive;
	
	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      options = options || {};
	      var root = options._parent || options.parent || this;
	      var router = root.$router;
	      var route = root.$route;
	      if (router) {
	        // expose router
	        this.$router = router;
	        router._children.push(this);
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          defineReactive(this, '$route', route);
	        }
	      }
	      init.call(this, options);
	    };
	
	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed && this.$router) {
	        this.$router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    };
	
	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;
	
	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }
	
	  function View (Vue) {
	
	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);
	
	    // with some overrides
	    _.extend(viewDef, {
	
	      _isRouterView: true,
	
	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn$1('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);
	
	        // locate the parent view
	        var parentView = undefined;
	        var parent = this.vm;
	        while (parent) {
	          if (parent._routerView) {
	            parentView = parent._routerView;
	            break;
	          }
	          parent = parent.$parent;
	        }
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          this.parentView = parentView;
	          parentView.childView = this;
	        } else {
	          // this is the root view!
	          var router = route.router;
	          router._rootView = this;
	        }
	
	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },
	
	      unbind: function unbind() {
	        if (this.parentView) {
	          this.parentView.childView = null;
	        }
	        componentDef.unbind.call(this);
	      }
	    });
	
	    Vue.elementDirective('router-view', viewDef);
	  }
	
	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;
	
	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	    var _Vue$util = Vue.util;
	    var _bind = _Vue$util.bind;
	    var isObject = _Vue$util.isObject;
	    var addClass = _Vue$util.addClass;
	    var removeClass = _Vue$util.removeClass;
	
	    var onPriority = Vue.directive('on').priority;
	    var LINK_UPDATE = '__vue-router-link-update__';
	
	    var activeId = 0;
	
	    Vue.directive('link-active', {
	      priority: 9999,
	      bind: function bind() {
	        var _this = this;
	
	        var id = String(activeId++);
	        // collect v-links contained within this element.
	        // we need do this here before the parent-child relationship
	        // gets messed up by terminal directives (if, for, components)
	        var childLinks = this.el.querySelectorAll('[v-link]');
	        for (var i = 0, l = childLinks.length; i < l; i++) {
	          var link = childLinks[i];
	          var existingId = link.getAttribute(LINK_UPDATE);
	          var value = existingId ? existingId + ',' + id : id;
	          // leave a mark on the link element which can be persisted
	          // through fragment clones.
	          link.setAttribute(LINK_UPDATE, value);
	        }
	        this.vm.$on(LINK_UPDATE, this.cb = function (link, path) {
	          if (link.activeIds.indexOf(id) > -1) {
	            link.updateClasses(path, _this.el);
	          }
	        });
	      },
	      unbind: function unbind() {
	        this.vm.$off(LINK_UPDATE, this.cb);
	      }
	    });
	
	    Vue.directive('link', {
	      priority: onPriority - 2,
	
	      bind: function bind() {
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn$1('v-link can only be used inside a router-enabled app.');
	          return;
	        }
	        this.router = vm.$route.router;
	        // update things when the route changes
	        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
	        // check v-link-active ids
	        var activeIds = this.el.getAttribute(LINK_UPDATE);
	        if (activeIds) {
	          this.el.removeAttribute(LINK_UPDATE);
	          this.activeIds = activeIds.split(',');
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        this.handler = _bind(this.onClick, this);
	        this.el.addEventListener('click', this.handler);
	      },
	
	      update: function update(target) {
	        this.target = target;
	        if (isObject(target)) {
	          this.append = target.append;
	          this.exact = target.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = target.activeClass;
	        }
	        this.onRouteUpdate(this.vm.$route);
	      },
	
	      onClick: function onClick(e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) return;
	
	        var target = this.target;
	        if (target) {
	          // v-link with expression, just go
	          e.preventDefault();
	          this.router.go(target);
	        } else {
	          // no expression, delegate for an <a> inside
	          var el = e.target;
	          while (el.tagName !== 'A' && el !== this.el) {
	            el = el.parentNode;
	          }
	          if (el.tagName === 'A' && sameOrigin(el)) {
	            e.preventDefault();
	            var path = el.pathname;
	            if (this.router.history.root) {
	              path = path.replace(this.router.history.rootRE, '');
	            }
	            this.router.go({
	              path: path,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      },
	
	      onRouteUpdate: function onRouteUpdate(route) {
	        // router.stringifyPath is dependent on current route
	        // and needs to be called again whenver route changes.
	        var newPath = this.router.stringifyPath(this.target);
	        if (this.path !== newPath) {
	          this.path = newPath;
	          this.updateActiveMatch();
	          this.updateHref();
	        }
	        if (this.activeIds) {
	          this.vm.$emit(LINK_UPDATE, this, route.path);
	        } else {
	          this.updateClasses(route.path, this.el);
	        }
	      },
	
	      updateActiveMatch: function updateActiveMatch() {
	        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      },
	
	      updateHref: function updateHref() {
	        if (this.el.tagName !== 'A') {
	          return;
	        }
	        var path = this.path;
	        var router = this.router;
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      },
	
	      updateClasses: function updateClasses(path, el) {
	        var activeClass = this.activeClass || this.router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass && this.prevActiveClass !== activeClass) {
	          toggleClasses(el, this.prevActiveClass, removeClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        }
	      },
	
	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });
	
	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }
	
	    // this function is copied from v-bind:class implementation until
	    // we properly expose it...
	    function toggleClasses(el, key, fn) {
	      key = key.trim();
	      if (key.indexOf(' ') === -1) {
	        fn(el, key);
	        return;
	      }
	      var keys = key.split(/\s+/);
	      for (var i = 0, l = keys.length; i < l; i++) {
	        fn(el, keys[i]);
	      }
	    }
	  }
	
	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };
	
	  // late bind during install
	  var Vue = undefined;
	
	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */
	
	  var Router = (function () {
	    function Router() {
	      var _this = this;
	
	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);
	
	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }
	
	      // Vue instances
	      this.app = null;
	      this._children = [];
	
	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();
	
	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];
	
	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;
	
	      // history mode
	      this._root = root;
	      this._abstract = abstract;
	      this._hashbang = hashbang;
	
	      // check if HTML5 history is available
	      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	      this._history = history && hasPushState;
	      this._historyFallback = history && !hasPushState;
	
	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';
	
	      var History = historyBackends[this.mode];
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          _this._match(path, state, anchor);
	        }
	      });
	
	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	    }
	
	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */
	
	    // API ===================================================
	
	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */
	
	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	      return this;
	    };
	
	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */
	
	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	      return this;
	    };
	
	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */
	
	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	      return this;
	    };
	
	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */
	
	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	      return this;
	    };
	
	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */
	
	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	      return this;
	    };
	
	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */
	
	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	      return this;
	    };
	
	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */
	
	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this.stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };
	
	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */
	
	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };
	
	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */
	
	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn$1('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        /* istanbul ignore if */
	        if (App instanceof Vue) {
	          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }
	
	      // handle history fallback in browsers that do not
	      // support HTML5 history API
	      if (this._historyFallback) {
	        var _location = window.location;
	        var _history = new HTML5History({ root: this._root });
	        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
	        if (path && path !== '/') {
	          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
	          return;
	        }
	      }
	
	      this.history.start();
	    };
	
	    /**
	     * Stop listening to route changes.
	     */
	
	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };
	
	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */
	
	    Router.prototype.stringifyPath = function stringifyPath(path) {
	      var generatedPath = '';
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var extend = Vue.util.extend;
	          var currentParams = this._currentTransition && this._currentTransition.to.params;
	          var targetParams = path.params || {};
	          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
	          generatedPath = encodeURI(this._recognizer.generate(path.name, params));
	        } else if (path.path) {
	          generatedPath = encodeURI(path.path);
	        }
	        if (path.query) {
	          // note: the generated query string is pre-URL-encoded by the recognizer
	          var query = this._recognizer.generateQueryString(path.query);
	          if (generatedPath.indexOf('?') > -1) {
	            generatedPath += '&' + query.slice(1);
	          } else {
	            generatedPath += query;
	          }
	        }
	      } else {
	        generatedPath = encodeURI(path ? path + '' : '');
	      }
	      return generatedPath;
	    };
	
	    // Internal methods ======================================
	
	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */
	
	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };
	
	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */
	
	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };
	
	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */
	
	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };
	
	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */
	
	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };
	
	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */
	
	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this2 = this;
	
	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this2, realPath);
	        }
	      }]);
	    };
	
	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */
	
	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path, true);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };
	
	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */
	
	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this3 = this;
	
	      if (this._checkGuard(path)) {
	        return;
	      }
	
	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;
	
	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }
	
	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);
	
	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;
	
	      if (!this.app) {
	        (function () {
	          // initial render
	          var router = _this3;
	          _this3.app = new _this3._appConstructor({
	            el: _this3._appContainer,
	            created: function created() {
	              this.$router = router;
	            },
	            _meta: {
	              $route: route
	            }
	          });
	        })();
	      }
	
	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this3._postTransition(route, state, anchor);
	        });
	      };
	
	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this3._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }
	
	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }
	
	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };
	
	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */
	
	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };
	
	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */
	
	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };
	
	    return Router;
	  })();
	
	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn$1('invalid component for route "' + path + '".');
	    }
	  }
	
	  /* Installation */
	
	  Router.installed = false;
	
	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */
	
	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn$1('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };
	
	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }
	
	  return Router;
	
	}));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(5)
	__vue_script__ = __webpack_require__(9)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/index.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(11)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./index.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./index.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n*{margin: 0;padding: 0}\nli{list-style: none}\nhtml, body{\n    height: 100%;\n    background-color: #1C1F2B;\n    background: -webkit-gradient(linear,50% 0,50% 100%,from(#888),to(#fff));\n    font-family:\"lucida grande\", \"lucida sans unicode\", lucida, helvetica, \"Hiragino Sans GB\", \"Microsoft YaHei\", \"WenQuanYi Micro Hei\", sans-serif\n}\n#app{\n    height: 100%;\n    width: 100%;\n    min-width: 800px;\n    position: relative;\n}\n#left-sidebar{\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    overflow-y: auto;\n    height: 100%;\n    width: 300px;\n    text-align: center;\n    color: #ffffff;\n    /*background-color: #2D3143;*/\n    background: -webkit-gradient(linear,50% 0,50% 100%,from(#1a2933),to(#3e4145));\n    z-index: 1;\n}\n#sidebar-widgets, #sidebar-modules{\n    width: 100%;\n    font-size: 1.1em;\n    color: #f2f2f2;\n    border-top: 1px solid #221D1D;\n}\n.sidebar-widgets-li, .sidebar-modules-li{\n    width: 100%;\n    height: 2em;\n    line-height: 2;\n    display: table;\n    /*border-bottom: 1px dashed rgba(99,99,99,.6);*/\n    box-shadow: 0 1px 0 #221D1D,0 1px 1px #999;\n}\n.sidebar-widgets-li.active, .sidebar-modules-li.active,\n.sidebar-widgets-li:hover, .sidebar-modules-li:hover{\n    background-color: #130c0e;\n}\n.sidebar-title, .sidebar-widgets-span, .sidebar-modules-span{\n    background: transparent;\n    font-weight: 600;\n    display: inline-block;\n    width: 90%;\n    text-indent: 15%;\n    margin: 0 5%;\n    text-align: left;\n}\n.sidebar-title{\n    text-indent: 0%;\n    font-size: 1.3em;\n    height: 2em;\n    line-height: 2;\n}\n/*-----components-cont-----*/\n#components-wraper{\n    display: table;\n    width: calc(100% - 300px);\n    height: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n}\n#components-cont{\n    position: relative;\n    left: 0px;\n    -webkit-transition: 300ms ease left;\n    transition: 300ms ease left;\n    max-width: 1000px;\n    margin: 0 auto;\n    padding: 20px 100px;\n    z-index: 1;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    overflow-y: auto;\n}\n#components-cont::-webkit-scrollbar {\n    background: transparent;\n}\n@media (max-width: 1240px) {\n    #components-wraper{\n        -webkit-transition:-webkit-transform 250ms ease;\n        transition: -webkit-transform 250ms ease;\n        transition: transform 250ms ease;\n        transition: transform 250ms ease, -webkit-transform 250ms ease;\n        padding-bottom: 20px\n    }\n}\n\n@media (min-width: 600px) {\n    #components-wraper{\n        left:300px\n    }\n}\n#comp-title{\n    text-align: center;\n    color: #f2f2f2;\n    font-weight: 500;\n    text-shadow: 1px 1px 1px #000;\n    margin: 2% 0 5% 0;\n}\n#comp-title:hover{\n    box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));\n    -webkit-box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));\n    -moz-box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));\n}\n.hinting-title{\n    margin: 2% 0;\n    color: #130C0E;\n}\n.demonstrate-a{\n    margin: 2% 0;\n    color: #009ad6;\n    font-size: 1.3em;\n    line-height: 1.3;\n    display: inline-block;\n}\n.ahead{\n    position: relative;\n    z-index: 12;\n}\n\n.common-a{\n    margin: 1%;\n    padding: 1% 3%;\n    position: relative;\n    color: #24B3D3;\n    font-size: 1em;\n    line-height: 3;\n    background-color: #222222;\n    border-radius: 1em;\n    text-decoration: none;\n}\n.noComplete{\n    margin: 2% 0;\n    background-color: #222222;\n    font-size: 2em;\n    line-height: 2;\n    text-align: center;\n    color: #f2f2f2;\n}\n.comp-area{\n    position: relative;\n    margin-left: 5%;\n}\n.hold-comp-area{\n    position: relative;\n}\n", "", {"version":3,"sources":["/./src/index.vue?f0f6c908"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA8CA,EAAA,UAAA,UAAA,CAAA;AACA,GAAA,gBAAA,CAAA;AACA;IACA,aAAA;IACA,0BAAA;IACA,wEAAA;IACA,+IAAA;CACA;AACA;IACA,aAAA;IACA,YAAA;IACA,iBAAA;IACA,mBAAA;CACA;AACA;IACA,mBAAA;IACA,OAAA;IACA,QAAA;IACA,SAAA;IACA,UAAA;IACA,iBAAA;IACA,aAAA;IACA,aAAA;IACA,mBAAA;IACA,eAAA;IACA,8BAAA;IACA,8EAAA;IACA,WAAA;CACA;AACA;IACA,YAAA;IACA,iBAAA;IACA,eAAA;IACA,8BAAA;CACA;AACA;IACA,YAAA;IACA,YAAA;IACA,eAAA;IACA,eAAA;IACA,gDAAA;IACA,2CAAA;CACA;AACA;;IAEA,0BAAA;CACA;AACA;IACA,wBAAA;IACA,iBAAA;IACA,sBAAA;IACA,WAAA;IACA,iBAAA;IACA,aAAA;IACA,iBAAA;CACA;AACA;IACA,gBAAA;IACA,iBAAA;IACA,YAAA;IACA,eAAA;CACA;AACA,6BAAA;AACA;IACA,eAAA;IACA,0BAAA;IACA,aAAA;IACA,0BAAA;IACA,kBAAA;IACA,mBAAA;IACA,OAAA;IACA,QAAA;IACA,UAAA;IACA,SAAA;CACA;AACA;IACA,mBAAA;IACA,UAAA;IACA,oCAAA;IAAA,4BAAA;IACA,kBAAA;IACA,eAAA;IACA,oBAAA;IACA,WAAA;IACA,mBAAA;IACA,OAAA;IACA,UAAA;IACA,SAAA;IACA,QAAA;IACA,iBAAA;CACA;AACA;IACA,wBAAA;CACA;AACA;IACA;QACA,gDAAA;QAGA,yCAAA;QAAA,iCAAA;QAAA,+DAAA;QACA,oBAAA;KACA;CACA;;AAEA;IACA;QACA,UAAA;KACA;CACA;AACA;IACA,mBAAA;IACA,eAAA;IACA,iBAAA;IACA,8BAAA;IACA,kBAAA;CACA;AACA;IACA,yFAAA;IACA,iGAAA;IACA,8FAAA;CACA;AACA;IACA,aAAA;IACA,eAAA;CACA;AACA;IACA,aAAA;IACA,eAAA;IACA,iBAAA;IACA,iBAAA;IACA,sBAAA;CACA;AACA;IACA,mBAAA;IACA,YAAA;CACA;;AAEA;IACA,WAAA;IACA,eAAA;IACA,mBAAA;IACA,eAAA;IACA,eAAA;IACA,eAAA;IACA,0BAAA;IACA,mBAAA;IACA,sBAAA;CACA;AACA;IACA,aAAA;IACA,0BAAA;IACA,eAAA;IACA,eAAA;IACA,mBAAA;IACA,eAAA;CACA;AACA;IACA,mBAAA;IACA,gBAAA;CACA;AACA;IACA,mBAAA;CACA","file":"index.vue","sourcesContent":["<template id=\"index\" lang='jade'>\ndiv#app\n    div#left-sidebar\n        p(class='sidebar-title') {{ widgetsTitle }}\n        ul#sidebar-widgets\n            li(v-for='item in widgetsComp' class='sidebar-widgets-li')\n                a(class='sidebar-widgets-span' id='{{ item }}' @click=\"onEntryDemoClick(item)\") {{ item }}\n        p(class='sidebar-title') {{ modulesTitle }}\n        ul#sidebar-modules\n            li(v-for='item in modulesComp' class='sidebar-modules-li')\n                a(class='sidebar-modules-span' id='{{ item }}' @click=\"onEntryDemoClick(item)\" ) {{ item }}\n    div#components-wraper\n        div#components-cont\n            <router-view></router-view>\n</template>\n\n<script type=\"text/javascript\">\nvar componentsConfig = require('./../../config/componentsConfig.js')();\nexport default {\n    data () {\n        return {\n            widgetsComp: componentsConfig.widgets,\n            modulesComp: componentsConfig.modules,\n            widgetsTitle: \"WidgetsComponents\",\n            modulesTitle: \"ModulesComponents\",\n        }\n    },\n    route:{\n\t\tdata(transition){\n\t\t}\n\t},\n    components: {\n    },\n    methods: {\n        onEntryDemoClick: function( param ){\n            // this.$route.router.go({name: param ,params: { actId: id }})\n            this.$route.router.go({name: param})\n            var activeId = '#' + param;\n            $('#left-sidebar').find('.active').removeClass('active')\n            $(activeId).parent().addClass('active')\n        }\n    }\n}\n</script>\n\n<style media=\"screen\">\n*{margin: 0;padding: 0}\nli{list-style: none}\nhtml, body{\n    height: 100%;\n    background-color: #1C1F2B;\n    background: -webkit-gradient(linear,50% 0,50% 100%,from(#888),to(#fff));\n    font-family:\"lucida grande\", \"lucida sans unicode\", lucida, helvetica, \"Hiragino Sans GB\", \"Microsoft YaHei\", \"WenQuanYi Micro Hei\", sans-serif\n}\n#app{\n    height: 100%;\n    width: 100%;\n    min-width: 800px;\n    position: relative;\n}\n#left-sidebar{\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    overflow-y: auto;\n    height: 100%;\n    width: 300px;\n    text-align: center;\n    color: #ffffff;\n    /*background-color: #2D3143;*/\n    background: -webkit-gradient(linear,50% 0,50% 100%,from(#1a2933),to(#3e4145));\n    z-index: 1;\n}\n#sidebar-widgets, #sidebar-modules{\n    width: 100%;\n    font-size: 1.1em;\n    color: #f2f2f2;\n    border-top: 1px solid #221D1D;\n}\n.sidebar-widgets-li, .sidebar-modules-li{\n    width: 100%;\n    height: 2em;\n    line-height: 2;\n    display: table;\n    /*border-bottom: 1px dashed rgba(99,99,99,.6);*/\n    box-shadow: 0 1px 0 #221D1D,0 1px 1px #999;\n}\n.sidebar-widgets-li.active, .sidebar-modules-li.active,\n.sidebar-widgets-li:hover, .sidebar-modules-li:hover{\n    background-color: #130c0e;\n}\n.sidebar-title, .sidebar-widgets-span, .sidebar-modules-span{\n    background: transparent;\n    font-weight: 600;\n    display: inline-block;\n    width: 90%;\n    text-indent: 15%;\n    margin: 0 5%;\n    text-align: left;\n}\n.sidebar-title{\n    text-indent: 0%;\n    font-size: 1.3em;\n    height: 2em;\n    line-height: 2;\n}\n/*-----components-cont-----*/\n#components-wraper{\n    display: table;\n    width: calc(100% - 300px);\n    height: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n}\n#components-cont{\n    position: relative;\n    left: 0px;\n    transition: 300ms ease left;\n    max-width: 1000px;\n    margin: 0 auto;\n    padding: 20px 100px;\n    z-index: 1;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    overflow-y: auto;\n}\n#components-cont::-webkit-scrollbar {\n    background: transparent;\n}\n@media (max-width: 1240px) {\n    #components-wraper{\n        -webkit-transition:-webkit-transform 250ms ease;\n        -moz-transition: -moz-transform 250ms ease;\n        -o-transition: -o-transform 250ms ease;\n        transition: transform 250ms ease;\n        padding-bottom: 20px\n    }\n}\n\n@media (min-width: 600px) {\n    #components-wraper{\n        left:300px\n    }\n}\n#comp-title{\n    text-align: center;\n    color: #f2f2f2;\n    font-weight: 500;\n    text-shadow: 1px 1px 1px #000;\n    margin: 2% 0 5% 0;\n}\n#comp-title:hover{\n    box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));\n    -webkit-box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));\n    -moz-box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));\n}\n.hinting-title{\n    margin: 2% 0;\n    color: #130C0E;\n}\n.demonstrate-a{\n    margin: 2% 0;\n    color: #009ad6;\n    font-size: 1.3em;\n    line-height: 1.3;\n    display: inline-block;\n}\n.ahead{\n    position: relative;\n    z-index: 12;\n}\n\n.common-a{\n    margin: 1%;\n    padding: 1% 3%;\n    position: relative;\n    color: #24B3D3;\n    font-size: 1em;\n    line-height: 3;\n    background-color: #222222;\n    border-radius: 1em;\n    text-decoration: none;\n}\n.noComplete{\n    margin: 2% 0;\n    background-color: #222222;\n    font-size: 2em;\n    line-height: 2;\n    text-align: center;\n    color: #f2f2f2;\n}\n.comp-area{\n    position: relative;\n    margin-left: 5%;\n}\n.hold-comp-area{\n    position: relative;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template id="index" lang='jade'>
	// div#app
	//     div#left-sidebar
	//         p(class='sidebar-title') {{ widgetsTitle }}
	//         ul#sidebar-widgets
	//             li(v-for='item in widgetsComp' class='sidebar-widgets-li')
	//                 a(class='sidebar-widgets-span' id='{{ item }}' @click="onEntryDemoClick(item)") {{ item }}
	//         p(class='sidebar-title') {{ modulesTitle }}
	//         ul#sidebar-modules
	//             li(v-for='item in modulesComp' class='sidebar-modules-li')
	//                 a(class='sidebar-modules-span' id='{{ item }}' @click="onEntryDemoClick(item)" ) {{ item }}
	//     div#components-wraper
	//         div#components-cont
	//             <router-view></router-view>
	// </template>
	//
	// <script type="text/javascript">
	var componentsConfig = __webpack_require__(10)();
	exports.default = {
	    data: function data() {
	        return {
	            widgetsComp: componentsConfig.widgets,
	            modulesComp: componentsConfig.modules,
	            widgetsTitle: "WidgetsComponents",
	            modulesTitle: "ModulesComponents"
	        };
	    },
	
	    route: {
	        data: function data(transition) {}
	    },
	    components: {},
	    methods: {
	        onEntryDemoClick: function onEntryDemoClick(param) {
	            // this.$route.router.go({name: param ,params: { actId: id }})
	            this.$route.router.go({ name: param });
	            var activeId = '#' + param;
	            $('#left-sidebar').find('.active').removeClass('active');
	            $(activeId).parent().addClass('active');
	        }
	    }
	};
	// </script>
	//
	// <style media="screen">
	// *{margin: 0;padding: 0}
	// li{list-style: none}
	// html, body{
	//     height: 100%;
	//     background-color: #1C1F2B;
	//     background: -webkit-gradient(linear,50% 0,50% 100%,from(#888),to(#fff));
	//     font-family:"lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif
	// }
	// #app{
	//     height: 100%;
	//     width: 100%;
	//     min-width: 800px;
	//     position: relative;
	// }
	// #left-sidebar{
	//     position: absolute;
	//     top: 0;
	//     left: 0;
	//     right: 0;
	//     bottom: 0;
	//     overflow-y: auto;
	//     height: 100%;
	//     width: 300px;
	//     text-align: center;
	//     color: #ffffff;
	//     /*background-color: #2D3143;*/
	//     background: -webkit-gradient(linear,50% 0,50% 100%,from(#1a2933),to(#3e4145));
	//     z-index: 1;
	// }
	// #sidebar-widgets, #sidebar-modules{
	//     width: 100%;
	//     font-size: 1.1em;
	//     color: #f2f2f2;
	//     border-top: 1px solid #221D1D;
	// }
	// .sidebar-widgets-li, .sidebar-modules-li{
	//     width: 100%;
	//     height: 2em;
	//     line-height: 2;
	//     display: table;
	//     /*border-bottom: 1px dashed rgba(99,99,99,.6);*/
	//     box-shadow: 0 1px 0 #221D1D,0 1px 1px #999;
	// }
	// .sidebar-widgets-li.active, .sidebar-modules-li.active,
	// .sidebar-widgets-li:hover, .sidebar-modules-li:hover{
	//     background-color: #130c0e;
	// }
	// .sidebar-title, .sidebar-widgets-span, .sidebar-modules-span{
	//     background: transparent;
	//     font-weight: 600;
	//     display: inline-block;
	//     width: 90%;
	//     text-indent: 15%;
	//     margin: 0 5%;
	//     text-align: left;
	// }
	// .sidebar-title{
	//     text-indent: 0%;
	//     font-size: 1.3em;
	//     height: 2em;
	//     line-height: 2;
	// }
	// /*-----components-cont-----*/
	// #components-wraper{
	//     display: table;
	//     width: calc(100% - 300px);
	//     height: 100%;
	//     border-collapse: collapse;
	//     border-spacing: 0;
	//     position: absolute;
	//     top: 0;
	//     left: 0;
	//     bottom: 0;
	//     right: 0;
	// }
	// #components-cont{
	//     position: relative;
	//     left: 0px;
	//     transition: 300ms ease left;
	//     max-width: 1000px;
	//     margin: 0 auto;
	//     padding: 20px 100px;
	//     z-index: 1;
	//     position: absolute;
	//     top: 0;
	//     bottom: 0;
	//     right: 0;
	//     left: 0;
	//     overflow-y: auto;
	// }
	// #components-cont::-webkit-scrollbar {
	//     background: transparent;
	// }
	// @media (max-width: 1240px) {
	//     #components-wraper{
	//         -webkit-transition:-webkit-transform 250ms ease;
	//         -moz-transition: -moz-transform 250ms ease;
	//         -o-transition: -o-transform 250ms ease;
	//         transition: transform 250ms ease;
	//         padding-bottom: 20px
	//     }
	// }
	//
	// @media (min-width: 600px) {
	//     #components-wraper{
	//         left:300px
	//     }
	// }
	// #comp-title{
	//     text-align: center;
	//     color: #f2f2f2;
	//     font-weight: 500;
	//     text-shadow: 1px 1px 1px #000;
	//     margin: 2% 0 5% 0;
	// }
	// #comp-title:hover{
	//     box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));
	//     -webkit-box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));
	//     -moz-box-reflect: below 1px linear-gradient(transparent,transparent 20%,rgba(216,216,216,.2));
	// }
	// .hinting-title{
	//     margin: 2% 0;
	//     color: #130C0E;
	// }
	// .demonstrate-a{
	//     margin: 2% 0;
	//     color: #009ad6;
	//     font-size: 1.3em;
	//     line-height: 1.3;
	//     display: inline-block;
	// }
	// .ahead{
	//     position: relative;
	//     z-index: 12;
	// }
	//
	// .common-a{
	//     margin: 1%;
	//     padding: 1% 3%;
	//     position: relative;
	//     color: #24B3D3;
	//     font-size: 1em;
	//     line-height: 3;
	//     background-color: #222222;
	//     border-radius: 1em;
	//     text-decoration: none;
	// }
	// .noComplete{
	//     margin: 2% 0;
	//     background-color: #222222;
	//     font-size: 2em;
	//     line-height: 2;
	//     text-align: center;
	//     color: #f2f2f2;
	// }
	// .comp-area{
	//     position: relative;
	//     margin-left: 5%;
	// }
	// .hold-comp-area{
	//     position: relative;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function() {
	    return {
	        "widgets":{
	            "0": "popupToast",
	            "1": "normalDialog",
	            "2": "strongDialog",
	            "3": "tabBarWithJq",
	            "4": "tabBarWithRouter",
	            "5": "commonTable",
	            "6": "spanFlexTable",
	            "7": "countDown",
	        },
	        "modules":{
	            "0": "turnTable",
	            "1": "formDialog",
	            "2": "shaveLottery",
	        }
	    }
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "<div id=\"app\"><div id=\"left-sidebar\"><p class=\"sidebar-title\">{{ widgetsTitle }}</p><ul id=\"sidebar-widgets\"><li v-for=\"item in widgetsComp\" class=\"sidebar-widgets-li\"><a id=\"{{ item }}\" @click=\"onEntryDemoClick(item)\" class=\"sidebar-widgets-span\">{{ item }}</a></li></ul><p class=\"sidebar-title\">{{ modulesTitle }}</p><ul id=\"sidebar-modules\"><li v-for=\"item in modulesComp\" class=\"sidebar-modules-li\"><a id=\"{{ item }}\" @click=\"onEntryDemoClick(item)\" class=\"sidebar-modules-span\">{{ item }}</a></li></ul></div><div id=\"components-wraper\"><div id=\"components-cont\"><router-view></router-view></div></div></div>";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(13)
	__vue_script__ = __webpack_require__(15)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/desc.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(16)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./desc.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./desc.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./desc.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.welcome{\n    text-align: center;\n    color: #000;\n    text-shadow: 0 1px 1px #fff;\n}\n.desc-a{\n    margin: 2% 2% 2% 0;\n    padding: 1% 3%;\n    position: absolute;\n    right: 10%;\n    color: #f2f2f2;\n    font-size: 1em;\n    line-height: 1.2;\n    background-color: #009ad6;\n    border-radius: 1em;\n    text-decoration: none;\n}\n.desc-img{\n    width: 100%;\n    height: 100%;\n}\n.desc-img>img{\n    width: 100%;\n}\n", "", {"version":3,"sources":["/./src/desc.vue?60f802c6"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;AAmBA;IACA,mBAAA;IACA,YAAA;IACA,4BAAA;CACA;AACA;IACA,mBAAA;IACA,eAAA;IACA,mBAAA;IACA,WAAA;IACA,eAAA;IACA,eAAA;IACA,iBAAA;IACA,0BAAA;IACA,mBAAA;IACA,sBAAA;CACA;AACA;IACA,YAAA;IACA,aAAA;CACA;AACA;IACA,YAAA;CACA","file":"desc.vue","sourcesContent":["<template lang=\"jade\">\n    h1.welcome {{ welcome }}\n    a(class=\"desc-a\" href=\"https://nicejade.gitbooks.io/vue-components-doc/content/index.html\") {{ vueDoc }}\n    div.desc-img\n        img(src='http://7xoosr.com1.z0.glb.clouddn.com/vue-common-components.jpg')\n</template>\n\n<script type=\"text/javascript\">\nexport default {\n    data () {\n        return {\n            welcome: \"Welcome To Vue Component Desc And Example\",\n            vueDoc: \"Vue Common Components Doc(gitbooks)\"\n        }\n    }\n}\n</script>\n\n<style media=\"screen\">\n.welcome{\n    text-align: center;\n    color: #000;\n    text-shadow: 0 1px 1px #fff;\n}\n.desc-a{\n    margin: 2% 2% 2% 0;\n    padding: 1% 3%;\n    position: absolute;\n    right: 10%;\n    color: #f2f2f2;\n    font-size: 1em;\n    line-height: 1.2;\n    background-color: #009ad6;\n    border-radius: 1em;\n    text-decoration: none;\n}\n.desc-img{\n    width: 100%;\n    height: 100%;\n}\n.desc-img>img{\n    width: 100%;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template lang="jade">
	//     h1.welcome {{ welcome }}
	//     a(class="desc-a" href="https://nicejade.gitbooks.io/vue-components-doc/content/index.html") {{ vueDoc }}
	//     div.desc-img
	//         img(src='http://7xoosr.com1.z0.glb.clouddn.com/vue-common-components.jpg')
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        return {
	            welcome: "Welcome To Vue Component Desc And Example",
	            vueDoc: "Vue Common Components Doc(gitbooks)"
	        };
	    }
	};
	// </script>
	//
	// <style media="screen">
	// .welcome{
	//     text-align: center;
	//     color: #000;
	//     text-shadow: 0 1px 1px #fff;
	// }
	// .desc-a{
	//     margin: 2% 2% 2% 0;
	//     padding: 1% 3%;
	//     position: absolute;
	//     right: 10%;
	//     color: #f2f2f2;
	//     font-size: 1em;
	//     line-height: 1.2;
	//     background-color: #009ad6;
	//     border-radius: 1em;
	//     text-decoration: none;
	// }
	// .desc-img{
	//     width: 100%;
	//     height: 100%;
	// }
	// .desc-img>img{
	//     width: 100%;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<h1 class=\"welcome\">{{ welcome }}</h1><a href=\"https://nicejade.gitbooks.io/vue-components-doc/content/index.html\" class=\"desc-a\">{{ vueDoc }}</a><div class=\"desc-img\"><img src=\"http://7xoosr.com1.z0.glb.clouddn.com/vue-common-components.jpg\"/></div>";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(18)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_popupToast.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(34)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_popupToast.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _popupToast = __webpack_require__(19);
	
	var _popupToast2 = _interopRequireDefault(_popupToast);
	
	var _annotate = __webpack_require__(24);
	
	var _annotate2 = _interopRequireDefault(_annotate);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            compTitle: "Component Name",
	            hintingTitle: "使用示例:",
	            hintingTitle2: "表现示例:",
	            btnText: "Call PopupToast",
	            codeString: '\n    import popupToast from \'popupToast\';  //引入组件\n\n    var toastMsg = {\n        bodyText: text,\n        timer: 2222,           //可不传；默认2000ms\n        callBackFunc: function(){ alert(\'test\')}  // 可不传，默认null；\n    }\n    this.$broadcast(\'show-popup-toast\', toastMsg);',
	            blockquoteStr: '\n            <strong>微注：</strong> Vue可使用 props 来为组件间传递数据；但是对于动态变更频繁数据，这样传递写起来会略为麻烦：\n            引入组件，注册组件，template中注入，data()中定义数据，请求/事件等完毕后填充数据，最终激活组件；故而，为使用便捷，\n            在编写有 Widgets 组件时，涉及到数据需要动态改变，且组件也随事件变动show/hide的话，就采用 $dispatch() 和 $broadcast()\n            来广播和派发事件；当然这些方法在 Vue2.0 中已经被摒弃；可参见<a href="https://github.com/vuejs/vue/issues/2873">Vue2.0 Features</a>。\n        '
	        };
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        popupToast: _popupToast2.default,
	        annotate: _annotate2.default,
	        preCode: _preCode2.default
	    },
	    methods: {
	        onCallDemoClick: function onCallDemoClick() {
	            var toastMsg = {
	                bodyText: "www.jeffjade.com",
	                timer: 2222, //可不传；默认2000ms
	                callBackFunc: function callBackFunc() {
	                    console.log('callback down!');
	                }
	            };
	            this.$broadcast('show-popup-toast', toastMsg);
	        }
	    }
	};
	// </script>

	/* generated by vue-loader */
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     div.comp-area
	//         <annotate :blockquote-str='blockquoteStr'></annotate>
	//         a(href='javascript:;' @click="onCallDemoClick" class='demonstrate-a') {{ btnText }}
	//         div.hold-comp-area
	//             popup-toast
	// </template>
	//
	//
	// <script type="text/javascript">

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(20)
	__vue_script__ = __webpack_require__(22)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/widgets/popupToast.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(23)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./popupToast.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./popupToast.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./popupToast.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n.popup-toast {\n    position: absolute;\n    top: 38%;\n    left: 10%;\n    width: 78%;\n    padding: .5em 0;\n    text-align: center;\n    font-size: 1.24em;\n    color: #fff;\n    z-index: 20;\n    background-color: #6f599c;\n    border-radius: 1em;\n    border: 2px solid #6f599c;\n}\n", "", {"version":3,"sources":["/../components/widgets/popupToast.vue?6168af03"],"names":[],"mappings":";;;;;;;AAOA;IACA,mBAAA;IACA,SAAA;IACA,UAAA;IACA,WAAA;IACA,gBAAA;IACA,mBAAA;IACA,kBAAA;IACA,YAAA;IACA,YAAA;IACA,0BAAA;IACA,mBAAA;IACA,0BAAA;CACA","file":"popupToast.vue","sourcesContent":["<template lang=\"jade\">\ndiv(class=\"popup-toast\" id=\"modal-template\"  v-if=\"isShowToastFlag\")\n\tsection\n\t\tp {{ bodyText }}\n</template>\n\n<style>\n.popup-toast {\n    position: absolute;\n    top: 38%;\n    left: 10%;\n    width: 78%;\n    padding: .5em 0;\n    text-align: center;\n    font-size: 1.24em;\n    color: #fff;\n    z-index: 20;\n    background-color: #6f599c;\n    border-radius: 1em;\n    border: 2px solid #6f599c;\n}\n</style>\n\n<script type=\"text/javascript\">\nexport default {\n    data () {\n        return{\n            bodyText:\"初始数据:NULL!!\",\n            callBackFunc: null,\n            timer: 2000,\n            isShowToastFlag: false,\n        }\n    },\n    methods: {\n        showPopupToast: function(toastMsg){\n            var _That = this;\n            this.isShowToastFlag = true;\n            this.bodyText = toastMsg.bodyText || \"No Right TextMsg @popupToast Copm\";\n            this.timer = toastMsg.timer || this.timer;\n            this.callBackFunc = toastMsg.callBackFunc;\n\n            setTimeout(function(){\n                _That.isShowToastFlag = false;\n                if(_That.callBackFunc !== null){\n                    _That.callBackFunc();\n                }\n            }, this.timer)\n        }\n    },\n    events: {\n        'show-popup-toast': function (toastMsg) {\n            this.showPopupToast(toastMsg);\n        }\n    }\n}\n</script>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template lang="jade">
	// div(class="popup-toast" id="modal-template"  v-if="isShowToastFlag")
	// 	section
	// 		p {{ bodyText }}
	// </template>
	//
	// <style>
	// .popup-toast {
	//     position: absolute;
	//     top: 38%;
	//     left: 10%;
	//     width: 78%;
	//     padding: .5em 0;
	//     text-align: center;
	//     font-size: 1.24em;
	//     color: #fff;
	//     z-index: 20;
	//     background-color: #6f599c;
	//     border-radius: 1em;
	//     border: 2px solid #6f599c;
	// }
	// </style>
	//
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        return {
	            bodyText: "初始数据:NULL!!",
	            callBackFunc: null,
	            timer: 2000,
	            isShowToastFlag: false
	        };
	    },
	
	    methods: {
	        showPopupToast: function showPopupToast(toastMsg) {
	            var _That = this;
	            this.isShowToastFlag = true;
	            this.bodyText = toastMsg.bodyText || "No Right TextMsg @popupToast Copm";
	            this.timer = toastMsg.timer || this.timer;
	            this.callBackFunc = toastMsg.callBackFunc;
	
	            setTimeout(function () {
	                _That.isShowToastFlag = false;
	                if (_That.callBackFunc !== null) {
	                    _That.callBackFunc();
	                }
	            }, this.timer);
	        }
	    },
	    events: {
	        'show-popup-toast': function showPopupToast(toastMsg) {
	            this.showPopupToast(toastMsg);
	        }
	    }
	};
	// </script>

	/* generated by vue-loader */

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div id=\"modal-template\" v-if=\"isShowToastFlag\" class=\"popup-toast\"><section><p>{{ bodyText }}</p></section></div>";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(25)
	__vue_script__ = __webpack_require__(27)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/annotate.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(28)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./annotate.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./annotate.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./annotate.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.blockquote{\n    border-left: 8px solid #000;\n    padding: 10px 15px;\n    background: none repeat scroll 0 0 rgba(102,128,153, .21);\n}\n", "", {"version":3,"sources":["/./src/annotate.vue?9b7cf0d4"],"names":[],"mappings":";;;;;;;;;;;;;;;;AAgBA;IACA,4BAAA;IACA,mBAAA;IACA,0DAAA;CACA","file":"annotate.vue","sourcesContent":["<template id=\"annotate\" lang='jade'>\ndiv.annotate\n    blockquote.blockquote {{{ blockquoteStr }}}\n</template>\n\n<script type=\"text/javascript\">\nexport default {\n\tdata(){\n        return {\n        }\n    },\n    props: ['blockquoteStr'],\n}\n</script>\n\n<style media=\"screen\">\n.blockquote{\n    border-left: 8px solid #000;\n    padding: 10px 15px;\n    background: none repeat scroll 0 0 rgba(102,128,153, .21);\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	       value: true
	});
	// <template id="annotate" lang='jade'>
	// div.annotate
	//     blockquote.blockquote {{{ blockquoteStr }}}
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	       data: function data() {
	              return {};
	       },
	
	       props: ['blockquoteStr']
	};
	// </script>
	//
	// <style media="screen">
	// .blockquote{
	//     border-left: 8px solid #000;
	//     padding: 10px 15px;
	//     background: none repeat scroll 0 0 rgba(102,128,153, .21);
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div class=\"annotate\"><blockquote class=\"blockquote\">{{{ blockquoteStr }}}</blockquote></div>";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(30)
	__vue_script__ = __webpack_require__(32)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/preCode.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(33)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./preCode.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./preCode.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./preCode.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#pre-wrapper{\n    background-color: #2D2D2D;\n    border-left: 2px solid #65c294;\n    margin-left: 5%;\n}\n.carve-line{\n    margin: 2.1% 0;\n}\n", "", {"version":3,"sources":["/./src/preCode.vue?606a4bb9"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;AAwBA;IACA,0BAAA;IACA,+BAAA;IACA,gBAAA;CACA;AACA;IACA,eAAA;CACA","file":"preCode.vue","sourcesContent":["<template lang='jade'>\n    pre#pre-wrapper(class=\"brush: js\") {{ codeString }}\n    hr.carve-line\n</template>\n\n<script type=\"text/javascript\">\nexport default {\n    data () {\n        return{}\n    },\n    props: {\n        codeString:{\n            type: String,\n            default: \"\"\n        }\n    },\n    ready(){\n    },\n    methods: {\n    }\n}\n</script>\n\n<style media=\"screen\">\n#pre-wrapper{\n    background-color: #2D2D2D;\n    border-left: 2px solid #65c294;\n    margin-left: 5%;\n}\n.carve-line{\n    margin: 2.1% 0;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template lang='jade'>
	//     pre#pre-wrapper(class="brush: js") {{ codeString }}
	//     hr.carve-line
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        return {};
	    },
	
	    props: {
	        codeString: {
	            type: String,
	            default: ""
	        }
	    },
	    ready: function ready() {},
	
	    methods: {}
	};
	// </script>
	//
	// <style media="screen">
	// #pre-wrapper{
	//     background-color: #2D2D2D;
	//     border-left: 2px solid #65c294;
	//     margin-left: 5%;
	// }
	// .carve-line{
	//     margin: 2.1% 0;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = "<pre id=\"pre-wrapper\" class=\"brush: js\">{{ codeString }}</pre><hr class=\"carve-line\"/>";

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><div class=\"comp-area\"><annotate :blockquote-str='blockquoteStr'></annotate><a href=\"javascript:;\" @click=\"onCallDemoClick\" class=\"demonstrate-a\">{{ btnText }}</a><div class=\"hold-comp-area\"><popup-toast></popup-toast></div></div>";

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(36)
	__vue_script__ = __webpack_require__(38)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_normalDialog.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(44)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_normalDialog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_normalDialog.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_normalDialog.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#normal-dlg-body{\n    top: 39% !important;\n}\n", "", {"version":3,"sources":["/./src/_normalDialog.vue?29875cd4"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAyEA;IACA,oBAAA;CACA","file":"_normalDialog.vue","sourcesContent":["<template lang='jade'>\n    h1#comp-title {{ compTitle }}\n    h2.hinting-title {{ hintingTitle }}\n    <pre-code :code-string=\"codeString\"></pre-code>\n    h2.hinting-title {{ hintingTitle2 }}\n    a(href='javascript:;' @click=\"onCallDemoClick\" class='demonstrate-a') {{ btnText }}\n    div.comp-area\n        normal-dialog\n        popup-toast\n</template>\n\n<script type=\"text/javascript\">\nimport normalDialog from 'normalDialog'\nimport popupToast from 'popupToast'\nimport preCode from './preCode.vue'\n\nexport default {\n    data () {\n        return {\n            hintingTitle2: \"表现示例:\",\n            compTitle : \"Component Name\",\n            hintingTitle: \"使用示例:\",\n            btnText: \"Call NormalDialog\",\n            codeString: `\n    import normalDialog from 'normalDialog'; //引入组件\n\n    var dlgMsgObj = {\n        titleText: \"&温馨提示&\",            //不传(则不显示 title)\n        bodyText: text,\n        confirmText: \"确认\",               //可不传，默认 “确认”\n        callBackFunc: null,               //可不传，默认null\n        isShowCloseXFlag: true            //可不传，默认 true\n    }\n    // var dlgMsgObj = text;  //如不需更改Dlg默认文案等，可只 文本内容字符串（String）\n    this.$broadcast('show-normal-dlg', dlgMsgObj);`\n        }\n    },\n    route:{\n\t\tdata(transition){\n            this.compTitle = transition.to.name\n\t\t}\n\t},\n    components: {\n        normalDialog,\n        popupToast,\n        preCode,\n    },\n    methods: {\n        onCallDemoClick: function(){\n            var dlgMsgObj = {\n                titleText: \"&温馨提示&\",\n                bodyText: \"Welcome To http://www.jeffjade.com\",\n                confirmText: \"确认\",          //可不传，默认 “确认”\n                callBackFunc: this.showPopupToast,\n                isShowCloseXFlag: true       //可不传，默认 true\n            }\n\n            // var dlgMsgObj = text;  //如不需更改Dlg默认文案等，可只 文本内容字符串（String）\n            this.$broadcast('show-normal-dlg', dlgMsgObj);\n        },\n        showPopupToast: function(){\n            var toastMsg = {\n                bodyText: \"execute normal dialog callback\",\n                timer: 2222,           //可不传；默认2000ms\n                callBackFunc: function(){console.log('callback down!')}\n            }\n            this.$broadcast('show-popup-toast', toastMsg);\n        }\n    }\n}\n</script>\n\n<style media=\"screen\">\n#normal-dlg-body{\n    top: 39% !important;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _normalDialog = __webpack_require__(39);
	
	var _normalDialog2 = _interopRequireDefault(_normalDialog);
	
	var _popupToast = __webpack_require__(19);
	
	var _popupToast2 = _interopRequireDefault(_popupToast);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            hintingTitle2: "表现示例:",
	            compTitle: "Component Name",
	            hintingTitle: "使用示例:",
	            btnText: "Call NormalDialog",
	            codeString: '\n    import normalDialog from \'normalDialog\'; //引入组件\n\n    var dlgMsgObj = {\n        titleText: "&温馨提示&",            //不传(则不显示 title)\n        bodyText: text,\n        confirmText: "确认",               //可不传，默认 “确认”\n        callBackFunc: null,               //可不传，默认null\n        isShowCloseXFlag: true            //可不传，默认 true\n    }\n    // var dlgMsgObj = text;  //如不需更改Dlg默认文案等，可只 文本内容字符串（String）\n    this.$broadcast(\'show-normal-dlg\', dlgMsgObj);'
	        };
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        normalDialog: _normalDialog2.default,
	        popupToast: _popupToast2.default,
	        preCode: _preCode2.default
	    },
	    methods: {
	        onCallDemoClick: function onCallDemoClick() {
	            var dlgMsgObj = {
	                titleText: "&温馨提示&",
	                bodyText: "Welcome To http://www.jeffjade.com",
	                confirmText: "确认", //可不传，默认 “确认”
	                callBackFunc: this.showPopupToast,
	                isShowCloseXFlag: true //可不传，默认 true
	            };
	
	            // var dlgMsgObj = text;  //如不需更改Dlg默认文案等，可只 文本内容字符串（String）
	            this.$broadcast('show-normal-dlg', dlgMsgObj);
	        },
	        showPopupToast: function showPopupToast() {
	            var toastMsg = {
	                bodyText: "execute normal dialog callback",
	                timer: 2222, //可不传；默认2000ms
	                callBackFunc: function callBackFunc() {
	                    console.log('callback down!');
	                }
	            };
	            this.$broadcast('show-popup-toast', toastMsg);
	        }
	    }
	};
	// </script>
	//
	// <style media="screen">
	// #normal-dlg-body{
	//     top: 39% !important;
	// }
	// </style>

	/* generated by vue-loader */
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     a(href='javascript:;' @click="onCallDemoClick" class='demonstrate-a') {{ btnText }}
	//     div.comp-area
	//         normal-dialog
	//         popup-toast
	// </template>
	//
	// <script type="text/javascript">

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(40)
	__vue_script__ = __webpack_require__(42)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/widgets/normalDialog.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(43)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./normalDialog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./normalDialog.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./normalDialog.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.dialog.wrap, .normal-dlg-shadow{\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n.normal-dlg-shadow{\n    background: rgba(0,0,0,.6);\n    z-index: 11;\n}\n#normal-dlg-body{\n    position: absolute;\n    top: 20%;\n    left: 52%;\n    width: 70%;\n    z-index: 11;\n    text-align: center;\n    margin-left: -36%;\n    border-radius: .5em;\n    background-color: #130c0e;\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    color: #4B2B1C;\n}\n#normal-dlg-body > h1{\n    font-size: 1.24em;\n    line-height: 2;\n    padding: 0;\n    font-weight: normal;\n    color: #FFF;\n    background-size: 100% 100%;\n    position: relative;\n}\n.normal-dlg-close{\n    position: absolute;\n    right: 3%;\n    top: 3%;\n    background-size: 100% 100%;\n    width: 1.5em;\n    height: 1.5em;\n}\n.normal-dlg-close:before,.normal-dlg-close:after{\n    position: absolute;\n    width: 141.41%;\n}\n.normal-dlg-close:before{\n    content: '';\n    top: 0;\n    display: block;\n    height: 0;\n    border-bottom: 2px solid #fff;\n    -webkit-transform: rotate(45deg);\n    -ms-transform: rotate(45deg);\n    -webkit-transform-origin: left;\n}\n.normal-dlg-close:after{\n    content: '';\n    top: 0;\n    left: 100%;\n    display: block;\n    height: 0;\n    border-bottom: 2px solid #fff;\n    -webkit-transform: rotate(135deg);\n    -ms-transform: rotate(135deg);\n    -webkit-transform-origin: left;\n}\n#normal-dlg-body > section {\n    background-color: #d3d7d4;\n    text-align: left;\n    padding: 4% 2%;\n    font-size: 1em;\n    line-height: 1.2em;\n    border-radius: .5em;\n    width: 87%;\n    margin: 0 auto;\n    text-align: center;\n    margin-top: 4%;\n}\n#normal-dlg-body .confirm{\n    font: 1.2em Microsoft YaHei, sans-serif;\n    line-height: 1.69;\n    font-weight: bold;\n    color: #FFF;\n    text-align: center;\n    display: inline-block;\n    margin: 2% 3% 3%;\n    padding: 0 7%;\n    height: 2.2em;\n    text-decoration: none;\n    border: none;\n    cursor: pointer;\n    background-color: transparent;\n    letter-spacing: .2em;\n    background-size: 100% 100%;\n}\n", "", {"version":3,"sources":["/../components/widgets/normalDialog.vue?1f5fecc8"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAyEA;IACA,mBAAA;IACA,YAAA;IACA,aAAA;IACA,OAAA;IACA,QAAA;CACA;AACA;IACA,2BAAA;IACA,YAAA;CACA;AACA;IACA,mBAAA;IACA,SAAA;IACA,UAAA;IACA,WAAA;IACA,YAAA;IACA,mBAAA;IACA,kBAAA;IACA,oBAAA;IACA,0BAAA;IACA,uBAAA;IACA,+BAAA;IACA,4BAAA;IACA,eAAA;CACA;AACA;IACA,kBAAA;IACA,eAAA;IACA,WAAA;IACA,oBAAA;IACA,YAAA;IACA,2BAAA;IACA,mBAAA;CACA;AACA;IACA,mBAAA;IACA,UAAA;IACA,QAAA;IACA,2BAAA;IACA,aAAA;IACA,cAAA;CACA;AACA;IACA,mBAAA;IACA,eAAA;CACA;AACA;IACA,YAAA;IACA,OAAA;IACA,eAAA;IACA,UAAA;IACA,8BAAA;IACA,iCAAA;IACA,6BAAA;IACA,+BAAA;CACA;AACA;IACA,YAAA;IACA,OAAA;IACA,WAAA;IACA,eAAA;IACA,UAAA;IACA,8BAAA;IACA,kCAAA;IACA,8BAAA;IACA,+BAAA;CACA;AACA;IACA,0BAAA;IACA,iBAAA;IACA,eAAA;IACA,eAAA;IACA,mBAAA;IACA,oBAAA;IACA,WAAA;IACA,eAAA;IACA,mBAAA;IACA,eAAA;CACA;AACA;IACA,wCAAA;IACA,kBAAA;IACA,kBAAA;IACA,YAAA;IACA,mBAAA;IACA,sBAAA;IACA,iBAAA;IACA,cAAA;IACA,cAAA;IACA,sBAAA;IACA,aAAA;IACA,gBAAA;IACA,8BAAA;IACA,qBAAA;IACA,2BAAA;CACA","file":"normalDialog.vue","sourcesContent":["<template>\n<div id=\"modal-template\"  class=\"dialog wrap\" v-if=\"isShowDlgFlag\">\n    <div class=\"normal-dlg-shadow\"></div>\n    <div id=\"normal-dlg-body\">\n        <h1 v-if=\"isShowTitleFlag\">{{{ titleText }}}</h1>\n        <a href=\"javascript:;\" class=\"normal-dlg-close\" v-if=\"isShowCloseXFlag\" @click=\"onCloseClick\"></a>\n        <section> {{{ bodyText }}} </section>\n        <a class=\"confirm\" @click=\"onConfirmClick\">{{ confirmText }}</a>\n    </div>\n</div>\n</template>\n\n<script type=\"text/javascript\">\nexport default {\n    data () {\n        return{\n            titleText: null,\n            bodyText:\"初始数据:Null, Jeff Told U\",\n            confirmText: \"确认\",\n            callBackFunc: null,\n            isShowDlgFlag: false,\n            isShowTitleFlag: true,\n            isShowCloseXFlag: true,\n        }\n    },\n    // props:[\"dlgMsgObj\"],\n    methods: {\n        showNormalDialog: function(dlgMsgObj){\n            if(typeof dlgMsgObj === \"string\"){\n                this.bodyText = dlgMsgObj || this.bodyText;\n            }else{\n                dlgMsgObj = dlgMsgObj || {};\n                this.titleText = dlgMsgObj.titleText || this.titleText;\n                this.bodyText = dlgMsgObj.bodyText || this.bodyText;\n                this.confirmText = dlgMsgObj.confirmText || this.confirmText;\n                this.callBackFunc = dlgMsgObj.callBackFunc || null;\n                this.isShowCloseXFlag = dlgMsgObj.isShowCloseXFlag;\n                this.isShowTitleFlag = (this.titleText == null) ? false : true;\n            }\n\n            this.isShowDlgFlag = true;\n        },\n\n        hideNormalDialog: function(){\n            this.isShowDlgFlag = false;\n        },\n\n\n        /*-----------------Callback Function--------------------Private Func*/\n        onShowDialog: function(dlgMsgObj){\n            this.showNormalDialog(dlgMsgObj);\n        },\n\n        onCloseClick: function(){\n            this.hideNormalDialog();\n        },\n\n        onConfirmClick: function(){\n            if(this.callBackFunc !== null){\n                this.callBackFunc();\n            }\n            this.hideNormalDialog();\n        }\n    },\n    events: {\n        'show-normal-dlg': function (dlgMsgObj) {\n            this.showNormalDialog(dlgMsgObj);\n        }\n    }\n}\n</script>\n\n<style>\n.dialog.wrap, .normal-dlg-shadow{\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n.normal-dlg-shadow{\n    background: rgba(0,0,0,.6);\n    z-index: 11;\n}\n#normal-dlg-body{\n    position: absolute;\n    top: 20%;\n    left: 52%;\n    width: 70%;\n    z-index: 11;\n    text-align: center;\n    margin-left: -36%;\n    border-radius: .5em;\n    background-color: #130c0e;\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    color: #4B2B1C;\n}\n#normal-dlg-body > h1{\n    font-size: 1.24em;\n    line-height: 2;\n    padding: 0;\n    font-weight: normal;\n    color: #FFF;\n    background-size: 100% 100%;\n    position: relative;\n}\n.normal-dlg-close{\n    position: absolute;\n    right: 3%;\n    top: 3%;\n    background-size: 100% 100%;\n    width: 1.5em;\n    height: 1.5em;\n}\n.normal-dlg-close:before,.normal-dlg-close:after{\n    position: absolute;\n    width: 141.41%;\n}\n.normal-dlg-close:before{\n    content: '';\n    top: 0;\n    display: block;\n    height: 0;\n    border-bottom: 2px solid #fff;\n    -webkit-transform: rotate(45deg);\n    -ms-transform: rotate(45deg);\n    -webkit-transform-origin: left;\n}\n.normal-dlg-close:after{\n    content: '';\n    top: 0;\n    left: 100%;\n    display: block;\n    height: 0;\n    border-bottom: 2px solid #fff;\n    -webkit-transform: rotate(135deg);\n    -ms-transform: rotate(135deg);\n    -webkit-transform-origin: left;\n}\n#normal-dlg-body > section {\n    background-color: #d3d7d4;\n    text-align: left;\n    padding: 4% 2%;\n    font-size: 1em;\n    line-height: 1.2em;\n    border-radius: .5em;\n    width: 87%;\n    margin: 0 auto;\n    text-align: center;\n    margin-top: 4%;\n}\n#normal-dlg-body .confirm{\n    font: 1.2em Microsoft YaHei, sans-serif;\n    line-height: 1.69;\n    font-weight: bold;\n    color: #FFF;\n    text-align: center;\n    display: inline-block;\n    margin: 2% 3% 3%;\n    padding: 0 7%;\n    height: 2.2em;\n    text-decoration: none;\n    border: none;\n    cursor: pointer;\n    background-color: transparent;\n    letter-spacing: .2em;\n    background-size: 100% 100%;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	// <div id="modal-template"  class="dialog wrap" v-if="isShowDlgFlag">
	//     <div class="normal-dlg-shadow"></div>
	//     <div id="normal-dlg-body">
	//         <h1 v-if="isShowTitleFlag">{{{ titleText }}}</h1>
	//         <a href="javascript:;" class="normal-dlg-close" v-if="isShowCloseXFlag" @click="onCloseClick"></a>
	//         <section> {{{ bodyText }}} </section>
	//         <a class="confirm" @click="onConfirmClick">{{ confirmText }}</a>
	//     </div>
	// </div>
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        return {
	            titleText: null,
	            bodyText: "初始数据:Null, Jeff Told U",
	            confirmText: "确认",
	            callBackFunc: null,
	            isShowDlgFlag: false,
	            isShowTitleFlag: true,
	            isShowCloseXFlag: true
	        };
	    },
	
	    // props:["dlgMsgObj"],
	    methods: {
	        showNormalDialog: function showNormalDialog(dlgMsgObj) {
	            if (typeof dlgMsgObj === "string") {
	                this.bodyText = dlgMsgObj || this.bodyText;
	            } else {
	                dlgMsgObj = dlgMsgObj || {};
	                this.titleText = dlgMsgObj.titleText || this.titleText;
	                this.bodyText = dlgMsgObj.bodyText || this.bodyText;
	                this.confirmText = dlgMsgObj.confirmText || this.confirmText;
	                this.callBackFunc = dlgMsgObj.callBackFunc || null;
	                this.isShowCloseXFlag = dlgMsgObj.isShowCloseXFlag;
	                this.isShowTitleFlag = this.titleText == null ? false : true;
	            }
	
	            this.isShowDlgFlag = true;
	        },
	
	        hideNormalDialog: function hideNormalDialog() {
	            this.isShowDlgFlag = false;
	        },
	
	        /*-----------------Callback Function--------------------Private Func*/
	        onShowDialog: function onShowDialog(dlgMsgObj) {
	            this.showNormalDialog(dlgMsgObj);
	        },
	
	        onCloseClick: function onCloseClick() {
	            this.hideNormalDialog();
	        },
	
	        onConfirmClick: function onConfirmClick() {
	            if (this.callBackFunc !== null) {
	                this.callBackFunc();
	            }
	            this.hideNormalDialog();
	        }
	    },
	    events: {
	        'show-normal-dlg': function showNormalDlg(dlgMsgObj) {
	            this.showNormalDialog(dlgMsgObj);
	        }
	    }
	};
	// </script>
	//
	// <style>
	// .dialog.wrap, .normal-dlg-shadow{
	//     position: absolute;
	//     width: 100%;
	//     height: 100%;
	//     top: 0;
	//     left: 0;
	// }
	// .normal-dlg-shadow{
	//     background: rgba(0,0,0,.6);
	//     z-index: 11;
	// }
	// #normal-dlg-body{
	//     position: absolute;
	//     top: 20%;
	//     left: 52%;
	//     width: 70%;
	//     z-index: 11;
	//     text-align: center;
	//     margin-left: -36%;
	//     border-radius: .5em;
	//     background-color: #130c0e;
	//     box-sizing: border-box;
	//     -webkit-box-sizing: border-box;
	//     -moz-box-sizing: border-box;
	//     color: #4B2B1C;
	// }
	// #normal-dlg-body > h1{
	//     font-size: 1.24em;
	//     line-height: 2;
	//     padding: 0;
	//     font-weight: normal;
	//     color: #FFF;
	//     background-size: 100% 100%;
	//     position: relative;
	// }
	// .normal-dlg-close{
	//     position: absolute;
	//     right: 3%;
	//     top: 3%;
	//     background-size: 100% 100%;
	//     width: 1.5em;
	//     height: 1.5em;
	// }
	// .normal-dlg-close:before,.normal-dlg-close:after{
	//     position: absolute;
	//     width: 141.41%;
	// }
	// .normal-dlg-close:before{
	//     content: '';
	//     top: 0;
	//     display: block;
	//     height: 0;
	//     border-bottom: 2px solid #fff;
	//     -webkit-transform: rotate(45deg);
	//     -ms-transform: rotate(45deg);
	//     -webkit-transform-origin: left;
	// }
	// .normal-dlg-close:after{
	//     content: '';
	//     top: 0;
	//     left: 100%;
	//     display: block;
	//     height: 0;
	//     border-bottom: 2px solid #fff;
	//     -webkit-transform: rotate(135deg);
	//     -ms-transform: rotate(135deg);
	//     -webkit-transform-origin: left;
	// }
	// #normal-dlg-body > section {
	//     background-color: #d3d7d4;
	//     text-align: left;
	//     padding: 4% 2%;
	//     font-size: 1em;
	//     line-height: 1.2em;
	//     border-radius: .5em;
	//     width: 87%;
	//     margin: 0 auto;
	//     text-align: center;
	//     margin-top: 4%;
	// }
	// #normal-dlg-body .confirm{
	//     font: 1.2em Microsoft YaHei, sans-serif;
	//     line-height: 1.69;
	//     font-weight: bold;
	//     color: #FFF;
	//     text-align: center;
	//     display: inline-block;
	//     margin: 2% 3% 3%;
	//     padding: 0 7%;
	//     height: 2.2em;
	//     text-decoration: none;
	//     border: none;
	//     cursor: pointer;
	//     background-color: transparent;
	//     letter-spacing: .2em;
	//     background-size: 100% 100%;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"modal-template\"  class=\"dialog wrap\" v-if=\"isShowDlgFlag\">\n    <div class=\"normal-dlg-shadow\"></div>\n    <div id=\"normal-dlg-body\">\n        <h1 v-if=\"isShowTitleFlag\">{{{ titleText }}}</h1>\n        <a href=\"javascript:;\" class=\"normal-dlg-close\" v-if=\"isShowCloseXFlag\" @click=\"onCloseClick\"></a>\n        <section> {{{ bodyText }}} </section>\n        <a class=\"confirm\" @click=\"onConfirmClick\">{{ confirmText }}</a>\n    </div>\n</div>\n";

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><a href=\"javascript:;\" @click=\"onCallDemoClick\" class=\"demonstrate-a\">{{ btnText }}</a><div class=\"comp-area\"><normal-dialog></normal-dialog><popup-toast></popup-toast></div>";

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(46)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_strongDialog.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(52)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_strongDialog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _strongDialog = __webpack_require__(47);
	
	var _strongDialog2 = _interopRequireDefault(_strongDialog);
	
	var _popupToast = __webpack_require__(19);
	
	var _popupToast2 = _interopRequireDefault(_popupToast);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	var _annotate = __webpack_require__(24);
	
	var _annotate2 = _interopRequireDefault(_annotate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     div.comp-area
	//         <annotate :blockquote-str='blockquoteStr'></annotate>
	//         a(href='javascript:;' @click="onCallDemoClick" class='demonstrate-a ahead') {{ showStrongDlgText }}
	//         br
	//         a(href='javascript:;' @click="onCloseDemoClick" class='demonstrate-a ahead') {{ hideStrongDlgText }}
	//         div.hold-comp-area
	//             strong-dialog
	//             popup-toast
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        return {
	            showStrongDlgText: "show StrongDialog",
	            hideStrongDlgText: "hide StrongDialog",
	            hintingTitle: "使用示例:",
	            hintingTitle2: "表现示例:",
	            compTitle: "Component Name",
	            codeString: '\n    import strongDialog from \'strongDialog\';  //引入组件\n\n    function leftCallback(){\n        console.log(\'leftCallback To Here\');\n    }\n\n    function rightCallback(){\n        console.log(\'rightCallback To Here\');\n    }\n\n    var dlgMsgObj = {\n        titleText: "&温馨提示&",\n        bodyText: text+\'<b>JeffJade|www.jeffjade.com</b>\',\n        closeXCallBack: null, //关掉顶部 X 按钮执行的回调;\n        btnsObj: {\n            0: {\n                btnText: "取消",\n                callBackFunc: leftCallback\n            },\n            1: {\n                btnText: "确认",\n                callBackFunc: rightCallback\n            }\n        },\n        isShowCloseXFlag: true\n    }\n    this.$broadcast(\'show-strong-dlg\', dlgMsgObj);\n\n    this.$broadcast(\'hide-strong-dlg\');  //主动关闭 StrongDlg；',
	            blockquoteStr: '<strong>微释：</strong>此为一个功能还算丰富的 Dialog 组件(相比于 normalDialog 组件，使用起来就稍显严格)；\n                弹框右上角的关闭按钮是否需要，弹框Tilte是否显示，主体按钮个数(0~2)等等，都会根据所传参数自行控制；\n                另外对于弹框内容部分，也做了对 html 支持，因此可以任意去填充 Dialog 内容。如此，也是个人编程理念的体现，\n                在功能强大跟便捷性之间总要做些权衡，会是倾向于便捷高效基础上尽可能使其强大。'
	        };
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        strongDialog: _strongDialog2.default,
	        popupToast: _popupToast2.default,
	        preCode: _preCode2.default,
	        annotate: _annotate2.default
	    },
	    methods: {
	        showPopupToast: function showPopupToast(text) {
	            var toastMsg = {
	                bodyText: text,
	                timer: 2222, //可不传；默认2000ms
	                callBackFunc: function callBackFunc() {
	                    console.log('callback down!');
	                }
	            };
	            this.$broadcast('show-popup-toast', toastMsg);
	        },
	        onCallDemoClick: function onCallDemoClick() {
	            var _That = this;
	            function leftCallback() {
	                _That.showPopupToast('excute left-btn callback');
	            }
	
	            function rightCallback() {
	                _That.showPopupToast('excute right-btn callback');
	            }
	
	            var dlgMsgObj = {
	                titleText: "&温馨提示&",
	                bodyText: "<b>JeffJade<a href='http://www.jeffjade.com'>www.jeffjade.com</a></b>",
	                closeXCallBack: null, //关掉顶部 X 按钮执行的回调;
	                btnsObj: {
	                    0: {
	                        btnText: "取消",
	                        callBackFunc: leftCallback
	                    },
	                    1: {
	                        btnText: "确认",
	                        callBackFunc: rightCallback
	                    }
	                },
	                isShowCloseXFlag: true
	            };
	            this.$broadcast('show-strong-dlg', dlgMsgObj);
	        },
	        onCloseDemoClick: function onCloseDemoClick() {
	            this.$broadcast('hide-strong-dlg');
	        }
	    }
	};
	// </script>

	/* generated by vue-loader */

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(48)
	__vue_script__ = __webpack_require__(50)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/widgets/strongDialog.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(51)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./strongDialog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(49);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./strongDialog.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./strongDialog.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.dialog.wrap, .strong-dlg-shadow{\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n.strong-dlg-shadow{\n    background: rgba(0,0,0,.6);\n    z-index: 11;\n}\n#strong-dlg-body{\n    position: absolute;\n    top: 20%;\n    left: 52%;\n    width: 70%;\n    z-index: 11;\n    text-align: center;\n    margin-left: -36%;\n    border-radius: .5em;\n    background-color: #130c0e;\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    color: #4B2B1C;\n}\n#strong-dlg-body > h1{\n    font-size: 1.24em;\n    line-height: 2;\n    padding: 0;\n    font-weight: normal;\n    color: #FFF;\n    background-size: 100% 100%;\n    position: relative;\n}\n.strong-dlg-close{\n    position: absolute;\n    right: -1%;\n    top: -3%;\n    background-size: 100% 100%;\n    width: 2.38em;\n    height: 2.38em;\n}\n#strong-dlg-body > section {\n    background-color: #d3d7d4;\n    text-align: left;\n    padding: 4% 2%;\n    font-size: 1em;\n    line-height: 1.2em;\n    border-radius: .5em;\n    width: 87%;\n    margin: 0 auto;\n    text-align: center;\n    margin-top: 4%;\n}\n.strong-dlg-ul{\n    width: 100%;\n    padding: 0;\n    display: -webkit-box; display: -ms-flexbox; display: flex;\n    -webkit-box-align: center; -ms-flex-align: center; align-items: center; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center;\n}\n.strong-dlg-li{\n    list-style: none;\n    width: 21%;\n    margin: auto 8%;\n}\n#strong-dlg-body .strong-dlg-a{\n    font: 1.2em Microsoft YaHei, sans-serif;\n    line-height: 1.69;\n    font-weight: bold;\n    color: #FFF;\n    text-align: center;\n    display: inline-block;\n    margin: 2% 3% 3%;\n    padding: 0 7%;\n    width: 100%;\n    height: 2em;\n    text-decoration: none;\n    border: none;\n    cursor: pointer;\n    background-color: transparent;\n    letter-spacing: .2em;\n    background-size: 100% 100%;\n}\n", "", {"version":3,"sources":["/../components/widgets/strongDialog.vue?25553d22"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAiFA;IACA,mBAAA;IACA,YAAA;IACA,aAAA;IACA,OAAA;IACA,QAAA;CACA;AACA;IACA,2BAAA;IACA,YAAA;CACA;AACA;IACA,mBAAA;IACA,SAAA;IACA,UAAA;IACA,WAAA;IACA,YAAA;IACA,mBAAA;IACA,kBAAA;IACA,oBAAA;IACA,0BAAA;IACA,uBAAA;IACA,+BAAA;IACA,4BAAA;IACA,eAAA;CACA;AACA;IACA,kBAAA;IACA,eAAA;IACA,WAAA;IACA,oBAAA;IACA,YAAA;IACA,2BAAA;IACA,mBAAA;CACA;AACA;IACA,mBAAA;IACA,WAAA;IACA,SAAA;IACA,2BAAA;IACA,cAAA;IACA,eAAA;CACA;AACA;IACA,0BAAA;IACA,iBAAA;IACA,eAAA;IACA,eAAA;IACA,mBAAA;IACA,oBAAA;IACA,WAAA;IACA,eAAA;IACA,mBAAA;IACA,eAAA;CACA;AACA;IACA,YAAA;IACA,WAAA;IACA,qBAAA,CAAA,qBAAA,CAAA,cAAA;IACA,0BAAA,CACA,uBAAA,CAAA,oBAAA,CAAA,yBAAA,CACA,sBAAA,CAAA,wBAAA;CACA;AACA;IACA,iBAAA;IACA,WAAA;IACA,gBAAA;CACA;AACA;IACA,wCAAA;IACA,kBAAA;IACA,kBAAA;IACA,YAAA;IACA,mBAAA;IACA,sBAAA;IACA,iBAAA;IACA,cAAA;IACA,YAAA;IACA,YAAA;IACA,sBAAA;IACA,aAAA;IACA,gBAAA;IACA,8BAAA;IACA,qBAAA;IACA,2BAAA;CACA","file":"strongDialog.vue","sourcesContent":["<template>\n<div id='modal-template'  class='dialog wrap' v-if='isShowDlgFlag'>\n    <div class='strong-dlg-shadow'></div>\n    <div id='strong-dlg-body' class=\"dlg-body\">\n        <h1 v-if='isShowTitleFlag'>{{{ titleText }}}</h1>\n        <a href='javascript:;' class='strong-dlg-close' v-if='isShowCloseXFlag' @click='onCloseClick'></a>\n        <section> {{{ bodyText }}} </section>\n        <ul class='strong-dlg-ul'>\n            <li v-for='btnItem in btnsObj' class='strong-dlg-li'>\n                <a class='strong-dlg-a dlg-submit-btn' @click='onBtnClick($index)'>\n                    {{ btnItem.btnText }}\n                </a>\n            </li>\n        </ul>\n    </div>\n</div>\n</template>\n\n<script type=\"text/javascript\">\nexport default {\n    data () {\n        return{\n            titleText: null,\n            bodyText: null,\n            btnsObj: {},\n            isShowDlgFlag: false,\n            isShowTitleFlag: false,\n            isShowCloseXFlag: true,\n        }\n    },\n    methods: {\n        showStrongDialog: function(dlgMsgObj){\n            dlgMsgObj = dlgMsgObj || {};\n\n            this.titleText = dlgMsgObj.titleText || this.titleText;\n            this.bodyText = dlgMsgObj.bodyText || this.bodyText;\n            this.btnsObj = dlgMsgObj.btnsObj || {};\n            this.closeXCallBack = dlgMsgObj.closeXCallBack || null;\n\n            this.isShowTitleFlag = (this.titleText !== null) ? true : false;\n            this.isShowCloseXFlag = dlgMsgObj.isShowCloseXFlag;\n            this.isShowDlgFlag = true;\n        },\n\n        hideStrongDialog: function(){\n            this.isShowDlgFlag = false;\n        },\n\n        /*-----------------Callback Function--------------------Private Func*/\n        onShowDialog: function(dlgMsgObj){\n            this.showStrongDialog(dlgMsgObj);\n        },\n\n        onCloseClick: function(){\n            this.hideStrongDialog();\n            if( null !== this.closeXCallBack ){\n                this.closeXCallBack()\n            }\n        },\n        onBtnClick: function( index ){\n            this.hideStrongDialog();\n            this.onCallbackFunc( index );\n        },\n        onCallbackFunc: function( index ){\n            if(this.btnsObj[index].callBackFunc !== null){\n               this.btnsObj[index].callBackFunc();\n            }\n        },\n    },\n    events: {\n        'show-strong-dlg': function (dlgMsgObj) {\n            this.showStrongDialog(dlgMsgObj)\n        },\n        'hide-strong-dlg': function(){\n            this.hideStrongDialog()\n        }\n    }\n}\n</script>\n\n<style>\n.dialog.wrap, .strong-dlg-shadow{\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n.strong-dlg-shadow{\n    background: rgba(0,0,0,.6);\n    z-index: 11;\n}\n#strong-dlg-body{\n    position: absolute;\n    top: 20%;\n    left: 52%;\n    width: 70%;\n    z-index: 11;\n    text-align: center;\n    margin-left: -36%;\n    border-radius: .5em;\n    background-color: #130c0e;\n    box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    color: #4B2B1C;\n}\n#strong-dlg-body > h1{\n    font-size: 1.24em;\n    line-height: 2;\n    padding: 0;\n    font-weight: normal;\n    color: #FFF;\n    background-size: 100% 100%;\n    position: relative;\n}\n.strong-dlg-close{\n    position: absolute;\n    right: -1%;\n    top: -3%;\n    background-size: 100% 100%;\n    width: 2.38em;\n    height: 2.38em;\n}\n#strong-dlg-body > section {\n    background-color: #d3d7d4;\n    text-align: left;\n    padding: 4% 2%;\n    font-size: 1em;\n    line-height: 1.2em;\n    border-radius: .5em;\n    width: 87%;\n    margin: 0 auto;\n    text-align: center;\n    margin-top: 4%;\n}\n.strong-dlg-ul{\n    width: 100%;\n    padding: 0;\n    display: -webkit-box; display: -moz-box; display: -webkit-flex; display: flex;\n    -webkit-box-align: center;-moz-box-align: center;\n    -webkit-align-items: center; align-items: center; -webkit-box-pack: center;\n    -webkit-justify-content: center; justify-content: center;\n}\n.strong-dlg-li{\n    list-style: none;\n    width: 21%;\n    margin: auto 8%;\n}\n#strong-dlg-body .strong-dlg-a{\n    font: 1.2em Microsoft YaHei, sans-serif;\n    line-height: 1.69;\n    font-weight: bold;\n    color: #FFF;\n    text-align: center;\n    display: inline-block;\n    margin: 2% 3% 3%;\n    padding: 0 7%;\n    width: 100%;\n    height: 2em;\n    text-decoration: none;\n    border: none;\n    cursor: pointer;\n    background-color: transparent;\n    letter-spacing: .2em;\n    background-size: 100% 100%;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	// <div id='modal-template'  class='dialog wrap' v-if='isShowDlgFlag'>
	//     <div class='strong-dlg-shadow'></div>
	//     <div id='strong-dlg-body' class="dlg-body">
	//         <h1 v-if='isShowTitleFlag'>{{{ titleText }}}</h1>
	//         <a href='javascript:;' class='strong-dlg-close' v-if='isShowCloseXFlag' @click='onCloseClick'></a>
	//         <section> {{{ bodyText }}} </section>
	//         <ul class='strong-dlg-ul'>
	//             <li v-for='btnItem in btnsObj' class='strong-dlg-li'>
	//                 <a class='strong-dlg-a dlg-submit-btn' @click='onBtnClick($index)'>
	//                     {{ btnItem.btnText }}
	//                 </a>
	//             </li>
	//         </ul>
	//     </div>
	// </div>
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        return {
	            titleText: null,
	            bodyText: null,
	            btnsObj: {},
	            isShowDlgFlag: false,
	            isShowTitleFlag: false,
	            isShowCloseXFlag: true
	        };
	    },
	
	    methods: {
	        showStrongDialog: function showStrongDialog(dlgMsgObj) {
	            dlgMsgObj = dlgMsgObj || {};
	
	            this.titleText = dlgMsgObj.titleText || this.titleText;
	            this.bodyText = dlgMsgObj.bodyText || this.bodyText;
	            this.btnsObj = dlgMsgObj.btnsObj || {};
	            this.closeXCallBack = dlgMsgObj.closeXCallBack || null;
	
	            this.isShowTitleFlag = this.titleText !== null ? true : false;
	            this.isShowCloseXFlag = dlgMsgObj.isShowCloseXFlag;
	            this.isShowDlgFlag = true;
	        },
	
	        hideStrongDialog: function hideStrongDialog() {
	            this.isShowDlgFlag = false;
	        },
	
	        /*-----------------Callback Function--------------------Private Func*/
	        onShowDialog: function onShowDialog(dlgMsgObj) {
	            this.showStrongDialog(dlgMsgObj);
	        },
	
	        onCloseClick: function onCloseClick() {
	            this.hideStrongDialog();
	            if (null !== this.closeXCallBack) {
	                this.closeXCallBack();
	            }
	        },
	        onBtnClick: function onBtnClick(index) {
	            this.hideStrongDialog();
	            this.onCallbackFunc(index);
	        },
	        onCallbackFunc: function onCallbackFunc(index) {
	            if (this.btnsObj[index].callBackFunc !== null) {
	                this.btnsObj[index].callBackFunc();
	            }
	        }
	    },
	    events: {
	        'show-strong-dlg': function showStrongDlg(dlgMsgObj) {
	            this.showStrongDialog(dlgMsgObj);
	        },
	        'hide-strong-dlg': function hideStrongDlg() {
	            this.hideStrongDialog();
	        }
	    }
	};
	// </script>
	//
	// <style>
	// .dialog.wrap, .strong-dlg-shadow{
	//     position: absolute;
	//     width: 100%;
	//     height: 100%;
	//     top: 0;
	//     left: 0;
	// }
	// .strong-dlg-shadow{
	//     background: rgba(0,0,0,.6);
	//     z-index: 11;
	// }
	// #strong-dlg-body{
	//     position: absolute;
	//     top: 20%;
	//     left: 52%;
	//     width: 70%;
	//     z-index: 11;
	//     text-align: center;
	//     margin-left: -36%;
	//     border-radius: .5em;
	//     background-color: #130c0e;
	//     box-sizing: border-box;
	//     -webkit-box-sizing: border-box;
	//     -moz-box-sizing: border-box;
	//     color: #4B2B1C;
	// }
	// #strong-dlg-body > h1{
	//     font-size: 1.24em;
	//     line-height: 2;
	//     padding: 0;
	//     font-weight: normal;
	//     color: #FFF;
	//     background-size: 100% 100%;
	//     position: relative;
	// }
	// .strong-dlg-close{
	//     position: absolute;
	//     right: -1%;
	//     top: -3%;
	//     background-size: 100% 100%;
	//     width: 2.38em;
	//     height: 2.38em;
	// }
	// #strong-dlg-body > section {
	//     background-color: #d3d7d4;
	//     text-align: left;
	//     padding: 4% 2%;
	//     font-size: 1em;
	//     line-height: 1.2em;
	//     border-radius: .5em;
	//     width: 87%;
	//     margin: 0 auto;
	//     text-align: center;
	//     margin-top: 4%;
	// }
	// .strong-dlg-ul{
	//     width: 100%;
	//     padding: 0;
	//     display: -webkit-box; display: -moz-box; display: -webkit-flex; display: flex;
	//     -webkit-box-align: center;-moz-box-align: center;
	//     -webkit-align-items: center; align-items: center; -webkit-box-pack: center;
	//     -webkit-justify-content: center; justify-content: center;
	// }
	// .strong-dlg-li{
	//     list-style: none;
	//     width: 21%;
	//     margin: auto 8%;
	// }
	// #strong-dlg-body .strong-dlg-a{
	//     font: 1.2em Microsoft YaHei, sans-serif;
	//     line-height: 1.69;
	//     font-weight: bold;
	//     color: #FFF;
	//     text-align: center;
	//     display: inline-block;
	//     margin: 2% 3% 3%;
	//     padding: 0 7%;
	//     width: 100%;
	//     height: 2em;
	//     text-decoration: none;
	//     border: none;
	//     cursor: pointer;
	//     background-color: transparent;
	//     letter-spacing: .2em;
	//     background-size: 100% 100%;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "\n<div id='modal-template'  class='dialog wrap' v-if='isShowDlgFlag'>\n    <div class='strong-dlg-shadow'></div>\n    <div id='strong-dlg-body' class=\"dlg-body\">\n        <h1 v-if='isShowTitleFlag'>{{{ titleText }}}</h1>\n        <a href='javascript:;' class='strong-dlg-close' v-if='isShowCloseXFlag' @click='onCloseClick'></a>\n        <section> {{{ bodyText }}} </section>\n        <ul class='strong-dlg-ul'>\n            <li v-for='btnItem in btnsObj' class='strong-dlg-li'>\n                <a class='strong-dlg-a dlg-submit-btn' @click='onBtnClick($index)'>\n                    {{ btnItem.btnText }}\n                </a>\n            </li>\n        </ul>\n    </div>\n</div>\n";

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><div class=\"comp-area\"><annotate :blockquote-str='blockquoteStr'></annotate><a href=\"javascript:;\" @click=\"onCallDemoClick\" class=\"demonstrate-a ahead\">{{ showStrongDlgText }}</a><br/><a href=\"javascript:;\" @click=\"onCloseDemoClick\" class=\"demonstrate-a ahead\">{{ hideStrongDlgText }}</a><div class=\"hold-comp-area\"><strong-dialog></strong-dialog><popup-toast></popup-toast></div></div>";

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(54)
	__vue_script__ = __webpack_require__(56)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_tabBarWithJq.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(60)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_tabBarWithJq.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(55);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_tabBarWithJq.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_tabBarWithJq.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.content{\n    margin-top: 2%;\n    height: 3em;\n    line-height: 3;\n    width: 100%;\n    display: inline-block;\n    text-align: center;\n    background-color: #2F2F2F;\n    color: purple;\n    font-size: 2em;\n}\n.tab-bar-li{\n    float: left;\n    margin: 2% 2% 1% 0%;\n    padding: 1%;\n    background-color: rgba(11,11,11,.6);\n}\n.tab-bar-li.active{\n    background-color: #523B76;\n}\n", "", {"version":3,"sources":["/./src/_tabBarWithJq.vue?1670661e"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA0DA;IACA,eAAA;IACA,YAAA;IACA,eAAA;IACA,YAAA;IACA,sBAAA;IACA,mBAAA;IACA,0BAAA;IACA,cAAA;IACA,eAAA;CACA;AACA;IACA,YAAA;IACA,oBAAA;IACA,YAAA;IACA,oCAAA;CACA;AACA;IACA,0BAAA;CACA","file":"_tabBarWithJq.vue","sourcesContent":["<template lang='jade'>\n    h1#comp-title {{ compTitle }}\n    h2.hinting-title {{ hintingTitle }}\n    <pre-code :code-string=\"codeString\"></pre-code>\n    h2.hinting-title {{ hintingTitle2 }}\n    div.comp-area\n        <tab-bar-with-jq :tab-list.sync=\"tabList\"></tab-bar-with-jq>\n        div.content\n            section {{ prefixStr + tabList[0] }}\n            section(style=\"display:none;\") {{ prefixStr + tabList[1] }}\n            section(style=\"display:none;\") {{ prefixStr + tabList[2] }}\n            section(style=\"display:none;\") {{ prefixStr + tabList[3] }}\n</template>\n\n<script type=\"text/javascript\">\nimport tabBarWithJq from 'tabBarWithJq'\nimport preCode from './preCode.vue'\n\nexport default {\n    data () {\n        return {\n            hintingTitle2: \"表现示例:\",\n            compTitle : \"Component Name\",\n            hintingTitle: \"使用示例:\",\n            prefixStr: \"当前页面是: \",\n            tabList: {\n                \"0\": \"赵钱孙李\",\n                \"1\": \"周吴郑王\",\n                \"2\": \"冯陈诸卫\",\n                \"3\": \"蒋沈韩杨\",\n            },\n            codeString: `\n    import tabBarWithJq from 'tabBarWithJq'; //引入组件\n\n    //在模板(jade)中如下注入组件and标签页即可(定义tabList数组/Object)：\n    <tab-bar-with-jq :tab-list.sync=\"tabList\"></tab-bar-with-jq>\n    div.content\n        section {{ tabList[1] }}\n        section(style=\"display:none;\") {{ tabList[2] }}\n        section(style=\"display:none;\") {{ tabList[3] }}\n        section(style=\"display:none;\") {{ tabList[4] }}`\n        }\n    },\n    route:{\n\t\tdata(transition){\n            this.compTitle = transition.to.name\n\t\t}\n\t},\n    components: {\n        tabBarWithJq,\n        preCode,\n    },\n    methods: {\n    }\n}\n</script>\n\n<style media=\"screen\">\n.content{\n    margin-top: 2%;\n    height: 3em;\n    line-height: 3;\n    width: 100%;\n    display: inline-block;\n    text-align: center;\n    background-color: #2F2F2F;\n    color: purple;\n    font-size: 2em;\n}\n.tab-bar-li{\n    float: left;\n    margin: 2% 2% 1% 0%;\n    padding: 1%;\n    background-color: rgba(11,11,11,.6);\n}\n.tab-bar-li.active{\n    background-color: #523B76;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _tabBarWithJq = __webpack_require__(57);
	
	var _tabBarWithJq2 = _interopRequireDefault(_tabBarWithJq);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     div.comp-area
	//         <tab-bar-with-jq :tab-list.sync="tabList"></tab-bar-with-jq>
	//         div.content
	//             section {{ prefixStr + tabList[0] }}
	//             section(style="display:none;") {{ prefixStr + tabList[1] }}
	//             section(style="display:none;") {{ prefixStr + tabList[2] }}
	//             section(style="display:none;") {{ prefixStr + tabList[3] }}
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        return {
	            hintingTitle2: "表现示例:",
	            compTitle: "Component Name",
	            hintingTitle: "使用示例:",
	            prefixStr: "当前页面是: ",
	            tabList: {
	                "0": "赵钱孙李",
	                "1": "周吴郑王",
	                "2": "冯陈诸卫",
	                "3": "蒋沈韩杨"
	            },
	            codeString: '\n    import tabBarWithJq from \'tabBarWithJq\'; //引入组件\n\n    //在模板(jade)中如下注入组件and标签页即可(定义tabList数组/Object)：\n    <tab-bar-with-jq :tab-list.sync="tabList"></tab-bar-with-jq>\n    div.content\n        section {{ tabList[1] }}\n        section(style="display:none;") {{ tabList[2] }}\n        section(style="display:none;") {{ tabList[3] }}\n        section(style="display:none;") {{ tabList[4] }}'
	        };
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        tabBarWithJq: _tabBarWithJq2.default,
	        preCode: _preCode2.default
	    },
	    methods: {}
	};
	// </script>
	//
	// <style media="screen">
	// .content{
	//     margin-top: 2%;
	//     height: 3em;
	//     line-height: 3;
	//     width: 100%;
	//     display: inline-block;
	//     text-align: center;
	//     background-color: #2F2F2F;
	//     color: purple;
	//     font-size: 2em;
	// }
	// .tab-bar-li{
	//     float: left;
	//     margin: 2% 2% 1% 0%;
	//     padding: 1%;
	//     background-color: rgba(11,11,11,.6);
	// }
	// .tab-bar-li.active{
	//     background-color: #523B76;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(58)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/widgets/tabBarWithJq.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(59)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./tabBarWithJq.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//   <header>
	//         <a href="javascript:;" id="tab-bar-back" @click="onBackToIndexClick" v-if="isShowBackBtnFlag"></a>
	//         <nav>
	//             <ul id="tab-bar-ul">
	//                 <li v-for="(index,liItem) in tabList" @click="onSwitchSectionClick" class="tab-bar-li" :class="{active:index=='0'}">
	//                     {{ liItem }}
	//                 </li>
	//             </ul>
	//         </nav>
	//     </header>
	// </template>
	//
	// <script>
	exports.default = {
	    props: ['tabList', 'isShowBackBtnFlag'],
	    data: function data() {
	        return {};
	    },
	    ready: function ready() {},
	
	    methods: {
	        onSwitchSectionClick: function onSwitchSectionClick(e) {
	            var self = e.currentTarget;
	            var i = $(self).index();
	            $(self).addClass('active').siblings().removeClass('active');
	            $('.content').find('section').eq(i).show().siblings('section').hide();
	        },
	        onBackToIndexClick: function onBackToIndexClick() {
	            var href = window.location.href;
	            var index = href.lastIndexOf("#");
	            var actRuter = href.substring(index);
	            href = href.replace(actRuter, '');
	            window.location.href = href;
	        }
	    }
	};
	// </script>
	/* generated by vue-loader */

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "\n<header>\n      <a href=\"javascript:;\" id=\"tab-bar-back\" @click=\"onBackToIndexClick\" v-if=\"isShowBackBtnFlag\"></a>\n      <nav>\n          <ul id=\"tab-bar-ul\">\n              <li v-for=\"(index,liItem) in tabList\" @click=\"onSwitchSectionClick\" class=\"tab-bar-li\" :class=\"{active:index=='0'}\">\n                  {{ liItem }}\n              </li>\n          </ul>\n      </nav>\n  </header>\n";

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><div class=\"comp-area\"><tab-bar-with-jq :tab-list.sync=\"tabList\"></tab-bar-with-jq><div class=\"content\"><section>{{ prefixStr + tabList[0] }}</section><section style=\"display:none;\">{{ prefixStr + tabList[1] }}</section><section style=\"display:none;\">{{ prefixStr + tabList[2] }}</section><section style=\"display:none;\">{{ prefixStr + tabList[3] }}</section></div></div>";

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(62)
	__vue_script__ = __webpack_require__(64)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_tabBarWithRouter.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(69)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_tabBarWithRouter.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(63);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_tabBarWithRouter.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_tabBarWithRouter.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.content{\n    margin-top: 2%;\n    height: 3em;\n    line-height: 3;\n    width: 100%;\n    display: inline-block;\n    text-align: center;\n    background-color: #2F2F2F;\n    color: purple;\n    font-size: 2em;\n}\n.tab-bar-li{\n    float: left;\n    margin: 2% 2% 1% 0%;\n    padding: 1%;\n    background-color: rgba(11,11,11,.6);\n}\n.tab-bar-li.active{\n    background-color: #523B76;\n}\n", "", {"version":3,"sources":["/./src/_tabBarWithRouter.vue?4f5f309e"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAyEA;IACA,eAAA;IACA,YAAA;IACA,eAAA;IACA,YAAA;IACA,sBAAA;IACA,mBAAA;IACA,0BAAA;IACA,cAAA;IACA,eAAA;CACA;AACA;IACA,YAAA;IACA,oBAAA;IACA,YAAA;IACA,oCAAA;CACA;AACA;IACA,0BAAA;CACA","file":"_tabBarWithRouter.vue","sourcesContent":["<template lang='jade'>\n    h1#comp-title {{ compTitle }}\n    h2#hinting-title {{ hintingTitle }}\n    <pre-code :code-string=\"codeString\"></pre-code>\n    h2#hinting-title {{ hintingTitle2 }}\n    div.comp-area\n        <annotate :blockquote-str='blockquoteStr'></annotate>\n        <tab-bar-with-router :tab-list.sync=\"tabList\"></tab-bar-with-router>\n        div.content\n            <router-view></router-view>\n</template>\n\n<script type=\"text/javascript\">\nimport tabBarWithRouter from 'tabBarWithRouter'\nimport annotate from './annotate.vue'\nimport preCode from './preCode.vue'\nvar tabbarConfig = require('./../config/tabbar.config.js')();\n\nexport default {\n    data () {\n        return {\n            hintingTitle2: \"表现示例:\",\n            compTitle : \"Component Name\",\n            hintingTitle: \"使用示例:\",\n            tabList: tabbarConfig,\n            codeString: `\n\n    //在模板(jade)中如下注入组件and标签页即可(定义tabList数组/Object)：\n    <template lang='jade'>\n        <tab-bar-with-router :tab-list.sync=\"tabList\"></tab-bar-with-router>\n        div.content\n                <router-view></router-view>\n    <template lang='jade'>\n\n    <script type=\"text/javascript\">\n        import tabBarWithRouter from 'tabBarWithRouter'\n        var tabbarConfig = require('./../config/tabbar.config.js')();\n\n        export default {\n            data () {\n                return {\n                    tabList: tabbarConfig,\n            },\n            components: {\n                tabBarWithRouter,\n            }\n        }\n    < /script>\n    `,\n        blockquoteStr:`\n            <strong>温馨提示：</strong>此组件以 v-link(一个用来让用户在 vue-router 应用的不同路径跳转的指令)来实现单页面 Tab 栏切换，\n            意在让可重复利用 Tab页面组件化，并且可自由配置化，而无需人为进行 import，从而达到节省人力的目的；并且也有别于 tabBarWithJq,\n            不去依赖 Jquery 以及特别约定(类/Section/Dom结构)的限制，从而让组件的使用可更为自由化。<strong style=\"color:#f00\">微注：</strong>\n            但目前尚在完善更新阶段，还有诸多瑕疵需要解决: 比如组件动态数据的注入，v-link-active的添加等等。\n        `\n        }\n    },\n    route:{\n\t\tdata(transition){\n            this.compTitle = transition.to.name\n\t\t}\n\t},\n    components: {\n        tabBarWithRouter,\n        annotate,\n        preCode,\n    },\n    methods: {\n    }\n}\n</script>\n\n<style media=\"screen\">\n.content{\n    margin-top: 2%;\n    height: 3em;\n    line-height: 3;\n    width: 100%;\n    display: inline-block;\n    text-align: center;\n    background-color: #2F2F2F;\n    color: purple;\n    font-size: 2em;\n}\n.tab-bar-li{\n    float: left;\n    margin: 2% 2% 1% 0%;\n    padding: 1%;\n    background-color: rgba(11,11,11,.6);\n}\n.tab-bar-li.active{\n    background-color: #523B76;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _tabBarWithRouter = __webpack_require__(65);
	
	var _tabBarWithRouter2 = _interopRequireDefault(_tabBarWithRouter);
	
	var _annotate = __webpack_require__(24);
	
	var _annotate2 = _interopRequireDefault(_annotate);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var tabbarConfig = __webpack_require__(68)(); // <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2#hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2#hinting-title {{ hintingTitle2 }}
	//     div.comp-area
	//         <annotate :blockquote-str='blockquoteStr'></annotate>
	//         <tab-bar-with-router :tab-list.sync="tabList"></tab-bar-with-router>
	//         div.content
	//             <router-view></router-view>
	// </template>
	//
	// <script type="text/javascript">
	
	
	exports.default = {
	    data: function data() {
	        return {
	            hintingTitle2: "表现示例:",
	            compTitle: "Component Name",
	            hintingTitle: "使用示例:",
	            tabList: tabbarConfig,
	            codeString: '\n\n    //在模板(jade)中如下注入组件and标签页即可(定义tabList数组/Object)：\n    <template lang=\'jade\'>\n        <tab-bar-with-router :tab-list.sync="tabList"></tab-bar-with-router>\n        div.content\n                <router-view></router-view>\n    <template lang=\'jade\'>\n\n    <script type="text/javascript">\n        import tabBarWithRouter from \'tabBarWithRouter\'\n        var tabbarConfig = require(\'./../config/tabbar.config.js\')();\n\n        export default {\n            data () {\n                return {\n                    tabList: tabbarConfig,\n            },\n            components: {\n                tabBarWithRouter,\n            }\n        }\n    < /script>\n    ',
	            blockquoteStr: '\n            <strong>温馨提示：</strong>此组件以 v-link(一个用来让用户在 vue-router 应用的不同路径跳转的指令)来实现单页面 Tab 栏切换，\n            意在让可重复利用 Tab页面组件化，并且可自由配置化，而无需人为进行 import，从而达到节省人力的目的；并且也有别于 tabBarWithJq,\n            不去依赖 Jquery 以及特别约定(类/Section/Dom结构)的限制，从而让组件的使用可更为自由化。<strong style="color:#f00">微注：</strong>\n            但目前尚在完善更新阶段，还有诸多瑕疵需要解决: 比如组件动态数据的注入，v-link-active的添加等等。\n        '
	        };
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        tabBarWithRouter: _tabBarWithRouter2.default,
	        annotate: _annotate2.default,
	        preCode: _preCode2.default
	    },
	    methods: {}
	};
	// </script>
	//
	// <style media="screen">
	// .content{
	//     margin-top: 2%;
	//     height: 3em;
	//     line-height: 3;
	//     width: 100%;
	//     display: inline-block;
	//     text-align: center;
	//     background-color: #2F2F2F;
	//     color: purple;
	//     font-size: 2em;
	// }
	// .tab-bar-li{
	//     float: left;
	//     margin: 2% 2% 1% 0%;
	//     padding: 1%;
	//     background-color: rgba(11,11,11,.6);
	// }
	// .tab-bar-li.active{
	//     background-color: #523B76;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(66)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/widgets/tabBarWithRouter.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(67)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./tabBarWithRouter.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <header>
	//         <a href="javascript:;" id="tab-bar-back" @click="onBackToIndexClick" v-if="isShowBackBtnFlag"></a>
	//         <nav>
	//             <ul id="tab-bar-ul">
	//                 <a v-for="(index, item) in tabList" v-link="item.path" class="tab-bar-li">
	//                     {{ item.name }}
	//                 </a>
	//             </ul>
	//         </nav>
	//     </header>
	//     <router-view></router-view>
	// </template>
	//
	//
	// <script>
	exports.default = {
	    props: ['tabList', 'isShowBackBtnFlag'],
	    data: function data() {
	        return {};
	    },
	    ready: function ready() {
	        if (window.location.hash = '#/tabBarWithRouter') {
	            location.hash = location.hash + '/';
	        }
	    },
	
	    methods: {
	        onBackToIndexClick: function onBackToIndexClick() {
	            var href = window.location.href;
	            var index = href.lastIndexOf("#");
	            var actRuter = href.substring(index);
	            href = href.replace(actRuter, '');
	            window.location.href = href;
	        }
	    }
	};
	// </script>

	/* generated by vue-loader */

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = "\n<header>\n    <a href=\"javascript:;\" id=\"tab-bar-back\" @click=\"onBackToIndexClick\" v-if=\"isShowBackBtnFlag\"></a>\n    <nav>\n        <ul id=\"tab-bar-ul\">\n            <a v-for=\"(index, item) in tabList\" v-link=\"item.path\" class=\"tab-bar-li\">\n                {{ item.name }}\n            </a>\n        </ul>\n    </nav>\n</header>\n<router-view></router-view>\n";

/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function() {
		return {
	        "0":{
	            "index": '/main',
	            "name": "Main Page Tab",
	            "components": "./main.vue",
	            "path": "main"
	        },
	        "1":{
	            "index": '/rule',
	            "name": "Rule Page Tab",
	            "components": "./rule.vue",
	            "path": "rule"
	        }
		}
	}


/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 id=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 id=\"hinting-title\">{{ hintingTitle2 }}</h2><div class=\"comp-area\"><annotate :blockquote-str='blockquoteStr'></annotate>\n<tab-bar-with-router :tab-list.sync=\"tabList\"></tab-bar-with-router><div class=\"content\"><router-view></router-view></div></div>";

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(71)
	__vue_script__ = __webpack_require__(73)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_spanFlexTable.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(79)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_spanFlexTable.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(72);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_spanFlexTable.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_spanFlexTable.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#components-wraper #span-flex-table{\n    width: 77%;\n    margin: 3% auto;\n    background-color: #222222;\n    color: #f2f2f2;\n}\n", "", {"version":3,"sources":["/./src/_spanFlexTable.vue?165b53e8"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA+EA;IACA,WAAA;IACA,gBAAA;IACA,0BAAA;IACA,eAAA;CACA","file":"_spanFlexTable.vue","sourcesContent":["<template lang='jade'>\n    h1#comp-title {{ compTitle }}\n    h2.hinting-title {{ hintingTitle }}\n    <pre-code :code-string=\"codeString\"></pre-code>\n    h2.hinting-title {{ hintingTitle2 }}\n    div.comp-area\n        <annotate :blockquote-str='blockquoteStr'></annotate>\n        a(href='javascript:;' @click=\"onAddLineClick\" class='common-a') {{ addLine }}\n        a(href='javascript:;' @click=\"onAddColumnClick\" class='common-a') {{ addColumn }}\n        <span-flex-table :table-list.sync='tableList'></span-flex-table>\n</template>\n\n<script type=\"text/javascript\">\nimport spanFlexTable from 'spanFlexTable'\nimport preCode from './preCode.vue'\nimport annotate from './annotate.vue'\n\nexport default {\n    data () {\n        return {\n            compTitle : \"Component Name\",\n            xLimitControl:3,\n            yLimitControl:4,\n            addLine: \"Add Line\",\n            addColumn: \"Add Column\",\n            hintingTitle: \"使用示例:\",\n            hintingTitle2: \"表现示例:\",\n            tableList: [],\n            codeString: `\n    import spanFlexTable from 'spanFlexTable'; //引入组件\n\n    //在模板中如下加入组件即可(定义tabList数组/Object)：\n    <span-flex-table :table-list.sync='tableList'></span-flex-table>`,\n            blockquoteStr: `\n                <strong>微注: </strong>这个组件同<font color=\"#fe0\"> commonTable </font>组件功能类似；只不过运用CSS样式有区别，\n                commonTable 此组件采取 <font color=\"#f00\">display: table</font>来布局；而此组件借助CSS3伸缩盒模型:<font color=\"#f00\">display: flex</font>;\n                虽然浏览器的支持越来越快，但目前尚有浏览器支持的并不是很好(包括Pc，移动，Tv等平台)，因此现在对它的使用还是有很多局限性（16-06-22 update）。\n            `\n        }\n    },\n    ready(){\n        this.setTableList()\n    },\n    route:{\n\t\tdata(transition){\n            this.compTitle = transition.to.name\n\t\t}\n\t},\n    components: {\n        spanFlexTable,\n        annotate,\n        preCode,\n    },\n    methods: {\n        setTableList: function(){\n            let tempArr = [];\n            for(let i=0; i<= this.xLimitControl; i++){\n                tempArr[i] = []\n                for(let j=0; j<=this.yLimitControl; j++){\n                    tempArr[i][j] = 'iLoveU' + j;\n                }\n            }\n            this.tableList = tempArr\n        },\n        onAddLineClick: function(){\n            this.xLimitControl += 1\n            this.xLimitControl = (this.xLimitControl < 5) ? this.xLimitControl : 0\n            this.setTableList()\n        },\n        onAddColumnClick: function(){\n            this.yLimitControl += 1\n            this.yLimitControl = (this.yLimitControl <= 5) ? this.yLimitControl : 0\n            this.setTableList()\n        }\n    }\n}\n</script>\n\n<style media=\"screen\">\n#components-wraper #span-flex-table{\n    width: 77%;\n    margin: 3% auto;\n    background-color: #222222;\n    color: #f2f2f2;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _spanFlexTable = __webpack_require__(74);
	
	var _spanFlexTable2 = _interopRequireDefault(_spanFlexTable);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	var _annotate = __webpack_require__(24);
	
	var _annotate2 = _interopRequireDefault(_annotate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            compTitle: "Component Name",
	            xLimitControl: 3,
	            yLimitControl: 4,
	            addLine: "Add Line",
	            addColumn: "Add Column",
	            hintingTitle: "使用示例:",
	            hintingTitle2: "表现示例:",
	            tableList: [],
	            codeString: '\n    import spanFlexTable from \'spanFlexTable\'; //引入组件\n\n    //在模板中如下加入组件即可(定义tabList数组/Object)：\n    <span-flex-table :table-list.sync=\'tableList\'></span-flex-table>',
	            blockquoteStr: '\n                <strong>微注: </strong>这个组件同<font color="#fe0"> commonTable </font>组件功能类似；只不过运用CSS样式有区别，\n                commonTable 此组件采取 <font color="#f00">display: table</font>来布局；而此组件借助CSS3伸缩盒模型:<font color="#f00">display: flex</font>;\n                虽然浏览器的支持越来越快，但目前尚有浏览器支持的并不是很好(包括Pc，移动，Tv等平台)，因此现在对它的使用还是有很多局限性（16-06-22 update）。\n            '
	        };
	    },
	    ready: function ready() {
	        this.setTableList();
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        spanFlexTable: _spanFlexTable2.default,
	        annotate: _annotate2.default,
	        preCode: _preCode2.default
	    },
	    methods: {
	        setTableList: function setTableList() {
	            var tempArr = [];
	            for (var i = 0; i <= this.xLimitControl; i++) {
	                tempArr[i] = [];
	                for (var j = 0; j <= this.yLimitControl; j++) {
	                    tempArr[i][j] = 'iLoveU' + j;
	                }
	            }
	            this.tableList = tempArr;
	        },
	        onAddLineClick: function onAddLineClick() {
	            this.xLimitControl += 1;
	            this.xLimitControl = this.xLimitControl < 5 ? this.xLimitControl : 0;
	            this.setTableList();
	        },
	        onAddColumnClick: function onAddColumnClick() {
	            this.yLimitControl += 1;
	            this.yLimitControl = this.yLimitControl <= 5 ? this.yLimitControl : 0;
	            this.setTableList();
	        }
	    }
	};
	// </script>
	//
	// <style media="screen">
	// #components-wraper #span-flex-table{
	//     width: 77%;
	//     margin: 3% auto;
	//     background-color: #222222;
	//     color: #f2f2f2;
	// }
	// </style>

	/* generated by vue-loader */
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     div.comp-area
	//         <annotate :blockquote-str='blockquoteStr'></annotate>
	//         a(href='javascript:;' @click="onAddLineClick" class='common-a') {{ addLine }}
	//         a(href='javascript:;' @click="onAddColumnClick" class='common-a') {{ addColumn }}
	//         <span-flex-table :table-list.sync='tableList'></span-flex-table>
	// </template>
	//
	// <script type="text/javascript">

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(75)
	__vue_script__ = __webpack_require__(77)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/widgets/spanFlexTable.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(78)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./spanFlexTable.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(76);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./spanFlexTable.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./spanFlexTable.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n*{padding:0;margin:0;box-sizing:border-box;}\n#span-flex-table{\n\tposition: $pr;\n\twidth: 60%;\n\tbackground-color: #999;\n\tcolor: #333;\n\ttext-align: $tc;\n\tborder: 2px solid #000;\n}\n.span-flex-table-li{\n\tlist-style: none;\n\ttext-align: center;\n\twidth: 100%;\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t    -ms-flex-align: center;\n\t        align-items: center;\n\t-ms-flex-flow: row wrap;\n\t    flex-flow: row wrap;\n\t-webkit-align-items: center;\n\t-webkit-flex-flow: row wrap;\n\t-ms-flex-pack: distribute;\n\t    justify-content: space-around;\n\t-webkit-justify-content: space-around;\n}\n.span-flex-table-li:not(:last-child){\n\tborder-bottom: 1px solid #000;\n}\n.sidebar-widgets-span{\n\theight: $h100;\n\t-webkit-box-flex: 1;\n\t    -ms-flex-positive: 1;\n\t        flex-grow: 1;\n\t-webkit-flex-grow: 1;\n\tvertical-align:middle;\n}\n.sidebar-widgets-span:not(:last-child){\n\tborder-right: 1px solid #000;\n}\n", "", {"version":3,"sources":["/../components/widgets/spanFlexTable.vue?086d45a0"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA8DA,EAAA,UAAA,SAAA,sBAAA,CAAA;AACA;CACA,cAAA;CACA,WAAA;CACA,uBAAA;CACA,YAAA;CACA,gBAAA;CACA,uBAAA;CACA;AACA;CACA,iBAAA;CACA,mBAAA;CACA,YAAA;CAEA,qBAAA;CAAA,qBAAA;CAAA,cAAA;CACA,0BAAA;KAAA,uBAAA;SAAA,oBAAA;CACA,wBAAA;KAAA,oBAAA;CACA,4BAAA;CACA,4BAAA;CACA,0BAAA;KAAA,8BAAA;CACA,sCAAA;CACA;AACA;CACA,8BAAA;CACA;AACA;CACA,cAAA;CACA,oBAAA;KAAA,qBAAA;SAAA,aAAA;CACA,qBAAA;CACA,sBAAA;CACA;AACA;CACA,6BAAA;CACA","file":"spanFlexTable.vue","sourcesContent":["<!--Desc: 以Span+Li来模拟伸缩Table：高度固定，liHeight=总Height/内容条数;\n\tDate: 16-04-14~15\n\tAuthor: Nicejade\n -->\n<template>\n\t<ul id=\"span-flex-table\" v-if=\"isShowTableFlag\">\n\t\t<li v-for='liItem in tableList'  class=\"span-flex-table-li\">\n\t\t\t<span v-for='spanList in liItem' class=\"span-flex-table-span\"> {{ spanList }} </span>\n\t\t</li>\n\t</ul>\n</template>\n\n\n<script type=\"text/javascript\">\nexport default {\n\tdata(){\n        return {\n          \t'isShowTableFlag': false\n        }\n    },\n    ready(){\n\t    this.isShowTableFlag = true\n\t    this.updateTable( this.tableList )\n    },\n    props: ['tableList'],\n   \twatch: {\n        tableList: function (newVal, oldVal) {\n        \tthis.updateTable( newVal)\n        }\n    },\n    methods: {\n    \tupdateTable: function(tableInfo){\n    \t\tvar tableListLen = this.getObjLength( tableInfo )\n        \tvar cssHeight = 100/tableListLen + \"%\";\n        \t$('.span-flex-table-li').css( {'height': cssHeight} )\n\n\t\t\tvar subTableListLen = this.getObjLength( tableInfo[tableListLen-1] )\n\t\t\tvar cssWidth = 100/subTableListLen + \"%\";\n\t\t\t$('.span-flex-table-span').css( {'width': cssWidth} )\n    \t},\n    \tgetObjLength: function(obj){\n    \t\tif(null === obj || undefined === obj){\n    \t\t\treturn 0;\n    \t\t}\n\n    \t\tif(undefined === obj.length){\n\t    \t\tlet count = 0\n\t\t\t    for(let key in obj){\n\t\t\t    \tcount++\n\t\t\t    }\n\t\t\t    return count\n\t\t\t}else{\n\t\t\t\treturn obj['length']\n\t\t\t}\n    \t}\n    },\n    events: {\n    }\n}\n</script>\n\n<style>\n*{padding:0;margin:0;box-sizing:border-box;}\n#span-flex-table{\n\tposition: $pr;\n\twidth: 60%;\n\tbackground-color: #999;\n\tcolor: #333;\n\ttext-align: $tc;\n\tborder: 2px solid #000;\n}\n.span-flex-table-li{\n\tlist-style: none;\n\ttext-align: center;\n\twidth: 100%;\n\tdisplay: -webkit-flex;\n\tdisplay: flex;\n\talign-items: center;\n\tflex-flow: row wrap;\n\t-webkit-align-items: center;\n\t-webkit-flex-flow: row wrap;\n\tjustify-content: space-around;\n\t-webkit-justify-content: space-around;\n}\n.span-flex-table-li:not(:last-child){\n\tborder-bottom: 1px solid #000;\n}\n.sidebar-widgets-span{\n\theight: $h100;\n\tflex-grow: 1;\n\t-webkit-flex-grow: 1;\n\tvertical-align:middle;\n}\n.sidebar-widgets-span:not(:last-child){\n\tborder-right: 1px solid #000;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <!--Desc: 以Span+Li来模拟伸缩Table：高度固定，liHeight=总Height/内容条数;
	// 	Date: 16-04-14~15
	// 	Author: Nicejade
	//  -->
	// <template>
	// 	<ul id="span-flex-table" v-if="isShowTableFlag">
	// 		<li v-for='liItem in tableList'  class="span-flex-table-li">
	// 			<span v-for='spanList in liItem' class="span-flex-table-span"> {{ spanList }} </span>
	// 		</li>
	// 	</ul>
	// </template>
	//
	//
	// <script type="text/javascript">
	exports.default = {
	  data: function data() {
	    return {
	      'isShowTableFlag': false
	    };
	  },
	  ready: function ready() {
	    this.isShowTableFlag = true;
	    this.updateTable(this.tableList);
	  },
	
	  props: ['tableList'],
	  watch: {
	    tableList: function tableList(newVal, oldVal) {
	      this.updateTable(newVal);
	    }
	  },
	  methods: {
	    updateTable: function updateTable(tableInfo) {
	      var tableListLen = this.getObjLength(tableInfo);
	      var cssHeight = 100 / tableListLen + "%";
	      $('.span-flex-table-li').css({ 'height': cssHeight });
	
	      var subTableListLen = this.getObjLength(tableInfo[tableListLen - 1]);
	      var cssWidth = 100 / subTableListLen + "%";
	      $('.span-flex-table-span').css({ 'width': cssWidth });
	    },
	    getObjLength: function getObjLength(obj) {
	      if (null === obj || undefined === obj) {
	        return 0;
	      }
	
	      if (undefined === obj.length) {
	        var count = 0;
	        for (var key in obj) {
	          count++;
	        }
	        return count;
	      } else {
	        return obj['length'];
	      }
	    }
	  },
	  events: {}
	};
	// </script>
	//
	// <style>
	// *{padding:0;margin:0;box-sizing:border-box;}
	// #span-flex-table{
	// 	position: $pr;
	// 	width: 60%;
	// 	background-color: #999;
	// 	color: #333;
	// 	text-align: $tc;
	// 	border: 2px solid #000;
	// }
	// .span-flex-table-li{
	// 	list-style: none;
	// 	text-align: center;
	// 	width: 100%;
	// 	display: -webkit-flex;
	// 	display: flex;
	// 	align-items: center;
	// 	flex-flow: row wrap;
	// 	-webkit-align-items: center;
	// 	-webkit-flex-flow: row wrap;
	// 	justify-content: space-around;
	// 	-webkit-justify-content: space-around;
	// }
	// .span-flex-table-li:not(:last-child){
	// 	border-bottom: 1px solid #000;
	// }
	// .sidebar-widgets-span{
	// 	height: $h100;
	// 	flex-grow: 1;
	// 	-webkit-flex-grow: 1;
	// 	vertical-align:middle;
	// }
	// .sidebar-widgets-span:not(:last-child){
	// 	border-right: 1px solid #000;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n<ul id=\"span-flex-table\" v-if=\"isShowTableFlag\">\n\t<li v-for='liItem in tableList'  class=\"span-flex-table-li\">\n\t\t<span v-for='spanList in liItem' class=\"span-flex-table-span\"> {{ spanList }} </span>\n\t</li>\n</ul>\n";

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><div class=\"comp-area\"><annotate :blockquote-str='blockquoteStr'></annotate><a href=\"javascript:;\" @click=\"onAddLineClick\" class=\"common-a\">{{ addLine }}</a><a href=\"javascript:;\" @click=\"onAddColumnClick\" class=\"common-a\">{{ addColumn }}</a><span-flex-table :table-list.sync='tableList'></span-flex-table></div>";

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(81)
	__vue_script__ = __webpack_require__(83)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_countDown.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(87)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_countDown.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(82);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_countDown.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_countDown.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#normal-dlg-body{\n    top: 39% !important;\n}\n", "", {"version":3,"sources":["/./src/_countDown.vue?684ee591"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA+FA;IACA,oBAAA;CACA","file":"_countDown.vue","sourcesContent":["<template lang='jade'>\n    h1#comp-title {{ compTitle }}\n    h2.hinting-title {{ hintingTitle }}\n    <pre-code :code-string=\"codeString\"></pre-code>\n    h2.hinting-title {{ hintingTitle2 }}\n    a(href='javascript:;' @click=\"onStartCountClick\" class='demonstrate-a') {{ btnText }}\n    div.comp-area\n        <count-down :time.sync=\"time\" :is-complete-show-hms=\"isCompleteShowHms\" :fore-time-text=\"foreTimeText\" :last-time-text=\"lastTimeText\" :start.sync=\"isStartCount\"></count-down>\n        popup-toast\n</template>\n\n<script type=\"text/javascript\">\nimport countDown from 'countDown'\nimport popupToast from 'popupToast'\nimport preCode from './preCode.vue'\n\nexport default {\n    data () {\n        return {\n            btnText: \"StartCountDown\",\n            compTitle : \"Component Name\",\n            hintingTitle: \"使用示例:\",\n            hintingTitle2: \"表现示例\",\n            foreTimeText: \"(倒计时fore)\",\n            lastTimeText: \"(倒计时end)\",\n            isCompleteShowHms: true,\n            time: 0,\n            isStartCount: false,\n            codeString: `\n    import countDown from 'countDown'; //引入组件\n\n    //模板中可以按需传递参数;\n    <count-down :time.sync=\"time\" :is-complete-show-hms=\"isCompleteShowHms\" :start.sync=\"isStartCount\"\n                :fore-time-text=\"foreTimeText\" :last-time-text=\"lastTimeText\" ></count-down>\n\n    // vue逻辑处理代码\n    methods: {\n        onStartCountClick: function(){\n            this.time = 2113;\n            this.isStartCount = true;\n        }\n    },\n    events: {\n        'on-countdown-finish': function (countNum) {\n            // countNum 统计调用此 countDown 次数;\n            alert(\"countdown had down; num = \" + countNum )\n        }\n    }\n\n    /*\n    time: 倒计时时间(type: Number;单位：秒s)；值小于0，则不显示；默认值：60；\n        超过60s会将显示对应转换为默认是xx时yy分zz秒;可从 timeUnitObj 传参改变时间单位；\n    start: 是否立即开始(type：Boolean)；默认值：false\n    isCompleteShowHms: 是否完整显示“xx时yy分zz秒”，默认false。\n    foreTimeText： 承载倒计时数字span之前标签内容；不传不显示此span；默认值：\"\"\n    lastTimeText： 承载倒计时数字span之后标签内容；不传不显示此span；默认值：\"\"\n    /*\n    `\n        }\n    },\n    route:{\n\t\tdata(transition){\n            this.compTitle = transition.to.name\n\t\t}\n\t},\n    components: {\n        countDown,\n        popupToast,\n        preCode,\n    },\n    methods: {\n        onStartCountClick: function(){\n            this.time = 9;\n            this.isStartCount = true;\n        },\n\n        showPopupToast: function( text ){\n            var toastMsg = {\n                bodyText: text,\n                timer: 2222,           //可不传；默认2000ms\n                callBackFunc: null     // 可不传，默认null；\n            }\n            this.$broadcast('show-popup-toast', toastMsg);\n        }\n    },\n    events: {\n        'on-countdown-finish': function (countNum) {\n            // countNum 统计调用此 countDown 次数;\n            this.showPopupToast( \"countdown had down; countNum = \" + countNum )\n        }\n    }\n}\n</script>\n\n<style media=\"screen\">\n#normal-dlg-body{\n    top: 39% !important;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _countDown = __webpack_require__(84);
	
	var _countDown2 = _interopRequireDefault(_countDown);
	
	var _popupToast = __webpack_require__(19);
	
	var _popupToast2 = _interopRequireDefault(_popupToast);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            btnText: "StartCountDown",
	            compTitle: "Component Name",
	            hintingTitle: "使用示例:",
	            hintingTitle2: "表现示例",
	            foreTimeText: "(倒计时fore)",
	            lastTimeText: "(倒计时end)",
	            isCompleteShowHms: true,
	            time: 0,
	            isStartCount: false,
	            codeString: '\n    import countDown from \'countDown\'; //引入组件\n\n    //模板中可以按需传递参数;\n    <count-down :time.sync="time" :is-complete-show-hms="isCompleteShowHms" :start.sync="isStartCount"\n                :fore-time-text="foreTimeText" :last-time-text="lastTimeText" ></count-down>\n\n    // vue逻辑处理代码\n    methods: {\n        onStartCountClick: function(){\n            this.time = 2113;\n            this.isStartCount = true;\n        }\n    },\n    events: {\n        \'on-countdown-finish\': function (countNum) {\n            // countNum 统计调用此 countDown 次数;\n            alert("countdown had down; num = " + countNum )\n        }\n    }\n\n    /*\n    time: 倒计时时间(type: Number;单位：秒s)；值小于0，则不显示；默认值：60；\n        超过60s会将显示对应转换为默认是xx时yy分zz秒;可从 timeUnitObj 传参改变时间单位；\n    start: 是否立即开始(type：Boolean)；默认值：false\n    isCompleteShowHms: 是否完整显示“xx时yy分zz秒”，默认false。\n    foreTimeText： 承载倒计时数字span之前标签内容；不传不显示此span；默认值：""\n    lastTimeText： 承载倒计时数字span之后标签内容；不传不显示此span；默认值：""\n    /*\n    '
	        };
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        countDown: _countDown2.default,
	        popupToast: _popupToast2.default,
	        preCode: _preCode2.default
	    },
	    methods: {
	        onStartCountClick: function onStartCountClick() {
	            this.time = 9;
	            this.isStartCount = true;
	        },
	
	        showPopupToast: function showPopupToast(text) {
	            var toastMsg = {
	                bodyText: text,
	                timer: 2222, //可不传；默认2000ms
	                callBackFunc: null // 可不传，默认null；
	            };
	            this.$broadcast('show-popup-toast', toastMsg);
	        }
	    },
	    events: {
	        'on-countdown-finish': function onCountdownFinish(countNum) {
	            // countNum 统计调用此 countDown 次数;
	            this.showPopupToast("countdown had down; countNum = " + countNum);
	        }
	    }
	};
	// </script>
	//
	// <style media="screen">
	// #normal-dlg-body{
	//     top: 39% !important;
	// }
	// </style>

	/* generated by vue-loader */
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     a(href='javascript:;' @click="onStartCountClick" class='demonstrate-a') {{ btnText }}
	//     div.comp-area
	//         <count-down :time.sync="time" :is-complete-show-hms="isCompleteShowHms" :fore-time-text="foreTimeText" :last-time-text="lastTimeText" :start.sync="isStartCount"></count-down>
	//         popup-toast
	// </template>
	//
	// <script type="text/javascript">

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(85)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/widgets/countDown.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(86)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./countDown.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 85 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <span class="count-down-fore" v-if='isShowForeTextFlag'>{{ foreTimeText }}</span>
	//     <span class="count-down-time" v-if='isShowCountDownFlag'>{{ contDownText }}</span>
	//     <span class="count-down-last" v-if='isShowLastTextFlag'>{{ lastTimeText }}</span>
	// </template>
	//
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            intervalId: null,
	            countNum: 0,
	            contDownText: "",
	            isShowForeTextFlag: false,
	            isShowLastTextFlag: false,
	            isShowCountDownFlag: false
	        };
	    },
	
	
	    props: {
	        foreTimeText: {
	            type: String,
	            default: ""
	        },
	        lastTimeText: {
	            type: String,
	            default: ""
	        },
	        time: {
	            type: Number,
	            default: 60
	        },
	        start: {
	            type: Boolean,
	            default: false
	        },
	        isCompleteShowHms: {
	            type: Boolean,
	            default: false
	        },
	        timeUnitObj: {
	            type: Object,
	            default: function _default() {
	                return {
	                    hour: "时",
	                    minute: "分",
	                    second: "秒"
	                };
	            }
	        }
	    },
	
	    ready: function ready() {
	        if (this.start) {
	            this.tick();
	        }
	    },
	
	
	    methods: {
	        tick: function tick() {
	            var count = 0,
	                startTime = new Date().getTime();
	
	            if (this.time > 0) {
	                this.intervalId = setTimeout(countDownStart, 1000);
	                this.convertToHms(this.time);
	                this.setTextIsShowFlag(true);
	            }
	
	            var _That = this;
	            function countDownStart() {
	                count++;
	                var offset = new Date().getTime() - (startTime + count * 1000);
	                var nextTime = 1000 - offset;
	                nextTime = nextTime < 0 ? 0 : nextTime;
	                _That.time--;
	                if (_That.time < 0) {
	                    _That.stop();
	                    _That.start = false;
	                    _That.countNum++;
	                    _That.$dispatch('on-countdown-finish', _That.countNum);
	                } else {
	                    _That.convertToHms(_That.time);
	                    _That.intervalId = setTimeout(countDownStart, nextTime);
	                }
	            }
	        },
	
	        convertToHms: function convertToHms(secondTime) {
	            var hour = void 0,
	                minute = void 0;
	            var HOUR = 3600,
	                MINUTE = 60,
	                ZERO = 0;
	            var hourUnit = this.timeUnitObj['hour'],
	                minuteUnit = this.timeUnitObj['minute'],
	                secondUnit = this.timeUnitObj['second'];
	            if (secondTime >= HOUR) {
	                hour = Math.floor(secondTime / HOUR);
	                secondTime -= hour * HOUR;
	                minute = Math.floor(secondTime / MINUTE);
	                secondTime -= minute * MINUTE;
	                this.contDownText = hour + hourUnit + minute + minuteUnit + secondTime + secondUnit;
	            } else if (secondTime <= 60) {
	                this.contDownText = secondTime + secondUnit;
	                if (this.isCompleteShowHms == true) {
	                    this.contDownText = ZERO + hourUnit + ZERO + minuteUnit + this.contDownText;
	                }
	            } else {
	                minute = Math.floor(secondTime / MINUTE);
	                secondTime -= minute * MINUTE;
	                this.contDownText = minute + minuteUnit + secondTime + secondUnit;
	                this.contDownText = this.isCompleteShowHms == true ? ZERO + hourUnit + this.contDownText : this.contDownText;
	            }
	        },
	
	        stop: function stop() {
	            clearInterval(this.intervalId);
	        },
	
	        setTextIsShowFlag: function setTextIsShowFlag(cFlag) {
	            this.isShowForeTextFlag = this.foreTimeText !== "" && cFlag ? true : false;
	            this.isShowLastTextFlag = this.lastTimeText !== "" && cFlag ? true : false;
	            this.isShowCountDownFlag = this.time > 0 && cFlag ? true : false;
	        }
	    },
	
	    watch: {
	        start: function start(newVal, oldVal) {
	            if (newVal === true && oldVal === false && this.time > 0) {
	                this.tick();
	            }
	            if (newVal === false && oldVal === true) {
	                this.stop();
	            }
	        },
	        time: function time(newVal, oldVal) {
	            if (this.time > 0) {
	                this.setTextIsShowFlag(true);
	            } else {
	                this.setTextIsShowFlag(false);
	            }
	        }
	    }
	};
	// </script>

	/* generated by vue-loader */

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = "\n<span class=\"count-down-fore\" v-if='isShowForeTextFlag'>{{ foreTimeText }}</span>\n<span class=\"count-down-time\" v-if='isShowCountDownFlag'>{{ contDownText }}</span>\n<span class=\"count-down-last\" v-if='isShowLastTextFlag'>{{ lastTimeText }}</span>\n";

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><a href=\"javascript:;\" @click=\"onStartCountClick\" class=\"demonstrate-a\">{{ btnText }}</a><div class=\"comp-area\"><count-down :time.sync=\"time\" :is-complete-show-hms=\"isCompleteShowHms\" :fore-time-text=\"foreTimeText\" :last-time-text=\"lastTimeText\" :start.sync=\"isStartCount\"></count-down><popup-toast></popup-toast></div>";

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(89)
	__vue_script__ = __webpack_require__(91)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_commonTable.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(97)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_commonTable.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(90);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_commonTable.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_commonTable.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#components-wraper .common-table-ul{\n    margin-top: 2%;\n    display: block;\n    background-color: rgba(22,22,22, 1);\n}\n.table-height{\n    height: 12em;\n}\n", "", {"version":3,"sources":["/./src/_commonTable.vue?b3ad4a32"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAoGA;IACA,eAAA;IACA,eAAA;IACA,oCAAA;CACA;AACA;IACA,aAAA;CACA","file":"_commonTable.vue","sourcesContent":["<template lang='jade'>\n    h1#comp-title {{ compTitle }}\n    h2.hinting-title {{ hintingTitle }}\n    <pre-code :code-string=\"codeString\"></pre-code>\n    h2.hinting-title {{ hintingTitle2 }}\n    div.comp-area\n        <annotate :blockquote-str='blockquoteStr'></annotate>\n        a(href='javascript:;' @click=\"onChangeHeightClick\" class='common-a') {{ fixedHeightText }}\n        a(href='javascript:;' @click=\"onAddLineClick\" class='common-a') {{ addRow }}\n        a(href='javascript:;' @click=\"onAddColumnClick\" class='common-a') {{ addColumn }}\n        <common-table :table-list.sync='tableList'></common-table>\n</template>\n\n<script type=\"text/javascript\">\nimport commonTable from 'commonTable'\nimport annotate from './annotate.vue'\nimport preCode from './preCode.vue'\n\nexport default {\n    data () {\n        return {\n            hintingTitle2: \"表现示例:\",\n            compTitle : \"Component Name\",\n            xLimitControl:3,\n            yLimitControl:4,\n            addRow: \"Add row\",\n            addColumn: \"Add Column\",\n            fixedHeightText: \"Not Fix Height\",\n            isFixedHeightFlag: true,\n            hintingTitle: \"使用示例:\",\n            tableList: [],\n            tableList2: [],\n            codeString: `\n    import commonTable from 'commonTable'; //引入组件\n\n    //在模板中如下加入组件即可(定义tabList数组/Object)：\n    <common-table :table-list.sync='tableList'></common-table>`,\n            blockquoteStr:`\n                <strong>微注：</strong> 使用 ul li span 三者组合，来模拟 table,不仅在 Dom 层次上更为精简而高效，\n                而且也非常方便扩展之，使其完成更为复杂需求；比如：可以传递html标签譬如 <em style='color:#009ad6'>< span>String Content< /span></em>\n                替代普通String内容(那边会自动解析)，如此表格就可轻易按照你的想法扩展了，包括表格中夹杂响应事件|图标等等。\n            `\n        }\n    },\n    ready(){\n        this.setTableList()\n        setTimeout( ()=>{\n            this.updateTableHeight()\n        }, 0)\n    },\n    route:{\n  \t\tdata(transition){\n            this.compTitle = transition.to.name\n  \t\t}\n\t },\n    components: {\n        commonTable,\n        annotate,\n        preCode,\n    },\n    methods: {\n        setTableList: function(){\n            let tempArr = [];\n            for(let i=0; i<= this.xLimitControl; i++){\n                tempArr[i] = []\n                for(let j=0; j<=this.yLimitControl; j++){\n                    tempArr[i][j] = 'iLoveU:' + i + '*' + j;\n                }\n            }\n            this.tableList = tempArr\n        },\n        updateTableHeight: function(){\n            if(this.isFixedHeightFlag){\n                $('.common-table-ul').addClass('table-height')\n            }else{\n                $('.common-table-ul').removeClass('table-height')\n            }\n        },\n\n        // -------------------------------------------default click callBack function\n        onAddLineClick: function(){\n            this.xLimitControl += 1\n            this.xLimitControl = (this.xLimitControl < 5) ? this.xLimitControl : 0\n            this.setTableList()\n        },\n        onAddColumnClick: function(){\n            this.yLimitControl += 1\n            this.yLimitControl = (this.yLimitControl <= 5) ? this.yLimitControl : 0\n            this.setTableList()\n        },\n        onChangeHeightClick: function(){\n            this.isFixedHeightFlag = !this.isFixedHeightFlag\n            this.fixedHeightText = this.isFixedHeightFlag ? \"Not Fixed Height\" : \"Fixed Height\"\n            this.updateTableHeight()\n        }\n    }\n}\n</script>\n\n<style media=\"screen\">\n#components-wraper .common-table-ul{\n    margin-top: 2%;\n    display: block;\n    background-color: rgba(22,22,22, 1);\n}\n.table-height{\n    height: 12em;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _commonTable = __webpack_require__(92);
	
	var _commonTable2 = _interopRequireDefault(_commonTable);
	
	var _annotate = __webpack_require__(24);
	
	var _annotate2 = _interopRequireDefault(_annotate);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    data: function data() {
	        return {
	            hintingTitle2: "表现示例:",
	            compTitle: "Component Name",
	            xLimitControl: 3,
	            yLimitControl: 4,
	            addRow: "Add row",
	            addColumn: "Add Column",
	            fixedHeightText: "Not Fix Height",
	            isFixedHeightFlag: true,
	            hintingTitle: "使用示例:",
	            tableList: [],
	            tableList2: [],
	            codeString: '\n    import commonTable from \'commonTable\'; //引入组件\n\n    //在模板中如下加入组件即可(定义tabList数组/Object)：\n    <common-table :table-list.sync=\'tableList\'></common-table>',
	            blockquoteStr: '\n                <strong>微注：</strong> 使用 ul li span 三者组合，来模拟 table,不仅在 Dom 层次上更为精简而高效，\n                而且也非常方便扩展之，使其完成更为复杂需求；比如：可以传递html标签譬如 <em style=\'color:#009ad6\'>< span>String Content< /span></em>\n                替代普通String内容(那边会自动解析)，如此表格就可轻易按照你的想法扩展了，包括表格中夹杂响应事件|图标等等。\n            '
	        };
	    },
	    ready: function ready() {
	        var _this = this;
	
	        this.setTableList();
	        setTimeout(function () {
	            _this.updateTableHeight();
	        }, 0);
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        commonTable: _commonTable2.default,
	        annotate: _annotate2.default,
	        preCode: _preCode2.default
	    },
	    methods: {
	        setTableList: function setTableList() {
	            var tempArr = [];
	            for (var i = 0; i <= this.xLimitControl; i++) {
	                tempArr[i] = [];
	                for (var j = 0; j <= this.yLimitControl; j++) {
	                    tempArr[i][j] = 'iLoveU:' + i + '*' + j;
	                }
	            }
	            this.tableList = tempArr;
	        },
	        updateTableHeight: function updateTableHeight() {
	            if (this.isFixedHeightFlag) {
	                $('.common-table-ul').addClass('table-height');
	            } else {
	                $('.common-table-ul').removeClass('table-height');
	            }
	        },
	
	        // -------------------------------------------default click callBack function
	        onAddLineClick: function onAddLineClick() {
	            this.xLimitControl += 1;
	            this.xLimitControl = this.xLimitControl < 5 ? this.xLimitControl : 0;
	            this.setTableList();
	        },
	        onAddColumnClick: function onAddColumnClick() {
	            this.yLimitControl += 1;
	            this.yLimitControl = this.yLimitControl <= 5 ? this.yLimitControl : 0;
	            this.setTableList();
	        },
	        onChangeHeightClick: function onChangeHeightClick() {
	            this.isFixedHeightFlag = !this.isFixedHeightFlag;
	            this.fixedHeightText = this.isFixedHeightFlag ? "Not Fixed Height" : "Fixed Height";
	            this.updateTableHeight();
	        }
	    }
	};
	// </script>
	//
	// <style media="screen">
	// #components-wraper .common-table-ul{
	//     margin-top: 2%;
	//     display: block;
	//     background-color: rgba(22,22,22, 1);
	// }
	// .table-height{
	//     height: 12em;
	// }
	// </style>

	/* generated by vue-loader */
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     div.comp-area
	//         <annotate :blockquote-str='blockquoteStr'></annotate>
	//         a(href='javascript:;' @click="onChangeHeightClick" class='common-a') {{ fixedHeightText }}
	//         a(href='javascript:;' @click="onAddLineClick" class='common-a') {{ addRow }}
	//         a(href='javascript:;' @click="onAddColumnClick" class='common-a') {{ addColumn }}
	//         <common-table :table-list.sync='tableList'></common-table>
	// </template>
	//
	// <script type="text/javascript">

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(93)
	__vue_script__ = __webpack_require__(95)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/widgets/commonTable.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(96)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./commonTable.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(94);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./commonTable.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./commonTable.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.common-table-ul{\n    background-color: #222222;\n    color: #fff;\n    font-size: .9em;\n    border: 2px solid #4f5555;\n    border-radius: .6em;\n}\n.common-table-li{\n\twidth: 100%;\n    display: table;\n}\n.common-table-li:first-child{\n    font-size: 1em;\n    font-weight: bold;\n    color: #ff9f40;\n}\n.common-table-li:not(:last-child){\n    border-bottom: 2px solid #4f5555;\n}\n.common-table-span{\n    height: 100%;\n    text-align: center;\n    display: table-cell;\n    vertical-align: middle;\n}\n.common-table-span:not(:last-child){\n    border-right: 2px solid #4f5555;\n}\n", "", {"version":3,"sources":["/../components/widgets/commonTable.vue?f12060e4"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAgEA;IACA,0BAAA;IACA,YAAA;IACA,gBAAA;IACA,0BAAA;IACA,oBAAA;CACA;AACA;CACA,YAAA;IACA,eAAA;CACA;AACA;IACA,eAAA;IACA,kBAAA;IACA,eAAA;CACA;AACA;IACA,iCAAA;CACA;AACA;IACA,aAAA;IACA,mBAAA;IACA,oBAAA;IACA,uBAAA;CACA;AACA;IACA,gCAAA;CACA","file":"commonTable.vue","sourcesContent":["<!--Desc: 以Ul+Span+Li来模拟Table;\n\tDate: 16-05-20\n\tAuthor: Nicejade\n -->\n<template>\n\t<ul class=\"common-table-ul\" v-if=\"isShowTableFlag\">\n\t\t<li v-for='liItem in tableList'  class=\"common-table-li\">\n\t\t\t<span v-for='spanList in liItem' class=\"common-table-span\"> {{ spanList }} </span>\n\t\t</li>\n\t</ul>\n</template>\n\n<script type=\"text/javascript\">\nexport default {\n\tdata(){\n        return {\n          \t'isShowTableFlag': false\n        }\n    },\n    ready(){\n\t    this.isShowTableFlag = true\n\t    this.updateTable( this.tableList )\n    },\n    props: ['tableList'],\n   \twatch: {\n        tableList: function (newVal, oldVal) {\n        \tif( this.getObjLength(newVal) <= 0 ){\n        \t\treturn;\n        \t}\n        \tthis.updateTable(newVal)\n        }\n    },\n    methods: {\n    \tupdateTable: function(tableInfo){\n    \t\tvar tableListLen = this.getObjLength( tableInfo )\n        \tvar cssHeight = (100/tableListLen) + '%'\n        \t$('.common-table-li').css( {'height': cssHeight} )\n\n        \tvar subTableListLen = this.getObjLength( tableInfo[ tableListLen-1 ] )\n        \tvar cssWidth = (100/subTableListLen) + '%'\n        \t$('.common-table-span').css({'width': cssWidth})\n    \t},\n    \tgetObjLength: function(obj){\n    \t\tif(null === obj || undefined === obj){\n    \t\t\treturn 0;\n    \t\t}\n\n    \t\tif(undefined === obj.length){\n\t    \t\tlet count = 0\n\t\t\t    for(let key in obj){\n\t\t\t    \tcount++\n\t\t\t    }\n\t\t\t    return count\n\t\t\t}else{\n\t\t\t\treturn obj['length']\n\t\t\t}\n    \t}\n    },\n    events: {\n    }\n}\n</script>\n\n<style>\n.common-table-ul{\n    background-color: #222222;\n    color: #fff;\n    font-size: .9em;\n    border: 2px solid #4f5555;\n    border-radius: .6em;\n}\n.common-table-li{\n\twidth: 100%;\n    display: table;\n}\n.common-table-li:first-child{\n    font-size: 1em;\n    font-weight: bold;\n    color: #ff9f40;\n}\n.common-table-li:not(:last-child){\n    border-bottom: 2px solid #4f5555;\n}\n.common-table-span{\n    height: 100%;\n    text-align: center;\n    display: table-cell;\n    vertical-align: middle;\n}\n.common-table-span:not(:last-child){\n    border-right: 2px solid #4f5555;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <!--Desc: 以Ul+Span+Li来模拟Table;
	// 	Date: 16-05-20
	// 	Author: Nicejade
	//  -->
	// <template>
	// 	<ul class="common-table-ul" v-if="isShowTableFlag">
	// 		<li v-for='liItem in tableList'  class="common-table-li">
	// 			<span v-for='spanList in liItem' class="common-table-span"> {{ spanList }} </span>
	// 		</li>
	// 	</ul>
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	  data: function data() {
	    return {
	      'isShowTableFlag': false
	    };
	  },
	  ready: function ready() {
	    this.isShowTableFlag = true;
	    this.updateTable(this.tableList);
	  },
	
	  props: ['tableList'],
	  watch: {
	    tableList: function tableList(newVal, oldVal) {
	      if (this.getObjLength(newVal) <= 0) {
	        return;
	      }
	      this.updateTable(newVal);
	    }
	  },
	  methods: {
	    updateTable: function updateTable(tableInfo) {
	      var tableListLen = this.getObjLength(tableInfo);
	      var cssHeight = 100 / tableListLen + '%';
	      $('.common-table-li').css({ 'height': cssHeight });
	
	      var subTableListLen = this.getObjLength(tableInfo[tableListLen - 1]);
	      var cssWidth = 100 / subTableListLen + '%';
	      $('.common-table-span').css({ 'width': cssWidth });
	    },
	    getObjLength: function getObjLength(obj) {
	      if (null === obj || undefined === obj) {
	        return 0;
	      }
	
	      if (undefined === obj.length) {
	        var count = 0;
	        for (var key in obj) {
	          count++;
	        }
	        return count;
	      } else {
	        return obj['length'];
	      }
	    }
	  },
	  events: {}
	};
	// </script>
	//
	// <style>
	// .common-table-ul{
	//     background-color: #222222;
	//     color: #fff;
	//     font-size: .9em;
	//     border: 2px solid #4f5555;
	//     border-radius: .6em;
	// }
	// .common-table-li{
	// 	width: 100%;
	//     display: table;
	// }
	// .common-table-li:first-child{
	//     font-size: 1em;
	//     font-weight: bold;
	//     color: #ff9f40;
	// }
	// .common-table-li:not(:last-child){
	//     border-bottom: 2px solid #4f5555;
	// }
	// .common-table-span{
	//     height: 100%;
	//     text-align: center;
	//     display: table-cell;
	//     vertical-align: middle;
	// }
	// .common-table-span:not(:last-child){
	//     border-right: 2px solid #4f5555;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n<ul class=\"common-table-ul\" v-if=\"isShowTableFlag\">\n\t<li v-for='liItem in tableList'  class=\"common-table-li\">\n\t\t<span v-for='spanList in liItem' class=\"common-table-span\"> {{ spanList }} </span>\n\t</li>\n</ul>\n";

/***/ },
/* 97 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><div class=\"comp-area\"><annotate :blockquote-str='blockquoteStr'></annotate><a href=\"javascript:;\" @click=\"onChangeHeightClick\" class=\"common-a\">{{ fixedHeightText }}</a><a href=\"javascript:;\" @click=\"onAddLineClick\" class=\"common-a\">{{ addRow }}</a><a href=\"javascript:;\" @click=\"onAddColumnClick\" class=\"common-a\">{{ addColumn }}</a><common-table :table-list.sync='tableList'></common-table></div>";

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(130)
	__vue_script__ = __webpack_require__(99)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_turnTable.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(105)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_turnTable.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _turnTable = __webpack_require__(100);
	
	var _turnTable2 = _interopRequireDefault(_turnTable);
	
	var _annotate = __webpack_require__(24);
	
	var _annotate2 = _interopRequireDefault(_annotate);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	var _strongDialog = __webpack_require__(47);
	
	var _strongDialog2 = _interopRequireDefault(_strongDialog);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     div.comp-area
	//         <annotate :blockquote-str='blockquoteStr'></annotate>
	//         <turn-table  :turn-table-config='turnTableConfig'></turn-table>
	//         a(href='javascript:;' class="common-a start-draw" @click="onStartDrawClick") {{ startDrawText }}
	//         strong-dialog
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        var _this = this;
	
	        return {
	            compTitle: "Component Name",
	            hintingTitle: "使用示例:",
	            hintingTitle2: "表现示例:",
	            startDrawText: "开启大转盘",
	            turnTableConfig: {
	                rewardKinds: 8, //奖励种类数
	                resumeDelay: 2000, //旋转停止回调延时
	                rotateNums: 2, // 转盘旋转圈数；默认3
	                imgOffset: 0, //初始指针与图片的偏移
	                isTableRotate: true, //true为转盘旋转，false为指针旋转
	                pointNum: null,
	                callBackFunc: function callBackFunc(textMsg) {
	                    var dlgMsgObj = {
	                        titleText: "&温馨提示&",
	                        bodyText: textMsg,
	                        btnsObj: {
	                            0: {
	                                btnText: "取消",
	                                callBackFunc: null
	                            },
	                            1: {
	                                btnText: "确认",
	                                callBackFunc: null
	                            }
	                        },
	                        isShowCloseXFlag: true
	                    };
	                    _this.$broadcast('show-strong-dlg', dlgMsgObj);
	                }
	            },
	            codeString: '\n        import turnTable from \'turnTable\'; //引入组件\n\n        //模板中可以按需传递参数;\n        <turn-table  :turn-table-config=\'turnTableConfig\'></turn-table>\n\n        // vue逻辑处理代码(也可外部广播"turntable-msg"消息开启大转盘)\n        <script>\n            import turnTable from \'turnTable\';\n\n            export default {\n                data () {\n                    return {\n                        Tools: Tools,\n                        turnTableConfig: {\n                            rewardKinds: 8,    //奖励种类数\n                            resumeDelay: 1000, //旋转停止回调延时\n                            rotateNums: 2,     // 转盘旋转圈数；默认3\n                            imgOffset: 22.5,   //初始指针与图片的偏移\n                            isTableRotate: false,  //true为转盘旋转，false为指针旋转\n                            pointNum: 6,       // 旋转指针指向位置(起始于1),如果将请求后台封装在组件内，则无需如此；\n                            callBackFunc: ( textMsg )=>{\n                                var dlgMsgObj = {\n                                    titleText: "&温馨提示&",\n                                    bodyText: textMsg,\n                                    btnsObj: {\n                                        0: {\n                                            btnText: "取消",\n                                            callBackFunc: null\n                                        },\n                                        1: {\n                                            btnText: "确认",\n                                            callBackFunc: null\n                                        }\n                                    },\n                                    isShowCloseXFlag: true\n                                }\n                                this.$broadcast(\'show-strong-dlg\', dlgMsgObj);\n                            }\n                        }\n                    }\n               },\n              components: {\n                  turnTable,\n              }\n            }\n        < /script>',
	            blockquoteStr: '这是一个阉割版本的转盘抽奖组件；在生产环境，蛮建议将请求的后代数据也封装于组件之内(如有不同，可传接口)，\n                如此，后续使用需要关注的内容就更少，善莫大焉。此组件，已较丰富完善，譬如旋转主体可设置转盘or指针、开启大转盘抽奖，\n                承载的操作主题可以是指针按钮，抑或外部按钮(广播"turntable-msg"消息即可)；使用时，只需提供两张好的图外加微调样式即可；\n                当然如果奖品在一次活动之内，连奖品类型都是动态的话，需另写组件予以支持。'
	        };
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        preCode: _preCode2.default,
	        turnTable: _turnTable2.default,
	        annotate: _annotate2.default,
	        strongDialog: _strongDialog2.default
	    },
	    methods: {
	        onStartDrawClick: function onStartDrawClick() {
	            this.$broadcast('turntable-msg');
	        }
	    },
	    events: {}
	};
	// </script>
	//
	// <style media="screen">
	// #turntable-drawbox{
	//     background-image: url(http://nicejade.github.io/jade/table.png);
	//     background-size: 100% 100%;
	// }
	// #turntable-drawpoint{
	//     background-image: url(http://nicejade.github.io/jade/point.png);
	//     background-size: 100% 100%;
	// }
	// .start-draw{
	//     display: inline-block;
	//     left: 50%;
	//     margin: auto;
	//     line-height: normal;
	//     transform: translate(-50%,0);
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(101)
	__vue_script__ = __webpack_require__(103)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/modules/turnTable.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(104)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./turnTable.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(102);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./turnTable.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./turnTable.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#turntable-root {\n    margin: 2% auto;\n    width: 50%;\n    padding-top: 50%;\n\t-webkit-transform:translateZ(0);\n\ttransform:translateZ(0);\n}\n#turntable-drawbox {\n    position: absolute;\n\ttop: 0;\n\tleft: 0;\n\tbottom: 0%;\n    width: 100%;\n    height: 100%;\n\tbackground-size: 100% 100%;\n}\n#turntable-drawpoint {\n    position: absolute;\n    width: 28%;\n    top: 31%;\n    left: 36.4%;\n    height: 34%;\n\tbackground-size: 100% 100%;\n\tz-index: 2;\n    -webkit-transform-origin: 50% 60%;\n    transform-origin: 50% 60%;\n\twill-change: transform;\n}\n.turntable-transition{\n    -webkit-transition: -webkit-transform 2s ease-in-out;\n    transition: -webkit-transform 2s ease-in-out;\n    transition: transform 2s ease-in-out;\n    transition: transform 2s ease-in-out, -webkit-transform 2s ease-in-out;\n}\n#turntable-drawbox {\n  -webkit-transform-origin: 50% 50%;\n  transform-origin: 50% 50%;\n}\n", "", {"version":3,"sources":["/../components/modules/turnTable.vue?a2936ae0"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAyFA;IACA,gBAAA;IACA,WAAA;IACA,iBAAA;CACA,gCAAA;CACA,wBAAA;CACA;AACA;IACA,mBAAA;CACA,OAAA;CACA,QAAA;CACA,WAAA;IACA,YAAA;IACA,aAAA;CACA,2BAAA;CACA;AACA;IACA,mBAAA;IACA,WAAA;IACA,SAAA;IACA,YAAA;IACA,YAAA;CACA,2BAAA;CACA,WAAA;IACA,kCAAA;IAIA,0BAAA;CACA,uBAAA;CACA;AACA;IACA,qDAAA;IACA,6CAAA;IAAA,qCAAA;IAAA,uEAAA;CACA;AACA;EACA,kCAAA;EAIA,0BAAA;CACA","file":"turnTable.vue","sourcesContent":["<!--Date: 16-04-18\n    LastModify: 16-06-29\n\tAuthor: jeffjade\n\tDesc: 大转盘/抽奖等功能模块组件\n -->\n <template lang=\"jade\">\n\t#turntable-root\n\t\t#turntable-drawbox\n\t\tdiv(id=\"turntable-drawpoint\" v-on:click=\"onDrawboxCallback\")\n</template>\n\n\n<script>\nexport default {\n\tdata(){\n\t\treturn{\n\t\t\t$turnTarget:null,\n\t\t\trequestSuccMsg: \"转盘已经执行完毕啦(From Default Msg)\"\n\t\t}\n\t},\n\n\tready(){\n\t\tlet isTableRotateFlag = this.turnTableConfig.isTableRotate\n\t\tthis.$turnTarget = (isTableRotateFlag === true) ? $('#turntable-drawbox') : $('#turntable-drawpoint')\n\n\t\tthis.$turnTarget[0].addEventListener('webkitTransitionEnd', ()=>{\n            setTimeout( ()=>{\n            \tthis.excuteCallBackFunc()\n            \tthis.$turnTarget.removeClass('turntable-transition').css({'-webkit-transform' : 'rotate(0deg)','transform' : 'rotate(0deg)'});\n            }, this.turnTableConfig.resumeDelay );\n\t\t}, false);\n\t},\n\n\tprops:{\n        turnTableConfig:{\n        \ttype: Object,\n        \tdefault: function(){\n        \t\treturn {\n        \t\t\trewardKinds: 8,\n        \t\t\tresumeDelay: 1000,\n        \t\t\trotateNums: 3,\n        \t\t\timgOffset: 22.5,\n                    pointNum: 3,\n        \t\t\tisTableRotate:false,\n        \t\t\tcallBackFunc: null\n        \t\t}\n        \t}\n        }\n\t},\n\n\tmethods: {\n\t\tonDrawboxCallback: function(event){\n\t\t\tthis.startupDrawbox()\n\t\t},\n\t\tstartupDrawbox: function(){\n            // Here: 到生产环境，建议将请求后端数据封装在此处(只需传回来获奖类型位置以及msg即可)；\n\n\t\t\tlet rotateNums = this.turnTableConfig.rotateNums || this.getRandom(1, this.turnTableConfig.rewardKinds)\n\t\t\tlet offset = (360/this.turnTableConfig.rewardKinds)*(this.turnTableConfig.pointNum-1)\n\t\t\tlet angel = 0;\n\t\t\tif( this.turnTableConfig.isTableRotate ){\n\t\t\t\tangel = -(360*rotateNums)-offset - this.turnTableConfig.imgOffset\n\t\t\t}else{\n\t\t\t\tangel = (360*rotateNums)+offset + this.turnTableConfig.imgOffset\n\t\t\t}\n\t\t\tlet cssObj = {'-webkit-transform':'rotate('+angel+'deg)','transform':'rotate('+angel+'deg)'}\n\t\t\tthis.$turnTarget.addClass('turntable-transition').css( cssObj );\n\t\t},\n\t\texcuteCallBackFunc: function(){\n\t\t\tif(null !== this.turnTableConfig.callBackFunc){\n            \tthis.turnTableConfig.callBackFunc( this.requestSuccMsg );\n            }\n\t\t},\n        getRandom:  function(start, end){\n            return Math.round(Math.random()* (end - start) + start)\n        }\n\t},\n\n\tevents: {\n\t   'turntable-msg': function () {\n\t\t\t// 兼容下，开启大转盘按钮不在此组件情形;\n\t\t\tthis.startupDrawbox();\n\t\t}\n   }\n}\n</script>\n\n\n<style>\n#turntable-root {\n    margin: 2% auto;\n    width: 50%;\n    padding-top: 50%;\n\t-webkit-transform:translateZ(0);\n\ttransform:translateZ(0);\n}\n#turntable-drawbox {\n    position: absolute;\n\ttop: 0;\n\tleft: 0;\n\tbottom: 0%;\n    width: 100%;\n    height: 100%;\n\tbackground-size: 100% 100%;\n}\n#turntable-drawpoint {\n    position: absolute;\n    width: 28%;\n    top: 31%;\n    left: 36.4%;\n    height: 34%;\n\tbackground-size: 100% 100%;\n\tz-index: 2;\n    -webkit-transform-origin: 50% 60%;\n    -ms-transform-origin: 50% 60%;\n    -o-transform-origin: 50% 60%;\n    -moz-transform-origin: 50% 60%;\n    transform-origin: 50% 60%;\n\twill-change: transform;\n}\n.turntable-transition{\n    -webkit-transition: -webkit-transform 2s ease-in-out;\n    transition: transform 2s ease-in-out;\n}\n#turntable-drawbox {\n  -webkit-transform-origin: 50% 50%;\n  -ms-transform-origin: 50% 50%;\n  -o-transform-origin: 50% 50%;\n  -moz-transform-origin: 50% 50%;\n  transform-origin: 50% 50%;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <!--Date: 16-04-18
	//     LastModify: 16-06-29
	// 	Author: jeffjade
	// 	Desc: 大转盘/抽奖等功能模块组件
	//  -->
	//  <template lang="jade">
	// 	#turntable-root
	// 		#turntable-drawbox
	// 		div(id="turntable-drawpoint" v-on:click="onDrawboxCallback")
	// </template>
	//
	//
	// <script>
	exports.default = {
		data: function data() {
			return {
				$turnTarget: null,
				requestSuccMsg: "转盘已经执行完毕啦(From Default Msg)"
			};
		},
		ready: function ready() {
			var _this = this;
	
			var isTableRotateFlag = this.turnTableConfig.isTableRotate;
			this.$turnTarget = isTableRotateFlag === true ? $('#turntable-drawbox') : $('#turntable-drawpoint');
	
			this.$turnTarget[0].addEventListener('webkitTransitionEnd', function () {
				setTimeout(function () {
					_this.excuteCallBackFunc();
					_this.$turnTarget.removeClass('turntable-transition').css({ '-webkit-transform': 'rotate(0deg)', 'transform': 'rotate(0deg)' });
				}, _this.turnTableConfig.resumeDelay);
			}, false);
		},
	
	
		props: {
			turnTableConfig: {
				type: Object,
				default: function _default() {
					return {
						rewardKinds: 8,
						resumeDelay: 1000,
						rotateNums: 3,
						imgOffset: 22.5,
						pointNum: 3,
						isTableRotate: false,
						callBackFunc: null
					};
				}
			}
		},
	
		methods: {
			onDrawboxCallback: function onDrawboxCallback(event) {
				this.startupDrawbox();
			},
			startupDrawbox: function startupDrawbox() {
				// Here: 到生产环境，建议将请求后端数据封装在此处(只需传回来获奖类型位置以及msg即可)；
	
				var rotateNums = this.turnTableConfig.rotateNums || this.getRandom(1, this.turnTableConfig.rewardKinds);
				var offset = 360 / this.turnTableConfig.rewardKinds * (this.turnTableConfig.pointNum - 1);
				var angel = 0;
				if (this.turnTableConfig.isTableRotate) {
					angel = -(360 * rotateNums) - offset - this.turnTableConfig.imgOffset;
				} else {
					angel = 360 * rotateNums + offset + this.turnTableConfig.imgOffset;
				}
				var cssObj = { '-webkit-transform': 'rotate(' + angel + 'deg)', 'transform': 'rotate(' + angel + 'deg)' };
				this.$turnTarget.addClass('turntable-transition').css(cssObj);
			},
			excuteCallBackFunc: function excuteCallBackFunc() {
				if (null !== this.turnTableConfig.callBackFunc) {
					this.turnTableConfig.callBackFunc(this.requestSuccMsg);
				}
			},
			getRandom: function getRandom(start, end) {
				return Math.round(Math.random() * (end - start) + start);
			}
		},
	
		events: {
			'turntable-msg': function turntableMsg() {
				// 兼容下，开启大转盘按钮不在此组件情形;
				this.startupDrawbox();
			}
		}
	};
	// </script>
	//
	//
	// <style>
	// #turntable-root {
	//     margin: 2% auto;
	//     width: 50%;
	//     padding-top: 50%;
	// 	-webkit-transform:translateZ(0);
	// 	transform:translateZ(0);
	// }
	// #turntable-drawbox {
	//     position: absolute;
	// 	top: 0;
	// 	left: 0;
	// 	bottom: 0%;
	//     width: 100%;
	//     height: 100%;
	// 	background-size: 100% 100%;
	// }
	// #turntable-drawpoint {
	//     position: absolute;
	//     width: 28%;
	//     top: 31%;
	//     left: 36.4%;
	//     height: 34%;
	// 	background-size: 100% 100%;
	// 	z-index: 2;
	//     -webkit-transform-origin: 50% 60%;
	//     -ms-transform-origin: 50% 60%;
	//     -o-transform-origin: 50% 60%;
	//     -moz-transform-origin: 50% 60%;
	//     transform-origin: 50% 60%;
	// 	will-change: transform;
	// }
	// .turntable-transition{
	//     -webkit-transition: -webkit-transform 2s ease-in-out;
	//     transition: transform 2s ease-in-out;
	// }
	// #turntable-drawbox {
	//   -webkit-transform-origin: 50% 50%;
	//   -ms-transform-origin: 50% 50%;
	//   -o-transform-origin: 50% 50%;
	//   -moz-transform-origin: 50% 50%;
	//   transform-origin: 50% 50%;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = "<div id=\"turntable-root\"><div id=\"turntable-drawbox\"></div><div id=\"turntable-drawpoint\" v-on:click=\"onDrawboxCallback\"></div></div>";

/***/ },
/* 105 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><div class=\"comp-area\"><annotate :blockquote-str='blockquoteStr'></annotate>\n<turn-table  :turn-table-config='turnTableConfig'></turn-table><a href=\"javascript:;\" @click=\"onStartDrawClick\" class=\"common-a start-draw\">{{ startDrawText }}</a><strong-dialog></strong-dialog></div>";

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(107)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_formDialog.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(113)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_formDialog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	var _annotate = __webpack_require__(24);
	
	var _annotate2 = _interopRequireDefault(_annotate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     div.comp-area
	//         <annotate :blockquote-str='blockquoteStr'></annotate>
	// </template>
	//
	// <script type="text/javascript">
	// import formDialog from 'formDialog'
	exports.default = {
	    data: function data() {
	        return {
	            compTitle: "Component Name",
	            hintingTitle: "使用示例:",
	            hintingTitle2: "表现示例:",
	            codeString: '\n    import formDialog from \'formDialog\';; //引入组件\n\n    //模板中可以按需传递参数;\n    <form-dialog></form-dialog>\n\n    // vue逻辑处理代码\n    var dlgMsgObj = {\n\t    //*Tools必传；组件涉及数据请求\n\t    Tools: Tools,\n\t    //*可不用传；以下示例皆为默认参数\n\t    userName: \'姓名\',\n\t    userPhone: \'<b>*</b>电话\',\n\t    userAddress: \'地址\',\n\t    leftBtnText: \'提交\',\n\t    rightBtnText: \'取消\',\n\t    namePlaceholder: \'请输入姓名\',\n\t    phonePlaceholder: \'请重新输入电话号码\',\n\t    addressPlaceholder: \'请输入您的地址\',\n\t    verifyPhoneNumReg: null,    //验证手机号是否合法正则;\n\t    callBackFunc: null,         //如果提交完毕，想做什么(succ tips)可放在这里；\n\t}\n\tthis.$broadcast(\'show-form-dlg\', dlgMsgObj);',
	            blockquoteStr: '此为常用填写表单组件，包括Name，Phone，Address等常用信息，以及简单的甄别判断；\n           内部封装了拉取/提交数据的操作（采用Jquery的ajax，未使用vue提供的 vue-resource）；\n           当然这在日常开发中并无很大参考性，鉴于早先如此使用，很是便捷，仅是作为组件话开发历程记载而已。\n           鉴于这缘由，就不阉割之以做分享了，此处也就未做使用示例；聚沙成塔，集腋成裘，希望在日后不断学习积淀中，\n           可以成就一些更实用而nice的组件，Fighting，Go。'
	        };
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    components: {
	        preCode: _preCode2.default,
	        annotate: _annotate2.default
	    },
	    methods: {}
	};
	// </script>

	/* generated by vue-loader */

/***/ },
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><div class=\"comp-area\"><annotate :blockquote-str='blockquoteStr'></annotate></div>";

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(115)
	__vue_script__ = __webpack_require__(117)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src/_shaveLottery.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(124)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./_shaveLottery.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(116);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_shaveLottery.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_shaveLottery.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.demo-check-area{\n    position: relative;\n    margin: 1% auto;\n    font-size: 1.3em;\n}\n", "", {"version":3,"sources":["/./src/_shaveLottery.vue?5bb497f8"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAkJA;IACA,mBAAA;IACA,gBAAA;IACA,iBAAA;CACA","file":"_shaveLottery.vue","sourcesContent":["<template lang='jade'>\n    h1#comp-title {{ compTitle }}\n    h2.hinting-title {{ hintingTitle }}\n    <pre-code :code-string=\"codeString\"></pre-code>\n    h2.hinting-title {{ hintingTitle2 }}\n    div.comp-area\n        <annotate :blockquote-str='blockquoteStr'></annotate>\n        div.demo-check-area\n            <input type=\"radio\" id=\"radio-one\" value=\"1\" v-model=\"picked\">\n            <label for=\"one\">lotteryType: text | coverType: color</label>\n            <br>\n            <input type=\"radio\" id=\"radio-two\" value=\"2\" v-model=\"picked\">\n            <label for=\"two\">lotteryType: image | coverType: color</label>\n            <br>\n            <input type=\"radio\" id=\"radio-three\" value=\"3\" v-model=\"picked\">\n            <label for=\"three\">lotteryType: text | coverType: image </label>\n            <br>\n        <shave-lottery :params-list.sync='paramsList'></shave-lottery>\n        normal-dialog\n</template>\n\n<script type=\"text/javascript\">\nimport shaveLottery from 'shaveLottery'\nimport normalDialog from 'normalDialog'\nimport preCode from './preCode.vue'\nimport annotate from './annotate.vue'\n\nexport default {\n    data () {\n        return {\n            compTitle : \"Component Name\",\n            hintingTitle: \"使用示例:\",\n            hintingTitle2: \"表现示例:\",\n            picked: 'default',\n            paramsList: {\n                width: 360,\n                height: 356,\n                cover: '#999',\n                coverType: 'color',\n                paintSize: 26,\n                lotteryContent: \"http://www.jeffjade.com\",\n                lotteryType: 'text',\n                callBackFunc: this.onShowNormalDlg\n            },\n            codeString: `\n    import shaveLottery from 'shaveLottery'; //引入组件\n\n    //在模板中如下加入组件即可(定义paramsList传递需要的参数即可)：\n    <shave-lottery :params-list.sync='paramsList'></shave-lottery>\n\n    //在逻辑代码中调用Like This即可；\n    <script type=\"text/javascript\">\n    import shaveLottery from 'shaveLottery'\n    import normalDialog from 'normalDialog'\n\n    export default {\n        data () {\n            return {\n                paramsList: {\n                    width: 360,\n                    height: 356,\n                    cover: '#999',\n                    coverType: 'color',\n                    paintSize: 26,\n                    lotteryContent: \"http://www.jeffjade.com\",\n                    lotteryType: 'text',\n                    callBackFunc: this.onShowNormalDlg\n                }\n            }\n        }\n    }\n    </ script>`,\n        blockquoteStr: `\n            <strong>微注: </strong>当 coverType 以 image 类型来呈现之时，请保证该图片地址同逻辑代码在同一域下，否则会衍生如下错误：\n            <i style='color:#f00;font-style:normal'>Uncaught SecurityError: Failed to execute 'getImageData' on 'CanvasRenderingContext2D':\n            The canvas has been tainted by cross-origin data。<span style='color:#fe0'>此组件实际表现尚不合格，在完善改进中。</span></i>\n        `\n        }\n    },\n    route:{\n\t\tdata(transition){\n            this.compTitle = transition.to.name\n\t\t}\n\t},\n    watch: {\n        picked: function (newVal, oldVal) {\n        \tif(newVal === '1'){\n                this.paramsList = {\n                    width: 360,\n                    height: 210,\n                    cover: '#999',\n                    coverType: 'color',\n                    paintSize: 20,\n                    lotteryContent: \"www.jeffjade.com\",\n                    lotteryType: 'text',\n                    callBackFunc: this.onShowNormalDlg\n                }\n            }else if(newVal === '2'){\n                this.paramsList = {\n                    width: 360,\n                    height: 356,\n                    cover: '#999',\n                    coverType: 'color',\n                    paintSize: 26,\n                    lotteryContent: 'http://7xoosr.com1.z0.glb.clouddn.com/encourage.png',\n                    lotteryType: 'image',\n                    callBackFunc: this.onShowNormalDlg\n                }\n            }else if(newVal === '3'){\n                this.paramsList = {\n                    width: 300,\n                    height: 188,\n                    cover: 'http://nicejade.github.io/jade/cover.png',\n                    coverType: 'image',\n                    lotteryContent: \"www.jeffjade.com\",\n                    lotteryType: 'text',\n                    paintSize: 26,\n                    callBackFunc: this.onShowNormalDlg\n                }\n            }\n        }\n    },\n    components: {\n        shaveLottery,\n        normalDialog,\n        annotate,\n        preCode,\n    },\n    methods: {\n        onShowNormalDlg: function( text ){\n            var dlgMsgObj = {\n                titleText: \"&温馨提示&\",       //可不传，默认 “温馨提示”\n                bodyText: text,\n                confirmText: \"确认\",          //可不传，默认 “确认”\n                callBackFunc: null,\n                isShowCloseXFlag: true       //可不传，默认 true\n            }\n\n            // var dlgMsgObj = text;  //如不需更改Dlg默认文案等，可只 文本内容字符串（String）\n            this.$broadcast('show-normal-dlg', dlgMsgObj);\n        }\n    }\n}\n</script>\n\n<style media=\"screen\">\n.demo-check-area{\n    position: relative;\n    margin: 1% auto;\n    font-size: 1.3em;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _shaveLottery = __webpack_require__(118);
	
	var _shaveLottery2 = _interopRequireDefault(_shaveLottery);
	
	var _normalDialog = __webpack_require__(39);
	
	var _normalDialog2 = _interopRequireDefault(_normalDialog);
	
	var _preCode = __webpack_require__(29);
	
	var _preCode2 = _interopRequireDefault(_preCode);
	
	var _annotate = __webpack_require__(24);
	
	var _annotate2 = _interopRequireDefault(_annotate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// <template lang='jade'>
	//     h1#comp-title {{ compTitle }}
	//     h2.hinting-title {{ hintingTitle }}
	//     <pre-code :code-string="codeString"></pre-code>
	//     h2.hinting-title {{ hintingTitle2 }}
	//     div.comp-area
	//         <annotate :blockquote-str='blockquoteStr'></annotate>
	//         div.demo-check-area
	//             <input type="radio" id="radio-one" value="1" v-model="picked">
	//             <label for="one">lotteryType: text | coverType: color</label>
	//             <br>
	//             <input type="radio" id="radio-two" value="2" v-model="picked">
	//             <label for="two">lotteryType: image | coverType: color</label>
	//             <br>
	//             <input type="radio" id="radio-three" value="3" v-model="picked">
	//             <label for="three">lotteryType: text | coverType: image </label>
	//             <br>
	//         <shave-lottery :params-list.sync='paramsList'></shave-lottery>
	//         normal-dialog
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
	    data: function data() {
	        return {
	            compTitle: "Component Name",
	            hintingTitle: "使用示例:",
	            hintingTitle2: "表现示例:",
	            picked: 'default',
	            paramsList: {
	                width: 360,
	                height: 356,
	                cover: '#999',
	                coverType: 'color',
	                paintSize: 26,
	                lotteryContent: "http://www.jeffjade.com",
	                lotteryType: 'text',
	                callBackFunc: this.onShowNormalDlg
	            },
	            codeString: '\n    import shaveLottery from \'shaveLottery\'; //引入组件\n\n    //在模板中如下加入组件即可(定义paramsList传递需要的参数即可)：\n    <shave-lottery :params-list.sync=\'paramsList\'></shave-lottery>\n\n    //在逻辑代码中调用Like This即可；\n    <script type="text/javascript">\n    import shaveLottery from \'shaveLottery\'\n    import normalDialog from \'normalDialog\'\n\n    export default {\n        data () {\n            return {\n                paramsList: {\n                    width: 360,\n                    height: 356,\n                    cover: \'#999\',\n                    coverType: \'color\',\n                    paintSize: 26,\n                    lotteryContent: "http://www.jeffjade.com",\n                    lotteryType: \'text\',\n                    callBackFunc: this.onShowNormalDlg\n                }\n            }\n        }\n    }\n    </ script>',
	            blockquoteStr: '\n            <strong>微注: </strong>当 coverType 以 image 类型来呈现之时，请保证该图片地址同逻辑代码在同一域下，否则会衍生如下错误：\n            <i style=\'color:#f00;font-style:normal\'>Uncaught SecurityError: Failed to execute \'getImageData\' on \'CanvasRenderingContext2D\':\n            The canvas has been tainted by cross-origin data。<span style=\'color:#fe0\'>此组件实际表现尚不合格，在完善改进中。</span></i>\n        '
	        };
	    },
	
	    route: {
	        data: function data(transition) {
	            this.compTitle = transition.to.name;
	        }
	    },
	    watch: {
	        picked: function picked(newVal, oldVal) {
	            if (newVal === '1') {
	                this.paramsList = {
	                    width: 360,
	                    height: 210,
	                    cover: '#999',
	                    coverType: 'color',
	                    paintSize: 20,
	                    lotteryContent: "www.jeffjade.com",
	                    lotteryType: 'text',
	                    callBackFunc: this.onShowNormalDlg
	                };
	            } else if (newVal === '2') {
	                this.paramsList = {
	                    width: 360,
	                    height: 356,
	                    cover: '#999',
	                    coverType: 'color',
	                    paintSize: 26,
	                    lotteryContent: 'http://7xoosr.com1.z0.glb.clouddn.com/encourage.png',
	                    lotteryType: 'image',
	                    callBackFunc: this.onShowNormalDlg
	                };
	            } else if (newVal === '3') {
	                this.paramsList = {
	                    width: 300,
	                    height: 188,
	                    cover: 'http://nicejade.github.io/jade/cover.png',
	                    coverType: 'image',
	                    lotteryContent: "www.jeffjade.com",
	                    lotteryType: 'text',
	                    paintSize: 26,
	                    callBackFunc: this.onShowNormalDlg
	                };
	            }
	        }
	    },
	    components: {
	        shaveLottery: _shaveLottery2.default,
	        normalDialog: _normalDialog2.default,
	        annotate: _annotate2.default,
	        preCode: _preCode2.default
	    },
	    methods: {
	        onShowNormalDlg: function onShowNormalDlg(text) {
	            var dlgMsgObj = {
	                titleText: "&温馨提示&", //可不传，默认 “温馨提示”
	                bodyText: text,
	                confirmText: "确认", //可不传，默认 “确认”
	                callBackFunc: null,
	                isShowCloseXFlag: true //可不传，默认 true
	            };
	
	            // var dlgMsgObj = text;  //如不需更改Dlg默认文案等，可只 文本内容字符串（String）
	            this.$broadcast('show-normal-dlg', dlgMsgObj);
	        }
	    }
	};
	// </script>
	//
	// <style media="screen">
	// .demo-check-area{
	//     position: relative;
	//     margin: 1% auto;
	//     font-size: 1.3em;
	// }
	// </style>

	/* generated by vue-loader */

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(119)
	__vue_script__ = __webpack_require__(121)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] ../components/modules/shaveLottery.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(123)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./shaveLottery.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(120);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./shaveLottery.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./shaveLottery.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#shave-lottery{\n    margin: auto;\n}\n.fresh-btn{\n    padding: .2% 3%;\n    background-color: #999;\n    border-radius: 1em;\n    border: 1px solid #000;\n    font-size: 1em;\n    color: #111;\n    box-shadow: 0px 0px 5px #222;\n}\n#lottery-container {\n    position:relative;\n    width: 100%;\n    height: 30%;\n    margin: auto;\n}\n#draw-percent {\n    color:#F60;\n}\n", "", {"version":3,"sources":["/../components/modules/shaveLottery.vue?7877135a"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAmFA;IACA,aAAA;CACA;AACA;IACA,gBAAA;IACA,uBAAA;IACA,mBAAA;IACA,uBAAA;IACA,eAAA;IACA,YAAA;IACA,6BAAA;CACA;AACA;IACA,kBAAA;IACA,YAAA;IACA,YAAA;IACA,aAAA;CACA;AACA;IACA,WAAA;CACA","file":"shaveLottery.vue","sourcesContent":["<template>\n    <div id=\"shave-lottery\">\n        <a class=\"fresh-btn\" href='javascript:;' @click='onFreshBtnClick'>请刷新</a>\n        <label>已刮开<span id=\"draw-percent\">{{ drawPercent }}</span> 区域。</label>\n        <div id=\"lottery-container\"></div>\n    </div>\n</template>\n\n\n<script type=\"text/javascript\">\nimport {Lottery} from './../../plugin/lottery.js'\n\nexport default {\n\tdata(){\n        return {\n            lottery: \"default\",\n            drawPercent: '0%',\n            succAreaPercent: 50,\n            elementId: 'lottery-container',\n            defaultImage: 'http://7xoosr.com1.z0.glb.clouddn.com/encourage.png',\n        }\n    },\n    ready(){\n        this.updateLottery()\n    },\n    props: ['paramsList'],\n   \twatch: {\n        paramsList: function (newVal, oldVal) {\n            this.updateLottery()\n        }\n    },\n    methods: {\n        getParamsList: function(){\n            let params = {\n                id: this.elementId,\n                cover: this.paramsList.cover || '#CCC',\n                coverType: this.paramsList.coverType || 'cover',\n                width: this.paramsList.width || 300,\n                height: this.paramsList.height || 100,\n                lotteryContent: this.paramsList.lotteryContent || this.defaultImage,\n                lotteryType: this.paramsList.lotteryType || 'image',\n                paintSize: this.paramsList.paintSize || 30,\n                callBackFunc: this.onDrawPercentCallback,\n            }\n            this.succAreaPercent = this.paramsList.succAreaPercent || 50;\n\n            return params\n        },\n\n        updateLottery: function(){\n            $('#lottery-container').empty()\n\n            var params = this.getParamsList()\n            this.lottery = new Lottery( params );\n            this.lottery.init( this.paramsList.lotteryContent , this.paramsList.lotteryType );\n\n            let lotteryWidth = this.paramsList.width + 'px'\n            let lotteryHeight = this.paramsList.height + 'px'\n            $('#lottery-container').css({'width': lotteryWidth, 'height': lotteryHeight })\n\n            this.lottery.init( this.paramsList.lotteryContent , this.paramsList.lotteryType );\n        },\n\n        //------------------------------Default Function callBack-----------------------------\n        onFreshBtnClick: function(){\n            this.drawPercent = '0%';\n            this.lottery.init( this.paramsList.lotteryContent , this.paramsList.lotteryType );\n        },\n\n        onDrawPercentCallback: function( drawPercent ){\n            this.drawPercent = drawPercent + '%'\n            if( drawPercent >= this.succAreaPercent  && null != this.paramsList.callBackFunc ){\n                this.paramsList.callBackFunc(\"Okay，刮开的区域占比已超过设定: \" + this.drawPercent )\n            }\n        }\n    },\n    events: {\n    }\n}\n</script>\n\n\n<style media=\"screen\">\n#shave-lottery{\n    margin: auto;\n}\n.fresh-btn{\n    padding: .2% 3%;\n    background-color: #999;\n    border-radius: 1em;\n    border: 1px solid #000;\n    font-size: 1em;\n    color: #111;\n    box-shadow: 0px 0px 5px #222;\n}\n#lottery-container {\n    position:relative;\n    width: 100%;\n    height: 30%;\n    margin: auto;\n}\n#draw-percent {\n    color:#F60;\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _lottery = __webpack_require__(122);
	
	exports.default = {
	    data: function data() {
	        return {
	            lottery: "default",
	            drawPercent: '0%',
	            succAreaPercent: 50,
	            elementId: 'lottery-container',
	            defaultImage: 'http://7xoosr.com1.z0.glb.clouddn.com/encourage.png'
	        };
	    },
	    ready: function ready() {
	        this.updateLottery();
	    },
	
	    props: ['paramsList'],
	    watch: {
	        paramsList: function paramsList(newVal, oldVal) {
	            this.updateLottery();
	        }
	    },
	    methods: {
	        getParamsList: function getParamsList() {
	            var params = {
	                id: this.elementId,
	                cover: this.paramsList.cover || '#CCC',
	                coverType: this.paramsList.coverType || 'cover',
	                width: this.paramsList.width || 300,
	                height: this.paramsList.height || 100,
	                lotteryContent: this.paramsList.lotteryContent || this.defaultImage,
	                lotteryType: this.paramsList.lotteryType || 'image',
	                paintSize: this.paramsList.paintSize || 30,
	                callBackFunc: this.onDrawPercentCallback
	            };
	            this.succAreaPercent = this.paramsList.succAreaPercent || 50;
	
	            return params;
	        },
	
	        updateLottery: function updateLottery() {
	            $('#lottery-container').empty();
	
	            var params = this.getParamsList();
	            this.lottery = new _lottery.Lottery(params);
	            this.lottery.init(this.paramsList.lotteryContent, this.paramsList.lotteryType);
	
	            var lotteryWidth = this.paramsList.width + 'px';
	            var lotteryHeight = this.paramsList.height + 'px';
	            $('#lottery-container').css({ 'width': lotteryWidth, 'height': lotteryHeight });
	
	            this.lottery.init(this.paramsList.lotteryContent, this.paramsList.lotteryType);
	        },
	
	        //------------------------------Default Function callBack-----------------------------
	        onFreshBtnClick: function onFreshBtnClick() {
	            this.drawPercent = '0%';
	            this.lottery.init(this.paramsList.lotteryContent, this.paramsList.lotteryType);
	        },
	
	        onDrawPercentCallback: function onDrawPercentCallback(drawPercent) {
	            this.drawPercent = drawPercent + '%';
	            if (drawPercent >= this.succAreaPercent && null != this.paramsList.callBackFunc) {
	                this.paramsList.callBackFunc("Okay，刮开的区域占比已超过设定: " + this.drawPercent);
	            }
	        }
	    },
	    events: {}
	};
	// </script>
	//
	//
	// <style media="screen">
	// #shave-lottery{
	//     margin: auto;
	// }
	// .fresh-btn{
	//     padding: .2% 3%;
	//     background-color: #999;
	//     border-radius: 1em;
	//     border: 1px solid #000;
	//     font-size: 1em;
	//     color: #111;
	//     box-shadow: 0px 0px 5px #222;
	// }
	// #lottery-container {
	//     position:relative;
	//     width: 100%;
	//     height: 30%;
	//     margin: auto;
	// }
	// #draw-percent {
	//     color:#F60;
	// }
	// </style>

	/* generated by vue-loader */
	// <template>
	//     <div id="shave-lottery">
	//         <a class="fresh-btn" href='javascript:;' @click='onFreshBtnClick'>请刷新</a>
	//         <label>已刮开<span id="draw-percent">{{ drawPercent }}</span> 区域。</label>
	//         <div id="lottery-container"></div>
	//     </div>
	// </template>
	//
	//
	// <script type="text/javascript">

/***/ },
/* 122 */
/***/ function(module, exports) {

	function Lottery( params ) {
	    this.conId = params.id;
	    this.conNode = document.getElementById(this.conId);
	    this.cover = params.cover;
	    this.coverType = params.coverType;
	    this.width = params.width;
	    this.height = params.height;
	    this.drawPercentCallback = params.callBackFunc;
	    this.paintSize = params.paintSize;
	    this.background = null;
	    this.backCtx = null;
	    this.mask = null;
	    this.maskCtx = null;
	    this.lottery = null;
	    this.lotteryType = 'image';
	    this.clientRect = null;
	}
	
	Lottery.prototype = {
	    createElement: function (tagName, attributes) {
	        var ele = document.createElement(tagName);
	        for (var key in attributes) {
	            ele.setAttribute(key, attributes[key]);
	        }
	        return ele;
	    },
	    getTransparentPercent: function(ctx, width, height) {
	        var imgData = ctx.getImageData(0, 0, width, height),
	            pixles = imgData.data,
	            transPixs = [];
	        for (var i = 0, j = pixles.length; i < j; i += 4) {
	            var a = pixles[i + 3];
	            if (a < 128) {
	                transPixs.push(i);
	            }
	        }
	        return (transPixs.length / (pixles.length / 4) * 100).toFixed(2);
	    },
	    resizeCanvas: function (canvas, width, height) {
	        canvas.width = width;
	        canvas.height = height;
	        canvas.getContext('2d').clearRect(0, 0, width, height);
	    },
	    drawPoint: function (x, y) {
	        this.maskCtx.beginPath();
	        var radgrad = this.maskCtx.createRadialGradient(x, y, 0, x, y, 30);
	        radgrad.addColorStop(0, 'rgba(0,0,0,0.6)');
	        radgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
	        this.maskCtx.fillStyle = radgrad;
	        this.maskCtx.arc(x, y, this.paintSize, 0, Math.PI * 2, true);
	        this.maskCtx.fill();
	        if (this.drawPercentCallback) {
	            this.drawPercentCallback.call(null, this.getTransparentPercent(this.maskCtx, this.width, this.height));
	        }
	    },
	    bindEvent: function () {
	        var _this = this;
	        var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
	        var clickEvtName = device ? 'touchstart' : 'mousedown';
	        var moveEvtName = device? 'touchmove': 'mousemove';
	        if (!device) {
	            var isMouseDown = false;
	            document.addEventListener('mouseup', function(e) {
	                isMouseDown = false;
	            }, false);
	        } else {
	            document.addEventListener("touchmove", function(e) {
	                if (isMouseDown) {
	                    e.preventDefault();
	                }
	            }, false);
	            document.addEventListener('touchend', function(e) {
	                isMouseDown = false;
	            }, false);
	        }
	        this.mask.addEventListener(clickEvtName, function (e) {
	            isMouseDown = true;
	            var docEle = document.documentElement;
	            if (!_this.clientRect) {
	                _this.clientRect = {
	                    left: 0,
	                    top:0
	                };
	            }
	            var x = (device ? e.touches[0].clientX : e.clientX) - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
	            var y = (device ? e.touches[0].clientY : e.clientY) - _this.clientRect.top + docEle.scrollTop - docEle.clientTop;
	            _this.drawPoint(x, y);
	        }, false);
	
	        this.mask.addEventListener(moveEvtName, function (e) {
	            if (!device && !isMouseDown) {
	                return false;
	            }
	            var docEle = document.documentElement;
	            if (!_this.clientRect) {
	                _this.clientRect = {
	                    left: 0,
	                    top:0
	                };
	            }
	            var x = (device ? e.touches[0].clientX : e.clientX) - _this.clientRect.left + docEle.scrollLeft - docEle.clientLeft;
	            var y = (device ? e.touches[0].clientY : e.clientY) - _this.clientRect.top + docEle.scrollTop - docEle.clientTop;
	            _this.drawPoint(x, y);
	        }, false);
	    },
	    drawLottery: function () {
	        this.background = this.background || this.createElement('canvas', {
	            style: 'position:absolute;left:0;top:0;'
	        });
	        this.mask = this.mask || this.createElement('canvas', {
	            style: 'position:absolute;left:0;top:0;'
	        });
	
	        if (!this.conNode.innerHTML.replace(/[\w\W]| /g, '')) {
	            this.conNode.appendChild(this.background);
	            this.conNode.appendChild(this.mask);
	            this.clientRect = this.conNode ? this.conNode.getBoundingClientRect() : null;
	            this.bindEvent();
	        }
	
	        this.backCtx = this.backCtx || this.background.getContext('2d');
	        this.maskCtx = this.maskCtx || this.mask.getContext('2d');
	
	        if (this.lotteryType == 'image') {
	            var image = new Image(),
	                _this = this;
	            image.onload = function () {
	                _this.width = this.width;
	                _this.height = this.height;
	                _this.resizeCanvas(_this.background, this.width, this.height);
	                _this.backCtx.drawImage(this, 0, 0);
	                _this.drawMask();
	            }
	            image.src = this.lottery;
	        } else if (this.lotteryType == 'text') {
	            this.width = this.width;
	            this.height = this.height;
	            this.resizeCanvas(this.background, this.width, this.height);
	            this.backCtx.save();
	            this.backCtx.fillStyle = '#FFF';
	            this.backCtx.fillRect(0, 0, this.width, this.height);
	            this.backCtx.restore();
	            this.backCtx.save();
	            var fontSize = 30;
	            this.backCtx.font = 'Bold ' + fontSize + 'px Arial';
	            this.backCtx.textAlign = 'center';
	            this.backCtx.fillStyle = '#F60';
	            this.backCtx.fillText(this.lottery, this.width / 2, this.height / 2 + fontSize / 2);
	            this.backCtx.restore();
	            this.drawMask();
	        }
	    },
	    drawMask: function() {
	        this.resizeCanvas(this.mask, this.width, this.height);
	        if (this.coverType == 'color') {
	            this.maskCtx.fillStyle = this.cover;
	            this.maskCtx.fillRect(0, 0, this.width, this.height);
	            this.maskCtx.globalCompositeOperation = 'destination-out';
	        } else if (this.coverType == 'image'){
	            var image = new Image(),
	                _this = this;
	            image.onload = function () {
	                _this.maskCtx.drawImage(this, 0, 0);
	                _this.maskCtx.globalCompositeOperation = 'destination-out';
	            }
	            image.src = this.cover;
	        }
	    },
	    init: function (lottery, lotteryType) {
	        this.lottery = lottery;
	        this.lotteryType = lotteryType || 'image';
	        this.drawLottery();
	    }
	}
	
	exports.Lottery = Lottery


/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = "\n<div id=\"shave-lottery\">\n    <a class=\"fresh-btn\" href='javascript:;' @click='onFreshBtnClick'>请刷新</a>\n    <label>已刮开<span id=\"draw-percent\">{{ drawPercent }}</span> 区域。</label>\n    <div id=\"lottery-container\"></div>\n</div>\n";

/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = "<h1 id=\"comp-title\">{{ compTitle }}</h1><h2 class=\"hinting-title\">{{ hintingTitle }}</h2><pre-code :code-string=\"codeString\"></pre-code><h2 class=\"hinting-title\">{{ hintingTitle2 }}</h2><div class=\"comp-area\"><annotate :blockquote-str='blockquoteStr'></annotate><div class=\"demo-check-area\"><input type=\"radio\" id=\"radio-one\" value=\"1\" v-model=\"picked\">\n<label for=\"one\">lotteryType: text | coverType: color</label>\n<br>\n<input type=\"radio\" id=\"radio-two\" value=\"2\" v-model=\"picked\">\n<label for=\"two\">lotteryType: image | coverType: color</label>\n<br>\n<input type=\"radio\" id=\"radio-three\" value=\"3\" v-model=\"picked\">\n<label for=\"three\">lotteryType: text | coverType: image </label>\n<br></div><shave-lottery :params-list.sync='paramsList'></shave-lottery><normal-dialog></normal-dialog></div>";

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(126)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = "<div>赵钱孙李,周吴郑王 @main page;</div>";

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./_commonTable.vue": 88,
		"./_countDown.vue": 80,
		"./_formDialog.vue": 106,
		"./_normalDialog.vue": 35,
		"./_popupToast.vue": 17,
		"./_shaveLottery.vue": 114,
		"./_spanFlexTable.vue": 70,
		"./_strongDialog.vue": 45,
		"./_tabBarWithJq.vue": 53,
		"./_tabBarWithRouter.vue": 61,
		"./_turnTable.vue": 98,
		"./annotate.vue": 24,
		"./desc.vue": 12,
		"./index.vue": 4,
		"./main.vue": 125,
		"./preCode.vue": 29,
		"./rule.vue": 128
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 127;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(129)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./rule.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = "<div>冯陈诸卫,蒋沈韩杨 @rule page;</div>";

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(131);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_turnTable.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?sourceMap!./../../node_modules/vue-loader/lib/style-rewriter.js!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./_turnTable.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n#turntable-drawbox{\n    background-image: url(http://nicejade.github.io/jade/table.png);\n    background-size: 100% 100%;\n}\n#turntable-drawpoint{\n    background-image: url(http://nicejade.github.io/jade/point.png);\n    background-size: 100% 100%;\n}\n.start-draw{\n    display: inline-block;\n    left: 50%;\n    margin: auto;\n    line-height: normal;\n    -webkit-transform: translate(-50%,0);\n            transform: translate(-50%,0);\n}\n", "", {"version":3,"sources":["/./src/_turnTable.vue?3a743d70"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AA8HA;IACA,gEAAA;IACA,2BAAA;CACA;AACA;IACA,gEAAA;IACA,2BAAA;CACA;AACA;IACA,sBAAA;IACA,UAAA;IACA,aAAA;IACA,oBAAA;IACA,qCAAA;YAAA,6BAAA;CACA","file":"_turnTable.vue","sourcesContent":["<template lang='jade'>\n    h1#comp-title {{ compTitle }}\n    h2.hinting-title {{ hintingTitle }}\n    <pre-code :code-string=\"codeString\"></pre-code>\n    h2.hinting-title {{ hintingTitle2 }}\n    div.comp-area\n        <annotate :blockquote-str='blockquoteStr'></annotate>\n        <turn-table  :turn-table-config='turnTableConfig'></turn-table>\n        a(href='javascript:;' class=\"common-a start-draw\" @click=\"onStartDrawClick\") {{ startDrawText }}\n        strong-dialog\n</template>\n\n<script type=\"text/javascript\">\nimport turnTable from 'turnTable';\nimport annotate from './annotate.vue'\nimport preCode from './preCode.vue'\nimport strongDialog from 'strongDialog'\n\nexport default {\n    data () {\n        return {\n            compTitle : \"Component Name\",\n            hintingTitle: \"使用示例:\",\n            hintingTitle2: \"表现示例:\",\n            startDrawText: \"开启大转盘\",\n            turnTableConfig: {\n                rewardKinds: 8,    //奖励种类数\n                resumeDelay: 2000, //旋转停止回调延时\n                rotateNums: 2,     // 转盘旋转圈数；默认3\n                imgOffset: 0,      //初始指针与图片的偏移\n                isTableRotate:true,  //true为转盘旋转，false为指针旋转\n                pointNum: null,\n                callBackFunc: ( textMsg )=>{\n                    var dlgMsgObj = {\n                        titleText: \"&温馨提示&\",\n                        bodyText: textMsg,\n                        btnsObj: {\n                            0: {\n                                btnText: \"取消\",\n                                callBackFunc: null\n                            },\n                            1: {\n                                btnText: \"确认\",\n                                callBackFunc: null\n                            }\n                        },\n                        isShowCloseXFlag: true\n                    }\n                    this.$broadcast('show-strong-dlg', dlgMsgObj);\n                }\n            },\n            codeString: `\n        import turnTable from 'turnTable'; //引入组件\n\n        //模板中可以按需传递参数;\n        <turn-table  :turn-table-config='turnTableConfig'></turn-table>\n\n        // vue逻辑处理代码(也可外部广播\"turntable-msg\"消息开启大转盘)\n        <script>\n            import turnTable from 'turnTable';\n\n            export default {\n                data () {\n                    return {\n                        Tools: Tools,\n                        turnTableConfig: {\n                            rewardKinds: 8,    //奖励种类数\n                            resumeDelay: 1000, //旋转停止回调延时\n                            rotateNums: 2,     // 转盘旋转圈数；默认3\n                            imgOffset: 22.5,   //初始指针与图片的偏移\n                            isTableRotate: false,  //true为转盘旋转，false为指针旋转\n                            pointNum: 6,       // 旋转指针指向位置(起始于1),如果将请求后台封装在组件内，则无需如此；\n                            callBackFunc: ( textMsg )=>{\n                                var dlgMsgObj = {\n                                    titleText: \"&温馨提示&\",\n                                    bodyText: textMsg,\n                                    btnsObj: {\n                                        0: {\n                                            btnText: \"取消\",\n                                            callBackFunc: null\n                                        },\n                                        1: {\n                                            btnText: \"确认\",\n                                            callBackFunc: null\n                                        }\n                                    },\n                                    isShowCloseXFlag: true\n                                }\n                                this.$broadcast('show-strong-dlg', dlgMsgObj);\n                            }\n                        }\n                    }\n               },\n              components: {\n                  turnTable,\n              }\n            }\n        < /script>`,\n            blockquoteStr: `这是一个阉割版本的转盘抽奖组件；在生产环境，蛮建议将请求的后代数据也封装于组件之内(如有不同，可传接口)，\n                如此，后续使用需要关注的内容就更少，善莫大焉。此组件，已较丰富完善，譬如旋转主体可设置转盘or指针、开启大转盘抽奖，\n                承载的操作主题可以是指针按钮，抑或外部按钮(广播\"turntable-msg\"消息即可)；使用时，只需提供两张好的图外加微调样式即可；\n                当然如果奖品在一次活动之内，连奖品类型都是动态的话，需另写组件予以支持。`\n            }\n    },\n    route:{\n\t\tdata(transition){\n            this.compTitle = transition.to.name\n\t\t}\n\t},\n    components: {\n        preCode,\n        turnTable,\n        annotate,\n        strongDialog,\n    },\n    methods: {\n        onStartDrawClick: function(){\n            this.$broadcast('turntable-msg')\n        }\n    },\n    events: {\n    }\n}\n</script>\n\n<style media=\"screen\">\n#turntable-drawbox{\n    background-image: url(http://nicejade.github.io/jade/table.png);\n    background-size: 100% 100%;\n}\n#turntable-drawpoint{\n    background-image: url(http://nicejade.github.io/jade/point.png);\n    background-size: 100% 100%;\n}\n.start-draw{\n    display: inline-block;\n    left: 50%;\n    margin: auto;\n    line-height: normal;\n    transform: translate(-50%,0);\n}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map