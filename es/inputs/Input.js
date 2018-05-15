var _jsxFileName = "src/inputs/Input.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

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
    return React.createElement(Tag, _extends({}, props, {
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
}(React.Component);

Input.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  tagName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  inputRef: PropTypes.func
};
export default Input;