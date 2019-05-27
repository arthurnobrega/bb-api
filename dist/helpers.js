"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMonthNumber = getMonthNumber;
exports.parseAmountString = parseAmountString;
exports.treatDescription = treatDescription;

function getMonthNumber(monthName) {
  var monthNumbers = {
    Janeiro: 0,
    Fevereiro: 1,
    Março: 2,
    Abril: 3,
    Maio: 4,
    Junho: 5,
    Julho: 6,
    Agosto: 7,
    Setembro: 8,
    Outubro: 9,
    Novembro: 10,
    Dezembro: 11
  };
  return monthNumbers[monthName];
}

function parseAmountString(amountString) {
  var parsedAmount = amountString.replace(' ', '');
  var isPositive = parsedAmount.substr(-1) === 'C';
  var amount = parseFloat(parsedAmount.slice(0, -1).replace('.', '').replace(',', '.'));
  return isPositive ? amount : -amount;
}

function treatDescription(description) {
  var currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var treatedDescription = description.replace('\n', ' ').replace(/ +/g, ' ');
  return currency ? "".concat(treatedDescription, " (").concat(currency, ")") : treatedDescription;
}
//# sourceMappingURL=helpers.js.map