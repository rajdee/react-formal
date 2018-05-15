"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Input = _interopRequireDefault(require("../inputs/Input"));

var _Date = _interopRequireDefault(require("../inputs/Date"));

var _Number = _interopRequireDefault(require("../inputs/Number"));

var _Bool = _interopRequireDefault(require("../inputs/Bool"));

var _File = _interopRequireDefault(require("../inputs/File"));

var _Select = _interopRequireDefault(require("../inputs/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

var localDt = 'datetime-local';

var wrapWithDefaults = function wrapWithDefaults(Component, defaults) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    function _class() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      return _react.default.createElement(Component, _extends({}, defaults, this.props, {
        type: defaults.type || this.props.type
      }));
    };

    _inheritsLoose(_class, _React$Component);

    return _class;
  }(_react.default.Component), _class.propTypes = {
    type: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func])
  }, _temp;
};

var types = Object.create(null);
types.string = wrapWithDefaults(_Input.default, {
  type: 'text'
});
types.number = _Number.default;
types.date = types.time = types.datetime = types[localDt] = _Date.default;
types.array = types.listbox = wrapWithDefaults(_Select.default, {
  multiple: true
});
types.bool = types.boolean = _Bool.default;
types.textarea = wrapWithDefaults(_Input.default, {
  tagName: 'textarea'
});
types.select = _Select.default;
types.file = _File.default;
var _default = types;
exports.default = _default;
module.exports = exports["default"];