"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jsxFileName = "src/inputs/Input.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

var Input =
/*#__PURE__*/
function (_React$Component) {
  function Input() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Input.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$tagName = _this$props.tagName,
        Tag = _this$props$tagName === void 0 ? 'input' : _this$props$tagName,
        value = _this$props.value,
        inputRef = _this$props.inputRef,
        props = _objectWithoutProperties(_this$props, ["tagName", "value", "inputRef"]);

    delete props.meta;
    if (value === null) value = '';
    return _react.default.createElement(Tag, _extends({}, props, {
      value: value,
      ref: inputRef,
      onChange: function onChange(e) {
        return props.onChange(e.target.value, e);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    }));
  };

  _inheritsLoose(Input, _React$Component);

  return Input;
}(_react.default.Component);

Input.propTypes = {
  value: _propTypes.default.any,
  onChange: _propTypes.default.func,
  tagName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),
  inputRef: _propTypes.default.func
};
var _default = Input;
exports.default = _default;
module.exports = exports["default"];