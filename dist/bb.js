'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiEndpoint = 'https://mobi.bb.com.br/mov-centralizador/';

var headers = {
  'User-Agent': 'Android;Google Nexus 5 - 6.0.0 - API 23 - 1080x1920;Android;6.0;vbox86p-userdebug 6.0 MRA58K eng.buildbot.20160110.195928 test-keys;mov-android-app;6.14.0.1;en_US;cpu=0|clock=|ram=2052484 kB|espacoSDInterno=12.46 GB|isSmartphone=true|nfc=false|camera=true|cameraFrontal=true|root=true|reconhecimentoVoz=false|resolucao=1080_1776|densidade=3.0|',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cache-Control': 'no-cache',
  'Postman-Token': '7ac0e5e1-8b39-457d-ae08-52c82b41bd5b'
};

function getMonthNumber(monthName) {
  var monthNumbers = {
    Janeiro: 0,
    Fevereiro: 1,
    Março: 2,
    Abril: 3,
    Maio: 4,
    Junho: 5,
    Julho: 6,
    Agosto: 7,
    Setembro: 8,
    Outubro: 9,
    Novembro: 10,
    Dezembro: 11
  };

  return monthNumbers[monthName];
}

function mountDate(year, monthName, day) {
  return new Date(year, getMonthNumber(monthName), day);
}

function parseAmountString(amountString) {
  var parts = amountString.split(' ');
  var isPositive = parts[1] === 'C';

  var amount = parseFloat(parts[0].replace('.', '').replace(',', '.'));

  return isPositive ? amount : -amount;
}

function treatDescription(description) {
  return description.replace('\n', ' ').replace(/ +/g, ' ');
}

var BB = function BB() {
  var _this = this;

  (0, _classCallCheck3.default)(this, BB);
  this.loginCookie = null;
  this.refreshHash = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var hashUrl, params, response, hash;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hashUrl = 'hash';
            params = { id: '00000000000000000000000000000000' };
            _context.next = 4;
            return (0, _nodeFetch2.default)('' + apiEndpoint + hashUrl, {
              headers: headers,
              method: 'POST',
              body: _querystring2.default.stringify(params)
            });

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.text();

          case 7:
            hash = _context.sent;
            return _context.abrupt('return', hash);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  this.login = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref3) {
      var branch = _ref3.branch,
          account = _ref3.account,
          password = _ref3.password;

      var loginUrl, hash, params, response, text, _JSON$parse, login;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              loginUrl = 'servico/ServicoLogin/login';
              _context2.next = 3;
              return _this.refreshHash();

            case 3:
              hash = _context2.sent;
              params = {
                idh: hash,
                dependenciaOrigem: branch,
                numeroContratoOrigem: account,
                senhaConta: password
              };
              _context2.next = 7;
              return (0, _nodeFetch2.default)('' + apiEndpoint + loginUrl, {
                headers: headers,
                method: 'POST',
                body: _querystring2.default.stringify(params)
              });

            case 7:
              response = _context2.sent;


              _this.loginCookie = response.headers.get('set-cookie');

              _context2.next = 11;
              return response.text();

            case 11:
              text = _context2.sent;
              _JSON$parse = JSON.parse(text), login = _JSON$parse.login;
              return _context2.abrupt('return', login);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.getBalance = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var balanceUrl, response, text, _JSON$parse2, servicoSaldo, saldo;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            balanceUrl = 'servico/ServicoSaldo/saldo';
            _context3.next = 3;
            return (0, _nodeFetch2.default)('' + apiEndpoint + balanceUrl, {
              headers: (0, _extends3.default)({}, headers, {
                cookie: _this.loginCookie
              }),
              method: 'POST'
            });

          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return response.text();

          case 6:
            text = _context3.sent;
            _JSON$parse2 = JSON.parse(text), servicoSaldo = _JSON$parse2.servicoSaldo;
            saldo = servicoSaldo.saldo;
            return _context3.abrupt('return', parseAmountString(saldo));

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  this.getTransactions = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(options) {
      var transactionsUrl, params, response, text, json, transactions;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              transactionsUrl = 'tela/ExtratoDeContaCorrente/extrato';
              params = {};


              if (options && options.year && options.month) {
                params = { periodo: '01' + options.month + options.year };
              }

              _context4.next = 5;
              return (0, _nodeFetch2.default)('' + apiEndpoint + transactionsUrl, {
                headers: (0, _extends3.default)({}, headers, {
                  cookie: _this.loginCookie
                }),
                method: 'POST',
                body: _querystring2.default.stringify(params)
              });

            case 5:
              response = _context4.sent;
              _context4.next = 8;
              return response.text();

            case 8:
              text = _context4.sent;
              json = JSON.parse(text);
              transactions = json.conteiner.telas[0].sessoes.reduce(function (acc, session) {
                var monthString = 'Mês referência: ';
                if (session.TIPO === 'sessao' && session.cabecalho && session.cabecalho.indexOf(monthString) === 0) {
                  var _session$cabecalho$re = session.cabecalho.replace(monthString, '').replace(' ', '').split('/'),
                      _session$cabecalho$re2 = (0, _slicedToArray3.default)(_session$cabecalho$re, 2),
                      monthName = _session$cabecalho$re2[0],
                      year = _session$cabecalho$re2[1];

                  return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(session.celulas.reduce(function (cellAcc, cell) {

                    if (cell.TIPO === 'celula' && cell.componentes.length === 3 && cell.componentes[0].componentes[0].texto !== 'Dia') {

                      var description = cell.componentes[1].componentes[0].texto;
                      var day = cell.componentes[0].componentes[0].texto;
                      var amount = cell.componentes[2].componentes[0].texto;

                      if (['Saldo Anterior', 'S A L D O'].includes(description)) {
                        return cellAcc;
                      }

                      return [].concat((0, _toConsumableArray3.default)(cellAcc), [{
                        date: mountDate(year, monthName, day),
                        description: treatDescription(description),
                        amount: parseAmountString(amount)
                      }]);
                    }

                    return cellAcc;
                  }, [])));
                }

                return acc;
              }, []);
              return _context4.abrupt('return', transactions);

            case 12:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x2) {
      return _ref5.apply(this, arguments);
    };
  }();
};

exports.default = BB;
//# sourceMappingURL=bb.js.map