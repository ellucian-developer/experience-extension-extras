"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof3 = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postJsonData = exports.fetchJsonData = exports.deleteJsonData = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _loglevel = _interopRequireDefault(require("loglevel"));
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof3(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; } // Copyright 2021-2023 Ellucian Company L.P. and its affiliates.
var logger = _loglevel["default"].getLogger('default');
var defaultOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};
var cachedJwt, getJwtPromise;
function getCachedJwt(_x) {
  return _getCachedJwt.apply(this, arguments);
}
function _getCachedJwt() {
  _getCachedJwt = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref) {
    var getJwt, expired, decodedJwt, exp, expiresSoon;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          getJwt = _ref.getJwt;
          expired = !cachedJwt;
          if (cachedJwt) {
            // ensure it doesn't expire too soon
            decodedJwt = (0, _jwtDecode["default"])(cachedJwt);
            exp = decodedJwt.exp;
            expiresSoon = new Date().getTime() / 1000 + 1 * 60;
            if (exp < expiresSoon) {
              expired = true;
            }
          }
          if (!expired) {
            _context4.next = 14;
            break;
          }
          if (!getJwtPromise) {
            _context4.next = 9;
            break;
          }
          _context4.next = 7;
          return getJwtPromise;
        case 7:
          _context4.next = 14;
          break;
        case 9:
          getJwtPromise = getJwt();

          // eslint-disable-next-line require-atomic-updates
          _context4.next = 12;
          return getJwtPromise;
        case 12:
          cachedJwt = _context4.sent;
          // reset the promse
          // eslint-disable-next-line require-atomic-updates
          getJwtPromise = undefined;
        case 14:
          return _context4.abrupt("return", cachedJwt);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getCachedJwt.apply(this, arguments);
}
function addAuthorization(_x2) {
  return _addAuthorization.apply(this, arguments);
}
function _addAuthorization() {
  _addAuthorization = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref2) {
    var requestOptions, getJwt, paramToken, token, jwt;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          requestOptions = _ref2.requestOptions, getJwt = _ref2.getJwt, paramToken = _ref2.token;
          token = paramToken;
          if (!(!paramToken && getJwt)) {
            _context5.next = 7;
            break;
          }
          _context5.next = 5;
          return getCachedJwt({
            getJwt: getJwt
          });
        case 5:
          jwt = _context5.sent;
          token = (0, _typeof2["default"])(jwt) === 'object' ? jwt.access_token : jwt;
        case 7:
          requestOptions.headers.Authorization = "Bearer ".concat(token);
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _addAuthorization.apply(this, arguments);
}
var fetchJsonData = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref3) {
    var url, options, getJwt, token, result, requestOptions, response, parsed;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = _ref3.url, options = _ref3.options, getJwt = _ref3.getJwt, token = _ref3.token;
          result = {
            error: 'NO_DATA'
          };
          requestOptions = Object.assign({}, defaultOptions, options);
          _context.next = 5;
          return addAuthorization({
            requestOptions: requestOptions,
            getJwt: getJwt,
            token: token
          });
        case 5:
          _context.prev = 5;
          _context.next = 8;
          return fetch(url, requestOptions);
        case 8:
          response = _context.sent;
          _context.next = 15;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](5);
          logger.error('error: ', _context.t0);
          return _context.abrupt("return", {
            error: 'NO_DATA'
          });
        case 15:
          if (!response) {
            _context.next = 43;
            break;
          }
          _context.t1 = response.status;
          _context.next = _context.t1 === 200 ? 19 : _context.t1 === 400 ? 24 : _context.t1 === 404 ? 24 : 33;
          break;
        case 19:
          _context.next = 21;
          return response.json();
        case 21:
          parsed = _context.sent;
          if (parsed.data) {
            result = parsed;
          } else {
            result = {
              data: parsed
            };
          }
          return _context.abrupt("break", 41);
        case 24:
          if (!(process.env.MOCK_DATA_ON_ERROR === 'true')) {
            _context.next = 28;
            break;
          }
          result = {
            error: 'NO_DATA'
          };
          _context.next = 32;
          break;
        case 28:
          _context.next = 30;
          return response.json();
        case 30:
          parsed = _context.sent;
          if (parsed.error) {
            result = parsed;
          } else {
            result = {
              error: 'UNKNOWN_USER',
              errorMessage: parsed
            };
          }
        case 32:
          return _context.abrupt("break", 41);
        case 33:
          if (!(process.env.MOCK_DATA_ON_ERROR === 'true')) {
            _context.next = 37;
            break;
          }
          result = {
            error: 'NO_DATA'
          };
          _context.next = 41;
          break;
        case 37:
          result.error = "STATUS_".concat(response.status);
          _context.next = 40;
          return response.json();
        case 40:
          result.errorMessage = _context.sent;
        case 41:
          _context.next = 44;
          break;
        case 43:
          if (process.env.MOCK_DATA_ON_ERROR === 'true') {
            result = {
              error: 'NO_DATA'
            };
          } else {
            result = {
              error: 'NO_DATA'
            };
          }
        case 44:
          return _context.abrupt("return", result);
        case 45:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 11]]);
  }));
  return function fetchJsonData(_x3) {
    return _ref4.apply(this, arguments);
  };
}();
exports.fetchJsonData = fetchJsonData;
var postJsonData = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_ref5) {
    var url, data, options, getJwt, token, result, requestOptions, response, parsed;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          url = _ref5.url, data = _ref5.data, options = _ref5.options, getJwt = _ref5.getJwt, token = _ref5.token;
          result = {
            error: 'NO_DATA'
          };
          requestOptions = Object.assign({}, defaultOptions, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }, options);
          _context2.next = 5;
          return addAuthorization({
            requestOptions: requestOptions,
            getJwt: getJwt,
            token: token
          });
        case 5:
          _context2.next = 7;
          return fetch(url, requestOptions);
        case 7:
          response = _context2.sent;
          if (!response) {
            _context2.next = 36;
            break;
          }
          _context2.t0 = response.status;
          _context2.next = _context2.t0 === 200 ? 12 : _context2.t0 === 400 ? 23 : 28;
          break;
        case 12:
          _context2.prev = 12;
          _context2.next = 15;
          return response.json();
        case 15:
          parsed = _context2.sent;
          if (parsed.data) {
            result = parsed;
          } else {
            result = {
              data: parsed
            };
          }
          _context2.next = 22;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t1 = _context2["catch"](12);
          result = {
            error: 'JSON_PARSE_ERROR',
            errorMessage: 'Unable to parse json response'
          };
        case 22:
          return _context2.abrupt("break", 34);
        case 23:
          _context2.next = 25;
          return response.json();
        case 25:
          parsed = _context2.sent;
          if (parsed.error) {
            result = parsed;
          } else {
            result = {
              error: 'UNKNOWN_USER',
              errorMessage: parsed
            };
          }
          return _context2.abrupt("break", 34);
        case 28:
          _context2.next = 30;
          return response.json();
        case 30:
          parsed = _context2.sent;
          result.error = "STATUS_".concat(response.status);
          result.errorMessage = parsed;

          // handle errors array from Orchestration
          if (parsed.errors) {
            result.errorMessage = parsed.errors[0].message.message;
          }
        case 34:
          _context2.next = 37;
          break;
        case 36:
          return _context2.abrupt("return", {
            error: 'NO_DATA'
          });
        case 37:
          return _context2.abrupt("return", result);
        case 38:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[12, 19]]);
  }));
  return function postJsonData(_x4) {
    return _ref6.apply(this, arguments);
  };
}();
exports.postJsonData = postJsonData;
var deleteJsonData = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(_ref7) {
    var url, options, getExtensionJwt, result, requestOptions, response, parsed;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          url = _ref7.url, options = _ref7.options, getExtensionJwt = _ref7.getExtensionJwt;
          result = {
            error: 'NO_DATA'
          };
          requestOptions = Object.assign({}, defaultOptions, {
            method: 'DELETE'
          }, options);
          _context3.next = 5;
          return addAuthorization({
            requestOptions: requestOptions,
            getExtensionJwt: getExtensionJwt
          });
        case 5:
          _context3.prev = 5;
          _context3.next = 8;
          return fetch(url, requestOptions);
        case 8:
          response = _context3.sent;
          _context3.next = 14;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](5);
          logger.error('error: ', _context3.t0);
        case 14:
          if (!response) {
            _context3.next = 34;
            break;
          }
          _context3.t1 = response.status;
          _context3.next = _context3.t1 === 200 ? 18 : _context3.t1 === 400 ? 23 : 28;
          break;
        case 18:
          _context3.next = 20;
          return response.json();
        case 20:
          parsed = _context3.sent;
          if (parsed.data) {
            result = parsed;
          } else {
            result = {
              data: parsed
            };
          }
          return _context3.abrupt("break", 32);
        case 23:
          _context3.next = 25;
          return response.json();
        case 25:
          parsed = _context3.sent;
          if (parsed.error) {
            result = parsed;
          } else {
            result = {
              error: 'UNKNOWN_USER',
              errorMessage: parsed
            };
          }
          return _context3.abrupt("break", 32);
        case 28:
          result.error = "STATUS_".concat(response.status);
          _context3.next = 31;
          return response.json();
        case 31:
          result.errorMessage = _context3.sent;
        case 32:
          _context3.next = 35;
          break;
        case 34:
          result = {
            error: 'NO_DATA'
          };
        case 35:
          return _context3.abrupt("return", result);
        case 36:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[5, 11]]);
  }));
  return function deleteJsonData(_x5) {
    return _ref8.apply(this, arguments);
  };
}();
exports.deleteJsonData = deleteJsonData;