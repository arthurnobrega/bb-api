import fetch from 'node-fetch';
import querystring from 'querystring';
import LoginCookie from '../loginCookie';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from '../constants';
import { treatDescription, parseAmountString } from '../helpers';

export default class BBSavingsAccount {
  constructor({ variation, description }) {
    this.variation = variation;
    this.description = description;
  }

  async getTransactions({ year, month }) {
    const pad = s => s.toString().padStart('0', 2);
    const accountsUrl = 'tela/ExtratoDePoupanca/menuPeriodo';
    const params = {
      metodo: 'mesAnterior',
      variacao: this.variation,
      periodo: `01/${pad(month)}/${year}`,
    };

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
      .map(c => c.componentes)
      .filter(comp => comp[0].componentes[0].texto !== 'Dia')
      .map(c => ({
        date: new Date(year, month - 1, c[0].componentes[0].texto),
        description: treatDescription(c[1].componentes[0].texto),
        amount: parseAmountString(c[2].componentes[0].texto),
      }));
  }
}
