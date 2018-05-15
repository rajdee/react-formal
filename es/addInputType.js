import types from './utils/types';

var addType = function addType(type, Component) {
  var compType = typeof Component;
  if (typeof type !== 'string') throw new TypeError('the `type` parameter must be a string');
  if (compType !== 'string' && compType !== 'function') throw new TypeError('The `Component` parameter must be a valid React Component class or tag name');
  types[type.toLowerCase()] = Component;
};

export default function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 2) return addType.apply(void 0, args);

  for (var key in args[0]) {
    if (has(args[0], key)) addType(key, args[0][key]);
  }
}

function has(o, k) {
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
}