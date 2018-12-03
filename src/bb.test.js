import BB from './bb';

const bb = new BB();

describe('Banco do Brasil API', () => {
  it('should login', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    const login = await bb.login(credentials);

    expect(login).toHaveProperty('mci');
    expect(login).toHaveProperty('nomeCliente');
    expect(login).toHaveProperty('imagemCliente');
    expect(login).toHaveProperty('titularidade', 1);
    expect(login).toHaveProperty('numeroContratoOrigem', '12345-6');
    expect(login).toHaveProperty('dependenciaOrigem', '1234-0');
    expect(login).toHaveProperty('segmento', 'EXCLUSIVO_REMOTO');
    expect(login).toHaveProperty('habilitadoParaAtendimentoRemoto', 'true');
    expect(login).toHaveProperty('statusAutorizacaoTransacoesFinanceiras', 'INICIALIZADO');
  });

  it('should return current balance', async () => {
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

  // it('should return savings accounts list', async () => {
  //   const credentials = {
  //     branch: '12340',
  //     account: '123456',
  //     password: '12345678',
  //   };
  //
  //   await bb.login(credentials);
  //   const savings = await bb.savings.getSavings();
  //
  //   expect(savings.length).toBe(2);
  //
  //   const [first, second] = savings;
  //
  //   expect(first).toEqual({
  //     code: 1,
  //     description: '1 - Poupança',
  //   });
  //
  //   expect(second).toEqual({
  //     code: 51,
  //     description: '51 - Poupança',
  //   });
  // });
});
