import { useQuery } from "@tanstack/react-query";

interface ExchangeRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

const fetchExchangeRates = async (): Promise<ExchangeRate[]> => {
  const response = await fetch("/api/exchange-rates");

  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.statusText}`);
  }

  const text = await response.text();
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

export const useExchangeRates = () => {
  const query = useQuery({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
  });

  return [query.data, query] as const;
};
