import BB from './bb';

if (require.main === module) {
  const bb = new BB();

  bb.login({ branch: 'xxxxx', account: 'xxxxxx', password: 'xxxxxxxx' })
    .then(() => bb.checking.getBalance())
    .then(balance => console.log(balance))
    .then(() => bb.checking.getTransactions({ year: 2018, month: 10 }))
    .then(transactions => console.log(transactions))
    .then(() => bb.savings.getTransactions({ variation: 51, year: 2018, month: 10 }))
    .then(transactions => console.log(transactions));
}

export default BB;
