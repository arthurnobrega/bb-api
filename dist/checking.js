'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _constants = require('./constants');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BBChecking = function () {
  function BBChecking(loginCookie) {
    (0, _classCallCheck3.default)(this, BBChecking);
    this.loginCookie = null;

    this.loginCookie = loginCookie;
  }

  (0, _createClass3.default)(BBChecking, [{
    key: 'getTransactions',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
        var year = _ref2.year,
            month = _ref2.month;
        var pad, transactionsUrl, params, response, text, json, transactions;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pad = function pad(s) {
                  return s.toString().padStart('0', 2);
                };

                transactionsUrl = 'tela/ExtratoDeContaCorrente/extrato';
                params = {};


                if (year && month) {
                  params = { periodo: '01' + pad(month) + year };
                }

                _context.next = 6;
                return (0, _nodeFetch2.default)('' + _constants.BASE_ENDPOINT + transactionsUrl, {
                  headers: (0, _extends3.default)({}, _constants.DEFAULT_HEADERS, {
                    cookie: this.loginCookie
                  }),
                  method: 'POST',
                  body: _querystring2.default.stringify(params)
                });

              case 6:
                response = _context.sent;
                _context.next = 9;
                return response.text();

              case 9:
                text = _context.sent;
                json = JSON.parse(text);
                transactions = json.conteiner.telas[0].sessoes.reduce(function (acc, session) {
                  var monthString = 'Mês referência: ';
                  if (session.TIPO === 'sessao' && session.cabecalho && session.cabecalho.indexOf(monthString) === 0) {
                    return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(session.celulas.reduce(function (cellAcc, cell) {
                      if (cell.TIPO === 'celula' && cell.componentes.length === 3 && cell.componentes[0].componentes[0].texto !== 'Dia') {
                        var description = cell.componentes[1].componentes[0].texto;
                        var day = cell.componentes[0].componentes[0].texto;
                        var amount = cell.componentes[2].componentes[0].texto;

                        if (['Saldo Anterior', 'S A L D O'].includes(description)) {
                          return cellAcc;
                        }

                        return [].concat((0, _toConsumableArray3.default)(cellAcc), [{
                          date: new Date(year, month, day),
                          description: (0, _helpers.treatDescription)(description),
                          amount: (0, _helpers.parseAmountString)(amount)
                        }]);
                      }

                      return cellAcc;
                    }, [])));
                  }

                  return acc;
                }, []);
                return _context.abrupt('return', transactions);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTransactions(_x) {
        return _ref.apply(this, arguments);
      }

      return getTransactions;
    }()
  }, {
    key: 'getBalance',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var balanceUrl, response, text, _JSON$parse, servicoSaldo, saldo;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                balanceUrl = 'servico/ServicoSaldo/saldo';
                _context2.next = 3;
                return (0, _nodeFetch2.default)('' + _constants.BASE_ENDPOINT + balanceUrl, {
                  headers: (0, _extends3.default)({}, _constants.DEFAULT_HEADERS, {
                    cookie: this.loginCookie
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
                return _context2.abrupt('return', (0, _helpers.parseAmountString)(saldo));

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getBalance() {
        return _ref3.apply(this, arguments);
      }

      return getBalance;
    }()
  }]);
  return BBChecking;
}();

exports.default = BBChecking;
//# sourceMappingURL=checking.js.map