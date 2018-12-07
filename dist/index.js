'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var run = exports.run = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var bb, branch, account, password, checkingBalance, checkingTransactions, savingsAccounts, savingsTransactions, creditCards, creditCardBills, creditCardTransactions;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bb = new _bb2.default();
            branch = argv.bbBranch, account = argv.bbAccount, password = argv.bbPassword;
            _context.next = 4;
            return bb.login({ branch: branch, account: account, password: password });

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
            console.log(_util2.default.inspect({
              checkingBalance: checkingBalance,
              checkingTransactions: checkingTransactions
            }, { showHidden: false, depth: null }));

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
            console.log(_util2.default.inspect({
              savingsAccounts: savingsAccounts,
              savingsTransactions: savingsTransactions
            }, { showHidden: false, depth: null }));

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
            console.log(_util2.default.inspect({
              creditCards: creditCards,
              creditCardBills: creditCardBills,
              creditCardTransactions: creditCardTransactions
            }, { showHidden: false, depth: null }));

          case 28:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function run() {
    return _ref.apply(this, arguments);
  };
}();

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _bb = require('./bb');

var _bb2 = _interopRequireDefault(_bb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _yargs$option$option$ = _yargs2.default.option('bbBranch', { string: true }).option('bbAccount', { string: true }).option('bbPassword', { string: true }),
    argv = _yargs$option$option$.argv;

if (require.main === module) {
  run();
}

exports.default = _bb2.default;
//# sourceMappingURL=index.js.map