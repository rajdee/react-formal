var _jsxFileName = "src/inputs/Select.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Input from './Input';

var toArray = React.Children.toArray || function (children) {
  var result = [];
  React.Children.map(children, function (c) {
    return result.push(c);
  });
  return result;
};

var Select =
/*#__PURE__*/
function (_React$Component) {
  function Select() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.handleChange = function () {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          children = _this$props.children;
      var node = findDOMNode(_assertThisInitialized(_assertThisInitialized(_this)));
      children = toArray(children);

      if (!_this.props.multiple) {
        var selected = children[node.selectedIndex];
        return _this.props.onChange(selected.props.value);
      }

      var values = [];
      [].forEach.call(node.options, function (option, i) {
        if (option.selected) {
          var _selected = children[i];
          values.push(_selected.props.value);
        }
      });
      onChange(values);
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Select.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        value = _this$props2.value,
        children = _this$props2.children,
        _this$props2$tagName = _this$props2.tagName,
        tagName = _this$props2$tagName === void 0 ? 'select' : _this$props2$tagName,
        props = _objectWithoutProperties(_this$props2, ["value", "children", "tagName"]);

    if (value === null) value = props.multiple ? [] : '';
    return React.createElement(Input, _extends({}, props, {
      tagName: tagName,
      value: value,
      onChange: this.handleChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }), children);
  };

  _inheritsLoose(Select, _React$Component);

  return Select;
}(React.Component);

Select.propTypes = {
  value: PropTypes.any,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  tagName: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
export default Select;