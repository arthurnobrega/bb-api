import fetch from 'node-fetch'
import querystring from 'querystring'

const apiEndpoint = 'https://mobi.bb.com.br/mov-centralizador/'

const headers = {
  'User-Agent': 'Android;Google Nexus 5 - 6.0.0 - API 23 - 1080x1920;Android;6.0;vbox86p-userdebug 6.0 MRA58K eng.buildbot.20160110.195928 test-keys;mov-android-app;6.14.0.1;en_US;cpu=0|clock=|ram=2052484 kB|espacoSDInterno=12.46 GB|isSmartphone=true|nfc=false|camera=true|cameraFrontal=true|root=true|reconhecimentoVoz=false|resolucao=1080_1776|densidade=3.0|',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cache-Control': 'no-cache',
  'Postman-Token': '7ac0e5e1-8b39-457d-ae08-52c82b41bd5b',
}

function getMonthNumber(monthName) {
  const monthNumbers = {
    Janeiro: 0,
    Fevereiro: 1,
    Março: 2,
    Abril: 3,
    Maio: 4,
    Junho: 5,
    Julho: 6,
    Agosto: 7,
    Setembro: 8,
    Outubro: 9,
    Novembro: 10,
    Dezembro: 11,
  }

  return monthNumbers[monthName]
}

function mountDate(year, monthName, day) {
  return new Date(year, getMonthNumber(monthName), day)
}

function parseAmountString(amountString) {
  const parts = amountString.split(' ')
  const isPositive = parts[1] === 'C'

  const amount = parseFloat(parts[0].replace('.', '').replace(',', '.'))

  return isPositive ? amount : -amount
}

function treatDescription(description) {
  return description.replace('\n', ' ').replace(/ +/g, ' ')
}

export default class BB {
  loginCookie = null

  refreshHash = async () => {
    const hashUrl = 'hash'
    const params = { id: '00000000000000000000000000000000' }

    const response = await fetch(`${apiEndpoint}${hashUrl}`, {
      headers,
      method: 'POST',
      body: querystring.stringify(params),
    })

    const hash = await response.text()

    return hash
  }

  login = async ({ branch, account, password }) => {
    const loginUrl = 'servico/ServicoLogin/login'
    const hash = await this.refreshHash()

    const params = {
      idh: hash,
      dependenciaOrigem: branch,
      numeroContratoOrigem: account,
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

    const response = await fetch(`${apiEndpoint}${balanceUrl}`, {
      headers: {
        ...headers,
        cookie: this.loginCookie,
      },
      method: 'POST',
    })

    const text = await response.text()
    const { servicoSaldo } = JSON.parse(text)
    const { saldo } = servicoSaldo

    return parseAmountString(saldo)
  }

  getTransactions = async ({ year, month }) => {
    const transactionsUrl = 'tela/ExtratoDeContaCorrente/extrato'

    let params = { abrangencia: 8 }

    if (year && month) {
      params = { periodo: `00${month}${year}` }
    }

    const response = await fetch(`${apiEndpoint}${transactionsUrl}`, {
      headers: {
        ...headers,
        cookie: this.loginCookie,
      },
      method: 'POST',
      body: querystring.stringify(params),
    })

    const text = await response.text()
    const json = JSON.parse(text)

    const transactions = json.conteiner.telas[0].sessoes.reduce((acc, session) => {
      const monthString = 'Mês referência: '
      if (session.TIPO === 'sessao' && session.cabecalho && session.cabecalho.indexOf(monthString) === 0) {
        const [monthName, year] = session.cabecalho.replace(monthString, '').replace(' ', '').split('/')

        return [
          ...acc,
          ...session.celulas.reduce((cellAcc, cell) => {
            if (cell.TIPO === 'celula' && cell.componentes.length === 3 && cell.componentes[0].componentes[0].texto !== 'Dia') {
              const description = cell.componentes[1].componentes[0].texto
              const day = cell.componentes[0].componentes[0].texto
              const amount = cell.componentes[2].componentes[0].texto

              if (['Saldo Anterior', 'S A L D O'].includes(description)) {
                return cellAcc
              }

              return [
                ...cellAcc,
                {
                  date: mountDate(year, monthName, day),
                  description: treatDescription(description),
                  amount: parseAmountString(amount),
                },
              ]
            }

            return cellAcc
          }, []),
        ]
      }

      return acc
    }, [])

    return transactions
  }
}
