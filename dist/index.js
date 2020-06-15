'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var TinCan = _interopDefault(require('tincanjs'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var TincanContext = React.createContext();
function TinCanProvider(_ref) {
  var children = _ref.children;
  var tinCan = useProvideTinCan();
  return /*#__PURE__*/React.createElement(TincanContext.Provider, {
    value: tinCan
  }, children);
}
var useTinCan = function useTinCan() {
  return React.useContext(TincanContext);
}; // xAPI param fetching and initialization.

var urlParams = new URLSearchParams(window.location.search);
var endpoint = urlParams.get('endpoint');
var auth = urlParams.get('auth');
var actor = JSON.parse(urlParams.get('actor'));
var activity_id = urlParams.get('activity_id');
var registration = urlParams.get('registration');
var lrs = null;

try {
  lrs = new TinCan.LRS({
    endpoint: endpoint,
    auth: auth
  });
  console.info('TinCan LRS initialized');
} catch (err) {
  console.error('Error initializing TinCan LRS', err);
}

var defaultConfig = {
  actor: actor,
  object: {
    id: activity_id,
    objectType: "Activity"
  },
  context: {
    registration: registration
  }
};
var defaultCompletionConfig = {
  verb: {
    id: "http://adlnet.gov/expapi/verbs/completed",
    display: {
      "de-DE": "beendete",
      "en-US": "completed",
      "fr-FR": "a terminé",
      "es-ES": "completó"
    }
  },
  result: {
    completion: true
  }
};

function useProvideTinCan() {
  var saveCompleted = function saveCompleted() {
    return saveStatement(defaultCompletionConfig);
  };

  var saveStatement = function saveStatement(config) {
    var initConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    return new Promise(function (resolve, reject) {
      if (lrs === null) {
        reject('LRS did not initialize');
        return;
      }

      lrs.saveStatement(new TinCan.Statement(_objectSpread2(_objectSpread2({}, defaultConfig), config), initConfig), {
        callback: function callback(error, xhr) {
          if (error === null) {
            resolve();
          } else {
            reject(error, xhr);
          }
        }
      });
    });
  };

  return {
    saveCompleted: saveCompleted,
    saveStatement: saveStatement
  };
}

exports.TinCanProvider = TinCanProvider;
exports.useTinCan = useTinCan;
