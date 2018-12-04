import BB from './bb';

const bb = new BB();

describe('Savings', () => {
  it('returns savings accounts list', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
    const savings = await bb.savings.getAccounts();

    expect(savings).toHaveLength(2);

    const [first, second] = savings;

    expect(first).toEqual({
      variation: 1,
      description: 'Poupança Ouro - Variação 1',
    });

    expect(second).toEqual({
      variation: 51,
      description: 'Poupança Ouro - Variação 51',
    });
  });

  it('returns savings transactions', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
    const savings = await bb.savings.getAccounts();
    const [first] = savings;
    const transactions = await bb.savings.getTransactions({
      variation: first.variation,
      year: 2018,
      month: 11,
    });

    expect(transactions).toHaveLength(7);

    expect(transactions).toMatchObject([
      {
        amount: -15.2,
        date: new Date(2018, 10, 5),
        description: 'Transferencia Para Conta',
      },
      {
        amount: 1.39,
        date: new Date(2018, 10, 16),
        description: 'Juros',
      },
      {
        amount: -150,
        date: new Date(2018, 10, 19),
        description: 'Transferencia Para Conta',
      },
      {
        amount: 3.73,
        date: new Date(2018, 10, 20),
        description: 'Juros',
      },
      {
        amount: 3.54,
        date: new Date(2018, 10, 26),
        description: 'Juros',
      },
      {
        amount: -10,
        date: new Date(2018, 10, 28),
        description: 'Transferencia Para Conta',
      },
      {
        amount: 0.13,
        date: new Date(2018, 10, 30),
        description: 'Juros',
      },
    ]);
  });
});
