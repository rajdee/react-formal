var _jsxFileName = "src/Summary.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
/**
 * Display all Form validation `errors` in a single summary list.
 *
 * ```editable
 * <Form
 *   schema={modelSchema}
 *   defaultValue={modelSchema.default()}
 * >
 *   <Form.Summary/>
 *
 *   <Form.Field name='name.first' placeholder='first'/>
 *   <Form.Field name='name.last' placeholder='surname'/>
 *   <Form.Field name='dateOfBirth' placeholder='dob'/>
 *
 *   <Form.Button>Validate</Form.Button>
 * </Form>
 * ```
 */

var Summary =
/*#__PURE__*/
function (_React$PureComponent) {
  function Summary() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Summary.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        formatMessage = _this$props.formatMessage,
        props = _objectWithoutProperties(_this$props, ["formatMessage"]);

    return React.createElement(Message, _extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64
      },
      __self: this
    }), function (messages) {
      return messages.map(formatMessage);
    });
  };

  _inheritsLoose(Summary, _React$PureComponent);

  return Summary;
}(React.PureComponent);

Summary.propTypes = {
  /**
   * An error message renderer, Should return a `ReactElement`
   * ```
   * function(
   *   message: string,
   *   idx: number,
   *   messages: array
   * ) -> ReactElement
   * ```
   */
  formatMessage: PropTypes.func.isRequired,

  /**
   * A DOM node tag name or Component class the Message should render as.
   */
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,

  /**
   * A css class that should be always be applied to the Summary container.
   */
  errorClass: PropTypes.string,

  /**
   * Specify a group to show errors for, if empty all form errors will be shown in the Summary.
   */
  group: PropTypes.string
};
Summary.defaultProps = {
  component: 'ul',
  formatMessage: function formatMessage(message, idx) {
    return React.createElement("li", {
      key: idx,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      },
      __self: this
    }, message);
  }
};
export default Summary;