export function getMonthNumber(monthName) {
  const monthNumbers = {
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
    Dezembro: 11,
  };

  return monthNumbers[monthName];
}

export function mountDate(year, monthName, day) {
  return new Date(year, getMonthNumber(monthName), day);
}

export function parseAmountString(amountString) {
  const parsedAmount = amountString.replace(' ', '');
  const isPositive = parsedAmount.substr(-1) === 'C';

  const amount = parseFloat(parsedAmount
    .slice(0, -1)
    .replace('.', '')
    .replace(',', '.'));

  return isPositive ? amount : -amount;
}

export function treatDescription(description) {
  return description.replace('\n', ' ').replace(/ +/g, ' ');
}
