var _jsxFileName = "src/FormContext.js",
    _FormContext$contextT,
    _FormContext$childCon,
    _Publisher$contextTyp,
    _Subscriber$contextTy;

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype.__proto__ = superClass && superClass.prototype; subClass.__proto__ = superClass; }

import PropTypes from 'prop-types';
import React from 'react';
import { Consumer as FormConsumer } from './Form';
export var DEFAULT_CHANNEL = '@@parent';
var contextKey = "@@react-formal-subscription-key";

var contextTypes = function contextTypes() {};

var splitChannel = function splitChannel(channel) {
  return channel.split(':');
};

var FormContext =
/*#__PURE__*/
function (_React$Component) {
  function FormContext() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.data = new Map();
    _this.handlers = new Map();
    _this.subscriptionContext = {
      stop: function stop(channel, propagateIfPossible) {
        if (!_this.shouldHandleChannel(channel, propagateIfPossible)) {
          return _this.getParent().stop(channel);
        }

        _this.data.delete(channel);

        var handlers = _this.handlers.get(channel);

        handlers && handlers.clear();
      },
      publish: function publish(channel, args, propagateIfPossible) {
        if (!_this.shouldHandleChannel(channel, propagateIfPossible)) return _this.getParent().publish(channel, args);

        _this.data.set(channel, args);

        var handlers = _this.handlers.get(channel);

        handlers && handlers.forEach(function (fn) {
          return fn(args);
        });
      },
      get: function get(channel) {
        return _this.data.has(channel) ? _this.data.get(channel) : _this.getParent() && _this.getParent().get(channel);
      },
      subscribe: function subscribe(channel, handler) {
        if (!_this.shouldHandleChannel(channel)) return _this.getParent().subscribe(channel, handler);
        var handlers = _this.handlers.get(channel) || new Set();

        if (!handlers.has(handler)) {
          handlers.add(handler);

          _this.handlers.set(channel, handlers);
        }

        return function () {
          return handlers.delete(handler);
        };
      }
    };
    return _this;
  }

  var _proto = FormContext.prototype;

  _proto.getChildContext = function getChildContext() {
    var _ref;

    return _ref = {}, _ref[contextKey] = this.subscriptionContext, _ref;
  };

  _proto.getParent = function getParent() {
    return this.context[contextKey];
  };

  _proto.shouldHandleChannel = function shouldHandleChannel(channel, force) {
    var group = splitChannel(channel)[0];
    return !this.getParent() || group === DEFAULT_CHANNEL && !force;
  };

  _proto.render = function render() {
    if (typeof this.props.children === 'function') return this.props.children(this.subscriptionContext);
    return this.props.children;
  };

  _inheritsLoose(FormContext, _React$Component);

  return FormContext;
}(React.Component);

FormContext.contextTypes = (_FormContext$contextT = {}, _FormContext$contextT[contextKey] = contextTypes, _FormContext$contextT);
FormContext.childContextTypes = (_FormContext$childCon = {}, _FormContext$childCon[contextKey] = contextTypes, _FormContext$childCon);

var Publisher =
/*#__PURE__*/
function (_React$Component2) {
  function Publisher() {
    var _this2;

    for (var _len2 = arguments.length, _args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      _args[_key2] = arguments[_key2];
    }

    _this2 = _React$Component2.call.apply(_React$Component2, [this].concat(_args)) || this;

    _this2.publish = function (key, args) {
      if (!_this2.context[contextKey]) return;
      var channel = _this2.group + ":" + key;

      _this2.channels.push(channel);

      _this2.context[contextKey].publish(channel, args, _this2.bubbles);
    };

    _this2.group = _this2.props.group || DEFAULT_CHANNEL;
    _this2.bubbles = _this2.props.bubbles;
    _this2.channels = [];
    return _this2;
  }

  var _proto2 = Publisher.prototype;

  _proto2.componentWillUnmount = function componentWillUnmount() {
    var _this3 = this;

    if (!this.context[contextKey]) return;
    this.channels.forEach(function (channel) {
      return _this3.context[contextKey].stop(channel, _this3.bubbles);
    });
  };

  _proto2.render = function render() {
    return this.props.children(this.publish);
  };

  _inheritsLoose(Publisher, _React$Component2);

  return Publisher;
}(React.Component);

Publisher.propTypes = {
  group: PropTypes.string,
  bubbles: PropTypes.bool
};
Publisher.contextTypes = (_Publisher$contextTyp = {}, _Publisher$contextTyp[contextKey] = contextTypes, _Publisher$contextTyp);

var Subscriber =
/*#__PURE__*/
function (_React$Component3) {
  function Subscriber() {
    var _temp, _this4;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (_temp = _this4 = _React$Component3.call.apply(_React$Component3, [this].concat(args)) || this, _this4.update = function () {
      if (!_this4.unmounted) _this4.forceUpdate();
    }, _temp) || _assertThisInitialized(_this4);
  }

  var _proto3 = Subscriber.prototype;

  _proto3.componentWillUnmount = function componentWillUnmount() {
    this.unmounted = true;
    this.subs && this.subs.forEach(function (fn) {
      return fn();
    });
  };

  _proto3.subscribe = function subscribe(contextFormKey) {
    var _this5 = this;

    if (this.subs || !this.context[contextKey]) return;
    var _this$props = this.props,
        formKey = _this$props.formKey,
        channels = _this$props.channels;
    var key = formKey || contextFormKey || DEFAULT_CHANNEL;
    this.channels = [];
    channels.map(function (channel) {
      _this5.channels.push(key + ":" + channel);

      _this5.context[contextKey].subscribe(key + ":" + channel, _this5.update);
    });
  };

  _proto3.get = function get() {
    var _this6 = this;

    if (!this.context[contextKey]) return [];
    return this.channels.map(function (channel) {
      return _this6.context[contextKey].get(channel);
    });
  };

  _proto3.render = function render() {
    var _this7 = this;

    return React.createElement(FormConsumer, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 158
      },
      __self: this
    }, function (_ref2) {
      var _this7$props;

      var formKey = _ref2.formKey;

      _this7.subscribe(formKey);

      return (_this7$props = _this7.props).children.apply(_this7$props, _this7.get());
    });
  };

  _inheritsLoose(Subscriber, _React$Component3);

  return Subscriber;
}(React.Component);

Subscriber.propTypes = {
  channels: PropTypes.array.isRequired,
  formKey: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.array.isRequired])
};
Subscriber.contextTypes = (_Subscriber$contextTy = {}, _Subscriber$contextTy[contextKey] = contextTypes, _Subscriber$contextTy);
FormContext.Publisher = Publisher;
FormContext.Subscriber = Subscriber;
export default FormContext;