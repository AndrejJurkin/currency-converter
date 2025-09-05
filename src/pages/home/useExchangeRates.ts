import { useQuery } from "@tanstack/react-query";
import type { ExchangeRate } from "./types";

export const useExchangeRates = () => {
  const query = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
  });

  return [query.data, query] as const;
};

export const parseExchangeRatesResponse = (text: string): ExchangeRate[] => {
  const lines = text.trim().split("\n");
  const dataLines = lines.slice(2);

  const rates: ExchangeRate[] = dataLines.map((line) => {
    const [country, currency, amount, code, rate] = line.split("|");
    return {
      country: country.trim(),
      currency: currency.trim(),
      amount: parseInt(amount.trim(), 10),
      code: code.trim(),
      rate: parseFloat(rate.trim()),
    };
  });

  return rates;
};

const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
  const response = await fetch("/api/exchange-rates", {
    headers: {
      Accept: "text/plain",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
  }

  const text = await response.text();
  return parseExchangeRatesResponse(text);
};
