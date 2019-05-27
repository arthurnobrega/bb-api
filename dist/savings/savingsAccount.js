"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _querystring = _interopRequireDefault(require("querystring"));

var _loginCookie = _interopRequireDefault(require("../loginCookie"));

var _constants = require("../constants");

var _helpers = require("../helpers");

function isCurrentMonth(_ref) {
  var year = _ref.year,
      month = _ref.month;
  var now = new Date();
  return now.getFullYear() === parseInt(year, 10) && now.getMonth() === parseInt(month - 1, 10);
}

var BBSavingsAccount =
/*#__PURE__*/
function () {
  function BBSavingsAccount(_ref2) {
    var variation = _ref2.variation,
        description = _ref2.description;
    (0, _classCallCheck2["default"])(this, BBSavingsAccount);
    this.variation = variation;
    this.description = description;
  }

  (0, _createClass2["default"])(BBSavingsAccount, [{
    key: "getTransactions",
    value: function () {
      var _getTransactions = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(_ref3) {
        var year, month, pad, accountsUrl, params, response, text, json, session;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                year = _ref3.year, month = _ref3.month;

                pad = function pad(s) {
                  return s.toString().padStart('0', 2);
                };

                accountsUrl = 'tela/ExtratoDePoupanca/menuPeriodo';
                params = {
                  variacao: this.variation
                };

                if (!isCurrentMonth({
                  year: year,
                  month: month
                })) {
                  params = (0, _objectSpread2["default"])({}, params, {
                    metodo: 'mesAnterior',
                    periodo: "01/".concat(pad(month), "/").concat(year)
                  });
                }

                _context.next = 7;
                return (0, _nodeFetch["default"])("".concat(_constants.BASE_ENDPOINT).concat(accountsUrl, "?").concat(_querystring["default"].stringify(params)), {
                  headers: (0, _objectSpread2["default"])({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie["default"].getGlobal()
                  })
                });

              case 7:
                response = _context.sent;
                _context.next = 10;
                return response.text();

              case 10:
                text = _context.sent;
                json = JSON.parse(text);
                session = json.conteiner.telas[0].sessoes.find(function (s) {
                  return s.cabecalho && s.cabecalho.includes('Mês referência');
                });
                return _context.abrupt("return", session.celulas.filter(function (c) {
                  return c.componentes.length === 3 && c.componentes[0].componentes[0].texto !== '' && c.componentes[1].componentes[0].texto !== '' && c.componentes[2].componentes[0].texto !== '';
                }).filter(function (c) {
                  return c.componentes[0].componentes[0].texto !== 'Dia';
                }).map(function (c) {
                  var date = c.componentes[0].componentes[0].texto;
                  var description = c.componentes[1].componentes[0].texto;
                  var amount = c.componentes[2].componentes[0].texto;
                  return {
                    date: new Date(year, month - 1, date),
                    description: (0, _helpers.treatDescription)(description),
                    amount: (0, _helpers.parseAmountString)(amount)
                  };
                }));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTransactions(_x) {
        return _getTransactions.apply(this, arguments);
      }

      return getTransactions;
    }()
  }]);
  return BBSavingsAccount;
}();

exports["default"] = BBSavingsAccount;
//# sourceMappingURL=savingsAccount.js.map