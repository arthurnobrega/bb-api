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
});
