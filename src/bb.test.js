import BB from './bb';

describe('Banco do Brasil API', () => {
  let bb;

  beforeEach(() => {
    bb = new BB();
  });

  it('login', async () => {
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
    expect(login).toHaveProperty('segmento', 'ESTILO');
    expect(login).toHaveProperty('habilitadoParaAtendimentoRemoto', 'true');
    expect(login).toHaveProperty(
      'statusAutorizacaoTransacoesFinanceiras',
      'NAO_AUTORIZADO',
    );
  });

  it('checks if it is already logged in', async () => {
    expect(bb.isLoggedIn()).toBe(false);

    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    };

    await bb.login(credentials);
    expect(bb.isLoggedIn()).toBe(true);
  });
});
