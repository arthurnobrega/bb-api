import fetch from 'node-fetch';
import querystring from 'querystring';
import LoginCookie from '../loginCookie';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from '../constants';
import { treatDescription, parseAmountString } from '../helpers';

function isCurrentMonth({ year, month }) {
  const now = new Date();
  return (
    now.getFullYear() === parseInt(year, 10) &&
    now.getMonth() === parseInt(month - 1, 10)
  );
}

export default class BBSavingsAccount {
  constructor({ variation, description }) {
    this.variation = variation;
    this.description = description;
  }

  async getTransactions({ year, month }) {
    const pad = s => s.toString().padStart('0', 2);
    const accountsUrl = 'tela/ExtratoDePoupanca/menuPeriodo';

    let params = {
      variacao: this.variation,
    };

    if (!isCurrentMonth({ year, month })) {
      params = {
        ...params,
        metodo: 'mesAnterior',
        periodo: `01/${pad(month)}/${year}`,
      };
    }

    const response = await fetch(
      `${BASE_ENDPOINT}${accountsUrl}?${querystring.stringify(params)}`,
      {
        headers: {
          ...DEFAULT_HEADERS,
          cookie: LoginCookie.getGlobal(),
        },
      },
    );

    const text = await response.text();
    const json = JSON.parse(text);

    const session = json.conteiner.telas[0].sessoes.find(
      s => s.cabecalho && s.cabecalho.includes('Mês referência'),
    );
    return session.celulas
      .filter(
        c =>
          c.componentes.length === 3 &&
          c.componentes[0].componentes[0].texto !== '' &&
          c.componentes[1].componentes[0].texto !== '' &&
          c.componentes[2].componentes[0].texto !== '',
      )
      .filter(c => c.componentes[0].componentes[0].texto !== 'Dia')
      .map(c => {
        const date = c.componentes[0].componentes[0].texto;
        const description = c.componentes[1].componentes[0].texto;
        const amount = c.componentes[2].componentes[0].texto;

        return {
          date: new Date(year, month - 1, date),
          description: treatDescription(description),
          amount: parseAmountString(amount),
        };
      });
  }
}
