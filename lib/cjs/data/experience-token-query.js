"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.experienceTokenQuery = experienceTokenQuery;
var _jsonData = require("./json-data");
var _loglevel = _interopRequireDefault(require("loglevel"));
const logger = _loglevel.default.getLogger('default');
async function experienceTokenQuery({
  getExtensionJwt,
  queryKeys,
  queryParameters,
  signal
}) {
  const {
    id,
    resource,
    searchParameters = {}
  } = queryKeys;
  const {
    accept: acceptParameter,
    serviceUrl,
    ...otherQueryParameters
  } = queryParameters;
  if (otherQueryParameters && Object.keys(otherQueryParameters).length > 0) {
    logger.error('Unknown experienceTokenQuery queryParamaters. Please correct', JSON.stringify(otherQueryParameters, null, 2));
  }
  try {
    const urlSearchParameters = new URLSearchParams(searchParameters).toString();
    let url = serviceUrl?.trim();
    if (!serviceUrl.endsWith(`/${resource}`)) {
      if (!serviceUrl.endsWith('/')) {
        url += '/';
      }
      url = `${url}${resource}`;
    }
    if (id) {
      url = `${url}/${id}`;
    }
    if (urlSearchParameters.length > 0) {
      url = `${url}?${urlSearchParameters}`;
    }
    const options = {
      headers: {
        Accept: acceptParameter || 'application/json'
      },
      signal
    };
    const response = await (0, _jsonData.fetchJsonData)({
      getJwt: getExtensionJwt,
      options,
      url
    });
    return response;
  } catch (error) {
    logger.error('unable to fetch data: ', error);
    throw error;
  }
}
//# sourceMappingURL=experience-token-query.js.map