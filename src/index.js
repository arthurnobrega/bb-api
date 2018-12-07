import BB from './bb';

async function run() {
  const bb = new BB();

  await bb.login({ branch: 'xxxxx', account: 'xxxxxxx', password: 'xxxxxxxx' });
  // eslint-disable-next-line no-console
  console.log({
    checking: {
      balance: await bb.checking.getBalance(),
      transactions: await bb.checking.getTransactions({
        year: 2018,
        month: 11,
      }),
    },
    savings: {
      transactions: bb.savings.getTransactions({
        variation: 51,
        year: 2018,
        month: 11,
      }),
    },
  });
}

if (require.main === module) {
  run();
}

export default BB;
