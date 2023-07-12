"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _dataQuery = require("./data-query");
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