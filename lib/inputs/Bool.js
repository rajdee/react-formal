"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("./Input"));

var _jsxFileName = "src/inputs/Bool.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

var BooleanInput =
/*#__PURE__*/
function (_React$Component) {
  function BooleanInput() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BooleanInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        props = _objectWithoutProperties(_this$props, ["value"]);

    return _react.default.createElement(_Input.default, _extends({}, props, {
      type: "checkbox",
      checked: !!value,
      onChange: function onChange() {
        return props.onChange(!value);
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: this
    }));
  };

  _inheritsLoose(BooleanInput, _React$Component);

  return BooleanInput;
}(_react.default.Component);

BooleanInput.propTypes = {
  value: _propTypes.default.bool,
  onChange: _propTypes.default.func
};
var _default = BooleanInput;
exports.default = _default;
module.exports = exports["default"];