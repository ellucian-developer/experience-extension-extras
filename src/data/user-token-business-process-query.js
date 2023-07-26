/* eslint-disable max-depth */
// Copyright 2021-2023 Ellucian Company L.P. and its affiliates.

import log from 'loglevel';
const logger = log.getLogger('default');

export async function userTokenBusinessProcessQuery({ authenticatedEthosFetch, queryKeys, queryParameters, signal }) {
    const { resource, searchParameters = {} } = queryKeys;
    const { accept: acceptParameter, Accept: AcceptParameter, acceptVersion, ...otherQueryParameters } = queryParameters;

    if (otherQueryParameters && Object.keys(otherQueryParameters).length > 0) {
        logger.error('Unknown experienceTokenQuery queryParamaters. Please correct', JSON.stringify(otherQueryParameters, null, 2));
    }

    try {
        const urlSearchParameters = new URLSearchParams(searchParameters).toString();
        let resourcePath;

        if (urlSearchParameters.length > 0) {
            resourcePath = `${resource}?${urlSearchParameters}`
        } else {
            resourcePath = resource;
        }

        if (!acceptParameter && !AcceptParameter && !acceptVersion) {
            logger.warn(`Banner Business Process APIs should be called with a specific 'accept' string. You can do this with either an 'accept' or 'acceptVersion' queryParameter`)
        }
        const accept = acceptParameter || AcceptParameter
            ? acceptParameter || AcceptParameter
            : `application/vnd.hedtech.integration.v${acceptVersion ? acceptVersion : '1.0.0'}+json`;

        const response = await authenticatedEthosFetch(resourcePath, {
            headers: {
                Accept: accept
            },
            signal
        });

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
