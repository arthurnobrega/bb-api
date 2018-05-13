'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bb = require('./bb');

var _bb2 = _interopRequireDefault(_bb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Run main if it was called by shell
if (require.main === module) {
  var bb = new _bb2.default();

  bb.login({ branch: 'xxxxx', account: 'xxxxxx', password: 'xxxxxxxx' }).then(function () {
    return bb.getBalance();
  }).then(function (balance) {
    return console.log(balance);
  }).then(function () {
    return bb.getTransactions({ year: '2017', month: '12' });
  }).then(function (transactions) {
    return console.log(transactions);
  });
}

exports.default = _bb2.default;
//# sourceMappingURL=index.js.map