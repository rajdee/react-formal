import omitBy from 'lodash/omitBy';
import pick from 'lodash/pick';
import { inPath } from './paths';

var uniq = function uniq(array) {
  return array.filter(function (item, idx) {
    return array.indexOf(item) === idx;
  });
};

export var isChildPath = function isChildPath(basePath, path) {
  return path !== basePath && inPath(basePath, path);
};

function mapKeys(messages, baseName, fn) {
  var newMessages = {};
  Object.keys(messages).forEach(function (path) {
    var newKey = path;

    if (isChildPath(baseName, path)) {
      var matches = path.slice(baseName.length).match(/\[(\d+)\](.*)$/);
      newKey = fn(+matches[1], matches[2] || '', path) || path;
    }

    newMessages[newKey] = messages[path];
  });
  return newMessages;
}

var prefixName = function prefixName(name, baseName) {
  return baseName + (!name || name[0] === '[' ? '' : '.') + name;
};

export function prefix(messages, baseName) {
  var paths = Object.keys(messages);
  var result = {};
  paths.forEach(function (path) {
    result[prefixName(path, baseName)] = messages[path];
  });
  return result;
}
export function unprefix(messages, baseName) {
  var paths = Object.keys(messages);
  var result = {};
  paths.forEach(function (path) {
    var shortened = path.slice(baseName.length).replace(/^\./, '');
    result[shortened] = messages[path];
  });
  return result;
}
export function pickMessages(messages, names) {
  if (!names.length) return messages;
  return pick(messages, names);
}
export function namesForGroup(group, allGroups) {
  if (!group || !allGroups) return [];
  group = group ? [].concat(group) : [];
  return uniq(group.reduce(function (fields, group) {
    return fields.concat(allGroups[group]);
  }, []));
}
export function filter(messages, baseName) {
  var paths = Object.keys(messages);
  var result = {};
  paths.forEach(function (path) {
    if (isChildPath(baseName, path)) {
      result[path] = messages[path];
    }
  });
  return result;
}
export function filterAndMapMessages(_ref) {
  var messages = _ref.messages,
      names = _ref.names,
      resolveNames = _ref.resolveNames,
      _ref$mapMessages = _ref.mapMessages,
      mapMessages = _ref$mapMessages === void 0 ? pickMessages : _ref$mapMessages;
  names = resolveNames ? resolveNames() : names;
  return mapMessages(messages, names ? [].concat(names) : []);
}
export function remove(messages) {
  for (var _len = arguments.length, basePaths = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    basePaths[_key - 1] = arguments[_key];
  }

  return omitBy(messages, function (_, path) {
    return basePaths.some(function (b) {
      return inPath(b, path);
    });
  });
}
export function shift(messages, baseName, atIndex) {
  var current = baseName + "[" + atIndex + "]";
  return mapKeys(remove(messages, current), baseName, function (index, tail) {
    if (index > atIndex) {
      return baseName + "[" + (index - 1) + "]" + tail;
    }

    return null;
  });
}
export function unshift(messages, baseName, atIndex) {
  return mapKeys(messages, baseName, function (index, tail) {
    if (index > atIndex) {
      return baseName + "[" + (index + 1) + "]" + tail;
    }

    return null;
  });
}
export function move(messages, baseName, fromIndex, toIndex) {
  return mapKeys(messages, baseName, function (index, tail) {
    if (fromIndex > toIndex) {
      if (index === fromIndex) return baseName + "[" + toIndex + "]" + tail; // increment everything above the pivot

      if (index >= toIndex && index < fromIndex) return baseName + "[" + (index + 1) + "]" + tail;
    } else if (fromIndex < toIndex) {
      if (index === fromIndex) return baseName + "[" + toIndex + "]" + tail; // decrement everything above the from item we moved

      if (index >= fromIndex && index < toIndex) return baseName + "[" + (index - 1) + "]" + tail;
    }

    return null;
  });
}
export function swap(messages, baseName, indexA, indexB) {
  return mapKeys(messages, baseName, function (index, tail) {
    if (index === indexA) return baseName + "[" + indexB + "]" + tail;
    if (index === indexB) return baseName + "[" + indexA + "]" + tail;
    return null;
  });
}
export function inclusiveMapMessages(messages, names) {
  var activeMessages = {};
  if (!names.length) return activeMessages;
  var paths = Object.keys(messages);
  names.forEach(function (name) {
    paths.forEach(function (path) {
      if (messages[path] && inPath(name, path)) {
        activeMessages[path] = messages[path];
      }
    });
  });
  return activeMessages;
}