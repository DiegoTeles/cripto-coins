import { Injectable, HttpService } from '@nestjs/common';
const fs = require('fs');

@Injectable()
export class CrytoService {
  constructor(private http: HttpService) {}

  private baseUrl = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';

  async findAll(calc: boolean): Promise<any> {
    const rawdata = fs.readFileSync('./src/db/currencies.json');
    const currenciesDta = JSON.parse(rawdata);

    return await this.http
      .get(`${this.baseUrl}`, {
        params: {
          calc,
        },
      })
      .toPromise()
      .then((res: any) => {
        const getName = (name: string) => {
          return (
            {
              BRL: 'Brazilian Real',
              EUR: 'Euro',
              CAD: 'Canadian Dollar',
            }[name] || 'Coin notfound'
          );
        };

        const dataJson = [];

        for (const prop in currenciesDta) {
          dataJson.push({
            [prop]: {
              code: prop,
              rate: `${currenciesDta[prop]}`,
              description: getName(prop),
              rate_float: parseFloat(currenciesDta[prop]),
            },
          });
        }

        dataJson.map(item => Object.assign(res.data.bpi, item));

        const data = res.data.bpi;
        res.data.bpi = [];
        for (const v in data) {
          res.data.bpi.push(data[v]);
        }

        if (calc) {
          const { rate_float } = res.data.bpi.filter(
            val => val.code === 'USD',
          )[0];

          const coinsMaster = res.data.bpi.filter(
            val => val.code === 'USD' || val.code === 'BTC',
          );

          res.data.bpi.filter(data => {
            if (data.code !== 'USD' && data.code !== 'BTC') {
              const ult = {
                ...data,
                rate_float: rate_float * data.rate,
              };

              return coinsMaster.push(ult);
            }
          });

          res.data.bpi = coinsMaster;

          return res.data;
        }

        return res.data;
      });
  }

  async create(data: any): Promise<any> {
    if (
      data.currency !== 'BRL' ||
      data.currency !== 'CAD' ||
      data.currency !== 'EUR'
    ) {
      return { message: 'Moeda inválida' };
    }

    if (!Number.isInteger(data.value)) {
      return { message: 'Moeda inválida' };
    }

    const rawdata = fs.readFileSync('./src/db/currencies.json');
    const currenciesDta = JSON.parse(rawdata);

    if (data.currency && data.value) {
      const newCurrencies = {
        ...currenciesDta,
        ...{ [data.currency]: parseInt(data.value) },
      };

      fs.writeFileSync(
        './src/db/currencies.json',
        JSON.stringify(newCurrencies),
      );
      return {
        message: 'Valor alterado com sucesso!',
      };
    }
  }
}
