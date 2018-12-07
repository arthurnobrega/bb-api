'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _loginCookie = require('./loginCookie');

var _loginCookie2 = _interopRequireDefault(_loginCookie);

var _constants = require('./constants');

var _checking = require('./checking');

var _checking2 = _interopRequireDefault(_checking);

var _savings = require('./savings');

var _savings2 = _interopRequireDefault(_savings);

var _creditCard = require('./creditCard');

var _creditCard2 = _interopRequireDefault(_creditCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var refreshHash = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var hashUrl, params, response, hash;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hashUrl = 'hash';
            params = { id: '00000000000000000000000000000000' };
            _context.next = 4;
            return (0, _nodeFetch2.default)('' + _constants.BASE_ENDPOINT + hashUrl, {
              headers: _constants.DEFAULT_HEADERS,
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
    }, _callee, undefined);
  }));

  return function refreshHash() {
    return _ref.apply(this, arguments);
  };
}();

var BB = function () {
  function BB() {
    (0, _classCallCheck3.default)(this, BB);
    this.checking = null;
    this.savings = null;
    this.creditCard = null;
  }

  (0, _createClass3.default)(BB, [{
    key: 'login',
    value: function () {
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
                return refreshHash();

              case 3:
                hash = _context2.sent;
                params = {
                  idh: hash,
                  dependenciaOrigem: branch,
                  numeroContratoOrigem: account,
                  senhaConta: password,
                  titularidade: '1'
                };
                _context2.next = 7;
                return (0, _nodeFetch2.default)('' + _constants.BASE_ENDPOINT + loginUrl, {
                  headers: _constants.DEFAULT_HEADERS,
                  method: 'POST',
                  body: _querystring2.default.stringify(params)
                });

              case 7:
                response = _context2.sent;


                _loginCookie2.default.setGlobal(response.headers.get('set-cookie'));

                _context2.next = 11;
                return response.text();

              case 11:
                text = _context2.sent;
                _JSON$parse = JSON.parse(text), login = _JSON$parse.login;


                this.checking = new _checking2.default();
                this.savings = new _savings2.default();
                this.creditCard = new _creditCard2.default();

                return _context2.abrupt('return', login);

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function login(_x) {
        return _ref2.apply(this, arguments);
      }

      return login;
    }()
  }]);
  return BB;
}();

exports.default = BB;
//# sourceMappingURL=bb.js.map