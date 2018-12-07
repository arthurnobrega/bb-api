'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var BBSavings = function () {
  function BBSavings() {
    (0, _classCallCheck3.default)(this, BBSavings);
  }

  (0, _createClass3.default)(BBSavings, [{
    key: 'getAccounts',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var accountsUrl, response, text, json, sessions, title, variations;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                accountsUrl = 'tela/ExtratoDePoupanca/entrada';
                _context.next = 3;
                return (0, _nodeFetch2.default)('' + _constants.BASE_ENDPOINT + accountsUrl, {
                  headers: (0, _extends3.default)({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie2.default.getGlobal()
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
                return _context.abrupt('return', variations.map(function (v) {
                  return {
                    variation: parseInt(v, 10),
                    description: title + ' - Varia\xE7\xE3o ' + v
                  };
                }));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAccounts() {
        return _ref.apply(this, arguments);
      }

      return getAccounts;
    }()
  }, {
    key: 'getTransactions',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {
        var variation = _ref3.variation,
            year = _ref3.year,
            month = _ref3.month;
        var pad, accountsUrl, params, response, text, json, session;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                pad = function pad(s) {
                  return s.toString().padStart('0', 2);
                };

                accountsUrl = 'tela/ExtratoDePoupanca/menuPeriodo';
                params = {
                  metodo: 'mesAnterior',
                  variacao: variation,
                  periodo: '01/' + pad(month) + '/' + year
                };
                _context2.next = 5;
                return (0, _nodeFetch2.default)('' + _constants.BASE_ENDPOINT + accountsUrl + '?' + _querystring2.default.stringify(params), {
                  headers: (0, _extends3.default)({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie2.default.getGlobal()
                  })
                });

              case 5:
                response = _context2.sent;
                _context2.next = 8;
                return response.text();

              case 8:
                text = _context2.sent;
                json = JSON.parse(text);
                session = json.conteiner.telas[0].sessoes.find(function (s) {
                  return s.cabecalho && s.cabecalho.includes('Mês referência');
                });
                return _context2.abrupt('return', session.celulas.map(function (c) {
                  return c.componentes;
                }).filter(function (comp) {
                  return comp[0].componentes[0].texto !== 'Dia';
                }).map(function (c) {
                  return {
                    date: new Date(year, month - 1, c[0].componentes[0].texto),
                    description: (0, _helpers.treatDescription)(c[1].componentes[0].texto),
                    amount: (0, _helpers.parseAmountString)(c[2].componentes[0].texto)
                  };
                }));

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getTransactions(_x) {
        return _ref2.apply(this, arguments);
      }

      return getTransactions;
    }()
  }]);
  return BBSavings;
}();

exports.default = BBSavings;
//# sourceMappingURL=index.js.map