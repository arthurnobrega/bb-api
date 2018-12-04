'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bb = require('./bb');

var _bb2 = _interopRequireDefault(_bb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (require.main === module) {
  var bb = new _bb2.default();

  bb.login({ branch: 'xxxxx', account: 'xxxxxx', password: 'xxxxxxxx' }).then(function () {
    return bb.checking.getBalance();
  }).then(function (balance) {
    return console.log(balance);
  }).then(function () {
    return bb.checking.getTransactions({ year: 2018, month: 10 });
  }).then(function (transactions) {
    return console.log(transactions);
  }).then(function () {
    return bb.savings.getTransactions({ variation: 51, year: 2018, month: 10 });
  }).then(function (transactions) {
    return console.log(transactions);
  });
}

exports.default = _bb2.default;
//# sourceMappingURL=index.js.map