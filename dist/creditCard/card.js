"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _querystring = _interopRequireDefault(require("querystring"));

var _loginCookie = _interopRequireDefault(require("../loginCookie"));

var _cardBill = _interopRequireDefault(require("./cardBill"));

var _constants = require("../constants");

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
    value: function () {
      var _getBills = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _this = this;

        var billsUrl, params, response, text, json, bills, openedBillDate;
        return _regenerator["default"].wrap(function _callee$(_context) {
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
                return (0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(billsUrl), {
                  headers: (0, _objectSpread2["default"])({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie["default"].getGlobal()
                  }),
                  method: 'POST',
                  body: _querystring["default"].stringify(params)
                });

              case 4:
                response = _context.sent;
                _context.next = 7;
                return response.text();

              case 7:
                text = _context.sent;
                json = JSON.parse(text);
                bills = json.conteiner.telas[0].sessoes[0].celulas.map(function (c) {
                  return c.protocolo.parametros.map(function (p) {
                    return (0, _defineProperty2["default"])({}, p[0], p[1]);
                  }).reduce(function (acc, p) {
                    return (0, _objectSpread2["default"])({}, acc, p);
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
        }, _callee, this);
      }));

      function getBills() {
        return _getBills.apply(this, arguments);
      }

      return getBills;
    }()
  }]);
  return BBCard;
}();

exports["default"] = BBCard;
//# sourceMappingURL=card.js.map