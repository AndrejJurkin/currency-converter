import { useState } from "react";
import type { ExchangeRate } from "./types";

export function useCurrencyConverter(exchangeRates: ExchangeRate[]) {
  const ratesByCode =
    exchangeRates?.reduce((acc, rate) => {
      acc[rate.code] = { rate: rate.rate, amount: rate.amount };
      return acc;
    }, {} as Record<string, { rate: number; amount: number }>) || {};

  const currencies = exchangeRates?.map((rate) => rate.code) || [];

  const [fromAmount, setFromAmount] = useState("1000");
  const [toCurrency, setToCurrency] = useState("EUR");

  const [toAmount, setToAmount] = useState(() => {
    const amount = parseAmount(fromAmount);
    const currencyData = ratesByCode[toCurrency] || { rate: 1, amount: 1 };
    const result = convertCurrency({
      amount,
      rate: currencyData.rate,
      currencyAmount: currencyData.amount,
    });
    return formatCurrencyValue(result);
  });

  const handleFromAmountChange = (amount: string) => {
    setFromAmount(amount);
    const parsedAmount = parseAmount(amount);
    const currencyData = ratesByCode[toCurrency] || { rate: 1, amount: 1 };
    const result = convertCurrency({
      amount: parsedAmount,
      rate: currencyData.rate,
      currencyAmount: currencyData.amount,
    });
    setToAmount(formatCurrencyValue(result));
  };

  const handleToAmountChange = (amount: string) => {
    setToAmount(amount);
    const parsedAmount = parseAmount(amount);
    const currencyData = ratesByCode[toCurrency] || { rate: 1, amount: 1 };
    const result = reverseConvertCurrency({
      amount: parsedAmount,
      rate: currencyData.rate,
      currencyAmount: currencyData.amount,
    });
    setFromAmount(formatCurrencyValue(result));
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    const parsedAmount = parseAmount(fromAmount);
    const currencyData = ratesByCode[currency] || { rate: 1, amount: 1 };
    const result = convertCurrency({
      amount: parsedAmount,
      rate: currencyData.rate,
      currencyAmount: currencyData.amount,
    });
    setToAmount(formatCurrencyValue(result));
  };

  return {
    fromAmount,
    toAmount,
    toCurrency,
    currencies,
    conversionRate: ratesByCode[toCurrency]?.rate || 1,
    handleFromAmountChange,
    handleToAmountChange,
    handleToCurrencyChange,
  };
}

export const roundToTwoDecimals = (value: number): number => {
  return Math.round(value * 100) / 100;
};

export const convertCurrency = ({
  amount,
  rate,
  currencyAmount = 1,
}: {
  amount: number;
  rate: number;
  currencyAmount?: number;
}): number => {
  if (rate === 0 || currencyAmount === 0) return 0;
  const result = roundToTwoDecimals(amount * (currencyAmount / rate));
  return isNaN(result) ? 0 : result;
};

export const reverseConvertCurrency = ({
  amount,
  rate,
  currencyAmount = 1,
}: {
  amount: number;
  rate: number;
  currencyAmount?: number;
}): number => {
  if (rate === 0 || currencyAmount === 0) return 0;
  const result = roundToTwoDecimals(amount * (rate / currencyAmount));
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
