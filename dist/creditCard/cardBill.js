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

var _loginCookie = require('../loginCookie');

var _loginCookie2 = _interopRequireDefault(_loginCookie);

var _constants = require('../constants');

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToAmount(string) {
  return -1 * parseFloat(string.split(' ').slice(1).join().replace('.', '').replace(',', '.'));
}

function stringToDate(string) {
  var parts = string.split('/');
  var day = parts[0];
  var month = parts[1];
  var year = parts[2];

  if (year.length === 2) {
    year = '20' + year;
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
  var year = '20' + parts[2];

  if (/^ANTEC /.test(description)) {
    month = parseInt(billDate.slice(2, 4), 10) - 1;
  }

  return new Date(year, parseInt(month, 10) - 1, day);
}

var BBCardBill = function () {
  function BBCardBill(_ref2) {
    var cardAccountNumber = _ref2.cardAccountNumber,
        billId = _ref2.billId,
        billDate = _ref2.billDate,
        status = _ref2.status;
    (0, _classCallCheck3.default)(this, BBCardBill);

    this.cardAccountNumber = cardAccountNumber;
    this.billId = billId;
    this.billDate = billDate;
    this.status = status;
  }

  (0, _createClass3.default)(BBCardBill, [{
    key: 'getTransactions',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this = this;

        var transactionsUrl, params, response, text, json;
        return _regenerator2.default.wrap(function _callee$(_context) {
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
                return (0, _nodeFetch2.default)('' + _constants.BASE_ENDPOINT + transactionsUrl, {
                  headers: (0, _extends3.default)({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie2.default.getGlobal()
                  }),
                  method: 'POST',
                  body: _querystring2.default.stringify(params)
                });

              case 5:
                response = _context.sent;
                _context.next = 8;
                return response.text();

              case 8:
                text = _context.sent;
                json = JSON.parse(text);
                return _context.abrupt('return', json.conteiner.telas[0].sessoes.map(function (s) {
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
                  return [].concat((0, _toConsumableArray3.default)(transactions), (0, _toConsumableArray3.default)(session));
                }, []));

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTransactions() {
        return _ref3.apply(this, arguments);
      }

      return getTransactions;
    }()
  }]);
  return BBCardBill;
}();

exports.default = BBCardBill;
//# sourceMappingURL=cardBill.js.map