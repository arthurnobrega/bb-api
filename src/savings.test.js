import BB from './bb';

const bb = new BB();

describe('Savings', () => {
  it('should return savings accounts list', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
    const savings = await bb.savings.getAccounts();

    expect(savings.length).toBe(2);

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
});
