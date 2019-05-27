"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _querystring = _interopRequireDefault(require("querystring"));

var _loginCookie = _interopRequireDefault(require("../loginCookie"));

var _constants = require("../constants");

var _helpers = require("../helpers");

var BBChecking =
/*#__PURE__*/
function () {
  function BBChecking() {
    (0, _classCallCheck2["default"])(this, BBChecking);
  }

  (0, _createClass2["default"])(BBChecking, [{
    key: "getTransactions",
    value: function () {
      var _getTransactions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_ref) {
        var year, month, pad, transactionsUrl, params, response, text, json, transactions;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                year = _ref.year, month = _ref.month;

                pad = function pad(s) {
                  return s.toString().padStart('0', 2);
                };

                transactionsUrl = 'tela/ExtratoDeContaCorrente/extrato';
                params = {};

                if (year && month) {
                  params = {
                    periodo: "00".concat(pad(month)).concat(year)
                  };
                }

                _context.next = 7;
                return (0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(transactionsUrl), {
                  headers: (0, _objectSpread2["default"])({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie["default"].getGlobal()
                  }),
                  method: 'POST',
                  body: _querystring["default"].stringify(params)
                });

              case 7:
                response = _context.sent;
                _context.next = 10;
                return response.text();

              case 10:
                text = _context.sent;
                json = JSON.parse(text);
                transactions = json.conteiner.telas[0].sessoes.reduce(function (acc, session) {
                  var monthString = 'Mês referência: ';

                  if (session.TIPO === 'sessao' && session.cabecalho && session.cabecalho.indexOf(monthString) === 0) {
                    return [].concat((0, _toConsumableArray2["default"])(acc), (0, _toConsumableArray2["default"])(session.celulas.reduce(function (cellAcc, cell) {
                      if (cell.TIPO === 'celula' && cell.componentes.length === 3 && cell.componentes[0].componentes[0].texto !== 'Dia') {
                        var description = cell.componentes[1].componentes[0].texto;
                        var day = cell.componentes[0].componentes[0].texto;
                        var amount = cell.componentes[2].componentes[0].texto;

                        if (['Saldo Anterior', 'S A L D O'].includes(description)) {
                          return cellAcc;
                        }

                        return [].concat((0, _toConsumableArray2["default"])(cellAcc), [{
                          date: new Date(year, month - 1, day),
                          description: (0, _helpers.treatDescription)(description),
                          amount: (0, _helpers.parseAmountString)(amount)
                        }]);
                      }

                      return cellAcc;
                    }, [])));
                  }

                  return acc;
                }, []);
                return _context.abrupt("return", transactions);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getTransactions(_x) {
        return _getTransactions.apply(this, arguments);
      }

      return getTransactions;
    }()
  }, {
    key: "getBalance",
    value: function () {
      var _getBalance = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var balanceUrl, response, text, _JSON$parse, servicoSaldo, saldo;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                balanceUrl = 'servico/ServicoSaldo/saldo';
                _context2.next = 3;
                return (0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(balanceUrl), {
                  headers: (0, _objectSpread2["default"])({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie["default"].getGlobal()
                  }),
                  method: 'POST'
                });

              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.text();

              case 6:
                text = _context2.sent;
                _JSON$parse = JSON.parse(text), servicoSaldo = _JSON$parse.servicoSaldo;
                saldo = servicoSaldo.saldo;
                return _context2.abrupt("return", (0, _helpers.parseAmountString)(saldo));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getBalance() {
        return _getBalance.apply(this, arguments);
      }

      return getBalance;
    }()
  }]);
  return BBChecking;
}();

exports["default"] = BBChecking;
//# sourceMappingURL=index.js.map