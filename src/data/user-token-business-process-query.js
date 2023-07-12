/* eslint-disable max-depth */
// Copyright 2021-2023 Ellucian Company L.P. and its affiliates.

import log from 'loglevel';
const logger = log.getLogger('default');

export async function userTokenBusinessProcessQuery({ queryKeys, queryParameters }) {
    const { resource, searchParameters = {} } = queryKeys;
    const { accept: acceptParameter, acceptVersion, authenticatedEthosFetch } = queryParameters;

    try {
        const urlSearchParameters = new URLSearchParams(searchParameters).toString();
        let resourcePath;

        if (urlSearchParameters.length > 0) {
            resourcePath = `${resource}?${urlSearchParameters}`
        } else {
            resourcePath = resource;
        }

        const accept = acceptParameter ? acceptParameter : `application/vnd.hedtech.integration.v${acceptVersion ? acceptVersion : '1.0.0'}+json`;

        const response = await authenticatedEthosFetch(resourcePath, {
            headers: {
                Accept: accept
            }
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
