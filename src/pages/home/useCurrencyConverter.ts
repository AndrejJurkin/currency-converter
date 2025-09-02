import { useState } from "react";

interface ExchangeRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export function useCurrencyConverter(exchangeRates: ExchangeRate[]) {
  const ratesByCode =
    exchangeRates?.reduce((acc, rate) => {
      acc[rate.code] = rate.rate;
      return acc;
    }, {} as Record<string, number>) || {};

  const currencies = exchangeRates?.map((rate) => rate.code) || [];

  const [fromAmount, setFromAmount] = useState("1000");
  const [toCurrency, setToCurrency] = useState("EUR");

  const [toAmount, setToAmount] = useState(() => {
    const amount = parseAmount(fromAmount);
    const rate = ratesByCode[toCurrency] || 1;
    const result = convertCurrency(amount, rate);
    return formatCurrencyValue(result);
  });

  const handleFromAmountChange = (amount: string) => {
    setFromAmount(amount);
    const parsedAmount = parseAmount(amount);
    const rate = ratesByCode[toCurrency] || 1;
    const result = convertCurrency(parsedAmount, rate);
    setToAmount(formatCurrencyValue(result));
  };

  const handleToAmountChange = (amount: string) => {
    setToAmount(amount);
    const parsedAmount = parseAmount(amount);
    const rate = ratesByCode[toCurrency] || 1;
    const result = reverseConvertCurrency(parsedAmount, rate);
    setFromAmount(formatCurrencyValue(result));
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    const parsedAmount = parseAmount(fromAmount);
    const rate = ratesByCode[currency] || 1;
    const result = convertCurrency(parsedAmount, rate);
    setToAmount(formatCurrencyValue(result));
  };

  return {
    fromAmount,
    toAmount,
    toCurrency,
    currencies,
    conversionRate: ratesByCode[toCurrency] || 1,
    handleFromAmountChange,
    handleToAmountChange,
    handleToCurrencyChange,
  };
}

export const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};

export const convertCurrency = (amount: number, rate: number): number => {
  if (rate === 0) return 0;
  const result = roundToTwoDecimals(amount / rate);
  return isNaN(result) ? 0 : result;
};

export const reverseConvertCurrency = (
  amount: number,
  rate: number
): number => {
  if (rate === 0) return 0;
  const result = roundToTwoDecimals(amount * rate);
  return isNaN(result) ? 0 : result;
};

export const formatCurrencyValue = (value: number): string => {
  return isNaN(value) ? "" : String(value);
};

export const parseAmount = (amountString: string): number => {
  const parsed = parseFloat(amountString);
  const trimmed = amountString.trim();
  if (trimmed === "" || isNaN(parsed)) {
    return 0;
  }
  return parsed;
};
