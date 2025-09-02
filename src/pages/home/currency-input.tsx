import { styled } from "styled-components";

interface CurrencyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  selectedCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
}

const currencies = ["USD", "EUR", "GBP", "JPY", "CAD"];

export function CurrencyInput({
  label,
  value,
  onChange,
  placeholder,
  selectedCurrency = "USD",
  onCurrencyChange,
}: CurrencyInputProps) {
  return (
    <div>
      <Label>{label}</Label>
      <InputContainer>
        <Input
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
        />
        <Divider />
        <CurrencySelect
          value={selectedCurrency}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            onCurrencyChange?.(e.target.value)
          }
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </CurrencySelect>
      </InputContainer>
    </div>
  );
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;

  &:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const Input = styled.input`
  font-size: 1.25rem;
  padding: 12px 16px;
  border: none;
  outline: none;
  color: black;
  flex: 1;

  &:focus {
    outline: none;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #e5e7eb;
  margin: 0 8px;
`;

const CurrencySelect = styled.select`
  font-size: 1rem;
  padding: 12px 16px;
  border: none;
  outline: none;
  background-color: transparent;
  color: black;
  cursor: pointer;
  margin-right: 16px;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
  display: block;
`;
