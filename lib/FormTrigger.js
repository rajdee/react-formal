"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _createChildBridge = _interopRequireDefault(require("topeka/createChildBridge"));

var _warning = _interopRequireDefault(require("warning"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _ErrorUtils = require("./utils/ErrorUtils");

var _jsxFileName = "src/FormTrigger.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

var stringOrArrayOfStrings = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]);

var channels = ['messages', 'groups', 'form', 'submitting'];

var FormTrigger =
/*#__PURE__*/
function (_React$Component) {
  function FormTrigger() {
    var _this;

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;

    _this.handleEvent = function (event) {
      var _this$props = _this.props,
          noValidate = _this$props.noValidate,
          formKey = _this$props.formKey,
          triggers = _this$props.triggers,
          group = _this$props.group;
      var names = triggers || _this.names;
      if (noValidate || !names) return;

      if (!_this.form) {
        return process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, (group === '@submit' ? 'A Form submit event ' : "A validation for " + names + " ") + "was triggered from a component outside the context of a Form. " + "The Field, Button, or Trigger should be wrapped in a Form or Form.Context component" + (formKey ? " with the formKey: \"" + formKey + "\" " : '.')) : void 0;
      }

      if (group === '@submit') return _this.form.onSubmit();

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      _this.form.onValidate(names, event, args);
    };

    _this.getBridgeProps = (0, _createChildBridge.default)(_this.handleEvent);
    return _this;
  }

  var _proto = FormTrigger.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.removeFromGroup && this.removeFromGroup();
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        name = _this$props2.for,
        group = _this$props2.group,
        mapMessages = _this$props2.mapMessages,
        formKey = _this$props2.formKey;
    return _react.default.createElement(_FormContext.default.Subscriber, {
      formKey: formKey,
      channels: channels,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 73
      },
      __self: this
    }, function (messages, groups, form, submitting) {
      if (form && !_this2.removeFromGroup && name && group && group !== '@submit') {
        _this2.removeFromGroup = form.addToGroup(name, group);
      }

      _this2.form = form;
      _this2.names = name || (0, _ErrorUtils.namesForGroup)(group, groups);
      _this2.messages = (0, _ErrorUtils.filterAndMapMessages)({
        messages: messages,
        mapMessages: mapMessages,
        names: _this2.names
      });
      _this2.submitting = !!submitting;
      return _this2.props.children({
        props: _this2.getBridgeProps(_this2.props.events),
        messages: _this2.messages || {},
        submitting: _this2.submitting
      });
    });
  };

  _inheritsLoose(FormTrigger, _React$Component);

  return FormTrigger;
}(_react.default.Component);

FormTrigger.propTypes = {
  formKey: _propTypes.default.string,
  noValidate: _propTypes.default.bool.isRequired,
  events: stringOrArrayOfStrings,
  for: _propTypes.default.string,
  triggers: _propTypes.default.arrayOf(_propTypes.default.string),
  mapMessages: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.element]),
  group: stringOrArrayOfStrings
};
FormTrigger.defaultProps = {
  events: 'onChange',
  noValidate: false
};
var _default = FormTrigger;
exports.default = _default;
module.exports = exports["default"];