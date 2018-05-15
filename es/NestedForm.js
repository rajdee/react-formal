var _jsxFileName = "src/NestedForm.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import PropTypes from 'prop-types';
import React from 'react';
import Form, { Consumer } from './Form';
import { filter, prefix } from './utils/ErrorUtils';
/**
 * A `Form` component that takes a `name` prop. Functions exactly like a normal
 * Form, except that when a `name` is present it will defer errors up to the parent Form,
 * functioning like a Form.Field.
 *
 * This is useful for encapsulating complex input groups into self-contained
 * forms without having to worry about "very.long[1].paths[4].to.fields" for names.
 */

var NestedForm =
/*#__PURE__*/
function (_React$Component) {
  function NestedForm() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.onError = function (formErrors) {
      var _this$props = _this.props,
          name = _this$props.name,
          meta = _this$props.meta,
          onError = _this$props.onError;

      if (name) {
        meta.onError(prefix(formErrors, name));
      } else if (onError) {
        onError(formErrors);
      }
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = NestedForm.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        name = _this$props2.name,
        meta = _this$props2.meta,
        schema = _this$props2.schema,
        errors = _this$props2.errors,
        props = _objectWithoutProperties(_this$props2, ["name", "meta", "schema", "errors"]);

    return React.createElement(Consumer, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, function (_ref) {
      var getSchemaForPath = _ref.getSchemaForPath,
          context = _ref.context;
      return React.createElement(Form, _extends({}, props, {
        onError: _this2.onError,
        errors: name ? filter(meta.errors, name) : errors,
        schema: schema || getSchemaForPath(name),
        context: name ? _extends({}, context, props.context) : props.context,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        },
        __self: this
      }));
    });
  };

  _inheritsLoose(NestedForm, _React$Component);

  return NestedForm;
}(React.Component);

NestedForm.propTypes = {
  name: PropTypes.string.isRequired,
  schema: PropTypes.object,
  errors: PropTypes.object,
  onError: PropTypes.func.isRequired,
  meta: PropTypes.shape({
    errors: PropTypes.object.isRequired,
    onError: PropTypes.func.isRequired
  })
};
export default NestedForm;