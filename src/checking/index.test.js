import BB from '../bb';

const bb = new BB();

describe('Checking', () => {
  it('returns checking balance', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
    const balance = await bb.checking.getBalance();

    expect(balance).toEqual(20345.78);
  });

  it('returns checking transactions', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
    const transactions = await bb.checking.getTransactions({
      year: 2018,
      month: 4,
    });

    expect(transactions).toHaveLength(5);

    expect(transactions).toMatchObject([
      {
        date: new Date(2018, 3, 16),
        amount: -82.5,
        description:
          'Transferência enviada 15/04 1100 110540-1 JOAO DE ALMEIDA',
      },
      {
        date: new Date(2018, 3, 17),
        amount: -10,
        description: 'Transferência enviada 17/04 8125 950100-9 MARA GARGIA AL',
      },
      {
        date: new Date(2018, 3, 23),
        amount: -374.56,
        description: 'Compra com Cartão 21/04 20:00 SUPERMERCADO 061 AS',
      },
      {
        date: new Date(2018, 3, 27),
        amount: -50,
        description:
          'Transferência enviada 27/04 1234 123454-0 JOAO DE ALMEIDA',
      },
      {
        date: new Date(2018, 3, 28),
        amount: 1107.42,
        description: 'Transferência recebida 28/04 3455 456123-1 IBM',
      },
    ]);
  });
});
