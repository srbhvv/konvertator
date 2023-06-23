import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ExchangeRate {
  currencyCodeA: number;
  currencyCodeB: number;
  rateBuy: number;
  rateSell: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  exchangeRates: ExchangeRate[] = [];
  amountUah: number = 0;
  convertedAmountUah: number = 0;
  targetCurrencyUah: string = '';

  amountUsd: number = 0;
  convertedAmountUsd: number = 0;
  targetCurrencyUsd: string = '';

  amountEuro: number = 0;
  convertedAmountEuro: number = 0;
  targetCurrencyEuro: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<ExchangeRate[]>('https://api.monobank.ua/bank/currency').subscribe(data => {
      this.exchangeRates = data;
    });
  }

  convertToEuro() {
    if (this.amountUah && this.exchangeRates) {
      const euroRate = this.exchangeRates.find(rate => rate.currencyCodeA === 980 && rate.currencyCodeB === 978)?.rateBuy;
      if (euroRate) {
        this.convertedAmountUah = this.amountUah / euroRate;
        this.targetCurrencyUah = 'євро';
      }
    }
  }

  convertToDollar() {
    if (this.amountUah && this.exchangeRates) {
      const dollarRate = this.exchangeRates.find(rate => rate.currencyCodeA === 980 && rate.currencyCodeB === 840)?.rateSell;
      if (dollarRate) {
        this.convertedAmountUah = this.amountUah / dollarRate;
        this.targetCurrencyUah = 'долари';
      }
    }
  }

  convertToUahFromDollar() {
    if (this.amountUsd && this.exchangeRates) {
      const dollarRate = this.exchangeRates.find(rate => rate.currencyCodeA === 840 && rate.currencyCodeB === 980)?.rateBuy;
      if (dollarRate) {
        this.convertedAmountUsd = this.amountUsd * dollarRate;
        this.targetCurrencyUsd = 'гривні';
      }
    }
  }

  convertToEuroFromDollar() {
    if (this.amountUsd && this.exchangeRates) {
      const euroRate = this.exchangeRates.find(rate => rate.currencyCodeA === 840 && rate.currencyCodeB === 978)?.rateBuy;
      if (euroRate) {
        this.convertedAmountUsd = this.amountUsd * euroRate;
        this.targetCurrencyUsd = 'євро';
      }
    }
  }

  convertToUahFromEuro() {
    if (this.amountEuro && this.exchangeRates) {
      const euroRate = this.exchangeRates.find(rate => rate.currencyCodeA === 978 && rate.currencyCodeB === 980)?.rateSell;
      if (euroRate) {
        this.convertedAmountEuro = this.amountEuro * euroRate;
        this.targetCurrencyEuro = 'гривні';
      }
    }
  }

  convertToDollarFromEuro() {
    if (this.amountEuro && this.exchangeRates) {
      const dollarRate = this.exchangeRates.find(rate => rate.currencyCodeA === 978 && rate.currencyCodeB === 840)?.rateSell;
      if (dollarRate) {
        this.convertedAmountEuro = this.amountEuro * dollarRate;
        this.targetCurrencyEuro = 'долари';
      }
    }
  }
}
