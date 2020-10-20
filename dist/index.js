'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var CryptoJS = CryptoJS || function (a, b) {
  var c = {},
      d = c.lib = {},
      e = function e() {},
      f = d.Base = {
    extend: function extend(a) {
      e.prototype = this;
      var b = new e();
      return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function () {
        b.$super.init.apply(this, arguments);
      }), b.init.prototype = b, b.$super = this, b;
    },
    create: function create() {
      var a = this.extend();
      return a.init.apply(a, arguments), a;
    },
    init: function init() {},
    mixIn: function mixIn(a) {
      for (var b in a) {
        a.hasOwnProperty(b) && (this[b] = a[b]);
      }

      a.hasOwnProperty("toString") && (this.toString = a.toString);
    },
    clone: function clone() {
      return this.init.prototype.extend(this);
    }
  },
      g = d.WordArray = f.extend({
    init: function init(a, c) {
      a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length;
    },
    toString: function toString(a) {
      return (a || i).stringify(this);
    },
    concat: function concat(a) {
      var b = this.words,
          c = a.words,
          d = this.sigBytes;
      if (a = a.sigBytes, this.clamp(), d % 4) for (var e = 0; e < a; e++) {
        b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
      } else if (65535 < c.length) for (e = 0; e < a; e += 4) {
        b[d + e >>> 2] = c[e >>> 2];
      } else b.push.apply(b, c);
      return this.sigBytes += a, this;
    },
    clamp: function clamp() {
      var b = this.words,
          c = this.sigBytes;
      b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4);
    },
    clone: function clone() {
      var a = f.clone.call(this);
      return a.words = this.words.slice(0), a;
    },
    random: function random(b) {
      for (var c = [], d = 0; d < b; d += 4) {
        c.push(4294967296 * a.random() | 0);
      }

      return new g.init(c, b);
    }
  }),
      h = c.enc = {},
      i = h.Hex = {
    stringify: function stringify(a) {
      var b = a.words;
      a = a.sigBytes;

      for (var c = [], d = 0; d < a; d++) {
        var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
        c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16));
      }

      return c.join("");
    },
    parse: function parse(a) {
      for (var b = a.length, c = [], d = 0; d < b; d += 2) {
        c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
      }

      return new g.init(c, b / 2);
    }
  },
      j = h.Latin1 = {
    stringify: function stringify(a) {
      var b = a.words;
      a = a.sigBytes;

      for (var c = [], d = 0; d < a; d++) {
        c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
      }

      return c.join("");
    },
    parse: function parse(a) {
      for (var b = a.length, c = [], d = 0; d < b; d++) {
        c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
      }

      return new g.init(c, b);
    }
  },
      k = h.Utf8 = {
    stringify: function stringify(a) {
      try {
        return decodeURIComponent(escape(j.stringify(a)));
      } catch (a) {
        throw Error("Malformed UTF-8 data");
      }
    },
    parse: function parse(a) {
      return j.parse(unescape(encodeURIComponent(a)));
    }
  },
      l = d.BufferedBlockAlgorithm = f.extend({
    reset: function reset() {
      this._data = new g.init(), this._nDataBytes = 0;
    },
    _append: function _append(a) {
      "string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
    },
    _process: function _process(b) {
      var c = this._data,
          d = c.words,
          e = c.sigBytes,
          f = this.blockSize,
          h = e / (4 * f),
          h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);

      if (b = h * f, e = a.min(4 * b, e), b) {
        for (var i = 0; i < b; i += f) {
          this._doProcessBlock(d, i);
        }

        i = d.splice(0, b), c.sigBytes -= e;
      }

      return new g.init(i, e);
    },
    clone: function clone() {
      var a = f.clone.call(this);
      return a._data = this._data.clone(), a;
    },
    _minBufferSize: 0
  });

  d.Hasher = l.extend({
    cfg: f.extend(),
    init: function init(a) {
      this.cfg = this.cfg.extend(a), this.reset();
    },
    reset: function reset() {
      l.reset.call(this), this._doReset();
    },
    update: function update(a) {
      return this._append(a), this._process(), this;
    },
    finalize: function finalize(a) {
      return a && this._append(a), this._doFinalize();
    },
    blockSize: 16,
    _createHelper: function _createHelper(a) {
      return function (b, c) {
        return new a.init(c).finalize(b);
      };
    },
    _createHmacHelper: function _createHmacHelper(a) {
      return function (b, c) {
        return new m.HMAC.init(a, c).finalize(b);
      };
    }
  });
  var m = c.algo = {};
  return c;
}(Math);

!function () {
  var a = CryptoJS,
      b = a.lib,
      c = b.WordArray,
      d = b.Hasher,
      e = [],
      b = a.algo.SHA1 = d.extend({
    _doReset: function _doReset() {
      this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
    },
    _doProcessBlock: function _doProcessBlock(a, b) {
      for (var c = this._hash.words, d = c[0], f = c[1], g = c[2], h = c[3], i = c[4], j = 0; 80 > j; j++) {
        if (16 > j) e[j] = 0 | a[b + j];else {
          var k = e[j - 3] ^ e[j - 8] ^ e[j - 14] ^ e[j - 16];
          e[j] = k << 1 | k >>> 31;
        }
        k = (d << 5 | d >>> 27) + i + e[j], k = 20 > j ? k + ((f & g | ~f & h) + 1518500249) : 40 > j ? k + ((f ^ g ^ h) + 1859775393) : 60 > j ? k + ((f & g | f & h | g & h) - 1894007588) : k + ((f ^ g ^ h) - 899497514), i = h, h = g, g = f << 30 | f >>> 2, f = d, d = k;
      }

      c[0] = c[0] + d | 0, c[1] = c[1] + f | 0, c[2] = c[2] + g | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0;
    },
    _doFinalize: function _doFinalize() {
      var a = this._data,
          b = a.words,
          c = 8 * this._nDataBytes,
          d = 8 * a.sigBytes;
      return b[d >>> 5] |= 128 << 24 - d % 32, b[(d + 64 >>> 9 << 4) + 14] = Math.floor(c / 4294967296), b[(d + 64 >>> 9 << 4) + 15] = c, a.sigBytes = 4 * b.length, this._process(), this._hash;
    },
    clone: function clone() {
      var a = d.clone.call(this);
      return a._hash = this._hash.clone(), a;
    }
  });
  a.SHA1 = d._createHelper(b), a.HmacSHA1 = d._createHmacHelper(b);
}();

var CryptoJS = CryptoJS || function (a, b) {
  var c = {},
      d = c.lib = {},
      e = function e() {},
      f = d.Base = {
    extend: function extend(a) {
      e.prototype = this;
      var b = new e();
      return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function () {
        b.$super.init.apply(this, arguments);
      }), b.init.prototype = b, b.$super = this, b;
    },
    create: function create() {
      var a = this.extend();
      return a.init.apply(a, arguments), a;
    },
    init: function init() {},
    mixIn: function mixIn(a) {
      for (var b in a) {
        a.hasOwnProperty(b) && (this[b] = a[b]);
      }

      a.hasOwnProperty("toString") && (this.toString = a.toString);
    },
    clone: function clone() {
      return this.init.prototype.extend(this);
    }
  },
      g = d.WordArray = f.extend({
    init: function init(a, c) {
      a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length;
    },
    toString: function toString(a) {
      return (a || i).stringify(this);
    },
    concat: function concat(a) {
      var b = this.words,
          c = a.words,
          d = this.sigBytes;
      if (a = a.sigBytes, this.clamp(), d % 4) for (var e = 0; e < a; e++) {
        b[d + e >>> 2] |= (c[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
      } else if (65535 < c.length) for (e = 0; e < a; e += 4) {
        b[d + e >>> 2] = c[e >>> 2];
      } else b.push.apply(b, c);
      return this.sigBytes += a, this;
    },
    clamp: function clamp() {
      var b = this.words,
          c = this.sigBytes;
      b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4);
    },
    clone: function clone() {
      var a = f.clone.call(this);
      return a.words = this.words.slice(0), a;
    },
    random: function random(b) {
      for (var c = [], d = 0; d < b; d += 4) {
        c.push(4294967296 * a.random() | 0);
      }

      return new g.init(c, b);
    }
  }),
      h = c.enc = {},
      i = h.Hex = {
    stringify: function stringify(a) {
      var b = a.words;
      a = a.sigBytes;

      for (var c = [], d = 0; d < a; d++) {
        var e = b[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
        c.push((e >>> 4).toString(16)), c.push((15 & e).toString(16));
      }

      return c.join("");
    },
    parse: function parse(a) {
      for (var b = a.length, c = [], d = 0; d < b; d += 2) {
        c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
      }

      return new g.init(c, b / 2);
    }
  },
      j = h.Latin1 = {
    stringify: function stringify(a) {
      var b = a.words;
      a = a.sigBytes;

      for (var c = [], d = 0; d < a; d++) {
        c.push(String.fromCharCode(b[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
      }

      return c.join("");
    },
    parse: function parse(a) {
      for (var b = a.length, c = [], d = 0; d < b; d++) {
        c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
      }

      return new g.init(c, b);
    }
  },
      k = h.Utf8 = {
    stringify: function stringify(a) {
      try {
        return decodeURIComponent(escape(j.stringify(a)));
      } catch (a) {
        throw Error("Malformed UTF-8 data");
      }
    },
    parse: function parse(a) {
      return j.parse(unescape(encodeURIComponent(a)));
    }
  },
      l = d.BufferedBlockAlgorithm = f.extend({
    reset: function reset() {
      this._data = new g.init(), this._nDataBytes = 0;
    },
    _append: function _append(a) {
      "string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
    },
    _process: function _process(b) {
      var c = this._data,
          d = c.words,
          e = c.sigBytes,
          f = this.blockSize,
          h = e / (4 * f),
          h = b ? a.ceil(h) : a.max((0 | h) - this._minBufferSize, 0);

      if (b = h * f, e = a.min(4 * b, e), b) {
        for (var i = 0; i < b; i += f) {
          this._doProcessBlock(d, i);
        }

        i = d.splice(0, b), c.sigBytes -= e;
      }

      return new g.init(i, e);
    },
    clone: function clone() {
      var a = f.clone.call(this);
      return a._data = this._data.clone(), a;
    },
    _minBufferSize: 0
  });

  d.Hasher = l.extend({
    cfg: f.extend(),
    init: function init(a) {
      this.cfg = this.cfg.extend(a), this.reset();
    },
    reset: function reset() {
      l.reset.call(this), this._doReset();
    },
    update: function update(a) {
      return this._append(a), this._process(), this;
    },
    finalize: function finalize(a) {
      return a && this._append(a), this._doFinalize();
    },
    blockSize: 16,
    _createHelper: function _createHelper(a) {
      return function (b, c) {
        return new a.init(c).finalize(b);
      };
    },
    _createHmacHelper: function _createHmacHelper(a) {
      return function (b, c) {
        return new m.HMAC.init(a, c).finalize(b);
      };
    }
  });
  var m = c.algo = {};
  return c;
}(Math);

!function (a) {
  for (var b = CryptoJS, c = b.lib, d = c.WordArray, e = c.Hasher, c = b.algo, f = [], g = [], h = function h(a) {
    return 4294967296 * (a - (0 | a)) | 0;
  }, i = 2, j = 0; 64 > j;) {
    var k;

    a: {
      k = i;

      for (var l = a.sqrt(k), m = 2; m <= l; m++) {
        if (!(k % m)) {
          k = !1;
          break a;
        }
      }

      k = !0;
    }

    k && (8 > j && (f[j] = h(a.pow(i, .5))), g[j] = h(a.pow(i, 1 / 3)), j++), i++;
  }

  var n = [],
      c = c.SHA256 = e.extend({
    _doReset: function _doReset() {
      this._hash = new d.init(f.slice(0));
    },
    _doProcessBlock: function _doProcessBlock(a, b) {
      for (var c = this._hash.words, d = c[0], e = c[1], f = c[2], h = c[3], i = c[4], j = c[5], k = c[6], l = c[7], m = 0; 64 > m; m++) {
        if (16 > m) n[m] = 0 | a[b + m];else {
          var o = n[m - 15],
              p = n[m - 2];
          n[m] = ((o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3) + n[m - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[m - 16];
        }
        o = l + ((i << 26 | i >>> 6) ^ (i << 21 | i >>> 11) ^ (i << 7 | i >>> 25)) + (i & j ^ ~i & k) + g[m] + n[m], p = ((d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22)) + (d & e ^ d & f ^ e & f), l = k, k = j, j = i, i = h + o | 0, h = f, f = e, e = d, d = o + p | 0;
      }

      c[0] = c[0] + d | 0, c[1] = c[1] + e | 0, c[2] = c[2] + f | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0, c[5] = c[5] + j | 0, c[6] = c[6] + k | 0, c[7] = c[7] + l | 0;
    },
    _doFinalize: function _doFinalize() {
      var b = this._data,
          c = b.words,
          d = 8 * this._nDataBytes,
          e = 8 * b.sigBytes;
      return c[e >>> 5] |= 128 << 24 - e % 32, c[(e + 64 >>> 9 << 4) + 14] = a.floor(d / 4294967296), c[(e + 64 >>> 9 << 4) + 15] = d, b.sigBytes = 4 * c.length, this._process(), this._hash;
    },
    clone: function clone() {
      var a = e.clone.call(this);
      return a._hash = this._hash.clone(), a;
    }
  });
  b.SHA256 = e._createHelper(c), b.HmacSHA256 = e._createHmacHelper(c);
}(Math), function () {
  var a = CryptoJS,
      b = a.lib,
      c = b.WordArray,
      d = a.enc;
  d.Base64 = {
    stringify: function stringify(a) {
      var b = a.words,
          c = a.sigBytes,
          d = this._map;
      a.clamp();

      for (var e = [], f = 0; f < c; f += 3) {
        for (var g = b[f >>> 2] >>> 24 - f % 4 * 8 & 255, h = b[f + 1 >>> 2] >>> 24 - (f + 1) % 4 * 8 & 255, i = b[f + 2 >>> 2] >>> 24 - (f + 2) % 4 * 8 & 255, j = g << 16 | h << 8 | i, k = 0; k < 4 && f + .75 * k < c; k++) {
          e.push(d.charAt(j >>> 6 * (3 - k) & 63));
        }
      }

      var l = d.charAt(64);
      if (l) for (; e.length % 4;) {
        e.push(l);
      }
      return e.join("");
    },
    parse: function parse(a) {
      var b = a.length,
          d = this._map,
          e = d.charAt(64);

      if (e) {
        var f = a.indexOf(e);
        f != -1 && (b = f);
      }

      for (var g = [], h = 0, i = 0; i < b; i++) {
        if (i % 4) {
          var j = d.indexOf(a.charAt(i - 1)) << i % 4 * 2,
              k = d.indexOf(a.charAt(i)) >>> 6 - i % 4 * 2;
          g[h >>> 2] |= (j | k) << 24 - h % 4 * 8, h++;
        }
      }

      return c.create(g, h);
    },
    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  };
}(), function () {
  if ("function" == typeof ArrayBuffer) {
    var a = CryptoJS,
        b = a.lib,
        c = b.WordArray,
        d = c.init,
        e = c.init = function (a) {
      if (a instanceof ArrayBuffer && (a = new Uint8Array(a)), (a instanceof Int8Array || a instanceof Uint8ClampedArray || a instanceof Int16Array || a instanceof Uint16Array || a instanceof Int32Array || a instanceof Uint32Array || a instanceof Float32Array || a instanceof Float64Array) && (a = new Uint8Array(a.buffer, a.byteOffset, a.byteLength)), a instanceof Uint8Array) {
        for (var b = a.byteLength, c = [], e = 0; e < b; e++) {
          c[e >>> 2] |= a[e] << 24 - e % 4 * 8;
        }

        d.call(this, c, b);
      } else d.apply(this, arguments);
    };

    e.prototype = c;
  }
}();
var TinCan$1;
!function () {

  var a = {
    statementId: !0,
    voidedStatementId: !0,
    verb: !0,
    object: !0,
    registration: !0,
    context: !0,
    actor: !0,
    since: !0,
    until: !0,
    limit: !0,
    authoritative: !0,
    sparse: !0,
    instructor: !0,
    ascending: !0,
    continueToken: !0,
    agent: !0,
    activityId: !0,
    stateId: !0,
    profileId: !0,
    activity_platform: !0,
    grouping: !0,
    "Accept-Language": !0
  };
  TinCan$1 = function TinCan(a) {
    this.log("constructor"), this.recordStores = [], this.actor = null, this.activity = null, this.registration = null, this.context = null, this.init(a);
  }, TinCan$1.prototype = {
    LOG_SRC: "TinCan",
    log: function log(a, b) {
      TinCan$1.DEBUG && "undefined" != typeof console && console.log && (b = b || this.LOG_SRC || "TinCan", console.log("TinCan." + b + ": " + a));
    },
    init: function init(a) {
      this.log("init");
      var b;
      if (a = a || {}, a.hasOwnProperty("url") && "" !== a.url && this._initFromQueryString(a.url), a.hasOwnProperty("recordStores") && void 0 !== a.recordStores) for (b = 0; b < a.recordStores.length; b += 1) {
        this.addRecordStore(a.recordStores[b]);
      }
      a.hasOwnProperty("activity") && (a.activity instanceof TinCan$1.Activity ? this.activity = a.activity : this.activity = new TinCan$1.Activity(a.activity)), a.hasOwnProperty("actor") && (a.actor instanceof TinCan$1.Agent ? this.actor = a.actor : this.actor = new TinCan$1.Agent(a.actor)), a.hasOwnProperty("context") && (a.context instanceof TinCan$1.Context ? this.context = a.context : this.context = new TinCan$1.Context(a.context)), a.hasOwnProperty("registration") && (this.registration = a.registration);
    },
    _initFromQueryString: function _initFromQueryString(b) {
      this.log("_initFromQueryString");
      var c,
          d,
          e,
          f = TinCan$1.Utils.parseURL(b).params,
          g = ["endpoint", "auth"],
          h = {},
          i = null;

      if (f.hasOwnProperty("actor")) {
        this.log("_initFromQueryString - found actor: " + f.actor);

        try {
          this.actor = TinCan$1.Agent.fromJSON(f.actor), delete f.actor;
        } catch (a) {
          this.log("_initFromQueryString - failed to set actor: " + a);
        }
      }

      if (f.hasOwnProperty("activity_id") && (this.activity = new TinCan$1.Activity({
        id: f.activity_id
      }), delete f.activity_id), (f.hasOwnProperty("activity_platform") || f.hasOwnProperty("registration") || f.hasOwnProperty("grouping")) && (e = {}, f.hasOwnProperty("activity_platform") && (e.platform = f.activity_platform, delete f.activity_platform), f.hasOwnProperty("registration") && (e.registration = this.registration = f.registration, delete f.registration), f.hasOwnProperty("grouping") && (e.contextActivities = {}, e.contextActivities.grouping = f.grouping, delete f.grouping), this.context = new TinCan$1.Context(e)), f.hasOwnProperty("endpoint")) {
        for (c = 0; c < g.length; c += 1) {
          d = g[c], f.hasOwnProperty(d) && (h[d] = f[d], delete f[d]);
        }

        for (c in f) {
          f.hasOwnProperty(c) && (a.hasOwnProperty(c) ? delete f[c] : (i = i || {}, i[c] = f[c]));
        }

        null !== i && (h.extended = i), h.allowFail = !1, this.addRecordStore(h);
      }
    },
    addRecordStore: function addRecordStore(a) {
      this.log("addRecordStore");
      var b;
      b = a instanceof TinCan$1.LRS ? a : new TinCan$1.LRS(a), this.recordStores.push(b);
    },
    prepareStatement: function prepareStatement(a) {
      return this.log("prepareStatement"), a instanceof TinCan$1.Statement || (a = new TinCan$1.Statement(a)), null === a.actor && null !== this.actor && (a.actor = this.actor), null === a.target && null !== this.activity && (a.target = this.activity), null !== this.context && (null === a.context ? a.context = this.context : (null === a.context.registration && (a.context.registration = this.context.registration), null === a.context.platform && (a.context.platform = this.context.platform), null !== this.context.contextActivities && (null === a.context.contextActivities ? a.context.contextActivities = this.context.contextActivities : (null !== this.context.contextActivities.grouping && null === a.context.contextActivities.grouping && (a.context.contextActivities.grouping = this.context.contextActivities.grouping), null !== this.context.contextActivities.parent && null === a.context.contextActivities.parent && (a.context.contextActivities.parent = this.context.contextActivities.parent), null !== this.context.contextActivities.other && null === a.context.contextActivities.other && (a.context.contextActivities.other = this.context.contextActivities.other))))), a;
    },
    sendStatement: function sendStatement(a, b) {
      this.log("sendStatement");
      var c,
          d,
          e,
          f = this,
          g = this.prepareStatement(a),
          h = this.recordStores.length,
          i = [],
          j = [];
      if (h > 0) for ("function" == typeof b && (e = function e(a, c) {
        var d;
        f.log("sendStatement - callbackWrapper: " + h), h > 1 ? (h -= 1, j.push({
          err: a,
          xhr: c
        })) : 1 === h ? (j.push({
          err: a,
          xhr: c
        }), d = [j, g], b.apply(this, d)) : f.log("sendStatement - unexpected record store count: " + h);
      }), d = 0; d < h; d += 1) {
        c = this.recordStores[d], i.push(c.saveStatement(g, {
          callback: e
        }));
      } else this.log("[warning] sendStatement: No LRSs added yet (statement not sent)"), "function" == typeof b && b.apply(this, [null, g]);
      return {
        statement: g,
        results: i
      };
    },
    getStatement: function getStatement(a, b, c) {
      this.log("getStatement");
      var d;
      return c = c || {}, c.params = c.params || {}, this.recordStores.length > 0 ? (d = this.recordStores[0], d.retrieveStatement(a, {
        callback: b,
        params: c.params
      })) : void this.log("[warning] getStatement: No LRSs added yet (statement not retrieved)");
    },
    voidStatement: function voidStatement(a, b, c) {
      this.log("voidStatement");
      var d,
          e,
          f,
          g,
          h,
          i = this,
          j = this.recordStores.length,
          k = [],
          l = [];
      if (a instanceof TinCan$1.Statement && (a = a.id), "undefined" != typeof c.actor ? e = c.actor : null !== this.actor && (e = this.actor), f = new TinCan$1.Statement({
        actor: e,
        verb: {
          id: "http://adlnet.gov/expapi/verbs/voided"
        },
        target: {
          objectType: "StatementRef",
          id: a
        }
      }), j > 0) for ("function" == typeof b && (h = function h(a, c) {
        var d;
        i.log("voidStatement - callbackWrapper: " + j), j > 1 ? (j -= 1, l.push({
          err: a,
          xhr: c
        })) : 1 === j ? (l.push({
          err: a,
          xhr: c
        }), d = [l, f], b.apply(this, d)) : i.log("voidStatement - unexpected record store count: " + j);
      }), g = 0; g < j; g += 1) {
        d = this.recordStores[g], k.push(d.saveStatement(f, {
          callback: h
        }));
      } else this.log("[warning] voidStatement: No LRSs added yet (statement not sent)"), "function" == typeof b && b.apply(this, [null, f]);
      return {
        statement: f,
        results: k
      };
    },
    getVoidedStatement: function getVoidedStatement(a, b) {
      this.log("getVoidedStatement");
      var c;
      return this.recordStores.length > 0 ? (c = this.recordStores[0], c.retrieveVoidedStatement(a, {
        callback: b
      })) : void this.log("[warning] getVoidedStatement: No LRSs added yet (statement not retrieved)");
    },
    sendStatements: function sendStatements(a, b) {
      this.log("sendStatements");
      var c,
          d,
          e,
          f = this,
          g = [],
          h = this.recordStores.length,
          i = [],
          j = [];
      if (0 === a.length) "function" == typeof b && b.apply(this, [null, g]);else {
        for (d = 0; d < a.length; d += 1) {
          g.push(this.prepareStatement(a[d]));
        }

        if (h > 0) for ("function" == typeof b && (e = function e(a, c) {
          var d;
          f.log("sendStatements - callbackWrapper: " + h), h > 1 ? (h -= 1, j.push({
            err: a,
            xhr: c
          })) : 1 === h ? (j.push({
            err: a,
            xhr: c
          }), d = [j, g], b.apply(this, d)) : f.log("sendStatements - unexpected record store count: " + h);
        }), d = 0; d < h; d += 1) {
          c = this.recordStores[d], i.push(c.saveStatements(g, {
            callback: e
          }));
        } else this.log("[warning] sendStatements: No LRSs added yet (statements not sent)"), "function" == typeof b && b.apply(this, [null, g]);
      }
      return {
        statements: g,
        results: i
      };
    },
    getStatements: function getStatements(a) {
      this.log("getStatements");
      var b,
          c,
          d = {};
      return this.recordStores.length > 0 ? (b = this.recordStores[0], a = a || {}, c = a.params || {}, a.sendActor && null !== this.actor && ("0.9" === b.version || "0.95" === b.version ? c.actor = this.actor : c.agent = this.actor), a.sendActivity && null !== this.activity && ("0.9" === b.version || "0.95" === b.version ? c.target = this.activity : c.activity = this.activity), "undefined" == typeof c.registration && null !== this.registration && (c.registration = this.registration), d = {
        params: c
      }, "undefined" != typeof a.callback && (d.callback = a.callback), b.queryStatements(d)) : void this.log("[warning] getStatements: No LRSs added yet (statements not read)");
    },
    getState: function getState(a, b) {
      this.log("getState");
      var c, d;
      return this.recordStores.length > 0 ? (d = this.recordStores[0], b = b || {}, c = {
        agent: "undefined" != typeof b.agent ? b.agent : this.actor,
        activity: "undefined" != typeof b.activity ? b.activity : this.activity
      }, "undefined" != typeof b.registration ? c.registration = b.registration : null !== this.registration && (c.registration = this.registration), "undefined" != typeof b.callback && (c.callback = b.callback), d.retrieveState(a, c)) : void this.log("[warning] getState: No LRSs added yet (state not retrieved)");
    },
    setState: function setState(a, b, c) {
      this.log("setState");
      var d, e;
      return this.recordStores.length > 0 ? (e = this.recordStores[0], c = c || {}, d = {
        agent: "undefined" != typeof c.agent ? c.agent : this.actor,
        activity: "undefined" != typeof c.activity ? c.activity : this.activity
      }, "undefined" != typeof c.registration ? d.registration = c.registration : null !== this.registration && (d.registration = this.registration), "undefined" != typeof c.lastSHA1 && (d.lastSHA1 = c.lastSHA1), "undefined" != typeof c.contentType && (d.contentType = c.contentType, "undefined" != typeof c.overwriteJSON && !c.overwriteJSON && TinCan$1.Utils.isApplicationJSON(c.contentType) && (d.method = "POST")), "undefined" != typeof c.callback && (d.callback = c.callback), e.saveState(a, b, d)) : void this.log("[warning] setState: No LRSs added yet (state not saved)");
    },
    deleteState: function deleteState(a, b) {
      this.log("deleteState");
      var c, d;
      return this.recordStores.length > 0 ? (d = this.recordStores[0], b = b || {}, c = {
        agent: "undefined" != typeof b.agent ? b.agent : this.actor,
        activity: "undefined" != typeof b.activity ? b.activity : this.activity
      }, "undefined" != typeof b.registration ? c.registration = b.registration : null !== this.registration && (c.registration = this.registration), "undefined" != typeof b.callback && (c.callback = b.callback), d.dropState(a, c)) : void this.log("[warning] deleteState: No LRSs added yet (state not deleted)");
    },
    getActivityProfile: function getActivityProfile(a, b) {
      this.log("getActivityProfile");
      var c, d;
      return this.recordStores.length > 0 ? (d = this.recordStores[0], b = b || {}, c = {
        activity: "undefined" != typeof b.activity ? b.activity : this.activity
      }, "undefined" != typeof b.callback && (c.callback = b.callback), d.retrieveActivityProfile(a, c)) : void this.log("[warning] getActivityProfile: No LRSs added yet (activity profile not retrieved)");
    },
    setActivityProfile: function setActivityProfile(a, b, c) {
      this.log("setActivityProfile");
      var d, e;
      return this.recordStores.length > 0 ? (e = this.recordStores[0], c = c || {}, d = {
        activity: "undefined" != typeof c.activity ? c.activity : this.activity
      }, "undefined" != typeof c.callback && (d.callback = c.callback), "undefined" != typeof c.lastSHA1 && (d.lastSHA1 = c.lastSHA1), "undefined" != typeof c.contentType && (d.contentType = c.contentType, "undefined" != typeof c.overwriteJSON && !c.overwriteJSON && TinCan$1.Utils.isApplicationJSON(c.contentType) && (d.method = "POST")), e.saveActivityProfile(a, b, d)) : void this.log("[warning] setActivityProfile: No LRSs added yet (activity profile not saved)");
    },
    deleteActivityProfile: function deleteActivityProfile(a, b) {
      this.log("deleteActivityProfile");
      var c, d;
      return this.recordStores.length > 0 ? (d = this.recordStores[0], b = b || {}, c = {
        activity: "undefined" != typeof b.activity ? b.activity : this.activity
      }, "undefined" != typeof b.callback && (c.callback = b.callback), d.dropActivityProfile(a, c)) : void this.log("[warning] deleteActivityProfile: No LRSs added yet (activity profile not deleted)");
    },
    getAgentProfile: function getAgentProfile(a, b) {
      this.log("getAgentProfile");
      var c, d;
      return this.recordStores.length > 0 ? (d = this.recordStores[0], b = b || {}, c = {
        agent: "undefined" != typeof b.agent ? b.agent : this.actor
      }, "undefined" != typeof b.callback && (c.callback = b.callback), d.retrieveAgentProfile(a, c)) : void this.log("[warning] getAgentProfile: No LRSs added yet (agent profile not retrieved)");
    },
    setAgentProfile: function setAgentProfile(a, b, c) {
      this.log("setAgentProfile");
      var d, e;
      return this.recordStores.length > 0 ? (e = this.recordStores[0], c = c || {}, d = {
        agent: "undefined" != typeof c.agent ? c.agent : this.actor
      }, "undefined" != typeof c.callback && (d.callback = c.callback), "undefined" != typeof c.lastSHA1 && (d.lastSHA1 = c.lastSHA1), "undefined" != typeof c.contentType && (d.contentType = c.contentType, "undefined" != typeof c.overwriteJSON && !c.overwriteJSON && TinCan$1.Utils.isApplicationJSON(c.contentType) && (d.method = "POST")), e.saveAgentProfile(a, b, d)) : void this.log("[warning] setAgentProfile: No LRSs added yet (agent profile not saved)");
    },
    deleteAgentProfile: function deleteAgentProfile(a, b) {
      this.log("deleteAgentProfile");
      var c, d;
      return this.recordStores.length > 0 ? (d = this.recordStores[0], b = b || {}, c = {
        agent: "undefined" != typeof b.agent ? b.agent : this.actor
      }, "undefined" != typeof b.callback && (c.callback = b.callback), d.dropAgentProfile(a, c)) : void this.log("[warning] deleteAgentProfile: No LRSs added yet (agent profile not deleted)");
    }
  }, TinCan$1.DEBUG = !1, TinCan$1.enableDebug = function () {
    TinCan$1.DEBUG = !0;
  }, TinCan$1.disableDebug = function () {
    TinCan$1.DEBUG = !1;
  }, TinCan$1.versions = function () {
    return ["1.0.2", "1.0.1", "1.0.0", "0.95", "0.9"];
  }, "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && (module.exports = TinCan$1);
}(), function () {

  TinCan$1.Utils = {
    defaultEncoding: "utf8",
    getUUID: function getUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
        var b = 16 * Math.random() | 0,
            c = "x" == a ? b : 3 & b | 8;
        return c.toString(16);
      });
    },
    getISODateString: function getISODateString(a) {
      function b(a, b) {
        var c, d;

        for ("undefined" != typeof a && null !== a || (a = 0), "undefined" != typeof b && null !== b || (b = 2), c = Math.pow(10, b - 1), d = a.toString(); a < c && c > 1;) {
          d = "0" + d, c /= 10;
        }

        return d;
      }

      return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds()) + "." + b(a.getUTCMilliseconds(), 3) + "Z";
    },
    convertISO8601DurationToMilliseconds: function convertISO8601DurationToMilliseconds(a) {
      var b,
          c,
          d,
          e,
          f = a.indexOf("-") >= 0,
          g = a.indexOf("T"),
          h = a.indexOf("H"),
          i = a.indexOf("M"),
          j = a.indexOf("S");
      if (g === -1 || i !== -1 && i < g || a.indexOf("D") !== -1 || a.indexOf("Y") !== -1) throw new Error("ISO 8601 timestamps including years, months and/or days are not currently supported");
      return h === -1 ? (h = g, b = 0) : b = parseInt(a.slice(g + 1, h), 10), i === -1 ? (i = g, c = 0) : c = parseInt(a.slice(h + 1, i), 10), d = parseFloat(a.slice(i + 1, j)), e = parseInt(1e3 * (60 * (60 * b + c) + d), 10), isNaN(e) && (e = 0), f && (e *= -1), e;
    },
    convertMillisecondsToISO8601Duration: function convertMillisecondsToISO8601Duration(a) {
      var b,
          c,
          d,
          e,
          f = parseInt(a, 10),
          g = "",
          h = "";
      return e = Math.round(f / 10), e < 0 && (g = "-", e *= -1), b = parseInt(e / 36e4, 10), c = parseInt(e % 36e4 / 6e3, 10), d = e % 36e4 % 6e3 / 100, h = g + "PT", b > 0 && (h += b + "H"), c > 0 && (h += c + "M"), h += d + "S";
    },
    getSHA1String: function getSHA1String(a) {
      return CryptoJS.SHA1(a).toString(CryptoJS.enc.Hex);
    },
    getSHA256String: function getSHA256String(a) {
      return "[object ArrayBuffer]" === Object.prototype.toString.call(a) && (a = CryptoJS.lib.WordArray.create(a)), CryptoJS.SHA256(a).toString(CryptoJS.enc.Hex);
    },
    getBase64String: function getBase64String(a) {
      return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Latin1.parse(a));
    },
    getLangDictionaryValue: function getLangDictionaryValue(a, b) {
      var c,
          d = this[a];
      if ("undefined" != typeof b && "undefined" != typeof d[b]) return d[b];
      if ("undefined" != typeof d.und) return d.und;
      if ("undefined" != typeof d["en-US"]) return d["en-US"];

      for (c in d) {
        if (d.hasOwnProperty(c)) return d[c];
      }

      return "";
    },
    parseURL: function parseURL(a, b) {
      var c,
          d,
          e,
          f,
          g = "/" === a.charAt(0),
          h = ["(/[^?#]*)", "(\\?[^#]*|)", "(#.*|)$"],
          i = /\+/g,
          j = /([^&=]+)=?([^&]*)/g,
          k = function k(a) {
        return decodeURIComponent(a.replace(i, " "));
      };

      if (b = b || {}, g) {
        if ("undefined" == typeof b.allowRelative || !b.allowRelative) throw new Error("Refusing to parse relative URL without 'allowRelative' option");
      } else h.unshift("^(https?:)//", "(([^:/?#]*)(?::([0-9]+))?)"), a.indexOf("/", 8) === -1 && (a += "/");

      if (c = new RegExp(h.join("")), d = a.match(c), null === d) throw new Error("Unable to parse URL regular expression did not match: '" + a + "'");
      if (g ? (e = {
        protocol: null,
        host: null,
        hostname: null,
        port: null,
        path: null,
        pathname: d[1],
        search: d[2],
        hash: d[3],
        params: {}
      }, e.path = e.pathname) : (e = {
        protocol: d[1],
        host: d[2],
        hostname: d[3],
        port: d[4],
        pathname: d[5],
        search: d[6],
        hash: d[7],
        params: {}
      }, e.path = e.protocol + "//" + e.host + e.pathname), "" !== e.search) for (; f = j.exec(e.search.substring(1));) {
        e.params[k(f[1])] = k(f[2]);
      }
      return e;
    },
    getServerRoot: function getServerRoot(a) {
      var b = a.split("/");
      return b[0] + "//" + b[2];
    },
    getContentTypeFromHeader: function getContentTypeFromHeader(a) {
      return String(a).split(";")[0];
    },
    isApplicationJSON: function isApplicationJSON(a) {
      return 0 === TinCan$1.Utils.getContentTypeFromHeader(a).toLowerCase().indexOf("application/json");
    },
    stringToArrayBuffer: function stringToArrayBuffer() {
      TinCan$1.prototype.log("stringToArrayBuffer not overloaded - no environment loaded?");
    },
    stringFromArrayBuffer: function stringFromArrayBuffer() {
      TinCan$1.prototype.log("stringFromArrayBuffer not overloaded - no environment loaded?");
    }
  };
}(), function () {

  var a = TinCan$1.LRS = function (a) {
    this.log("constructor"), this.endpoint = null, this.version = null, this.auth = null, this.allowFail = !0, this.extended = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "LRS",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = TinCan$1.versions(),
          d = !1;
      if (a = a || {}, a.hasOwnProperty("alertOnRequestFailure") && this.log("'alertOnRequestFailure' is deprecated (alerts have been removed) no need to set it now"), !a.hasOwnProperty("endpoint") || null === a.endpoint || "" === a.endpoint) throw this.log("[error] LRS invalid: no endpoint"), {
        code: 3,
        mesg: "LRS invalid: no endpoint"
      };

      if (this.endpoint = String(a.endpoint), "/" !== this.endpoint.slice(-1) && (this.log("adding trailing slash to endpoint"), this.endpoint += "/"), a.hasOwnProperty("allowFail") && (this.allowFail = a.allowFail), a.hasOwnProperty("auth") ? this.auth = a.auth : a.hasOwnProperty("username") && a.hasOwnProperty("password") && (this.auth = "Basic " + TinCan$1.Utils.getBase64String(a.username + ":" + a.password)), a.hasOwnProperty("extended") && (this.extended = a.extended), this._initByEnvironment(a), "undefined" != typeof a.version) {
        for (this.log("version: " + a.version), b = 0; b < c.length; b += 1) {
          if (c[b] === a.version) {
            d = !0;
            break;
          }
        }

        if (!d) throw this.log("[error] LRS invalid: version not supported (" + a.version + ")"), {
          code: 5,
          mesg: "LRS invalid: version not supported (" + a.version + ")"
        };
        this.version = a.version;
      } else this.version = c[0];
    },
    _getBoundary: function _getBoundary() {
      return TinCan$1.Utils.getUUID().replace(/-/g, "");
    },
    _initByEnvironment: function _initByEnvironment() {
      this.log("_initByEnvironment not overloaded - no environment loaded?");
    },
    _makeRequest: function _makeRequest() {
      this.log("_makeRequest not overloaded - no environment loaded?");
    },
    _getMultipartRequestData: function _getMultipartRequestData() {
      this.log("_getMultipartRequestData not overloaded - no environment loaded?");
    },
    _IEModeConversion: function _IEModeConversion() {
      this.log("_IEModeConversion not overloaded - browser environment not loaded.");
    },
    _processGetStatementResult: function _processGetStatementResult(a, b) {
      var c,
          d,
          e,
          f,
          g = {};
      if (!b.attachments) return TinCan$1.Statement.fromJSON(a.responseText);

      for (c = a.getResponseHeader("Content-Type").split("boundary=")[1], d = this._parseMultipart(c, a.response), e = JSON.parse(d[0].body), f = 1; f < d.length; f += 1) {
        g[d[f].headers["X-Experience-API-Hash"]] = d[f].body;
      }

      return this._assignAttachmentContent([e], g), new TinCan$1.Statement(e);
    },
    sendRequest: function sendRequest(a) {
      this.log("sendRequest");
      var b,
          c = this.endpoint + a.url,
          d = {};

      if (0 === a.url.indexOf("http") && (c = a.url), null !== this.extended) {
        a.params = a.params || {};

        for (b in this.extended) {
          this.extended.hasOwnProperty(b) && (a.params.hasOwnProperty(b) || null !== this.extended[b] && (a.params[b] = this.extended[b]));
        }
      }

      d.Authorization = this.auth, "0.9" !== this.version && (d["X-Experience-API-Version"] = this.version);

      for (b in a.headers) {
        a.headers.hasOwnProperty(b) && (d[b] = a.headers[b]);
      }

      return this._makeRequest(c, d, a);
    },
    about: function about(a) {
      this.log("about");
      var b, c, d;
      if (a = a || {}, b = {
        url: "about",
        method: "GET",
        params: {}
      }, "undefined" != typeof a.callback && (d = function d(b, c) {
        var d = c;
        null === b && (d = TinCan$1.About.fromJSON(c.responseText)), a.callback(b, d);
      }, b.callback = d), c = this.sendRequest(b), !d) return null === c.err && (c.xhr = TinCan$1.About.fromJSON(c.xhr.responseText)), c;
    },
    saveStatement: function saveStatement(a, b) {
      this.log("saveStatement");
      var c,
          d,
          e,
          f = {
        url: "statements",
        headers: {}
      },
          g = [];
      b = b || {};

      try {
        c = a.asVersion(this.version);
      } catch (a) {
        return this.allowFail ? (this.log("[warning] statement could not be serialized in version (" + this.version + "): " + a), "undefined" != typeof b.callback ? void b.callback(null, null) : {
          err: null,
          xhr: null
        }) : (this.log("[error] statement could not be serialized in version (" + this.version + "): " + a), "undefined" != typeof b.callback ? void b.callback(a, null) : {
          err: a,
          xhr: null
        });
      }

      if (c.hasOwnProperty("attachments") && a.hasAttachmentWithContent()) {
        for (d = this._getBoundary(), f.headers["Content-Type"] = "multipart/mixed; boundary=" + d, e = 0; e < a.attachments.length; e += 1) {
          null !== a.attachments[e].content && g.push(a.attachments[e]);
        }

        try {
          f.data = this._getMultipartRequestData(d, c, g);
        } catch (a) {
          return this.allowFail ? (this.log("[warning] multipart request data could not be created (attachments probably not supported): " + a), "undefined" != typeof b.callback ? void b.callback(null, null) : {
            err: null,
            xhr: null
          }) : (this.log("[error] multipart request data could not be created (attachments probably not supported): " + a), "undefined" != typeof b.callback ? void b.callback(a, null) : {
            err: a,
            xhr: null
          });
        }
      } else f.headers["Content-Type"] = "application/json", f.data = JSON.stringify(c);

      return null !== a.id ? (f.method = "PUT", f.params = {
        statementId: a.id
      }) : f.method = "POST", "undefined" != typeof b.callback && (f.callback = b.callback), this.sendRequest(f);
    },
    retrieveStatement: function retrieveStatement(a, b) {
      this.log("retrieveStatement");
      var c,
          d,
          e,
          f = this;
      return b = b || {}, b.params = b.params || {}, c = {
        url: "statements",
        method: "GET",
        params: {
          statementId: a
        }
      }, b.params.attachments && (c.params.attachments = !0, c.expectMultipart = !0), "undefined" != typeof b.callback && (e = function e(a, c) {
        var d = c;
        null === a && (d = f._processGetStatementResult(c, b.params)), b.callback(a, d);
      }, c.callback = e), d = this.sendRequest(c), e || (d.statement = null, null === d.err && (d.statement = f._processGetStatementResult(d.xhr, b.params))), d;
    },
    retrieveVoidedStatement: function retrieveVoidedStatement(a, b) {
      this.log("retrieveVoidedStatement");
      var c,
          d,
          e,
          f = this;
      return b = b || {}, b.params = b.params || {}, c = {
        url: "statements",
        method: "GET",
        params: {}
      }, "0.9" === this.version || "0.95" === this.version ? c.params.statementId = a : (c.params.voidedStatementId = a, b.params.attachments && (c.params.attachments = !0, c.expectMultipart = !0)), "undefined" != typeof b.callback && (e = function e(a, c) {
        var d = c;
        null === a && (d = f._processGetStatementResult(c, b.params)), b.callback(a, d);
      }, c.callback = e), d = this.sendRequest(c), e || (d.statement = null, null === d.err && (d.statement = f._processGetStatementResult(d.xhr, b.params))), d;
    },
    saveStatements: function saveStatements(a, b) {
      this.log("saveStatements");
      var c,
          d,
          e,
          f,
          g = {
        url: "statements",
        method: "POST",
        headers: {}
      },
          h = [],
          i = [];
      if (b = b || {}, 0 === a.length) return "undefined" != typeof b.callback ? void b.callback(new Error("no statements"), null) : {
        err: new Error("no statements"),
        xhr: null
      };

      for (e = 0; e < a.length; e += 1) {
        try {
          c = a[e].asVersion(this.version);
        } catch (a) {
          return this.allowFail ? (this.log("[warning] statement could not be serialized in version (" + this.version + "): " + a), "undefined" != typeof b.callback ? void b.callback(null, null) : {
            err: null,
            xhr: null
          }) : (this.log("[error] statement could not be serialized in version (" + this.version + "): " + a), "undefined" != typeof b.callback ? void b.callback(a, null) : {
            err: a,
            xhr: null
          });
        }

        if (a[e].hasAttachmentWithContent()) for (f = 0; f < a[e].attachments.length; f += 1) {
          null !== a[e].attachments[f].content && i.push(a[e].attachments[f]);
        }
        h.push(c);
      }

      if (0 !== i.length) {
        d = this._getBoundary(), g.headers["Content-Type"] = "multipart/mixed; boundary=" + d;

        try {
          g.data = this._getMultipartRequestData(d, h, i);
        } catch (a) {
          return this.allowFail ? (this.log("[warning] multipart request data could not be created (attachments probably not supported): " + a), "undefined" != typeof b.callback ? void b.callback(null, null) : {
            err: null,
            xhr: null
          }) : (this.log("[error] multipart request data could not be created (attachments probably not supported): " + a), "undefined" != typeof b.callback ? void b.callback(a, null) : {
            err: a,
            xhr: null
          });
        }
      } else g.headers["Content-Type"] = "application/json", g.data = JSON.stringify(h);

      return "undefined" != typeof b.callback && (g.callback = b.callback), this.sendRequest(g);
    },
    queryStatements: function queryStatements(a) {
      this.log("queryStatements");
      var b,
          c,
          d,
          e = this;
      a = a || {}, a.params = a.params || {};

      try {
        b = this._queryStatementsRequestCfg(a), a.params.attachments && (b.expectMultipart = !0);
      } catch (b) {
        return this.log("[error] Query statements failed - " + b), "undefined" != typeof a.callback && a.callback(b, {}), {
          err: b,
          statementsResult: null
        };
      }

      return "undefined" != typeof a.callback && (d = function d(b, c) {
        var d,
            f,
            g,
            h,
            i = c,
            j = {};
        if (null === b) if (a.params.attachments) {
          for (f = c.getResponseHeader("Content-Type").split("boundary=")[1], d = e._parseMultipart(f, c.response), g = JSON.parse(d[0].body), h = 1; h < d.length; h += 1) {
            j[d[h].headers["X-Experience-API-Hash"]] = d[h].body;
          }

          for (e._assignAttachmentContent(g.statements, j), i = new TinCan$1.StatementsResult({
            statements: g.statements
          }), h = 0; h < i.statements.length; h += 1) {
            i.statements[h] instanceof TinCan$1.Statement || (i.statements[h] = new TinCan$1.Statement(i.statements[h]));
          }
        } else i = TinCan$1.StatementsResult.fromJSON(c.responseText);
        a.callback(b, i);
      }, b.callback = d), c = this.sendRequest(b), c.config = b, d || (c.statementsResult = null, null === c.err && (c.statementsResult = TinCan$1.StatementsResult.fromJSON(c.xhr.responseText))), c;
    },
    _queryStatementsRequestCfg: function _queryStatementsRequestCfg(a) {
      this.log("_queryStatementsRequestCfg");
      var b,
          c,
          d = {},
          e = {
        url: "statements",
        method: "GET",
        params: d
      },
          f = ["agent", "actor", "object", "instructor"],
          g = ["verb", "activity"],
          h = ["registration", "context", "since", "until", "limit", "authoritative", "sparse", "ascending", "related_activities", "related_agents", "format", "attachments"],
          i = {
        verb: !0,
        registration: !0,
        since: !0,
        until: !0,
        limit: !0,
        ascending: !0
      },
          j = {
        .9: {
          supported: {
            actor: !0,
            instructor: !0,
            target: !0,
            object: !0,
            context: !0,
            authoritative: !0,
            sparse: !0
          }
        },
        "1.0.0": {
          supported: {
            agent: !0,
            activity: !0,
            related_activities: !0,
            related_agents: !0,
            format: !0,
            attachments: !0
          }
        }
      };
      j[.95] = j[.9], j["1.0.1"] = j["1.0.0"], j["1.0.2"] = j["1.0.0"], a.params.hasOwnProperty("target") && (a.params.object = a.params.target);

      for (c in a.params) {
        if (a.params.hasOwnProperty(c) && "undefined" == typeof i[c] && "undefined" == typeof j[this.version].supported[c]) throw "Unrecognized query parameter configured: " + c;
      }

      for (b = 0; b < f.length; b += 1) {
        "undefined" != typeof a.params[f[b]] && (d[f[b]] = JSON.stringify(a.params[f[b]].asVersion(this.version)));
      }

      for (b = 0; b < g.length; b += 1) {
        "undefined" != typeof a.params[g[b]] && ("undefined" == typeof a.params[g[b]].id ? d[g[b]] = a.params[g[b]] : d[g[b]] = a.params[g[b]].id);
      }

      for (b = 0; b < h.length; b += 1) {
        "undefined" != typeof a.params[h[b]] && null !== a.params[h[b]] && (d[h[b]] = a.params[h[b]]);
      }

      return e;
    },
    _assignAttachmentContent: function _assignAttachmentContent(a, b) {
      var c, d;

      for (c = 0; c < a.length; c += 1) {
        if (a[c].hasOwnProperty("attachments") && null !== a[c].attachments) for (d = 0; d < a[c].attachments.length; d += 1) {
          b.hasOwnProperty(a[c].attachments[d].sha2) && (a[c].attachments[d].content = b[a[c].attachments[d].sha2]);
        }
      }
    },
    _parseMultipart: function _parseMultipart(a, b) {
      var c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n = "--" + a,
          o = [],
          p = 2;

      for (c = new Uint8Array(b), d = this.__uint8ToString(c), e = d.indexOf(n + "--"), f = d.indexOf(n); f !== -1;) {
        g = d.indexOf(n, f + n.length), h = f + n.length + p, i = d.indexOf("\r\n\r\n", f), j = i + p + p, k = g - 2, l = this._parseHeaders(this.__uint8ToString(new Uint8Array(b.slice(h, i)))), m = b.slice(j, k), 0 === o.length && (m = TinCan$1.Utils.stringFromArrayBuffer(m)), o.push({
          headers: l,
          body: m
        }), f = g === e ? -1 : g;
      }

      return o;
    },
    __uint8ToString: function __uint8ToString(a) {
      var b,
          c = "",
          d = a.byteLength;

      for (b = 0; b < d; b += 1) {
        c += String.fromCharCode(a[b]);
      }

      return c;
    },
    _parseHeaders: function _parseHeaders(a) {
      var b,
          c,
          d,
          e,
          f = {};

      for (b = a.split("\n"), e = 0; e < b.length; e += 1) {
        d = b[e].split(":", 2), null !== d[1] ? (f[d[0]] = d[1].replace(/^\s+|\s+$/g, ""), c = d[0]) : "\t" === d[0].substring(0, 1) && (f[d[0]] = d[1].replace(/^\s+|\s+$/g, ""));
      }

      return f;
    },
    moreStatements: function moreStatements(a) {
      this.log("moreStatements: " + a.url);
      var b, c, d, e, f;
      return a = a || {}, e = TinCan$1.Utils.parseURL(a.url, {
        allowRelative: !0
      }), f = TinCan$1.Utils.getServerRoot(this.endpoint), 0 === e.path.indexOf("/statements") && (e.path = this.endpoint.replace(f, "") + e.path, this.log("converting non-standard more URL to " + e.path)), 0 !== e.path.indexOf("/") && (e.path = "/" + e.path), b = {
        method: "GET",
        url: f + e.path,
        params: e.params
      }, "undefined" != typeof a.callback && (d = function d(b, c) {
        var d = c;
        null === b && (d = TinCan$1.StatementsResult.fromJSON(c.responseText)), a.callback(b, d);
      }, b.callback = d), c = this.sendRequest(b), c.config = b, d || (c.statementsResult = null, null === c.err && (c.statementsResult = TinCan$1.StatementsResult.fromJSON(c.xhr.responseText))), c;
    },
    retrieveState: function retrieveState(a, b) {
      this.log("retrieveState");
      var c,
          d,
          e,
          f = {},
          g = {},
          h = this;
      if (e = b.requestHeaders || {}, f = {
        stateId: a,
        activityId: b.activity.id
      }, "0.9" === this.version ? f.actor = JSON.stringify(b.agent.asVersion(this.version)) : f.agent = JSON.stringify(b.agent.asVersion(this.version)), "undefined" != typeof b.registration && null !== b.registration && ("0.9" === this.version ? f.registrationId = b.registration : f.registration = b.registration), g = {
        url: "activities/state",
        method: "GET",
        params: f,
        ignore404: !0,
        headers: e
      }, "undefined" != typeof b.callback && (d = function d(c, _d) {
        var e = _d;
        if (null === c) if (404 === _d.status) e = null;else if (e = new TinCan$1.State({
          id: a,
          contents: _d.responseText
        }), "undefined" != typeof _d.getResponseHeader && null !== _d.getResponseHeader("ETag") && "" !== _d.getResponseHeader("ETag") ? e.etag = _d.getResponseHeader("ETag") : e.etag = '"' + TinCan$1.Utils.getSHA1String(_d.responseText) + '"', "undefined" != typeof _d.contentType ? e.contentType = _d.contentType : "undefined" != typeof _d.getResponseHeader && null !== _d.getResponseHeader("Content-Type") && "" !== _d.getResponseHeader("Content-Type") && (e.contentType = _d.getResponseHeader("Content-Type")), TinCan$1.Utils.isApplicationJSON(e.contentType)) try {
          e.contents = JSON.parse(e.contents);
        } catch (a) {
          h.log("retrieveState - failed to deserialize JSON: " + a);
        }
        b.callback(c, e);
      }, g.callback = d), c = this.sendRequest(g), !d && (c.state = null, null === c.err && 404 !== c.xhr.status && (c.state = new TinCan$1.State({
        id: a,
        contents: c.xhr.responseText
      }), "undefined" != typeof c.xhr.getResponseHeader && null !== c.xhr.getResponseHeader("ETag") && "" !== c.xhr.getResponseHeader("ETag") ? c.state.etag = c.xhr.getResponseHeader("ETag") : c.state.etag = '"' + TinCan$1.Utils.getSHA1String(c.xhr.responseText) + '"', "undefined" != typeof c.xhr.contentType ? c.state.contentType = c.xhr.contentType : "undefined" != typeof c.xhr.getResponseHeader && null !== c.xhr.getResponseHeader("Content-Type") && "" !== c.xhr.getResponseHeader("Content-Type") && (c.state.contentType = c.xhr.getResponseHeader("Content-Type")), TinCan$1.Utils.isApplicationJSON(c.state.contentType)))) try {
        c.state.contents = JSON.parse(c.state.contents);
      } catch (a) {
        this.log("retrieveState - failed to deserialize JSON: " + a);
      }
      return c;
    },
    retrieveStateIds: function retrieveStateIds(a) {
      this.log("retrieveStateIds");
      var b,
          c,
          d,
          e,
          f = {};

      if (a = a || {}, c = a.requestHeaders || {}, f.activityId = a.activity.id, "0.9" === this.version ? f.actor = JSON.stringify(a.agent.asVersion(this.version)) : f.agent = JSON.stringify(a.agent.asVersion(this.version)), "undefined" != typeof a.registration && null !== a.registration && ("0.9" === this.version ? f.registrationId = a.registration : f.registration = a.registration), b = {
        url: "activities/state",
        method: "GET",
        params: f,
        headers: c,
        ignore404: !0
      }, "undefined" != typeof a.callback && (e = function e(b, c) {
        var d = c;
        if (null !== b) return void a.callback(b, d);
        if (404 === c.status) d = [];else try {
          d = JSON.parse(c.responseText);
        } catch (a) {
          b = "Response JSON parse error: " + a;
        }
        a.callback(b, d);
      }, b.callback = e), "undefined" != typeof a.since && (b.params.since = a.since), d = this.sendRequest(b), !e) {
        if (d.profileIds = null, null !== d.err) return d;
        if (404 === d.xhr.status) d.profileIds = [];else try {
          d.profileIds = JSON.parse(d.xhr.responseText);
        } catch (a) {
          d.err = "retrieveStateIds - JSON parse error: " + a;
        }
      }

      return d;
    },
    saveState: function saveState(a, b, c) {
      this.log("saveState");
      var d, e, f;
      return f = c.requestHeaders || {}, "undefined" == typeof c.contentType && (c.contentType = "application/octet-stream"), f["Content-Type"] = c.contentType, "object" == _typeof(b) && TinCan$1.Utils.isApplicationJSON(c.contentType) && (b = JSON.stringify(b)), "undefined" != typeof c.method && "POST" === c.method || (c.method = "PUT"), d = {
        stateId: a,
        activityId: c.activity.id
      }, "0.9" === this.version ? d.actor = JSON.stringify(c.agent.asVersion(this.version)) : d.agent = JSON.stringify(c.agent.asVersion(this.version)), "undefined" != typeof c.registration && null !== c.registration && ("0.9" === this.version ? d.registrationId = c.registration : d.registration = c.registration), e = {
        url: "activities/state",
        method: c.method,
        params: d,
        data: b,
        headers: f
      }, "undefined" != typeof c.callback && (e.callback = c.callback), "undefined" != typeof c.lastSHA1 && null !== c.lastSHA1 && (e.headers["If-Match"] = c.lastSHA1), this.sendRequest(e);
    },
    dropState: function dropState(a, b) {
      this.log("dropState");
      var c, d, e;
      return e = b.requestHeaders || {}, c = {
        activityId: b.activity.id
      }, "0.9" === this.version ? c.actor = JSON.stringify(b.agent.asVersion(this.version)) : c.agent = JSON.stringify(b.agent.asVersion(this.version)), null !== a && (c.stateId = a), "undefined" != typeof b.registration && null !== b.registration && ("0.9" === this.version ? c.registrationId = b.registration : c.registration = b.registration), d = {
        url: "activities/state",
        method: "DELETE",
        params: c,
        headers: e
      }, "undefined" != typeof b.callback && (d.callback = b.callback), this.sendRequest(d);
    },
    retrieveActivity: function retrieveActivity(a, b) {
      this.log("retrieveActivity");
      var c,
          d,
          e,
          f = {};
      return e = b.requestHeaders || {}, f = {
        url: "activities",
        method: "GET",
        params: {
          activityId: a
        },
        ignore404: !0,
        headers: e
      }, "undefined" != typeof b.callback && (d = function d(c, _d2) {
        var e = _d2;
        null === c && (e = 404 === _d2.status ? new TinCan$1.Activity({
          id: a
        }) : TinCan$1.Activity.fromJSON(_d2.responseText)), b.callback(c, e);
      }, f.callback = d), c = this.sendRequest(f), d || (c.activity = null, null === c.err && (404 === c.xhr.status ? c.activity = new TinCan$1.Activity({
        id: a
      }) : c.activity = TinCan$1.Activity.fromJSON(c.xhr.responseText))), c;
    },
    retrieveActivityProfile: function retrieveActivityProfile(a, b) {
      this.log("retrieveActivityProfile");
      var c,
          d,
          e,
          f = {},
          g = this;
      if (e = b.requestHeaders || {}, f = {
        url: "activities/profile",
        method: "GET",
        params: {
          profileId: a,
          activityId: b.activity.id
        },
        ignore404: !0,
        headers: e
      }, "undefined" != typeof b.callback && (d = function d(c, _d3) {
        var e = _d3;
        if (null === c) if (404 === _d3.status) e = null;else if (e = new TinCan$1.ActivityProfile({
          id: a,
          activity: b.activity,
          contents: _d3.responseText
        }), "undefined" != typeof _d3.getResponseHeader && null !== _d3.getResponseHeader("ETag") && "" !== _d3.getResponseHeader("ETag") ? e.etag = _d3.getResponseHeader("ETag") : e.etag = '"' + TinCan$1.Utils.getSHA1String(_d3.responseText) + '"', "undefined" != typeof _d3.contentType ? e.contentType = _d3.contentType : "undefined" != typeof _d3.getResponseHeader && null !== _d3.getResponseHeader("Content-Type") && "" !== _d3.getResponseHeader("Content-Type") && (e.contentType = _d3.getResponseHeader("Content-Type")), TinCan$1.Utils.isApplicationJSON(e.contentType)) try {
          e.contents = JSON.parse(e.contents);
        } catch (a) {
          g.log("retrieveActivityProfile - failed to deserialize JSON: " + a);
        }
        b.callback(c, e);
      }, f.callback = d), c = this.sendRequest(f), !d && (c.profile = null, null === c.err && 404 !== c.xhr.status && (c.profile = new TinCan$1.ActivityProfile({
        id: a,
        activity: b.activity,
        contents: c.xhr.responseText
      }), "undefined" != typeof c.xhr.getResponseHeader && null !== c.xhr.getResponseHeader("ETag") && "" !== c.xhr.getResponseHeader("ETag") ? c.profile.etag = c.xhr.getResponseHeader("ETag") : c.profile.etag = '"' + TinCan$1.Utils.getSHA1String(c.xhr.responseText) + '"', "undefined" != typeof c.xhr.contentType ? c.profile.contentType = c.xhr.contentType : "undefined" != typeof c.xhr.getResponseHeader && null !== c.xhr.getResponseHeader("Content-Type") && "" !== c.xhr.getResponseHeader("Content-Type") && (c.profile.contentType = c.xhr.getResponseHeader("Content-Type")), TinCan$1.Utils.isApplicationJSON(c.profile.contentType)))) try {
        c.profile.contents = JSON.parse(c.profile.contents);
      } catch (a) {
        this.log("retrieveActivityProfile - failed to deserialize JSON: " + a);
      }
      return c;
    },
    retrieveActivityProfileIds: function retrieveActivityProfileIds(a) {
      this.log("retrieveActivityProfileIds");
      var b, c, d, e;

      if (a = a || {}, c = a.requestHeaders || {}, b = {
        url: "activities/profile",
        method: "GET",
        params: {
          activityId: a.activity.id
        },
        headers: c,
        ignore404: !0
      }, "undefined" != typeof a.callback && (e = function e(b, c) {
        var d = c;
        if (null !== b) return void a.callback(b, d);
        if (404 === c.status) d = [];else try {
          d = JSON.parse(c.responseText);
        } catch (a) {
          b = "Response JSON parse error: " + a;
        }
        a.callback(b, d);
      }, b.callback = e), "undefined" != typeof a.since && (b.params.since = a.since), d = this.sendRequest(b), !e) {
        if (d.profileIds = null, null !== d.err) return d;
        if (404 === d.xhr.status) d.profileIds = [];else try {
          d.profileIds = JSON.parse(d.xhr.responseText);
        } catch (a) {
          d.err = "retrieveActivityProfileIds - JSON parse error: " + a;
        }
      }

      return d;
    },
    saveActivityProfile: function saveActivityProfile(a, b, c) {
      this.log("saveActivityProfile");
      var d, e;
      return e = c.requestHeaders || {}, "undefined" == typeof c.contentType && (c.contentType = "application/octet-stream"), e["Content-Type"] = c.contentType, "undefined" != typeof c.method && "POST" === c.method || (c.method = "PUT"), "object" == _typeof(b) && TinCan$1.Utils.isApplicationJSON(c.contentType) && (b = JSON.stringify(b)), d = {
        url: "activities/profile",
        method: c.method,
        params: {
          profileId: a,
          activityId: c.activity.id
        },
        data: b,
        headers: e
      }, "undefined" != typeof c.callback && (d.callback = c.callback), "undefined" != typeof c.lastSHA1 && null !== c.lastSHA1 ? d.headers["If-Match"] = c.lastSHA1 : d.headers["If-None-Match"] = "*", this.sendRequest(d);
    },
    dropActivityProfile: function dropActivityProfile(a, b) {
      this.log("dropActivityProfile");
      var c, d, e;
      return e = b.requestHeaders || {}, c = {
        profileId: a,
        activityId: b.activity.id
      }, d = {
        url: "activities/profile",
        method: "DELETE",
        params: c,
        headers: e
      }, "undefined" != typeof b.callback && (d.callback = b.callback), this.sendRequest(d);
    },
    retrieveAgentProfile: function retrieveAgentProfile(a, b) {
      this.log("retrieveAgentProfile");
      var c,
          d,
          e,
          f = {},
          g = this;
      if (e = b.requestHeaders || {}, f = {
        method: "GET",
        params: {
          profileId: a
        },
        ignore404: !0,
        headers: e
      }, "0.9" === this.version ? (f.url = "actors/profile", f.params.actor = JSON.stringify(b.agent.asVersion(this.version))) : (f.url = "agents/profile", f.params.agent = JSON.stringify(b.agent.asVersion(this.version))), "undefined" != typeof b.callback && (d = function d(c, _d4) {
        var e = _d4;
        if (null === c) if (404 === _d4.status) e = null;else if (e = new TinCan$1.AgentProfile({
          id: a,
          agent: b.agent,
          contents: _d4.responseText
        }), "undefined" != typeof _d4.getResponseHeader && null !== _d4.getResponseHeader("ETag") && "" !== _d4.getResponseHeader("ETag") ? e.etag = _d4.getResponseHeader("ETag") : e.etag = '"' + TinCan$1.Utils.getSHA1String(_d4.responseText) + '"', "undefined" != typeof _d4.contentType ? e.contentType = _d4.contentType : "undefined" != typeof _d4.getResponseHeader && null !== _d4.getResponseHeader("Content-Type") && "" !== _d4.getResponseHeader("Content-Type") && (e.contentType = _d4.getResponseHeader("Content-Type")), TinCan$1.Utils.isApplicationJSON(e.contentType)) try {
          e.contents = JSON.parse(e.contents);
        } catch (a) {
          g.log("retrieveAgentProfile - failed to deserialize JSON: " + a);
        }
        b.callback(c, e);
      }, f.callback = d), c = this.sendRequest(f), !d && (c.profile = null, null === c.err && 404 !== c.xhr.status && (c.profile = new TinCan$1.AgentProfile({
        id: a,
        agent: b.agent,
        contents: c.xhr.responseText
      }), "undefined" != typeof c.xhr.getResponseHeader && null !== c.xhr.getResponseHeader("ETag") && "" !== c.xhr.getResponseHeader("ETag") ? c.profile.etag = c.xhr.getResponseHeader("ETag") : c.profile.etag = '"' + TinCan$1.Utils.getSHA1String(c.xhr.responseText) + '"', "undefined" != typeof c.xhr.contentType ? c.profile.contentType = c.xhr.contentType : "undefined" != typeof c.xhr.getResponseHeader && null !== c.xhr.getResponseHeader("Content-Type") && "" !== c.xhr.getResponseHeader("Content-Type") && (c.profile.contentType = c.xhr.getResponseHeader("Content-Type")), TinCan$1.Utils.isApplicationJSON(c.profile.contentType)))) try {
        c.profile.contents = JSON.parse(c.profile.contents);
      } catch (a) {
        this.log("retrieveAgentProfile - failed to deserialize JSON: " + a);
      }
      return c;
    },
    retrieveAgentProfileIds: function retrieveAgentProfileIds(a) {
      this.log("retrieveAgentProfileIds");
      var b,
          c,
          d,
          e,
          f = {};

      if (a = a || {}, c = a.requestHeaders || {}, b = {
        method: "GET",
        params: f,
        headers: c,
        ignore404: !0
      }, "0.9" === this.version ? (b.url = "actors/profile", f.actor = JSON.stringify(a.agent.asVersion(this.version))) : (b.url = "agents/profile", f.agent = JSON.stringify(a.agent.asVersion(this.version))), "undefined" != typeof a.callback && (e = function e(b, c) {
        var d = c;
        if (null !== b) return void a.callback(b, d);
        if (404 === c.status) d = [];else try {
          d = JSON.parse(c.responseText);
        } catch (a) {
          b = "Response JSON parse error: " + a;
        }
        a.callback(b, d);
      }, b.callback = e), "undefined" != typeof a.since && (b.params.since = a.since), d = this.sendRequest(b), !e) {
        if (d.profileIds = null, null !== d.err) return d;
        if (404 === d.xhr.status) d.profileIds = [];else try {
          d.profileIds = JSON.parse(d.xhr.responseText);
        } catch (a) {
          d.err = "retrieveAgentProfileIds - JSON parse error: " + a;
        }
      }

      return d;
    },
    saveAgentProfile: function saveAgentProfile(a, b, c) {
      this.log("saveAgentProfile");
      var d, e;
      return e = c.requestHeaders || {}, "undefined" == typeof c.contentType && (c.contentType = "application/octet-stream"), e["Content-Type"] = c.contentType, "undefined" != typeof c.method && "POST" === c.method || (c.method = "PUT"), "object" == _typeof(b) && TinCan$1.Utils.isApplicationJSON(c.contentType) && (b = JSON.stringify(b)), d = {
        method: c.method,
        params: {
          profileId: a
        },
        data: b,
        headers: e
      }, "0.9" === this.version ? (d.url = "actors/profile", d.params.actor = JSON.stringify(c.agent.asVersion(this.version))) : (d.url = "agents/profile", d.params.agent = JSON.stringify(c.agent.asVersion(this.version))), "undefined" != typeof c.callback && (d.callback = c.callback), "undefined" != typeof c.lastSHA1 && null !== c.lastSHA1 ? d.headers["If-Match"] = c.lastSHA1 : d.headers["If-None-Match"] = "*", this.sendRequest(d);
    },
    dropAgentProfile: function dropAgentProfile(a, b) {
      this.log("dropAgentProfile");
      var c, d, e;
      return e = b.requestHeaders || {}, c = {
        profileId: a
      }, d = {
        method: "DELETE",
        params: c,
        headers: e
      }, "0.9" === this.version ? (d.url = "actors/profile", c.actor = JSON.stringify(b.agent.asVersion(this.version))) : (d.url = "agents/profile", c.agent = JSON.stringify(b.agent.asVersion(this.version))), "undefined" != typeof b.callback && (d.callback = b.callback), this.sendRequest(d);
    }
  }, a.syncEnabled = null;
}(), function () {

  var a = TinCan$1.AgentAccount = function (a) {
    this.log("constructor"), this.homePage = null, this.name = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "AgentAccount",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["name", "homePage"];

      for (a = a || {}, "undefined" != typeof a.accountServiceHomePage && (a.homePage = a.accountServiceHomePage), "undefined" != typeof a.accountName && (a.name = a.accountName), b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }
    },
    toString: function toString() {
      this.log("toString");
      var a = "";
      return null !== this.name || null !== this.homePage ? (a += null !== this.name ? this.name : "-", a += ":", a += null !== this.homePage ? this.homePage : "-") : a = "AgentAccount: unidentified", a;
    },
    asVersion: function asVersion(a) {
      this.log("asVersion: " + a);
      var b = {};
      return a = a || TinCan$1.versions()[0], "0.9" === a ? (b.accountName = this.name, b.accountServiceHomePage = this.homePage) : (b.name = this.name, b.homePage = this.homePage), b;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.Agent = function (a) {
    this.log("constructor"), this.name = null, this.mbox = null, this.mbox_sha1sum = null, this.openid = null, this.account = null, this.degraded = !1, this.init(a);
  };

  a.prototype = {
    objectType: "Agent",
    LOG_SRC: "Agent",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c,
          d = ["name", "mbox", "mbox_sha1sum", "openid"];

      for (a = a || {}, "undefined" != typeof a.lastName || "undefined" != typeof a.firstName ? (a.name = "", "undefined" != typeof a.firstName && a.firstName.length > 0 && (a.name = a.firstName[0], a.firstName.length > 1 && (this.degraded = !0)), "" !== a.name && (a.name += " "), "undefined" != typeof a.lastName && a.lastName.length > 0 && (a.name += a.lastName[0], a.lastName.length > 1 && (this.degraded = !0))) : "undefined" == typeof a.familyName && "undefined" == typeof a.givenName || (a.name = "", "undefined" != typeof a.givenName && a.givenName.length > 0 && (a.name = a.givenName[0], a.givenName.length > 1 && (this.degraded = !0)), "" !== a.name && (a.name += " "), "undefined" != typeof a.familyName && a.familyName.length > 0 && (a.name += a.familyName[0], a.familyName.length > 1 && (this.degraded = !0))), "object" == _typeof(a.name) && null !== a.name && (a.name.length > 1 && (this.degraded = !0), a.name = a.name[0]), "object" == _typeof(a.mbox) && null !== a.mbox && (a.mbox.length > 1 && (this.degraded = !0), a.mbox = a.mbox[0]), "object" == _typeof(a.mbox_sha1sum) && null !== a.mbox_sha1sum && (a.mbox_sha1sum.length > 1 && (this.degraded = !0), a.mbox_sha1sum = a.mbox_sha1sum[0]), "object" == _typeof(a.openid) && null !== a.openid && (a.openid.length > 1 && (this.degraded = !0), a.openid = a.openid[0]), "object" == _typeof(a.account) && null !== a.account && "undefined" == typeof a.account.homePage && "undefined" == typeof a.account.name && (0 === a.account.length ? delete a.account : (a.account.length > 1 && (this.degraded = !0), a.account = a.account[0])), a.hasOwnProperty("account") && (a.account instanceof TinCan$1.AgentAccount ? this.account = a.account : this.account = new TinCan$1.AgentAccount(a.account)), b = 0; b < d.length; b += 1) {
        a.hasOwnProperty(d[b]) && null !== a[d[b]] && (c = a[d[b]], "mbox" === d[b] && c.indexOf("mailto:") === -1 && (c = "mailto:" + c), this[d[b]] = c);
      }
    },
    toString: function toString() {
      return this.log("toString"), null !== this.name ? this.name : null !== this.mbox ? this.mbox.replace("mailto:", "") : null !== this.mbox_sha1sum ? this.mbox_sha1sum : null !== this.openid ? this.openid : null !== this.account ? this.account.toString() : this.objectType + ": unidentified";
    },
    asVersion: function asVersion(a) {
      this.log("asVersion: " + a);
      var b = {
        objectType: this.objectType
      };
      return a = a || TinCan$1.versions()[0], "0.9" === a ? (null !== this.mbox ? b.mbox = [this.mbox] : null !== this.mbox_sha1sum ? b.mbox_sha1sum = [this.mbox_sha1sum] : null !== this.openid ? b.openid = [this.openid] : null !== this.account && (b.account = [this.account.asVersion(a)]), null !== this.name && (b.name = [this.name])) : (null !== this.mbox ? b.mbox = this.mbox : null !== this.mbox_sha1sum ? b.mbox_sha1sum = this.mbox_sha1sum : null !== this.openid ? b.openid = this.openid : null !== this.account && (b.account = this.account.asVersion(a)), null !== this.name && (b.name = this.name)), b;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.Group = function (a) {
    this.log("constructor"), this.name = null, this.mbox = null, this.mbox_sha1sum = null, this.openid = null, this.account = null, this.member = [], this.init(a);
  };

  a.prototype = {
    objectType: "Group",
    LOG_SRC: "Group",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b;
      if (a = a || {}, TinCan$1.Agent.prototype.init.call(this, a), "undefined" != typeof a.member) for (b = 0; b < a.member.length; b += 1) {
        a.member[b] instanceof TinCan$1.Agent ? this.member.push(a.member[b]) : this.member.push(new TinCan$1.Agent(a.member[b]));
      }
    },
    toString: function toString(a) {
      this.log("toString");
      var b = TinCan$1.Agent.prototype.toString.call(this, a);
      return b !== this.objectType + ": unidentified" && (b = this.objectType + ": " + b), b;
    },
    asVersion: function asVersion(a) {
      this.log("asVersion: " + a);
      var b, c;
      if (a = a || TinCan$1.versions()[0], b = TinCan$1.Agent.prototype.asVersion.call(this, a), this.member.length > 0) for (b.member = [], c = 0; c < this.member.length; c += 1) {
        b.member.push(this.member[c].asVersion(a));
      }
      return b;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = {
    "http://adlnet.gov/expapi/verbs/experienced": "experienced",
    "http://adlnet.gov/expapi/verbs/attended": "attended",
    "http://adlnet.gov/expapi/verbs/attempted": "attempted",
    "http://adlnet.gov/expapi/verbs/completed": "completed",
    "http://adlnet.gov/expapi/verbs/passed": "passed",
    "http://adlnet.gov/expapi/verbs/failed": "failed",
    "http://adlnet.gov/expapi/verbs/answered": "answered",
    "http://adlnet.gov/expapi/verbs/interacted": "interacted",
    "http://adlnet.gov/expapi/verbs/imported": "imported",
    "http://adlnet.gov/expapi/verbs/created": "created",
    "http://adlnet.gov/expapi/verbs/shared": "shared",
    "http://adlnet.gov/expapi/verbs/voided": "voided"
  },
      b = TinCan$1.Verb = function (a) {
    this.log("constructor"), this.id = null, this.display = null, this.init(a);
  };

  b.prototype = {
    LOG_SRC: "Verb",
    log: TinCan$1.prototype.log,
    init: function init(b) {
      this.log("init");
      var c,
          d,
          e = ["id", "display"];

      if ("string" == typeof b) {
        this.id = b, this.display = {
          und: this.id
        };

        for (d in a) {
          if (a.hasOwnProperty(d) && a[d] === b) {
            this.id = d;
            break;
          }
        }
      } else {
        for (b = b || {}, c = 0; c < e.length; c += 1) {
          b.hasOwnProperty(e[c]) && null !== b[e[c]] && (this[e[c]] = b[e[c]]);
        }

        null === this.display && "undefined" != typeof a[this.id] && (this.display = {
          und: a[this.id]
        });
      }
    },
    toString: function toString(a) {
      return this.log("toString"), null !== this.display ? this.getLangDictionaryValue("display", a) : this.id;
    },
    asVersion: function asVersion(b) {
      this.log("asVersion");
      var c;
      return b = b || TinCan$1.versions()[0], "0.9" === b ? c = a[this.id] : (c = {
        id: this.id
      }, null !== this.display && (c.display = this.display)), c;
    },
    getLangDictionaryValue: TinCan$1.Utils.getLangDictionaryValue
  }, b.fromJSON = function (a) {
    b.prototype.log("fromJSON");
    var c = JSON.parse(a);
    return new b(c);
  };
}(), function () {

  var a = TinCan$1.Result = function (a) {
    this.log("constructor"), this.score = null, this.success = null, this.completion = null, this.duration = null, this.response = null, this.extensions = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "Result",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["completion", "duration", "extensions", "response", "success"];

      for (a = a || {}, a.hasOwnProperty("score") && null !== a.score && (a.score instanceof TinCan$1.Score ? this.score = a.score : this.score = new TinCan$1.Score(a.score)), b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }

      "Completed" === this.completion && (this.completion = !0);
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b,
          c = {},
          d = ["success", "duration", "response", "extensions"],
          e = ["score"];

      for (a = a || TinCan$1.versions()[0], b = 0; b < d.length; b += 1) {
        null !== this[d[b]] && (c[d[b]] = this[d[b]]);
      }

      for (b = 0; b < e.length; b += 1) {
        null !== this[e[b]] && (c[e[b]] = this[e[b]].asVersion(a));
      }

      return null !== this.completion && ("0.9" === a ? this.completion && (c.completion = "Completed") : c.completion = this.completion), c;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.Score = function (a) {
    this.log("constructor"), this.scaled = null, this.raw = null, this.min = null, this.max = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "Score",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["scaled", "raw", "min", "max"];

      for (a = a || {}, b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b,
          c = {},
          d = ["scaled", "raw", "min", "max"];

      for (a = a || TinCan$1.versions()[0], b = 0; b < d.length; b += 1) {
        null !== this[d[b]] && (c[d[b]] = this[d[b]]);
      }

      return c;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.InteractionComponent = function (a) {
    this.log("constructor"), this.id = null, this.description = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "InteractionComponent",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["id", "description"];

      for (a = a || {}, b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b,
          c,
          d = {
        id: this.id
      },
          e = ["description"];

      for (a = a || TinCan$1.versions()[0], b = 0; b < e.length; b += 1) {
        c = e[b], null !== this[c] && (d[c] = this[c]);
      }

      return d;
    },
    getLangDictionaryValue: TinCan$1.Utils.getLangDictionaryValue
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = {
    "http://adlnet.gov/expapi/activities/course": "course",
    "http://adlnet.gov/expapi/activities/module": "module",
    "http://adlnet.gov/expapi/activities/meeting": "meeting",
    "http://adlnet.gov/expapi/activities/media": "media",
    "http://adlnet.gov/expapi/activities/performance": "performance",
    "http://adlnet.gov/expapi/activities/simulation": "simulation",
    "http://adlnet.gov/expapi/activities/assessment": "assessment",
    "http://adlnet.gov/expapi/activities/interaction": "interaction",
    "http://adlnet.gov/expapi/activities/cmi.interaction": "cmi.interaction",
    "http://adlnet.gov/expapi/activities/question": "question",
    "http://adlnet.gov/expapi/activities/objective": "objective",
    "http://adlnet.gov/expapi/activities/link": "link"
  },
      b = TinCan$1.ActivityDefinition = function (a) {
    this.log("constructor"), this.name = null, this.description = null, this.type = null, this.moreInfo = null, this.extensions = null, this.interactionType = null, this.correctResponsesPattern = null, this.choices = null, this.scale = null, this.source = null, this.target = null, this.steps = null, this.init(a);
  };

  b.prototype = {
    LOG_SRC: "ActivityDefinition",
    log: TinCan$1.prototype.log,
    init: function init(b) {
      this.log("init");
      var c,
          d,
          e,
          f = ["name", "description", "moreInfo", "extensions", "correctResponsesPattern"],
          g = [];

      if (b = b || {}, b.hasOwnProperty("type") && null !== b.type) {
        for (e in a) {
          a.hasOwnProperty(e) && a[e] === b.type && (b.type = a[e]);
        }

        this.type = b.type;
      }

      if (b.hasOwnProperty("interactionType") && null !== b.interactionType && (this.interactionType = b.interactionType, "choice" === b.interactionType || "sequencing" === b.interactionType ? g.push("choices") : "likert" === b.interactionType ? g.push("scale") : "matching" === b.interactionType ? (g.push("source"), g.push("target")) : "performance" === b.interactionType && g.push("steps"), g.length > 0)) for (c = 0; c < g.length; c += 1) {
        if (e = g[c], b.hasOwnProperty(e) && null !== b[e]) for (this[e] = [], d = 0; d < b[e].length; d += 1) {
          b[e][d] instanceof TinCan$1.InteractionComponent ? this[e].push(b[e][d]) : this[e].push(new TinCan$1.InteractionComponent(b[e][d]));
        }
      }

      for (c = 0; c < f.length; c += 1) {
        b.hasOwnProperty(f[c]) && null !== b[f[c]] && (this[f[c]] = b[f[c]]);
      }
    },
    toString: function toString(a) {
      return this.log("toString"), null !== this.name ? this.getLangDictionaryValue("name", a) : null !== this.description ? this.getLangDictionaryValue("description", a) : "";
    },
    asVersion: function asVersion(b) {
      this.log("asVersion");
      var c,
          d,
          e,
          f = {},
          g = ["name", "description", "interactionType", "correctResponsesPattern", "extensions"],
          h = ["choices", "scale", "source", "target", "steps"];

      for (b = b || TinCan$1.versions()[0], null !== this.type && ("0.9" === b ? f.type = a[this.type] : f.type = this.type), c = 0; c < g.length; c += 1) {
        e = g[c], null !== this[e] && (f[e] = this[e]);
      }

      for (c = 0; c < h.length; c += 1) {
        if (e = h[c], null !== this[e]) for (f[e] = [], d = 0; d < this[e].length; d += 1) {
          f[e].push(this[e][d].asVersion(b));
        }
      }

      return 0 !== b.indexOf("0.9") && null !== this.moreInfo && (f.moreInfo = this.moreInfo), f;
    },
    getLangDictionaryValue: TinCan$1.Utils.getLangDictionaryValue
  }, b.fromJSON = function (a) {
    b.prototype.log("fromJSON");
    var c = JSON.parse(a);
    return new b(c);
  };
}(), function () {

  var a = TinCan$1.Activity = function (a) {
    this.log("constructor"), this.objectType = "Activity", this.id = null, this.definition = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "Activity",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["id"];

      for (a = a || {}, a.hasOwnProperty("definition") && (a.definition instanceof TinCan$1.ActivityDefinition ? this.definition = a.definition : this.definition = new TinCan$1.ActivityDefinition(a.definition)), b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }
    },
    toString: function toString(a) {
      this.log("toString");
      var b = "";
      return null !== this.definition && (b = this.definition.toString(a), "" !== b) ? b : null !== this.id ? this.id : "Activity: unidentified";
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b = {
        id: this.id,
        objectType: this.objectType
      };
      return a = a || TinCan$1.versions()[0], null !== this.definition && (b.definition = this.definition.asVersion(a)), b;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.ContextActivities = function (a) {
    this.log("constructor"), this.category = null, this.parent = null, this.grouping = null, this.other = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "ContextActivities",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c,
          d,
          e,
          f = ["category", "parent", "grouping", "other"];

      for (a = a || {}, b = 0; b < f.length; b += 1) {
        if (d = f[b], a.hasOwnProperty(d) && null !== a[d]) if ("[object Array]" === Object.prototype.toString.call(a[d])) for (c = 0; c < a[d].length; c += 1) {
          this.add(d, a[d][c]);
        } else e = a[d], this.add(d, e);
      }
    },
    add: function add(a, b) {
      if ("category" === a || "parent" === a || "grouping" === a || "other" === a) return null === this[a] && (this[a] = []), b instanceof TinCan$1.Activity || (b = "string" == typeof b ? {
        id: b
      } : b, b = new TinCan$1.Activity(b)), this[a].push(b), this[a].length - 1;
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b,
          c,
          d = {},
          e = ["parent", "grouping", "other"];

      for (a = a || TinCan$1.versions()[0], b = 0; b < e.length; b += 1) {
        if (null !== this[e[b]] && this[e[b]].length > 0) if ("0.9" === a || "0.95" === a) this[e[b]].length > 1 && this.log("[warning] version does not support multiple values in: " + e[b]), d[e[b]] = this[e[b]][0].asVersion(a);else for (d[e[b]] = [], c = 0; c < this[e[b]].length; c += 1) {
          d[e[b]].push(this[e[b]][c].asVersion(a));
        }
      }

      if (null !== this.category && this.category.length > 0) {
        if ("0.9" === a || "0.95" === a) throw this.log("[error] version does not support the 'category' property: " + a), new Error(a + " does not support the 'category' property");

        for (d.category = [], b = 0; b < this.category.length; b += 1) {
          d.category.push(this.category[b].asVersion(a));
        }
      }

      return d;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.Context = function (a) {
    this.log("constructor"), this.registration = null, this.instructor = null, this.team = null, this.contextActivities = null, this.revision = null, this.platform = null, this.language = null, this.statement = null, this.extensions = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "Context",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c,
          d,
          e = ["registration", "revision", "platform", "language", "extensions"],
          f = ["instructor", "team"];

      for (a = a || {}, b = 0; b < e.length; b += 1) {
        c = e[b], a.hasOwnProperty(c) && null !== a[c] && (this[c] = a[c]);
      }

      for (b = 0; b < f.length; b += 1) {
        c = f[b], a.hasOwnProperty(c) && null !== a[c] && (d = a[c], "undefined" != typeof d.objectType && "Person" !== d.objectType || (d.objectType = "Agent"), "Agent" !== d.objectType || d instanceof TinCan$1.Agent ? "Group" !== d.objectType || d instanceof TinCan$1.Group || (d = new TinCan$1.Group(d)) : d = new TinCan$1.Agent(d), this[c] = d);
      }

      a.hasOwnProperty("contextActivities") && null !== a.contextActivities && (a.contextActivities instanceof TinCan$1.ContextActivities ? this.contextActivities = a.contextActivities : this.contextActivities = new TinCan$1.ContextActivities(a.contextActivities)), a.hasOwnProperty("statement") && null !== a.statement && (a.statement instanceof TinCan$1.StatementRef ? this.statement = a.statement : a.statement instanceof TinCan$1.SubStatement ? this.statement = a.statement : "StatementRef" === a.statement.objectType ? this.statement = new TinCan$1.StatementRef(a.statement) : "SubStatement" === a.statement.objectType ? this.statement = new TinCan$1.SubStatement(a.statement) : this.log("Unable to parse statement.context.statement property."));
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b,
          c = {},
          d = ["registration", "revision", "platform", "language", "extensions"],
          e = ["instructor", "team", "contextActivities", "statement"];
      if (a = a || TinCan$1.versions()[0], this.statement instanceof TinCan$1.SubStatement && "0.9" !== a && "0.95" !== a) throw this.log("[error] version does not support SubStatements in the 'statement' property: " + a), new Error(a + " does not support SubStatements in the 'statement' property");

      for (b = 0; b < d.length; b += 1) {
        null !== this[d[b]] && (c[d[b]] = this[d[b]]);
      }

      for (b = 0; b < e.length; b += 1) {
        null !== this[e[b]] && (c[e[b]] = this[e[b]].asVersion(a));
      }

      return c;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.StatementRef = function (a) {
    this.log("constructor"), this.id = null, this.init(a);
  };

  a.prototype = {
    objectType: "StatementRef",
    LOG_SRC: "StatementRef",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["id"];

      for (a = a || {}, b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }
    },
    toString: function toString() {
      return this.log("toString"), this.id;
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b = {
        objectType: this.objectType,
        id: this.id
      };
      return "0.9" === a && (b.objectType = "Statement"), b;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.SubStatement = function (a) {
    this.log("constructor"), this.actor = null, this.verb = null, this.target = null, this.result = null, this.context = null, this.timestamp = null, this.init(a);
  };

  a.prototype = {
    objectType: "SubStatement",
    LOG_SRC: "SubStatement",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["timestamp"];

      for (a = a || {}, a.hasOwnProperty("object") && (a.target = a.object), a.hasOwnProperty("actor") && ("undefined" != typeof a.actor.objectType && "Person" !== a.actor.objectType || (a.actor.objectType = "Agent"), "Agent" === a.actor.objectType ? a.actor instanceof TinCan$1.Agent ? this.actor = a.actor : this.actor = new TinCan$1.Agent(a.actor) : "Group" === a.actor.objectType && (a.actor instanceof TinCan$1.Group ? this.actor = a.actor : this.actor = new TinCan$1.Group(a.actor))), a.hasOwnProperty("verb") && (a.verb instanceof TinCan$1.Verb ? this.verb = a.verb : this.verb = new TinCan$1.Verb(a.verb)), a.hasOwnProperty("target") && (a.target instanceof TinCan$1.Activity || a.target instanceof TinCan$1.Agent || a.target instanceof TinCan$1.Group || a.target instanceof TinCan$1.SubStatement || a.target instanceof TinCan$1.StatementRef ? this.target = a.target : ("undefined" == typeof a.target.objectType && (a.target.objectType = "Activity"), "Activity" === a.target.objectType ? this.target = new TinCan$1.Activity(a.target) : "Agent" === a.target.objectType ? this.target = new TinCan$1.Agent(a.target) : "Group" === a.target.objectType ? this.target = new TinCan$1.Group(a.target) : "SubStatement" === a.target.objectType ? this.target = new TinCan$1.SubStatement(a.target) : "StatementRef" === a.target.objectType ? this.target = new TinCan$1.StatementRef(a.target) : this.log("Unrecognized target type: " + a.target.objectType))), a.hasOwnProperty("result") && (a.result instanceof TinCan$1.Result ? this.result = a.result : this.result = new TinCan$1.Result(a.result)), a.hasOwnProperty("context") && (a.context instanceof TinCan$1.Context ? this.context = a.context : this.context = new TinCan$1.Context(a.context)), b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }
    },
    toString: function toString(a) {
      return this.log("toString"), (null !== this.actor ? this.actor.toString(a) : "") + " " + (null !== this.verb ? this.verb.toString(a) : "") + " " + (null !== this.target ? this.target.toString(a) : "");
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b,
          c,
          d = ["timestamp"],
          e = ["actor", "verb", "result", "context"];

      for (b = {
        objectType: this.objectType
      }, a = a || TinCan$1.versions()[0], c = 0; c < d.length; c += 1) {
        null !== this[d[c]] && (b[d[c]] = this[d[c]]);
      }

      for (c = 0; c < e.length; c += 1) {
        null !== this[e[c]] && (b[e[c]] = this[e[c]].asVersion(a));
      }

      return null !== this.target && (b.object = this.target.asVersion(a)), "0.9" === a && (b.objectType = "Statement"), b;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.Statement = function (a, b) {
    this.log("constructor"), b = "number" == typeof b ? {
      storeOriginal: b
    } : b || {}, "undefined" == typeof b.storeOriginal && (b.storeOriginal = null), "undefined" == typeof b.doStamp && (b.doStamp = !0), this.id = null, this.actor = null, this.verb = null, this.target = null, this.result = null, this.context = null, this.timestamp = null, this.stored = null, this.authority = null, this.attachments = null, this.version = null, this.degraded = !1, this.voided = null, this.inProgress = null, this.originalJSON = null, this.init(a, b);
  };

  a.prototype = {
    LOG_SRC: "Statement",
    log: TinCan$1.prototype.log,
    init: function init(a, b) {
      this.log("init");
      var c,
          d = ["id", "stored", "timestamp", "version", "inProgress", "voided"];
      if (a = a || {}, b.storeOriginal && (this.originalJSON = JSON.stringify(a, null, b.storeOriginal)), a.hasOwnProperty("object") && (a.target = a.object), a.hasOwnProperty("actor") && ("undefined" != typeof a.actor.objectType && "Person" !== a.actor.objectType || (a.actor.objectType = "Agent"), "Agent" === a.actor.objectType ? a.actor instanceof TinCan$1.Agent ? this.actor = a.actor : this.actor = new TinCan$1.Agent(a.actor) : "Group" === a.actor.objectType && (a.actor instanceof TinCan$1.Group ? this.actor = a.actor : this.actor = new TinCan$1.Group(a.actor))), a.hasOwnProperty("authority") && ("undefined" != typeof a.authority.objectType && "Person" !== a.authority.objectType || (a.authority.objectType = "Agent"), "Agent" === a.authority.objectType ? a.authority instanceof TinCan$1.Agent ? this.authority = a.authority : this.authority = new TinCan$1.Agent(a.authority) : "Group" === a.authority.objectType && (a.actor instanceof TinCan$1.Group ? this.authority = a.authority : this.authority = new TinCan$1.Group(a.authority))), a.hasOwnProperty("verb") && (a.verb instanceof TinCan$1.Verb ? this.verb = a.verb : this.verb = new TinCan$1.Verb(a.verb)), a.hasOwnProperty("target") && (a.target instanceof TinCan$1.Activity || a.target instanceof TinCan$1.Agent || a.target instanceof TinCan$1.Group || a.target instanceof TinCan$1.SubStatement || a.target instanceof TinCan$1.StatementRef ? this.target = a.target : ("undefined" == typeof a.target.objectType && (a.target.objectType = "Activity"), "Activity" === a.target.objectType ? this.target = new TinCan$1.Activity(a.target) : "Agent" === a.target.objectType ? this.target = new TinCan$1.Agent(a.target) : "Group" === a.target.objectType ? this.target = new TinCan$1.Group(a.target) : "SubStatement" === a.target.objectType ? this.target = new TinCan$1.SubStatement(a.target) : "StatementRef" === a.target.objectType ? this.target = new TinCan$1.StatementRef(a.target) : this.log("Unrecognized target type: " + a.target.objectType))), a.hasOwnProperty("result") && (a.result instanceof TinCan$1.Result ? this.result = a.result : this.result = new TinCan$1.Result(a.result)), a.hasOwnProperty("context") && (a.context instanceof TinCan$1.Context ? this.context = a.context : this.context = new TinCan$1.Context(a.context)), a.hasOwnProperty("attachments") && null !== a.attachments) for (this.attachments = [], c = 0; c < a.attachments.length; c += 1) {
        a.attachments[c] instanceof TinCan$1.Attachment ? this.attachments.push(a.attachments[c]) : this.attachments.push(new TinCan$1.Attachment(a.attachments[c]));
      }

      for (c = 0; c < d.length; c += 1) {
        a.hasOwnProperty(d[c]) && null !== a[d[c]] && (this[d[c]] = a[d[c]]);
      }

      b.doStamp && this.stamp();
    },
    toString: function toString(a) {
      return this.log("toString"), (null !== this.actor ? this.actor.toString(a) : "") + " " + (null !== this.verb ? this.verb.toString(a) : "") + " " + (null !== this.target ? this.target.toString(a) : "");
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b,
          c = {},
          d = ["id", "timestamp"],
          e = ["actor", "verb", "result", "context", "authority"];

      for (a = a || TinCan$1.versions()[0], b = 0; b < d.length; b += 1) {
        null !== this[d[b]] && (c[d[b]] = this[d[b]]);
      }

      for (b = 0; b < e.length; b += 1) {
        null !== this[e[b]] && (c[e[b]] = this[e[b]].asVersion(a));
      }

      if (null !== this.target && (c.object = this.target.asVersion(a)), "0.9" !== a && "0.95" !== a || null !== this.voided && (c.voided = this.voided), "0.9" === a && null !== this.inProgress && (c.inProgress = this.inProgress), null !== this.attachments && "0.9" !== a && "0.95" !== a) for (c.attachments = [], b = 0; b < this.attachments.length; b += 1) {
        this.attachments[b] instanceof TinCan$1.Attachment ? c.attachments.push(this.attachments[b].asVersion(a)) : c.attachments.push(new TinCan$1.Attachment(this.attachments[b]).asVersion(a));
      }
      return c;
    },
    stamp: function stamp() {
      this.log("stamp"), null === this.id && (this.id = TinCan$1.Utils.getUUID()), null === this.timestamp && (this.timestamp = TinCan$1.Utils.getISODateString(new Date()));
    },
    hasAttachmentWithContent: function hasAttachmentWithContent() {
      this.log("hasAttachmentWithContent");
      var a;
      if (null === this.attachments) return !1;

      for (a = 0; a < this.attachments.length; a += 1) {
        if (null !== this.attachments[a].content) return !0;
      }

      return !1;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.StatementsResult = function (a) {
    this.log("constructor"), this.statements = null, this.more = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "StatementsResult",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init"), a = a || {}, a.hasOwnProperty("statements") && (this.statements = a.statements), a.hasOwnProperty("more") && (this.more = a.more);
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c,
        d,
        e,
        f = [];

    try {
      c = JSON.parse(b);
    } catch (b) {
      a.prototype.log("fromJSON - JSON.parse error: " + b);
    }

    if (c) {
      for (e = 0; e < c.statements.length; e += 1) {
        try {
          d = new TinCan$1.Statement(c.statements[e], 4);
        } catch (b) {
          a.prototype.log("fromJSON - statement instantiation failed: " + b + " (" + JSON.stringify(c.statements[e]) + ")"), d = new TinCan$1.Statement({
            id: c.statements[e].id
          }, 4);
        }

        f.push(d);
      }

      c.statements = f;
    }

    return new a(c);
  };
}(), function () {

  var a = TinCan$1.State = function (a) {
    this.log("constructor"), this.id = null, this.updated = null, this.contents = null, this.etag = null, this.contentType = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "State",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["id", "contents", "etag", "contentType"];

      for (a = a || {}, b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }

      this.updated = !1;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.ActivityProfile = function (a) {
    this.log("constructor"), this.id = null, this.activity = null, this.updated = null, this.contents = null, this.etag = null, this.contentType = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "ActivityProfile",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["id", "contents", "etag", "contentType"];

      for (a = a || {}, a.hasOwnProperty("activity") && (a.activity instanceof TinCan$1.Activity ? this.activity = a.activity : this.activity = new TinCan$1.Activity(a.activity)), b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }

      this.updated = !1;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.AgentProfile = function (a) {
    this.log("constructor"), this.id = null, this.agent = null, this.updated = null, this.contents = null, this.etag = null, this.contentType = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "AgentProfile",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["id", "contents", "etag", "contentType"];

      for (a = a || {}, a.hasOwnProperty("agent") && (a.agent instanceof TinCan$1.Agent ? this.agent = a.agent : this.agent = new TinCan$1.Agent(a.agent)), b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }

      this.updated = !1;
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.About = function (a) {
    this.log("constructor"), this.version = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "About",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["version"];

      for (a = a || {}, b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  };
}(), function () {

  var a = TinCan$1.Attachment = function (a) {
    this.log("constructor"), this.usageType = null, this.display = null, this.contentType = null, this.length = null, this.sha2 = null, this.description = null, this.fileUrl = null, this.content = null, this.init(a);
  };

  a.prototype = {
    LOG_SRC: "Attachment",
    log: TinCan$1.prototype.log,
    init: function init(a) {
      this.log("init");
      var b,
          c = ["contentType", "length", "sha2", "usageType", "display", "description", "fileUrl"];

      for (a = a || {}, b = 0; b < c.length; b += 1) {
        a.hasOwnProperty(c[b]) && null !== a[c[b]] && (this[c[b]] = a[c[b]]);
      }

      a.hasOwnProperty("content") && null !== a.content && ("string" == typeof a.content ? this.setContentFromString(a.content) : this.setContent(a.content));
    },
    asVersion: function asVersion(a) {
      this.log("asVersion");
      var b;
      return a = a || TinCan$1.versions()[0], "0.9" === a || "0.95" === a ? b = null : (b = {
        contentType: this.contentType,
        display: this.display,
        length: this.length,
        sha2: this.sha2,
        usageType: this.usageType
      }, null !== this.fileUrl && (b.fileUrl = this.fileUrl), null !== this.description && (b.description = this.description)), b;
    },
    getLangDictionaryValue: TinCan$1.Utils.getLangDictionaryValue,
    setContent: function setContent(a) {
      this.content = a, this.length = a.byteLength, this.sha2 = TinCan$1.Utils.getSHA256String(a);
    },
    setContentFromString: function setContentFromString(a) {
      var b = a;
      b = TinCan$1.Utils.stringToArrayBuffer(a), this.setContent(b);
    },
    getContentAsString: function getContentAsString() {
      return TinCan$1.Utils.stringFromArrayBuffer(this.content);
    }
  }, a.fromJSON = function (b) {
    a.prototype.log("fromJSON");
    var c = JSON.parse(b);
    return new a(c);
  }, a._defaultEncoding = "utf-8";
}(), function () {

  var LOG_SRC = "Environment.Browser",
      requestComplete,
      __IEModeConversion,
      nativeRequest,
      xdrRequest,
      __createJSONSegment,
      __createAttachmentSegment,
      __delay,
      env = {},
      log = TinCan$1.prototype.log;

  return "undefined" == typeof window ? void log("'window' not defined", LOG_SRC) : (window.JSON || (window.JSON = {
    parse: function parse(sJSON) {
      return eval("(" + sJSON + ")");
    },
    stringify: function stringify(a) {
      var b,
          c,
          d = "";

      if (a instanceof Object) {
        if (a.constructor === Array) {
          for (b = 0; b < a.length; b += 1) {
            d += this.stringify(a[b]) + ",";
          }

          return "[" + d.substr(0, d.length - 1) + "]";
        }

        if (a.toString !== Object.prototype.toString) return '"' + a.toString().replace(/"/g, "\\$&") + '"';

        for (c in a) {
          a.hasOwnProperty(c) && (d += '"' + c.replace(/"/g, "\\$&") + '":' + this.stringify(a[c]) + ",");
        }

        return "{" + d.substr(0, d.length - 1) + "}";
      }

      return "string" == typeof a ? '"' + a.replace(/"/g, "\\$&") + '"' : String(a);
    }
  }), Date.now || (Date.now = function () {
    return +new Date();
  }), Array.prototype.forEach || (Array.prototype.forEach = function (a) {
    if (void 0 === this || null === this) throw new TypeError();
    var b = Object(this),
        c = b.length >>> 0;
    if ("function" != typeof a) throw new TypeError();
    var d,
        e = arguments[1];

    for (d = 0; d < c; d += 1) {
      d in b && a.call(e, b[d], d, b);
    }
  }), env.hasCORS = !1, env.useXDR = !1, "undefined" != typeof XMLHttpRequest && "undefined" != typeof new XMLHttpRequest().withCredentials ? env.hasCORS = !0 : "undefined" != typeof XDomainRequest && (env.hasCORS = !0, env.useXDR = !0), requestComplete = function requestComplete(a, b, c) {
    log("requestComplete: " + c.finished + ", xhr.status: " + a.status, LOG_SRC);
    var d, e, f;
    return f = "undefined" == typeof a.status ? c.fakeStatus : 1223 === a.status ? 204 : a.status, c.finished ? d : (c.finished = !0, e = b.ignore404 && 404 === f, f >= 200 && f < 400 || e ? b.callback ? void b.callback(null, a) : d = {
      err: null,
      xhr: a
    } : (d = {
      err: f,
      xhr: a
    }, 0 === f ? log("[warning] There was a problem communicating with the Learning Record Store. Aborted, offline, or invalid CORS endpoint (" + f + ")", LOG_SRC) : log("[warning] There was a problem communicating with the Learning Record Store. (" + f + " | " + a.responseText + ")", LOG_SRC), b.callback && b.callback(f, a), d));
  }, __IEModeConversion = function __IEModeConversion(a, b, c, d) {
    var e;

    for (e in b) {
      b.hasOwnProperty(e) && c.push(e + "=" + encodeURIComponent(b[e]));
    }

    return "undefined" != typeof d.data && c.push("content=" + encodeURIComponent(d.data)), b["Content-Type"] = "application/x-www-form-urlencoded", a += "?method=" + d.method, d.method = "POST", d.params = {}, c.length > 0 && (d.data = c.join("&")), a;
  }, nativeRequest = function nativeRequest(a, b, c) {
    log("sendRequest using XMLHttpRequest", LOG_SRC);
    var d,
        e,
        f,
        g,
        h = this,
        i = [],
        j = {
      finished: !1,
      fakeStatus: null
    },
        k = "undefined" != typeof c.callback,
        l = a,
        m = 2048;
    log("sendRequest using XMLHttpRequest - async: " + k, LOG_SRC);

    for (e in c.params) {
      c.params.hasOwnProperty(e) && i.push(e + "=" + encodeURIComponent(c.params[e]));
    }

    if (i.length > 0 && (l += "?" + i.join("&")), l.length >= m) {
      if ("undefined" == typeof c.method) return g = new Error("method must not be undefined for an IE Mode Request conversion"), "undefined" != typeof c.callback && c.callback(g, null), {
        err: g,
        xhr: null
      };
      a = __IEModeConversion(a, b, i, c);
    } else a = l;

    if ("undefined" != typeof XMLHttpRequest) d = new XMLHttpRequest();else if (d = new ActiveXObject("Microsoft.XMLHTTP"), c.expectMultipart) return g = new Error("Attachment support not available"), "undefined" != typeof c.callback && c.callback(g, null), {
      err: g,
      xhr: null
    };
    d.open(c.method, a, k), c.expectMultipart && (d.responseType = "arraybuffer");

    for (e in b) {
      b.hasOwnProperty(e) && d.setRequestHeader(e, b[e]);
    }

    f = c.data, k && (d.onreadystatechange = function () {
      log("xhr.onreadystatechange - xhr.readyState: " + d.readyState, LOG_SRC), 4 === d.readyState && requestComplete.call(h, d, c, j);
    });

    try {
      d.send(f);
    } catch (a) {
      log("sendRequest caught send exception: " + a, LOG_SRC);
    }

    return k ? d : requestComplete.call(this, d, c, j);
  }, xdrRequest = function xdrRequest(a, b, c) {
    log("sendRequest using XDomainRequest", LOG_SRC);
    var d,
        e,
        f,
        g,
        h,
        i = this,
        j = [],
        k = {
      finished: !1,
      fakeStatus: null
    };
    if (c.expectMultipart) return h = new Error("Attachment support not available"), "undefined" != typeof c.callback && c.callback(h, null), {
      err: h,
      xhr: null
    };
    a += "?method=" + c.method;

    for (f in c.params) {
      c.params.hasOwnProperty(f) && j.push(f + "=" + encodeURIComponent(c.params[f]));
    }

    for (f in b) {
      b.hasOwnProperty(f) && j.push(f + "=" + encodeURIComponent(b[f]));
    }

    "undefined" != typeof c.data && j.push("content=" + encodeURIComponent(c.data)), e = j.join("&"), d = new XDomainRequest(), d.open("POST", a), c.callback ? (d.onload = function () {
      k.fakeStatus = 200, requestComplete.call(i, d, c, k);
    }, d.onerror = function () {
      k.fakeStatus = 400, requestComplete.call(i, d, c, k);
    }, d.ontimeout = function () {
      k.fakeStatus = 0, requestComplete.call(i, d, c, k);
    }) : (d.onload = function () {
      k.fakeStatus = 200;
    }, d.onerror = function () {
      k.fakeStatus = 400;
    }, d.ontimeout = function () {
      k.fakeStatus = 0;
    }), d.onprogress = function () {}, d.timeout = 0;

    try {
      d.send(e);
    } catch (a) {
      log("sendRequest caught send exception: " + a, LOG_SRC);
    }

    if (!c.callback) {
      for (g = 1e4 + Date.now(), log("sendRequest - until: " + g + ", finished: " + k.finished, LOG_SRC); Date.now() < g && null === k.fakeStatus;) {
        __delay();
      }

      return requestComplete.call(i, d, c, k);
    }

    return d;
  }, TinCan$1.LRS.prototype._initByEnvironment = function (a) {
    log("_initByEnvironment", LOG_SRC);
    var b, c, d, e;
    if (a = a || {}, this._makeRequest = nativeRequest, this._IEModeConversion = __IEModeConversion, b = this.endpoint.toLowerCase().match(/([A-Za-z]+:)\/\/([^:\/]+):?(\d+)?(\/.*)?$/), null === b) throw log("[error] LRS invalid: failed to divide URL parts", LOG_SRC), {
      code: 4,
      mesg: "LRS invalid: failed to divide URL parts"
    };
    if (d = location.port, c = location.protocol.toLowerCase() === b[1], "" === d && (d = "http:" === location.protocol.toLowerCase() ? "80" : "https:" === location.protocol.toLowerCase() ? "443" : ""), e = !c || location.hostname.toLowerCase() !== b[2] || d !== (null !== b[3] && "undefined" != typeof b[3] && "" !== b[3] ? b[3] : "http:" === b[1] ? "80" : "https:" === b[1] ? "443" : "")) if (env.hasCORS) {
      if (env.useXDR && c) this._makeRequest = xdrRequest;else if (env.useXDR && !c) {
        if (!a.allowFail) throw log("[error] LRS invalid: cross domain request for differing scheme in IE with XDR", LOG_SRC), {
          code: 2,
          mesg: "LRS invalid: cross domain request for differing scheme in IE with XDR"
        };
        log("[warning] LRS invalid: cross domain request for differing scheme in IE with XDR (allowed to fail)", LOG_SRC);
      }
    } else {
      if (!a.allowFail) throw log("[error] LRS invalid: cross domain requests not supported in this browser", LOG_SRC), {
        code: 1,
        mesg: "LRS invalid: cross domain requests not supported in this browser"
      };
      log("[warning] LRS invalid: cross domain requests not supported in this browser (allowed to fail)", LOG_SRC);
    }
  }, __delay = function __delay() {
    var a = new XMLHttpRequest(),
        b = window.location + "?forcenocache=" + TinCan$1.Utils.getUUID();
    a.open("GET", b, !1), a.send(null);
  }, TinCan$1.LRS.syncEnabled = !0, TinCan$1.LRS.prototype._getMultipartRequestData = function (a, b, c) {
    var d,
        e = [];

    for (e.push(__createJSONSegment(a, b)), d = 0; d < c.length; d += 1) {
      null !== c[d].content && e.push(__createAttachmentSegment(a, c[d].content, c[d].sha2, c[d].contentType));
    }

    return e.push("\r\n--" + a + "--\r\n"), new Blob(e);
  }, __createJSONSegment = function __createJSONSegment(a, b) {
    var c = ["--" + a, "Content-Type: application/json", "", JSON.stringify(b)].join("\r\n");
    return c += "\r\n";
  }, __createAttachmentSegment = function __createAttachmentSegment(a, b, c, d) {
    var e = [],
        f = ["--" + a, "Content-Type: " + d, "Content-Transfer-Encoding: binary", "X-Experience-API-Hash: " + c].join("\r\n");
    return f += "\r\n\r\n", e.push(f), e.push(b), new Blob(e);
  }, TinCan$1.Utils.stringToArrayBuffer = function (a, b) {
    var c;
    return b || (b = TinCan$1.Utils.defaultEncoding), c = new TextEncoder(b), c.encode(a).buffer;
  }, void (TinCan$1.Utils.stringFromArrayBuffer = function (a, b) {
    var c;
    return b || (b = TinCan$1.Utils.defaultEncoding), c = new TextDecoder(b), c.decode(a);
  }));
}(), function (a) {

  function b(a) {
    switch (_typeof(a)) {
      case "undefined":
        return "undefined";

      case "boolean":
        return "boolean";

      case "number":
        return "number";

      case "string":
        return "string";

      default:
        return null === a ? "null" : "object";
    }
  }

  function c(a) {
    return Object.prototype.toString.call(a).replace(/^\[object *|\]$/g, "");
  }

  function d(a) {
    return "function" == typeof a;
  }

  function e(a) {
    if (null === a || a === D) throw TypeError();
    return Object(a);
  }

  function f(a) {
    return a >> 0;
  }

  function g(a) {
    return a >>> 0;
  }

  function h(b) {
    function c(a) {
      Object.defineProperty(b, a, {
        get: function get() {
          return b._getter(a);
        },
        set: function set(c) {
          b._setter(a, c);
        },
        enumerable: !0,
        configurable: !1
      });
    }

    if (!("TYPED_ARRAY_POLYFILL_NO_ARRAY_ACCESSORS" in a)) {
      if (b.length > E) throw RangeError("Array too large for polyfill");
      var d;

      for (d = 0; d < b.length; d += 1) {
        c(d);
      }
    }
  }

  function i(a, b) {
    var c = 32 - b;
    return a << c >> c;
  }

  function j(a, b) {
    var c = 32 - b;
    return a << c >>> c;
  }

  function k(a) {
    return [255 & a];
  }

  function l(a) {
    return i(a[0], 8);
  }

  function m(a) {
    return [255 & a];
  }

  function n(a) {
    return j(a[0], 8);
  }

  function o(a) {
    return a = M(Number(a)), [a < 0 ? 0 : a > 255 ? 255 : 255 & a];
  }

  function p(a) {
    return [255 & a, a >> 8 & 255];
  }

  function q(a) {
    return i(a[1] << 8 | a[0], 16);
  }

  function r(a) {
    return [255 & a, a >> 8 & 255];
  }

  function s(a) {
    return j(a[1] << 8 | a[0], 16);
  }

  function t(a) {
    return [255 & a, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255];
  }

  function u(a) {
    return i(a[3] << 24 | a[2] << 16 | a[1] << 8 | a[0], 32);
  }

  function v(a) {
    return [255 & a, a >> 8 & 255, a >> 16 & 255, a >> 24 & 255];
  }

  function w(a) {
    return j(a[3] << 24 | a[2] << 16 | a[1] << 8 | a[0], 32);
  }

  function x(a, b, c) {
    function d(a) {
      var b = H(a),
          c = a - b;
      return c < .5 ? b : c > .5 ? b + 1 : b % 2 ? b + 1 : b;
    }

    var e,
        f,
        g,
        h = (1 << b - 1) - 1;
    if (a !== a) f = (1 << b) - 1, g = L(2, c - 1), e = 0;else if (a === 1 / 0 || a === -(1 / 0)) f = (1 << b) - 1, g = 0, e = a < 0 ? 1 : 0;else if (0 === a) f = 0, g = 0, e = 1 / a === -(1 / 0) ? 1 : 0;else if (e = a < 0, a = G(a), a >= L(2, 1 - h)) {
      f = K(H(I(a) / F), 1023);
      var i = a / L(2, f);
      i < 1 && (f -= 1, i *= 2), i >= 2 && (f += 1, i /= 2);
      var j = L(2, c);
      g = d(i * j) - j, f += h, g / j >= 1 && (f += 1, g = 0), f > 2 * h && (f = (1 << b) - 1, g = 0);
    } else f = 0, g = d(a / L(2, 1 - h - c));
    var k,
        l = [];

    for (k = c; k; k -= 1) {
      l.push(g % 2 ? 1 : 0), g = H(g / 2);
    }

    for (k = b; k; k -= 1) {
      l.push(f % 2 ? 1 : 0), f = H(f / 2);
    }

    l.push(e ? 1 : 0), l.reverse();

    for (var m = l.join(""), n = []; m.length;) {
      n.unshift(parseInt(m.substring(0, 8), 2)), m = m.substring(8);
    }

    return n;
  }

  function y(a, b, c) {
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = [];

    for (d = 0; d < a.length; ++d) {
      for (f = a[d], e = 8; e; e -= 1) {
        l.push(f % 2 ? 1 : 0), f >>= 1;
      }
    }

    return l.reverse(), g = l.join(""), h = (1 << b - 1) - 1, i = parseInt(g.substring(0, 1), 2) ? -1 : 1, j = parseInt(g.substring(1, 1 + b), 2), k = parseInt(g.substring(1 + b), 2), j === (1 << b) - 1 ? 0 !== k ? NaN : i * (1 / 0) : j > 0 ? i * L(2, j - h) * (1 + k / L(2, c)) : 0 !== k ? i * L(2, -(h - 1)) * (k / L(2, c)) : i < 0 ? -0 : 0;
  }

  function z(a) {
    return y(a, 11, 52);
  }

  function A(a) {
    return x(a, 11, 52);
  }

  function B(a) {
    return y(a, 8, 23);
  }

  function C(a) {
    return x(a, 8, 23);
  }

  var D = void 0,
      E = 1e5,
      F = Math.LN2,
      G = Math.abs,
      H = Math.floor,
      I = Math.log,
      J = Math.max,
      K = Math.min,
      L = Math.pow,
      M = Math.round;
  !function () {
    var a = Object.defineProperty,
        b = !function () {
      try {
        return Object.defineProperty({}, "x", {});
      } catch (a) {
        return !1;
      }
    }();
    a && !b || (Object.defineProperty = function (b, c, d) {
      if (a) try {
        return a(b, c, d);
      } catch (a) {}
      if (b !== Object(b)) throw TypeError("Object.defineProperty called on non-object");
      return Object.prototype.__defineGetter__ && "get" in d && Object.prototype.__defineGetter__.call(b, c, d.get), Object.prototype.__defineSetter__ && "set" in d && Object.prototype.__defineSetter__.call(b, c, d.set), "value" in d && (b[c] = d.value), b;
    });
  }(), function () {
    function i(a) {
      if (a = f(a), a < 0) throw RangeError("ArrayBuffer size is not a small enough positive integer.");
      Object.defineProperty(this, "byteLength", {
        value: a
      }), Object.defineProperty(this, "_bytes", {
        value: Array(a)
      });

      for (var b = 0; b < a; b += 1) {
        this._bytes[b] = 0;
      }
    }

    function j() {
      if (!arguments.length || "object" != _typeof(arguments[0])) return function (a) {
        if (a = f(a), a < 0) throw RangeError("length is not a small enough positive integer.");
        Object.defineProperty(this, "length", {
          value: a
        }), Object.defineProperty(this, "byteLength", {
          value: a * this.BYTES_PER_ELEMENT
        }), Object.defineProperty(this, "buffer", {
          value: new i(this.byteLength)
        }), Object.defineProperty(this, "byteOffset", {
          value: 0
        });
      }.apply(this, arguments);
      if (arguments.length >= 1 && "object" === b(arguments[0]) && arguments[0] instanceof j) return function (a) {
        if (this.constructor !== a.constructor) throw TypeError();
        var b = a.length * this.BYTES_PER_ELEMENT;
        Object.defineProperty(this, "buffer", {
          value: new i(b)
        }), Object.defineProperty(this, "byteLength", {
          value: b
        }), Object.defineProperty(this, "byteOffset", {
          value: 0
        }), Object.defineProperty(this, "length", {
          value: a.length
        });

        for (var c = 0; c < this.length; c += 1) {
          this._setter(c, a._getter(c));
        }
      }.apply(this, arguments);
      if (arguments.length >= 1 && "object" === b(arguments[0]) && !(arguments[0] instanceof j) && !(arguments[0] instanceof i || "ArrayBuffer" === c(arguments[0]))) return function (a) {
        var b = a.length * this.BYTES_PER_ELEMENT;
        Object.defineProperty(this, "buffer", {
          value: new i(b)
        }), Object.defineProperty(this, "byteLength", {
          value: b
        }), Object.defineProperty(this, "byteOffset", {
          value: 0
        }), Object.defineProperty(this, "length", {
          value: a.length
        });

        for (var c = 0; c < this.length; c += 1) {
          var d = a[c];

          this._setter(c, Number(d));
        }
      }.apply(this, arguments);
      if (arguments.length >= 1 && "object" === b(arguments[0]) && (arguments[0] instanceof i || "ArrayBuffer" === c(arguments[0]))) return function (a, b, c) {
        if (b = g(b), b > a.byteLength) throw RangeError("byteOffset out of range");
        if (b % this.BYTES_PER_ELEMENT) throw RangeError("buffer length minus the byteOffset is not a multiple of the element size.");

        if (c === D) {
          var d = a.byteLength - b;
          if (d % this.BYTES_PER_ELEMENT) throw RangeError("length of buffer minus byteOffset not a multiple of the element size");
          c = d / this.BYTES_PER_ELEMENT;
        } else c = g(c), d = c * this.BYTES_PER_ELEMENT;

        if (b + d > a.byteLength) throw RangeError("byteOffset and length reference an area beyond the end of the buffer");
        Object.defineProperty(this, "buffer", {
          value: a
        }), Object.defineProperty(this, "byteLength", {
          value: d
        }), Object.defineProperty(this, "byteOffset", {
          value: b
        }), Object.defineProperty(this, "length", {
          value: c
        });
      }.apply(this, arguments);
      throw TypeError();
    }

    function x(a, b, c) {
      var d = function d() {
        Object.defineProperty(this, "constructor", {
          value: d
        }), j.apply(this, arguments), h(this);
      };

      "__proto__" in d ? d.__proto__ = j : (d.from = j.from, d.of = j.of), d.BYTES_PER_ELEMENT = a;

      var e = function e() {};

      return e.prototype = y, d.prototype = new e(), Object.defineProperty(d.prototype, "BYTES_PER_ELEMENT", {
        value: a
      }), Object.defineProperty(d.prototype, "_pack", {
        value: b
      }), Object.defineProperty(d.prototype, "_unpack", {
        value: c
      }), d;
    }

    a.ArrayBuffer = a.ArrayBuffer || i, Object.defineProperty(j, "from", {
      value: function value(a) {
        return new this(a);
      }
    }), Object.defineProperty(j, "of", {
      value: function value() {
        return new this(arguments);
      }
    });
    var y = {};
    j.prototype = y, Object.defineProperty(j.prototype, "_getter", {
      value: function value(a) {
        if (arguments.length < 1) throw SyntaxError("Not enough arguments");
        if (a = g(a), a >= this.length) return D;
        var b,
            c,
            d = [];

        for (b = 0, c = this.byteOffset + a * this.BYTES_PER_ELEMENT; b < this.BYTES_PER_ELEMENT; b += 1, c += 1) {
          d.push(this.buffer._bytes[c]);
        }

        return this._unpack(d);
      }
    }), Object.defineProperty(j.prototype, "get", {
      value: j.prototype._getter
    }), Object.defineProperty(j.prototype, "_setter", {
      value: function value(a, b) {
        if (arguments.length < 2) throw SyntaxError("Not enough arguments");

        if (a = g(a), !(a >= this.length)) {
          var c,
              d,
              e = this._pack(b);

          for (c = 0, d = this.byteOffset + a * this.BYTES_PER_ELEMENT; c < this.BYTES_PER_ELEMENT; c += 1, d += 1) {
            this.buffer._bytes[d] = e[c];
          }
        }
      }
    }), Object.defineProperty(j.prototype, "constructor", {
      value: j
    }), Object.defineProperty(j.prototype, "copyWithin", {
      value: function value(a, b) {
        var c = arguments[2],
            d = e(this),
            h = d.length,
            i = g(h);
        i = J(i, 0);
        var j,
            k = f(a);
        j = k < 0 ? J(i + k, 0) : K(k, i);
        var l,
            m = f(b);
        l = m < 0 ? J(i + m, 0) : K(m, i);
        var n;
        n = c === D ? i : f(c);
        var o;
        o = n < 0 ? J(i + n, 0) : K(n, i);
        var p,
            q = K(o - l, i - j);

        for (l < j && j < l + q ? (p = -1, l = l + q - 1, j = j + q - 1) : p = 1; q > 0;) {
          d._setter(j, d._getter(l)), l += p, j += p, q -= 1;
        }

        return d;
      }
    }), Object.defineProperty(j.prototype, "every", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();
        var b = Object(this),
            c = g(b.length);
        if (!d(a)) throw TypeError();

        for (var e = arguments[1], f = 0; f < c; f++) {
          if (!a.call(e, b._getter(f), f, b)) return !1;
        }

        return !0;
      }
    }), Object.defineProperty(j.prototype, "fill", {
      value: function value(a) {
        var b = arguments[1],
            c = arguments[2],
            d = e(this),
            h = d.length,
            i = g(h);
        i = J(i, 0);
        var j,
            k = f(b);
        j = k < 0 ? J(i + k, 0) : K(k, i);
        var l;
        l = c === D ? i : f(c);
        var m;

        for (m = l < 0 ? J(i + l, 0) : K(l, i); j < m;) {
          d._setter(j, a), j += 1;
        }

        return d;
      }
    }), Object.defineProperty(j.prototype, "filter", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();
        var b = Object(this),
            c = g(b.length);
        if (!d(a)) throw TypeError();

        for (var e = [], f = arguments[1], h = 0; h < c; h++) {
          var i = b._getter(h);

          a.call(f, i, h, b) && e.push(i);
        }

        return new this.constructor(e);
      }
    }), Object.defineProperty(j.prototype, "find", {
      value: function value(a) {
        var b = e(this),
            c = b.length,
            f = g(c);
        if (!d(a)) throw TypeError();

        for (var h = arguments.length > 1 ? arguments[1] : D, i = 0; i < f;) {
          var j = b._getter(i),
              k = a.call(h, j, i, b);

          if (Boolean(k)) return j;
          ++i;
        }

        return D;
      }
    }), Object.defineProperty(j.prototype, "findIndex", {
      value: function value(a) {
        var b = e(this),
            c = b.length,
            f = g(c);
        if (!d(a)) throw TypeError();

        for (var h = arguments.length > 1 ? arguments[1] : D, i = 0; i < f;) {
          var j = b._getter(i),
              k = a.call(h, j, i, b);

          if (Boolean(k)) return i;
          ++i;
        }

        return -1;
      }
    }), Object.defineProperty(j.prototype, "forEach", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();
        var b = Object(this),
            c = g(b.length);
        if (!d(a)) throw TypeError();

        for (var e = arguments[1], f = 0; f < c; f++) {
          a.call(e, b._getter(f), f, b);
        }
      }
    }), Object.defineProperty(j.prototype, "indexOf", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();
        var b = Object(this),
            c = g(b.length);
        if (0 === c) return -1;
        var d = 0;
        if (arguments.length > 0 && (d = Number(arguments[1]), d !== d ? d = 0 : 0 !== d && d !== 1 / 0 && d !== -(1 / 0) && (d = (d > 0 || -1) * H(G(d)))), d >= c) return -1;

        for (var e = d >= 0 ? d : J(c - G(d), 0); e < c; e++) {
          if (b._getter(e) === a) return e;
        }

        return -1;
      }
    }), Object.defineProperty(j.prototype, "join", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();

        for (var b = Object(this), c = g(b.length), d = Array(c), e = 0; e < c; ++e) {
          d[e] = b._getter(e);
        }

        return d.join(a === D ? "," : a);
      }
    }), Object.defineProperty(j.prototype, "lastIndexOf", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();
        var b = Object(this),
            c = g(b.length);
        if (0 === c) return -1;
        var d = c;
        arguments.length > 1 && (d = Number(arguments[1]), d !== d ? d = 0 : 0 !== d && d !== 1 / 0 && d !== -(1 / 0) && (d = (d > 0 || -1) * H(G(d))));

        for (var e = d >= 0 ? K(d, c - 1) : c - G(d); e >= 0; e--) {
          if (b._getter(e) === a) return e;
        }

        return -1;
      }
    }), Object.defineProperty(j.prototype, "map", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();
        var b = Object(this),
            c = g(b.length);
        if (!d(a)) throw TypeError();
        var e = [];
        e.length = c;

        for (var f = arguments[1], h = 0; h < c; h++) {
          e[h] = a.call(f, b._getter(h), h, b);
        }

        return new this.constructor(e);
      }
    }), Object.defineProperty(j.prototype, "reduce", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();
        var b = Object(this),
            c = g(b.length);
        if (!d(a)) throw TypeError();
        if (0 === c && 1 === arguments.length) throw TypeError();
        var e,
            f = 0;

        for (e = arguments.length >= 2 ? arguments[1] : b._getter(f++); f < c;) {
          e = a.call(D, e, b._getter(f), f, b), f++;
        }

        return e;
      }
    }), Object.defineProperty(j.prototype, "reduceRight", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();
        var b = Object(this),
            c = g(b.length);
        if (!d(a)) throw TypeError();
        if (0 === c && 1 === arguments.length) throw TypeError();
        var e,
            f = c - 1;

        for (e = arguments.length >= 2 ? arguments[1] : b._getter(f--); f >= 0;) {
          e = a.call(D, e, b._getter(f), f, b), f--;
        }

        return e;
      }
    }), Object.defineProperty(j.prototype, "reverse", {
      value: function value() {
        if (this === D || null === this) throw TypeError();

        for (var a = Object(this), b = g(a.length), c = H(b / 2), d = 0, e = b - 1; d < c; ++d, --e) {
          var f = a._getter(d);

          a._setter(d, a._getter(e)), a._setter(e, f);
        }

        return a;
      }
    }), Object.defineProperty(j.prototype, "set", {
      value: function value(a, b) {
        if (arguments.length < 1) throw SyntaxError("Not enough arguments");
        var c, d, e, f, h, i, j, k, l, m;

        if ("object" == _typeof(arguments[0]) && arguments[0].constructor === this.constructor) {
          if (c = arguments[0], e = g(arguments[1]), e + c.length > this.length) throw RangeError("Offset plus length of array is out of range");

          if (k = this.byteOffset + e * this.BYTES_PER_ELEMENT, l = c.length * this.BYTES_PER_ELEMENT, c.buffer === this.buffer) {
            for (m = [], h = 0, i = c.byteOffset; h < l; h += 1, i += 1) {
              m[h] = c.buffer._bytes[i];
            }

            for (h = 0, j = k; h < l; h += 1, j += 1) {
              this.buffer._bytes[j] = m[h];
            }
          } else for (h = 0, i = c.byteOffset, j = k; h < l; h += 1, i += 1, j += 1) {
            this.buffer._bytes[j] = c.buffer._bytes[i];
          }
        } else {
          if ("object" != _typeof(arguments[0]) || "undefined" == typeof arguments[0].length) throw TypeError("Unexpected argument type(s)");
          if (d = arguments[0], f = g(d.length), e = g(arguments[1]), e + f > this.length) throw RangeError("Offset plus length of array is out of range");

          for (h = 0; h < f; h += 1) {
            i = d[h], this._setter(e + h, Number(i));
          }
        }
      }
    }), Object.defineProperty(j.prototype, "slice", {
      value: function value(a, b) {
        for (var c = e(this), d = c.length, h = g(d), i = f(a), j = i < 0 ? J(h + i, 0) : K(i, h), k = b === D ? h : f(b), l = k < 0 ? J(h + k, 0) : K(k, h), m = l - j, n = c.constructor, o = new n(m), p = 0; j < l;) {
          var q = c._getter(j);

          o._setter(p, q), ++j, ++p;
        }

        return o;
      }
    }), Object.defineProperty(j.prototype, "some", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();
        var b = Object(this),
            c = g(b.length);
        if (!d(a)) throw TypeError();

        for (var e = arguments[1], f = 0; f < c; f++) {
          if (a.call(e, b._getter(f), f, b)) return !0;
        }

        return !1;
      }
    }), Object.defineProperty(j.prototype, "sort", {
      value: function value(a) {
        if (this === D || null === this) throw TypeError();

        for (var b = Object(this), c = g(b.length), d = Array(c), e = 0; e < c; ++e) {
          d[e] = b._getter(e);
        }

        for (a ? d.sort(a) : d.sort(), e = 0; e < c; ++e) {
          b._setter(e, d[e]);
        }

        return b;
      }
    }), Object.defineProperty(j.prototype, "subarray", {
      value: function value(a, b) {
        function c(a, b, c) {
          return a < b ? b : a > c ? c : a;
        }

        a = f(a), b = f(b), arguments.length < 1 && (a = 0), arguments.length < 2 && (b = this.length), a < 0 && (a = this.length + a), b < 0 && (b = this.length + b), a = c(a, 0, this.length), b = c(b, 0, this.length);
        var d = b - a;
        return d < 0 && (d = 0), new this.constructor(this.buffer, this.byteOffset + a * this.BYTES_PER_ELEMENT, d);
      }
    });
    var E = x(1, k, l),
        F = x(1, m, n),
        I = x(1, o, n),
        L = x(2, p, q),
        M = x(2, r, s),
        N = x(4, t, u),
        O = x(4, v, w),
        P = x(4, C, B),
        Q = x(8, A, z);
    a.Int8Array = a.Int8Array || E, a.Uint8Array = a.Uint8Array || F, a.Uint8ClampedArray = a.Uint8ClampedArray || I, a.Int16Array = a.Int16Array || L, a.Uint16Array = a.Uint16Array || M, a.Int32Array = a.Int32Array || N, a.Uint32Array = a.Uint32Array || O, a.Float32Array = a.Float32Array || P, a.Float64Array = a.Float64Array || Q;
  }(), function () {
    function b(a, b) {
      return d(a.get) ? a.get(b) : a[b];
    }

    function e(a, b, d) {
      if (!(a instanceof ArrayBuffer || "ArrayBuffer" === c(a))) throw TypeError();
      if (b = g(b), b > a.byteLength) throw RangeError("byteOffset out of range");
      if (d = d === D ? a.byteLength - b : g(d), b + d > a.byteLength) throw RangeError("byteOffset and length reference an area beyond the end of the buffer");
      Object.defineProperty(this, "buffer", {
        value: a
      }), Object.defineProperty(this, "byteLength", {
        value: d
      }), Object.defineProperty(this, "byteOffset", {
        value: b
      });
    }

    function f(a) {
      return function (c, d) {
        if (c = g(c), c + a.BYTES_PER_ELEMENT > this.byteLength) throw RangeError("Array index out of range");
        c += this.byteOffset;

        for (var e = new Uint8Array(this.buffer, c, a.BYTES_PER_ELEMENT), f = [], h = 0; h < a.BYTES_PER_ELEMENT; h += 1) {
          f.push(b(e, h));
        }

        return Boolean(d) === Boolean(i) && f.reverse(), b(new a(new Uint8Array(f).buffer), 0);
      };
    }

    function h(a) {
      return function (c, d, e) {
        if (c = g(c), c + a.BYTES_PER_ELEMENT > this.byteLength) throw RangeError("Array index out of range");
        var f,
            h,
            j = new a([d]),
            k = new Uint8Array(j.buffer),
            l = [];

        for (f = 0; f < a.BYTES_PER_ELEMENT; f += 1) {
          l.push(b(k, f));
        }

        Boolean(e) === Boolean(i) && l.reverse(), h = new Uint8Array(this.buffer, c, a.BYTES_PER_ELEMENT), h.set(l);
      };
    }

    var i = function () {
      var a = new Uint16Array([4660]),
          c = new Uint8Array(a.buffer);
      return 18 === b(c, 0);
    }();

    Object.defineProperty(e.prototype, "getUint8", {
      value: f(Uint8Array)
    }), Object.defineProperty(e.prototype, "getInt8", {
      value: f(Int8Array)
    }), Object.defineProperty(e.prototype, "getUint16", {
      value: f(Uint16Array)
    }), Object.defineProperty(e.prototype, "getInt16", {
      value: f(Int16Array)
    }), Object.defineProperty(e.prototype, "getUint32", {
      value: f(Uint32Array)
    }), Object.defineProperty(e.prototype, "getInt32", {
      value: f(Int32Array)
    }), Object.defineProperty(e.prototype, "getFloat32", {
      value: f(Float32Array)
    }), Object.defineProperty(e.prototype, "getFloat64", {
      value: f(Float64Array)
    }), Object.defineProperty(e.prototype, "setUint8", {
      value: h(Uint8Array)
    }), Object.defineProperty(e.prototype, "setInt8", {
      value: h(Int8Array)
    }), Object.defineProperty(e.prototype, "setUint16", {
      value: h(Uint16Array)
    }), Object.defineProperty(e.prototype, "setInt16", {
      value: h(Int16Array)
    }), Object.defineProperty(e.prototype, "setUint32", {
      value: h(Uint32Array)
    }), Object.defineProperty(e.prototype, "setInt32", {
      value: h(Int32Array)
    }), Object.defineProperty(e.prototype, "setFloat32", {
      value: h(Float32Array)
    }), Object.defineProperty(e.prototype, "setFloat64", {
      value: h(Float64Array)
    }), a.DataView = a.DataView || e;
  }();
}(self), function (a) {

  function b(a, b) {
    return a = 0 | a || 0, a < 0 ? Math.max(a + b, 0) : Math.min(a, b);
  }

  ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice = function (c, d) {
    var e = this.byteLength,
        f = b(c, e),
        g = e;
    if (d !== a && (g = b(d, e)), f > g) return new ArrayBuffer(0);
    var h = g - f,
        i = new ArrayBuffer(h),
        j = new Uint8Array(i),
        k = new Uint8Array(this, f, h);
    return j.set(k), i;
  });
}(), "undefined" != typeof module && module.exports && (undefined["encoding-indexes"] = require("./encoding-indexes.js")["encoding-indexes"]), function (a) {

  function b(a, b, c) {
    return b <= a && a <= c;
  }

  function c(a, b) {
    return a.indexOf(b) !== -1;
  }

  function d(a) {
    if (void 0 === a) return {};
    if (a === Object(a)) return a;
    throw TypeError("Could not convert argument to dictionary");
  }

  function e(a) {
    for (var b = String(a), c = b.length, d = 0, e = []; d < c;) {
      var f = b.charCodeAt(d);
      if (f < 55296 || f > 57343) e.push(f);else if (56320 <= f && f <= 57343) e.push(65533);else if (55296 <= f && f <= 56319) if (d === c - 1) e.push(65533);else {
        var g = a.charCodeAt(d + 1);

        if (56320 <= g && g <= 57343) {
          var h = 1023 & f,
              i = 1023 & g;
          e.push(65536 + (h << 10) + i), d += 1;
        } else e.push(65533);
      }
      d += 1;
    }

    return e;
  }

  function f(a) {
    for (var b = "", c = 0; c < a.length; ++c) {
      var d = a[c];
      d <= 65535 ? b += String.fromCharCode(d) : (d -= 65536, b += String.fromCharCode((d >> 10) + 55296, (1023 & d) + 56320));
    }

    return b;
  }

  function g(a) {
    return 0 <= a && a <= 127;
  }

  function h(a) {
    this.tokens = [].slice.call(a), this.tokens.reverse();
  }

  function i(a, b) {
    if (a) throw TypeError("Decoder error");
    return b || 65533;
  }

  function j(a) {
    throw TypeError("The code point " + a + " could not be encoded.");
  }

  function m(a) {
    return a = String(a).trim().toLowerCase(), Object.prototype.hasOwnProperty.call(W, a) ? W[a] : null;
  }

  function n(a, b) {
    return b ? b[a] || null : null;
  }

  function o(a, b) {
    var c = b.indexOf(a);
    return c === -1 ? null : c;
  }

  function p(b) {
    if (!("encoding-indexes" in a)) throw Error("Indexes missing. Did you forget to include encoding-indexes.js?");
    return a["encoding-indexes"][b];
  }

  function q(a) {
    if (a > 39419 && a < 189e3 || a > 1237575) return null;
    if (7457 === a) return 59335;
    var b,
        c = 0,
        d = 0,
        e = p("gb18030");

    for (b = 0; b < e.length; ++b) {
      var f = e[b];
      if (!(f[0] <= a)) break;
      c = f[0], d = f[1];
    }

    return d + a - c;
  }

  function r(a) {
    if (59335 === a) return 7457;
    var b,
        c = 0,
        d = 0,
        e = p("gb18030");

    for (b = 0; b < e.length; ++b) {
      var f = e[b];
      if (!(f[1] <= a)) break;
      c = f[1], d = f[0];
    }

    return d + a - c;
  }

  function s(a) {
    var c = o(a, p("jis0208"));
    return null === c || b(c, 8272, 8835) ? null : c;
  }

  function t(a) {
    var b = p("big5");
    return 9552 === a || 9566 === a || 9569 === a || 9578 === a || 21313 === a || 21317 === a ? b.lastIndexOf(a) : o(a, b);
  }

  function u(a, b) {
    if (!(this instanceof u)) throw TypeError("Called as a function. Did you forget 'new'?");
    a = void 0 !== a ? String(a) : Z, b = d(b), this._encoding = null, this._decoder = null, this._ignoreBOM = !1, this._BOMseen = !1, this._error_mode = "replacement", this._do_not_flush = !1;
    var c = m(a);
    if (null === c || "replacement" === c.name) throw RangeError("Unknown encoding: " + a);
    if (!Y[c.name]) throw Error("Decoder not present. Did you forget to include encoding-indexes.js?");
    var e = this;
    return e._encoding = c, Boolean(b.fatal) && (e._error_mode = "fatal"), Boolean(b.ignoreBOM) && (e._ignoreBOM = !0), Object.defineProperty || (this.encoding = e._encoding.name.toLowerCase(), this.fatal = "fatal" === e._error_mode, this.ignoreBOM = e._ignoreBOM), e;
  }

  function v(b, c) {
    if (!(this instanceof v)) throw TypeError("Called as a function. Did you forget 'new'?");
    c = d(c), this._encoding = null, this._encoder = null, this._do_not_flush = !1, this._fatal = Boolean(c.fatal) ? "fatal" : "replacement";
    var e = this;

    if (Boolean(c.NONSTANDARD_allowLegacyEncoding)) {
      b = void 0 !== b ? String(b) : Z;
      var f = m(b);
      if (null === f || "replacement" === f.name) throw RangeError("Unknown encoding: " + b);
      if (!X[f.name]) throw Error("Encoder not present. Did you forget to include encoding-indexes.js?");
      e._encoding = f;
    } else e._encoding = m("utf-8"), void 0 !== b && "console" in a && console.warn("TextEncoder constructor called with encoding label, which is ignored.");

    return Object.defineProperty || (this.encoding = e._encoding.name.toLowerCase()), e;
  }

  function w(a) {
    var c = a.fatal,
        d = 0,
        e = 0,
        f = 0,
        g = 128,
        h = 191;

    this.handler = function (a, j) {
      if (j === T && 0 !== f) return f = 0, i(c);
      if (j === T) return U;

      if (0 === f) {
        if (b(j, 0, 127)) return j;
        if (b(j, 194, 223)) f = 1, d = j - 192;else if (b(j, 224, 239)) 224 === j && (g = 160), 237 === j && (h = 159), f = 2, d = j - 224;else {
          if (!b(j, 240, 244)) return i(c);
          240 === j && (g = 144), 244 === j && (h = 143), f = 3, d = j - 240;
        }
        return d <<= 6 * f, null;
      }

      if (!b(j, g, h)) return d = f = e = 0, g = 128, h = 191, a.prepend(j), i(c);
      if (g = 128, h = 191, e += 1, d += j - 128 << 6 * (f - e), e !== f) return null;
      var k = d;
      return d = f = e = 0, k;
    };
  }

  function x(a) {
    a.fatal;

    this.handler = function (a, c) {
      if (c === T) return U;
      if (b(c, 0, 127)) return c;
      var d, e;
      b(c, 128, 2047) ? (d = 1, e = 192) : b(c, 2048, 65535) ? (d = 2, e = 224) : b(c, 65536, 1114111) && (d = 3, e = 240);

      for (var f = [(c >> 6 * d) + e]; d > 0;) {
        var g = c >> 6 * (d - 1);
        f.push(128 | 63 & g), d -= 1;
      }

      return f;
    };
  }

  function y(a, b) {
    var c = b.fatal;

    this.handler = function (b, d) {
      if (d === T) return U;
      if (g(d)) return d;
      var e = a[d - 128];
      return null === e ? i(c) : e;
    };
  }

  function z(a, b) {
    b.fatal;

    this.handler = function (b, c) {
      if (c === T) return U;
      if (S(c)) return c;
      var d = o(c, a);
      return null === d && j(c), d + 128;
    };
  }

  function A(a) {
    var c = a.fatal,
        d = 0,
        e = 0,
        f = 0;

    this.handler = function (a, h) {
      if (h === T && 0 === d && 0 === e && 0 === f) return U;
      h !== T || 0 === d && 0 === e && 0 === f || (d = 0, e = 0, f = 0, i(c));
      var j;

      if (0 !== f) {
        j = null, b(h, 48, 57) && (j = q(10 * (126 * (10 * (d - 129) + (e - 48)) + (f - 129)) + h - 48));
        var k = [e, f, h];
        return d = 0, e = 0, f = 0, null === j ? (a.prepend(k), i(c)) : j;
      }

      if (0 !== e) return b(h, 129, 254) ? (f = h, null) : (a.prepend([e, h]), d = 0, e = 0, i(c));

      if (0 !== d) {
        if (b(h, 48, 57)) return e = h, null;
        var l = d,
            m = null;
        d = 0;
        var o = h < 127 ? 64 : 65;
        return (b(h, 64, 126) || b(h, 128, 254)) && (m = 190 * (l - 129) + (h - o)), j = null === m ? null : n(m, p("gb18030")), null === j && g(h) && a.prepend(h), null === j ? i(c) : j;
      }

      return g(h) ? h : 128 === h ? 8364 : b(h, 129, 254) ? (d = h, null) : i(c);
    };
  }

  function B(a, b) {
    a.fatal;

    this.handler = function (a, c) {
      if (c === T) return U;
      if (S(c)) return c;
      if (58853 === c) return j(c);
      if (b && 8364 === c) return 128;
      var d = o(c, p("gb18030"));

      if (null !== d) {
        var e = R(d / 190) + 129,
            f = d % 190,
            g = f < 63 ? 64 : 65;
        return [e, f + g];
      }

      if (b) return j(c);
      d = r(c);
      var h = R(d / 10 / 126 / 10);
      d -= 10 * h * 126 * 10;
      var i = R(d / 10 / 126);
      d -= 10 * i * 126;
      var k = R(d / 10),
          l = d - 10 * k;
      return [h + 129, i + 48, k + 129, l + 48];
    };
  }

  function C(a) {
    var c = a.fatal,
        d = 0;

    this.handler = function (a, e) {
      if (e === T && 0 !== d) return d = 0, i(c);
      if (e === T && 0 === d) return U;

      if (0 !== d) {
        var f = d,
            h = null;
        d = 0;
        var j = e < 127 ? 64 : 98;

        switch ((b(e, 64, 126) || b(e, 161, 254)) && (h = 157 * (f - 129) + (e - j)), h) {
          case 1133:
            return [202, 772];

          case 1135:
            return [202, 780];

          case 1164:
            return [234, 772];

          case 1166:
            return [234, 780];
        }

        var k = null === h ? null : n(h, p("big5"));
        return null === k && g(e) && a.prepend(e), null === k ? i(c) : k;
      }

      return g(e) ? e : b(e, 129, 254) ? (d = e, null) : i(c);
    };
  }

  function D(a) {
    a.fatal;

    this.handler = function (a, b) {
      if (b === T) return U;
      if (S(b)) return b;
      var c = t(b);
      if (null === c) return j(b);
      var d = R(c / 157) + 129;
      if (d < 161) return j(b);
      var e = c % 157,
          f = e < 63 ? 64 : 98;
      return [d, e + f];
    };
  }

  function E(a) {
    var c = a.fatal,
        d = !1,
        e = 0;

    this.handler = function (a, f) {
      if (f === T && 0 !== e) return e = 0, i(c);
      if (f === T && 0 === e) return U;
      if (142 === e && b(f, 161, 223)) return e = 0, 65377 + f - 161;
      if (143 === e && b(f, 161, 254)) return d = !0, e = f, null;

      if (0 !== e) {
        var h = e;
        e = 0;
        var j = null;
        return b(h, 161, 254) && b(f, 161, 254) && (j = n(94 * (h - 161) + (f - 161), p(d ? "jis0212" : "jis0208"))), d = !1, b(f, 161, 254) || a.prepend(f), null === j ? i(c) : j;
      }

      return g(f) ? f : 142 === f || 143 === f || b(f, 161, 254) ? (e = f, null) : i(c);
    };
  }

  function F(a) {
    a.fatal;

    this.handler = function (a, c) {
      if (c === T) return U;
      if (S(c)) return c;
      if (165 === c) return 92;
      if (8254 === c) return 126;
      if (b(c, 65377, 65439)) return [142, c - 65377 + 161];
      8722 === c && (c = 65293);
      var d = o(c, p("jis0208"));
      if (null === d) return j(c);
      var e = R(d / 94) + 161,
          f = d % 94 + 161;
      return [e, f];
    };
  }

  function G(a) {
    var c = a.fatal,
        d = {
      ASCII: 0,
      Roman: 1,
      Katakana: 2,
      LeadByte: 3,
      TrailByte: 4,
      EscapeStart: 5,
      Escape: 6
    },
        e = d.ASCII,
        f = d.ASCII,
        g = 0,
        h = !1;

    this.handler = function (a, j) {
      switch (e) {
        default:
        case d.ASCII:
          return 27 === j ? (e = d.EscapeStart, null) : b(j, 0, 127) && 14 !== j && 15 !== j && 27 !== j ? (h = !1, j) : j === T ? U : (h = !1, i(c));

        case d.Roman:
          return 27 === j ? (e = d.EscapeStart, null) : 92 === j ? (h = !1, 165) : 126 === j ? (h = !1, 8254) : b(j, 0, 127) && 14 !== j && 15 !== j && 27 !== j && 92 !== j && 126 !== j ? (h = !1, j) : j === T ? U : (h = !1, i(c));

        case d.Katakana:
          return 27 === j ? (e = d.EscapeStart, null) : b(j, 33, 95) ? (h = !1, 65377 + j - 33) : j === T ? U : (h = !1, i(c));

        case d.LeadByte:
          return 27 === j ? (e = d.EscapeStart, null) : b(j, 33, 126) ? (h = !1, g = j, e = d.TrailByte, null) : j === T ? U : (h = !1, i(c));

        case d.TrailByte:
          if (27 === j) return e = d.EscapeStart, i(c);

          if (b(j, 33, 126)) {
            e = d.LeadByte;
            var k = 94 * (g - 33) + j - 33,
                l = n(k, p("jis0208"));
            return null === l ? i(c) : l;
          }

          return j === T ? (e = d.LeadByte, a.prepend(j), i(c)) : (e = d.LeadByte, i(c));

        case d.EscapeStart:
          return 36 === j || 40 === j ? (g = j, e = d.Escape, null) : (a.prepend(j), h = !1, e = f, i(c));

        case d.Escape:
          var m = g;
          g = 0;
          var o = null;

          if (40 === m && 66 === j && (o = d.ASCII), 40 === m && 74 === j && (o = d.Roman), 40 === m && 73 === j && (o = d.Katakana), 36 !== m || 64 !== j && 66 !== j || (o = d.LeadByte), null !== o) {
            e = e = o;
            var q = h;
            return h = !0, q ? i(c) : null;
          }

          return a.prepend([m, j]), h = !1, e = f, i(c);
      }
    };
  }

  function H(a) {
    var b = (a.fatal, {
      ASCII: 0,
      Roman: 1,
      jis0208: 2
    }),
        c = b.ASCII;

    this.handler = function (a, d) {
      if (d === T && c !== b.ASCII) return a.prepend(d), c = b.ASCII, [27, 40, 66];
      if (d === T && c === b.ASCII) return U;
      if (!(c !== b.ASCII && c !== b.Roman || 14 !== d && 15 !== d && 27 !== d)) return j(65533);
      if (c === b.ASCII && S(d)) return d;

      if (c === b.Roman && (S(d) && 92 !== d && 126 !== d || 165 == d || 8254 == d)) {
        if (S(d)) return d;
        if (165 === d) return 92;
        if (8254 === d) return 126;
      }

      if (S(d) && c !== b.ASCII) return a.prepend(d), c = b.ASCII, [27, 40, 66];
      if ((165 === d || 8254 === d) && c !== b.Roman) return a.prepend(d), c = b.Roman, [27, 40, 74];
      8722 === d && (d = 65293);
      var e = o(d, p("jis0208"));
      if (null === e) return j(d);
      if (c !== b.jis0208) return a.prepend(d), c = b.jis0208, [27, 36, 66];
      var f = R(e / 94) + 33,
          g = e % 94 + 33;
      return [f, g];
    };
  }

  function I(a) {
    var c = a.fatal,
        d = 0;

    this.handler = function (a, e) {
      if (e === T && 0 !== d) return d = 0, i(c);
      if (e === T && 0 === d) return U;

      if (0 !== d) {
        var f = d,
            h = null;
        d = 0;
        var j = e < 127 ? 64 : 65,
            k = f < 160 ? 129 : 193;
        (b(e, 64, 126) || b(e, 128, 252)) && (h = 188 * (f - k) + e - j);
        var l = null === h ? null : n(h, p("jis0208"));
        return null === l && null !== h && b(h, 8836, 10528) ? 57344 + h - 8836 : (null === l && g(e) && a.prepend(e), null === l ? i(c) : l);
      }

      return g(e) || 128 === e ? e : b(e, 161, 223) ? 65377 + e - 161 : b(e, 129, 159) || b(e, 224, 252) ? (d = e, null) : i(c);
    };
  }

  function J(a) {
    a.fatal;

    this.handler = function (a, c) {
      if (c === T) return U;
      if (S(c) || 128 === c) return c;
      if (165 === c) return 92;
      if (8254 === c) return 126;
      if (b(c, 65377, 65439)) return c - 65377 + 161;
      8722 === c && (c = 65293);
      var d = s(c);
      if (null === d) return j(c);
      var e = R(d / 188),
          f = e < 31 ? 129 : 193,
          g = d % 188,
          h = g < 63 ? 64 : 65;
      return [e + f, g + h];
    };
  }

  function K(a) {
    var c = a.fatal,
        d = 0;

    this.handler = function (a, e) {
      if (e === T && 0 !== d) return d = 0, i(c);
      if (e === T && 0 === d) return U;

      if (0 !== d) {
        var f = d,
            h = null;
        d = 0, b(e, 65, 254) && (h = 190 * (f - 129) + (e - 65));
        var j = null === h ? null : n(h, p("euc-kr"));
        return null === h && g(e) && a.prepend(e), null === j ? i(c) : j;
      }

      return g(e) ? e : b(e, 129, 254) ? (d = e, null) : i(c);
    };
  }

  function L(a) {
    a.fatal;

    this.handler = function (a, b) {
      if (b === T) return U;
      if (S(b)) return b;
      var c = o(b, p("euc-kr"));
      if (null === c) return j(b);
      var d = R(c / 190) + 129,
          e = c % 190 + 65;
      return [d, e];
    };
  }

  function M(a, b) {
    var c = a >> 8,
        d = 255 & a;
    return b ? [c, d] : [d, c];
  }

  function N(a, c) {
    var d = c.fatal,
        e = null,
        f = null;

    this.handler = function (c, g) {
      if (g === T && (null !== e || null !== f)) return i(d);
      if (g === T && null === e && null === f) return U;
      if (null === e) return e = g, null;
      var h;

      if (h = a ? (e << 8) + g : (g << 8) + e, e = null, null !== f) {
        var j = f;
        return f = null, b(h, 56320, 57343) ? 65536 + 1024 * (j - 55296) + (h - 56320) : (c.prepend(M(h, a)), i(d));
      }

      return b(h, 55296, 56319) ? (f = h, null) : b(h, 56320, 57343) ? i(d) : h;
    };
  }

  function O(a, c) {
    c.fatal;

    this.handler = function (c, d) {
      if (d === T) return U;
      if (b(d, 0, 65535)) return M(d, a);
      var e = M((d - 65536 >> 10) + 55296, a),
          f = M((d - 65536 & 1023) + 56320, a);
      return e.concat(f);
    };
  }

  function P(a) {
    a.fatal;

    this.handler = function (a, b) {
      return b === T ? U : g(b) ? b : 63360 + b - 128;
    };
  }

  function Q(a) {
    a.fatal;

    this.handler = function (a, c) {
      return c === T ? U : S(c) ? c : b(c, 63360, 63487) ? c - 63360 + 128 : j(c);
    };
  }

  var R = Math.floor,
      S = g,
      T = -1;
  h.prototype = {
    endOfStream: function endOfStream() {
      return !this.tokens.length;
    },
    read: function read() {
      return this.tokens.length ? this.tokens.pop() : T;
    },
    prepend: function prepend(a) {
      if (Array.isArray(a)) for (var b = a; b.length;) {
        this.tokens.push(b.pop());
      } else this.tokens.push(a);
    },
    push: function push(a) {
      if (Array.isArray(a)) for (var b = a; b.length;) {
        this.tokens.unshift(b.shift());
      } else this.tokens.unshift(a);
    }
  };
  var U = -1;
  var V = [{
    encodings: [{
      labels: ["unicode-1-1-utf-8", "utf-8", "utf8"],
      name: "UTF-8"
    }],
    heading: "The Encoding"
  }, {
    encodings: [{
      labels: ["866", "cp866", "csibm866", "ibm866"],
      name: "IBM866"
    }, {
      labels: ["csisolatin2", "iso-8859-2", "iso-ir-101", "iso8859-2", "iso88592", "iso_8859-2", "iso_8859-2:1987", "l2", "latin2"],
      name: "ISO-8859-2"
    }, {
      labels: ["csisolatin3", "iso-8859-3", "iso-ir-109", "iso8859-3", "iso88593", "iso_8859-3", "iso_8859-3:1988", "l3", "latin3"],
      name: "ISO-8859-3"
    }, {
      labels: ["csisolatin4", "iso-8859-4", "iso-ir-110", "iso8859-4", "iso88594", "iso_8859-4", "iso_8859-4:1988", "l4", "latin4"],
      name: "ISO-8859-4"
    }, {
      labels: ["csisolatincyrillic", "cyrillic", "iso-8859-5", "iso-ir-144", "iso8859-5", "iso88595", "iso_8859-5", "iso_8859-5:1988"],
      name: "ISO-8859-5"
    }, {
      labels: ["arabic", "asmo-708", "csiso88596e", "csiso88596i", "csisolatinarabic", "ecma-114", "iso-8859-6", "iso-8859-6-e", "iso-8859-6-i", "iso-ir-127", "iso8859-6", "iso88596", "iso_8859-6", "iso_8859-6:1987"],
      name: "ISO-8859-6"
    }, {
      labels: ["csisolatingreek", "ecma-118", "elot_928", "greek", "greek8", "iso-8859-7", "iso-ir-126", "iso8859-7", "iso88597", "iso_8859-7", "iso_8859-7:1987", "sun_eu_greek"],
      name: "ISO-8859-7"
    }, {
      labels: ["csiso88598e", "csisolatinhebrew", "hebrew", "iso-8859-8", "iso-8859-8-e", "iso-ir-138", "iso8859-8", "iso88598", "iso_8859-8", "iso_8859-8:1988", "visual"],
      name: "ISO-8859-8"
    }, {
      labels: ["csiso88598i", "iso-8859-8-i", "logical"],
      name: "ISO-8859-8-I"
    }, {
      labels: ["csisolatin6", "iso-8859-10", "iso-ir-157", "iso8859-10", "iso885910", "l6", "latin6"],
      name: "ISO-8859-10"
    }, {
      labels: ["iso-8859-13", "iso8859-13", "iso885913"],
      name: "ISO-8859-13"
    }, {
      labels: ["iso-8859-14", "iso8859-14", "iso885914"],
      name: "ISO-8859-14"
    }, {
      labels: ["csisolatin9", "iso-8859-15", "iso8859-15", "iso885915", "iso_8859-15", "l9"],
      name: "ISO-8859-15"
    }, {
      labels: ["iso-8859-16"],
      name: "ISO-8859-16"
    }, {
      labels: ["cskoi8r", "koi", "koi8", "koi8-r", "koi8_r"],
      name: "KOI8-R"
    }, {
      labels: ["koi8-ru", "koi8-u"],
      name: "KOI8-U"
    }, {
      labels: ["csmacintosh", "mac", "macintosh", "x-mac-roman"],
      name: "macintosh"
    }, {
      labels: ["dos-874", "iso-8859-11", "iso8859-11", "iso885911", "tis-620", "windows-874"],
      name: "windows-874"
    }, {
      labels: ["cp1250", "windows-1250", "x-cp1250"],
      name: "windows-1250"
    }, {
      labels: ["cp1251", "windows-1251", "x-cp1251"],
      name: "windows-1251"
    }, {
      labels: ["ansi_x3.4-1968", "ascii", "cp1252", "cp819", "csisolatin1", "ibm819", "iso-8859-1", "iso-ir-100", "iso8859-1", "iso88591", "iso_8859-1", "iso_8859-1:1987", "l1", "latin1", "us-ascii", "windows-1252", "x-cp1252"],
      name: "windows-1252"
    }, {
      labels: ["cp1253", "windows-1253", "x-cp1253"],
      name: "windows-1253"
    }, {
      labels: ["cp1254", "csisolatin5", "iso-8859-9", "iso-ir-148", "iso8859-9", "iso88599", "iso_8859-9", "iso_8859-9:1989", "l5", "latin5", "windows-1254", "x-cp1254"],
      name: "windows-1254"
    }, {
      labels: ["cp1255", "windows-1255", "x-cp1255"],
      name: "windows-1255"
    }, {
      labels: ["cp1256", "windows-1256", "x-cp1256"],
      name: "windows-1256"
    }, {
      labels: ["cp1257", "windows-1257", "x-cp1257"],
      name: "windows-1257"
    }, {
      labels: ["cp1258", "windows-1258", "x-cp1258"],
      name: "windows-1258"
    }, {
      labels: ["x-mac-cyrillic", "x-mac-ukrainian"],
      name: "x-mac-cyrillic"
    }],
    heading: "Legacy single-byte encodings"
  }, {
    encodings: [{
      labels: ["chinese", "csgb2312", "csiso58gb231280", "gb2312", "gb_2312", "gb_2312-80", "gbk", "iso-ir-58", "x-gbk"],
      name: "GBK"
    }, {
      labels: ["gb18030"],
      name: "gb18030"
    }],
    heading: "Legacy multi-byte Chinese (simplified) encodings"
  }, {
    encodings: [{
      labels: ["big5", "big5-hkscs", "cn-big5", "csbig5", "x-x-big5"],
      name: "Big5"
    }],
    heading: "Legacy multi-byte Chinese (traditional) encodings"
  }, {
    encodings: [{
      labels: ["cseucpkdfmtjapanese", "euc-jp", "x-euc-jp"],
      name: "EUC-JP"
    }, {
      labels: ["csiso2022jp", "iso-2022-jp"],
      name: "ISO-2022-JP"
    }, {
      labels: ["csshiftjis", "ms932", "ms_kanji", "shift-jis", "shift_jis", "sjis", "windows-31j", "x-sjis"],
      name: "Shift_JIS"
    }],
    heading: "Legacy multi-byte Japanese encodings"
  }, {
    encodings: [{
      labels: ["cseuckr", "csksc56011987", "euc-kr", "iso-ir-149", "korean", "ks_c_5601-1987", "ks_c_5601-1989", "ksc5601", "ksc_5601", "windows-949"],
      name: "EUC-KR"
    }],
    heading: "Legacy multi-byte Korean encodings"
  }, {
    encodings: [{
      labels: ["csiso2022kr", "hz-gb-2312", "iso-2022-cn", "iso-2022-cn-ext", "iso-2022-kr"],
      name: "replacement"
    }, {
      labels: ["utf-16be"],
      name: "UTF-16BE"
    }, {
      labels: ["utf-16", "utf-16le"],
      name: "UTF-16LE"
    }, {
      labels: ["x-user-defined"],
      name: "x-user-defined"
    }],
    heading: "Legacy miscellaneous encodings"
  }],
      W = {};
  V.forEach(function (a) {
    a.encodings.forEach(function (a) {
      a.labels.forEach(function (b) {
        W[b] = a;
      });
    });
  });
  var X = {},
      Y = {},
      Z = "utf-8";
  Object.defineProperty && (Object.defineProperty(u.prototype, "encoding", {
    get: function get() {
      return this._encoding.name.toLowerCase();
    }
  }), Object.defineProperty(u.prototype, "fatal", {
    get: function get() {
      return "fatal" === this._error_mode;
    }
  }), Object.defineProperty(u.prototype, "ignoreBOM", {
    get: function get() {
      return this._ignoreBOM;
    }
  })), u.prototype.decode = function (a, b) {
    function e(a) {
      return !c(["UTF-8", "UTF-16LE", "UTF-16BE"], this._encoding.name) || this._ignoreBOM || this._BOMseen || (a.length > 0 && 65279 === a[0] ? (this._BOMseen = !0, a.shift()) : a.length > 0 && (this._BOMseen = !0)), f(a);
    }

    var g;
    g = "object" == _typeof(a) && a instanceof ArrayBuffer ? new Uint8Array(a) : "object" == _typeof(a) && "buffer" in a && a.buffer instanceof ArrayBuffer ? new Uint8Array(a.buffer, a.byteOffset, a.byteLength) : new Uint8Array(0), b = d(b), this._do_not_flush || (this._decoder = Y[this._encoding.name]({
      fatal: "fatal" === this._error_mode
    }), this._BOMseen = !1), this._do_not_flush = Boolean(b.stream);

    for (var i, j = new h(g), k = [];;) {
      var l = j.read();
      if (l === T) break;
      if (i = this._decoder.handler(j, l), i === U) break;
      null !== i && (Array.isArray(i) ? k.push.apply(k, i) : k.push(i));
    }

    if (!this._do_not_flush) {
      do {
        if (i = this._decoder.handler(j, j.read()), i === U) break;
        null !== i && (Array.isArray(i) ? k.push.apply(k, i) : k.push(i));
      } while (!j.endOfStream());

      this._decoder = null;
    }

    return e.call(this, k);
  }, Object.defineProperty && Object.defineProperty(v.prototype, "encoding", {
    get: function get() {
      return this._encoding.name.toLowerCase();
    }
  }), v.prototype.encode = function (a, b) {
    a = a ? String(a) : "", b = d(b), this._do_not_flush || (this._encoder = X[this._encoding.name]({
      fatal: "fatal" === this._fatal
    })), this._do_not_flush = Boolean(b.stream);

    for (var c, f = new h(e(a)), g = [];;) {
      var i = f.read();
      if (i === T) break;
      if (c = this._encoder.handler(f, i), c === U) break;
      Array.isArray(c) ? g.push.apply(g, c) : g.push(c);
    }

    if (!this._do_not_flush) {
      for (;;) {
        if (c = this._encoder.handler(f, f.read()), c === U) break;
        Array.isArray(c) ? g.push.apply(g, c) : g.push(c);
      }

      this._encoder = null;
    }

    return new Uint8Array(g);
  }, X["UTF-8"] = function (a) {
    return new x(a);
  }, Y["UTF-8"] = function (a) {
    return new w(a);
  }, function () {
    "encoding-indexes" in a && V.forEach(function (a) {
      "Legacy single-byte encodings" === a.heading && a.encodings.forEach(function (a) {
        var b = a.name,
            c = p(b.toLowerCase());
        Y[b] = function (a) {
          return new y(c, a);
        }, X[b] = function (a) {
          return new z(c, a);
        };
      });
    });
  }(), Y.GBK = function (a) {
    return new A(a);
  }, X.GBK = function (a) {
    return new B(a, !0);
  }, X.gb18030 = function (a) {
    return new B(a);
  }, Y.gb18030 = function (a) {
    return new A(a);
  }, X.Big5 = function (a) {
    return new D(a);
  }, Y.Big5 = function (a) {
    return new C(a);
  }, X["EUC-JP"] = function (a) {
    return new F(a);
  }, Y["EUC-JP"] = function (a) {
    return new E(a);
  }, X["ISO-2022-JP"] = function (a) {
    return new H(a);
  }, Y["ISO-2022-JP"] = function (a) {
    return new G(a);
  }, X.Shift_JIS = function (a) {
    return new J(a);
  }, Y.Shift_JIS = function (a) {
    return new I(a);
  }, X["EUC-KR"] = function (a) {
    return new L(a);
  }, Y["EUC-KR"] = function (a) {
    return new K(a);
  }, X["UTF-16BE"] = function (a) {
    return new O(!0, a);
  }, Y["UTF-16BE"] = function (a) {
    return new N(!0, a);
  }, X["UTF-16LE"] = function (a) {
    return new O(!1, a);
  }, Y["UTF-16LE"] = function (a) {
    return new N(!1, a);
  }, X["x-user-defined"] = function (a) {
    return new Q(a);
  }, Y["x-user-defined"] = function (a) {
    return new P(a);
  }, a.TextEncoder || (a.TextEncoder = v), a.TextDecoder || (a.TextDecoder = u), "undefined" != typeof module && module.exports && (module.exports = {
    TextEncoder: a.TextEncoder,
    TextDecoder: a.TextDecoder,
    EncodingIndexes: a["encoding-indexes"]
  });
}(undefined);

var TincanContext = React.createContext();
function TinCanProvider(_ref) {
  var children = _ref.children;
  var tinCan = useProvideTinCan();
  return /*#__PURE__*/React.createElement(TincanContext.Provider, {
    value: tinCan
  }, children);
}
var useTinCan = function useTinCan() {
  return React.useContext(TincanContext);
}; // xAPI param fetching and initialization.

var urlParams = new URLSearchParams(window.location.search);
var endpoint = urlParams.get('endpoint');
var auth = urlParams.get('auth');
var actor = JSON.parse(urlParams.get('actor'));
var activity_id = urlParams.get('activity_id');
var registration = urlParams.get('registration');
var lrs = null;

try {
  lrs = new TinCan.LRS({
    endpoint: endpoint,
    auth: auth
  });
  console.info('TinCan LRS initialized');
} catch (err) {
  console.error('Error initializing TinCan LRS', err);
}

var defaultConfig = {
  actor: actor,
  object: {
    id: activity_id,
    objectType: "Activity"
  },
  context: {
    registration: registration
  }
};
var defaultCompletionConfig = {
  verb: {
    id: "http://adlnet.gov/expapi/verbs/completed",
    display: {
      "de-DE": "beendete",
      "en-US": "completed",
      "fr-FR": "a terminé",
      "es-ES": "completó"
    }
  },
  result: {
    completion: true
  }
};

function useProvideTinCan() {
  var saveCompleted = function saveCompleted() {
    return saveStatement(defaultCompletionConfig);
  };

  var saveStatement = function saveStatement(config) {
    var initConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    return new Promise(function (resolve, reject) {
      if (lrs === null) {
        reject('LRS did not initialize');
        return;
      }

      lrs.saveStatement(new TinCan.Statement(_objectSpread2(_objectSpread2({}, defaultConfig), config), initConfig), {
        callback: function callback(error, xhr) {
          if (error === null) {
            resolve();
          } else {
            reject(error, xhr);
          }
        }
      });
    });
  };

  return {
    saveCompleted: saveCompleted,
    saveStatement: saveStatement
  };
}

exports.TinCanProvider = TinCanProvider;
exports.useTinCan = useTinCan;
