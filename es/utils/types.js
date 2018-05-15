function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import Input from '../inputs/Input';
import DateInput from '../inputs/Date';
import NumberInput from '../inputs/Number';
import BoolInput from '../inputs/Bool';
import FileInput from '../inputs/File';
import SelectInput from '../inputs/Select';
var localDt = 'datetime-local';

var wrapWithDefaults = function wrapWithDefaults(Component, defaults) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    function _class() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = _class.prototype;

    _proto.render = function render() {
      return React.createElement(Component, _extends({}, defaults, this.props, {
        type: defaults.type || this.props.type
      }));
    };

    _inheritsLoose(_class, _React$Component);

    return _class;
  }(React.Component), _class.propTypes = {
    type: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  }, _temp;
};

var types = Object.create(null);
types.string = wrapWithDefaults(Input, {
  type: 'text'
});
types.number = NumberInput;
types.date = types.time = types.datetime = types[localDt] = DateInput;
types.array = types.listbox = wrapWithDefaults(SelectInput, {
  multiple: true
});
types.bool = types.boolean = BoolInput;
types.textarea = wrapWithDefaults(Input, {
  tagName: 'textarea'
});
types.select = SelectInput;
types.file = FileInput;
export default types;