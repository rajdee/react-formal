"use strict";

exports.__esModule = true;
exports.default = resolveFieldComponent;

var _Input = _interopRequireDefault(require("../inputs/Input"));

var _config = _interopRequireDefault(require("../config"));

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveFieldComponent(type, schema) {
  if (!type && schema) {
    var meta = schema.meta && schema.meta() || {};
    type = meta[_config.default.metadataField] || schema._type;
  }

  var Component = type;

  if (typeof type === 'string') {
    Component = _types.default[type.toLowerCase()] || _Input.default;
  }

  return [Component, type];
}

module.exports = exports["default"];