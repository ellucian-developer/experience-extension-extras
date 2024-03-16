/* eslint-disable max-depth */
// Copyright 2021-2023 Ellucian Company L.P. and its affiliates.

import log from 'loglevel';
const logger = log.getLogger('default');

export async function userTokenDataConnectQuery({ authenticatedEthosFetch, queryKeys, queryParameters, signal }) {
    const { cardId, cardPrefix, id, resource, searchParameters = {}, body } = queryKeys;
    const { accept: acceptParameter, Accept: AcceptParameter, acceptVersion, queryMethod = 'GET', mockData, ...otherQueryParameters } = queryParameters;

    if (otherQueryParameters && Object.keys(otherQueryParameters).length > 0) {
        logger.error('Unknown experienceTokenQuery queryParamaters. Please correct', JSON.stringify(otherQueryParameters, null, 2));
    }

    if (mockData) {
        return ({ data: mockData });
    }

    try {
        let resourcePath = resource;

        if (id) {
            resourcePath = `${resourcePath}/${id}`
        }

        if (!acceptParameter && !AcceptParameter && !acceptVersion) {
            logger.warn(`Data Connect Serverless APIs should be called with a specific 'accept' string. You can do this with either an 'accept' or 'acceptVersion' queryParameter`)
        }
        const accept = acceptParameter || AcceptParameter
            ? acceptParameter || AcceptParameter
            : acceptVersion
                ? `application/vnd.hedtech.integration.v${acceptVersion}+json`
                : 'application/json';

        const fetchOptions = {
            method: queryMethod.toUpperCase(),
            headers: {
                Accept: accept
            },
            signal
        };

        switch (queryMethod.toLowerCase()) {
            case 'post':
            case 'put':
                {
                    console.log('userTokenDateConnectQuery cardId:', cardId)
                    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body)
                    const urlSearchParameters = new URLSearchParams({
                        cardId,
                        cardPrefix,
                    }).toString();
                    resourcePath = `${resourcePath}?${urlSearchParameters}`
                    console.log('resourcePath:', resourcePath)
                }
            break;
            case 'get':
                {
                    const urlSearchParameters = new URLSearchParams({
                        cardId,
                        cardPrefix,
                        ...searchParameters
                    }).toString();
                    resourcePath = `${resourcePath}?${urlSearchParameters}`
                }
            break;
        }

        const response = await authenticatedEthosFetch(resourcePath, fetchOptions);

        let result;
        if (response) {
            switch (response.status) {
            case 200:
                try {
                    const data = await response.json()

                    result = {
                        data
                    }
                } catch (error) {
                    result = {
                        error: {
                            message: 'unable to parse response',
                            statusCode: 500
                        }
                    };
                }
                break;
            case 400:
                // look for the case where there is an AR Hold blocking data retrieval
                try {
                    const errorResponse = await response.json()
                    const { errors } = errorResponse
                    const { message } = errors ? errors[0] : {};
                    if (message === 'Person has holds, you may not process this account.') {
                        result = {
                            data: {
                                personHasHolds: true
                            }
                        }
                    }
                } catch (error) {
                    // ignore
                }
                if (!result) {
                    result = {
                        error: {
                            message: 'server error',
                            statusCode: response.status
                        }
                    };
                }
                break;
            case 404:
                result = {
                    error: {
                        message: 'unknown user',
                        statusCode: response.status
                    }
                };
                break;
            default:
                result = {
                    error: {
                        message: 'server error',
                        statusCode: response.status
                    }
                };
            }
        }

        return result;
    } catch (error) {
        logger.error('unable to fetch data: ', error);
        throw error;
    }
}
