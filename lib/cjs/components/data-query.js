"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataQueryProvider = DataQueryProvider;
exports.MultiDataQueryProvider = MultiDataQueryProvider;
exports.cacheTypes = void 0;
exports.useDataQuery = useDataQuery;
var _react = require("react");
var _reactQuery = require("@tanstack/react-query");
var _experienceExtensionUtils = require("@ellucian/experience-extension-utils");
var _loglevel = _interopRequireDefault(require("loglevel"));
var _jsxRuntime = require("react/jsx-runtime");
// Copyright 2021-2023 Ellucian Company L.P. and its affiliates.

const logger = _loglevel.default.getLogger('default');
const contextsByKey = {};
const queryClient = new _reactQuery.QueryClient();
function buildKey(cacheKey, queryKeys) {
  let key = cacheKey;
  for (const queryKey in queryKeys) {
    if (Object.hasOwn(queryKeys, queryKey) && typeof queryKeys[queryKey] !== 'function') {
      key = `${key}-${JSON.stringify(queryKeys[queryKey])}`;
    }
  }
  return key;
}
const cacheTypes = exports.cacheTypes = {
  SDK: 'sdk',
  NONE: 'none'
};
function ProviderInternal({
  children,
  options = {}
}) {
  const {
    cacheEnabled = true,
    enabled: optionEnabled = true,
    queryFunction: optionQueryFunction,
    queryKeys: optionQueryKeys = {},
    queryParameters: optionQueryParameters = {},
    resource,
    ...otherOptions
  } = (0, _react.useMemo)(() => options, [options]);
  const {
    authenticatedEthosFetch,
    getExtensionJwt
  } = (0, _experienceExtensionUtils.useData)();
  const cacheType = cacheEnabled ? cacheTypes.SDK : cacheTypes.NONE;
  if (!resource) {
    throw new Error('DataQueryProvider options must includes a "resource"');
  }

  // Experience SDK hooks
  const {
    getItem,
    storeItem
  } = (0, _experienceExtensionUtils.useCache)();
  const {
    serverConfigContext: {
      cardPrefix
    },
    cardId
  } = (0, _experienceExtensionUtils.useCardInfo)();
  const cacheKey = (0, _react.useMemo)(() => `ethos-${resource}`, []);
  const inPreviewMode = cardPrefix === 'preview:';
  const [cachedData, setCachedData] = (0, _react.useState)();
  const [enabled, setEnabled] = (0, _react.useState)(optionEnabled);
  const [queryFunction, setQueryFunction] = (0, _react.useState)(() => optionQueryFunction);
  const [queryKeys, setQueryKeys] = (0, _react.useState)(optionQueryKeys);
  const [queryParameters, setqueryParameters] = (0, _react.useState)(optionQueryParameters);
  const [isRefreshing, setIsRefreshing] = (0, _react.useState)(false);
  const [loadTimes, setLoadTimes] = (0, _react.useState)([]);
  const DataQueryContext = (0, _react.useMemo)(() => {
    const {
      queryId
    } = queryKeys;
    const key = queryId ? `${resource}:${queryId}` : resource;

    // create if needed
    const context = contextsByKey[key] || /*#__PURE__*/(0, _react.createContext)({});
    // make sure it is stored
    contextsByKey[key] = context;
    return context;
  }, [queryKeys, resource]);
  const wrappedQueryFunction = (0, _react.useMemo)(() => {
    return async function ({
      queryKey: [queryKeys],
      signal
    }) {
      const start = new Date();
      const queryResult = await queryFunction({
        authenticatedEthosFetch,
        getExtensionJwt,
        queryKeys,
        queryParameters,
        signal
      });
      const end = new Date();
      const {
        queryId
      } = queryKeys;
      const key = queryId ? `${resource}:${queryId}` : resource;
      logger.debug(`query resource key: '${key}' time: ${end.getTime() - start.getTime()}`);
      if (!signal.aborted) {
        loadTimes.push({
          start,
          end,
          time: end.getTime() - start.getTime()
        });
        setLoadTimes([...loadTimes]);
      }
      return queryResult;
    };
  }, [authenticatedEthosFetch, getExtensionJwt, queryFunction, queryKeys, queryParameters, resource]);
  const {
    data: {
      data,
      error: dataError
    } = {},
    isError,
    isFetching,
    isRefetching
  } = (0, _reactQuery.useQuery)({
    queryKey: [{
      cardId,
      cardPrefix,
      resource,
      ...queryKeys
    }],
    queryFn: wrappedQueryFunction,
    enabled: Boolean(queryFunction && enabled),
    placeholderData: {
      data: cachedData
    },
    refetchOnWindowFocus: false
  });
  (0, _react.useEffect)(() => {
    if (cardId) {
      if (cacheType === cacheTypes.SDK) {
        (async () => {
          const {
            data
          } = (await Promise.resolve(getItem({
            key: buildKey(cacheKey, queryKeys),
            scope: cardId
          }))) || {};
          if (data) {
            setCachedData(data);
          }
        })();
      }
    }
  }, [cacheType, cardId, getItem, queryKeys]);
  (0, _react.useEffect)(() => {
    if (data) {
      if (cacheType === cacheTypes.SDK) {
        storeItem({
          data,
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
  const contextValue = (0, _react.useMemo)(() => {
    return {
      data: data || cachedData,
      dataError,
      inPreviewMode,
      isError,
      isLoading: isFetching,
      isRefreshing,
      loadTimes,
      refresh: () => {
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0]?.resource === resource
        });
        setIsRefreshing(true);
      },
      setEnabled: (enabled = true) => setEnabled(enabled),
      setQueryFunction,
      setQueryKeys,
      setqueryParameters
    };
  }, [cachedData, data, dataError, inPreviewMode, isError, isFetching, isRefreshing, loadTimes, resource, setEnabled, setIsRefreshing, setQueryFunction, setQueryKeys, setqueryParameters]);
  (0, _react.useEffect)(() => {
    const {
      queryId
    } = queryKeys;
    const key = queryId ? `${resource}:${queryId}` : resource;
    logger.debug(`DataQueryProvider for key: ${key} mounted`);
    return () => {
      logger.debug(`DataQueryProvider for key ${key} unmounted`);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (otherOptions && Object.keys(otherOptions).length > 0) {
      logger.error('Unknown DataQueryProvider options. Please correct', JSON.stringify(otherOptions, null, 2));
    }
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DataQueryContext.Provider, {
    value: contextValue,
    children: children
  });
}
function DataQueryProvider(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactQuery.QueryClientProvider, {
    client: queryClient,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ProviderInternal, {
      ...props
    })
  });
}
function MultiDataQueryProvider({
  options,
  children
}) {
  const renderProviders = optionsArray => {
    const [currentOptions, ...remainingOptions] = optionsArray;
    if (currentOptions) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(DataQueryProvider, {
        options: currentOptions,
        children: renderProviders(remainingOptions)
      });
    }
    return children;
  };
  return renderProviders(options);
}
function useDataQuery(parameter) {
  let queryId, resource;
  if (typeof parameter === 'string') {
    resource = parameter;
  } else if (typeof parameter === 'object') {
    ({
      queryId,
      resource
    } = parameter);
  }
  if (!resource) {
    const message = 'useDataQuery requires a resource';
    console.error(message);
    throw new Error(message);
  }
  const key = queryId ? `${resource}:${queryId}` : resource;
  const context = contextsByKey[key];
  if (!context) {
    const message = `useDataQuery encountered an unknown resource key: ${key}\nPerhaps you didn't wrap with the <DataQueryProvider>`;
    console.error(message);
    throw new Error(message);
  }
  return (0, _react.useContext)(context);
}
//# sourceMappingURL=data-query.js.map