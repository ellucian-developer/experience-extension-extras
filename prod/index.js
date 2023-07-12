"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _dataQuery = require("./components/data-query");
Object.keys(_dataQuery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dataQuery[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _dataQuery[key];
    }
  });
});
var _experienceTokenQuery = require("./data/experience-token-query.js");
Object.keys(_experienceTokenQuery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _experienceTokenQuery[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _experienceTokenQuery[key];
    }
  });
});
var _userTokenDataConnectQuery = require("./data/user-token-data-connect-query.js");
Object.keys(_userTokenDataConnectQuery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _userTokenDataConnectQuery[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _userTokenDataConnectQuery[key];
    }
  });
});
var _userTokenBusinessProcessQuery = require("./data/user-token-business-process-query.js");
Object.keys(_userTokenBusinessProcessQuery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _userTokenBusinessProcessQuery[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _userTokenBusinessProcessQuery[key];
    }
  });
});