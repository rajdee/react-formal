"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("./Input"));

var _jsxFileName = "src/inputs/File.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

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
    return _react.default.createElement(_Input.default, _extends({}, props, {
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
}(_react.default.Component);

FileInput.propTypes = {
  multiple: _propTypes.default.bool,
  onChange: _propTypes.default.func
};
var _default = FileInput;
exports.default = _default;
module.exports = exports["default"];