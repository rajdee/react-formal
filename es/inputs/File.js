var _jsxFileName = "src/inputs/File.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

var FileInput =
/*#__PURE__*/
function (_React$Component) {
  function FileInput() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.handleChange = function (_, _ref) {
      var files = _ref.target.files;
      var _this$props = _this.props,
          multiple = _this$props.multiple,
          onChange = _this$props.onChange;
      if (onChange) onChange(multiple ? files : files[0]);
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = FileInput.prototype;

  _proto.render = function render() {
    var props = _extends({}, this.props);

    delete props.value;
    return React.createElement(Input, _extends({}, props, {
      type: "file",
      onChange: this.handleChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }));
  };

  _inheritsLoose(FileInput, _React$Component);

  return FileInput;
}(React.Component);

FileInput.propTypes = {
  multiple: PropTypes.bool,
  onChange: PropTypes.func
};
export default FileInput;