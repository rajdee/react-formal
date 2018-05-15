"use strict";

exports.__esModule = true;
exports.default = void 0;

var _chainFunction = _interopRequireDefault(require("chain-function"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _FormTrigger = _interopRequireDefault(require("./FormTrigger"));

var _jsxFileName = "src/FormButton.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function mergeWithEvents(events, objects) {
  var result = _extends.apply(void 0, [{}].concat(objects));

  if (events) [].concat(events).forEach(function (event) {
    var handlers = objects.map(function (p) {
      return p[event];
    });
    result[event] = _chainFunction.default.apply(void 0, handlers);
  });
  return result;
}
/**
 * A Form Button, for triggering validations for specific Field groups
 */


var FormButton =
/*#__PURE__*/
function (_React$Component) {
  function FormButton() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = FormButton.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        group = _this$props.group,
        events = _this$props.events,
        Component = _this$props.component,
        formKey = _this$props.formKey,
        children = _this$props.children,
        props = _objectWithoutProperties(_this$props, ["group", "events", "component", "formKey", "children"]);

    if (props.type.toLowerCase() === 'submit') group = '@submit';
    return _react.default.createElement(_FormTrigger.default, {
      formKey: formKey,
      group: group,
      events: events,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 80
      },
      __self: this
    }, function (meta) {
      return typeof children === 'function' ? children(_extends({}, meta, {
        props: mergeWithEvents(events, [props, meta.props])
      })) : _react.default.createElement(Component, _extends({}, mergeWithEvents(events, [props, meta.props]), {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        },
        __self: this
      }), children);
    });
  };

  _inheritsLoose(FormButton, _React$Component);

  return FormButton;
}(_react.default.Component);

FormButton.propTypes = {
  /**
   * The `<button/>` type
   */
  type: _propTypes.default.oneOf(['button', 'submit']),

  /**
   * Specify a group to validate, if empty the entire form will be validated.
   * If the button type is 'submit' the group will be ignored and the
   * entire form will be validated prior to submission.
   */
  group: _propTypes.default.string,

  /**
   * The key of `Form` that "owns" this button. Validation will be triggered
   * only for that `Form`.
   */
  formKey: _propTypes.default.string,

  /**
   * When a function, `children` is called with the Form submitting state
   *
   * ```js
   * <Form.Button>
   *   {submitting => submitting ? 'Saving…' : 'Submit'}
   * </Form.Button>
   * ```
   */
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  component: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /**
   * An array of event names that trigger validation.
   *
   * @default 'onClick'
   */
  events: _propTypes.default.arrayOf(_propTypes.default.string)
};
FormButton.defaultProps = {
  type: 'button',
  component: 'button',
  events: ['onClick']
};
var _default = FormButton;
exports.default = _default;
module.exports = exports["default"];