"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _card = _interopRequireDefault(require("./card"));

var _loginCookie = _interopRequireDefault(require("../loginCookie"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BBCreditCard =
/*#__PURE__*/
function () {
  function BBCreditCard() {
    (0, _classCallCheck2["default"])(this, BBCreditCard);
  }

  (0, _createClass2["default"])(BBCreditCard, [{
    key: "getCards",
    value: function getCards() {
      var accountsUrl, response, text, json;
      return _regenerator["default"].async(function getCards$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              accountsUrl = 'tela/ExtratoFatura/entrada';
              _context.next = 3;
              return _regenerator["default"].awrap((0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(accountsUrl), {
                headers: _objectSpread({}, _constants.DEFAULT_HEADERS, {
                  cookie: _loginCookie["default"].getGlobal()
                })
              }));

            case 3:
              response = _context.sent;
              _context.next = 6;
              return _regenerator["default"].awrap(response.text());

            case 6:
              text = _context.sent;
              json = JSON.parse(text);
              return _context.abrupt("return", json.conteiner.telas[0].sessoes[0].celulas.map(function (c) {
                return c.protocolo.parametros.map(function (p) {
                  return (0, _defineProperty2["default"])({}, p[0], p[1]);
                }).reduce(function (acc, p) {
                  return _objectSpread({}, acc, {}, p);
                }, {});
              }).map(function (c) {
                return new _card["default"]({
                  loginCookie: _loginCookie["default"].getGlobal(),
                  brand: c.nomeBandeira,
                  modality: c.codigoModalidade,
                  cardAccountNumber: c.numeroContaCartao,
                  cardNumber: c.numeroPlastico
                });
              }));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);
  return BBCreditCard;
}();

exports["default"] = BBCreditCard;
//# sourceMappingURL=index.js.map