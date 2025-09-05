import { styled } from "styled-components";
import { useCurrencyConverter } from "./useCurrencyConverter";
import { CurrencyInput } from "./currency-input";
import type { ExchangeRate } from "./types";

interface Props {
  exchangeRates: ExchangeRate[];
}

export function CurrencyConverter({ exchangeRates }: Props) {
  const {
    fromAmount,
    toAmount,
    toCurrency,
    currencies,
    conversionRate,
    handleFromAmountChange,
    handleToAmountChange,
    handleToCurrencyChange,
  } = useCurrencyConverter(exchangeRates);

  return (
    <Converter>
      <InputsContainer>
        <CurrencyInput
          label="Amount"
          value={fromAmount}
          onChange={handleFromAmountChange}
          placeholder="Enter amount"
          selectedCurrency="CZK"
          disabled={true}
          currencies={["CZK"]}
        />
        <CurrencyInput
          label="Converted to"
          value={toAmount}
          onChange={handleToAmountChange}
          placeholder="Converted amount"
          selectedCurrency={toCurrency}
          onCurrencyChange={handleToCurrencyChange}
          currencies={currencies}
          conversionRateText={`1 CZK = ${conversionRate.toFixed(
            3
          )} ${toCurrency}`}
        />
      </InputsContainer>
    </Converter>
  );
}

const Converter = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 24px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  margin-bottom: 64px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
