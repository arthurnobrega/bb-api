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

var _querystring = _interopRequireDefault(require("querystring"));

var _loginCookie = _interopRequireDefault(require("../loginCookie"));

var _cardBill = _interopRequireDefault(require("./cardBill"));

var _constants = require("../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BBCard =
/*#__PURE__*/
function () {
  function BBCard(_ref) {
    var brand = _ref.brand,
        modality = _ref.modality,
        cardAccountNumber = _ref.cardAccountNumber,
        cardNumber = _ref.cardNumber;
    (0, _classCallCheck2["default"])(this, BBCard);
    this.brand = brand;
    this.modality = modality;
    this.cardAccountNumber = cardAccountNumber;
    this.cardNumber = cardNumber;
  }

  (0, _createClass2["default"])(BBCard, [{
    key: "getBills",
    value: function getBills() {
      var _this = this;

      var billsUrl, params, response, text, json, bills, openedBillDate;
      return _regenerator["default"].async(function getBills$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              billsUrl = 'tela/ExtratoFatura/mesAnterior';
              params = {
                codigoModalidade: this.modality,
                numeroContaCartao: this.cardAccountNumber,
                numeroPlastico: this.cardNumber
              };
              _context.next = 4;
              return _regenerator["default"].awrap((0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(billsUrl), {
                headers: _objectSpread({}, _constants.DEFAULT_HEADERS, {
                  cookie: _loginCookie["default"].getGlobal()
                }),
                method: 'POST',
                body: _querystring["default"].stringify(params)
              }));

            case 4:
              response = _context.sent;
              _context.next = 7;
              return _regenerator["default"].awrap(response.text());

            case 7:
              text = _context.sent;
              json = JSON.parse(text);
              bills = json.conteiner.telas[0].sessoes[0].celulas.map(function (c) {
                return c.protocolo.parametros.map(function (p) {
                  return (0, _defineProperty2["default"])({}, p[0], p[1]);
                }).reduce(function (acc, p) {
                  return _objectSpread({}, acc, {}, p);
                }, {});
              }).map(function (p) {
                return new _cardBill["default"]({
                  cardAccountNumber: _this.cardAccountNumber,
                  billId: p.sequencialFatura,
                  billDate: p.dataFatura,
                  status: 'closed'
                });
              });
              openedBillDate = bills[0].billDate.slice(0, 2) + (parseInt(bills[0].billDate.slice(2, 4), 10) + 1).toString().padStart(2, '0') + bills[0].billDate.slice(4, 8);
              bills.unshift(new _cardBill["default"]({
                cardAccountNumber: bills[0].cardAccountNumber,
                billDate: openedBillDate,
                status: 'opened'
              }));
              return _context.abrupt("return", bills);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);
  return BBCard;
}();

exports["default"] = BBCard;
//# sourceMappingURL=card.js.map