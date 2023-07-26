import { fetchJsonData } from './json-data';

import log from 'loglevel';
const logger = log.getLogger('default');

export async function experienceTokenQuery({ getExtensionJwt, queryKeys, queryParameters, signal }) {
    const { id, resource, searchParameters = {} } = queryKeys;
    const { accept: acceptParameter, serviceUrl, ...otherQueryParameters } = queryParameters;

    if (otherQueryParameters && Object.keys(otherQueryParameters).length > 0) {
        logger.error('Unknown experienceTokenQuery queryParamaters. Please correct', JSON.stringify(otherQueryParameters, null, 2));
    }

    try {
        const urlSearchParameters = new URLSearchParams(searchParameters).toString();

        let url = serviceUrl?.trim();
        if (!serviceUrl.endsWith(`/${resource}`)) {
            if (!serviceUrl.endsWith('/')) {
                url += '/'
            }
            url = `${url}${resource}`;
        }

        if (id) {
            url = `${url}/${id}`
        }

        if (urlSearchParameters.length > 0) {
            url = `${url}?${urlSearchParameters}`
        }

        const options = {
            headers: {
                Accept: acceptParameter || 'application/json'
            },
            signal
        };

        const response = await fetchJsonData({
            getJwt: getExtensionJwt,
            options,
            url
        });

        return  response;
    } catch (error) {
        logger.error('unable to fetch data: ', error);
        throw error;
    }
}