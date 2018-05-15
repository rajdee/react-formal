"use strict";

exports.__esModule = true;
exports.default = exports.Consumer = exports.Provider = void 0;

var _topeka = require("topeka");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _propertyExpr = _interopRequireDefault(require("property-expr"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _react = _interopRequireDefault(require("react"));

var _warning = _interopRequireDefault(require("warning"));

var _reach = _interopRequireDefault(require("yup/lib/util/reach"));

var _errorManager = _interopRequireDefault(require("./errorManager"));

var _errToJSON = _interopRequireDefault(require("./utils/errToJSON"));

var ErrorUtils = _interopRequireWildcard(require("./utils/ErrorUtils"));

var _FormContext = _interopRequireDefault(require("./FormContext"));

var _jsxFileName = "src/Form.js";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

var BindingContext = _topeka.BindingContext.ControlledComponent;

var done = function done(e) {
  return setTimeout(function () {
    throw e;
  });
};

var splitPath = function splitPath(path) {
  var parts = _propertyExpr.default.split(path);

  var tail = parts.pop();
  return [_propertyExpr.default.join(parts), tail];
};

var isValidationError = function isValidationError(err) {
  return err && err.name === 'ValidationError';
};

var _React$createContext = _react.default.createContext({
  context: null,
  noValidate: false,
  onFieldError: function onFieldError() {},
  getSchemaForPath: function getSchemaForPath() {}
}),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

exports.Consumer = Consumer;
exports.Provider = Provider;
var YUP_OPTIONS = ['context', 'stripUnknown', 'recursive', 'abortEarly', 'strict'];

var getter = function getter(path, model) {
  return path ? _propertyExpr.default.getter(path, true)(model || {}) : model;
};

var setter = BindingContext.defaultProps.setter;
/**
 * Form component renders a `value` to be updated and validated by child Fields.
 * Forms can be thought of as `<input/>`s for complex values, or models. A Form aggregates
 * a bunch of smaller inputs, each in charge of updating a small part of the overall model.
 * The Form will integrate and validate each change and fire a single unified `onChange` with the new `value`.
 *
 * Validation messages can be displayed anywhere inside a Form with Message Components.
 *
 * ```editable
 * var defaultStr = yup.string().default('')
 *
 * var customerSchema = yup
 *   .object({
 *     name: yup.object({
 *       first: defaultStr
 *         .required('please enter a first name'),
 *
 *       last: defaultStr
 *         .required('please enter a surname'),
 *     }),
 *
 *     dateOfBirth: yup.date()
 *       .max(new Date(), "Are you a time traveler?!"),
 *
 *     colorId: yup.number()
 *       .nullable()
 *       .required('Please select a dank color')
 *   });
 *
 * var form = (
 *   <Form
 *     schema={customerSchema}
 *     defaultValue={customerSchema.default()}
 *   >
 *     <div>
 *       {\/\*'grandchildren' are no problem \*\/}
 *       <label>Name</label>
 *
 *       <Form.Field
 *         name='name.first'
 *         placeholder='First name'
 *       />
 *       <Form.Field
 *         name='name.last'
 *         placeholder='Surname'
 *       />
 *
 *       <Form.Message for={['name.first', 'name.last']}/>
 *     </div>
 *
 *     <label>Date of Birth</label>
 *     <Form.Field name='dateOfBirth'/>
 *     <Form.Message for='dateOfBirth'/>
 *
 *     <label>Favorite Color</label>
 *     <Form.Field name='colorId' type='select'>
 *       <option value={null}>Select a color...</option>
 *       <option value={0}>Red</option>
 *       <option value={1}>Yellow</option>
 *       <option value={2}>Blue</option>
 *       <option value={3}>other</option>
 *     </Form.Field>
 *     <Form.Message for='colorId'/>
 *
 *   <Form.Button type='submit'>
 *     Submit
 *   </Form.Button>
 * </Form>)
 * ReactDOM.render(form, mountNode);
 * ```
 */

var Form =
/*#__PURE__*/
function (_React$PureComponent) {
  Form.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var formKey = _ref.formKey,
        schema = _ref.schema,
        context = _ref.context,
        noValidate = _ref.noValidate;
    if (schema === prevState.schema && prevState.noValidate === noValidate) return null;
    var _prevState$formContex = prevState.formContext,
        getSchemaForPath = _prevState$formContex.getSchemaForPath,
        onFieldError = _prevState$formContex.onFieldError;
    return {
      schema: schema,
      noValidate: noValidate,
      formContext: {
        getSchemaForPath: getSchemaForPath,
        onFieldError: onFieldError,
        formKey: formKey,
        context: context,
        noValidate: noValidate
      }
    };
  };

  function Form(_props, _context) {
    var _this;

    _this = _React$PureComponent.call(this, _props, _context) || this;

    _this.getSchemaForPath = function (path, props) {
      if (props === void 0) {
        props = _this.props;
      }

      var _props2 = props,
          schema = _props2.schema,
          value = _props2.value,
          context = _props2.context;
      return schema && path && (0, _reach.default)(schema, path, value, context);
    };

    _this.handleValidationRequest = function (fields, type, args) {
      var _this$props = _this.props,
          noValidate = _this$props.noValidate,
          delay = _this$props.delay;
      fields = [].concat(fields);
      if (noValidate) return;

      _this.notify('onValidate', {
        type: type,
        fields: fields,
        args: args
      });

      _this.enqueue(fields);

      if (type !== 'onChange') _this.flush(delay);
    };

    _this.handleFieldError = function (name, fieldErrors) {
      var errors = _this.props.errors;

      _this.handleError(_extends(ErrorUtils.remove(errors, name), fieldErrors));
    };

    _this.handleError = function (errors) {
      _this.notify('onError', errors);
    };

    _this.handleSubmitSuccess = function (validatedValue) {
      var submitForm = _this.props.submitForm;

      _this.notify('onSubmit', validatedValue);

      return Promise.resolve(submitForm && submitForm(validatedValue)).then(function () {
        _this.setSubmitting(false);

        _this.notify('onSubmitFinished');
      }, function (err) {
        _this.setSubmitting(false);

        _this.notify('onSubmitFinished', err);

        throw err;
      });
    };

    _this.handleSubmitError = function (err) {
      if (!isValidationError(err)) throw err;
      var errors = (0, _errToJSON.default)(err);
      maybeWarn(_this.props.debug, errors, 'onSubmit');

      _this.notify('onError', errors);

      _this.notify('onInvalidSubmit', errors);

      _this.setSubmitting(false);
    };

    _this.handleSubmit = function (e) {
      if (e && e.preventDefault) e.preventDefault();
      clearTimeout(_this.submitTimer);
      _this.submitTimer = setTimeout(function () {
        return _this.submit().catch(done);
      }, 0);
    };

    _this.submit = function () {
      var _this$props2 = _this.props,
          schema = _this$props2.schema,
          noValidate = _this$props2.noValidate,
          value = _this$props2.value,
          onSubmitFinished = _this$props2.onSubmitFinished,
          options = _objectWithoutProperties(_this$props2, ["schema", "noValidate", "value", "onSubmitFinished"]);

      options.abortEarly = false;
      options.strict = false;
      if (noValidate) return Promise.resolve(true).then(function () {
        return _this.notify('onSubmit', value);
      });

      _this.setSubmitting(true);

      return schema.validate(value, options) // no catch, we aren't interested in errors from onSubmit handlers
      .then(_this.handleSubmitSuccess, _this.handleSubmitError).then(onSubmitFinished);
    };

    _this.validatePath = function (path, _ref2) {
      var props = _ref2.props;
      var options = (0, _pick.default)(props, YUP_OPTIONS);
      var abortEarly = options.abortEarly == null ? false : options.abortEarly;
      var value = props.value,
          getter = props.getter;

      var schema = _this.getSchemaForPath(path, props);

      var _splitPath = splitPath(path),
          parentPath = _splitPath[0],
          currentPath = _splitPath[1];

      var parent = getter(parentPath, value) || {};
      var pathValue = parent != null ? parent[currentPath] : value;
      return schema.validate(pathValue, _extends({}, options, {
        abortEarly: abortEarly,
        parent: parent,
        path: path
      })).then(function () {
        return null;
      }).catch(function (err) {
        return err;
      });
    };

    _this.queue = [];
    _this.groups = Object.create(null);
    _this.errors = (0, _errorManager.default)(_this.validatePath);
    _this.state = {
      formContext: {
        formKey: _props.formKey,
        getSchemaForPath: _this.getSchemaForPath,
        onFieldError: _this.handleFieldError,
        noValidate: _props.noValidate,
        context: _props.context
      }
    };

    _props.publish('messages', _props.errors);

    _props.publish('groups', _this.groups);

    _props.publish('form', {
      onSubmit: _this.handleSubmit,
      onValidate: _this.handleValidationRequest,
      addToGroup: function addToGroup(name, grpName) {
        var group = _this.groups[grpName] || (_this.groups[grpName] = []);
        if (group.indexOf(name) !== -1) return;
        group.push(name);
        setTimeout(function () {
          return _props.publish('groups', _this.groups);
        });
        return function () {
          return function (name) {
            return group.filter(function (i) {
              return i !== name;
            });
          };
        };
      }
    });

    return _this;
  }

  var _proto = Form.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props3 = this.props,
        errors = _this$props3.errors,
        publish = _this$props3.publish,
        delay = _this$props3.delay,
        schema = _this$props3.schema;
    var schemaChanged = schema !== prevProps.schema;
    if (errors !== prevProps.errors) publish('messages', errors);

    if (schemaChanged) {
      this.enqueue(Object.keys(errors || {}));
    }

    this.flush(delay);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;
    clearTimeout(this.submitTimer);
    clearTimeout(this.validationTimer);
  };

  _proto.collectErrors = function collectErrors(fields, props) {
    if (props === void 0) {
      props = this.props;
    }

    return this.errors.collect(fields, props.errors, {
      props: props
    });
  };

  _proto.enqueue = function enqueue(fields) {
    this.queue = this.queue.concat(fields);
  };

  _proto.flush = function flush(delay) {
    var _this2 = this;

    clearTimeout(this.validationTimer);
    this.validationTimer = setTimeout(function () {
      var fields = _this2.queue;
      var props = _this2.props;
      if (!fields.length) return;
      _this2.queue = [];

      _this2.collectErrors(fields, _this2.props).then(function (errors) {
        if (errors !== _this2.props.errors) {
          maybeWarn(props.debug, errors, 'field validation');

          _this2.notify('onError', errors);
        }
      }).catch(done);
    }, delay);
  };

  _proto.setSubmitting = function setSubmitting(submitting) {
    if (this.unmounted) return;
    this.props.publish('submitting', submitting);
  };

  _proto.notify = function notify(event) {
    var _this$props4;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this.props[event]) (_this$props4 = this.props)[event].apply(_this$props4, args);
  };

  _proto.validate = function validate(fields) {
    return this.collectErrors(fields);
  };

  _proto.render = function render() {
    var _this$props5 = this.props,
        children = _this$props5.children,
        onChange = _this$props5.onChange,
        value = _this$props5.value,
        Element = _this$props5.component,
        getter = _this$props5.getter,
        setter = _this$props5.setter;
    var props = (0, _omit.default)(this.props, YUP_OPTIONS.concat(Object.keys(Form.propTypes)));
    delete props.publish;
    if (Element === 'form') props.noValidate = true; // disable html5 validation

    props.onSubmit = this.handleSubmit;

    if (Element === null || Element === false) {
      children = _react.default.cloneElement(_react.default.Children.only(children), props);
    } else {
      children = _react.default.createElement(Element, _extends({}, props, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 575
        },
        __self: this
      }), children);
    }

    return _react.default.createElement(Provider, {
      value: this.state.formContext,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 578
      },
      __self: this
    }, _react.default.createElement(BindingContext, {
      value: value,
      onChange: onChange,
      getter: getter,
      setter: setter,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 579
      },
      __self: this
    }, children));
  };

  _inheritsLoose(Form, _React$PureComponent);

  return Form;
}(_react.default.PureComponent);

Form.propTypes = {
  /**
   * Form value object, can be left [uncontrolled](/controllables);
   * use the `defaultValue` prop to initialize an uncontrolled form.
   */
  value: _propTypes.default.object,

  /**
   * Callback that is called when the `value` prop changes.
   *
   * ```js
   * function(
   *   value: object,
   *   updatedPaths: array<string>
   * )
   * ```
   */
  onChange: _propTypes.default.func,

  /**
   * A unique key that names a `Form` within a surrounding `Form.Context`.
   * Corresponding `Form.Button`s with the same `formKey` will trigger validation.
   */
  formKey: _propTypes.default.string,

  /**
   * An object hash of field errors for the form. The object should be keyed with paths
   * with the values being an array of messages or message objects. Errors can be
   * left [uncontrolled](/controllables) (use `defaultErrors` to set an initial value)
   * or managed along with the `onError` callback. You can use any object shape you'd like for
   * messages, as long as you provide the Form.Message component an `extract` prop that
   * understands how to pull out the strings message. By default it understands strings and objects
   * with a `'message'` property.
   *
   * ```js
   * <Form errors={{
   *  "name.first": [
   *    'First names are required',
   *    {
   *    	message: "Names must be at least 2 characters long",
   *    	type: 'min'
   *    }
   *  ],
   * }}/>
   * ```
   */
  errors: _propTypes.default.object,

  /**
   * Callback that is called when a validation error occurs. It is called with an `errors` object
   *
   * ```editable
   * <Form schema={modelSchema}
   *   defaultValue={modelSchema.default()}
   *   errors={this.state ? this.state.errors : {}}
   *   onError={errors => {
   *     if( errors.dateOfBirth )
   *       errors.dateOfBirth = 'hijacked!'
   *     this.setState({ errors })
   *   }}>
   *
   *   <Form.Field name='dateOfBirth'/>
   *   <Form.Message for='dateOfBirth'/>
   *
   *   <Form.Button type='submit'>Submit</Form.Button>
   * </Form>
   * ```
   */
  onError: _propTypes.default.func,

  /**
   * Callback that is called whenever a validation is triggered.
   * It is called _before_ the validation is actually run.
   * ```js
   * function onValidate(event){
   *   let { type, fields, args } = event
   * }
   * ```
   */
  onValidate: _propTypes.default.func,

  /**
   * Callback that is fired when the native onSubmit event is triggered. Only relevant when
   * the `component` prop renders a `<form/>` tag. onSubmit will trigger only if the form is valid.
   *
   * ```js
   * function onSubmit(formValue){
   *   // do something with valid value
   * }
   * ```
   */
  onSubmit: _propTypes.default.func,
  onSubmitFinished: _propTypes.default.func,

  /* */
  submitForm: _propTypes.default.func,

  /**
   * Callback that is fired when the native onSubmit event is triggered. Only relevant when
   * the `component` prop renders a `<form/>` tag. onInvalidSubmit will trigger only if the form is invalid.
   *
   * ```js
   * function onInvalidSubmit(errors){
   *   // do something with errors
   * }
   * ```
   */
  onInvalidSubmit: _propTypes.default.func,

  /**
   * A value getter function. `getter` is called with `path` and `value` and
   * should return the plain **javascript** value at the path.
   *
   * ```js
   * function(
   *  path: string,
   *  value: any,
   * ) -> object
   * ```
   */
  getter: _propTypes.default.func,

  /**
   * A value setter function. `setter` is called with `path`, the form `value` and the path `value`.
   * The `setter` must return updated form `value`, which allows you to leave the original value unmutated.
   *
   * The default implementation uses the [react immutability helpers](http://facebook.github.io/react/docs/update.html),
   * letting you treat the form `value` as immutable.
   * ```js
   * function(
   *  path: string,
   *  formValue: object,
   *  pathValue: any
   * ) -> object
   * ```
   */
  setter: _propTypes.default.func,

  /**
   * Time in milliseconds that validations should be debounced. Reduces the amount of validation calls
   * made at the expense of a slight delay. Helpful for performance.
   */
  delay: _propTypes.default.number,

  /**
   * Validations will be strict, making no attempt to coarce input values to the appropriate type.
   */
  strict: _propTypes.default.bool,

  /**
   * Turns off input validation for the Form, value updates will continue to work.
   */
  noValidate: _propTypes.default.bool,

  /**
   * A tag name or Component class the Form should render.
   *
   * If `null` are `false` the form will simply render it's child. In
   * this instance there must only be one child.
   */
  component: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string, _propTypes.default.oneOf([null, false])]),

  /**
   * A Yup schema  that validates the Form `value` prop. Used to validate the form input values
   * For more information about the yup api check out: https://github.com/jquense/yup/blob/master/README.md
   * @type {YupSchema}
   */
  schema: function schema(props, name, componentName) {
    var _PropTypes$any;

    for (var _len2 = arguments.length, args = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      args[_key2 - 3] = arguments[_key2];
    }

    var err = !props.noValidate && (_PropTypes$any = _propTypes.default.any).isRequired.apply(_PropTypes$any, [props, name, componentName].concat(args));

    if (props[name]) {
      var schema = props[name];
      if (!schema.__isYupSchema__ && !(schema.resolve && schema.validate)) err = new Error('`schema` must be a proper yup schema: (' + componentName + ')');
    }

    return err;
  },

  /**
   * yup schema context
   */
  context: _propTypes.default.object,

  /**
   * toggle debug mode, which `console.warn`s validation errors
   */
  debug: _propTypes.default.bool,

  /** @private */
  publish: _propTypes.default.func.isRequired
};
Form.defaultProps = _extends({}, BindingContext.defaultProps, {
  component: 'form',
  strict: false,
  delay: 300,
  errors: Object.create(null),
  getter: getter,
  setter: setter
});
var PolyFilledForm = (0, _reactLifecyclesCompat.polyfill)(Form);

function maybeWarn(debug, errors, target) {
  if (!debug) return;

  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.keys(errors);
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!keys.length, "[react-formal] (" + target + ") invalid fields: " + keys.join(', ')) : void 0;
  }
}

var ControlledForm = (0, _uncontrollable.default)(
/**
 * Wraps each Form in it's own Context, so it can pass context state to
 * it's own children.
 */
_react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(_FormContext.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 612
    },
    __self: this
  }, _react.default.createElement(_FormContext.default.Publisher, {
    bubbles: true,
    group: props.formKey,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 613
    },
    __self: this
  }, function (publish) {
    return _react.default.createElement(PolyFilledForm, _extends({}, props, {
      publish: publish,
      ref: ref,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 614
      },
      __self: this
    }));
  }));
}), {
  value: 'onChange',
  errors: 'onError'
}, ['submit', 'validate']);
ControlledForm.getter = getter;
ControlledForm.setter = setter;
var _default = ControlledForm;
exports.default = _default;