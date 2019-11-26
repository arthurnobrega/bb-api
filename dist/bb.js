"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _querystring = _interopRequireDefault(require("querystring"));

var _loginCookie = _interopRequireDefault(require("./loginCookie"));

var _constants = require("./constants");

var _checking = _interopRequireDefault(require("./checking"));

var _savings = _interopRequireDefault(require("./savings"));

var _creditCard = _interopRequireDefault(require("./creditCard"));

var refreshHash = function refreshHash() {
  var hashUrl, params, response, hash;
  return _regenerator["default"].async(function refreshHash$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hashUrl = 'hash';
          params = {
            id: '00000000000000000000000000000000'
          };
          _context.next = 4;
          return _regenerator["default"].awrap((0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(hashUrl), {
            headers: _constants.DEFAULT_HEADERS,
            method: 'POST',
            body: _querystring["default"].stringify(params)
          }));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return _regenerator["default"].awrap(response.text());

        case 7:
          hash = _context.sent;
          return _context.abrupt("return", hash);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
};

var BB =
/*#__PURE__*/
function () {
  function BB() {
    (0, _classCallCheck2["default"])(this, BB);
    (0, _defineProperty2["default"])(this, "checking", null);
    (0, _defineProperty2["default"])(this, "savings", null);
    (0, _defineProperty2["default"])(this, "creditCard", null);

    _loginCookie["default"].setGlobal();
  }

  (0, _createClass2["default"])(BB, [{
    key: "isLoggedIn",
    value: function isLoggedIn() {
      return !!_loginCookie["default"].getGlobal();
    }
  }, {
    key: "login",
    value: function login(_ref) {
      var branch, account, password, loginUrl, hash, params, response, text, _JSON$parse, login;

      return _regenerator["default"].async(function login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              branch = _ref.branch, account = _ref.account, password = _ref.password;
              loginUrl = 'servico/ServicoLogin/login';
              _context2.next = 4;
              return _regenerator["default"].awrap(refreshHash());

            case 4:
              hash = _context2.sent;
              params = {
                idh: hash,
                dependenciaOrigem: branch,
                numeroContratoOrigem: account,
                senhaConta: password,
                titularidade: '1',
                apelido: 'NickRandom.123456',
                idDispositivo: '2131296671'
              };
              _context2.next = 8;
              return _regenerator["default"].awrap((0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(loginUrl), {
                headers: _constants.DEFAULT_HEADERS,
                method: 'POST',
                body: _querystring["default"].stringify(params)
              }));

            case 8:
              response = _context2.sent;

              _loginCookie["default"].setGlobal(response.headers.get('set-cookie'));

              _context2.next = 12;
              return _regenerator["default"].awrap(response.text());

            case 12:
              text = _context2.sent;
              _JSON$parse = JSON.parse(text), login = _JSON$parse.login;
              this.checking = new _checking["default"]();
              this.savings = new _savings["default"]();
              this.creditCard = new _creditCard["default"]();
              return _context2.abrupt("return", login);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);
  return BB;
}();

exports["default"] = BB;
//# sourceMappingURL=bb.js.map