import BB from './bb';

const bb = new BB();

describe('Checking', () => {
  it('should return checking balance', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
    const balance = await bb.checking.getBalance();

    expect(balance).toEqual(20345.78);
  });

  it('should return checking transactions', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
    const transactions = await bb.checking.getTransactions();

    expect(transactions.length).toBeGreaterThan(0);
    expect(transactions[0]).toHaveProperty('date');
    expect(transactions[0]).toHaveProperty('amount');
    expect(transactions[0]).toHaveProperty('description');
  });
});
