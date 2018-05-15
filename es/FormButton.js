var _jsxFileName = "src/FormButton.js";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import chain from 'chain-function';
import PropTypes from 'prop-types';
import React from 'react';
import Trigger from './FormTrigger';

function mergeWithEvents(events, objects) {
  var result = _extends.apply(void 0, [{}].concat(objects));

  if (events) [].concat(events).forEach(function (event) {
    var handlers = objects.map(function (p) {
      return p[event];
    });
    result[event] = chain.apply(void 0, handlers);
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
    return React.createElement(Trigger, {
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
      })) : React.createElement(Component, _extends({}, mergeWithEvents(events, [props, meta.props]), {
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
}(React.Component);

FormButton.propTypes = {
  /**
   * The `<button/>` type
   */
  type: PropTypes.oneOf(['button', 'submit']),

  /**
   * Specify a group to validate, if empty the entire form will be validated.
   * If the button type is 'submit' the group will be ignored and the
   * entire form will be validated prior to submission.
   */
  group: PropTypes.string,

  /**
   * The key of `Form` that "owns" this button. Validation will be triggered
   * only for that `Form`.
   */
  formKey: PropTypes.string,

  /**
   * When a function, `children` is called with the Form submitting state
   *
   * ```js
   * <Form.Button>
   *   {submitting => submitting ? 'Saving…' : 'Submit'}
   * </Form.Button>
   * ```
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  /**
   * An array of event names that trigger validation.
   *
   * @default 'onClick'
   */
  events: PropTypes.arrayOf(PropTypes.string)
};
FormButton.defaultProps = {
  type: 'button',
  component: 'button',
  events: ['onClick']
};
export default FormButton;