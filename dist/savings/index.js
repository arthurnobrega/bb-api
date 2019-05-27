"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _loginCookie = _interopRequireDefault(require("../loginCookie"));

var _constants = require("../constants");

var _savingsAccount = _interopRequireDefault(require("./savingsAccount"));

var BBSavings =
/*#__PURE__*/
function () {
  function BBSavings() {
    (0, _classCallCheck2["default"])(this, BBSavings);
  }

  (0, _createClass2["default"])(BBSavings, [{
    key: "getAccounts",
    value: function () {
      var _getAccounts = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var accountsUrl, response, text, json, sessions, title, variations;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                accountsUrl = 'tela/ExtratoDePoupanca/entrada';
                _context.next = 3;
                return (0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(accountsUrl), {
                  headers: (0, _objectSpread2["default"])({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie["default"].getGlobal()
                  })
                });

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.text();

              case 6:
                text = _context.sent;
                json = JSON.parse(text);
                sessions = json.conteiner.telas[0].sessoes[0];
                title = sessions.cabecalho;
                variations = sessions.celulas.map(function (c) {
                  return c.acao.split('variacao=').splice(-1)[0];
                });
                return _context.abrupt("return", variations.map(function (v) {
                  return new _savingsAccount["default"]({
                    variation: parseInt(v, 10),
                    description: "".concat(title, " - Varia\xE7\xE3o ").concat(v)
                  });
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAccounts() {
        return _getAccounts.apply(this, arguments);
      }

      return getAccounts;
    }()
  }]);
  return BBSavings;
}();

exports["default"] = BBSavings;
//# sourceMappingURL=index.js.map