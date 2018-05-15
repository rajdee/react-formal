"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _topeka = require("topeka");

var _invariant = _interopRequireDefault(require("invariant"));

var _config = _interopRequireDefault(require("./config"));

var _Form = require("./Form");

var _isNativeType = _interopRequireDefault(require("./utils/isNativeType"));

var _resolveFieldComponent = _interopRequireDefault(require("./utils/resolveFieldComponent"));

var _FormTrigger = _interopRequireDefault(require("./FormTrigger"));

var _ErrorUtils = require("./utils/ErrorUtils");

var _jsxFileName = "src/Field.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function notify(handler, args) {
  handler && handler.apply(void 0, args);
}

function getValue(value, bindTo, getter) {
  if (typeof bindTo === 'function') {
    return bindTo(value, getter);
  }

  if (typeof bindTo === 'string') {
    return getter(bindTo, value);
  }

  return Object.keys(bindTo).reduce(function (obj, key) {
    obj[key] = getValue(value, bindTo[key], getter);
    return obj;
  }, {});
}
/**
 * The Field Component renders a form control and handles input value updates and validations.
 * Changes to the Field value are automatically propagated back up to the containing Form
 * Component.
 *
 * Fields provide a light abstraction over normal input components where values and onChange handlers
 * are take care of for you. Beyond that they just render the input for their type, Fields whille pass along
 * any props and children to the input so you can easily configure new input types.
 *
 * ```editable
 * <Form
 *   noValidate
 *   schema={modelSchema}
 *   defaultValue={{
 *     name: { first: 'Sally'},
 *     colorID: 0
 *   }}
 * >
 *   <label>Name</label>
 *   <Form.Field
 *     name='name.first'
 *     placeholder='First name'
 *   />
 *
 *   <label>Favorite Color</label>
 *   <Form.Field name='colorId' type='select'>
 *     <option value={0}>Red</option>
 *     <option value={1}>Yellow</option>
 *     <option value={2}>Blue</option>
 *     <option value={3}>other</option>
 *   </Form.Field>
 *   <Form.Button type='submit'>Submit</Form.Button>
 * </Form>
 * ```
 */


var Field =
/*#__PURE__*/
function (_React$PureComponent) {
  function Field() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _this.bindTo = function (_value, getter) {
      var _this$props = _this.props,
          mapToValue = _this$props.mapToValue,
          name = _this$props.name;
      var value = getValue(_value, mapToValue || name, getter); // ensure that no inputs are left uncontrolled

      if (value === undefined) value = null;
      return value;
    };

    _this.constructComponent = function (bindingProps, triggerMeta) {
      if (triggerMeta === void 0) {
        triggerMeta = {};
      }

      var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
          formContext = _assertThisInitialize.formContext;

      var _this$props2 = _this.props,
          name = _this$props2.name,
          type = _this$props2.type,
          children = _this$props2.children,
          className = _this$props2.className,
          fieldRef = _this$props2.fieldRef,
          noResolveType = _this$props2.noResolveType,
          _this$props2$errorCla = _this$props2.errorClass,
          errorClass = _this$props2$errorCla === void 0 ? _config.default.errorClass : _this$props2$errorCla;
      var fieldProps = (0, _omit.default)(_this.props, Object.keys(Field.propTypes));
      fieldProps = _extends({
        name: name
      }, _this._fieldProps = fieldProps, _this._bindingProps = bindingProps, _this._triggerProps = triggerMeta.props || {}, _this.eventHandlers);
      var schema;

      try {
        schema = name && formContext.getSchemaForPath(name);
      } catch (err) {
        /* ignore */
      }

      if (process.env.NODE_ENV !== 'production') !(formContext.noValidate || !name || schema) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, "There is no corresponding schema defined for this field: \"" + name + "\" " + "Each Field's `name` prop must be a valid path defined by the parent Form schema") : invariant(false) : void 0;

      var _ref = !noResolveType ? (0, _resolveFieldComponent.default)(type, schema) : [null, type],
          Component = _ref[0],
          resolvedType = _ref[1];

      fieldProps.type = (0, _isNativeType.default)(resolvedType) ? resolvedType : undefined;
      var meta = {
        resolvedType: resolvedType,
        errorClass: errorClass,
        schema: schema,
        onError: function onError(errors) {
          return formContext.onFieldError(name, errors);
        }
      };

      if (formContext.context) {
        meta.context = formContext.context; // lol
      }

      if (_this.shouldValidate()) {
        var messages = triggerMeta.messages;
        var invalid = messages && !!Object.keys(messages).length;
        meta.errors = messages;
        meta.invalid = invalid;
        meta.valid = !meta.invalid;
        meta.submitting = triggerMeta.submitting;
        fieldProps.className = (0, _classnames.default)(className, invalid && errorClass);
      }

      if (!_this.props.noMeta) fieldProps.meta = meta;
      if (fieldRef) fieldProps.ref = fieldRef; // Escape hatch for more complex Field types.

      if (typeof children === 'function') {
        return children(fieldProps, Component);
      }

      return _react.default.createElement(Component, _extends({}, fieldProps, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 178
        },
        __self: this
      }), children);
    };

    _this.eventHandlers = {};

    _this.createEventHandlers(_this.props);

    return _this;
  }

  var _proto = Field.prototype;

  // create a set of handlers with a stable identity so as not to
  // thwart SCU checks
  _proto.createEventHandlers = function createEventHandlers(_ref2) {
    var _this2 = this;

    var _ref2$events = _ref2.events,
        events = _ref2$events === void 0 ? _config.default.events : _ref2$events;
    if (events == null) return;
    [].concat(events).forEach(function (event) {
      var handler = function handler() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        notify(_this2._fieldProps[event], args);
        notify(_this2._bindingProps[event], args);
        notify(_this2._triggerProps[event], args);
      };

      _this2.eventHandlers[event] = _this2.eventHandlers[event] || handler;
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    return _react.default.createElement(_Form.Consumer, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 183
      },
      __self: this
    }, function (formContext) {
      var _mapFromValue;

      var _this3$props = _this3.props,
          name = _this3$props.name,
          group = _this3$props.group,
          exclusive = _this3$props.exclusive,
          mapFromValue = _this3$props.mapFromValue,
          alsoValidates = _this3$props.alsoValidates,
          _this3$props$events = _this3$props.events,
          events = _this3$props$events === void 0 ? _config.default.events : _this3$props$events;
      _this3.formContext = formContext;
      var mapMessages = !exclusive ? _ErrorUtils.inclusiveMapMessages : undefined;
      if (typeof mapFromValue !== 'object') mapFromValue = (_mapFromValue = {}, _mapFromValue[name] = mapFromValue, _mapFromValue);

      if (!_this3.shouldValidate()) {
        return _react.default.createElement(_topeka.Binding, {
          bindTo: _this3.bindTo,
          mapValue: mapFromValue,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 203
          },
          __self: this
        }, _this3.constructComponent);
      }

      var triggers;

      if (alsoValidates != null) {
        triggers = [name].concat(alsoValidates);
      }

      return _react.default.createElement(_topeka.Binding, {
        bindTo: _this3.bindTo,
        mapValue: mapFromValue,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 215
        },
        __self: this
      }, function (bindingProps) {
        return _react.default.createElement(_FormTrigger.default, {
          "for": name,
          group: group,
          events: events,
          triggers: triggers,
          mapMessages: mapMessages,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 217
          },
          __self: this
        }, function (triggerMeta) {
          return _this3.constructComponent(bindingProps, triggerMeta);
        });
      });
    });
  };

  _proto.shouldValidate = function shouldValidate() {
    return !(this.props.noValidate || this.formContext.noValidate);
  };

  _inheritsLoose(Field, _React$PureComponent);

  return Field;
}(_react.default.PureComponent);

Field.defaultProps = {
  type: '',
  exclusive: false,
  fieldRef: null
};
Field.propTypes = {
  /**
   * The Field name, which should be path corresponding to a specific form `value` path.
   *
   * ```js
   * // given the form value
   * value = {
   *   name: { first: '' }
   *   languages: ['english', 'spanish']
   * }
   *
   * // the path "name.first" would update the "first" property of the form value
   * <Form.Field name='name.first' />
   *
   * // use indexes for paths that cross arrays
   * <Form.Field name='languages[0]' />
   *
   * ```
   */
  name: _propTypes.default.string.isRequired,

  /**
   * Group Fields together with a common `group` name. Groups can be
   * validated together, helpful for multi-part forms.
   *
   * ```editable
   * <Form
   *   schema={modelSchema}
   *   defaultValue={modelSchema.default()}
   * >
   *
   *   <Form.Field
   *     name='name.first'
   *     group='name'
   *     placeholder='first'
   *   />
   *   <Form.Field
   *     name='name.last'
   *     group='name'
   *     placeholder='surname'
   *   />
   *   <Form.Message for={['name.first', 'name.last']}/>
   *
   *   <Form.Field
   *     name='dateOfBirth'
   *     placeholder='dob'
   *   />
   *
   *   <Form.Button group='name'>
   *     Validate Name
   *   </Form.Button>
   * </Form>
   * ```
   */
  group: _propTypes.default.string,

  /**
   * The Component Input the form should render. You can sepcify a builtin type
   * with a string name e.g `'text'`, `'datetime-local'`, etc. or provide a Component
   * type class directly. When no type is provided the Field will attempt determine
   * the correct input from the corresponding scheme. A Field corresponding to a `yup.number()`
   * will render a `type='number'` input by default.
   *
   * ```editable
   * <Form noValidate schema={modelSchema}>
   *   Use the schema to determine type
   *   <Form.Field
   *     name='dateOfBirth'
   *     placeholder='date'
   *   />
   *
   *   Override it!
   *   <Form.Field
   *     name='dateOfBirth'
   *     type='time'
   *     placeholder='time only'
   *   />
   *
   *   Use a custom Component
   *   (need native 'datetime' support to see it)
   *   <Form.Field
   *     name='dateOfBirth'
   *     type={MyDateInput}/>
   *
   * </Form>
   * ```
   * Custom Inputs should comply with the basic input api contract: set a value via a `value` prop and
   * broadcast changes to that value via an `onChange` handler.
   *
   * You can also permenantly map Components to a string `type` name via the top-level
   * `addInputType()` api.
   */
  type: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),

  /**
   * Event name or array of event names that the Field should trigger a validation.
   */
  events: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),

  /**
   * Customize how the Field value maps to the overall Form `value`.
   * `mapFromValue` can be a a string property name or a function that returns a
   * value for `name`'d path, allowing you to set commuted values from the Field.
   *
   * ```js
   * <Form.Field name='name'
   *   mapFromValue={fieldValue => fieldValue.first + ' ' + fieldValue.last}
   * />
   * ```
   *
   * You can also provide an object hash, mapping paths of the Form `value`
   * to fields in the field value using a string field name, or a function accessor.
   *
   * ```editable
   * <Form
   *   schema={modelSchema}
   *   defaultValue={modelSchema.default()}
   * >
   *   <label>Name</label>
   *   <Form.Field
   *     name='name.first'
   *     placeholder='First name'
   *   />
   *
   *   <label>Date of Birth</label>
   *   <Form.Field name='dateOfBirth'
   *     mapFromValue={{
   *       'dateOfBirth': date => date,
   *       'age': date =>
   *         (new Date()).getFullYear() - date.getFullYear()
   *   }}/>
    *   <label>Age</label>
   *   <Form.Field name='age'/>
   *
   *   <Form.Button type='submit'>Submit</Form.Button>
   * </Form>
   * ```
   */
  mapFromValue: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string, _propTypes.default.object]),

  /**
   * Map the Form value to the Field value. By default
   * the `name` of the Field is used to extract the relevant
   * property from the Form value.
   *
   * ```js
   * <Form.Field
   *   name='location'
   *   type="dropdownlist"
   *   mapToValue={model=> pick(model, 'location', 'locationId')}
   * />
   * ```
   */
  mapToValue: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),

  /**
   * The css class added to the Field Input when it fails validation
   */
  errorClass: _propTypes.default.string,

  /**
   * Tells the Field to trigger validation for addition paths as well as its own (`name`).
   * Useful when used in conjuction with a `mapFromValue` hash that updates more than one value, or
   * if you want to trigger validation for the parent path as well.
   *
   * ```js
   * <Form.Field name='name.first' alsoValidates="name" />
   * <Form.Field name='name.last' alsoValidates={['name', 'surname']} />
   * ```
   */
  alsoValidates: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),

  /**
   * Indicates whether child fields of the named field
   * affect the active state ofthe field.
   *
   * ```js
   * -> 'names'
   * -> 'names.first'
   * -> 'names.last'
   * ```
   *
   * Are all considered "part" of a field named `'names'` by default.
   */
  exclusive: _propTypes.default.bool,

  /**
   * Disables validation for the Field.
   */
  noValidate: _propTypes.default.bool,

  /**
   * When children is the traditional react element or nodes, they are
   * passed through as-is to the Field `type` component.
   *
   * ```jsx
   * <Field type='select'>
   *   <option>red</option>
   *   <option>red</option>
   * </Field>
   * ```
   *
   * When `children` is a function, its called with the processed field
   * props and the resolved Field Input component, for more advanced use cases
   *
   * ```jsx
   * <Field name='birthDate'>
   *  {(props, Input) =>
   *    <DataProvider>
   *      <Input {...props} />
   *    </DataProvider>
   *  }
   * </Field>
   * ```
   */
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),

  /**
   * Instruct the field to not inject the `meta` prop into the input
   */
  noMeta: _propTypes.default.bool,

  /**
   * Attach a ref to the rendered input component
   */
  fieldRef: _propTypes.default.func,

  /** @private */
  noResolveType: _propTypes.default.bool
};

var _default = _react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(Field, _extends({
    fieldRef: ref
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 484
    },
    __self: this
  }));
});

exports.default = _default;
module.exports = exports["default"];