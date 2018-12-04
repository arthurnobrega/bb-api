import fetch from 'node-fetch';
import BBCard from './card';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from '../constants';

export default class BBCreditCard {
  loginCookie = null;

  constructor(loginCookie) {
    this.loginCookie = loginCookie;
  }

  async getCards() {
    const accountsUrl = 'tela/ExtratoFatura/entrada';

    const response = await fetch(`${BASE_ENDPOINT}${accountsUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: this.loginCookie,
      },
    });

    const text = await response.text();
    const json = JSON.parse(text);

    return json.conteiner.telas[0].sessoes[0].celulas
      .map(c =>
        c.protocolo.parametros
          .map(p => ({ [p[0]]: p[1] }))
          .reduce((acc, p) => ({ ...acc, ...p }), {}),
      )
      .map(c => ({
        brand: c.nomeBandeira,
        modality: c.codigoModalidade,
        cardAccountNumber: c.numeroContaCartao,
        cardNumber: c.numeroPlastico,
      }));
  }

  getCard = card => new BBCard(card);
}
