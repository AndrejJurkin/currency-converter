import { styled } from "styled-components";
import { useState } from "react";
import { CurrencyInput } from "./currency-input";

interface ExchangeRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

interface CurrencyConverterProps {
  exchangeRates: ExchangeRate[] | undefined;
}

export function CurrencyConverter({ exchangeRates }: CurrencyConverterProps) {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  return (
    <Converter>
      <InputsContainer>
        <CurrencyInput
          label="Amount"
          value={fromAmount}
          onChange={setFromAmount}
          placeholder="Enter amount"
          selectedCurrency={fromCurrency}
          onCurrencyChange={setFromCurrency}
        />
        <CurrencyInput
          label="Converted to"
          value={toAmount}
          onChange={setToAmount}
          placeholder="Converted amount"
          selectedCurrency={toCurrency}
          onCurrencyChange={setToCurrency}
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
