"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataQueryProvider = DataQueryProvider;
exports.cacheTypes = void 0;
exports.useDataQueryData = useDataQueryData;
exports.useDataQueryState = useDataQueryState;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactQuery = require("@tanstack/react-query");
var _experienceExtensionUtils = require("@ellucian/experience-extension-utils");
var _events = require("../utils/events");
var _loglevel = _interopRequireDefault(require("loglevel"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; } // Copyright 2021-2023 Ellucian Company L.P. and its affiliates.
var logger = _loglevel["default"].getLogger('default');
var contextsByResource = {};
var queryClient = new _reactQuery.QueryClient();
function buildKey(cacheKey, queryKeys) {
  var key = cacheKey;
  for (var queryKey in queryKeys) {
    if (Object.hasOwn(queryKeys, queryKey) && typeof queryKeys[queryKey] !== 'function') {
      key = "".concat(key, "-").concat(JSON.stringify(queryKeys[queryKey]));
    }
  }
  return key;
}
var cacheTypes = {
  SDK: 'sdk',
  NONE: 'none'
};
exports.cacheTypes = cacheTypes;
function ProviderInternal(_ref) {
  var children = _ref.children,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? {} : _ref$options;
  var _options$cacheData = options.cacheData,
    cacheData = _options$cacheData === void 0 ? true : _options$cacheData,
    _options$enabled = options.enabled,
    optionEnabled = _options$enabled === void 0 ? true : _options$enabled,
    optionQueryFunction = options.queryFunction,
    _options$queryKeys = options.queryKeys,
    optionQueryKeys = _options$queryKeys === void 0 ? {} : _options$queryKeys,
    _options$queryParamet = options.queryParameters,
    optionQueryParameters = _options$queryParamet === void 0 ? {} : _options$queryParamet,
    resource = options.resource;
  var cacheType = cacheData ? cacheTypes.SDK : cacheTypes.NONE;
  if (!resource) {
    throw new Error('DataQueryProvider options must includes a "resource"');
  }

  // Experience SDK hooks
  var _useCache = (0, _experienceExtensionUtils.useCache)(),
    getItem = _useCache.getItem,
    storeItem = _useCache.storeItem;
  var _useCardInfo = (0, _experienceExtensionUtils.useCardInfo)(),
    cardPrefix = _useCardInfo.serverConfigContext.cardPrefix,
    cardId = _useCardInfo.cardId;
  var _useMemo = (0, _react.useMemo)(function () {
      var contexts = {
        DataContext: /*#__PURE__*/(0, _react.createContext)({}),
        StateContext: /*#__PURE__*/(0, _react.createContext)({})
      };
      contextsByResource[resource] = contexts;
      return contexts;
    }, []),
    DataContext = _useMemo.DataContext,
    StateContext = _useMemo.StateContext;
  var cacheKey = (0, _react.useMemo)(function () {
    return "ethos-".concat(resource);
  }, []);
  var inPreviewMode = cardPrefix === 'preview:';
  var _useState = (0, _react.useState)(),
    _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
    cachedData = _useState2[0],
    setCachedData = _useState2[1];
  var _useState3 = (0, _react.useState)(optionEnabled),
    _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
    enabled = _useState4[0],
    _setEnabled = _useState4[1];
  var _useState5 = (0, _react.useState)(function () {
      return optionQueryFunction;
    }),
    _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
    queryFunction = _useState6[0],
    setQueryFunction = _useState6[1];
  var _useState7 = (0, _react.useState)(optionQueryKeys),
    _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
    queryKeys = _useState8[0],
    setQueryKeys = _useState8[1];
  var _useState9 = (0, _react.useState)(optionQueryParameters),
    _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
    queryParameters = _useState10[0],
    setqueryParameters = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = (0, _slicedToArray2["default"])(_useState11, 2),
    isRefreshing = _useState12[0],
    setIsRefreshing = _useState12[1];
  var wrappedQueryFunction = (0, _react.useMemo)(function () {
    return /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref2) {
        var _ref2$queryKey, queryKeys, start, queryResult, end;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _ref2$queryKey = (0, _slicedToArray2["default"])(_ref2.queryKey, 1), queryKeys = _ref2$queryKey[0];
              start = new Date();
              _context.next = 4;
              return queryFunction({
                queryKeys: queryKeys,
                queryParameters: queryParameters
              });
            case 4:
              queryResult = _context.sent;
              end = new Date();
              logger.debug("query resource '".concat(resource, "' time: ").concat(end.getTime() - start.getTime()));
              (0, _events.dispatchEvent)({
                name: 'api-stat',
                data: {
                  type: resource,
                  time: end.getTime() - start.getTime()
                }
              });
              return _context.abrupt("return", queryResult);
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();
  }, [resource, queryFunction]);
  var _useQuery = (0, _reactQuery.useQuery)([_objectSpread({
      cardId: cardId,
      cardPrefix: cardPrefix,
      resource: resource
    }, queryKeys)], wrappedQueryFunction, {
      enabled: Boolean(queryFunction && enabled),
      placeholderData: {
        data: cachedData
      },
      refetchOnWindowFocus: false
    }),
    _useQuery$data = _useQuery.data,
    _useQuery$data2 = _useQuery$data === void 0 ? {} : _useQuery$data,
    data = _useQuery$data2.data,
    dataError = _useQuery$data2.error,
    isError = _useQuery.isError,
    isFetching = _useQuery.isFetching,
    isRefetching = _useQuery.isRefetching;
  (0, _events.useEventListener)({
    name: 'refresh',
    handler: function handler(data) {
      var _ref4 = data || {},
        type = _ref4.type;
      if (!type || type === resource) {
        queryClient.invalidateQueries(resource);
        setIsRefreshing(true);
      }
    }
  });
  (0, _react.useEffect)(function () {
    if (cardId) {
      if (cacheType === cacheTypes.SDK) {
        (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var _ref6, data;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Promise.resolve(getItem({
                  key: buildKey(cacheKey, queryKeys),
                  scope: cardId
                }));
              case 2:
                _context2.t0 = _context2.sent;
                if (_context2.t0) {
                  _context2.next = 5;
                  break;
                }
                _context2.t0 = {};
              case 5:
                _ref6 = _context2.t0;
                data = _ref6.data;
                if (data) {
                  setCachedData(data);
                }
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      }
    }
  }, [cacheType, cardId, getItem, queryKeys]);
  (0, _react.useEffect)(function () {
    if (data) {
      if (cacheType === cacheTypes.SDK) {
        storeItem({
          data: data,
          key: buildKey(cacheKey, queryKeys),
          scope: cardId
        });
      }
    }
    if (isRefreshing && !isRefetching) {
      // refresh has completed
      setIsRefreshing(false);
    }
  }, [cacheKey, data, isRefetching, isRefreshing, queryKeys, storeItem]);
  var stateContext = (0, _react.useMemo)(function () {
    return {
      inPreviewMode: inPreviewMode,
      isError: isError,
      isLoading: isFetching,
      isRefreshing: isRefreshing,
      setEnabled: function setEnabled() {
        var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        return _setEnabled(enabled);
      },
      setQueryFunction: setQueryFunction,
      setQueryKeys: setQueryKeys,
      setqueryParameters: setqueryParameters
    };
  }, [inPreviewMode, isError, isFetching, isRefreshing, _setEnabled, setQueryFunction, setQueryKeys, setqueryParameters]);
  var dataContext = (0, _react.useMemo)(function () {
    return {
      data: data || cachedData,
      dataError: dataError
    };
  }, [cachedData, data, dataError]);
  (0, _react.useEffect)(function () {
    logger.debug("DataQueryProvider for ".concat(resource, " mounted"));
    return function () {
      logger.debug("DataQueryProvider for ".concat(resource, " unmounted"));
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(StateContext.Provider, {
    value: stateContext
  }, /*#__PURE__*/_react["default"].createElement(DataContext.Provider, {
    value: dataContext
  }, children));
}
ProviderInternal.propTypes = {
  children: _propTypes["default"].object.isRequired,
  options: _propTypes["default"].object.isRequired
};
function DataQueryProvider(props) {
  return /*#__PURE__*/_react["default"].createElement(_reactQuery.QueryClientProvider, {
    client: queryClient
  }, /*#__PURE__*/_react["default"].createElement(ProviderInternal, props));
}
function useDataQueryData(resource) {
  if (!resource) {
    var message = 'useDataQueryData requires a resource';
    console.error(message);
    throw new Error(message);
  }
  var contexts = contextsByResource[resource];
  if (!contexts) {
    var _message = "useDataQuery encountered an unknown resource: ".concat(resource, "\nPerhaps you didn't wrap with the <DataQueryProvider>");
    console.error(_message);
    throw new Error(_message);
  }
  return (0, _react.useContext)(contexts.DataContext);
}
function useDataQueryState(resource) {
  if (!resource) {
    var message = 'useDataQueryState requires a resource';
    console.error(message);
    throw new Error(message);
  }
  var contexts = contextsByResource[resource];
  if (!contexts) {
    var _message2 = "useDataQueryState encountered an unknown resource: ".concat(resource, "\nPerhaps you didn't wrap with the <DataQueryProvider>");
    console.error(_message2);
    throw new Error(_message2);
  }
  return (0, _react.useContext)(contexts.StateContext);
}