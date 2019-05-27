"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _util = _interopRequireDefault(require("util"));

var _yargs = _interopRequireDefault(require("yargs"));

var _bb = _interopRequireDefault(require("./bb"));

var _yargs$option$option$ = _yargs["default"].option('bbBranch', {
  string: true
}).option('bbAccount', {
  string: true
}).option('bbPassword', {
  string: true
}),
    argv = _yargs$option$option$.argv;

function run() {
  return _run.apply(this, arguments);
}

function _run() {
  _run = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var bb, branch, account, password, checkingBalance, checkingTransactions, savingsAccounts, savingsTransactions, creditCards, creditCardBills, creditCardTransactions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bb = new _bb["default"]();
            branch = argv.bbBranch, account = argv.bbAccount, password = argv.bbPassword;
            _context.next = 4;
            return bb.login({
              branch: branch,
              account: account,
              password: password
            });

          case 4:
            _context.next = 6;
            return bb.checking.getBalance();

          case 6:
            checkingBalance = _context.sent;
            _context.next = 9;
            return bb.checking.getTransactions({
              year: 2018,
              month: 11
            });

          case 9:
            checkingTransactions = _context.sent;
            // eslint-disable-next-line no-console
            console.log(_util["default"].inspect({
              checkingBalance: checkingBalance,
              checkingTransactions: checkingTransactions
            }, {
              showHidden: false,
              depth: null
            }));
            _context.next = 13;
            return bb.savings.getAccounts();

          case 13:
            savingsAccounts = _context.sent;
            _context.next = 16;
            return savingsAccounts[0].getTransactions({
              year: 2018,
              month: 11
            });

          case 16:
            savingsTransactions = _context.sent;
            // eslint-disable-next-line no-console
            console.log(_util["default"].inspect({
              savingsAccounts: savingsAccounts,
              savingsTransactions: savingsTransactions
            }, {
              showHidden: false,
              depth: null
            }));
            _context.next = 20;
            return bb.creditCard.getCards();

          case 20:
            creditCards = _context.sent;
            _context.next = 23;
            return creditCards[0].getBills();

          case 23:
            creditCardBills = _context.sent;
            _context.next = 26;
            return creditCardBills[0].getTransactions();

          case 26:
            creditCardTransactions = _context.sent;
            // eslint-disable-next-line no-console
            console.log(_util["default"].inspect({
              creditCards: creditCards,
              creditCardBills: creditCardBills,
              creditCardTransactions: creditCardTransactions
            }, {
              showHidden: false,
              depth: null
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _run.apply(this, arguments);
}

if (require.main === module) {
  run();
}

var _default = _bb["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map