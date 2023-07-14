// Copyright 2021-2023 Ellucian Company L.P. and its affiliates.

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

import { useCache, useCardInfo } from '@ellucian/experience-extension-utils';

import { dispatchEvent, useEventListener } from '../utils/events';

import log from 'loglevel';
const logger = log.getLogger('default');

const contextsByResource = {};

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
        cacheData = true,
        enabled: optionEnabled = true,
        queryFunction: optionQueryFunction,
        queryKeys: optionQueryKeys = {},
        queryParameters: optionQueryParameters = {},
        resource
    } = options;

    const cacheType = cacheData ? cacheTypes.SDK : cacheTypes.NONE;

    if (!resource) {
        throw new Error('DataQueryProvider options must includes a "resource"');
    }

    // Experience SDK hooks
    const { getItem, storeItem } = useCache();
    const { serverConfigContext: { cardPrefix }, cardId } = useCardInfo();

    const { DataContext, StateContext } = useMemo(() => {
        const contexts = {
            DataContext: createContext({}),
            StateContext: createContext({}),
        }

        contextsByResource[resource] = contexts;

        return contexts;
    }, []);

    const cacheKey = useMemo(() => `ethos-${resource}`, []);
    const inPreviewMode = cardPrefix === 'preview:';

    const [ cachedData, setCachedData ] = useState();
    const [ enabled, setEnabled ] = useState(optionEnabled);
    const [ queryFunction, setQueryFunction ] = useState(() => optionQueryFunction);
    const [ queryKeys, setQueryKeys ] = useState(optionQueryKeys);
    const [ queryParameters, setqueryParameters ] = useState(optionQueryParameters);
    const [ isRefreshing, setIsRefreshing ] = useState(false);

    const wrappedQueryFunction = useMemo(() => {
        return async function ({ queryKey: [ queryKeys ] }) {
            const start = new Date();

            const queryResult = await queryFunction({ queryKeys, queryParameters });

            const end = new Date();
            logger.debug(`query resource \'${resource}\' time: ${end.getTime() - start.getTime()}`);

            dispatchEvent({
                name: 'api-stat',
                data: {
                    type: resource,
                    time: end.getTime() - start.getTime()
                }
            });

            return queryResult;
        }
    }, [ resource, queryFunction ])

    const { data: { data, error: dataError } = {}, isError, isFetching, isRefetching } = useQuery(
        [{ cardId, cardPrefix, resource, ...queryKeys }],
        wrappedQueryFunction,
        {
            enabled: Boolean(queryFunction && enabled),
            placeholderData: { data: cachedData },
            refetchOnWindowFocus: false
        }
    );

    useEventListener({
        name: 'refresh',
        handler: data => {
            const { type } = data || {};
            if (!type || type === resource) {
                queryClient.invalidateQueries(resource);
                setIsRefreshing(true);
            }
        }
    });

    useEffect(() => {
        if (cardId) {
            if (cacheType === cacheTypes.SDK) {
                (async () => {
                    let { data } = await Promise.resolve(getItem({ key: buildKey(cacheKey, queryKeys), scope: cardId })) || {};
                    if (data) {
                        setCachedData(data);
                    }
                })();
            }
        }
    }, [ cacheType, cardId, getItem, queryKeys ]);


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
    }, [ cacheKey, data, isRefetching, isRefreshing, queryKeys, storeItem ]);

    const stateContext = useMemo(() => {
        return {
            inPreviewMode,
            isError,
            isLoading: isFetching,
            isRefreshing,
            setEnabled: (enabled = true) => setEnabled(enabled),
            setQueryFunction,
            setQueryKeys,
            setqueryParameters
        }
    }, [
        inPreviewMode,
        isError,
        isFetching,
        isRefreshing,
        setEnabled,
        setQueryFunction,
        setQueryKeys,
        setqueryParameters
    ]);

    const dataContext = useMemo(() => {
        return {
            data: data || cachedData,
            dataError
        }
    }, [
        cachedData,
        data,
        dataError
    ]);

    useEffect(() => {
        logger.debug(`DataQueryProvider for ${resource} mounted`);

        return () => {
            logger.debug(`DataQueryProvider for ${resource} unmounted`);
        }
    }, []);

    return (
        <StateContext.Provider value={stateContext}>
            <DataContext.Provider value={dataContext}>
                {children}
            </DataContext.Provider>
        </StateContext.Provider>
    )
}

ProviderInternal.propTypes = {
    children: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired
}

export function DataQueryProvider(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ProviderInternal {...props}/>
        </QueryClientProvider>
    )
}

export function useDataQueryData(resource) {
    if (!resource) {
        const message = 'useDataQueryData requires a resource';
        console.error(message);
        throw new Error(message);
    }

    const contexts = contextsByResource[resource];

    if (!contexts) {
        const message = `useDataQuery encountered an unknown resource: ${resource}\nPerhaps you didn't wrap with the <DataQueryProvider>`;
        console.error(message);
        throw new Error(message);
    }

    return useContext(contexts.DataContext);
}

export function useDataQueryState(resource) {
    if (!resource) {
        const message = 'useDataQueryState requires a resource';
        console.error(message);
        throw new Error(message);
    }

    const contexts = contextsByResource[resource];

    if (!contexts) {
        const message = `useDataQueryState encountered an unknown resource: ${resource}\nPerhaps you didn't wrap with the <DataQueryProvider>`;
        console.error(message);
        throw new Error(message);
    }

    return useContext(contexts.StateContext);
}
