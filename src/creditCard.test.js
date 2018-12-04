import BB from './bb';

const bb = new BB();

describe('Credit Card', () => {
  it('returns credit card list', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
    const cards = await bb.creditCard.getCards();

    expect(cards).toHaveLength(4);

    const [first, second, third, fourth] = cards;

    expect(first).toEqual({
      brand: 'VISA',
      modality: '74',
      cardAccountNumber: '12345678',
      cardNumber: '4984111111114321',
    });

    expect(second).toEqual({
      brand: 'VISA',
      modality: '1',
      cardAccountNumber: '12345679',
      cardNumber: '4984111111111235',
    });

    expect(third).toEqual({
      brand: 'MASTERCARD',
      modality: '75',
      cardAccountNumber: '12345688',
      cardNumber: '5549111111114322',
    });

    expect(fourth).toEqual({
      brand: 'ELO',
      modality: '192',
      cardAccountNumber: '12345699',
      cardNumber: '5067111111114444',
    });
  });

  // it('returns savings transactions', async () => {
  //   const credentials = {
  //     branch: '12340',
  //     account: '123456',
  //     password: '12345678',
  //   };
  //
  //   await bb.login(credentials);
  //   const savings = await bb.savings.getAccounts();
  //   const [first] = savings;
  //   const transactions = await bb.savings.getTransactions({
  //     variation: first.variation,
  //     year: 2018,
  //     month: 11,
  //   });
  //
  //   expect(transactions).toHaveLength(7);
  //
  //   expect(transactions).toMatchObject([
  //     {
  //       amount: -15.2,
  //       date: new Date(2018, 10, 5),
  //       description: 'Transferencia Para Conta',
  //     },
  //     {
  //       amount: 1.39,
  //       date: new Date(2018, 10, 16),
  //       description: 'Juros',
  //     },
  //     {
  //       amount: -150,
  //       date: new Date(2018, 10, 19),
  //       description: 'Transferencia Para Conta',
  //     },
  //     {
  //       amount: 3.73,
  //       date: new Date(2018, 10, 20),
  //       description: 'Juros',
  //     },
  //     {
  //       amount: 3.54,
  //       date: new Date(2018, 10, 26),
  //       description: 'Juros',
  //     },
  //     {
  //       amount: -10,
  //       date: new Date(2018, 10, 28),
  //       description: 'Transferencia Para Conta',
  //     },
  //     {
  //       amount: 0.13,
  //       date: new Date(2018, 10, 30),
  //       description: 'Juros',
  //     },
  //   ]);
  // });
});
