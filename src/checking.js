import fetch from 'node-fetch';
import querystring from 'querystring';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from './constants';
import { mountDate, treatDescription, parseAmountString } from './helpers';

export default class BBChecking {
  loginToken = null;

  constructor(loginToken) {
    this.loginToken = loginToken;
  }

  async getTransactions(options) {
    const transactionsUrl = 'tela/ExtratoDeContaCorrente/extrato';

    let params = {};

    if (options && options.year && options.month) {
      params = { periodo: `01${options.month}${options.year}` };
    }

    const response = await fetch(`${BASE_ENDPOINT}${transactionsUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: this.loginCookie,
      },
      method: 'POST',
      body: querystring.stringify(params),
    });

    const json = await response.json();

    const transactions = json.conteiner.telas[0].sessoes.reduce((acc, session) => {
      const monthString = 'Mês referência: ';
      if (
        session.TIPO === 'sessao' &&
        session.cabecalho &&
        session.cabecalho.indexOf(monthString) === 0
      ) {
        const [monthName, year] = session.cabecalho
          .replace(monthString, '')
          .replace(' ', '')
          .split('/');

        return [
          ...acc,
          ...session.celulas.reduce((cellAcc, cell) => {
            if (
              cell.TIPO === 'celula' &&
              cell.componentes.length === 3 &&
              cell.componentes[0].componentes[0].texto !== 'Dia'
            ) {
              const description = cell.componentes[1].componentes[0].texto;
              const day = cell.componentes[0].componentes[0].texto;
              const amount = cell.componentes[2].componentes[0].texto;

              if (['Saldo Anterior', 'S A L D O'].includes(description)) {
                return cellAcc;
              }

              return [
                ...cellAcc,
                {
                  date: mountDate(year, monthName, day),
                  description: treatDescription(description),
                  amount: parseAmountString(amount),
                },
              ];
            }

            return cellAcc;
          }, []),
        ];
      }

      return acc;
    }, []);

    return transactions;
  }

  async getBalance() {
    const balanceUrl = 'servico/ServicoSaldo/saldo';

    const response = await fetch(`${BASE_ENDPOINT}${balanceUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: this.loginCookie,
      },
      method: 'POST',
    });

    const { servicoSaldo } = await response.json();
    const { saldo } = servicoSaldo;

    return parseAmountString(saldo);
  }
}
