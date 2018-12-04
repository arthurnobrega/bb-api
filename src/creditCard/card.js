import fetch from 'node-fetch';
import querystring from 'querystring';
import { BASE_ENDPOINT, DEFAULT_HEADERS } from '../constants';

export default class BBCard {
  constructor({ brand, modality, cardAccountNumber, cardNumber }) {
    this.brand = brand;
    this.modality = modality;
    this.cardAccountNumber = cardAccountNumber;
    this.cardNumber = cardNumber;
  }

  async getBillsDates() {
    const billsUrl = 'tela/ExtratoFatura/mesAnterior';

    const params = {
      codigoModalidade: this.modality,
      numeroContaCartao: this.cardAccountNumber,
      numeroPlastico: this.cardNumber,
    };

    const response = await fetch(`${BASE_ENDPOINT}${billsUrl}`, {
      headers: {
        ...DEFAULT_HEADERS,
        cookie: this.loginCookie,
      },
      method: 'POST',
      body: querystring.stringify(params),
    });

    const text = await response.text();
    const json = JSON.parse(text);

    return json.conteiner.telas[0].sessoes[0].celulas
      .map(c => c.protocolo.parametros.filter(p => p[0] === 'dataFatura'))
      .map(p => p[0][1]);
  }
}
