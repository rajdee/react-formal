var _jsxFileName = "src/inputs/Bool.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

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

    return React.createElement(Input, _extends({}, props, {
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
}(React.Component);

BooleanInput.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func
};
export default BooleanInput;