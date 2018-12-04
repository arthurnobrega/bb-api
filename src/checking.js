import fetch from 'node-fetch';
import querystring from 'querystring';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from './constants';
import { treatDescription, parseAmountString } from './helpers';

export default class BBChecking {
  loginCookie = null;

  constructor(loginCookie) {
    this.loginCookie = loginCookie;
  }

  async getTransactions({ year, month }) {
    const pad = s => s.toString().padStart('0', 2);
    const transactionsUrl = 'tela/ExtratoDeContaCorrente/extrato';

    let params = {};

    if (year && month) {
      params = { periodo: `01${pad(month)}${year}` };
    }

    const response = await fetch(`${BASE_ENDPOINT}${transactionsUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: this.loginCookie,
      },
      method: 'POST',
      body: querystring.stringify(params),
    });

    const text = await response.text();
    const json = JSON.parse(text);

    const transactions = json.conteiner.telas[0].sessoes.reduce(
      (acc, session) => {
        const monthString = 'Mês referência: ';
        if (
          session.TIPO === 'sessao' &&
          session.cabecalho &&
          session.cabecalho.indexOf(monthString) === 0
        ) {
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
                    date: new Date(year, month, day),
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
      },
      [],
    );

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

    const text = await response.text();
    const { servicoSaldo } = JSON.parse(text);

    const { saldo } = servicoSaldo;

    return parseAmountString(saldo);
  }
}
