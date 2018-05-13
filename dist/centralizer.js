'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var transactionsUrl = 'tela/ExtratoDeContaCorrente/extrato';

var headers = {
  'User-Agent': 'Android;Google Nexus 5 - 6.0.0 - API 23 - 1080x1920;Android;6.0;vbox86p-userdebug 6.0 MRA58K eng.buildbot.20160110.195928 test-keys;mov-android-app;6.14.0.1;en_US;cpu=0|clock=|ram=2052484 kB|espacoSDInterno=12.46 GB|isSmartphone=true|nfc=false|camera=true|cameraFrontal=true|root=true|reconhecimentoVoz=false|resolucao=1080_1776|densidade=3.0|',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cache-Control': 'no-cache',
  'Postman-Token': '7ac0e5e1-8b39-457d-ae08-52c82b41bd5b'
};

var Centralizer = function Centralizer() {
  var _this = this;

  (0, _classCallCheck3.default)(this, Centralizer);
  this.loginHash = null;
  this.loginCookie = null;
  this.refreshHash = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var hashUrl, params, response;
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
            _this.loginHash = _context.sent;
            return _context.abrupt('return', _this.loginHash);

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

      var loginUrl, params, response, text, _JSON$parse, login;

      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              loginUrl = 'servico/ServicoLogin/login';
              _context2.next = 3;
              return _this.refreshHash();

            case 3:
              params = {
                idh: _this.loginHash,
                dependenciaOrigem: branch,
                numeroContratoOrigem: account,
                idDispositivo: account,
                senhaConta: password
              };
              _context2.next = 6;
              return (0, _nodeFetch2.default)('' + apiEndpoint + loginUrl, {
                headers: headers,
                method: 'POST',
                body: _querystring2.default.stringify(params)
              });

            case 6:
              response = _context2.sent;


              _this.loginCookie = response.headers.get('set-cookie');

              _context2.next = 10;
              return response.text();

            case 10:
              text = _context2.sent;
              _JSON$parse = JSON.parse(text), login = _JSON$parse.login;
              return _context2.abrupt('return', login);

            case 13:
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
    var balanceUrl, params, response, text, _JSON$parse2, servicoSaldo, saldo, parts, isPositive, balance;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            balanceUrl = 'servico/ServicoSaldo/saldo';
            params = { idh: 'f197ca41bbcd28cb2571241b76974d7fbdbcc6364028a2fdb3d232af4b5ad67054b0191e0cd8a5b7' };
            _context3.next = 4;
            return (0, _nodeFetch2.default)('' + apiEndpoint + balanceUrl, {
              headers: (0, _extends3.default)({}, headers, {
                cookie: _this.loginCookie
              }),
              method: 'POST',
              body: _querystring2.default.stringify(params)
            });

          case 4:
            response = _context3.sent;
            _context3.next = 7;
            return response.text();

          case 7:
            text = _context3.sent;
            _JSON$parse2 = JSON.parse(text), servicoSaldo = _JSON$parse2.servicoSaldo;
            saldo = servicoSaldo.saldo;
            parts = saldo.split(' ');
            isPositive = parts[1] === 'C';
            balance = parseFloat(parts[0].replace('.', '').replace(',', '.'));
            return _context3.abrupt('return', isPositive ? balance : -balance);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));
};

exports.default = Centralizer;
//# sourceMappingURL=centralizer.js.map