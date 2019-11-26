"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _querystring = _interopRequireDefault(require("querystring"));

var _loginCookie = _interopRequireDefault(require("../loginCookie"));

var _constants = require("../constants");

var _helpers = require("../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function stringToAmount(string) {
  return -1 * parseFloat(string.split(' ').slice(1).join().replace('.', '').replace(',', '.'));
}

function stringToDate(string) {
  var parts = string.split('/');
  var day = parts[0];
  var month = parts[1];
  var year = parts[2];

  if (year.length === 2) {
    year = "20".concat(year);
  }

  return new Date(year, parseInt(month, 10) - 1, day);
}

function stringToDateInstallment(_ref) {
  var date = _ref.date,
      description = _ref.description,
      billDate = _ref.billDate;
  var installment = description.match(/.*(\d{2,3})\/(\d{2,3}).*/)[1];
  var parts = date.split('/');
  var day = parts[0];
  var month = parseInt(parts[1], 10) + parseInt(installment, 10) - 1;
  var year = "20".concat(parts[2]);

  if (/^ANTEC /.test(description)) {
    month = parseInt(billDate.slice(2, 4), 10) - 1;
  }

  return new Date(year, parseInt(month, 10) - 1, day);
}

var BBCardBill =
/*#__PURE__*/
function () {
  function BBCardBill(_ref2) {
    var cardAccountNumber = _ref2.cardAccountNumber,
        billId = _ref2.billId,
        billDate = _ref2.billDate,
        status = _ref2.status;
    (0, _classCallCheck2["default"])(this, BBCardBill);
    this.cardAccountNumber = cardAccountNumber;
    this.billId = billId;
    this.billDate = billDate;
    this.status = status;
  }

  (0, _createClass2["default"])(BBCardBill, [{
    key: "getTransactions",
    value: function getTransactions() {
      var _this = this;

      var transactionsUrl, params, response, text, json;
      return _regenerator["default"].async(function getTransactions$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              transactionsUrl = 'tela/ExtratoFatura/extrato';
              params = {};

              if (this.status === 'opened') {
                params = {
                  numeroContaCartao: this.cardAccountNumber
                };
              } else {
                params = {
                  numeroContaCartao: this.cardAccountNumber,
                  sequencialFatura: this.billId,
                  dataFatura: this.billDate,
                  tipoExtrato: 'F'
                };
              }

              _context.next = 5;
              return _regenerator["default"].awrap((0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(transactionsUrl), {
                headers: _objectSpread({}, _constants.DEFAULT_HEADERS, {
                  cookie: _loginCookie["default"].getGlobal()
                }),
                method: 'POST',
                body: _querystring["default"].stringify(params)
              }));

            case 5:
              response = _context.sent;
              _context.next = 8;
              return _regenerator["default"].awrap(response.text());

            case 8:
              text = _context.sent;
              json = JSON.parse(text);
              return _context.abrupt("return", json.conteiner.telas[0].sessoes.map(function (s) {
                if (s.cabecalho && s.cabecalho.trim() === 'Pagamentos') {
                  return s.celulas.slice(1).filter(function (c) {
                    return c.componentes.length === 3 && c.componentes[0].componentes[0].texto !== '' && c.componentes[1].componentes[0].texto !== '' && c.componentes[2].componentes[0].texto !== '';
                  }).map(function (c) {
                    var date = c.componentes[0].componentes[0].texto;
                    var description = c.componentes[1].componentes[0].texto;
                    var amount = c.componentes[2].componentes[0].texto;
                    return {
                      type: 'payment',
                      date: stringToDate(date),
                      description: (0, _helpers.treatDescription)(description),
                      amount: stringToAmount(amount)
                    };
                  });
                }

                if (s.cabecalho && s.cabecalho.trim() === 'Compras a vista') {
                  return s.celulas.slice(1).filter(function (c) {
                    return c.componentes.length === 3 && c.componentes[0].componentes[0].texto !== '' && c.componentes[1].componentes[0].texto !== '' && c.componentes[2].componentes[0].texto !== '';
                  }).map(function (c) {
                    var date = c.componentes[0].componentes[0].texto;
                    var description = c.componentes[1].componentes[0].texto;
                    var amount = c.componentes[2].componentes[0].texto;
                    var currency = amount.split(' ')[0];
                    return {
                      type: 'atSight',
                      date: stringToDate(date),
                      description: currency !== 'R$' ? (0, _helpers.treatDescription)(description, currency) : (0, _helpers.treatDescription)(description),
                      amount: stringToAmount(amount)
                    };
                  });
                }

                if (s.cabecalho && s.cabecalho.trim() === 'Compras/Pgto Contas Parc') {
                  return s.celulas.slice(2, -2).filter(function (c) {
                    return c.componentes.length === 3 && c.componentes[0].componentes[0].texto !== '' && c.componentes[1].componentes[0].texto !== '' && c.componentes[2].componentes[0].texto !== '';
                  }).map(function (c) {
                    var date = c.componentes[0].componentes[0].texto;
                    var description = c.componentes[1].componentes[0].texto;
                    var amount = c.componentes[2].componentes[0].texto;
                    return {
                      type: 'installment',
                      date: stringToDateInstallment({
                        description: description,
                        date: date,
                        billDate: _this.billDate
                      }),
                      description: (0, _helpers.treatDescription)(description),
                      amount: stringToAmount(amount)
                    };
                  });
                }

                return [];
              }).reduce(function (transactions, session) {
                return [].concat((0, _toConsumableArray2["default"])(transactions), (0, _toConsumableArray2["default"])(session));
              }, []));

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);
  return BBCardBill;
}();

exports["default"] = BBCardBill;
//# sourceMappingURL=cardBill.js.map