var _jsxFileName = "src/Message.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uniq from './utils/uniqMessage';
import { filterAndMapMessages, namesForGroup } from './utils/ErrorUtils';
import FormContext from './FormContext';

var flatten = function flatten(arr, next) {
  return arr.concat(next);
};

var channels = ['messages', 'groups'];
/**
 * Represents a Form validation error message. Only renders when the
 * value that it is `for` is invalid.
 *
 * @alias Message
 */

var Message =
/*#__PURE__*/
function (_React$PureComponent) {
  function Message() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Message.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        names = _this$props.for,
        group = _this$props.group,
        formKey = _this$props.formKey,
        className = _this$props.className,
        errorClass = _this$props.errorClass,
        extract = _this$props.extract,
        filter = _this$props.filter,
        children = _this$props.children,
        props = _objectWithoutProperties(_this$props, ["for", "group", "formKey", "className", "errorClass", "extract", "filter", "children"]);

    return React.createElement(FormContext.Subscriber, {
      formKey: formKey,
      channels: channels,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75
      },
      __self: this
    }, function (messages, groups) {
      messages = filterAndMapMessages({
        messages: messages,
        names: names || namesForGroup(group, groups)
      });
      if (!messages || !Object.keys(messages).length) return null;
      return children(Object.values(messages).reduce(flatten, []).filter(function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return filter.apply(void 0, args.concat([extract]));
      }).map(extract), _extends({}, props, {
        className: cn(className, errorClass)
      }));
    });
  };

  _inheritsLoose(Message, _React$PureComponent);

  return Message;
}(React.PureComponent);

Message.propTypes = {
  for: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  group: PropTypes.string,
  formKey: PropTypes.string,

  /**
   * A function that maps an array of message strings
   * and returns a renderable string or ReactElement.
   *
   * ```js
   * <Message>
   *  {messages => messages.join(', ')}
   * </Message>
   * ```
   */
  children: PropTypes.func,

  /**
   * A css class that should be always be applied to the Message container.
   */
  errorClass: PropTypes.string,

  /**
   * Map the passed in message object for the field to a string to display
   */
  extract: PropTypes.func,
  filter: PropTypes.func
};
Message.defaultProps = {
  errorClass: 'validation-error',
  filter: uniq,
  extract: function extract(error) {
    return error.message || error;
  },
  children: function children(messages, props) {
    return React.createElement("span", _extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      },
      __self: this
    }), messages.join(', '));
  }
};
export default Message;