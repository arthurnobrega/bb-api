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
    const bills = await card.getBillsDates();

    expect(bills).toHaveLength(23);

    const [first, second] = bills;
    expect(first).toEqual('25112018');
    expect(second).toEqual('25102018');
  });

  it('returns credit card bill trasactions', async () => {
    const cards = await bb.creditCard.getCards();
    const card = cards[0];
    const bills = await card.getBillsDates();

    const [first, second] = bills;
    expect(first).toEqual('25112018');
    expect(second).toEqual('25102018');
  });
});
