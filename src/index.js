import util from 'util';
import yargs from 'yargs';
import BB from './bb';

const { argv } = yargs
  .option('bbBranch', { string: true })
  .option('bbAccount', { string: true })
  .option('bbPassword', { string: true });

export async function run() {
  const bb = new BB();
  const { bbBranch: branch, bbAccount: account, bbPassword: password } = argv;

  await bb.login({ branch, account, password });

  const checkingBalance = await bb.checking.getBalance();
  const checkingTransactions = await bb.checking.getTransactions({
    year: 2018,
    month: 11,
  });

  // eslint-disable-next-line no-console
  console.log(
    util.inspect(
      {
        checkingBalance,
        checkingTransactions,
      },
      { showHidden: false, depth: null },
    ),
  );

  const savingsAccounts = await bb.savings.getAccounts();
  const savingsTransactions = await savingsAccounts[0].getTransactions({
    year: 2018,
    month: 11,
  });

  // eslint-disable-next-line no-console
  console.log(
    util.inspect(
      {
        savingsAccounts,
        savingsTransactions,
      },
      { showHidden: false, depth: null },
    ),
  );

  const creditCards = await bb.creditCard.getCards();
  const creditCardBills = await creditCards[0].getBills();
  const creditCardTransactions = await creditCardBills[0].getTransactions();

  // eslint-disable-next-line no-console
  console.log(
    util.inspect(
      {
        creditCards,
        creditCardBills,
        creditCardTransactions,
      },
      { showHidden: false, depth: null },
    ),
  );
}

if (require.main === module) {
  run();
}

export default BB;
