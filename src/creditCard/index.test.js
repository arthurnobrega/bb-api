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

    expect(bills).toHaveLength(24);

    const [first, second, third] = bills;

    expect(first).toEqual({
      cardAccountNumber: '12345678',
      billDate: '25122018',
      status: 'opened',
    });

    expect(second).toEqual({
      cardAccountNumber: '12345678',
      billId: '123456789',
      billDate: '25112018',
      status: 'closed',
    });

    expect(third).toEqual({
      cardAccountNumber: '12345678',
      billId: '280905751',
      billDate: '25102018',
      status: 'closed',
    });
  });

  it('returns credit card trasactions from opened bill', async () => {
    const cards = await bb.creditCard.getCards();
    const card = cards[0];
    const bills = await card.getBills();
    const bill = bills[0];

    const transactions = await bill.getTransactions();

    expect(transactions).toHaveLength(7);

    expect(transactions).toMatchObject([
      {
        type: 'payment',
        amount: 1634.91,
        date: new Date(2019, 4, 2),
        description: 'PGTO DEBITO CONTA 1234 000005879 200',
      },
      {
        type: 'atSight',
        amount: -46,
        date: new Date(2019, 4, 20),
        description: 'SPOLETO NOVA IORQUE',
      },
      {
        type: 'atSight',
        amount: -44.3,
        date: new Date(2019, 4, 20),
        description: 'SUPERMERCADOS NOVA IORQUE',
      },
      {
        type: 'atSight',
        amount: -39.8,
        date: new Date(2019, 4, 20),
        description: 'IFOOD*IFOOD MIAMI',
      },
      {
        type: 'installment',
        amount: -177,
        date: new Date(2019, 4, 3),
        description: 'YOUTUBE D PARC 01/12 SAO PAULO',
      },
      {
        type: 'installment',
        amount: -155.36,
        date: new Date(2019, 4, 10),
        description: 'TESTE DF ASA PARC 03/03 NOVA IORQUE',
      },
      {
        type: 'installment',
        amount: -300.0,
        date: new Date(2019, 3, 29),
        description: 'VITALIDADE PARC 01/04 NOVA IORQUE',
      },
    ]);
  });

  it('returns credit card trasactions from closed bill', async () => {
    const cards = await bb.creditCard.getCards();
    const card = cards[0];
    const bills = await card.getBills();
    const bill = bills[1];

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
