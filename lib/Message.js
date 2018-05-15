"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _uniqMessage = _interopRequireDefault(require("./utils/uniqMessage"));

var _ErrorUtils = require("./utils/ErrorUtils");

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _jsxFileName = "src/Message.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

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

    return _react.default.createElement(_FormContext.default.Subscriber, {
      formKey: formKey,
      channels: channels,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 75
      },
      __self: this
    }, function (messages, groups) {
      messages = (0, _ErrorUtils.filterAndMapMessages)({
        messages: messages,
        names: names || (0, _ErrorUtils.namesForGroup)(group, groups)
      });
      if (!messages || !Object.keys(messages).length) return null;
      return children(Object.values(messages).reduce(flatten, []).filter(function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return filter.apply(void 0, args.concat([extract]));
      }).map(extract), _extends({}, props, {
        className: (0, _classnames.default)(className, errorClass)
      }));
    });
  };

  _inheritsLoose(Message, _React$PureComponent);

  return Message;
}(_react.default.PureComponent);

Message.propTypes = {
  for: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  group: _propTypes.default.string,
  formKey: _propTypes.default.string,

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
  children: _propTypes.default.func,

  /**
   * A css class that should be always be applied to the Message container.
   */
  errorClass: _propTypes.default.string,

  /**
   * Map the passed in message object for the field to a string to display
   */
  extract: _propTypes.default.func,
  filter: _propTypes.default.func
};
Message.defaultProps = {
  errorClass: 'validation-error',
  filter: _uniqMessage.default,
  extract: function extract(error) {
    return error.message || error;
  },
  children: function children(messages, props) {
    return _react.default.createElement("span", _extends({}, props, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 57
      },
      __self: this
    }), messages.join(', '));
  }
};
var _default = Message;
exports.default = _default;
module.exports = exports["default"];