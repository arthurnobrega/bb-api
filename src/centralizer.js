import fetch from 'node-fetch'
import querystring from 'querystring'

const apiEndpoint = 'https://mobi.bb.com.br/mov-centralizador/'

const transactionsUrl = 'tela/ExtratoDeContaCorrente/extrato'

const headers = {
  'User-Agent': 'Android;Google Nexus 5 - 6.0.0 - API 23 - 1080x1920;Android;6.0;vbox86p-userdebug 6.0 MRA58K eng.buildbot.20160110.195928 test-keys;mov-android-app;6.14.0.1;en_US;cpu=0|clock=|ram=2052484 kB|espacoSDInterno=12.46 GB|isSmartphone=true|nfc=false|camera=true|cameraFrontal=true|root=true|reconhecimentoVoz=false|resolucao=1080_1776|densidade=3.0|',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cache-Control': 'no-cache',
  'Postman-Token': '7ac0e5e1-8b39-457d-ae08-52c82b41bd5b',
}

export default class Centralizer {
  loginHash = null
  loginCookie = null

  refreshHash = async () => {
    const hashUrl = 'hash'
    const params = { id: '00000000000000000000000000000000' }

    const response = await fetch(`${apiEndpoint}${hashUrl}`, {
      headers,
      method: 'POST',
      body: querystring.stringify(params),
    })

    this.loginHash = await response.text()

    return this.loginHash
  }

  login = async ({ branch, account, password }) => {
    const loginUrl = 'servico/ServicoLogin/login'
    await this.refreshHash()

    const params = {
      idh: this.loginHash,
      dependenciaOrigem: branch,
      numeroContratoOrigem: account,
      idDispositivo: account,
      senhaConta: password,
    }

    const response = await fetch(`${apiEndpoint}${loginUrl}`, {
      headers,
      method: 'POST',
      body: querystring.stringify(params),
    })

    this.loginCookie = response.headers.get('set-cookie')

    const text = await response.text()
    const { login } = JSON.parse(text)

    return login
  }

  getBalance = async () => {
    const balanceUrl = 'servico/ServicoSaldo/saldo'
    const params = { idh: 'f197ca41bbcd28cb2571241b76974d7fbdbcc6364028a2fdb3d232af4b5ad67054b0191e0cd8a5b7' }

    const response = await fetch(`${apiEndpoint}${balanceUrl}`, {
      headers: {
        ...headers,
        cookie: this.loginCookie,
      },
      method: 'POST',
      body: querystring.stringify(params),
    })

    const text = await response.text()
    const { servicoSaldo } = JSON.parse(text)
    const { saldo } = servicoSaldo

    const parts = saldo.split(' ')
    const isPositive = parts[1] === 'C'

    const balance = parseFloat(parts[0].replace('.', '').replace(',', '.'))

    return isPositive ? balance : -balance
  }
}
