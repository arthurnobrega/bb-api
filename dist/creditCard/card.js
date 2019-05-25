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

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _loginCookie = require('../loginCookie');

var _loginCookie2 = _interopRequireDefault(_loginCookie);

var _cardBill = require('./cardBill');

var _cardBill2 = _interopRequireDefault(_cardBill);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BBCard = function () {
  function BBCard(_ref) {
    var brand = _ref.brand,
        modality = _ref.modality,
        cardAccountNumber = _ref.cardAccountNumber,
        cardNumber = _ref.cardNumber;
    (0, _classCallCheck3.default)(this, BBCard);

    this.brand = brand;
    this.modality = modality;
    this.cardAccountNumber = cardAccountNumber;
    this.cardNumber = cardNumber;
  }

  (0, _createClass3.default)(BBCard, [{
    key: 'getBills',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this = this;

        var billsUrl, params, response, text, json, bills, openedBillDate;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                billsUrl = 'tela/ExtratoFatura/mesAnterior';
                params = {
                  codigoModalidade: this.modality,
                  numeroContaCartao: this.cardAccountNumber,
                  numeroPlastico: this.cardNumber
                };
                _context.next = 4;
                return (0, _nodeFetch2.default)('' + _constants.BASE_ENDPOINT + billsUrl, {
                  headers: (0, _extends3.default)({}, _constants.DEFAULT_HEADERS, {
                    cookie: _loginCookie2.default.getGlobal()
                  }),
                  method: 'POST',
                  body: _querystring2.default.stringify(params)
                });

              case 4:
                response = _context.sent;
                _context.next = 7;
                return response.text();

              case 7:
                text = _context.sent;
                json = JSON.parse(text);
                bills = json.conteiner.telas[0].sessoes[0].celulas.map(function (c) {
                  return c.protocolo.parametros.map(function (p) {
                    return (0, _defineProperty3.default)({}, p[0], p[1]);
                  }).reduce(function (acc, p) {
                    return (0, _extends3.default)({}, acc, p);
                  }, {});
                }).map(function (p) {
                  return new _cardBill2.default({
                    cardAccountNumber: _this.cardAccountNumber,
                    billId: p.sequencialFatura,
                    billDate: p.dataFatura,
                    status: 'closed'
                  });
                });
                openedBillDate = bills[0].billDate.slice(0, 2) + (parseInt(bills[0].billDate.slice(2, 4), 10) + 1).toString().padStart(2, '0') + bills[0].billDate.slice(4, 8);


                bills.unshift(new _cardBill2.default({
                  cardAccountNumber: bills[0].cardAccountNumber,
                  billDate: openedBillDate,
                  status: 'opened'
                }));

                return _context.abrupt('return', bills);

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getBills() {
        return _ref2.apply(this, arguments);
      }

      return getBills;
    }()
  }]);
  return BBCard;
}();

exports.default = BBCard;
//# sourceMappingURL=card.js.map