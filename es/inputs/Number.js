var _jsxFileName = "src/inputs/Number.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

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

    return React.createElement(Input, _extends({}, props, {
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
}(React.Component);

NumberInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func
};
export default NumberInput;