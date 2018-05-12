import BBCentralizer from './centralizer'

const centralizer = new BBCentralizer()

describe('Banco do Brasil API', () => {
  it('should return hash', async () => {
    const hash = await centralizer.refreshHash()

    expect(hash).toEqual('3e318fb1a00a88348d65d1b7e79f6d25aefdff0d2481255f685a20dd3960ba43421bbfa3ec97c3c0')
  })

  it('should login', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    }

    const login = await centralizer.login(credentials)

    expect(login).toHaveProperty('mci')
    expect(login).toHaveProperty('nomeCliente')
    expect(login).toHaveProperty('imagemCliente')
    expect(login).toHaveProperty('titularidade', 1)
    expect(login).toHaveProperty('numeroContratoOrigem', '12345-6')
    expect(login).toHaveProperty('dependenciaOrigem', '1234-0')
    expect(login).toHaveProperty('segmento', 'EXCLUSIVO_REMOTO')
    expect(login).toHaveProperty('habilitadoParaAtendimentoRemoto', 'true')
    expect(login).toHaveProperty('statusAutorizacaoTransacoesFinanceiras', 'INICIALIZADO')
  })

  it('should return current balance', async () => {
    const credentials = {
      branch: '12340',
      account: '123456',
      password: '12345678',
    }

    await centralizer.login(credentials)
    const balance = await centralizer.getBalance()

    expect(balance).toEqual(20345.78)
  })
})
