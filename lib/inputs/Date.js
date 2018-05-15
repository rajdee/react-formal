"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("./Input"));

var _jsxFileName = "src/inputs/Date.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

var pad = function pad(n) {
  return n < 10 ? '0' + n : n;
};

var isValid = function isValid(date) {
  return date && !isNaN(date.getTime());
};

var toLocal = function toLocal(date) {
  if (!date) return null;
  date = new Date(date);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

var parse = function parse(date, org, part) {
  return toLocal(part === 'time' ? toDateString(org || new Date(), 'date') + 'T' + date : date);
};

var localISOString = function localISOString(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + '.000';
};

var toDateString = function toDateString(date, part) {
  if (!isValid(date)) return '';
  date = localISOString(date);
  if (part === 'date') date = date.substr(0, 10);
  if (part === 'time') date = date.substr(11);
  return date;
};

var DateInput =
/*#__PURE__*/
function (_React$Component) {
  function DateInput() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DateInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        _this$props$type = _this$props.type,
        type = _this$props$type === void 0 ? 'date' : _this$props$type,
        props = _objectWithoutProperties(_this$props, ["value", "type"]);

    return _react.default.createElement(_Input.default, _extends({}, props, {
      type: type,
      value: toDateString(value, type),
      onChange: function onChange(stringValue) {
        return props.onChange(parse(stringValue, value, type));
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      },
      __self: this
    }));
  };

  _inheritsLoose(DateInput, _React$Component);

  return DateInput;
}(_react.default.Component);

DateInput.propTypes = {
  value: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func,
  type: _propTypes.default.string
};
var _default = DateInput;
exports.default = _default;
module.exports = exports["default"];