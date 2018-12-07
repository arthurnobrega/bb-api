'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bb = require('./bb');

var _bb2 = _interopRequireDefault(_bb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (require.main === module) {
  var bb = new _bb2.default();

  bb.login({ branch: '34770', account: '1108409', password: '07029519' }).then(function () {
    return bb.checking.getBalance();
  })
  // eslint-disable-next-line no-console
  .then(function (balance) {
    return console.log(balance);
  }).then(function () {
    return bb.checking.getTransactions({ year: 2018, month: 11 });
  })
  // eslint-disable-next-line no-console
  .then(function (transactions) {
    return console.log(transactions);
  }).then(function () {
    return bb.savings.getTransactions({ variation: 51, year: 2018, month: 11 });
  })
  // eslint-disable-next-line no-console
  .then(function (transactions) {
    return console.log(transactions);
  });
}

exports.default = _bb2.default;
//# sourceMappingURL=index.js.map