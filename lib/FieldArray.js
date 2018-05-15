"use strict";

exports.__esModule = true;
exports.default = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ErrorUtils = require("./utils/ErrorUtils");

var _Field = _interopRequireDefault(require("./Field"));

var _jsxFileName = "src/FieldArray.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function filter(messages, baseName) {
  var paths = Object.keys(messages || {});
  var result = {};
  paths.forEach(function (path) {
    if (path.indexOf(baseName) !== 0) return;
    result[path] = messages[path];
  });
  return result;
}
/**
 * A specialized `Form.Field` component that handles array fields.
 * Specifically it handles errors correctly when items are added, removed, or
 * reordered.
 */


var FieldArray =
/*#__PURE__*/
function (_React$Component) {
  function FieldArray() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.onAdd = function (item) {
      var value = _this.fieldProps.value;

      _this.onInsert(item, value ? value.length : 0);
    }, _this.onUpdate = function (updatedItem, oldItem) {
      var _this$fieldProps = _this.fieldProps,
          value = _this$fieldProps.value,
          onChange = _this$fieldProps.onChange;
      var index = value.indexOf(oldItem);
      var newValue = value == null ? [] : value.concat();
      newValue.splice(index, 1, updatedItem);
      onChange(newValue);
    }, _this.onInsert = function (item, index) {
      var _this$fieldProps2 = _this.fieldProps,
          value = _this$fieldProps2.value,
          onChange = _this$fieldProps2.onChange;
      var newValue = value == null ? [] : value.concat();
      newValue.splice(index, 0, item);
      onChange(newValue);

      _this.sendErrors(function (errors, name) {
        return (0, _ErrorUtils.unshift)(errors, name, index);
      });
    }, _this.onMove = function (item, toIndex) {
      var _this$fieldProps3 = _this.fieldProps,
          value = _this$fieldProps3.value,
          onChange = _this$fieldProps3.onChange;
      var fromIndex = value.indexOf(item);
      var newValue = value == null ? [] : value.concat();
      !(fromIndex !== -1) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, '`onMove` must be called with an item in the array') : invariant(false) : void 0;
      newValue.splice.apply(newValue, [toIndex, 0].concat(newValue.splice(fromIndex, 1))); // FIXME: doesn't handle syncing error state.

      onChange(newValue, {
        action: 'move',
        toIndex: toIndex,
        fromIndex: fromIndex
      });

      _this.sendErrors(function (errors, name) {
        return (0, _ErrorUtils.move)(errors, name, fromIndex, toIndex);
      });
    }, _this.onRemove = function (item) {
      var _this$fieldProps4 = _this.fieldProps,
          value = _this$fieldProps4.value,
          onChange = _this$fieldProps4.onChange;
      if (value == null) return;
      var index = value.indexOf(item);
      onChange(value.filter(function (v) {
        return v !== item;
      }));

      _this.sendErrors(function (errors, name) {
        return (0, _ErrorUtils.shift)(errors, name, index);
      });
    }, _this.mapValues = function (fn) {
      var _this$fieldProps5 = _this.fieldProps,
          value = _this$fieldProps5.value,
          name = _this$fieldProps5.name;
      return value.map(function (item, index) {
        return fn(item, name + "[" + index + "]", index);
      });
    }, _this.items = function () {
      var _this$fieldProps6 = _this.fieldProps,
          values = _this$fieldProps6.value,
          name = _this$fieldProps6.name;
      return !values ? [] : values.map(function (value, index) {
        var itemName = name + "[" + index + "]";
        var itemErrors = filter(_this.meta.errors, itemName);
        return {
          value: value,
          name: itemName,
          onChange: function onChange(item) {
            return _this.onUpdate(item, values[index]);
          },
          meta: _extends({}, _this.meta, {
            errors: itemErrors,
            valid: !Object.keys(itemErrors).length,
            invalid: !!Object.keys(itemErrors).length,
            onError: function onError(errors) {
              return _this.onItemError(itemName, errors);
            }
          })
        };
      });
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = FieldArray.prototype;

  _proto.onItemError = function onItemError(name, errors) {
    this.sendErrors(function (fieldErrors) {
      return _extends({}, (0, _ErrorUtils.remove)(fieldErrors, name), errors);
    });
  };

  _proto.sendErrors = function sendErrors(fn) {
    var name = this.fieldProps.name;
    var _this$meta = this.meta,
        errors = _this$meta.errors,
        onError = _this$meta.onError;
    onError(fn(errors || {}, name));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        children = _this$props.children,
        fieldProps = _objectWithoutProperties(_this$props, ["children"]);

    return _react.default.createElement(_Field.default, _extends({}, fieldProps, {
      noResolveType: true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 129
      },
      __self: this
    }), function (_ref) {
      var meta = _ref.meta,
          props = _objectWithoutProperties(_ref, ["meta"]);

      _this2.fieldProps = props;
      _this2.meta = meta;

      var nextProps = _extends({}, props, {
        meta: meta,
        arrayHelpers: {
          items: _this2.items,
          add: _this2.onAdd,
          move: _this2.onMove,
          insert: _this2.onInsert,
          remove: _this2.onRemove,
          update: _this2.onUpdate
        }
      });

      return typeof children === 'function' ? children(nextProps) : _react.default.cloneElement(children, nextProps);
    });
  };

  _inheritsLoose(FieldArray, _React$Component);

  return FieldArray;
}(_react.default.Component);

FieldArray.propTypes = {
  name: _propTypes.default.string.isRequired
};
var _default = FieldArray;
exports.default = _default;
module.exports = exports["default"];