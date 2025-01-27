// Copyright 2021-2023 Ellucian Company L.P. and its affiliates.

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import { useCache, useCardInfo, useData } from '@ellucian/experience-extension-utils';

import log from 'loglevel';
const logger = log.getLogger('default');

const contextsByKey = {};

const queryClient = new QueryClient();

function buildKey(cacheKey, queryKeys) {
    let key = cacheKey;
    for (const queryKey in queryKeys) {
        if (Object.hasOwn(queryKeys, queryKey) && typeof queryKeys[queryKey] !== 'function') {
            key = `${key}-${JSON.stringify(queryKeys[queryKey])}`;
        }
    }

    return key;
}

export const cacheTypes = {
    SDK: 'sdk',
    NONE: 'none'
}

function ProviderInternal({ children, options = {} }) {
    const {
        cacheEnabled = true,
        enabled: optionEnabled = true,
        queryFunction: optionQueryFunction,
        queryKeys: optionQueryKeys = {},
        queryParameters: optionQueryParameters = {},
        resource,
        ...otherOptions
    } = useMemo(() => options, [options]);

    const { authenticatedEthosFetch, getExtensionJwt } = useData();

    const cacheType = cacheEnabled ? cacheTypes.SDK : cacheTypes.NONE;

    if (!resource) {
        throw new Error('DataQueryProvider options must includes a "resource"');
    }

    // Experience SDK hooks
    const { getItem, storeItem } = useCache();
    const { serverConfigContext: { cardPrefix }, cardId } = useCardInfo();

    const cacheKey = useMemo(() => `ethos-${resource}`, []);
    const inPreviewMode = cardPrefix === 'preview:';

    const [cachedData, setCachedData] = useState();
    const [enabled, setEnabled] = useState(optionEnabled);
    const [queryFunction, setQueryFunction] = useState(() => optionQueryFunction);
    const [queryKeys, setQueryKeys] = useState(optionQueryKeys);
    const [queryParameters, setqueryParameters] = useState(optionQueryParameters);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [loadTimes, setLoadTimes] = useState([]);

    const DataQueryContext = useMemo(() => {
        const { queryId } = queryKeys;
        const key = queryId ? `${resource}:${queryId}` : resource;

        // create if needed
        const context = contextsByKey[key] || createContext({});
        // make sure it is stored
        contextsByKey[key] = context;

        return context;
    }, [queryKeys, resource]);

    const wrappedQueryFunction = useMemo(() => {
        return async function ({ queryKey: [queryKeys], signal }) {
            const start = new Date();

            const queryResult = await queryFunction({ authenticatedEthosFetch, getExtensionJwt, queryKeys, queryParameters, signal });

            const end = new Date();
            const { queryId } = queryKeys;
            const key = queryId ? `${resource}:${queryId}` : resource;
            logger.debug(`query resource key: '${key}' time: ${end.getTime() - start.getTime()}`);

            if (!signal.aborted) {
                loadTimes.push({
                    start,
                    end,
                    time: end.getTime() - start.getTime()
                })
                setLoadTimes([...loadTimes]);
            }

            return queryResult;
        }
    }, [authenticatedEthosFetch, getExtensionJwt, queryFunction, queryKeys, queryParameters, resource])

    const { data: { data, error: dataError } = {}, isError, isFetching, isRefetching } = useQuery(
        [{ cardId, cardPrefix, resource, ...queryKeys }],
        wrappedQueryFunction,
        {
            enabled: Boolean(queryFunction && enabled),
            placeholderData: { data: cachedData },
            refetchOnWindowFocus: false
        }
    );

    useEffect(() => {
        if (cardId) {
            if (cacheType === cacheTypes.SDK) {
                (async () => {
                    const { data } = await Promise.resolve(getItem({ key: buildKey(cacheKey, queryKeys), scope: cardId })) || {};
                    if (data) {
                        setCachedData(data);
                    }
                })();
            }
        }
    }, [cacheType, cardId, getItem, queryKeys]);

    useEffect(() => {
        if (data) {
            if (cacheType === cacheTypes.SDK) {
                storeItem({ data, key: buildKey(cacheKey, queryKeys), scope: cardId });
            }
        }

        if (isRefreshing && !isRefetching) {
            // refresh has completed
            setIsRefreshing(false);
        }
    }, [cacheKey, data, isRefetching, isRefreshing, queryKeys, storeItem]);

    const contextValue = useMemo(() => {
        return {
            data: data || cachedData,
            dataError,
            inPreviewMode,
            isError,
            isLoading: isFetching,
            isRefreshing,
            loadTimes,
            refresh: () => {
                queryClient.invalidateQueries(resource);
                setIsRefreshing(true);
            },
            setEnabled: (enabled = true) => setEnabled(enabled),
            setQueryFunction,
            setQueryKeys,
            setqueryParameters
        }
    }, [
        cachedData,
        data,
        dataError,
        inPreviewMode,
        isError,
        isFetching,
        isRefreshing,
        loadTimes,
        resource,
        setEnabled,
        setIsRefreshing,
        setQueryFunction,
        setQueryKeys,
        setqueryParameters
    ]);

    useEffect(() => {
        const { queryId } = queryKeys;
        const key = queryId ? `${resource}:${queryId}` : resource;
        logger.debug(`DataQueryProvider for key: ${key} mounted`);

        return () => {
            logger.debug(`DataQueryProvider for key ${key} unmounted`);
        }
    }, []);

    useEffect(() => {
        if (otherOptions && Object.keys(otherOptions).length > 0) {
            logger.error('Unknown DataQueryProvider options. Please correct', JSON.stringify(otherOptions, null, 2));
        }
    }, []);

    return (
        <DataQueryContext.Provider value={contextValue}>
            {children}
        </DataQueryContext.Provider>
    )
}

ProviderInternal.propTypes = {
    children: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired
}

export function DataQueryProvider(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ProviderInternal {...props} />
        </QueryClientProvider>
    )
}

export function MultiDataQueryProvider({ options, children }) {
    const renderProviders = (optionsArray) => {
        const [currentOptions, ...remainingOptions] = optionsArray;

        if (currentOptions) {
            return (
                <DataQueryProvider options={currentOptions}>
                    {renderProviders(remainingOptions)}
                </DataQueryProvider>
            );
        }

        return children;
    };

    return renderProviders(options);
}

export function useDataQuery(parameter) {
    let queryId, resource
    if (typeof parameter === 'string') {
        resource = parameter
    } else if (typeof parameter === 'object') {
        ({ queryId, resource } = parameter);
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

    return useContext(context);
}