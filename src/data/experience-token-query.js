import { fetchJsonData } from './json-data';

import log from 'loglevel';
const logger = log.getLogger('default');

export async function experienceTokenQuery({ queryKeys, queryParameters }) {
    const { id, resource, searchParameters = {} } = queryKeys;
    const { getExtensionJwt, serviceUrl } = queryParameters;

    try {
        const urlSearchParameters = new URLSearchParams(searchParameters).toString();

        let url = serviceUrl.trim();
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

        const response = await fetchJsonData({
            url,
            getJwt: getExtensionJwt
        });

        return  response;
    } catch (error) {
        logger.error('unable to fetch data: ', error);
        throw error;
    }
}