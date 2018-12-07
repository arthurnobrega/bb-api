import BB from '../bb';

describe('Credit Card', () => {
  const bb = new BB();

  beforeEach(async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
  });

  it('returns credit card list', async () => {
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

  it('returns credit card bills', async () => {
    const cards = await bb.creditCard.getCards();
    const card = cards[0];
    const bills = await card.getBills();

    expect(bills).toHaveLength(23);

    const [first, second] = bills;

    expect(first).toEqual({
      cardAccountNumber: '12345678',
      billId: '123456789',
      billDate: '25112018',
    });

    expect(second).toEqual({
      cardAccountNumber: '12345678',
      billId: '280905751',
      billDate: '25102018',
    });
  });

  it('returns credit card bill trasactions', async () => {
    const cards = await bb.creditCard.getCards();
    const card = cards[0];
    const bills = await card.getBills();
    const bill = bills[0];

    const transactions = await bill.getTransactions();

    expect(transactions).toHaveLength(7);

    expect(transactions).toMatchObject([
      {
        type: 'payment',
        amount: 1.0,
        date: new Date(2018, 9, 22),
        description: 'PGTO',
      },
      {
        type: 'atSight',
        amount: -2.0,
        date: new Date(2018, 9, 10),
        description: 'FARMACIA',
      },
      {
        type: 'atSight',
        amount: -3.0,
        date: new Date(2018, 9, 11),
        description: 'LANCHONETE',
      },
      {
        type: 'installment',
        amount: -4.0,
        date: new Date(2018, 9, 10),
        description: 'CASA HUA 08/10',
      },
      {
        type: 'installment',
        amount: -5.0,
        date: new Date(2018, 9, 11),
        description: 'BLABS PARC 02/04',
      },
      {
        type: 'installment',
        amount: -6.0,
        date: new Date(2018, 9, 12),
        description: 'PET PARC 01/02',
      },
      {
        type: 'installment',
        amount: -6.0,
        date: new Date(2018, 9, 12),
        description: 'ANTEC PET PARC 02/02',
      },
    ]);
  });
});
