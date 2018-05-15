function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import Form from './Form';
import Field from './Field';
import FieldArray from './FieldArray';
import Context from './FormContext';
import Trigger from './FormTrigger';
import Message from './Message';
import Summary from './Summary';
import errToJSON from './utils/errToJSON';
import Button from './FormButton';
import addInputTypes from './addInputType';
import config from './config';
import invariant from 'invariant';
var statics = {
  Field: Field,
  FieldArray: FieldArray,
  Message: Message,
  Summary: Summary,
  Button: Button,
  Context: Context,
  Trigger: Trigger,
  addInputTypes: addInputTypes,
  setDefaults: function setDefaults(defaults) {
    if (defaults === void 0) {
      defaults = {};
    }

    _extends(config, defaults);
  },
  toErrors: function toErrors(err) {
    !(err && err.name === 'ValidationError') ? process.env.NODE_ENV !== "production" ? invariant(false, '`toErrors()` only works with ValidationErrors.') : invariant(false) : void 0;
    return errToJSON(err);
  }
};

_extends(Form, statics);

Form.statics = statics;
export { statics };
export default Form;