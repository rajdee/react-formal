"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("./Input"));

var _jsxFileName = "src/inputs/Number.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var isValid = function isValid(num) {
  return typeof num === 'number' && !isNaN(num);
};

var NumberInput =
/*#__PURE__*/
function (_React$Component) {
  function NumberInput() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.handleChange = function (value, e) {
      var current = _this.props.value;
      var number = e.target.valueAsNumber;
      if (!isValid(number)) return _this.props.onChange(null);
      if (number !== current) return _this.props.onChange(number);
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = NumberInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        props = _objectWithoutProperties(_this$props, ["value"]);

    return _react.default.createElement(_Input.default, _extends({}, props, {
      type: "number",
      value: value,
      onChange: this.handleChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    }));
  };

  _inheritsLoose(NumberInput, _React$Component);

  return NumberInput;
}(_react.default.Component);

NumberInput.propTypes = {
  value: _propTypes.default.number,
  onChange: _propTypes.default.func
};
var _default = NumberInput;
exports.default = _default;
module.exports = exports["default"];