'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _card = require('./card');

var _card2 = _interopRequireDefault(_card);

var _loginCookie = require('../loginCookie');

var _loginCookie2 = _interopRequireDefault(_loginCookie);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BBCreditCard = function () {
  function BBCreditCard() {
    (0, _classCallCheck3.default)(this, BBCreditCard);
  }

  (0, _createClass3.default)(BBCreditCard, [{
    key: 'getCards',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var accountsUrl, response, text, json;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                accountsUrl = 'tela/ExtratoFatura/entrada';
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
                return _context.abrupt('return', json.conteiner.telas[0].sessoes[0].celulas.map(function (c) {
                  return c.protocolo.parametros.map(function (p) {
                    return (0, _defineProperty3.default)({}, p[0], p[1]);
                  }).reduce(function (acc, p) {
                    return (0, _extends3.default)({}, acc, p);
                  }, {});
                }).map(function (c) {
                  return new _card2.default({
                    loginCookie: _loginCookie2.default.getGlobal(),
                    brand: c.nomeBandeira,
                    modality: c.codigoModalidade,
                    cardAccountNumber: c.numeroContaCartao,
                    cardNumber: c.numeroPlastico
                  });
                }));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCards() {
        return _ref.apply(this, arguments);
      }

      return getCards;
    }()
  }]);
  return BBCreditCard;
}();

exports.default = BBCreditCard;
//# sourceMappingURL=index.js.map