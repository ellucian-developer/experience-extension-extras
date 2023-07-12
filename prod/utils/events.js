"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchEvent = dispatchEvent;
exports.useEventListener = useEventListener;
var _react = require("react");
// Copyright 2021-2023 Ellucian Company L.P. and its affiliates.

// create a non-visible document element
// eslint-disable-next-line no-undef
window.eventsElement = window.eventsElement || document.createElement('events');
function getElement(_ref) {
  var element = _ref.element;
  // eslint-disable-next-line no-undef
  return element || window.eventsElement;
}
function useEventListener(options) {
  var element = getElement(options);
  var name = options.name,
    handler = options.handler;
  var handleEvent = (0, _react.useCallback)(function (event) {
    handler(event.detail);
  }, [handler]);
  (0, _react.useEffect)(function () {
    element.addEventListener(name, handleEvent, false);
    return function () {
      element.removeEventListener(name, handleEvent, false);
    };
  }, [handleEvent]);
}
function dispatchEvent(options) {
  var name = options.name,
    data = options.data;
  var element = getElement(options);

  // eslint-disable-next-line no-undef
  var event = new CustomEvent(name, {
    detail: data
  });
  element.dispatchEvent(event);
}