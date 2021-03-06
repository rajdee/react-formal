function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import errToJSON from './utils/errToJSON';
import { reduce, trim } from './utils/paths';

var isValidationError = function isValidationError(err) {
  return err && err.name === 'ValidationError';
};

export default function errorManager(handleValidation) {
  return {
    collect: function collect(paths, pristineErrors, options) {
      if (pristineErrors === void 0) {
        pristineErrors = {};
      }

      paths = reduce([].concat(paths));

      var errors = _extends({}, pristineErrors);

      var nextErrors = errors;
      var workDone = false;
      paths.forEach(function (path) {
        nextErrors = trim(path, nextErrors);
        if (errors !== nextErrors) workDone = true;
      });
      var validations = paths.map(function (path) {
        return Promise.resolve(handleValidation(path, options)).then(function (validationError) {
          if (!validationError) return true;
          if (!isValidationError(validationError)) throw validationError;
          errToJSON(validationError, nextErrors);
        });
      });
      return Promise.all(validations).then(function (results) {
        if (!workDone && results.every(Boolean)) return pristineErrors;
        return nextErrors;
      });
    }
  };
}