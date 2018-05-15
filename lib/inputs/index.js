"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Bool = _interopRequireDefault(require("./Bool"));

exports.Bool = _Bool.default;

var _Date = _interopRequireDefault(require("./Date"));

exports.Date = _Date.default;

var _Number = _interopRequireDefault(require("./Number"));

exports.Number = _Number.default;

var _File = _interopRequireDefault(require("./File"));

exports.File = _File.default;

var _Select = _interopRequireDefault(require("./Select"));

exports.Select = _Select.default;

var _Input = _interopRequireDefault(require("./Input"));

exports.Input = _Input.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Bool: _Bool.default,
  Date: _Date.default,
  Number: _Number.default,
  File: _File.default,
  Select: _Select.default,
  Input: _Input.default
};
exports.default = _default;