"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postJsonData = exports.fetchJsonData = exports.deleteJsonData = void 0;
var _jwtDecode = require("jwt-decode");
var _loglevel = _interopRequireDefault(require("loglevel"));
// Copyright 2021-2023 Ellucian Company L.P. and its affiliates.

const logger = _loglevel.default.getLogger('default');
const defaultOptions = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};
let cachedJwt, getJwtPromise;
async function getCachedJwt({
  getJwt
}) {
  let expired = !cachedJwt;
  if (cachedJwt) {
    // ensure it doesn't expire too soon
    const decodedJwt = (0, _jwtDecode.jwtDecode)(cachedJwt);
    const {
      exp
    } = decodedJwt;
    const expiresSoon = new Date().getTime() / 1000 + 1 * 60;
    if (exp < expiresSoon) {
      expired = true;
    }
  }
  if (expired) {
    if (getJwtPromise) {
      // a request is in play
      await getJwtPromise;
    } else {
      getJwtPromise = getJwt();

      // eslint-disable-next-line require-atomic-updates
      cachedJwt = await getJwtPromise;

      // reset the promse
      // eslint-disable-next-line require-atomic-updates
      getJwtPromise = undefined;
    }
  }
  return cachedJwt;
}
async function addAuthorization({
  requestOptions,
  getJwt,
  token: paramToken
}) {
  let token = paramToken;
  if (!paramToken && getJwt) {
    const jwt = await getCachedJwt({
      getJwt
    });
    token = typeof jwt === 'object' ? jwt.access_token : jwt;
  }
  requestOptions.headers.Authorization = `Bearer ${token}`;
}
const fetchJsonData = async ({
  url,
  options,
  getJwt,
  token
}) => {
  let result = {
    error: 'NO_DATA'
  };
  const requestOptions = Object.assign({}, defaultOptions, options);
  await addAuthorization({
    requestOptions,
    getJwt,
    token
  });
  let response;
  try {
    response = await fetch(url, requestOptions);
  } catch (error) {
    if (error.name !== 'AbortError') {
      logger.error('error: ', error);
    }
    return {
      error: 'NO_DATA'
    };
  }
  if (response) {
    let parsed;
    switch (response.status) {
      case 200:
        parsed = await response.json();
        if (parsed.data) {
          result = parsed;
        } else {
          result = {
            data: parsed
          };
        }
        break;
      case 400:
      case 404:
        if (process.env.MOCK_DATA_ON_ERROR === 'true') {
          result = {
            error: 'NO_DATA'
          };
        } else {
          parsed = await response.json();
          if (parsed.error) {
            result = parsed;
          } else {
            result = {
              error: 'UNKNOWN_USER',
              errorMessage: parsed
            };
          }
        }
        break;
      default:
        if (process.env.MOCK_DATA_ON_ERROR === 'true') {
          result = {
            error: 'NO_DATA'
          };
        } else {
          result.error = `STATUS_${response.status}`;
          result.errorMessage = await response.json();
        }
    }
  } else if (process.env.MOCK_DATA_ON_ERROR === 'true') {
    result = {
      error: 'NO_DATA'
    };
  } else {
    result = {
      error: 'NO_DATA'
    };
  }
  return result;
};
exports.fetchJsonData = fetchJsonData;
const postJsonData = async ({
  url,
  data,
  options,
  getJwt,
  token
}) => {
  let result = {
    error: 'NO_DATA'
  };
  const requestOptions = Object.assign({}, defaultOptions, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }, options);
  await addAuthorization({
    requestOptions,
    getJwt,
    token
  });
  const response = await fetch(url, requestOptions);
  if (response) {
    let parsed;
    switch (response.status) {
      case 200:
        try {
          parsed = await response.json();
          if (parsed.data) {
            result = parsed;
          } else {
            result = {
              data: parsed
            };
          }
        } catch (parseError) {
          result = {
            error: 'JSON_PARSE_ERROR',
            errorMessage: 'Unable to parse json response'
          };
        }
        break;
      case 400:
        parsed = await response.json();
        if (parsed.error) {
          result = parsed;
        } else {
          result = {
            error: 'UNKNOWN_USER',
            errorMessage: parsed
          };
        }
        break;
      default:
        parsed = await response.json();
        result.error = `STATUS_${response.status}`;
        result.errorMessage = parsed;

        // handle errors array from Orchestration
        if (parsed.errors) {
          result.errorMessage = parsed.errors[0].message.message;
        }
    }
  } else {
    return {
      error: 'NO_DATA'
    };
  }
  return result;
};
exports.postJsonData = postJsonData;
const deleteJsonData = async ({
  url,
  options,
  getExtensionJwt
}) => {
  let result = {
    error: 'NO_DATA'
  };
  const requestOptions = Object.assign({}, defaultOptions, {
    method: 'DELETE'
  }, options);
  await addAuthorization({
    requestOptions,
    getExtensionJwt
  });
  let response;
  try {
    response = await fetch(url, requestOptions);
  } catch (error) {
    logger.error('error: ', error);
  }
  if (response) {
    let parsed;
    switch (response.status) {
      case 200:
        parsed = await response.json();
        if (parsed.data) {
          result = parsed;
        } else {
          result = {
            data: parsed
          };
        }
        break;
      case 400:
        parsed = await response.json();
        if (parsed.error) {
          result = parsed;
        } else {
          result = {
            error: 'UNKNOWN_USER',
            errorMessage: parsed
          };
        }
        break;
      default:
        result.error = `STATUS_${response.status}`;
        result.errorMessage = await response.json();
    }
  } else {
    result = {
      error: 'NO_DATA'
    };
  }
  return result;
};
exports.deleteJsonData = deleteJsonData;
//# sourceMappingURL=json-data.js.map